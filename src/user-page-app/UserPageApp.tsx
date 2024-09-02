import { PageWrap } from "./components/Pages/Page/PageWrap";
import { UserPageAppContextProvider } from "./providers/UserPageAppContextProvider";
import { useCurrentUserPage } from "./hooks/useCurrentUsePage";

function UserPageApp() {
  return (
    <UserPageAppContextProvider>
      <UserPageContent />
    </UserPageAppContextProvider>
  );
}

function UserPageContent() {
  const currentPage = useCurrentUserPage();

  return <PageWrap>{currentPage}</PageWrap>;
}

export default UserPageApp;
