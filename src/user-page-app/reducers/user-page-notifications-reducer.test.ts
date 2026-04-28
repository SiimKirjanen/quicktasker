import { WPQTComment } from "../../types/comment";
import {
  CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
  SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS,
} from "../constants";
import {
  Action,
  State,
} from "../providers/UserPageNotificationsContextProvider";
import { reducer } from "./user-page-notifications-reducer";

const baseState: State = { newComments: [], loading: true };

const makeComment = (id: string): WPQTComment =>
  ({ id }) as unknown as WPQTComment;

describe("user-page-notifications reducer", () => {
  it("SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS", () => {
    const next = reducer(baseState, {
      type: SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS,
      payload: [makeComment("a")],
    });
    expect(next.newComments).toHaveLength(1);
  });

  it("CHANGE_USER_PAGE_NOTIFICATIONS_LOADING", () => {
    const next = reducer(baseState, {
      type: CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
