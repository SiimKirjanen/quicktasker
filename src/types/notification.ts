import { UserTypes } from "./user";

type NotificationFromServer = {
  id: string;
  pipeline_id: string;
  user_id: string;
  user_type: UserTypes;
  date: string;
  text: string;
  mark_as_read: string;
};

type Notification = {
  id: string;
  pipeline_id: string;
  user_id: string;
  user_type: UserTypes;
  date: string;
  text: string;
  mark_as_read: boolean;
};

function mapNotificationFromServer(
  notification: NotificationFromServer,
): Notification {
  return {
    id: notification.id,
    pipeline_id: notification.pipeline_id,
    user_id: notification.user_id,
    user_type: notification.user_type,
    date: notification.date,
    text: notification.text,
    mark_as_read: "1" === String(notification.mark_as_read),
  };
}

enum NotificationFilter {
  ALL = "all",
  UNREAD = "unread",
  READ = "read",
}

export { mapNotificationFromServer, NotificationFilter };
export type { Notification, NotificationFromServer };
