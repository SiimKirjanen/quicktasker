import { createContext, useCallback, useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  getNotificationsRequest,
  saveNotificationPreferencesRequest,
} from "../api/api";
import {
  DEFAULT_NOTIFICATIONS_MAX_AGE_HOURS,
  NOTIFICATIONS_MARK_ALL_READ,
  NOTIFICATIONS_SET,
  NOTIFICATIONS_SET_FILTER,
  NOTIFICATIONS_SET_LOADING,
  NOTIFICATIONS_SET_MAX_AGE,
  NOTIFICATIONS_SET_SELECTED_PIPELINES,
  NOTIFICATION_MARK_READ,
} from "../constants";
import { reducer } from "../reducers/notifications-reducer";
import {
  Notification,
  NotificationFilter,
  NotificationFromServer,
} from "../types/notification";

const VALID_FILTERS: NotificationFilter[] = [
  NotificationFilter.ALL,
  NotificationFilter.UNREAD,
  NotificationFilter.READ,
];

const buildInitialState = (): State => {
  const prefs = window.wpqt?.initialNotificationPreferences;
  const filter = (
    prefs && VALID_FILTERS.includes(prefs.filter as NotificationFilter)
      ? prefs.filter
      : NotificationFilter.ALL
  ) as NotificationFilter;
  const maxAgeHours =
    prefs?.max_age_hours ?? DEFAULT_NOTIFICATIONS_MAX_AGE_HOURS;
  const selectedPipelineIds =
    prefs && prefs.selected_pipeline_ids !== null
      ? prefs.selected_pipeline_ids.map((id) => String(id))
      : null;

  return {
    notifications: [],
    loading: false,
    filter,
    maxAgeHours,
    selectedPipelineIds,
  };
};

const initialState: State = buildInitialState();

type State = {
  notifications: Notification[];
  loading: boolean;
  filter: NotificationFilter;
  maxAgeHours: number;
  // null = "all boards" (no filter); [] = explicit none (skip fetch); string[] = filter to those.
  selectedPipelineIds: string[] | null;
};

type Action =
  | { type: typeof NOTIFICATIONS_SET; payload: NotificationFromServer[] }
  | { type: typeof NOTIFICATIONS_SET_LOADING; payload: boolean }
  | { type: typeof NOTIFICATION_MARK_READ; payload: string }
  | { type: typeof NOTIFICATIONS_MARK_ALL_READ; payload: string[] }
  | { type: typeof NOTIFICATIONS_SET_FILTER; payload: NotificationFilter }
  | { type: typeof NOTIFICATIONS_SET_MAX_AGE; payload: number }
  | {
      type: typeof NOTIFICATIONS_SET_SELECTED_PIPELINES;
      payload: string[] | null;
    };

type Dispatch = (action: Action) => void;

type FetchOverrides = {
  maxAgeHours?: number;
  pipelineIds?: string[] | null;
};

type SavePreferencesArgs = {
  filter: NotificationFilter;
  maxAgeHours: number;
  selectedPipelineIds: string[] | null;
};

type NotificationsContextValue = {
  state: State;
  notificationsDispatch: Dispatch;
  fetchNotifications: (overrides?: FetchOverrides) => Promise<void>;
  savePreferences: (args: SavePreferencesArgs) => void;
};

const NotificationsContext = createContext<NotificationsContextValue>({
  state: initialState,
  notificationsDispatch: () => {},
  fetchNotifications: async () => {},
  savePreferences: () => {},
});

const NotificationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, notificationsDispatch] = useReducer(reducer, initialState);

  const fetchNotifications = useCallback(
    async (overrides: FetchOverrides = {}) => {
      const maxAgeHours = overrides.maxAgeHours ?? state.maxAgeHours;
      const pipelineIds =
        overrides.pipelineIds !== undefined
          ? overrides.pipelineIds
          : state.selectedPipelineIds;

      // Explicit empty selection = show nothing; skip the API call entirely.
      if (Array.isArray(pipelineIds) && pipelineIds.length === 0) {
        notificationsDispatch({ type: NOTIFICATIONS_SET, payload: [] });
        return;
      }

      try {
        notificationsDispatch({
          type: NOTIFICATIONS_SET_LOADING,
          payload: true,
        });
        // null → omit filter param (all boards); array → filter to those.
        const response = await getNotificationsRequest(
          maxAgeHours,
          pipelineIds ?? [],
        );
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
    },
    [state.maxAgeHours, state.selectedPipelineIds],
  );

  const savePreferences = useCallback((args: SavePreferencesArgs) => {
    saveNotificationPreferencesRequest({
      filter: args.filter,
      maxAgeHours: args.maxAgeHours,
      pipelineIds: args.selectedPipelineIds,
    }).catch(() => {
      toast.error(__("Failed to save notification preferences", "quicktasker"));
    });
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        state,
        notificationsDispatch,
        fetchNotifications,
        savePreferences,
      }}
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
