import { useEffect, useState } from "@wordpress/element";
import { UsersPage } from "../pages/UsersPage";
import { PipelinePage } from "../pages/PipelinePage";
import { ArchivePage } from "../pages/ArchivePage";
import { OverviewPage } from "../pages/OverviewPage";

const useCurrentPage = () => {
  const [currentPage, setCurrentPage] = useState(getPageFromUrl());

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPage(getPageFromUrl());
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  return currentPage;
};

const getPageFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");
  const hash = window.location.hash;

  if (page === "wp-quick-tasks") {
    switch (hash) {
      case "#/users":
        return <UsersPage />;
      case "#/boards":
        return <PipelinePage />;
      case "#/archive":
        return <ArchivePage />;
      default:
        return <OverviewPage />;
    }
  }
  return <PipelinePage />;
};

export { useCurrentPage };
