import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getLogsRequest } from "../../../api/api";
import { CLOSE_USER_LOGS_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTTypes } from "../../../types/enums";
import { Log } from "../../../types/log";
import { UserLogsModalSettings } from "../../../types/modal";
import { NoFilterResults } from "../../Filter/NoFilterResults/NoFilterResults";
import { LogsTable } from "../../LogsTable/LogsTable";
import { WPQTModal, WPQTModalTitle } from "../WPQTModal";

function UserLogsModal() {
  const {
    state: { userLogsModalOpen, userLogsModalSettings },
    modalDispatch,
  } = useContext(ModalContext);

  return (
    <WPQTModal
      modalOpen={userLogsModalOpen}
      closeModal={() => modalDispatch({ type: CLOSE_USER_LOGS_MODAL })}
      size="lg"
      testId="user-logs-modal"
    >
      {userLogsModalOpen && (
        <UserLogsModalContent settings={userLogsModalSettings} />
      )}
    </WPQTModal>
  );
}

type UserLogsModalContentProps = {
  settings: UserLogsModalSettings;
};

function UserLogsModalContent({ settings }: UserLogsModalContentProps) {
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [hasError, setHasError] = useState(false);

  const fetchLogs = async () => {
    if (!settings.userId) return;

    setLoadingLogs(true);
    setHasError(false);

    try {
      const response = await getLogsRequest(settings.userId, WPQTTypes.User);
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching user logs:", error);
      setHasError(true);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (settings.userId) {
      fetchLogs();
    }
  }, [settings.userId]);

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
      <div className="wpqt-flex wpqt-items-start wpqt-gap-2">
        <div className="wpqt-flex wpqt-flex-col">
          <WPQTModalTitle className="!wpqt-mb-0">
            {__("User logs", "quicktasker")}
          </WPQTModalTitle>
          <div className="wpqt-text-sm wpqt-text-gray-500">
            {__("Activity recorded for this user.", "quicktasker")}
          </div>
        </div>
        <div className="wpqt-ml-auto">
          <ArrowPathIcon
            className={`wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover ${
              loadingLogs ? "wpqt-animate-spin wpqt-text-gray-400" : ""
            }`}
            data-testid="user-logs-refresh-icon"
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

export { UserLogsModal };
