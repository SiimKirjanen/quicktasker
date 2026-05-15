import { useEffect, useState } from "@wordpress/element";
import { toast } from "react-toastify";
import { getGlobalLogsRequest } from "../../../../api/api";
import { LogsFilter } from "../../../../components/Filter/LogsFilter/LogsFilter";
import { Loading } from "../../../../components/Loading/Loading";
import { useTimezone } from "../../../../hooks/useTimezone";
import { WPQTLogCreatedBy } from "../../../../types/enums";
import {
  Log,
  LogCreatedByEnum,
  LogStatusEnum,
  LogTypeEnum,
} from "../../../../types/log";
import { logCreatedByString } from "../../../../utils/log";

import { __ } from "@wordpress/i18n";
import { NoFilterResults } from "../../../../components/Filter/NoFilterResults/NoFilterResults";

enum LogOrderEnum {
  Asc = "ASC",
  Desc = "DESC",
}

enum LogNumberEnum {
  Hundred = "100",
  TwoHundred = "200",
  FiveHundred = "500",
  All = "all",
}

enum LogStatusFilterEnum {
  All = "all",
  Success = LogStatusEnum.Success,
  Error = LogStatusEnum.Error,
}

type LogsFilterType = {
  numberOfLogs: string;
  type: LogTypeEnum;
  typeId: string;
  createdBy: LogCreatedByEnum;
  order: LogOrderEnum;
  search: string;
  status: string;
  createdById?: string;
};
type ServerLogsFilterType = Partial<
  Pick<
    LogsFilterType,
    | "numberOfLogs"
    | "type"
    | "createdBy"
    | "createdById"
    | "typeId"
    | "status"
    | "order"
  >
>;

const LogsPageContent = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filterSettings, setFilterSettings] = useState<LogsFilterType>({
    numberOfLogs: LogNumberEnum.Hundred,
    type: LogTypeEnum.All,
    typeId: "",
    createdBy: LogCreatedByEnum.All,
    order: LogOrderEnum.Desc,
    search: "",
    status: LogStatusFilterEnum.All,
  });
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [shouldFetchLogs, setShouldFetchLogs] = useState(true);

  useEffect(() => {
    if (shouldFetchLogs) {
      fetchLogs();
      setShouldFetchLogs(false);
    }
  }, [filterSettings, shouldFetchLogs]);

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);
      const filter = { ...filterSettings } as ServerLogsFilterType;
      if (filter.numberOfLogs === LogNumberEnum.All) {
        delete filter.numberOfLogs;
      }
      if (filter.type === LogTypeEnum.All) {
        delete filter.type;
      }
      if (filter.typeId === "") {
        delete filter.typeId;
      }
      if (filter.createdBy === LogCreatedByEnum.All) {
        delete filter.createdBy;
      }
      if (filter.status === LogStatusFilterEnum.All) {
        delete filter.status;
      }
      const response = await getGlobalLogsRequest(filter);
      setLogs(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch logs");
    } finally {
      setLoadingLogs(false);
    }
  };

  const applyFilter = async (appliedFilterSettings: LogsFilterType) => {
    setFilterSettings(appliedFilterSettings);
    setShouldFetchLogs(true);
  };

  return (
    <div>
      <LogsFilter
        filterSettings={filterSettings}
        setFilterSettings={applyFilter}
      />
      {loadingLogs ? (
        <div className="wpqt-flex wpqt-justify-center wpqt-py-6">
          <Loading ovalSize="32" />
        </div>
      ) : logs.length === 0 ? (
        <NoFilterResults text={__("No logs found", "quicktasker")} />
      ) : (
        <LogsTable logs={logs} />
      )}
    </div>
  );
};

function LogsTable({ logs }: { logs: Log[] }) {
  return (
    <div className="wpqt-inline-grid wpqt-grid-cols-[auto_auto_auto_auto] wpqt-items-center wpqt-gap-x-8 wpqt-gap-y-3">
      <div className="wpqt-mb-2 wpqt-font-bold">
        {__("Status", "quicktasker")}
      </div>
      <div className="wpqt-mb-2 wpqt-font-bold">
        {__("Created at", "quicktasker")}
      </div>
      <div className="wpqt-mb-2 wpqt-font-bold">
        {__("Author", "quicktasker")}
      </div>
      <div className="wpqt-mb-2 wpqt-font-bold">
        {__("Message", "quicktasker")}
      </div>
      {logs.map((log) => (
        <LogRow log={log} key={log.id} />
      ))}
    </div>
  );
}

function LogRow({ log }: { log: Log }) {
  const { convertToWPTimezone } = useTimezone();
  const createdBy = logCreatedByString[log.created_by];
  const isAnonymous = log.created_by === WPQTLogCreatedBy.Anonymous;
  const isError = log.log_status === LogStatusEnum.Error;
  return (
    <>
      <span
        className={`wpqt-h-2 wpqt-w-2 wpqt-rounded-full ${
          isError ? "wpqt-bg-red-500" : "wpqt-bg-green-500"
        }`}
        title={isError ? "Error" : "Success"}
      />
      <span className="wpqt-text-gray-500 wpqt-tabular-nums">
        {convertToWPTimezone(log.created_at)}
      </span>
      <span>
        {isAnonymous ? (
          <span className="wpqt-font-semibold">{createdBy}</span>
        ) : (
          <>
            <span className="wpqt-font-semibold">{log.author_name}</span>
            <span className="wpqt-text-gray-500"> ({createdBy})</span>
          </>
        )}
      </span>
      <span>{log.text}</span>
    </>
  );
}

export {
  LogCreatedByEnum,
  LogNumberEnum,
  LogOrderEnum,
  LogsPageContent,
  LogStatusFilterEnum,
  LogTypeEnum,
  type LogsFilterType,
  type ServerLogsFilterType,
};
