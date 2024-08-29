import { UserModal } from "../components/Modal/UserModal/UserModal";
import { UserList } from "../components/User/UserList/UserList";
import { Page } from "./Page/Page";

function UsersPage() {
  return (
    <Page>
      <div>User page</div>
      <UserList />
      <UserModal />
    </Page>
  );
}

export { UsersPage };
