import {
  ADD_PIPELINE_API_TOKEN,
  REMOVE_PIPELINE_API_TOKEN,
  SET_ACTIVE_PIPELINE_ID,
  SET_PIPELINE_API_TOKENS,
  SET_PIPELINE_API_TOKENS_LOADING,
} from "../constants";
import { Action, State } from "../providers/PipelineApiTokensContextProvider";
import { ApiToken } from "../types/api-token";
import { reducer } from "./pipeline-api-tokens-reducer";

const baseState: State = {
  apiTokens: null,
  loading: true,
  activePipelineId: null,
};

const makeToken = (id: string): ApiToken =>
  ({ id, name: id }) as unknown as ApiToken;

describe("pipeline-api-tokens reducer", () => {
  it("SET_PIPELINE_API_TOKENS sets list", () => {
    const next = reducer(baseState, {
      type: SET_PIPELINE_API_TOKENS,
      payload: { apiTokens: [makeToken("a")] },
    });
    expect(next.apiTokens).toHaveLength(1);
  });

  it("ADD_PIPELINE_API_TOKEN appends", () => {
    const state: State = { ...baseState, apiTokens: [makeToken("a")] };
    const next = reducer(state, {
      type: ADD_PIPELINE_API_TOKEN,
      payload: { apiToken: makeToken("b") },
    });
    expect(next.apiTokens?.map((t) => t.id)).toEqual(["a", "b"]);
  });

  it("ADD_PIPELINE_API_TOKEN initializes when null", () => {
    const next = reducer(baseState, {
      type: ADD_PIPELINE_API_TOKEN,
      payload: { apiToken: makeToken("a") },
    });
    expect(next.apiTokens).toEqual([makeToken("a")]);
  });

  it("SET_PIPELINE_API_TOKENS_LOADING", () => {
    const next = reducer(baseState, {
      type: SET_PIPELINE_API_TOKENS_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("REMOVE_PIPELINE_API_TOKEN removes by id", () => {
    const state: State = {
      ...baseState,
      apiTokens: [makeToken("a"), makeToken("b")],
    };
    const next = reducer(state, {
      type: REMOVE_PIPELINE_API_TOKEN,
      payload: "a",
    });
    expect(next.apiTokens?.map((t) => t.id)).toEqual(["b"]);
  });

  it("REMOVE_PIPELINE_API_TOKEN no-op when null", () => {
    const next = reducer(baseState, {
      type: REMOVE_PIPELINE_API_TOKEN,
      payload: "a",
    });
    expect(next).toBe(baseState);
  });

  it("SET_ACTIVE_PIPELINE_ID", () => {
    const next = reducer(baseState, {
      type: SET_ACTIVE_PIPELINE_ID,
      payload: "p-1",
    });
    expect(next.activePipelineId).toBe("p-1");
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
