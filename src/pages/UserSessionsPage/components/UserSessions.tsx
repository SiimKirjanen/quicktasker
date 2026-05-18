import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { NoFilterResults } from "../../../components/Filter/NoFilterResults/NoFilterResults";
import { useUserSessionsFilter } from "../../../hooks/filters/useUserSessionsFilter";
import { UserSessionsContext } from "../../../providers/UserSessionsContextProvider";
import { UserSession } from "./UserSession";

function UserSessions() {
  const {
    state: { userSessions },
  } = useContext(UserSessionsContext);
  const { filterSessions } = useUserSessionsFilter();
  const filteredSessions = userSessions.filter(filterSessions);

  if (filteredSessions.length === 0) {
    return <NoFilterResults text={__("No sessions found", "quicktasker")} />;
  }

  return (
    <div className="wpqt-overflow-x-auto">
      <div className="wpqt-inline-grid wpqt-min-w-[640px] wpqt-grid-cols-[auto_auto_auto_auto] wpqt-items-center wpqt-gap-x-16 wpqt-gap-y-4">
        <div className="wpqt-mb-4 wpqt-font-bold">
          {__("Session owner", "quicktasker")}
        </div>
        <div className="wpqt-mb-4 wpqt-font-bold">
          {__("Created at", "quicktasker")}
        </div>
        <div className="wpqt-mb-4 wpqt-font-bold">
          {__("Expires at", "quicktasker")}
        </div>
        <div className="wpqt-mb-4 wpqt-font-bold">
          {__("Status", "quicktasker")}
        </div>
        {filteredSessions.map((session) => (
          <UserSession key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

export { UserSessions };
