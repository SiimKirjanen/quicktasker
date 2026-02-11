import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTControls } from "../../../../components/Card/WPQTControls/WPQTControls";
import {
  OPEN_WEBHOOKS_LOGS_MODAL,
  REMOVE_PIPELINE_WEBHOOK,
} from "../../../../constants";
import { useWebhookActions } from "../../../../hooks/actions/useWebhookActions";
import { useWebhooks } from "../../../../hooks/useWebhooks";
import { ModalContext } from "../../../../providers/ModalContextProvider";

type Props = {
  webhookId: string;
};

function WebhookControls({ webhookId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();
  const { modalDispatch } = useContext(ModalContext);

  async function handleDeleteWebhook() {
    setIsDeleting(true);
    const { success } = await deleteWebhook(webhookId);
    setIsDeleting(false);

    if (success) {
      pipelineWebhooksDispatch({
        type: REMOVE_PIPELINE_WEBHOOK,
        payload: { webhookId },
      });
    }
  }

  const handleLogsBtnClick = () => {
    modalDispatch({ type: OPEN_WEBHOOKS_LOGS_MODAL, payload: { webhookId } });
  };

  return (
    <WPQTControls
      title={__("Controls", "quicktasker")}
      deleteConfirmMessage={__(
        "Are you sure you want to delete this webhook?",
        "quicktasker",
      )}
      onDelete={handleDeleteWebhook}
      openLogs={handleLogsBtnClick}
      deleteLoading={isDeleting}
      active={true}
      onActiveChange={() => {}}
    />
  );
}

export { WebhookControls };
