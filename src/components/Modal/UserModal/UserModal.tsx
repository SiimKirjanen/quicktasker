import { useContext } from "@wordpress/element";
import { CLOSE_USER_MODAL, EDIT_USER } from "../../../constants";
import { DispatchType, useModal } from "../../../hooks/useModal";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { ServerUser } from "../../../types/user";
import { WPQTModal } from "../WPQTModal";
import { UserModalContent } from "./UserModalContent";

function UserModal() {
  const {
    state: { userModalOpen },
  } = useContext(ModalContext);
  const { closeModal, handleSuccess } = useModal(CLOSE_USER_MODAL);

  const onEditUserCompleted = (user: ServerUser) => {
    handleSuccess(EDIT_USER, user, DispatchType.USER);
  };

  return (
    <WPQTModal modalOpen={userModalOpen} closeModal={closeModal} size="xl">
      <UserModalContent onEditUserCompleted={onEditUserCompleted} />
    </WPQTModal>
  );
}

export { UserModal };
