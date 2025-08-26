enum WebhookTargetType {
  TASK = "task",
}

enum WebhookTargetAction {
  CREATE = "created",
  UPDATE = "updated",
  DELETE = "deleted",
  STAGE_CHANGED = "stage-changed",
}

type BaseWebhook = {
  id: string;
  pipeline_id: string;
  target_type: WebhookTargetType;
  target_id: string | null;
  target_action: WebhookTargetAction;
  webhook_url: string;
  created_at: string;
};

type Webhook = BaseWebhook & {
  webhook_confirm: boolean;
};

type WebhookFromServer = BaseWebhook & {
  webhook_confirm: string;
};

export { WebhookTargetAction, WebhookTargetType };
export type { Webhook, WebhookFromServer };
