import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { QuickTaskerIcon } from "../../components/Icon/QuickTaskerIcon/QuickTaskerIcon";
import { WordPressIcon } from "../../components/Icon/WordPressIcon/WordPressIcon";
import { UsersSettingsModal } from "../../components/Modal/UsersSettingsModal/UsersSettingsModal";
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

function UserManagement() {
  const { updateUsers } = useContext(UserContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const { modalDispatch } = useContext(ModalContext);

  const tabDefinitions = [
    {
      name: __("WordPress users", "quicktasker"),
      icon: <WordPressIcon />,
    },
    {
      name: __("QuickTaskers", "quicktasker"),
      icon: <QuickTaskerIcon />,
    },
  ];
  const tabContent = [
    <RegularWPUsersSection key={0} />,
    <QuickTaskersSection key={1} />,
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
          "Manage QuickTasker and WordPress type users. This plugin supports three types of users: WordPress admins, other WordPress users, and QuickTaskers. WordPress admins have full access to all admin areas. Other WordPress users do not have any access by default but can be granted if needed. QuickTaskers are different type of users who do not have admin access but can manage tasks through a tasks app provided by this plugin.",
          "quicktasker",
        )}
        icon={
          <span
            className="wpqt-inline-flex wpqt-items-center wpqt-cursor-pointer wpqt-text-blue-400 wpqt-group"
            onClick={() => {
              modalDispatch({
                type: CHANGE_USER_SETTINGS_MODAL_OPEN,
                payload: true,
              });
            }}
          >
            <Cog8ToothIcon className="wpqt-size-6 group-hover:wpqt-text-blue-600" />
            <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
              {__("Settings", "quicktasker")}
            </span>
          </span>
        }
      >
        {__("User management", "quicktasker")}
      </WPQTPageHeader>

      <WPQTTabs
        tabs={tabDefinitions}
        tabsContent={tabContent}
        tabListClassName="wpqt-gap-5"
        tabClassName="wpqt-flex-none"
      />
      <UsersSettingsModal />
    </Page>
  );
}

export { UserManagement };
