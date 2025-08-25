import {
  ADD_PIPELINE_WEBHOOK,
  EDIT_PIPELINE_WEBHOOK,
  REMOVE_PIPELINE_WEBHOOK,
  SET_PIPELINE_WEBHOOKS,
  SET_PIPELINE_WEBHOOKS_LOADING,
} from "../constants";
import type {
  Action,
  State,
} from "../providers/PipelineWebhooksContextProvider";
import { mockedWebhooks } from "../utils/webhook-test.utils";
import { reducer } from "./pipeline-webhooks-recuder";

// Initial state uses first two mocks
const baseState: State = {
  webhooks: [mockedWebhooks[0], mockedWebhooks[1]],
  loading: false,
};

// Helper to clone a webhook with a different id (avoid id collision)
function cloneWithId(w: (typeof mockedWebhooks)[number], id: string) {
  return { ...w, id };
}

describe("pipeline-webhooks reducer", () => {
  it("handles SET_PIPELINE_WEBHOOKS", () => {
    const newHooks = [mockedWebhooks[1], mockedWebhooks[2]];
    const action: Action = {
      type: SET_PIPELINE_WEBHOOKS,
      payload: { webhooks: newHooks },
    };
    const next = reducer(baseState, action);
    expect(next.webhooks).toEqual(newHooks);
    expect(next).not.toBe(baseState);
  });

  it("handles SET_PIPELINE_WEBHOOKS_LOADING", () => {
    const action: Action = {
      type: SET_PIPELINE_WEBHOOKS_LOADING,
      payload: true,
    };
    const next = reducer(baseState, action);
    expect(next.loading).toBe(true);
    expect(baseState.loading).toBe(false);
  });

  it("handles ADD_PIPELINE_WEBHOOK", () => {
    const added = cloneWithId(mockedWebhooks[2], "w-new");
    const action: Action = {
      type: ADD_PIPELINE_WEBHOOK,
      payload: { webhook: added },
    };
    const next = reducer(baseState, action);
    expect(next.webhooks).toHaveLength(3);
    expect(next.webhooks[2]).toEqual(added);
    expect(baseState.webhooks).toHaveLength(2);
  });

  it("handles REMOVE_PIPELINE_WEBHOOK", () => {
    const action: Action = {
      type: REMOVE_PIPELINE_WEBHOOK,
      payload: { webhookId: mockedWebhooks[0].id },
    };
    const next = reducer(baseState, action);
    expect(next.webhooks.map((w) => w.id)).toEqual([mockedWebhooks[1].id]);
    expect(baseState.webhooks.map((w) => w.id)).toEqual([
      mockedWebhooks[0].id,
      mockedWebhooks[1].id,
    ]);
  });

  it("handles EDIT_PIPELINE_WEBHOOK (updates only targeted webhook)", () => {
    const originalFirst = baseState.webhooks[0];
    const updatedUrl = originalFirst.webhook_url + "/updated";
    const action: Action = {
      type: EDIT_PIPELINE_WEBHOOK,
      payload: {
        webhookId: originalFirst.id,
        webhookData: {
          webhook_url: updatedUrl,
          webhook_confirm: !originalFirst.webhook_confirm,
        },
      },
    };
    const next = reducer(baseState, action);

    const edited = next.webhooks.find((w) => w.id === originalFirst.id)!;
    expect(edited.webhook_url).toBe(updatedUrl);
    expect(edited.webhook_confirm).toBe(!originalFirst.webhook_confirm);

    // Ensure other webhook unchanged
    expect(next.webhooks[1]).toEqual(baseState.webhooks[1]);

    // Ensure original object reference not mutated (different object)
    expect(edited).not.toBe(originalFirst);
    expect(baseState.webhooks[0].webhook_url).toBe(originalFirst.webhook_url);
  });

  it("EDIT_PIPELINE_WEBHOOK on non-existing id leaves list logically unchanged (but new array)", () => {
    const action: Action = {
      type: EDIT_PIPELINE_WEBHOOK,
      payload: {
        webhookId: "non-existent",
        webhookData: { webhook_confirm: true },
      },
    };
    const next = reducer(baseState, action);
    expect(next.webhooks).toEqual(baseState.webhooks);
    // Array instance differs because of map, acceptable behavior
    expect(next.webhooks).not.toBe(baseState.webhooks);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN_ACTION" } as unknown as Action;
    const next = reducer(baseState, unknown);
    expect(next).toBe(baseState);
  });
});
