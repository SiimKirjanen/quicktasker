import {
  CHANGE_USER_SESSION_STATUS,
  SET_USER_SESSIONS,
  SET_USER_SESSIONS_SEARCH_VALUE,
} from "../constants";
import { Action, State } from "../providers/UserSessionsContextProvider";
import { ServerUserSession, UserSession } from "../types/user-session";
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

const makeSession = (overrides: Partial<UserSession> = {}): UserSession =>
  ({ id: "s1", is_active: true, ...overrides }) as unknown as UserSession;

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

  it("CHANGE_USER_SESSION_STATUS toggles only matching session", () => {
    const state: State = {
      ...baseState,
      userSessions: [
        makeSession({ id: "a", is_active: true }),
        makeSession({ id: "b", is_active: true }),
      ],
    };
    const next = reducer(state, {
      type: CHANGE_USER_SESSION_STATUS,
      payload: { sessionId: "a", status: false },
    });
    expect(next.userSessions.find((s) => s.id === "a")?.is_active).toBe(false);
    expect(next.userSessions.find((s) => s.id === "b")?.is_active).toBe(true);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
