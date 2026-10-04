import { SET_CUSTOM_USER_PAGE_STYLES, SET_SITE_URL } from "../constants";
import { Action, initialState, State } from "../providers/AppContextProvider";
import { reducer } from "./app-reducer";

describe("app reducer", () => {
  it("handles SET_SITE_URL", () => {
    const next = reducer(initialState, {
      type: SET_SITE_URL,
      payload: "https://example.com",
    });
    expect(next.siteURL).toBe("https://example.com");
    expect(initialState.siteURL).toBe("");
  });

  it("handles SET_CUSTOM_USER_PAGE_STYLES", () => {
    const state: State = {
      ...initialState,
      userPageCustomStyles: "old",
    };
    const next = reducer(state, {
      type: SET_CUSTOM_USER_PAGE_STYLES,
      payload: "new",
    });
    expect(next.userPageCustomStyles).toBe("new");
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(initialState, unknown)).toBe(initialState);
  });
});
