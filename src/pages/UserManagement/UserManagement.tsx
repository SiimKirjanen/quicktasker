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

  const description = __(
    "Manage access for users of this plugin.\n WordPress admins have full access by default. Other WordPress users have no access by default but can be granted permissions.\n QuickTaskers are plugin-managed users who access tasks through the tasks app and have no access to the WordPress admin area.",
    "quicktasker",
  );

  return (
    <Page>
      <WPQTPageHeader
        description={description}
        rightSideContent={
          <span
            className="wpqt-inline-flex wpqt-items-center wpqt-cursor-pointer wpqt-text-blue-500 wpqt-group wpqt-gap-1 wpqt-border wpqt-border-solid wpqt-border-blue-400 wpqt-rounded wpqt-px-3 wpqt-py-1 hover:wpqt-bg-blue-50 hover:wpqt-border-blue-600"
            onClick={() => {
              modalDispatch({
                type: CHANGE_USER_SETTINGS_MODAL_OPEN,
                payload: true,
              });
            }}
          >
            <Cog8ToothIcon className="wpqt-size-4 group-hover:wpqt-text-blue-600" />
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
