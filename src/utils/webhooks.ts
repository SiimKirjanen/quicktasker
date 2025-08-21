import { Webhook, WebhookFromServer } from "../types/webhook";

const convertWebhooksFromServer = (
  webhooks: WebhookFromServer[],
): Webhook[] => {
  return webhooks.map((webhook) => ({
    ...webhook,
    webhook_confirm: webhook.webhook_confirm === "1",
  }));
};

export { convertWebhooksFromServer };
