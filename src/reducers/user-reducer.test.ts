import {
  ADD_USER,
  CHANGE_USER_STATUS,
  DELETE_USER,
  EDIT_USER,
  RESET_PASSWORD,
  SET_USERS,
  SET_USERS_SEARCH_VALUE,
  SET_WP_USERS,
} from "../constants";
import { Action, State } from "../providers/UserContextProvider";
import { ServerUser, User, WPUser } from "../types/user";
import { reducer } from "./user-reducer";

const baseState: State = { users: [], wpUsers: [], usersSearchValue: "" };

const makeServerUser = (overrides: Partial<ServerUser> = {}): ServerUser =>
  ({
    id: "u1",
    name: "User",
    is_active: "1",
    has_password: "1",
    ...overrides,
  }) as unknown as ServerUser;

const makeUser = (overrides: Partial<User> = {}): User =>
  ({
    id: "u1",
    name: "User",
    is_active: true,
    has_password: true,
    ...overrides,
  }) as unknown as User;

describe("user reducer", () => {
  it("SET_USERS converts server users", () => {
    const next = reducer(baseState, {
      type: SET_USERS,
      payload: [makeServerUser({ id: "a", is_active: "1" })],
    });
    expect(next.users[0].is_active).toBe(true);
  });

  it("SET_WP_USERS coerces id to string", () => {
    const wpUser = { id: 42, name: "wp" } as unknown as WPUser;
    const next = reducer(baseState, {
      type: SET_WP_USERS,
      payload: [wpUser],
    });
    expect(next.wpUsers[0].id).toBe("42");
  });

  it("ADD_USER appends converted user", () => {
    const state: State = { ...baseState, users: [makeUser({ id: "a" })] };
    const next = reducer(state, {
      type: ADD_USER,
      payload: makeServerUser({ id: "b", has_password: "0" }),
    });
    expect(next.users.map((u) => u.id)).toEqual(["a", "b"]);
    expect(next.users[1].has_password).toBe(false);
  });

  it("EDIT_USER replaces matching user", () => {
    const state: State = {
      ...baseState,
      users: [makeUser({ id: "a", is_active: false })],
    };
    const next = reducer(state, {
      type: EDIT_USER,
      payload: makeServerUser({ id: "a", is_active: "1" }),
    });
    expect(next.users[0].is_active).toBe(true);
  });

  it("CHANGE_USER_STATUS toggles is_active for matching user", () => {
    const state: State = {
      ...baseState,
      users: [makeUser({ id: "a", is_active: true })],
    };
    const next = reducer(state, {
      type: CHANGE_USER_STATUS,
      payload: { userId: "a", isActive: false },
    });
    expect(next.users[0].is_active).toBe(false);
  });

  it("RESET_PASSWORD sets has_password=false for user", () => {
    const state: State = {
      ...baseState,
      users: [makeUser({ id: "a", has_password: true })],
    };
    const next = reducer(state, { type: RESET_PASSWORD, payload: "a" });
    expect(next.users[0].has_password).toBe(false);
  });

  it("DELETE_USER removes by id", () => {
    const state: State = {
      ...baseState,
      users: [makeUser({ id: "a" }), makeUser({ id: "b" })],
    };
    const next = reducer(state, { type: DELETE_USER, payload: "a" });
    expect(next.users.map((u) => u.id)).toEqual(["b"]);
  });

  it("SET_USERS_SEARCH_VALUE", () => {
    const next = reducer(baseState, {
      type: SET_USERS_SEARCH_VALUE,
      payload: "foo",
    });
    expect(next.usersSearchValue).toBe("foo");
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
