import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getGlobalLogsRequest } from "../../../api/api";
import { CLOSE_WEBHOOKS_LOGS_MODAL } from "../../../constants";
import { LogOrderEnum } from "../../../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Log, LogTypeEnum } from "../../../types/log";
import { WebhooksLogsModalSettings } from "../../../types/modal";
import { NoFilterResults } from "../../Filter/NoFilterResults/NoFilterResults";
import { Loading } from "../../Loading/Loading";
import { LogBox } from "../../LogBox/LogBox";
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
    return <div>{__("Error fetching logs", "quicktasker")}</div>;
  }

  if (loadingLogs) {
    return <Loading ovalSize="32" />;
  }

  if (logs.length === 0) {
    return <NoFilterResults text={__("No logs found", "quicktasker")} />;
  }

  return (
    <div>
      {logs.map((log) => (
        <LogBox key={log.id} log={log}>
          {log.text}
        </LogBox>
      ))}
    </div>
  );
}

export { WebhooksLogsModal };
