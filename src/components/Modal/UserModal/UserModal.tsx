import { useContext } from "@wordpress/element";
import { WPQTModal } from "../WPQTModal";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { DispatchType, useModal } from "../../../hooks/useModal";
import { CLOSE_USER_MODAL, EDIT_USER } from "../../../constants";
import { UserModalContent } from "./UserModalContent";
import { User } from "../../../types/user";
import { useUserActions } from "../../../hooks/actions/useUserActions";

function UserModal() {
  const {
    state: { userModalOpen },
  } = useContext(ModalContext);
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
  } = useModal(CLOSE_USER_MODAL);
  const { editUser } = useUserActions();

  const onEditUser = async (user: User) => {
    setModalSaving(true);
    await editUser(user, (userData) => {
      handleSuccess(EDIT_USER, userData, DispatchType.USER);
    });
    setModalSaving(false);
  };

  return (
    <WPQTModal modalOpen={userModalOpen} closeModal={closeModal} size="xl">
      <UserModalContent
        ref={modalContentRef}
        modalSaving={modalSaving}
        editUser={onEditUser}
      />
    </WPQTModal>
  );
}

export { UserModal };
