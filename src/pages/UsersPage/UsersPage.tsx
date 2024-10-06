import { UserModal } from "../../components/Modal/UserModal/UserModal";
import { Page } from "../Page/Page";
import { UserFilter } from "../../components/Filter/UserFilter/UserFilter";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { useContext, useEffect } from "@wordpress/element";
import { UserContext } from "../../providers/UserContextProvider";
import { LoadingContext } from "../../providers/LoadingContextProvider";
import {
  CHANGE_USER_SETTINGS_MODAL_OPEN,
  SET_FULL_PAGE_LOADING,
} from "../../constants";
import { AddUser } from "./components/AddUser/AddUser";
import { UserList } from "./components/UserList/UserList";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "../../providers/ModalContextProvider";
import { UsersSettingsModal } from "../../components/Modal/UsersSettingsModal/UsersSettingsModal";

function UsersPage() {
  const { updateUsers } = useContext(UserContext);
  const { loadingDispatch } = useContext(LoadingContext);
  const { modalDispatch } = useContext(ModalContext);

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
        description="Create and manage users"
        icon={
          <Cog8ToothIcon
            className="wpqt-icon-gray wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
            onClick={() => {
              modalDispatch({
                type: CHANGE_USER_SETTINGS_MODAL_OPEN,
                payload: true,
              });
            }}
          />
        }
      >
        QuickTasker users page
      </WPQTPageHeader>
      <AddUser />
      <UserFilter />
      <UserList />
      <UsersSettingsModal />
      <UserModal />
    </Page>
  );
}

export { UsersPage };
