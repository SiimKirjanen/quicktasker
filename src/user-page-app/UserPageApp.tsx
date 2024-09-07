import { PageWrap } from "./components/Pages/Page/PageWrap";
import { UserPageAppContextProvider } from "./providers/UserPageAppContextProvider";
import { useCurrentUserPage } from "./hooks/useCurrentUsePage";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { ToastContainer } from "react-toastify";

function UserPageApp() {
  return (
    <ErrorBoundary>
      <UserPageAppContextProvider>
        <UserPageContent />
        <ToastContainer position="bottom-center" />
      </UserPageAppContextProvider>
    </ErrorBoundary>
  );
}

function UserPageContent() {
  const currentPage = useCurrentUserPage();

  return <PageWrap>{currentPage}</PageWrap>;
}

export default UserPageApp;
