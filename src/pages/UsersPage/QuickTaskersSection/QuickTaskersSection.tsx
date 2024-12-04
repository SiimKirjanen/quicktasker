import { UserFilter } from "../../../components/Filter/UserFilter/UserFilter";
import { UserModal } from "../../../components/Modal/UserModal/UserModal";
import { UsersSettingsModal } from "../../../components/Modal/UsersSettingsModal/UsersSettingsModal";
import { AddUser } from "./components/AddUser/AddUser";
import { UserList } from "./components/UserList/UserList";

function QuickTaskersSection() {
  return (
    <div>
      <AddUser />
      <UserFilter />
      <UserList />
      <UsersSettingsModal />
      <UserModal />
    </div>
  );
}

export { QuickTaskersSection };
