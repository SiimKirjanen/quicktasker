import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getGlobalLogsRequest } from "../../../api/api";
import { CLOSE_AUTOMATION_LOGS_MODAL } from "../../../constants";
import { LogOrderEnum } from "../../../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Log, LogCreatedByEnum } from "../../../types/log";
import { AutomationLogsModalSettings } from "../../../types/modal";
import { NoFilterResults } from "../../Filter/NoFilterResults/NoFilterResults";
import { Loading } from "../../Loading/Loading";
import { LogBox } from "../../LogBox/LogBox";
import { WPQTModal } from "../WPQTModal";

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

  useEffect(() => {
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

    if (settings.automationId) {
      fetchLogs();
    }
  }, [settings.automationId]);

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

export { AutomationLogsModal };
