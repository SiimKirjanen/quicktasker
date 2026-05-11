import {
  NOTIFICATION_MARK_READ,
  NOTIFICATIONS_MARK_ALL_READ,
  NOTIFICATIONS_SET,
  NOTIFICATIONS_SET_FILTER,
  NOTIFICATIONS_SET_LOADING,
  NOTIFICATIONS_SET_MAX_AGE,
  NOTIFICATIONS_SET_SELECTED_PIPELINES,
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
    case NOTIFICATIONS_MARK_ALL_READ: {
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          action.payload.includes(n.id) ? { ...n, mark_as_read: true } : n,
        ),
      };
    }
    case NOTIFICATIONS_SET_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case NOTIFICATIONS_SET_MAX_AGE: {
      return {
        ...state,
        maxAgeHours: action.payload,
      };
    }
    case NOTIFICATIONS_SET_SELECTED_PIPELINES: {
      return {
        ...state,
        selectedPipelineIds: action.payload,
      };
    }
    default:
      return state;
  }
};

export { reducer };
