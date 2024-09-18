import { toast } from "react-toastify";
import { UserSession } from "../../../types/user-session";
import { PowerIcon } from "@heroicons/react/24/outline";
import { changeUserSessionStatusRequest } from "../../../api/api";
import { useContext } from "@wordpress/element";
import { UserSessionsContext } from "../../../providers/UserSessionsContextProvider";
import { CHANGE_USER_SESSION_STATUS } from "../../../constants";

type Props = {
  session: UserSession;
};

function UserSession({ session }: Props) {
  const { usersSessionDispatch } = useContext(UserSessionsContext);
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
      toast.error("Failed to change session status");
    }
  };

  return (
    <>
      <div>
        <div>{session.user_name}</div>
        <div className="wpqt-italic">{session.user_description}</div>
      </div>
      <div>{session.created_at_utc}</div>
      <div>{session.expires_at_utc}</div>
      <div>{isActive ? "On" : "Off"} </div>
      <div>
        {isActive ? (
          <PowerIcon
            className="wpqt-icon-red wpqt-size-5 wpqt-cursor-pointer"
            onClick={() => changeSessionStatus(false)}
          />
        ) : (
          <PowerIcon
            className="wpqt-icon-green wpqt-size-5 wpqt-cursor-pointer"
            onClick={() => changeSessionStatus(true)}
          />
        )}
      </div>
    </>
  );
}

export { UserSession };
