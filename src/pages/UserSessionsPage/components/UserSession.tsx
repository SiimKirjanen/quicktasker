import { PowerIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { changeUserSessionStatusRequest } from "../../../api/api";
import { WPQTOnlyIconBtn } from "../../../components/common/Button/WPQTOnlyIconBtn/WPQTOnlyIconBtn";
import { CHANGE_USER_SESSION_STATUS } from "../../../constants";
import { useTimezone } from "../../../hooks/useTimezone";
import { UserSessionsContext } from "../../../providers/UserSessionsContextProvider";
import { UserSession } from "../../../types/user-session";

type Props = {
  session: UserSession;
};

function UserSession({ session }: Props) {
  const { usersSessionDispatch } = useContext(UserSessionsContext);
  const { convertToWPTimezone } = useTimezone();
  const isActive = session.is_active;

  const changeSessionStatus = async (status: boolean) => {
    try {
      await changeUserSessionStatusRequest(session.id, status);
      usersSessionDispatch({
        type: CHANGE_USER_SESSION_STATUS,
        payload: { sessionId: session.id, status },
      });
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to change session status", "quicktasker"));
    }
  };

  return (
    <>
      <div>
        <div>{session.user_name}</div>
        <div className="wpqt-italic">{session.user_description}</div>
      </div>
      <div>{convertToWPTimezone(session.created_at_utc)}</div>
      <div>{convertToWPTimezone(session.expires_at_utc)}</div>
      <div
        className={isActive ? "wpqt-text-qtTextGreen" : "wpqt-text-qtTextRed"}
      >
        {isActive ? __("On", "quicktasker") : __("Off", "quicktasker")}
      </div>
      <div className="wpqt-flex wpqt-items-center wpqt-gap-4">
        {isActive ? (
          <WPQTOnlyIconBtn
            icon={
              <PowerIcon
                className="wpqt-icon-red wpqt-size-5 wpqt-cursor-pointer"
                title={__("Turn session off", "quicktasker")}
              />
            }
            onClick={() => changeSessionStatus(false)}
          />
        ) : (
          <WPQTOnlyIconBtn
            icon={
              <PowerIcon
                className="wpqt-icon-green wpqt-size-5 wpqt-cursor-pointer"
                title={__("Turn session on", "quicktasker")}
              />
            }
            onClick={() => changeSessionStatus(true)}
          />
        )}
      </div>
    </>
  );
}

export { UserSession };
