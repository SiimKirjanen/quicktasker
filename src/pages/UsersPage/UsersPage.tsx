import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { WPQTTabs } from "../../components/Tab/WPQTTabs";
import {
  CHANGE_USER_SETTINGS_MODAL_OPEN,
  SET_FULL_PAGE_LOADING,
} from "../../constants";
import { LoadingContext } from "../../providers/LoadingContextProvider";
import { ModalContext } from "../../providers/ModalContextProvider";
import { UserContext } from "../../providers/UserContextProvider";
import { Page } from "../Page/Page";
import { QuickTaskersSection } from "./QuickTaskersSection/QuickTaskersSection";
import { RegularWPUsersSection } from "./RegularWPUserSection/ReqularWPUsersSection";

function UsersPage() {
  const { updateUsers } = useContext(UserContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const { modalDispatch } = useContext(ModalContext);
  const tabNames = ["QuickTaskers", "WordPress users"];
  const tabContent = [
    <QuickTaskersSection key={0} />,
    <RegularWPUsersSection key={1} />,
  ];

  useEffect(() => {
    const updateUsersAsync = async () => {
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: true });
      await updateUsers();
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: false });
    };
    updateUsersAsync();
  }, []);
  return (
    <Page>
      <WPQTPageHeader
        description={__(
          "Manage QuickTaskers and WordPress users. This plugin supports three types of users: WordPress admins, other WordPress users, and QuickTaskers. WordPress admins have full access to all admin areas. Other WordPress users do not have any access by default but can be granted if needed. QuickTaskers are separate users who do not have admin access but can manage tasks through a mobile-friendly webpage.",
          "quicktasker",
        )}
        icon={
          <Cog8ToothIcon
            className="wpqt-icon-gray wpqt-size-6 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
            onClick={() => {
              modalDispatch({
                type: CHANGE_USER_SETTINGS_MODAL_OPEN,
                payload: true,
              });
            }}
          />
        }
      >
        {__("Users", "quicktasker")}
      </WPQTPageHeader>

      <WPQTTabs
        tabs={tabNames}
        tabsContent={tabContent}
        tabListClassName="wpqt-gap-5"
        tabClassName="wpqt-flex-none"
      />
    </Page>
  );
}

export { UsersPage };
