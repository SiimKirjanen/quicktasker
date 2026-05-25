import { ArrowPathIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { QuickTaskerIcon } from "../../components/Icon/QuickTaskerIcon/QuickTaskerIcon";
import { WordPressIcon } from "../../components/Icon/WordPressIcon/WordPressIcon";
import { LoadingOval } from "../../components/Loading/Loading";
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
  const { updateUsers, updateWPUsers } = useContext(UserContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const { modalDispatch } = useContext(ModalContext);
  const [refreshing, setRefreshing] = useState(false);

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
      await Promise.all([updateUsers(), updateWPUsers()]);
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: false });
    };
    updateUsersAsync();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([updateUsers(), updateWPUsers()]);
    setRefreshing(false);
  };

  const description = __(
    "Manage access for users of this plugin.\n WordPress admins have full access by default. Other WordPress users have no access by default but can be granted permissions.\n QuickTaskers are plugin-managed users who access tasks through the tasks app and have no access to the WordPress admin area.",
    "quicktasker",
  );

  return (
    <Page>
      <WPQTPageHeader
        description={description}
        rightSideContent={
          <div className="wpqt-flex wpqt-items-center wpqt-gap-3 sm:wpqt-gap-4">
            <div
              className="wpqt-flex wpqt-gap-1 wpqt-items-center wpqt-cursor-pointer wpqt-group"
              onClick={() => {
                modalDispatch({
                  type: CHANGE_USER_SETTINGS_MODAL_OPEN,
                  payload: true,
                });
              }}
            >
              <Cog8ToothIcon className="wpqt-text-blue-400 wpqt-size-5 group-hover:wpqt-text-blue-600" />
              <span className="wpqt-text-sm wpqt-blue-text group-hover:wpqt-text-blue-600">
                {__("Settings", "quicktasker")}
              </span>
            </div>
            <div className="wpqt-mx-2 sm:wpqt-mx-5">
              {refreshing ? (
                <LoadingOval width="28" height="28" />
              ) : (
                <ArrowPathIcon
                  className="wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
                  data-testid="refresh-icon"
                  onClick={handleRefresh}
                />
              )}
            </div>
          </div>
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
