import { UserFilter } from "../../../components/Filter/UserFilter/UserFilter";
import { UserModal } from "../../../components/Modal/UserModal/UserModal";
import { AddUser } from "./components/AddUser/AddUser";
import { UserList } from "./components/UserList/UserList";

function QuickTaskersSection() {
  return (
    <div>
      <AddUser />
      <UserFilter />
      <UserList />
      <UserModal />
    </div>
  );
}

export { QuickTaskersSection };
