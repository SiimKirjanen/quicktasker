import { UserModal } from "../components/Modal/UserModal/UserModal";
import { UserList } from "../components/User/UserList/UserList";
import { Page } from "./Page/Page";
import { UserFilter } from "../components/Filters/UserFilter/UserFilter";
import { UsersInfo } from "../components/User/UsersInfo/UserInfo";
import { WPQTPageHeader } from "../components/common/Header/Header";
import { useContext, useEffect } from "@wordpress/element";
import { UserContext } from "../providers/UserContextProvider";
import { LoadingContext } from "../providers/LoadingContextProvider";
import { SET_FULL_PAGE_LOADING } from "../constants";

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
      <WPQTPageHeader description="This is a users page">
        User page
      </WPQTPageHeader>
      <UsersInfo />
      <UserFilter />
      <UserList />
      <UserModal />
    </Page>
  );
}

export { UsersPage };
