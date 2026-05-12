import { fireEvent, render, screen } from "@testing-library/react";
import {
  CLOSE_NOTIFICATIONS_MODAL,
  NOTIFICATIONS_SET_FILTER,
  NOTIFICATIONS_SET_MAX_AGE,
  NOTIFICATIONS_SET_SELECTED_PIPELINES,
} from "../../../constants";
import * as useNotificationActionsModule from "../../../hooks/actions/useNotificationActions";
import {
  AppContext,
  initialState as appInitialState,
} from "../../../providers/AppContextProvider";
import {
  ModalContext,
  initialState as modalInitialState,
} from "../../../providers/ModalContextProvider";
import { NotificationsContext } from "../../../providers/NotificationsContextProvider";
import { PipelinesContext } from "../../../providers/PipelinesContextProvider";
import {
  defaultNotificationTypePreferences,
  NotificationFilter,
  NotificationTypePreferences,
} from "../../../types/notification";
import { UserTypes } from "../../../types/user";
import { NotificationsModal } from "./NotificationsModal";

jest.mock("../../../hooks/useTimezone", () => ({
  useTimezone: () => ({
    convertToWPTimezone: (d: string) => d,
  }),
}));

jest.mock("../../common/Select/WPQTSelect", () => ({
  WPQTSelect: ({
    id,
    selectedOptionValue,
    options,
    onSelectionChange,
  }: {
    id: string;
    selectedOptionValue: string;
    options: { value: string; label: string }[];
    onSelectionChange: (v: string) => void;
  }) => (
    <select
      data-testid={id}
      value={selectedOptionValue}
      onChange={(e) => onSelectionChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock("../../common/Select/WPQTMultiSelect", () => ({
  WPQTMultiSelect: ({
    id,
    selectedValues,
    onSelectionChange,
  }: {
    id: string;
    selectedValues: string[];
    onSelectionChange: (v: string[]) => void;
  }) => (
    <div data-testid={id}>
      <span data-testid={`${id}-selected`}>{selectedValues.join(",")}</span>
      <button
        type="button"
        data-testid={`${id}-set-subset`}
        onClick={() => onSelectionChange(["1"])}
      >
        subset
      </button>
      <button
        type="button"
        data-testid={`${id}-set-all`}
        onClick={() => onSelectionChange(["1", "2"])}
      >
        all
      </button>
      <button
        type="button"
        data-testid={`${id}-set-none`}
        onClick={() => onSelectionChange([])}
      >
        none
      </button>
    </div>
  ),
}));

describe("NotificationsModal", () => {
  const modalDispatch = jest.fn();
  const notificationsDispatch = jest.fn();
  const fetchNotifications = jest.fn();
  const savePreferences = jest.fn();
  const markAsRead = jest.fn().mockResolvedValue(undefined);
  const markAllAsRead = jest.fn().mockResolvedValue(undefined);

  const pipelines = [
    { id: "1", name: "Board One", description: "", is_primary: true },
    { id: "2", name: "Board Two", description: "", is_primary: false },
  ];

  function renderModal(
    notificationsState: Partial<{
      notifications: ReturnType<typeof buildNotification>[];
      loading: boolean;
      filter: NotificationFilter;
      maxAgeHours: number;
      selectedPipelineIds: string[] | null;
      notificationTypes: NotificationTypePreferences;
    }> = {},
  ) {
    const defaultState = {
      notifications: [],
      loading: false,
      filter: NotificationFilter.ALL,
      maxAgeHours: 24,
      selectedPipelineIds: null as string[] | null,
      notificationTypes: defaultNotificationTypePreferences(),
      ...notificationsState,
    };

    return render(
      <AppContext.Provider
        value={{ state: appInitialState, appDispatch: jest.fn() }}
      >
        <ModalContext.Provider
          value={{
            state: { ...modalInitialState, notificationsModalOpen: true },
            modalDispatch,
          }}
        >
          <PipelinesContext.Provider
            value={{ state: { pipelines }, pipelinesDispatch: jest.fn() }}
          >
            <NotificationsContext.Provider
              value={{
                state: defaultState,
                notificationsDispatch,
                fetchNotifications,
                savePreferences,
              }}
            >
              <NotificationsModal />
            </NotificationsContext.Provider>
          </PipelinesContext.Provider>
        </ModalContext.Provider>
      </AppContext.Provider>,
    );
  }

  function buildNotification(
    overrides: Partial<{
      id: string;
      pipeline_id: string;
      text: string;
      mark_as_read: boolean;
    }> = {},
  ) {
    return {
      id: "n1",
      pipeline_id: "1",
      user_id: "10",
      user_type: UserTypes.WP_USER,
      date: "2026-01-01 00:00:00",
      text: "Hello",
      mark_as_read: false,
      ...overrides,
    };
  }

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(useNotificationActionsModule, "useNotificationActions")
      .mockReturnValue({ markAsRead, markAllAsRead });
  });

  it("does not render when modal is closed", () => {
    render(
      <AppContext.Provider
        value={{ state: appInitialState, appDispatch: jest.fn() }}
      >
        <ModalContext.Provider
          value={{ state: modalInitialState, modalDispatch }}
        >
          <PipelinesContext.Provider
            value={{ state: { pipelines }, pipelinesDispatch: jest.fn() }}
          >
            <NotificationsContext.Provider
              value={{
                state: {
                  notifications: [],
                  loading: false,
                  filter: NotificationFilter.ALL,
                  maxAgeHours: 24,
                  selectedPipelineIds: null,
                  notificationTypes: defaultNotificationTypePreferences(),
                },
                notificationsDispatch,
                fetchNotifications,
                savePreferences,
              }}
            >
              <NotificationsModal />
            </NotificationsContext.Provider>
          </PipelinesContext.Provider>
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    expect(screen.queryByText("Notifications")).not.toBeInTheDocument();
  });

  it("renders empty state when no notifications", () => {
    renderModal();
    expect(screen.getByTestId("notifications-empty")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Mark all as read" }),
    ).not.toBeInTheDocument();
  });

  it("expands null selectedPipelineIds to all board ids in the multi-select", () => {
    renderModal();
    expect(
      screen.getByTestId("notifications-boards-selected"),
    ).toHaveTextContent("1,2");
  });

  it("passes through explicit subset selection", () => {
    renderModal({ selectedPipelineIds: ["1"] });
    expect(
      screen.getByTestId("notifications-boards-selected"),
    ).toHaveTextContent("1");
  });

  it("dispatches and persists filter changes", () => {
    renderModal({ selectedPipelineIds: ["1"] });
    fireEvent.change(screen.getByTestId("notifications-filter"), {
      target: { value: NotificationFilter.UNREAD },
    });

    expect(notificationsDispatch).toHaveBeenCalledWith({
      type: NOTIFICATIONS_SET_FILTER,
      payload: NotificationFilter.UNREAD,
    });
    expect(savePreferences).toHaveBeenCalledWith({
      filter: NotificationFilter.UNREAD,
      maxAgeHours: 24,
      selectedPipelineIds: ["1"],
      notificationTypes: defaultNotificationTypePreferences(),
    });
  });

  it("dispatches, refetches, and persists max-age changes", () => {
    renderModal();
    fireEvent.change(screen.getByTestId("notifications-max-age"), {
      target: { value: "72" },
    });

    expect(notificationsDispatch).toHaveBeenCalledWith({
      type: NOTIFICATIONS_SET_MAX_AGE,
      payload: 72,
    });
    expect(fetchNotifications).toHaveBeenCalledWith({ maxAgeHours: 72 });
    expect(savePreferences).toHaveBeenCalledWith({
      filter: NotificationFilter.ALL,
      maxAgeHours: 72,
      selectedPipelineIds: null,
      notificationTypes: defaultNotificationTypePreferences(),
    });
  });

  it("collapses selecting all boards to a null payload", () => {
    renderModal({ selectedPipelineIds: ["1"] });
    fireEvent.click(screen.getByTestId("notifications-boards-set-all"));

    expect(notificationsDispatch).toHaveBeenCalledWith({
      type: NOTIFICATIONS_SET_SELECTED_PIPELINES,
      payload: null,
    });
    expect(fetchNotifications).toHaveBeenCalledWith({ pipelineIds: null });
    expect(savePreferences).toHaveBeenCalledWith({
      filter: NotificationFilter.ALL,
      maxAgeHours: 24,
      selectedPipelineIds: null,
      notificationTypes: defaultNotificationTypePreferences(),
    });
  });

  it("passes a subset selection through unchanged", () => {
    renderModal();
    fireEvent.click(screen.getByTestId("notifications-boards-set-subset"));

    expect(notificationsDispatch).toHaveBeenCalledWith({
      type: NOTIFICATIONS_SET_SELECTED_PIPELINES,
      payload: ["1"],
    });
    expect(fetchNotifications).toHaveBeenCalledWith({ pipelineIds: ["1"] });
  });

  it("passes an explicit empty selection through as []", () => {
    renderModal();
    fireEvent.click(screen.getByTestId("notifications-boards-set-none"));

    expect(notificationsDispatch).toHaveBeenCalledWith({
      type: NOTIFICATIONS_SET_SELECTED_PIPELINES,
      payload: [],
    });
    expect(fetchNotifications).toHaveBeenCalledWith({ pipelineIds: [] });
  });

  it("filters list by UNREAD", () => {
    renderModal({
      filter: NotificationFilter.UNREAD,
      notifications: [
        buildNotification({
          id: "n1",
          mark_as_read: false,
          text: "unread one",
        }),
        buildNotification({ id: "n2", mark_as_read: true, text: "read one" }),
      ],
    });

    expect(screen.getByText("unread one")).toBeInTheDocument();
    expect(screen.queryByText("read one")).not.toBeInTheDocument();
  });

  it("filters list by READ", () => {
    renderModal({
      filter: NotificationFilter.READ,
      notifications: [
        buildNotification({
          id: "n1",
          mark_as_read: false,
          text: "unread one",
        }),
        buildNotification({ id: "n2", mark_as_read: true, text: "read one" }),
      ],
    });

    expect(screen.queryByText("unread one")).not.toBeInTheDocument();
    expect(screen.getByText("read one")).toBeInTheDocument();
  });

  it("shows board name when pipeline is known", () => {
    renderModal({
      notifications: [buildNotification({ id: "n1", pipeline_id: "2" })],
    });
    expect(screen.getByTestId("notification-board-n1")).toHaveTextContent(
      "Board Two",
    );
  });

  it("omits board name when pipeline is unknown", () => {
    renderModal({
      notifications: [buildNotification({ id: "n1", pipeline_id: "999" })],
    });
    expect(
      screen.queryByTestId("notification-board-n1"),
    ).not.toBeInTheDocument();
  });

  it("calls markAsRead when row's mark-as-read button is clicked", () => {
    renderModal({
      notifications: [buildNotification({ id: "n1", mark_as_read: false })],
    });

    fireEvent.click(screen.getByRole("button", { name: "Mark as read" }));
    expect(markAsRead).toHaveBeenCalledWith("n1");
  });

  it("does not render a per-row mark-as-read button when already read", () => {
    renderModal({
      notifications: [buildNotification({ id: "n1", mark_as_read: true })],
    });
    expect(
      screen.queryByRole("button", { name: "Mark as read" }),
    ).not.toBeInTheDocument();
  });

  it("calls markAllAsRead with only unread ids", () => {
    renderModal({
      notifications: [
        buildNotification({ id: "n1", mark_as_read: false }),
        buildNotification({ id: "n2", mark_as_read: true }),
        buildNotification({ id: "n3", mark_as_read: false }),
      ],
    });

    fireEvent.click(screen.getByRole("button", { name: "Mark all as read" }));
    expect(markAllAsRead).toHaveBeenCalledWith(["n1", "n3"]);
  });

  it("disables 'Mark all as read' when nothing is unread", () => {
    renderModal({
      notifications: [buildNotification({ id: "n1", mark_as_read: true })],
    });
    expect(
      screen.getByRole("button", { name: "Mark all as read" }),
    ).toBeDisabled();
  });

  it("refreshes when refresh icon is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByTestId("notifications-refresh-icon"));
    expect(fetchNotifications).toHaveBeenCalledWith();
  });

  it("does not refresh when already loading", () => {
    renderModal({ loading: true });
    fireEvent.click(screen.getByTestId("notifications-refresh-icon"));
    expect(fetchNotifications).not.toHaveBeenCalled();
  });

  it("dispatches close when modal close button is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByTestId("wpqt-modal-close-button"));
    expect(modalDispatch).toHaveBeenCalledWith({
      type: CLOSE_NOTIFICATIONS_MODAL,
    });
  });
});
