import { useContext } from "@wordpress/element";
import { WPQTModal } from "../WPQTModal";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { DispatchType, useModal } from "../../../hooks/useModal";
import { ADD_USER, CLOSE_USER_MODAL, EDIT_USER } from "../../../constants";
import { UserModalContent } from "./UserModalContent";
import { createUserRequest, editUserRequest } from "../../../api/api";
import { User } from "../../../types/user";

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
    handleError,
  } = useModal(CLOSE_USER_MODAL);

  const createUser = async (userName: string, userDescription: string) => {
    try {
      setModalSaving(true);
      const response = await createUserRequest(userName, userDescription);
      handleSuccess(ADD_USER, response.data, DispatchType.USER);
    } catch (error) {
      handleError(error);
    }
  };

  const editUser = async (user: User) => {
    try {
      setModalSaving(true);
      const response = await editUserRequest(user);
      handleSuccess(EDIT_USER, response.data, DispatchType.USER);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <WPQTModal modalOpen={userModalOpen} closeModal={closeModal}>
      <UserModalContent
        ref={modalContentRef}
        modalSaving={modalSaving}
        createUser={createUser}
        editUser={editUser}
      />
    </WPQTModal>
  );
}

export { UserModal };
