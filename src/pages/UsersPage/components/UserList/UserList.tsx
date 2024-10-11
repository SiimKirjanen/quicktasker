import { useContext } from "@wordpress/element";
import { useUserFilter } from "../../../../hooks/filters/useUserFilter";
import { UserContext } from "../../../../providers/UserContextProvider";
import { UserListItem } from "../UserListItem/UserListItem";

function UserList() {
  const {
    state: { users },
  } = useContext(UserContext);
  const { filterUsers } = useUserFilter();

  return (
    <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-3 sm:wpqt-grid-cols-2 lg:wpqt-grid-cols-3">
      {users.filter(filterUsers).map((user) => {
        return <UserListItem key={user.id} user={user} />;
      })}
    </div>
  );
}

export { UserList };
