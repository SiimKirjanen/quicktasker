import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";

import { Loading } from "../../../../components/Loading/Loading";
import { Toggle } from "../../../../components/common/Toggle/Toggle";
import { EDIT_PIPELINE_WEBHOOK } from "../../../../constants";
import { useWebhookActions } from "../../../../hooks/actions/useWebhookActions";
import { useWebhooks } from "../../../../hooks/useWebhooks";
import { AppContext } from "../../../../providers/AppContextProvider";
import { Webhook } from "../../../../types/webhook";
import { convertToTimezone } from "../../../../utils/timezone";
import { WebhookControls } from "../WebhookControls/WebhookControls";

type Props = {
  webhook: Webhook;
};

function PipelineWebhook({ webhook }: Props) {
  const {
    state: { timezone },
  } = useContext(AppContext);

  return (
    <div className="wpqt-flex wpqt-gap-4 wpqt-mb-4 wpqt-mt-8 wpqt-justify-center">
      <WebhookProperty
        name={__("Target", "quicktasker")}
        value={webhook.target_type}
        className="!wpqt-w-[100px]"
      />
      <WebhookProperty
        name={__("Action", "quicktasker")}
        value={webhook.target_action}
        className="!wpqt-w-[100px]"
      />
      <WebhookConfirm
        webhook={webhook}
        name={__("Wait for response", "quicktasker")}
        value={webhook.webhook_confirm}
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

type WebhookConfirmProps = {
  webhook: Webhook;
  name: string;
  value: boolean;
};
function WebhookConfirm({ webhook, name, value }: WebhookConfirmProps) {
  const [checked, setChecked] = useState(value);
  const [loading, setLoading] = useState(false);
  const { editWebhook } = useWebhookActions();
  const { pipelineWebhooksDispatch } = useWebhooks();

  const handleWebhookConfirmChange = async (newValue: boolean) => {
    setChecked(newValue);
    setLoading(true);
    const { success } = await editWebhook(webhook.id, {
      webhook_confirm: newValue,
    });
    setLoading(false);
    if (success) {
      toast.success(__("Webhook updated", "quicktasker"));
      pipelineWebhooksDispatch({
        type: EDIT_PIPELINE_WEBHOOK,
        payload: {
          webhookId: webhook.id,
          webhookData: { webhook_confirm: newValue },
        },
      });
    } else {
      setChecked(!newValue);
    }
  };

  return (
    <div className={`wpqt-flex wpqt-flex-col wpqt-w-[160px]`}>
      <div className="wpqt-mb-3 wpqt-font-semibold">{name}</div>
      <div className="wpqt-flex wpqt-gap-2">
        <Toggle checked={checked} handleChange={handleWebhookConfirmChange} />
        {loading && <Loading ovalSize="16" />}
      </div>
    </div>
  );
}

export { PipelineWebhook };
