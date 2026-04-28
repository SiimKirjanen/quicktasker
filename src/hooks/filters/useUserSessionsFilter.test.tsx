import { renderHook } from "@testing-library/react";
import React from "react";
import {
  State,
  UserSessionsContext,
} from "../../providers/UserSessionsContextProvider";
import { UserSession } from "../../types/user-session";
import { useUserSessionsFilter } from "./useUserSessionsFilter";

function makeState(overrides: Partial<State> = {}): State {
  return {
    loading: false,
    sessionsSearchValue: "",
    userSessions: [],
    ...overrides,
  };
}

function makeSession(overrides: Partial<UserSession> = {}): UserSession {
  return {
    id: "s1",
    user_id: "u1",
    user_name: "Alice",
    user_description: "A user",
    created_at_utc: "2024-01-01T00:00:00Z",
    expires_at_utc: "2024-12-31T00:00:00Z",
    is_active: true,
    ...overrides,
  };
}

function wrapper(state: State) {
  const ctx = {
    state,
    usersSessionDispatch: jest.fn(),
    loadUserSessions: jest.fn(),
  };
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <UserSessionsContext.Provider value={ctx}>
      {children}
    </UserSessionsContext.Provider>
  );
  Wrapper.displayName = "UserSessionsContextWrapper";
  return Wrapper;
}

describe("useUserSessionsFilter", () => {
  it("passes all sessions when search is empty", () => {
    const { result } = renderHook(() => useUserSessionsFilter(), {
      wrapper: wrapper(makeState()),
    });
    expect(result.current.filterSessions(makeSession())).toBe(true);
  });

  it("matches search in user_name (case-insensitive)", () => {
    const { result } = renderHook(() => useUserSessionsFilter(), {
      wrapper: wrapper(makeState({ sessionsSearchValue: "alice" })),
    });
    expect(
      result.current.filterSessions(makeSession({ user_name: "Alice" })),
    ).toBe(true);
    expect(
      result.current.filterSessions(makeSession({ user_name: "Bob" })),
    ).toBe(false);
  });

  it("matches search in user_description", () => {
    const { result } = renderHook(() => useUserSessionsFilter(), {
      wrapper: wrapper(makeState({ sessionsSearchValue: "admin" })),
    });
    expect(
      result.current.filterSessions(
        makeSession({ user_name: "Bob", user_description: "Site admin" }),
      ),
    ).toBe(true);
    expect(
      result.current.filterSessions(
        makeSession({ user_name: "Bob", user_description: "Regular user" }),
      ),
    ).toBe(false);
  });
});
