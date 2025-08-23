import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { REMOVE_PIPELINE_WEBHOOK } from "../../../../../constants";
import { useWebhookActions } from "../../../../../hooks/actions/useWebhookActions";
import { useWebhooks } from "../../../../../hooks/useWebhooks";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";

type Props = {
  webhookId: string;
};

function WebhookControls({ webhookId }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();

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

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-w-[100px] wpqt-justify-center">
      <WPQTButton
        btnText={__("Delete", "quicktasker")}
        buttonStyleType={ButtonStyleType.DANGER}
        loading={isDeleting}
        onClick={handleDeleteWebhook}
      />
    </div>
  );
}

export { WebhookControls };
