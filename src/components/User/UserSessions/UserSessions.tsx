import { useContext } from "@wordpress/element";
import { UserSessionsContext } from "../../../providers/UserSessionsContextProvider";
import { UserSession } from "./UserSession";
import { useUserSessionsFilter } from "../../../hooks/useUserSessionsFilter";

function UserSessions() {
  const {
    state: { userSessions },
  } = useContext(UserSessionsContext);
  const { filterSessions } = useUserSessionsFilter();
  return (
    <div>
      <div className="wpqt-mb-4 wpqt-grid wpqt-grid-cols-4 wpqt-font-bold">
        <div>Session owner</div>
        <div>Created at</div>
        <div>Expires at</div>
        <div>Actions</div>
      </div>
      <div className="wpqt-grid wpqt-grid-cols-4 wpqt-items-center wpqt-gap-y-4">
        {userSessions.filter(filterSessions).map((session) => (
          <UserSession key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

export { UserSessions };
