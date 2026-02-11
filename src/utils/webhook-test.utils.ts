import {
  Webhook,
  WebhookTargetAction,
  WebhookTargetType,
} from "../types/webhook";

const mockedWebhooks: Webhook[] = [
  {
    id: "w1",
    pipeline_id: "p1",
    webhook_url: "https://example.com/hook1",
    target_type: WebhookTargetType.TASK,
    target_action: WebhookTargetAction.CREATE,
    target_id: null,
    created_at: "2024-01-01T00:00:00Z",
    webhook_confirm: false,
    active: true,
  },
  {
    id: "w2",
    pipeline_id: "p2",
    webhook_url: "https://example.com/hook2",
    target_type: WebhookTargetType.TASK,
    target_action: WebhookTargetAction.UPDATE,
    target_id: null,
    created_at: "2024-01-02T00:00:00Z",
    webhook_confirm: false,
    active: true,
  },
  {
    id: "w3",
    pipeline_id: "p3",
    webhook_url: "https://example.com/hook3",
    target_type: WebhookTargetType.TASK,
    target_action: WebhookTargetAction.DELETE,
    target_id: null,
    created_at: "2024-01-03T00:00:00Z",
    webhook_confirm: false,
    active: false,
  },
];

export { mockedWebhooks };
