import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { UserContext } from "../../../../providers/UserContextProvider";
import { useUserFilter } from "../../../../hooks/filters/useUserFilter";
import { OPEN_NEW_USER_MODAL } from "../../../../constants";
import { UserListItem } from "../UserListItem/UserListItem";

function UserList() {
  const {
    state: { users },
  } = useContext(UserContext);
  const { modalDispatch } = useContext(ModalContext);
  const { filterUsers } = useUserFilter();

  const openCreateUserModal = () => {
    modalDispatch({
      type: OPEN_NEW_USER_MODAL,
    });
  };

  if (!users.length) {
    return (
      <div>
        No users found <button onClick={openCreateUserModal}>Add</button>
      </div>
    );
  }

  return (
    <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-3 sm:wpqt-grid-cols-2 lg:wpqt-grid-cols-3">
      {users.filter(filterUsers).map((user) => {
        return <UserListItem key={user.id} user={user} />;
      })}
    </div>
  );
}

export { UserList };
