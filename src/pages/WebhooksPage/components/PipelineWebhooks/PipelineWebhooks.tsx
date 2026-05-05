import { useWebhooks } from "../../../../hooks/useWebhooks";
import { PipelineWebhook } from "../PipelineWebhook/PipelineWebhook";

function PipelineWebhooks() {
  const { webhooks } = useWebhooks();

  if (!webhooks || webhooks.length === 0) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-flex-wrap wpqt-justify-center wpqt-gap-4 wpqt-mb-4">
      {webhooks.map((webhook) => (
        <div
          key={webhook.id}
          className="wpqt-w-full md:wpqt-w-[calc(33%-0.5rem)] xl:wpqt-w-[calc(25%-0.75rem)] wpqt-flex"
        >
          <PipelineWebhook webhook={webhook} />
        </div>
      ))}
    </div>
  );
}

export { PipelineWebhooks };
