import { useEffect, useState } from "@wordpress/element";
import { ApiTokensPage } from "../pages/ApiTokensPage/ApiTokensPage";
import { ArchivePage } from "../pages/ArchivePage/ArchivePage";
import { AutomationsPage } from "../pages/AutomationsPage/AutomationsPage";
import { GuidePage } from "../pages/GuidePage/GuidePage";
import { LogsPage } from "../pages/LogsPage/LogsPage";
import { OverviewPage } from "../pages/OverviewPage/OverviewPage";
import { PipelinePage } from "../pages/PipelinePage/PipelinePage";
import { UserAppPage } from "../pages/UserAppPage/UserAppPage";
import { UserManagement } from "../pages/UserManagement/UserManagement";
import { UserPage } from "../pages/UserPage/UserPage";
import { UserSessionsPage } from "../pages/UserSessionsPage/UserSessionsPage";
import { UserTasksPage } from "../pages/UserTasksPage/UserTasksPage";
import { WebhooksPage } from "../pages/WebhooksPage/WebhooksPage";

const useCurrentPage = () => {
  const [currentPage, setCurrentPage] = useState(getPageFromUrl());

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPage(getPageFromUrl());
      setSubMenuItemActive();
    };

    handleUrlChange();

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
  const { page, hash } = getUrlParams();

  if (page === "wp-quicktasker") {
    const userTasksMatch = hash.match(/^#\/user-management\/(\d+)\/tasks$/);
    if (userTasksMatch) {
      const userId = userTasksMatch[1];
      return <UserTasksPage userId={userId} />;
    }

    const userMatch = hash.match(/^#\/user-management\/(\d+)$/);
    if (userMatch) {
      const userId = userMatch[1];
      return <UserPage userId={userId} />;
    }

    const boardAutomationsMatch = hash.match(/^#\/board\/(\d+)\/automations$/);
    if (boardAutomationsMatch) {
      const boardId = boardAutomationsMatch[1];
      return <AutomationsPage pipelineId={boardId} />;
    }

    const boardWebhooksMatch = hash.match(/^#\/board\/(\d+)\/webhooks$/);
    if (boardWebhooksMatch) {
      const boardId = boardWebhooksMatch[1];
      return <WebhooksPage pipelineId={boardId} />;
    }

    const boardApiTokensMatch = hash.match(/^#\/board\/(\d+)\/api-tokens$/);
    if (boardApiTokensMatch) {
      const boardId = boardApiTokensMatch[1];
      return <ApiTokensPage pipelineId={boardId} />;
    }

    const overviewMatch = hash.match(/^#\/board\/(\d+)\/overview$/);
    if (overviewMatch) {
      const boardId = overviewMatch[1];
      return <OverviewPage pipelineId={boardId} />;
    }

    switch (hash) {
      case "#/user-management":
        return <UserManagement />;
      case "#/archive":
        return <ArchivePage />;
      case "#/quicktasker-sessions":
        return <UserSessionsPage />;
      case "#/logs":
        return <LogsPage />;
      case "#/about":
        return <GuidePage />;
      case "#/tasks-app-settings":
        return <UserAppPage />;
      default:
        return <PipelinePage />;
    }
  }
};

const setSubMenuItemActive = () => {
  const { page, hash } = getUrlParams();

  if (page !== "wp-quicktasker") {
    return;
  }

  const submenuItems = document.querySelectorAll(
    "#toplevel_page_wp-quicktasker .wp-submenu li",
  );
  submenuItems.forEach((item) => item.classList.remove("wpqt-current"));

  const hashMap: { [key: string]: string } = {
    "#/user-management": "#/user-management",
    "#/overview": "#/overview",
    "#/archive": "#/archive",
    "#/quicktasker-sessions": "#/quicktasker-sessions",
    "#/tasks-app-settings": "#/tasks-app-settings",
    "#/logs": "#/logs",
    "#/settings": "#/settings",
    "#/about": "#/about",
    default: "",
  };

  let targetHash = hashMap.default;

  if (hashMap[hash] !== undefined) {
    targetHash = hashMap[hash];
  } else if (/^#\/user-management(\/\d+)?(\/tasks)?$/.test(hash)) {
    targetHash = "#/user-management";
  }

  submenuItems.forEach((item) => {
    const link = item.querySelector("a");

    if (
      link &&
      link.getAttribute("href") &&
      link.getAttribute("href") === `admin.php?page=wp-quicktasker${targetHash}`
    ) {
      item.classList.add("wpqt-current");
    }
  });
};

const getUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");
  const hash = window.location.hash;
  return { page, hash };
};

export { useCurrentPage };
