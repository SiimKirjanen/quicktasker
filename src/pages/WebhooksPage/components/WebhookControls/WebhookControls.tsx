import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTControls } from "../../../../components/Card/WPQTControls/WPQTControls";
import {
  EDIT_PIPELINE_WEBHOOK,
  OPEN_WEBHOOKS_LOGS_MODAL,
  REMOVE_PIPELINE_WEBHOOK,
} from "../../../../constants";
import { useWebhookActions } from "../../../../hooks/actions/useWebhookActions";
import { useWebhooks } from "../../../../hooks/useWebhooks";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { Webhook } from "../../../../types/webhook";

type Props = {
  webhook: Webhook;
};

function WebhookControls({ webhook }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [activateLoading, setActivateLoading] = useState(false);
  const { deleteWebhook, editWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();
  const { modalDispatch } = useContext(ModalContext);

  async function handleDeleteWebhook() {
    setIsDeleting(true);
    const { success } = await deleteWebhook(webhook.id);
    setIsDeleting(false);

    if (success) {
      pipelineWebhooksDispatch({
        type: REMOVE_PIPELINE_WEBHOOK,
        payload: { webhookId: webhook.id },
      });
    }
  }

  async function handleActivateChange(active: boolean) {
    setActivateLoading(true);
    const { success } = await editWebhook(webhook.id, { active });
    setActivateLoading(false);

    if (success) {
      pipelineWebhooksDispatch({
        type: EDIT_PIPELINE_WEBHOOK,
        payload: {
          webhookId: webhook.id,
          webhookData: { active },
        },
      });
    }
  }

  const handleLogsBtnClick = () => {
    modalDispatch({
      type: OPEN_WEBHOOKS_LOGS_MODAL,
      payload: { webhookId: webhook.id },
    });
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
      active={webhook.active}
      activateLoading={activateLoading}
      onActiveChange={handleActivateChange}
    />
  );
}

export { WebhookControls };
