import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { WPQTInput } from "../../components/common/Input/Input";
import { Info } from "../../components/Info/Info";
import { SET_USER_SESSIONS_SEARCH_VALUE } from "../../constants";
import {
  UserSessionsContext,
  UserSessionsContextProvider,
} from "../../providers/UserSessionsContextProvider";
import { Page } from "./../Page/Page";
import { UserSessions } from "./components/UserSessions";

function UserSessionsPage() {
  return (
    <UserSessionsContextProvider>
      <Page>
        <UserSessionsPageContent />
      </Page>
    </UserSessionsContextProvider>
  );
}

function UserSessionsPageContent() {
  const {
    state: { userSessions, sessionsSearchValue },
    usersSessionDispatch,
  } = useContext(UserSessionsContext);
  const hasSessions = userSessions.length > 0;

  if (!hasSessions) {
    return (
      <Info
        infoTitle={__("No sessions", "quicktasker")}
        infoDescription={__("No QuickTasker sessions found", "quicktasker")}
      />
    );
  }

  return (
    <>
      <WPQTPageHeader
        description={__("Track QuickTasker user sessions", "quicktasker")}
      >
        {__("Quicktasker sessions", "quicktasker")}
      </WPQTPageHeader>
      <div className="wpqt-flex wpqt-justify-end wpqt-mb-4">
        <WPQTInput
          value={sessionsSearchValue}
          onChange={(v) =>
            usersSessionDispatch({
              type: SET_USER_SESSIONS_SEARCH_VALUE,
              payload: v,
            })
          }
          placeholder={__("Search", "quicktasker")}
          className="wpqt-w-52"
          wrapperClassName="!wpqt-mb-0"
          leftIcon={<MagnifyingGlassIcon className="wpqt-size-4" />}
        />
      </div>
      <UserSessions />
    </>
  );
}

export { UserSessionsPage };
