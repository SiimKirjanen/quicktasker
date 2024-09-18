import { useContext } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { OPEN_NEW_USER_MODAL } from "../../../constants";
import { WPQTButton } from "../../common/Button/Button";

function UsersInfo() {
  const { modalDispatch } = useContext(ModalContext);

  const openCreateUserModal = () => {
    modalDispatch({
      type: OPEN_NEW_USER_MODAL,
    });
  };

  return (
    <div>
      <WPQTButton onClick={openCreateUserModal} btnText="Add user" />
    </div>
  );
}

export { UsersInfo };
