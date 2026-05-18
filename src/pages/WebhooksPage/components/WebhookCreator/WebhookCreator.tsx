import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PiWebhooksLogo } from "react-icons/pi";
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
    <div className="wpqt-flex wpqt-flex-col wpqt-items-start wpqt-mt-6">
      <div className="wpqt-flex wpqt-gap-4 wpqt-w-full">
        <div className="wpqt-flex wpqt-flex-col wpqt-flex-1 wpqt-min-w-0">
          <WPQTLabel
            labelFor="webhook-target-type"
            className="wpqt-block wpqt-mb-1"
          >
            {__("Target type", "quicktasker")}
          </WPQTLabel>
          <WPQTSelect
            id="webhook-target-type"
            className="wpqt-w-full"
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

        <div className="wpqt-flex wpqt-flex-col wpqt-flex-1 wpqt-min-w-0">
          <WPQTLabel
            labelFor="webhook-target-action"
            className="wpqt-block wpqt-mb-1"
          >
            {__("Target action", "quicktasker")}
          </WPQTLabel>
          <WPQTSelect
            id="webhook-target-action"
            className="wpqt-w-full"
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
      </div>

      <WPQTLabel
        labelFor="webhook-url"
        className="wpqt-block wpqt-mb-1 wpqt-mt-3"
      >
        {__("Webhook URL", "quicktasker")}
      </WPQTLabel>
      <WPQTInput
        inputId="webhook-url"
        value={webhookUrl}
        wrapperClassName="!wpqt-mb-0 wpqt-w-full"
        className="wpqt-w-full"
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
          errorText={__(
            "Please enter a valid URL including the protocol, e.g. https://example.com/webhook",
            "quicktasker",
          )}
        />
      )}

      <div className="wpqt-mt-4 wpqt-flex wpqt-flex-col wpqt-items-start wpqt-gap-1">
        <WPQTLabel labelFor="webhook-confirm" className="wpqt-block">
          {__("Wait for response", "quicktasker")}
        </WPQTLabel>
        <Toggle
          checked={webhookConfirm}
          handleChange={setWebhookConfirm}
          id="webhook-confirm"
        />
        <span className="wpqt-text-xs wpqt-text-gray-500">
          {__(
            "Intended for development and debugging only. When enabled, the webhook waits for the HTTP response — leaving this on in production will severely slow down board actions.",
            "quicktasker",
          )}
        </span>
      </div>

      <WPQTButton
        className="wpqt-mt-4 wpqt-mb-6 wpqt-self-end"
        btnText={__("Create Webhook", "quicktasker")}
        icon={<PiWebhooksLogo className="wpqt-size-4" />}
        onClick={handleCreateWebhook}
        loading={isCreating}
        disabled={!validationState.urlValid}
      />
    </div>
  );
}

export { WebhookCreator };
