import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getGlobalLogsRequest } from "../../../api/api";
import { CLOSE_AUTOMATION_LOGS_MODAL } from "../../../constants";
import { LogOrderEnum } from "../../../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Log, LogCreatedByEnum } from "../../../types/log";
import { AutomationLogsModalSettings } from "../../../types/modal";
import { NoFilterResults } from "../../Filter/NoFilterResults/NoFilterResults";
import { LogsTable } from "../../LogsTable/LogsTable";
import { WPQTModal, WPQTModalTitle } from "../WPQTModal";

function AutomationLogsModal() {
  const {
    state: { automationLogsModalOpen, automationLogsModalSettings },
    modalDispatch,
  } = useContext(ModalContext);

  return (
    <WPQTModal
      modalOpen={automationLogsModalOpen}
      closeModal={() => modalDispatch({ type: CLOSE_AUTOMATION_LOGS_MODAL })}
      size="lg"
      testId="automation-logs-modal"
    >
      {automationLogsModalOpen && (
        <AutomationLogsModalContent settings={automationLogsModalSettings} />
      )}
    </WPQTModal>
  );
}

type AutomationsLogsModalContentProps = {
  settings: AutomationLogsModalSettings;
};

function AutomationLogsModalContent({
  settings,
}: AutomationsLogsModalContentProps) {
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [hasError, setHasError] = useState(false);

  const fetchLogs = async () => {
    if (!settings.automationId) return;

    setLoadingLogs(true);
    setHasError(false);

    try {
      const response = await getGlobalLogsRequest({
        createdById: settings.automationId,
        createdBy: LogCreatedByEnum.Automation,
        order: LogOrderEnum.Desc,
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching automation logs:", error);
      setHasError(true);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (settings.automationId) {
      fetchLogs();
    }
  }, [settings.automationId]);

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
      <div className="wpqt-flex wpqt-items-start wpqt-gap-2">
        <div className="wpqt-flex wpqt-flex-col">
          <WPQTModalTitle className="!wpqt-mb-0">
            {__("Automation logs", "quicktasker")}
          </WPQTModalTitle>
          <div className="wpqt-text-sm wpqt-text-gray-500">
            {__(
              "Activity recorded when this automation runs against tasks on the board.",
              "quicktasker",
            )}
          </div>
        </div>
        <div className="wpqt-ml-auto">
          <ArrowPathIcon
            className={`wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover ${
              loadingLogs ? "wpqt-animate-spin wpqt-text-gray-400" : ""
            }`}
            data-testid="automation-logs-refresh-icon"
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

export { AutomationLogsModal };
