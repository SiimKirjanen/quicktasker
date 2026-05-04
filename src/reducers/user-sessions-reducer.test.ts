import {
  SET_USER_SESSIONS,
  SET_USER_SESSIONS_SEARCH_VALUE,
} from "../constants";
import { Action, State } from "../providers/UserSessionsContextProvider";
import { ServerUserSession } from "../types/user-session";
import { reducer } from "./user-sessions-reducer";

const baseState: State = {
  loading: true,
  sessionsSearchValue: "",
  userSessions: [],
};

const makeServerSession = (
  overrides: Partial<ServerUserSession> = {},
): ServerUserSession =>
  ({
    id: "s1",
    is_active: "1",
    ...overrides,
  }) as unknown as ServerUserSession;

describe("user-sessions reducer", () => {
  it("SET_USER_SESSIONS_SEARCH_VALUE", () => {
    const next = reducer(baseState, {
      type: SET_USER_SESSIONS_SEARCH_VALUE,
      payload: "foo",
    });
    expect(next.sessionsSearchValue).toBe("foo");
  });

  it("SET_USER_SESSIONS converts is_active", () => {
    const next = reducer(baseState, {
      type: SET_USER_SESSIONS,
      payload: [
        makeServerSession({ id: "a", is_active: "1" }),
        makeServerSession({ id: "b", is_active: "0" }),
      ],
    });
    expect(next.userSessions[0].is_active).toBe(true);
    expect(next.userSessions[1].is_active).toBe(false);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
