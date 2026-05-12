import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CLOSE_NOTIFICATIONS_MODAL,
  NOTIFICATIONS_SET_FILTER,
  NOTIFICATIONS_SET_MAX_AGE,
  NOTIFICATIONS_SET_SELECTED_PIPELINES,
  NOTIFICATIONS_SET_TYPE_ENABLED,
} from "../../../constants";
import { useNotificationActions } from "../../../hooks/actions/useNotificationActions";
import { useTimezone } from "../../../hooks/useTimezone";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { NotificationsContext } from "../../../providers/NotificationsContextProvider";
import { PipelinesContext } from "../../../providers/PipelinesContextProvider";
import {
  NOTIFICATION_TYPE_VALUES,
  Notification,
  NotificationFilter,
  NotificationType,
} from "../../../types/notification";
import { WPQTButton } from "../../common/Button/Button";
import { WPQTMultiSelect } from "../../common/Select/WPQTMultiSelect";
import { WPQTSelect } from "../../common/Select/WPQTSelect";
import { Toggle } from "../../common/Toggle/Toggle";
import { WPQTModal, WPQTModalTitle } from "../WPQTModal";

function NotificationsModal() {
  const {
    state: { notificationsModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const {
    state: {
      notifications,
      loading,
      filter,
      maxAgeHours,
      selectedPipelineIds,
      notificationTypes,
    },
    notificationsDispatch,
    fetchNotifications,
    savePreferences,
  } = useContext(NotificationsContext);
  const {
    state: { pipelines },
  } = useContext(PipelinesContext);
  const { markAsRead, markAllAsRead } = useNotificationActions();
  const { convertToWPTimezone } = useTimezone();
  const [markingIds, setMarkingIds] = useState<string[]>([]);
  const [markingAll, setMarkingAll] = useState(false);
  const [typesOpen, setTypesOpen] = useState(false);

  const allPipelineIds = pipelines.map((p) => p.id);
  const pipelineNameById = new Map(pipelines.map((p) => [p.id, p.name]));
  // null = "all boards" (no filter); [] = explicit none; array = filter.
  const effectiveSelectedIds =
    selectedPipelineIds === null ? allPipelineIds : selectedPipelineIds;

  const handleFilterChange = (value: string) => {
    const nextFilter = value as NotificationFilter;
    notificationsDispatch({
      type: NOTIFICATIONS_SET_FILTER,
      payload: nextFilter,
    });
    savePreferences({
      filter: nextFilter,
      maxAgeHours,
      selectedPipelineIds,
      notificationTypes,
    });
  };

  const handleMaxAgeChange = (value: string) => {
    const hours = Number(value);
    notificationsDispatch({
      type: NOTIFICATIONS_SET_MAX_AGE,
      payload: hours,
    });
    fetchNotifications({ maxAgeHours: hours });
    savePreferences({
      filter,
      maxAgeHours: hours,
      selectedPipelineIds,
      notificationTypes,
    });
  };

  const handleBoardsChange = (values: string[]) => {
    // Picking exactly all boards collapses to the "no filter" null state.
    const payload: string[] | null =
      values.length === allPipelineIds.length ? null : values;
    notificationsDispatch({
      type: NOTIFICATIONS_SET_SELECTED_PIPELINES,
      payload,
    });
    fetchNotifications({ pipelineIds: payload });
    savePreferences({
      filter,
      maxAgeHours,
      selectedPipelineIds: payload,
      notificationTypes,
    });
  };

  const handleNotificationTypeToggle = (
    type: NotificationType,
    enabled: boolean,
  ) => {
    const nextTypes = { ...notificationTypes, [type]: enabled };
    notificationsDispatch({
      type: NOTIFICATIONS_SET_TYPE_ENABLED,
      payload: { type, enabled },
    });
    savePreferences({
      filter,
      maxAgeHours,
      selectedPipelineIds,
      notificationTypes: nextTypes,
    });
  };

  const notificationTypeLabels: Record<NotificationType, string> = {
    [NotificationType.TASK_COMPLETION_CHANGED]: __(
      "Task completion changed",
      "quicktasker",
    ),
    [NotificationType.TASK_ASSIGNMENT_CHANGED]: __(
      "Task assignment changed",
      "quicktasker",
    ),
    [NotificationType.TASK_ARCHIVE_CHANGED]: __(
      "Task archived or restored",
      "quicktasker",
    ),
    [NotificationType.TASK_DELETED]: __("Task deleted", "quicktasker"),
    [NotificationType.STAGE_CHANGED]: __("Stage changed", "quicktasker"),
    [NotificationType.DUE_DATE_CHANGED]: __("Due date changed", "quicktasker"),
    [NotificationType.COMMENT_ADDED]: __("Comment added", "quicktasker"),
  };

  const handleMarkAsRead = async (id: string) => {
    setMarkingIds((prev) => [...prev, id]);
    try {
      await markAsRead(id);
    } finally {
      setMarkingIds((prev) => prev.filter((markingId) => markingId !== id));
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = filteredNotifications
      .filter((n) => !n.mark_as_read)
      .map((n) => n.id);

    if (unreadIds.length === 0) return;

    setMarkingAll(true);
    try {
      await markAllAsRead(unreadIds);
    } finally {
      setMarkingAll(false);
    }
  };

  const closeModal = () => {
    modalDispatch({ type: CLOSE_NOTIFICATIONS_MODAL });
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === NotificationFilter.UNREAD) return !n.mark_as_read;
    if (filter === NotificationFilter.READ) return n.mark_as_read;
    return true;
  });

  const filterOptions = [
    { value: NotificationFilter.ALL, label: __("All", "quicktasker") },
    { value: NotificationFilter.UNREAD, label: __("Unread", "quicktasker") },
    { value: NotificationFilter.READ, label: __("Read", "quicktasker") },
  ];

  const maxAgeOptions = [
    { value: "24", label: __("Last 24 hours", "quicktasker") },
    { value: "72", label: __("Last 3 days", "quicktasker") },
    { value: "168", label: __("Last 7 days", "quicktasker") },
    { value: "720", label: __("Last 30 days", "quicktasker") },
  ];

  const boardOptions = pipelines.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <WPQTModal
      modalOpen={notificationsModalOpen}
      closeModal={closeModal}
      size="md"
      testId="notifications-modal"
    >
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-3">
        <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
          <WPQTModalTitle className="!wpqt-mb-0">
            {__("Notifications", "quicktasker")}
          </WPQTModalTitle>
          <div className="wpqt-ml-auto wpqt-flex wpqt-items-center wpqt-gap-2">
            <ArrowPathIcon
              className={`wpqt-size-5 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover ${
                loading ? "wpqt-animate-spin wpqt-text-gray-400" : ""
              }`}
              data-testid="notifications-refresh-icon"
              aria-label={__("Refresh notifications", "quicktasker")}
              onClick={() => {
                if (!loading) fetchNotifications();
              }}
            />
            <AdjustmentsHorizontalIcon
              className={`wpqt-size-5 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover ${
                typesOpen ? "wpqt-text-qtBlue" : ""
              }`}
              data-testid="notifications-types-toggle-icon"
              aria-label={__("Toggle notification types", "quicktasker")}
              aria-expanded={typesOpen}
              onClick={() => setTypesOpen((open) => !open)}
            />
          </div>
        </div>

        <div
          className={`wpqt-grid wpqt-transition-all wpqt-duration-300 wpqt-ease-in-out ${
            typesOpen
              ? "wpqt-grid-rows-[1fr] wpqt-opacity-100"
              : "wpqt-grid-rows-[0fr] wpqt-opacity-0"
          }`}
          aria-hidden={!typesOpen}
        >
          <div className="wpqt-overflow-hidden">
            <div
              className="wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-3 wpqt-py-3"
              data-testid="notifications-types-section"
            >
              <div className="wpqt-mb-2 wpqt-text-sm wpqt-font-medium">
                {__("Notification types", "quicktasker")}
              </div>
              <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-2 sm:wpqt-grid-cols-2">
                {NOTIFICATION_TYPE_VALUES.map((type) => (
                  <label
                    key={type}
                    className="wpqt-flex wpqt-items-center wpqt-justify-between wpqt-gap-3 wpqt-text-sm"
                    htmlFor={`notification-type-${type}`}
                  >
                    <span>{notificationTypeLabels[type]}</span>
                    <Toggle
                      id={`notification-type-${type}`}
                      dataTestId={`notification-type-toggle-${type}`}
                      checked={notificationTypes[type]}
                      handleChange={(checked) =>
                        handleNotificationTypeToggle(type, checked)
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-4">
          <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
            <label htmlFor="notifications-filter">
              {__("Filter", "quicktasker")}
            </label>
            <WPQTSelect
              id="notifications-filter"
              allSelector={false}
              selectedOptionValue={filter}
              options={filterOptions}
              onSelectionChange={handleFilterChange}
            />
          </div>

          <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
            <label htmlFor="notifications-boards">
              {__("Boards", "quicktasker")}
            </label>
            <WPQTMultiSelect
              id="notifications-boards"
              options={boardOptions}
              selectedValues={effectiveSelectedIds}
              onSelectionChange={handleBoardsChange}
              allLabel={__("All boards", "quicktasker")}
              noneLabel={__("No boards", "quicktasker")}
              resetLabel={__("Select all boards", "quicktasker")}
              deselectLabel={__("Deselect all boards", "quicktasker")}
            />
          </div>

          <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
            <label htmlFor="notifications-max-age">
              {__("Show", "quicktasker")}
            </label>
            <WPQTSelect
              id="notifications-max-age"
              allSelector={false}
              selectedOptionValue={String(maxAgeHours)}
              options={maxAgeOptions}
              onSelectionChange={handleMaxAgeChange}
            />
          </div>

          {filteredNotifications.length > 0 && (
            <div className="wpqt-ml-auto">
              <WPQTButton
                btnText={__("Mark all as read", "quicktasker")}
                loading={markingAll}
                disabled={
                  !filteredNotifications.some((n) => !n.mark_as_read) ||
                  markingAll
                }
                onClick={handleMarkAllAsRead}
              />
            </div>
          )}
        </div>

        {filteredNotifications.length === 0 && (
          <div
            className="wpqt-py-4 wpqt-text-center wpqt-text-sm wpqt-text-gray-500"
            data-testid={
              loading ? "notifications-loading" : "notifications-empty"
            }
          >
            {loading
              ? __("Loading…", "quicktasker")
              : __("No notifications", "quicktasker")}
          </div>
        )}

        <ul className="wpqt-flex wpqt-list-none wpqt-flex-col wpqt-gap-2 wpqt-p-0">
          {filteredNotifications.map((notification: Notification) => (
            <li
              key={notification.id}
              data-testid={`notification-row-${notification.id}`}
              className={`wpqt-flex wpqt-items-start wpqt-justify-between wpqt-gap-3 wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-3 ${
                notification.mark_as_read ? "wpqt-bg-white" : "wpqt-bg-blue-50"
              }`}
            >
              <div className="wpqt-flex wpqt-flex-col wpqt-gap-1">
                <div className="wpqt-text-sm">{notification.text}</div>
                <div className="wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-text-xs wpqt-text-gray-500">
                  <span>{convertToWPTimezone(notification.date)}</span>
                  {pipelineNameById.get(notification.pipeline_id) && (
                    <>
                      <span>·</span>
                      <span
                        data-testid={`notification-board-${notification.id}`}
                      >
                        {pipelineNameById.get(notification.pipeline_id)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              {!notification.mark_as_read && (
                <WPQTButton
                  btnText={__("Mark as read", "quicktasker")}
                  loading={markingIds.includes(notification.id)}
                  onClick={() => handleMarkAsRead(notification.id)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </WPQTModal>
  );
}

export { NotificationsModal };
