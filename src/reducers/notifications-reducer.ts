import {
  NOTIFICATION_MARK_READ,
  NOTIFICATIONS_SET,
  NOTIFICATIONS_SET_LOADING,
} from "../constants";
import { Action, State } from "../providers/NotificationsContextProvider";
import { mapNotificationFromServer } from "../types/notification";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case NOTIFICATIONS_SET: {
      return {
        ...state,
        notifications: action.payload.map(mapNotificationFromServer),
        loading: false,
      };
    }
    case NOTIFICATIONS_SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case NOTIFICATION_MARK_READ: {
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, mark_as_read: true } : n,
        ),
      };
    }
    default:
      return state;
  }
};

export { reducer };
