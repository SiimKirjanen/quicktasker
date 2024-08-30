import { UserModal } from "../components/Modal/UserModal/UserModal";
import { UserList } from "../components/User/UserList/UserList";
import { Page } from "./Page/Page";
import { UserFilter } from "../components/User/UserFilter/UserFilter";
import { UsersInfo } from "../components/User/UsersInfo/UserInfo";
import { WPQTPageHeader } from "../components/common/Header/Header";

function UsersPage() {
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
