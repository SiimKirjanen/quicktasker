import { UserTypes } from "./user";

enum NotificationEntityType {
  TASK = "task",
}

type NotificationFromServer = {
  id: string;
  pipeline_id: string;
  type: NotificationType | null;
  entity_type: NotificationEntityType | null;
  entity_id: string | null;
  user_id: string;
  user_type: UserTypes;
  date: string;
  text: string;
  mark_as_read: string;
  entity_hash?: string | null;
};

type Notification = {
  id: string;
  pipeline_id: string;
  type: NotificationType | null;
  entity_type: NotificationEntityType | null;
  entity_id: string | null;
  user_id: string;
  user_type: UserTypes;
  date: string;
  text: string;
  mark_as_read: boolean;
  entity_hash: string | null;
};

function mapNotificationFromServer(
  notification: NotificationFromServer,
): Notification {
  return {
    id: notification.id,
    pipeline_id: notification.pipeline_id,
    type: notification.type ?? null,
    entity_type: notification.entity_type ?? null,
    entity_id: notification.entity_id ?? null,
    user_id: notification.user_id,
    user_type: notification.user_type,
    date: notification.date,
    text: notification.text,
    mark_as_read: "1" === String(notification.mark_as_read),
    entity_hash: notification.entity_hash ?? null,
  };
}

enum NotificationFilter {
  ALL = "all",
  UNREAD = "unread",
  READ = "read",
}

enum NotificationType {
  TASK_COMPLETION_CHANGED = "task_completion_changed",
  TASK_ASSIGNMENT_CHANGED = "task_assignment_changed",
  TASK_ARCHIVE_CHANGED = "task_archive_changed",
  TASK_DELETED = "task_deleted",
  STAGE_CHANGED = "stage_changed",
  DUE_DATE_CHANGED = "due_date_changed",
  COMMENT_ADDED = "comment_added",
}

const NOTIFICATION_TYPE_VALUES: NotificationType[] = [
  NotificationType.TASK_COMPLETION_CHANGED,
  NotificationType.TASK_ASSIGNMENT_CHANGED,
  NotificationType.TASK_ARCHIVE_CHANGED,
  NotificationType.TASK_DELETED,
  NotificationType.STAGE_CHANGED,
  NotificationType.DUE_DATE_CHANGED,
  NotificationType.COMMENT_ADDED,
];

type NotificationTypePreferences = Record<NotificationType, boolean>;

function defaultNotificationTypePreferences(): NotificationTypePreferences {
  return NOTIFICATION_TYPE_VALUES.reduce((acc, type) => {
    acc[type] = true;
    return acc;
  }, {} as NotificationTypePreferences);
}

export {
  defaultNotificationTypePreferences,
  mapNotificationFromServer,
  NOTIFICATION_TYPE_VALUES,
  NotificationEntityType,
  NotificationFilter,
  NotificationType,
};
export type {
  Notification,
  NotificationFromServer,
  NotificationTypePreferences,
};
