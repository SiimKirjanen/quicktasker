import { useContext, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { IoNotificationsOutline } from "react-icons/io5";
import { OPEN_NOTIFICATIONS_MODAL } from "../../constants";
import { ModalContext } from "../../providers/ModalContextProvider";
import { NotificationsContext } from "../../providers/NotificationsContextProvider";

type Props = {
  pipelineId: string;
};

function NotificationsNavLink({ pipelineId }: Props) {
  const { modalDispatch } = useContext(ModalContext);
  const {
    state: { notifications },
    fetchNotifications,
  } = useContext(NotificationsContext);
  const unreadCount = notifications.filter((n) => !n.mark_as_read).length;

  useEffect(() => {
    if (pipelineId) {
      fetchNotifications(pipelineId);
    }
  }, [pipelineId]);

  return (
    <div
      className="wpqt-relative wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
      data-testid="notifications-nav-link"
      onClick={() => modalDispatch({ type: OPEN_NOTIFICATIONS_MODAL })}
    >
      <IoNotificationsOutline className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
      <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
        {__("Notifications", "quicktasker")}
      </span>
      {unreadCount > 0 && (
        <span
          data-testid="notifications-unread-badge"
          className="wpqt-absolute wpqt-left-3 -wpqt-top-3 wpqt-flex wpqt-h-4 wpqt-min-w-4 wpqt-items-center wpqt-justify-center wpqt-rounded-full wpqt-bg-red-400 wpqt-px-1 wpqt-text-[10px] wpqt-font-semibold wpqt-text-white"
        >
          {unreadCount}
        </span>
      )}
    </div>
  );
}

export { NotificationsNavLink };
