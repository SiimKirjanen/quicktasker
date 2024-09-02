import { useContext, useEffect, useState } from "@wordpress/element";
import { HomePage } from "../components/Pages/HomePage/HomePage";
import { UserTasksPage } from "../components/Pages/UserTasksPage/UserTasksPage";
import { AssignableTasksPage } from "../components/Pages/AssignableTasksPage/AssignableTasksPage";
import { UserPageAppContext } from "../providers/UserPageAppContextProvider";
import { SetUpPage } from "../components/Pages/SetUpPage/SetUpPage";
import { ErrorPage } from "../components/Pages/ErrorPage/ErrorPage";

function useCurrentUserPage() {
  const {
    state: { isActiveUser, setupCompleted, loading },
  } = useContext(UserPageAppContext);
  const [currentPage, setCurrentPage] = useState(getCurrentPage());

  function getCurrentPage() {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!setupCompleted) {
      return <SetUpPage />;
    }

    if (!isActiveUser) {
      return <ErrorPage />;
    }
    return getPageFromUrl();
  }

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPage(getCurrentPage());
    };

    handleUrlChange();

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(getCurrentPage());
  }, [isActiveUser, setupCompleted, loading]);

  return currentPage;
}

const getPageFromUrl = () => {
  const { hash } = getUrlParams();

  switch (hash) {
    case "#/user-tasks":
      return <UserTasksPage />;
    case "#/assignable-tasks":
      return <AssignableTasksPage />;
    default:
      return <HomePage />;
  }
};

const getUrlParams = () => {
  const hash = window.location.hash;

  return { hash };
};

export { useCurrentUserPage };
