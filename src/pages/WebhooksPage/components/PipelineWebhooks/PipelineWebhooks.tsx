import { useWebhooks } from "../../../../hooks/useWebhooks";
import { PipelineWebhook } from "../PipelineWebhook/PipelineWebhook";

function PipelineWebhooks() {
  const { webhooks } = useWebhooks();

  return (
    <div>
      {webhooks.map((webhook) => (
        <PipelineWebhook key={webhook.id} webhook={webhook} />
      ))}
    </div>
  );
}

export { PipelineWebhooks };
