import { renderHook } from "@testing-library/react";
import React from "react";
import { State, UserContext } from "../../providers/UserContextProvider";
import { User, UserTypes } from "../../types/user";
import { useUserFilter } from "./useUserFilter";

function makeState(overrides: Partial<State> = {}): State {
  return { users: [], wpUsers: [], usersSearchValue: "", ...overrides };
}

function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: "u1",
    name: "Alice",
    description: "A user",
    created_at: "2024-01-01T00:00:00Z",
    page_hash: "hash",
    assigned_tasks_count: "0",
    user_type: UserTypes.QUICKTASKER,
    is_active: true,
    is_banned: false,
    banned_at: null,
    has_password: true,
    ...overrides,
  };
}

function wrapper(state: State) {
  const ctx = {
    state,
    userDispatch: jest.fn(),
    updateUsers: jest.fn(),
    updateWPUsers: jest.fn(),
  };
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
  );
  Wrapper.displayName = "UserContextWrapper";
  return Wrapper;
}

describe("useUserFilter", () => {
  it("passes all users when search is empty", () => {
    const { result } = renderHook(() => useUserFilter(), {
      wrapper: wrapper(makeState()),
    });
    expect(result.current.filterUsers(makeUser())).toBe(true);
  });

  it("matches search in name (case-insensitive)", () => {
    const { result } = renderHook(() => useUserFilter(), {
      wrapper: wrapper(makeState({ usersSearchValue: "alice" })),
    });
    expect(result.current.filterUsers(makeUser({ name: "Alice Smith" }))).toBe(
      true,
    );
    expect(result.current.filterUsers(makeUser({ name: "Bob" }))).toBe(false);
  });

  it("matches search in description", () => {
    const { result } = renderHook(() => useUserFilter(), {
      wrapper: wrapper(makeState({ usersSearchValue: "designer" })),
    });
    expect(
      result.current.filterUsers(
        makeUser({ name: "Bob", description: "UI designer" }),
      ),
    ).toBe(true);
    expect(
      result.current.filterUsers(
        makeUser({ name: "Bob", description: "Developer" }),
      ),
    ).toBe(false);
  });
});
