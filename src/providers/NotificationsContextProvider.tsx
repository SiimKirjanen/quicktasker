import { createContext, useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getNotificationsRequest } from "../api/api";
import {
  DEFAULT_NOTIFICATIONS_MAX_AGE_HOURS,
  NOTIFICATIONS_SET,
  NOTIFICATIONS_SET_LOADING,
  NOTIFICATION_MARK_READ,
} from "../constants";
import { reducer } from "../reducers/notifications-reducer";
import { Notification, NotificationFromServer } from "../types/notification";

const initialState: State = {
  notifications: [],
  loading: false,
};

type State = {
  notifications: Notification[];
  loading: boolean;
};

type Action =
  | { type: typeof NOTIFICATIONS_SET; payload: NotificationFromServer[] }
  | { type: typeof NOTIFICATIONS_SET_LOADING; payload: boolean }
  | { type: typeof NOTIFICATION_MARK_READ; payload: string };

type Dispatch = (action: Action) => void;

type NotificationsContextValue = {
  state: State;
  notificationsDispatch: Dispatch;
  fetchNotifications: (
    pipelineId: string,
    maxAgeHours?: number,
  ) => Promise<void>;
};

const NotificationsContext = createContext<NotificationsContextValue>({
  state: initialState,
  notificationsDispatch: () => {},
  fetchNotifications: async () => {},
});

const NotificationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, notificationsDispatch] = useReducer(reducer, initialState);

  const fetchNotifications = async (
    pipelineId: string,
    maxAgeHours: number = DEFAULT_NOTIFICATIONS_MAX_AGE_HOURS,
  ) => {
    try {
      notificationsDispatch({
        type: NOTIFICATIONS_SET_LOADING,
        payload: true,
      });
      const response = await getNotificationsRequest(pipelineId, maxAgeHours);
      notificationsDispatch({
        type: NOTIFICATIONS_SET,
        payload: response.data,
      });
    } catch (error) {
      notificationsDispatch({
        type: NOTIFICATIONS_SET_LOADING,
        payload: false,
      });
      toast.error(__("Failed to load notifications", "quicktasker"));
    }
  };

  return (
    <NotificationsContext.Provider
      value={{ state, notificationsDispatch, fetchNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export {
  NotificationsContext,
  NotificationsContextProvider,
  type Action,
  type State,
};
