import { useContext, useEffect } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { WPQTSelect } from "../../../../components/common/Select/WPQTSelect";
import { NotificationFilter } from "../../../../types/notification";
import { UserPageNotificationsContext } from "../../../providers/UserPageNotificationsContextProvider";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { NotificationItem } from "./components/NotificationItem";

function NotificationsPage() {
  const {
    state: { notifications, loading, filter, maxAgeHours },
    refreshNotifications,
    markAsRead,
    markAllAsRead,
    setFilter,
    setMaxAgeHours,
  } = useContext(UserPageNotificationsContext);

  useEffect(() => {
    refreshNotifications();
  }, []);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === NotificationFilter.UNREAD) return !n.mark_as_read;
    if (filter === NotificationFilter.READ) return n.mark_as_read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.mark_as_read).length;

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

  return (
    <PageWrap loading={loading} onRefresh={refreshNotifications}>
      <PageContentWrap>
        <div className="wpqt-mb-6 wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-2 wpqt-text-center">
          <p className="wpqt-m-0">
            {sprintf(
              __("You have %d unread %s", "quicktasker"),
              unreadCount,
              unreadCount === 1
                ? __("notification", "quicktasker")
                : __("notifications", "quicktasker"),
            )}
          </p>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="wpqt-cursor-pointer wpqt-border-0 wpqt-bg-transparent wpqt-text-qtBlue hover:wpqt-text-qtBlueHover"
            >
              {__("Mark all as read", "quicktasker")}
            </button>
          )}
        </div>
        <div className="wpqt-mb-3 wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-justify-center wpqt-gap-4">
          <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
            <label htmlFor="user-page-notifications-filter">
              {__("Filter", "quicktasker")}
            </label>
            <WPQTSelect
              id="user-page-notifications-filter"
              allSelector={false}
              selectedOptionValue={filter}
              options={filterOptions}
              onSelectionChange={(value) =>
                setFilter(value as NotificationFilter)
              }
            />
          </div>
          <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
            <label htmlFor="user-page-notifications-max-age">
              {__("Show", "quicktasker")}
            </label>
            <WPQTSelect
              id="user-page-notifications-max-age"
              allSelector={false}
              selectedOptionValue={String(maxAgeHours)}
              options={maxAgeOptions}
              onSelectionChange={(value) => setMaxAgeHours(Number(value))}
            />
          </div>
        </div>
        {filteredNotifications.length === 0 ? (
          <p className="wpqt-text-center wpqt-text-gray-500">
            {__("No notifications", "quicktasker")}
          </p>
        ) : (
          <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={() => markAsRead(notification.id)}
              />
            ))}
          </div>
        )}
      </PageContentWrap>
    </PageWrap>
  );
}

export { NotificationsPage };
