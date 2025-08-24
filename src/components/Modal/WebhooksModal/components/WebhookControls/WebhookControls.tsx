import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  OPEN_WEBHOOKS_LOGS_MODAL,
  REMOVE_PIPELINE_WEBHOOK,
} from "../../../../../constants";
import { useWebhookActions } from "../../../../../hooks/actions/useWebhookActions";
import { useWebhooks } from "../../../../../hooks/useWebhooks";
import { ModalContext } from "../../../../../providers/ModalContextProvider";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";
import { WPQTConfirmTooltip } from "../../../../Dialog/ConfirmTooltip/ConfirmTooltip";

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
    <div className="wpqt-flex wpqt-flex-col wpqt-w-[100px] wpqt-justify-center wpqt-items-center wpqt-gap-2">
      <WPQTButton
        btnText={__("Logs", "quicktasker")}
        onClick={handleLogsBtnClick}
      />
      <WPQTConfirmTooltip
        confirmMessage={__(
          "Are you sure you want to delete this webhook?",
          "quicktasker",
        )}
        onConfirm={handleDeleteWebhook}
      >
        {({ onClick }) => (
          <WPQTButton
            btnText={__("Delete", "quicktasker")}
            buttonStyleType={ButtonStyleType.DANGER}
            loading={isDeleting}
            onClick={onClick}
          />
        )}
      </WPQTConfirmTooltip>
    </div>
  );
}

export { WebhookControls };
