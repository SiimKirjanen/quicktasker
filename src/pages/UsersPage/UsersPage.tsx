import { UserModal } from "../../components/Modal/UserModal/UserModal";
import { Page } from "../Page/Page";
import { UserFilter } from "../../components/Filter/UserFilter/UserFilter";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { useContext, useEffect } from "@wordpress/element";
import { UserContext } from "../../providers/UserContextProvider";
import { LoadingContext } from "../../providers/LoadingContextProvider";
import { SET_FULL_PAGE_LOADING } from "../../constants";
import { AddUser } from "./components/AddUser/AddUser";
import { UserList } from "./components/UserList/UserList";

function UsersPage() {
  const { updateUsers } = useContext(UserContext);
  const { loadingDispatch } = useContext(LoadingContext);

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
      <WPQTPageHeader description="Create and manage users">
        QuickTasker users page
      </WPQTPageHeader>
      <AddUser />
      <UserFilter />
      <UserList />
      <UserModal />
    </Page>
  );
}

export { UsersPage };
