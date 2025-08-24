import { useContext, useEffect, useState } from "@wordpress/element";
import { getGlobalLogsRequest } from "../../../api/api";
import { CLOSE_WEBHOOKS_LOGS_MODAL } from "../../../constants";
import { LogOrderEnum } from "../../../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Log, LogTypeEnum } from "../../../types/log";
import { WebhooksLogsModalSettings } from "../../../types/modal";
import { Logs } from "../../Log/Logs";
import { WPQTModal } from "../WPQTModal";

function WebhooksLogsModal() {
  const {
    state: { webhooksLogsModalOpen, webhooksLogsModalSettings },
    modalDispatch,
  } = useContext(ModalContext);

  return (
    <WPQTModal
      modalOpen={webhooksLogsModalOpen}
      closeModal={() => modalDispatch({ type: CLOSE_WEBHOOKS_LOGS_MODAL })}
      size="lg"
    >
      {webhooksLogsModalOpen && (
        <WebhooksLogsModalContent settings={webhooksLogsModalSettings} />
      )}
    </WPQTModal>
  );
}

type WebhooksLogsModalContentProps = {
  settings: WebhooksLogsModalSettings;
};

function WebhooksLogsModalContent({ settings }: WebhooksLogsModalContentProps) {
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!settings.webhookId) return;

      setLoadingLogs(true);
      setHasError(false);

      try {
        const response = await getGlobalLogsRequest({
          type: LogTypeEnum.Webhook,
          typeId: settings.webhookId,
          order: LogOrderEnum.Desc,
        });
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching webhook logs:", error);
        setHasError(true);
      } finally {
        setLoadingLogs(false);
      }
    };

    if (settings.webhookId) {
      fetchLogs();
    }
  }, [settings.webhookId]);

  if (hasError) {
    return <div>Error fetching logs</div>;
  }

  return <Logs loading={loadingLogs} logs={logs} />;
}

export { WebhooksLogsModal };
