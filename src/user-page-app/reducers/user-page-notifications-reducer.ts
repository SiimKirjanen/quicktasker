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

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER_PAGE_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case MARK_USER_PAGE_NOTIFICATIONS_READ: {
      const ids = new Set(action.payload);
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          ids.has(n.id) ? { ...n, mark_as_read: true } : n,
        ),
      };
    }
    case CHANGE_USER_PAGE_NOTIFICATIONS_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_USER_PAGE_NOTIFICATIONS_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case SET_USER_PAGE_NOTIFICATIONS_MAX_AGE: {
      return {
        ...state,
        maxAgeHours: action.payload,
      };
    }
    default:
      return state;
  }
};

export { reducer };
