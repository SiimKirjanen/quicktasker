import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getGlobalLogsRequest } from "../../../api/api";
import { CLOSE_API_TOKEN_LOGS_MODAL } from "../../../constants";
import { LogOrderEnum } from "../../../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Log, LogCreatedByEnum } from "../../../types/log";
import { ApiTokenLogsModalSettings } from "../../../types/modal";
import { NoFilterResults } from "../../Filter/NoFilterResults/NoFilterResults";
import { Loading } from "../../Loading/Loading";
import { LogBox } from "../../LogBox/LogBox";
import { WPQTModal } from "../WPQTModal";

function ApiTokenLogsModal() {
  const {
    state: { apiTokenLogsModalOpen, apiTokenLogsModalSettings },
    modalDispatch,
  } = useContext(ModalContext);

  return (
    <WPQTModal
      modalOpen={apiTokenLogsModalOpen}
      closeModal={() => modalDispatch({ type: CLOSE_API_TOKEN_LOGS_MODAL })}
      size="lg"
    >
      {apiTokenLogsModalOpen && (
        <ApiTokenLogsModalContent settings={apiTokenLogsModalSettings} />
      )}
    </WPQTModal>
  );
}

type ApiTokenLogsModalContentProps = {
  settings: ApiTokenLogsModalSettings;
};

function ApiTokenLogsModalContent({ settings }: ApiTokenLogsModalContentProps) {
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!settings.apiTokenId) return;

      setLoadingLogs(true);
      setHasError(false);

      try {
        const response = await getGlobalLogsRequest({
          createdById: settings.apiTokenId,
          createdBy: LogCreatedByEnum.ApiToken,
          order: LogOrderEnum.Desc,
        });
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching API token logs:", error);
        setHasError(true);
      } finally {
        setLoadingLogs(false);
      }
    };

    if (settings.apiTokenId) {
      fetchLogs();
    }
  }, [settings.apiTokenId]);

  if (hasError) {
    return <div>{__("Error fetching logs", "quicktasker")}</div>;
  }

  if (loadingLogs) {
    return <Loading ovalSize="32" />;
  }

  if (logs.length === 0) {
    return <NoFilterResults text={__("No logs found", "quicktasker")} />;
  }

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4 wpqt-items-start">
      {logs.map((log) => (
        <LogBox key={log.id} log={log}>
          {log.text}
        </LogBox>
      ))}
    </div>
  );
}

export { ApiTokenLogsModal };
