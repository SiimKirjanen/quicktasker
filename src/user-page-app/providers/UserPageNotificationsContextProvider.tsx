import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  mapNotificationFromServer,
  Notification,
  NotificationFilter,
} from "../../types/notification";
import {
  getUserPageNotificationsPreferencesRequest,
  getUserPageNotificationsRequest,
  markUserPageNotificationReadRequest,
  markUserPageNotificationsReadAllRequest,
  saveUserPageNotificationsPreferencesRequest,
} from "../api/user-page-api";
import {
  CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
  CHECK_NOTIFICATIONS_INTERVAL,
  MARK_USER_PAGE_NOTIFICATIONS_READ,
  SESSION_EXPIRE_NOTIFICATION_TRESHOLD,
  SESSION_NOTIFICATION_CHECK_INTERVAL,
  SET_USER_PAGE_NOTIFICATIONS,
  SET_USER_PAGE_NOTIFICATIONS_FILTER,
  SET_USER_PAGE_NOTIFICATIONS_MAX_AGE,
} from "../constants";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useSession } from "../hooks/useSession";
import { reducer } from "../reducers/user-page-notifications-reducer";
import { UserPageAppContext } from "./UserPageAppContextProvider";

const DEFAULT_MAX_AGE_HOURS = 24;

const initialState: State = {
  notifications: [],
  loading: true,
  filter: NotificationFilter.ALL,
  maxAgeHours: DEFAULT_MAX_AGE_HOURS,
};

type State = {
  notifications: Notification[];
  loading: boolean;
  filter: NotificationFilter;
  maxAgeHours: number;
};

type Action =
  | {
      type: typeof SET_USER_PAGE_NOTIFICATIONS;
      payload: Notification[];
    }
  | {
      type: typeof MARK_USER_PAGE_NOTIFICATIONS_READ;
      payload: string[];
    }
  | { type: typeof CHANGE_USER_PAGE_NOTIFICATIONS_LOADING; payload: boolean }
  | {
      type: typeof SET_USER_PAGE_NOTIFICATIONS_FILTER;
      payload: NotificationFilter;
    }
  | { type: typeof SET_USER_PAGE_NOTIFICATIONS_MAX_AGE; payload: number };

type Dispatch = (action: Action) => void;

type UserPageNotificationsContextType = {
  state: State;
  userPageNotificationsDispatch: Dispatch;
  refreshNotifications: (overrides?: { maxAgeHours?: number }) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  setFilter: (filter: NotificationFilter) => void;
  setMaxAgeHours: (hours: number) => Promise<void>;
};

const UserPageNotificationsContext =
  createContext<UserPageNotificationsContextType>({
    state: initialState,
    userPageNotificationsDispatch: () => {},
    refreshNotifications: async () => {},
    markAsRead: async () => {},
    markAllAsRead: async () => {},
    setFilter: () => {},
    setMaxAgeHours: async () => {},
  });

const UserPageNotificationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, userPageNotificationsDispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);
  const {
    state: { pageHash, isLoggedIn, isQuicktaskerUser },
  } = useContext(UserPageAppContext);
  const { handleError } = useErrorHandler();
  const { getSessionTimeLeft } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      refreshNotifications();
    }, CHECK_NOTIFICATIONS_INTERVAL);
    loadPreferencesThenRefresh();

    return () => {
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  const loadPreferencesThenRefresh = async () => {
    if (!isLoggedIn) {
      return;
    }
    try {
      const response = await getUserPageNotificationsPreferencesRequest();
      const prefs = response.data;
      const filterFromServer = isValidFilter(prefs.filter)
        ? (prefs.filter as NotificationFilter)
        : NotificationFilter.ALL;
      const maxAgeFromServer =
        Number(prefs.max_age_hours) || DEFAULT_MAX_AGE_HOURS;

      userPageNotificationsDispatch({
        type: SET_USER_PAGE_NOTIFICATIONS_FILTER,
        payload: filterFromServer,
      });
      userPageNotificationsDispatch({
        type: SET_USER_PAGE_NOTIFICATIONS_MAX_AGE,
        payload: maxAgeFromServer,
      });

      await refreshNotifications({ maxAgeHours: maxAgeFromServer });
    } catch (error) {
      handleError(error);
      // Fallback to default fetch if preferences load fails.
      await refreshNotifications();
    }
  };

  const isValidFilter = (value: string): boolean =>
    value === NotificationFilter.ALL ||
    value === NotificationFilter.UNREAD ||
    value === NotificationFilter.READ;

  const persistPreferences = async (
    filter: NotificationFilter,
    maxAgeHours: number,
  ) => {
    try {
      await saveUserPageNotificationsPreferencesRequest({
        filter,
        max_age_hours: maxAgeHours,
      });
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!isQuicktaskerUser) {
      return;
    }
    const interval = setInterval(() => {
      sessionExpireTimeCheck();
    }, SESSION_NOTIFICATION_CHECK_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [isQuicktaskerUser]);

  const setLoading = (loading: boolean) => {
    userPageNotificationsDispatch({
      type: CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
      payload: loading,
    });
  };

  const sessionExpireTimeCheck = () => {
    if (!isLoggedIn) {
      return;
    }

    const timeLeft = getSessionTimeLeft(pageHash);

    if (timeLeft && timeLeft <= SESSION_EXPIRE_NOTIFICATION_TRESHOLD) {
      toast.info(
        sprintf(
          __("Your session is about to expire in %s minutes", "quicktasker"),
          timeLeft,
        ),
      );
    }
  };

  const refreshNotifications = async (overrides?: { maxAgeHours?: number }) => {
    if (!isLoggedIn) {
      return;
    }
    try {
      setLoading(true);
      const effectiveMaxAge = overrides?.maxAgeHours ?? state.maxAgeHours;
      const response = await getUserPageNotificationsRequest(effectiveMaxAge);
      const notifications = response.data.map(mapNotificationFromServer);

      userPageNotificationsDispatch({
        type: SET_USER_PAGE_NOTIFICATIONS,
        payload: notifications,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    userPageNotificationsDispatch({
      type: MARK_USER_PAGE_NOTIFICATIONS_READ,
      payload: [id],
    });
    try {
      await markUserPageNotificationReadRequest(Number(id));
    } catch (error) {
      handleError(error);
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = state.notifications
      .filter((n) => !n.mark_as_read)
      .map((n) => n.id);
    if (unreadIds.length === 0) {
      return;
    }
    userPageNotificationsDispatch({
      type: MARK_USER_PAGE_NOTIFICATIONS_READ,
      payload: unreadIds,
    });
    try {
      await markUserPageNotificationsReadAllRequest(unreadIds.map(Number));
    } catch (error) {
      handleError(error);
    }
  };

  const setFilter = (filter: NotificationFilter) => {
    userPageNotificationsDispatch({
      type: SET_USER_PAGE_NOTIFICATIONS_FILTER,
      payload: filter,
    });
    persistPreferences(filter, state.maxAgeHours);
  };

  const setMaxAgeHours = async (hours: number) => {
    userPageNotificationsDispatch({
      type: SET_USER_PAGE_NOTIFICATIONS_MAX_AGE,
      payload: hours,
    });
    await refreshNotifications({ maxAgeHours: hours });
    persistPreferences(state.filter, hours);
  };

  return (
    <UserPageNotificationsContext.Provider
      value={{
        state,
        userPageNotificationsDispatch,
        refreshNotifications,
        markAsRead,
        markAllAsRead,
        setFilter,
        setMaxAgeHours,
      }}
    >
      {children}
    </UserPageNotificationsContext.Provider>
  );
};

export {
  UserPageNotificationsContext,
  UserPageNotificationsContextProvider,
  type Action,
  type State,
};
