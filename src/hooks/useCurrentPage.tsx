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
      setSubMenuItemActive();
    };

    handleUrlChange(); // Initial call to set the state and submenu

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
};

const setSubMenuItemActive = () => {
  const { page, hash } = getUrlParams();

  if (page !== "wp-quick-tasks") {
    return;
  }

  const submenuItems = document.querySelectorAll(
    "#toplevel_page_wp-quick-tasks .wp-submenu li",
  );
  submenuItems.forEach((item) => item.classList.remove("current"));

  const hashMap: { [key: string]: string } = {
    "#/users": "#/users",
    "#/boards": "#/boards",
    "#/archive": "#/archive",
    default: "",
  };

  const targetHash =
    hashMap[hash] !== undefined ? hashMap[hash] : hashMap["default"];
  submenuItems.forEach((item) => {
    const link = item.querySelector("a");

    if (
      link &&
      link.getAttribute("href") &&
      link.getAttribute("href") === `admin.php?page=wp-quick-tasks${targetHash}`
    ) {
      item.classList.add("current");
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
