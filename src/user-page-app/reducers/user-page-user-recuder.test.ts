import {
  SET_USER_PAGE_USER_DATA,
  SET_USER_PAGE_USER_LOADING,
} from "../constants";
import { Action, State } from "../providers/UserPageUserContextProvider";
import { reducer } from "./user-page-user-recuder";

const baseState: State = { user: null, customFields: [], loading: true };

describe("user-page-user reducer", () => {
  it("SET_USER_PAGE_USER_DATA stores user + customFields", () => {
    const next = reducer(baseState, {
      type: SET_USER_PAGE_USER_DATA,
      payload: {
        user: { id: "u1", user_type: "quicktasker" },
        customFields: [],
      } as never,
    });
    expect(next.user?.id).toBe("u1");
  });

  it("SET_USER_PAGE_USER_LOADING", () => {
    const next = reducer(baseState, {
      type: SET_USER_PAGE_USER_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
