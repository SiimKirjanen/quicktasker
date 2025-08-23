import {
  ADD_PIPELINE_WEBHOOK,
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

// Use first two mocks as initial state
const baseState: State = {
  webhooks: [mockedWebhooks[0], mockedWebhooks[1]],
  loading: false,
};

// Helper to clone a webhook with a different id (so we can test add without mutating originals)
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
    // Use a cloned webhook to avoid duplicate id
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

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN_ACTION" } as unknown as Action;
    const next = reducer(baseState, unknown);
    expect(next).toBe(baseState);
  });
});
