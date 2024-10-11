import {
  UserPageAppContext,
  UserPageAppContextProvider,
} from "./providers/UserPageAppContextProvider";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/Pages/HomePage/HomePage";
import { UserTasksPage } from "./components/Pages/UserTasksPage/UserTasksPage";
import { useContext } from "@wordpress/element";
import { ErrorPage } from "./components/Pages/ErrorPage/ErrorPage";
import { SetUpPage } from "./components/Pages/SetUpPage/SetUpPage";
import { LoginPage } from "./components/Pages/LoginPage/LoginPage";
import { AssignableTasksPage } from "./components/Pages/AssignableTasksPage/AssignableTasksPage";
import { TaskPage } from "./components/Pages/TaskPage/TaskPage";
import { TaskCommentsPage } from "./components/Pages/TaskCommentsPage/TaskCommentsPage";
import { PprofilePage } from "./components/Pages/ProfilePage/ProfilePage";
import { UserCommentsPage } from "./components/Pages/UserCommentsPage/UserCommentsPage";
import { UserPageNotificationsContextProvider } from "./providers/UserPageNotificationsContextProvider";
import { NotificationsPage } from "./components/Pages/NotificationsPage/NotificationsPage";
import { LoadingPage } from "./components/Pages/LoadingPage/LoadingPage";
import { __ } from "@wordpress/i18n";
import { useSession } from "./hooks/useSession";

function UserPageContent() {
  const {
    state: { initialLoading, isActiveUser, setupCompleted },
  } = useContext(UserPageAppContext);
  const { isLoggedIn } = useSession();

  if (initialLoading) {
    return <LoadingPage />;
  }
  if (!isActiveUser) {
    return (
      <ErrorPage
        errorTitle={__("User is not active", "quicktasker")}
        errorDescription={__(
          "Your user is not active. Please contact site administrator.",
          "quicktasker",
        )}
      />
    );
  }

  if (!setupCompleted) {
    return <SetUpPage />;
  }

  if (!isLoggedIn()) {
    return <LoginPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/profile" element={<PprofilePage />} />
        <Route path="/user-tasks" element={<UserTasksPage />} />
        <Route path="/assignable-tasks" element={<AssignableTasksPage />} />
        <Route path="/tasks/:taskHash" element={<TaskPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route
          path="/tasks/:taskHash/comments"
          element={<TaskCommentsPage />}
        />
        <Route path="/user/comments" element={<UserCommentsPage />} />
      </Routes>
    </Router>
  );
}

function UserPageApp() {
  return (
    <ErrorBoundary>
      <UserPageAppContextProvider>
        <UserPageNotificationsContextProvider>
          <UserPageContent />
          <ToastContainer
            position="bottom-center"
            toastClassName="wpqt-bottom-[80px]  lg:wpqt-bottom-[20px]"
          />
        </UserPageNotificationsContextProvider>
      </UserPageAppContextProvider>
    </ErrorBoundary>
  );
}

export default UserPageApp;
