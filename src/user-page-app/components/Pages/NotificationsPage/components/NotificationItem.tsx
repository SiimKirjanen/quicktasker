import { __ } from "@wordpress/i18n";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { WPQTCard } from "../../../../../components/Card/Card";
import {
  Notification,
  NotificationEntityType,
  NotificationType,
} from "../../../../../types/notification";

type Props = {
  notification: Notification;
  onMarkRead: () => void;
};

function resolveEntityRoute(notification: Notification): string | null {
  if (!notification.entity_hash) {
    return null;
  }
  if (notification.entity_type !== NotificationEntityType.TASK) {
    return null;
  }
  const taskRoute = `/tasks/${notification.entity_hash}`;
  switch (notification.type) {
    case NotificationType.COMMENT_ADDED:
      return `${taskRoute}/comments`;
    case NotificationType.TASK_DELETED:
      return null;
    default:
      return taskRoute;
  }
}

function NotificationItem({ notification, onMarkRead }: Props) {
  const navigate = useNavigate();
  const isUnread = !notification.mark_as_read;
  const targetRoute = resolveEntityRoute(notification);
  const isClickable = targetRoute !== null;

  const handleCardClick = () => {
    if (!targetRoute) {
      return;
    }
    if (isUnread) {
      onMarkRead();
    }
    navigate(targetRoute);
  };

  return (
    <WPQTCard
      title={notification.text}
      description={notification.date}
      onClick={isClickable ? handleCardClick : undefined}
      className={clsx(
        isUnread && "wpqt-border-qtBlue",
        isClickable && "wpqt-cursor-pointer",
      )}
    >
      {isUnread && !isClickable && (
        <button
          type="button"
          onClick={onMarkRead}
          className="wpqt-cursor-pointer wpqt-self-start wpqt-border-0 wpqt-bg-transparent wpqt-text-sm wpqt-text-qtBlue hover:wpqt-text-qtBlueHover"
        >
          {__("Mark as read", "quicktasker")}
        </button>
      )}
    </WPQTCard>
  );
}

export { NotificationItem };
