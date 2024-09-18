import { WPQTPageHeader } from "../components/common/Header/Header";
import { UserSessionsFilter } from "../components/Filters/UserSessionsFilter/UserSessionsFilter";
import { UserSessions } from "../components/User/UserSessions/UserSessions";
import { UserSessionsContextProvider } from "../providers/UserSessionsContextProvider";
import { Page } from "./Page/Page";

function UserSessionsPage() {
  return (
    <UserSessionsContextProvider>
      <Page>
        <WPQTPageHeader>User sessions</WPQTPageHeader>
        <UserSessionsFilter />
        <UserSessions />
      </Page>
    </UserSessionsContextProvider>
  );
}

export { UserSessionsPage };
