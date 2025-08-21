enum WebhookTargetType {
  TASK = "task",
  QUICKTASKER = "quicktasker",
}

enum WebhookTargetAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

type BaseWebhook = {
  id: string;
  pipeline_id: string;
  target_type: WebhookTargetType;
  target_id: string;
  target_action: WebhookTargetAction;
  webhook_url: string;
};

type Webhook = BaseWebhook & {
  webhook_confirm: boolean;
};

type WebhookFromServer = BaseWebhook & {
  webhook_confirm: string;
};

export type { Webhook, WebhookFromServer };
