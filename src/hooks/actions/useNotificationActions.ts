import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  markAllNotificationsReadRequest,
  markNotificationReadRequest,
} from "../../api/api";
import {
  NOTIFICATIONS_MARK_ALL_READ,
  NOTIFICATION_MARK_READ,
} from "../../constants";
import { NotificationsContext } from "../../providers/NotificationsContextProvider";

function useNotificationActions() {
  const { notificationsDispatch } = useContext(NotificationsContext);

  const markAsRead = async (notificationId: string) => {
    try {
      await markNotificationReadRequest(notificationId);
      notificationsDispatch({
        type: NOTIFICATION_MARK_READ,
        payload: notificationId,
      });
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to mark notification as read", "quicktasker"));
    }
  };

  const markAllAsRead = async (notificationIds: string[]) => {
    if (notificationIds.length === 0) return;
    try {
      await markAllNotificationsReadRequest(notificationIds);
      notificationsDispatch({
        type: NOTIFICATIONS_MARK_ALL_READ,
        payload: notificationIds,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        __("Failed to mark all notifications as read", "quicktasker"),
      );
    }
  };

  return {
    markAsRead,
    markAllAsRead,
  };
}

export { useNotificationActions };
