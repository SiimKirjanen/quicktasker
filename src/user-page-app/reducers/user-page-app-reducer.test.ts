import { UserTypes } from "../../types/user";
import {
  RESET_USER_PAGE_STATUS,
  SET_INIT_DATA,
  SET_USER_LOGGED_IN,
  SET_USER_PAGE_STATUS,
} from "../constants";
import {
  Action,
  initialState,
  State,
} from "../providers/UserPageAppContextProvider";
import { ServerUserPageStatus } from "../types/user-page-status";
import { reducer } from "./user-page-app-reducer";

describe("user-page-app reducer", () => {
  it("SET_USER_PAGE_STATUS sets profile + clears initialLoading", () => {
    const status = {
      isActiveUser: "1",
      setupCompleted: true,
      userId: "u1",
      userName: "User",
      isQuicktaskerUser: true,
      isWordPressUser: false,
      userType: UserTypes.QUICKTASKER,
      profilePictureUrl: "/x.png",
    } as unknown as ServerUserPageStatus;
    const next = reducer(initialState, {
      type: SET_USER_PAGE_STATUS,
      payload: status,
    });
    expect(next.initialLoading).toBe(false);
    expect(next.isActiveUser).toBe(true);
    expect(next.userName).toBe("User");
    expect(next.userType).toBe(UserTypes.QUICKTASKER);
  });

  it("SET_USER_LOGGED_IN", () => {
    const next = reducer(initialState, {
      type: SET_USER_LOGGED_IN,
      payload: true,
    });
    expect(next.isLoggedIn).toBe(true);
  });

  it("SET_INIT_DATA stores timezone", () => {
    const next = reducer(initialState, {
      type: SET_INIT_DATA,
      payload: { timezone: "UTC" },
    });
    expect(next.timezone).toBe("UTC");
  });

  it("RESET_USER_PAGE_STATUS returns initial state", () => {
    const dirty: State = { ...initialState, isLoggedIn: true, userId: "u1" };
    const next = reducer(dirty, { type: RESET_USER_PAGE_STATUS });
    expect(next).toEqual(initialState);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(initialState, unknown)).toBe(initialState);
  });
});
