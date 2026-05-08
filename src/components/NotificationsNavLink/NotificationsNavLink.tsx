import { BellIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
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
      className="wpqt-flex wpqt-items-center wpqt-cursor-pointer wpqt-gap-2 wpqt-group"
      data-testid="notifications-nav-link"
      onClick={() => modalDispatch({ type: OPEN_NOTIFICATIONS_MODAL })}
    >
      <div className="wpqt-relative">
        <BellIcon className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
        {unreadCount > 0 && (
          <span
            data-testid="notifications-unread-badge"
            className="wpqt-absolute -wpqt-right-2 -wpqt-top-2 wpqt-flex wpqt-h-4 wpqt-min-w-4 wpqt-items-center wpqt-justify-center wpqt-rounded-full wpqt-bg-red-600 wpqt-px-1 wpqt-text-[10px] wpqt-font-semibold wpqt-text-white"
          >
            {unreadCount}
          </span>
        )}
      </div>
      <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
        {__("Notifications", "quicktasker")}
      </span>
    </div>
  );
}

export { NotificationsNavLink };
