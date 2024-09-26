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
  const {
    state: { initialLoading, isActiveUser, setupCompleted, isLoggedIn },
  } = useContext(UserPageAppContext);

  if (initialLoading) {
    return <div>Loading...</div>;
  }
  if (!isActiveUser) {
    return <ErrorPage />;
  }

  if (!setupCompleted) {
    return <SetUpPage />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-tasks" element={<UserTasksPage />} />
        <Route path="/assignable-tasks" element={<AssignableTasksPage />} />
        <Route path="/tasks/:taskHash" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default UserPageApp;
