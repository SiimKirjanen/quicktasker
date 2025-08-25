import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "@wordpress/element";
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
import { webhookUrlSchema } from "../../../../../schemas/webhook";
import {
  WebhookTargetAction,
  WebhookTargetType,
} from "../../../../../types/webhook";
import { convertWebhookFromServer } from "../../../../../utils/webhooks";
import { WPQTButton } from "../../../../common/Button/Button";
import { WPQTInput } from "../../../../common/Input/Input";
import { WPQTLabel } from "../../../../common/Label/WPQTLabel";
import { WPQTSelect } from "../../../../common/Select/WPQTSelect";
import { Toggle } from "../../../../common/Toggle/Toggle";
import { WPQTTooltip } from "../../../../Tooltip/WPQTTooltip";

type Props = {
  pipelineId: string;
};

function WebhookCreator({ pipelineId }: Props) {
  const [targetType, setTargetType] = useState(WebhookTargetType.TASK);
  const [targetAction, setTargetAction] = useState(WebhookTargetAction.CREATE);
  const [webhookConfirm, setWebhookConfirm] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [validationState, setValidationState] = useState({
    urlValid: true,
    urlDirty: false,
  });
  const { createWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();
  const { modalDispatch } = useContext(ModalContext);

  async function handleCreateWebhook() {
    if (isCreating || !validationState.urlValid) {
      return;
    }

    setIsCreating(true);
    const { success, webhook } = await createWebhook(
      pipelineId,
      targetType,
      targetAction,
      webhookUrl,
      webhookConfirm,
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
    setWebhookConfirm(false);
    setValidationState({
      urlValid: true,
      urlDirty: false,
    });
  }

  useEffect(() => {
    setValidationState((prev) => ({
      ...prev,
      urlValid: webhookUrlSchema.safeParse(webhookUrl).success,
    }));
  }, [webhookUrl]);

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
        <div>
          <WPQTLabel
            labelFor="webhook-confirm"
            className="wpqt-flex wpqt-mb-3 wpqt-gap-1"
            data-tooltip-id="webhook-confirm-tooltip"
            data-tooltip-content={__(
              "If enabled, the webhook will wait for the HTTP response. Much slower performance but better for debugging.",
              "quicktasker",
            )}
            data-tooltip-variant="info"
          >
            {__("Confirm webhook execution", "quicktasker")}
            <QuestionMarkCircleIcon className="wpqt-size-5" />
          </WPQTLabel>
          <Toggle
            checked={webhookConfirm}
            handleChange={setWebhookConfirm}
            id="webhook-confirm"
          />
          <WPQTTooltip id="webhook-confirm-tooltip" />
        </div>
        <div className="wpqt-flex-1">
          <WPQTLabel labelFor="webhook-url" className="wpqt-block wpqt-mb-3">
            {__("Enter the webhook URL", "quicktasker")}
          </WPQTLabel>
          <WPQTInput
            inputId="webhook-url"
            value={webhookUrl}
            onChange={(value) => {
              setWebhookUrl(value);
              setValidationState((prev) => ({
                ...prev,
                urlDirty: true,
              }));
            }}
            wrapperClassName="!wpqt-w-full !wpqt-mb-0"
            className="!wpqt-w-full"
          />
          {!validationState.urlValid && validationState.urlDirty && (
            <div className="wpqt-text-red-600 wpqt-mt-1">
              {__("Please enter a valid URL", "quicktasker")}
            </div>
          )}
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
