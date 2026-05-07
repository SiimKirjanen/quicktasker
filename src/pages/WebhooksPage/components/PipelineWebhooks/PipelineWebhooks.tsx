import { useWebhooks } from "../../../../hooks/useWebhooks";
import { PipelineWebhook } from "../PipelineWebhook/PipelineWebhook";

function PipelineWebhooks() {
  const { webhooks } = useWebhooks();

  if (!webhooks || webhooks.length === 0) {
    return null;
  }

  return (
    <div className="wpqt-grid wpqt-grid-cols-1 md:wpqt-grid-cols-2 xl:wpqt-grid-cols-3 wpqt-gap-4 wpqt-mb-4">
      {webhooks.map((webhook) => (
        <PipelineWebhook key={webhook.id} webhook={webhook} />
      ))}
    </div>
  );
}

export { PipelineWebhooks };
