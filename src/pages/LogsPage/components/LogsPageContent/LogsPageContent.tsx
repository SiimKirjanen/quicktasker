import { useEffect, useState } from "@wordpress/element";
import { toast } from "react-toastify";
import { getGlobalLogsRequest } from "../../../../api/api";
import { LogsFilter } from "../../../../components/Filter/LogsFilter/LogsFilter";
import { Loading } from "../../../../components/Loading/Loading";
import { useTimezone } from "../../../../hooks/useTimezone";
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
    <div className="wpqt-max-w-[1200px] wpqt-mx-auto">
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
        <GroupedLogs logs={logs} />
      )}
    </div>
  );
};

function GroupedLogs({ logs }: { logs: Log[] }) {
  const { convertToWPTimezone } = useTimezone();
  const groups: { date: string; logs: Log[] }[] = [];
  for (const log of logs) {
    const formatted = convertToWPTimezone(log.created_at);
    const date = formatted.slice(0, formatted.lastIndexOf(" "));
    const last = groups[groups.length - 1];
    if (last && last.date === date) {
      last.logs.push(log);
    } else {
      groups.push({ date, logs: [log] });
    }
  }

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
      {groups.map((group) => (
        <section key={group.date}>
          <h3 className="wpqt-sticky wpqt-top-8 wpqt-z-10 wpqt-mb-1 wpqt-bg-gray-50 wpqt-px-3 wpqt-py-1 wpqt-text-xs wpqt-font-semibold wpqt-uppercase wpqt-tracking-wide wpqt-text-gray-500 wpqt-rounded">
            {group.date}
          </h3>
          <ul className="wpqt-main-border wpqt-rounded wpqt-bg-white wpqt-divide-y">
            {group.logs.map((log) => (
              <LogRow log={log} key={log.id} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function LogRow({ log }: { log: Log }) {
  const { convertToWPTimezone } = useTimezone();
  const createdBy = logCreatedByString[log.created_by];
  const formatted = convertToWPTimezone(log.created_at);
  const time = formatted.split(" ").pop() ?? formatted;
  const isError = log.log_status === LogStatusEnum.Error;
  return (
    <li className="wpqt-flex wpqt-items-baseline wpqt-gap-3 wpqt-px-3 wpqt-py-2 wpqt-text-sm hover:wpqt-bg-gray-50">
      <span
        className={`wpqt-mt-1.5 wpqt-h-2 wpqt-w-2 wpqt-shrink-0 wpqt-rounded-full ${
          isError ? "wpqt-bg-red-500" : "wpqt-bg-green-500"
        }`}
        title={isError ? "Error" : "Success"}
      />
      <span className="wpqt-w-12 wpqt-shrink-0 wpqt-text-gray-500 wpqt-tabular-nums">
        {time}
      </span>
      <span className="wpqt-w-44 wpqt-shrink-0 wpqt-truncate">
        <span className="wpqt-font-semibold">{log.author_name}</span>
        <span className="wpqt-text-gray-500"> ({createdBy})</span>
      </span>
      <span className="wpqt-flex-1 wpqt-min-w-0">{log.text}</span>
    </li>
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
