import { __, sprintf } from "@wordpress/i18n";
import { useWebhooks } from "../../../../hooks/useWebhooks";

function PipelineWebhooksInfo() {
  const { webhooks } = useWebhooks();
  const webhooksLenght = webhooks?.length || 0;

  if (webhooksLenght === 0) {
    return (
      <p>
        {__("There are no webhooks configured for this board.", "quicktasker")}
      </p>
    );
  }

  return (
    <p>
      {sprintf(
        /* translators: %d: number of webhooks */
        __("There are %d webhooks configured for this board.", "quicktasker"),
        webhooksLenght,
      )}
    </p>
  );
}
export { PipelineWebhooksInfo };
