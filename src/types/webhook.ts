enum WebhookTargetType {
  TASK = "task",
}

enum WebhookTargetAction {
  CREATE = "created",
  UPDATE = "updated",
  DELETE = "deleted",
  STAGE_CHANGED = "stage-changed",
  ARCHIVED = "archived",
  RESTORED_ARCHIVED = "restored-archived",
  COMPLETED = "completed",
  ASSIGNED = "assigned",
  UNASSIGNED = "unassigned",
  COMMENT_ADDED = "comment-added",
  LABEL_ADDED = "label-added",
  LABEL_REMOVED = "label-removed",
  FILE_ADDED = "file-added",
  FILE_REMOVED = "file-removed",
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
