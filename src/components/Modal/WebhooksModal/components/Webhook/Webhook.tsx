import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { AppContext } from "../../../../../providers/AppContextProvider";
import { Webhook } from "../../../../../types/webhook";
import { convertToTimezone } from "../../../../../utils/timezone";
import { WebhookControls } from "../WebhookControls/WebhookControls";

type Props = {
  webhook: Webhook;
};

function Webhook({ webhook }: Props) {
  const {
    state: { timezone },
  } = useContext(AppContext);

  return (
    <div className="wpqt-flex wpqt-gap-4  wpqt-mb-4">
      <WebhookProperty
        name={__("Target", "quicktasker")}
        value={webhook.target_type}
      />
      <WebhookProperty
        name={__("Action", "quicktasker")}
        value={webhook.target_action}
      />
      <WebhookProperty
        name={__("URL", "quicktasker")}
        value={webhook.webhook_url}
        className="wpqt-w-[200px]"
      />
      <WebhookProperty
        name={__("Created", "quicktasker")}
        value={convertToTimezone(webhook.created_at, timezone)}
      />
      <WebhookControls webhookId={webhook.id} />
    </div>
  );
}

type WebhookPropertyProps = {
  name: string;
  value: string;
  className?: string;
};
function WebhookProperty({
  name,
  value,
  className = "",
}: WebhookPropertyProps) {
  return (
    <div className={`wpqt-flex wpqt-flex-col wpqt-w-[160px] ${className}`}>
      <div className="wpqt-mb-3 wpqt-font-semibold">{name}</div>
      <div>{value}</div>
    </div>
  );
}

export { Webhook };
