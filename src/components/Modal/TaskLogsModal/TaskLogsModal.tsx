import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getGlobalLogsRequest } from "../../../api/api";
import { CLOSE_TASK_LOGS_MODAL } from "../../../constants";
import { LogOrderEnum } from "../../../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Log, LogTypeEnum } from "../../../types/log";
import { TaskLogsModalSettings } from "../../../types/modal";
import { NoFilterResults } from "../../Filter/NoFilterResults/NoFilterResults";
import { LogsTable } from "../../LogsTable/LogsTable";
import { WPQTModal, WPQTModalTitle } from "../WPQTModal";

function TaskLogsModal() {
  const {
    state: { taskLogsModalOpen, taskLogsModalSettings },
    modalDispatch,
  } = useContext(ModalContext);

  return (
    <WPQTModal
      modalOpen={taskLogsModalOpen}
      closeModal={() => modalDispatch({ type: CLOSE_TASK_LOGS_MODAL })}
      size="lg"
      testId="task-logs-modal"
    >
      {taskLogsModalOpen && (
        <TaskLogsModalContent settings={taskLogsModalSettings} />
      )}
    </WPQTModal>
  );
}

type TaskLogsModalContentProps = {
  settings: TaskLogsModalSettings;
};

function TaskLogsModalContent({ settings }: TaskLogsModalContentProps) {
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [hasError, setHasError] = useState(false);

  const fetchLogs = async () => {
    if (!settings.taskId) return;

    setLoadingLogs(true);
    setHasError(false);

    try {
      const response = await getGlobalLogsRequest({
        type: LogTypeEnum.Task,
        typeId: settings.taskId,
        order: LogOrderEnum.Desc,
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching task logs:", error);
      setHasError(true);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (settings.taskId) {
      fetchLogs();
    }
  }, [settings.taskId]);

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
      <div className="wpqt-flex wpqt-items-start wpqt-gap-2">
        <div className="wpqt-flex wpqt-flex-col">
          <WPQTModalTitle className="!wpqt-mb-0">
            {__("Task logs", "quicktasker")}
          </WPQTModalTitle>
          <div className="wpqt-text-sm wpqt-text-gray-500">
            {__("Activity recorded for this task.", "quicktasker")}
          </div>
        </div>
        <div className="wpqt-ml-auto">
          <ArrowPathIcon
            className={`wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover ${
              loadingLogs ? "wpqt-animate-spin wpqt-text-gray-400" : ""
            }`}
            data-testid="task-logs-refresh-icon"
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

export { TaskLogsModal };
