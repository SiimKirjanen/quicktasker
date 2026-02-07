import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { ADD_PIPELINE_WEBHOOK } from "../../../../constants";
import { useWebhookActions } from "../../../../hooks/actions/useWebhookActions";
import { useWebhooks } from "../../../../hooks/useWebhooks";
import { webhookUrlSchema } from "../../../../schemas/webhook";
import {
  WebhookTargetAction,
  WebhookTargetType,
} from "../../../../types/webhook";
import {
  convertWebhookFromServer,
  WebhookTargetTypeActions,
} from "../../../../utils/webhooks";

import { WPQTButton } from "../../../../components/common/Button/Button";
import { WPQTInput } from "../../../../components/common/Input/Input";
import { InputErrorText } from "../../../../components/common/Input/InputErrorText/InputErrorText";
import { WPQTLabel } from "../../../../components/common/Label/WPQTLabel";
import { WPQTSelect } from "../../../../components/common/Select/WPQTSelect";
import { Toggle } from "../../../../components/common/Toggle/Toggle";
import { WPQTTooltip } from "../../../../components/Tooltip/WPQTTooltip";

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
    urlValid: false,
    urlDirty: false,
  });
  const { createWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();
  const allowedActions = WebhookTargetTypeActions[targetType] ?? [];

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
    }
  }

  function resetState() {
    setTargetType(WebhookTargetType.TASK);
    setTargetAction(WebhookTargetAction.CREATE);
    setWebhookUrl("");
    setWebhookConfirm(false);
    setValidationState({
      urlValid: false,
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
    <>
      <div className="wpqt-flex wpqt-gap-4 wpqt-mb-4 wpqt-justify-center">
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
            options={Object.values(allowedActions).map((action) => ({
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
            {__("Wait for response", "quicktasker")}
            <QuestionMarkCircleIcon className="wpqt-size-5" />
          </WPQTLabel>
          <Toggle
            checked={webhookConfirm}
            handleChange={setWebhookConfirm}
            id="webhook-confirm"
          />
          <WPQTTooltip id="webhook-confirm-tooltip" />
        </div>
        <div>
          <WPQTLabel labelFor="webhook-url" className="wpqt-block wpqt-mb-3">
            {__("Enter the webhook URL", "quicktasker")}
          </WPQTLabel>
          <WPQTInput
            inputId="webhook-url"
            value={webhookUrl}
            wrapperClassName="!wpqt-mb-0"
            onChange={(value) => {
              setWebhookUrl(value);
              setValidationState((prev) => ({
                ...prev,
                urlDirty: true,
              }));
            }}
          />
          {!validationState.urlValid && validationState.urlDirty && (
            <InputErrorText
              errorText={__("Please enter a valid URL", "quicktasker")}
            />
          )}
        </div>
      </div>
      <div className="wpqt-flex wpqt-justify-center">
        <WPQTButton
          btnText={__("Create Webhook", "quicktasker")}
          onClick={handleCreateWebhook}
          loading={isCreating}
        />
      </div>
    </>
  );
}

export { WebhookCreator };
