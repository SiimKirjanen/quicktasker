import {
  Webhook,
  WebhookFromServer,
  WebhookTargetAction,
  WebhookTargetType,
} from "../types/webhook";

const convertWebhookFromServer = (webhook: WebhookFromServer): Webhook => ({
  ...webhook,
  webhook_confirm: webhook.webhook_confirm === "1",
});

const convertWebhooksFromServer = (webhooks: WebhookFromServer[]): Webhook[] =>
  webhooks.map(convertWebhookFromServer);

const WebhookTargetTypeActions: Record<
  WebhookTargetType,
  WebhookTargetAction[]
> = {
  [WebhookTargetType.TASK]: [
    WebhookTargetAction.CREATE,
    WebhookTargetAction.UPDATE,
    WebhookTargetAction.DELETE,
    WebhookTargetAction.STAGE_CHANGED,
    WebhookTargetAction.ARCHIVED,
    WebhookTargetAction.RESTORED_ARCHIVED,
    WebhookTargetAction.COMMENT_ADDED,
    WebhookTargetAction.FILE_ADDED,
    WebhookTargetAction.FILE_REMOVED,
    WebhookTargetAction.LABEL_ADDED,
    WebhookTargetAction.LABEL_REMOVED,
  ],
};

export {
  convertWebhookFromServer,
  convertWebhooksFromServer,
  WebhookTargetTypeActions,
};
