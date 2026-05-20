import {
  NOTIFICATION_MARK_READ,
  NOTIFICATIONS_MARK_ALL_READ,
  NOTIFICATIONS_SET,
  NOTIFICATIONS_SET_FILTER,
  NOTIFICATIONS_SET_LOADING,
  NOTIFICATIONS_SET_MAX_AGE,
  NOTIFICATIONS_SET_SELECTED_PIPELINES,
} from "../constants";
import type { Action, State } from "../providers/NotificationsContextProvider";
import {
  defaultNotificationTypePreferences,
  Notification,
  NotificationFilter,
  NotificationFromServer,
} from "../types/notification";
import { UserTypes } from "../types/user";
import { reducer } from "./notifications-reducer";

const makeNotification = (
  overrides: Partial<Notification> = {},
): Notification => ({
  id: "1",
  pipeline_id: "10",
  type: null,
  entity_type: null,
  entity_id: null,
  user_id: "5",
  user_type: UserTypes.WP_USER,
  date: "2026-05-01 12:00:00",
  text: "Hello",
  mark_as_read: false,
  entity_hash: null,
  ...overrides,
});

const baseState: State = {
  notifications: [],
  loading: false,
  filter: NotificationFilter.ALL,
  maxAgeHours: 24,
  selectedPipelineIds: null,
  notificationTypes: defaultNotificationTypePreferences(),
};

describe("notifications reducer", () => {
  it("NOTIFICATIONS_SET maps server payload and clears loading", () => {
    const payload: NotificationFromServer[] = [
      {
        id: "1",
        pipeline_id: "10",
        type: null,
        entity_type: null,
        entity_id: null,
        user_id: "5",
        user_type: UserTypes.WP_USER,
        date: "2026-05-01 12:00:00",
        text: "Hello",
        mark_as_read: "1",
      },
      {
        id: "2",
        pipeline_id: "10",
        type: null,
        entity_type: null,
        entity_id: null,
        user_id: "5",
        user_type: UserTypes.WP_USER,
        date: "2026-05-02 12:00:00",
        text: "World",
        mark_as_read: "0",
      },
    ];

    const next = reducer(
      { ...baseState, loading: true },
      {
        type: NOTIFICATIONS_SET,
        payload,
      },
    );

    expect(next.loading).toBe(false);
    expect(next.notifications).toHaveLength(2);
    expect(next.notifications[0].mark_as_read).toBe(true);
    expect(next.notifications[1].mark_as_read).toBe(false);
  });

  it("NOTIFICATIONS_SET_LOADING toggles loading", () => {
    const next = reducer(baseState, {
      type: NOTIFICATIONS_SET_LOADING,
      payload: true,
    });
    expect(next.loading).toBe(true);
  });

  it("NOTIFICATION_MARK_READ marks only the matching notification", () => {
    const state: State = {
      ...baseState,
      notifications: [
        makeNotification({ id: "1" }),
        makeNotification({ id: "2" }),
      ],
    };

    const next = reducer(state, {
      type: NOTIFICATION_MARK_READ,
      payload: "2",
    });

    expect(next.notifications[0].mark_as_read).toBe(false);
    expect(next.notifications[1].mark_as_read).toBe(true);
  });

  it("NOTIFICATIONS_MARK_ALL_READ marks every id in the payload", () => {
    const state: State = {
      ...baseState,
      notifications: [
        makeNotification({ id: "1" }),
        makeNotification({ id: "2" }),
        makeNotification({ id: "3" }),
      ],
    };

    const next = reducer(state, {
      type: NOTIFICATIONS_MARK_ALL_READ,
      payload: ["1", "3"],
    });

    expect(next.notifications[0].mark_as_read).toBe(true);
    expect(next.notifications[1].mark_as_read).toBe(false);
    expect(next.notifications[2].mark_as_read).toBe(true);
  });

  it("NOTIFICATIONS_SET_FILTER updates the filter", () => {
    const next = reducer(baseState, {
      type: NOTIFICATIONS_SET_FILTER,
      payload: NotificationFilter.UNREAD,
    });
    expect(next.filter).toBe(NotificationFilter.UNREAD);
  });

  it("NOTIFICATIONS_SET_MAX_AGE updates the max age", () => {
    const next = reducer(baseState, {
      type: NOTIFICATIONS_SET_MAX_AGE,
      payload: 168,
    });
    expect(next.maxAgeHours).toBe(168);
  });

  it("NOTIFICATIONS_SET_SELECTED_PIPELINES accepts an array of ids", () => {
    const next = reducer(baseState, {
      type: NOTIFICATIONS_SET_SELECTED_PIPELINES,
      payload: ["10", "11"],
    });
    expect(next.selectedPipelineIds).toEqual(["10", "11"]);
  });

  it("NOTIFICATIONS_SET_SELECTED_PIPELINES accepts null for 'all boards'", () => {
    const next = reducer(
      { ...baseState, selectedPipelineIds: ["10"] },
      { type: NOTIFICATIONS_SET_SELECTED_PIPELINES, payload: null },
    );
    expect(next.selectedPipelineIds).toBeNull();
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    const next = reducer(baseState, unknown);
    expect(next).toBe(baseState);
  });
});
