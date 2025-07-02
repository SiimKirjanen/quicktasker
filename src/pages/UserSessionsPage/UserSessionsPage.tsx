import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { UserSessionsFilter } from "../../components/Filter/UserSessionsFilter/UserSessionsFilter";
import { Info } from "../../components/Info/Info";
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
    state: { userSessions },
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
      <WPQTPageHeader>
        {__("Quicktasker sessions", "quicktasker")}
      </WPQTPageHeader>
      <UserSessionsFilter />
      <UserSessions />
    </>
  );
}

export { UserSessionsPage };
