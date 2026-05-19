import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getGlobalLogsRequest } from "../../../api/api";
import { CLOSE_API_TOKEN_LOGS_MODAL } from "../../../constants";
import { LogOrderEnum } from "../../../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Log, LogCreatedByEnum, LogTypeEnum } from "../../../types/log";
import { ApiTokenLogsModalSettings } from "../../../types/modal";
import { NoFilterResults } from "../../Filter/NoFilterResults/NoFilterResults";
import { LogsTable } from "../../LogsTable/LogsTable";
import { WPQTModal, WPQTModalTitle } from "../WPQTModal";

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
      testId="api-token-logs-modal"
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

  const fetchLogs = async () => {
    if (!settings.apiTokenId) return;

    setLoadingLogs(true);
    setHasError(false);

    try {
      const [usageResponse, crudResponse] = await Promise.all([
        getGlobalLogsRequest({
          createdById: settings.apiTokenId,
          createdBy: LogCreatedByEnum.ApiToken,
          order: LogOrderEnum.Desc,
        }),
        getGlobalLogsRequest({
          type: LogTypeEnum.ApiToken,
          typeId: settings.apiTokenId,
          order: LogOrderEnum.Desc,
        }),
      ]);
      const merged = [...usageResponse.data, ...crudResponse.data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setLogs(merged);
    } catch (error) {
      console.error("Error fetching API token logs:", error);
      setHasError(true);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (settings.apiTokenId) {
      fetchLogs();
    }
  }, [settings.apiTokenId]);

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
      <div className="wpqt-flex wpqt-items-start wpqt-gap-2">
        <div className="wpqt-flex wpqt-flex-col">
          <WPQTModalTitle className="!wpqt-mb-0">
            {__("API token logs", "quicktasker")}
          </WPQTModalTitle>
          <div className="wpqt-text-sm wpqt-text-gray-500">
            {__("Requests made to the API using this token.", "quicktasker")}
          </div>
        </div>
        <div className="wpqt-ml-auto">
          <ArrowPathIcon
            className={`wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover ${
              loadingLogs ? "wpqt-animate-spin wpqt-text-gray-400" : ""
            }`}
            data-testid="api-token-logs-refresh-icon"
            aria-label={__("Refresh logs", "quicktasker")}
            onClick={() => {
              if (!loadingLogs) fetchLogs();
            }}
          />
        </div>
      </div>

      <div className="wpqt-min-h-[200px]">
        {hasError ? (
          <div>{__("Error fetching logs", "quicktasker")}</div>
        ) : logs.length === 0 ? (
          loadingLogs ? null : (
            <NoFilterResults text={__("No logs found", "quicktasker")} />
          )
        ) : (
          <LogsTable logs={logs} />
        )}
      </div>
    </div>
  );
}

export { ApiTokenLogsModal };
