import { Webhook, WebhookFromServer } from "../types/webhook";

const convertWebhookFromServer = (webhook: WebhookFromServer): Webhook => ({
  ...webhook,
  webhook_confirm: webhook.webhook_confirm === "1",
});

const convertWebhooksFromServer = (webhooks: WebhookFromServer[]): Webhook[] =>
  webhooks.map(convertWebhookFromServer);

export { convertWebhookFromServer, convertWebhooksFromServer };
