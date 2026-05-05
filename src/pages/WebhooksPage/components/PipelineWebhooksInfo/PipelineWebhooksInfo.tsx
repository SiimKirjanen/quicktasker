import { __, _n, sprintf } from "@wordpress/i18n";
import { useWebhooks } from "../../../../hooks/useWebhooks";

function PipelineWebhooksInfo() {
  const { webhooks } = useWebhooks();
  const count = webhooks?.length || 0;

  if (count === 0) {
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
        _n(
          "There is %d webhook configured for this board.",
          "There are %d webhooks configured for this board.",
          count,
          "quicktasker",
        ),
        count,
      )}
    </p>
  );
}
export { PipelineWebhooksInfo };
