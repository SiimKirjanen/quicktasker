import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  ADD_PIPELINE_WEBHOOK,
  HAS_WEBHOOKS,
  SET_WEBHOOK_CREATION_MODAL_OPEN,
} from "../../../../../constants";
import { useWebhookActions } from "../../../../../hooks/actions/useWebhookActions";
import { useWebhooks } from "../../../../../hooks/useWebhooks";
import { ModalContext } from "../../../../../providers/ModalContextProvider";
import {
  WebhookTargetAction,
  WebhookTargetType,
} from "../../../../../types/webhook";
import { convertWebhookFromServer } from "../../../../../utils/webhooks";
import { WPQTButton } from "../../../../common/Button/Button";
import { WPQTInput } from "../../../../common/Input/Input";
import { WPQTLabel } from "../../../../common/Label/WPQTLabel";
import { WPQTSelect } from "../../../../common/Select/WPQTSelect";

type Props = {
  pipelineId: string;
};

function WebhookCreator({ pipelineId }: Props) {
  const [targetType, setTargetType] = useState(WebhookTargetType.TASK);
  const [targetAction, setTargetAction] = useState(WebhookTargetAction.CREATE);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { createWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();
  const { modalDispatch } = useContext(ModalContext);

  async function handleCreateWebhook() {
    if (isCreating) {
      return;
    }

    setIsCreating(true);
    const { success, webhook } = await createWebhook(
      pipelineId,
      targetType,
      targetAction,
      webhookUrl,
    );
    setIsCreating(false);

    if (success && webhook) {
      toast.success(__("Webhook created successfully", "quicktasker"));
      pipelineWebhooksDispatch({
        type: ADD_PIPELINE_WEBHOOK,
        payload: { webhook: convertWebhookFromServer(webhook) },
      });
      resetState();

      if (!HAS_WEBHOOKS) {
        modalDispatch({
          type: SET_WEBHOOK_CREATION_MODAL_OPEN,
          payload: false,
        });
      }
    }
  }

  function resetState() {
    setTargetType(WebhookTargetType.TASK);
    setTargetAction(WebhookTargetAction.CREATE);
    setWebhookUrl("");
  }

  return (
    <div>
      <div className="wpqt-flex wpqt-gap-4 wpqt-mb-4">
        <div>
          <WPQTLabel
            labelFor="webhook-target-type"
            className="wpqt-block wpqt-mb-3"
          >
            {__("Select a target type", "quicktasker")}
          </WPQTLabel>
          <WPQTSelect
            id="webhook-target-type"
            selectedOptionValue={targetType}
            options={Object.values(WebhookTargetType).map((type) => ({
              value: type,
              label: type,
            }))}
            allSelector={false}
            onSelectionChange={(value) =>
              setTargetType(value as WebhookTargetType)
            }
          />
        </div>
        <div>
          <WPQTLabel
            labelFor="webhook-target-action"
            className="wpqt-block wpqt-mb-3"
          >
            {__("Select a target action", "quicktasker")}
          </WPQTLabel>
          <WPQTSelect
            id="webhook-target-action"
            selectedOptionValue={targetAction}
            options={Object.values(WebhookTargetAction).map((action) => ({
              value: action,
              label: action,
            }))}
            allSelector={false}
            onSelectionChange={(value) =>
              setTargetAction(value as WebhookTargetAction)
            }
          />
        </div>
        <div className="wpqt-flex-1">
          <WPQTLabel labelFor="webhook-url" className="wpqt-block wpqt-mb-3">
            {__("Enter the webhook URL", "quicktasker")}
          </WPQTLabel>
          <WPQTInput
            inputId="webhook-url"
            value={webhookUrl}
            onChange={(value) => setWebhookUrl(value)}
            wrapperClassName="!wpqt-w-full"
            className="!wpqt-w-full"
          />
        </div>
      </div>
      <div className="wpqt-flex wpqt-justify-end">
        <WPQTButton
          btnText={__("Create Webhook", "quicktasker")}
          onClick={handleCreateWebhook}
          loading={isCreating}
        />
      </div>
    </div>
  );
}

export { WebhookCreator };
