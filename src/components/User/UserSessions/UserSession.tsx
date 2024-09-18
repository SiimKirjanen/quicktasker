import { toast } from "react-toastify";
import { UserSession } from "../../../types/user-session";
import { PowerIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  changeUserSessionStatusRequest,
  deleteUserSessionRequest,
} from "../../../api/api";
import { useContext } from "@wordpress/element";
import { UserSessionsContext } from "../../../providers/UserSessionsContextProvider";
import {
  CHANGE_USER_SESSION_STATUS,
  DELETE_USER_SESSION,
} from "../../../constants";

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

  const deleteSession = async () => {
    try {
      await deleteUserSessionRequest(session.id);
      usersSessionDispatch({
        type: DELETE_USER_SESSION,
        payload: session.id,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete session");
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
      <div
        className={isActive ? "wpqt-text-qtTextGreen" : "wpqt-text-qtTextRed"}
      >
        {isActive ? "On" : "Off"}
      </div>
      <div className="wpqt-flex wpqt-items-center wpqt-gap-4">
        {isActive ? (
          <PowerIcon
            className="wpqt-icon-red wpqt-size-5 wpqt-cursor-pointer"
            onClick={() => changeSessionStatus(false)}
            title="Turn session off"
          />
        ) : (
          <PowerIcon
            className="wpqt-icon-green wpqt-size-5 wpqt-cursor-pointer"
            onClick={() => changeSessionStatus(true)}
            title="Turn session on"
          />
        )}
        <TrashIcon
          className="wpqt-icon-red wpqt-size-5 wpqt-cursor-pointer"
          title="Delete session"
          onClick={deleteSession}
        />
      </div>
    </>
  );
}

export { UserSession };
