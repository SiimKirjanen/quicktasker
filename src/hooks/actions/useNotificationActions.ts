import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { markNotificationReadRequest } from "../../api/api";
import { NOTIFICATION_MARK_READ } from "../../constants";
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

  return {
    markAsRead,
  };
}

export { useNotificationActions };
