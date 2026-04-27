import { WebhookFromServer } from "../types/webhook";
import {
  convertWebhookFromServer,
  convertWebhooksFromServer,
} from "./webhooks";

const makeServerWebhook = (
  overrides: Partial<WebhookFromServer> = {},
): WebhookFromServer =>
  ({
    id: "1",
    webhook_confirm: "1",
    active: "0",
    ...overrides,
  }) as unknown as WebhookFromServer;

describe("webhook utils", () => {
  it("convertWebhookFromServer converts flags", () => {
    const result = convertWebhookFromServer(makeServerWebhook());
    expect(result.webhook_confirm).toBe(true);
    expect(result.active).toBe(false);
  });

  it("convertWebhooksFromServer converts list", () => {
    const result = convertWebhooksFromServer([
      makeServerWebhook({ id: "a", active: "1" }),
      makeServerWebhook({ id: "b", active: "0" }),
    ]);
    expect(result.map((w) => w.id)).toEqual(["a", "b"]);
    expect(result[0].active).toBe(true);
    expect(result[1].active).toBe(false);
  });
});
