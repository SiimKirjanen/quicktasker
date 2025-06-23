import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { slackMessageWebhookSchema } from "../../../../../../../../../schemas/slack";
import { Alert } from "../../../../../../../../common/Alert/Alert";
import { WPQTButton } from "../../../../../../../../common/Button/Button";
import { WPQTInput } from "../../../../../../../../common/Input/Input";

type Props = {
  setAutomationMeta: (meta: string) => void;
};
function SlackWebhookMetaInput({ setAutomationMeta }: Props) {
  const [webhook, setWebhook] = useState("");
  const [isWebhookValid, setIsWebhookValid] = useState(true);

  const handleSetWebhook = () => {
    if (isWebhookValid) {
      setAutomationMeta(webhook);
    }
  };

  const validateWebhook = (webhook: string) => {
    try {
      slackMessageWebhookSchema.parse(webhook);
      setIsWebhookValid(true);
    } catch (e) {
      setIsWebhookValid(false);
    }
  };

  useEffect(() => {
    validateWebhook(webhook);
  }, [webhook]);

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-justify-center wpqt-items-center">
      <Alert type="info">
        {__(
          "Make sure your have configured your Slack webhook URL.",
          "quicktasker",
        )}
        <a
          href="https://api.slack.com/messaging/webhooks"
          target="_blank"
          rel="noopener noreferrer"
          className="wpqt-text-blue-500 hover:underline wpqt-ml-1"
        >
          {__("Read more about Slack webhooks.", "quicktasker")}
        </a>
      </Alert>
      <div className="wpqt-flex wpqt-flex-col">
        <label htmlFor="automation-meta-slack-webhook-input">
          {__("Slack webhook URL", "quicktasker")}
        </label>
        <WPQTInput
          inputId="automation-meta-slack-webhook-input"
          value={webhook}
          onChange={setWebhook}
          wrapperClassName="!wpqt-mb-0"
        />
        {!isWebhookValid && (
          <div className="wpqt-text-red-500">
            {__("Invalid Slack webhook", "quicktasker")}
          </div>
        )}
      </div>
      <WPQTButton
        btnText={__("Set webhook URL", "quicktasker")}
        onClick={handleSetWebhook}
      />
    </div>
  );
}

export default SlackWebhookMetaInput;
