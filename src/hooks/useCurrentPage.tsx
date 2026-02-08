import { useEffect, useState } from "@wordpress/element";
import { ArchivePage } from "../pages/ArchivePage/ArchivePage";
import { AutomationsPage } from "../pages/AutomationsPage/AutomationsPage";
import { GuidePage } from "../pages/GuidePage/GuidePage";
import { LogsPage } from "../pages/LogsPage/LogsPage";
import { OverviewPage } from "../pages/OverviewPage/OverviewPage";
import { PipelinePage } from "../pages/PipelinePage/PipelinePage";
import { UserAppPage } from "../pages/UserAppPage/UserAppPage";
import { UserPage } from "../pages/UserPage/UserPage";
import { UserSessionsPage } from "../pages/UserSessionsPage/UserSessionsPage";
import { UsersPage } from "../pages/UsersPage/UsersPage";
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

  if (page === "wp-quick-tasks") {
    const userTasksMatch = hash.match(/^#\/users\/(\d+)\/tasks$/);
    if (userTasksMatch) {
      const userId = userTasksMatch[1];
      return <UserTasksPage userId={userId} />;
    }

    const userMatch = hash.match(/^#\/users\/(\d+)$/);
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

    switch (hash) {
      case "#/users":
        return <UsersPage />;
      case "#/overview":
        return <OverviewPage />;
      case "#/archive":
        return <ArchivePage />;
      case "#/user-sessions":
        return <UserSessionsPage />;
      case "#/logs":
        return <LogsPage />;
      case "#/guide":
        return <GuidePage />;
      case "#/user-page-link":
        return <UserAppPage />;
      default:
        return <PipelinePage />;
    }
  }
};

const setSubMenuItemActive = () => {
  const { page, hash } = getUrlParams();

  if (page !== "wp-quick-tasks") {
    return;
  }

  const submenuItems = document.querySelectorAll(
    "#toplevel_page_wp-quick-tasks .wp-submenu li",
  );
  submenuItems.forEach((item) => item.classList.remove("wpqt-current"));

  const hashMap: { [key: string]: string } = {
    "#/users": "#/users",
    "#/overview": "#/overview",
    "#/archive": "#/archive",
    "#/user-sessions": "#/user-sessions",
    "#/user-page-link": "#/user-page-link",
    "#/logs": "#/logs",
    "#/settings": "#/settings",
    "#/guide": "#/guide",
    default: "",
  };

  let targetHash = hashMap.default;

  if (hashMap[hash] !== undefined) {
    targetHash = hashMap[hash];
  } else if (/^#\/users(\/\d+)?(\/tasks)?$/.test(hash)) {
    targetHash = "#/users";
  }

  submenuItems.forEach((item) => {
    const link = item.querySelector("a");

    if (
      link &&
      link.getAttribute("href") &&
      link.getAttribute("href") === `admin.php?page=wp-quick-tasks${targetHash}`
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
