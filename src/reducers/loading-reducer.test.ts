import { SET_FULL_PAGE_LOADING } from "../constants";
import type { Action, State } from "../providers/LoadingContextProvider";
import { reducer } from "./loading-reducer";

const baseState: State = { fullPageLoading: false };

describe("loading reducer", () => {
  it("handles SET_FULL_PAGE_LOADING true", () => {
    const next = reducer(baseState, {
      type: SET_FULL_PAGE_LOADING,
      payload: true,
    });
    expect(next.fullPageLoading).toBe(true);
    expect(baseState.fullPageLoading).toBe(false);
  });

  it("handles SET_FULL_PAGE_LOADING false", () => {
    const next = reducer(
      { fullPageLoading: true },
      { type: SET_FULL_PAGE_LOADING, payload: false },
    );
    expect(next.fullPageLoading).toBe(false);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    const next = reducer(baseState, unknown);
    expect(next).toBe(baseState);
  });
});
