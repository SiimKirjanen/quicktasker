import { useContext } from "@wordpress/element";
import { UserContext } from "../../../providers/UserContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { OPEN_NEW_USER_MODAL } from "../../../constants";

function UserList() {
  const {
    state: { users },
  } = useContext(UserContext);
  const { modalDispatch } = useContext(ModalContext);

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
    <div>
      {users.map((user) => {
        return <div key={user.id}>{user.name}</div>;
      })}
      <button onClick={openCreateUserModal}>Add</button>
    </div>
  );
}

export { UserList };
