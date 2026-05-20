import { Notification, NotificationFilter } from "../../types/notification";
import {
  CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
  MARK_USER_PAGE_NOTIFICATIONS_READ,
  SET_USER_PAGE_NOTIFICATIONS,
  SET_USER_PAGE_NOTIFICATIONS_FILTER,
  SET_USER_PAGE_NOTIFICATIONS_MAX_AGE,
} from "../constants";
import {
  Action,
  State,
} from "../providers/UserPageNotificationsContextProvider";
import { reducer } from "./user-page-notifications-reducer";

const baseState: State = {
  notifications: [],
  loading: true,
  filter: NotificationFilter.ALL,
  maxAgeHours: 24,
};

const makeNotification = (id: string, markAsRead = false): Notification =>
  ({ id, mark_as_read: markAsRead }) as unknown as Notification;

describe("user-page-notifications reducer", () => {
  it("SET_USER_PAGE_NOTIFICATIONS", () => {
    const next = reducer(baseState, {
      type: SET_USER_PAGE_NOTIFICATIONS,
      payload: [makeNotification("a"), makeNotification("b")],
    });
    expect(next.notifications).toHaveLength(2);
  });

  it("MARK_USER_PAGE_NOTIFICATIONS_READ flips mark_as_read for given ids", () => {
    const state: State = {
      ...baseState,
      notifications: [
        makeNotification("a"),
        makeNotification("b"),
        makeNotification("c"),
      ],
    };
    const next = reducer(state, {
      type: MARK_USER_PAGE_NOTIFICATIONS_READ,
      payload: ["a", "c"],
    });
    expect(next.notifications.find((n) => n.id === "a")?.mark_as_read).toBe(
      true,
    );
    expect(next.notifications.find((n) => n.id === "b")?.mark_as_read).toBe(
      false,
    );
    expect(next.notifications.find((n) => n.id === "c")?.mark_as_read).toBe(
      true,
    );
  });

  it("CHANGE_USER_PAGE_NOTIFICATIONS_LOADING", () => {
    const next = reducer(baseState, {
      type: CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("SET_USER_PAGE_NOTIFICATIONS_FILTER", () => {
    const next = reducer(baseState, {
      type: SET_USER_PAGE_NOTIFICATIONS_FILTER,
      payload: NotificationFilter.UNREAD,
    });
    expect(next.filter).toBe(NotificationFilter.UNREAD);
  });

  it("SET_USER_PAGE_NOTIFICATIONS_MAX_AGE", () => {
    const next = reducer(baseState, {
      type: SET_USER_PAGE_NOTIFICATIONS_MAX_AGE,
      payload: 168,
    });
    expect(next.maxAgeHours).toBe(168);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
