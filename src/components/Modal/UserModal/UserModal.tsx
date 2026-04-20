import { useContext } from "@wordpress/element";
import { CLOSE_USER_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal } from "../WPQTModal";
import { UserModalContent } from "./UserModalContent";

function UserModal() {
  const {
    state: { userModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const closeModal = () => modalDispatch({ type: CLOSE_USER_MODAL });

  return (
    <WPQTModal
      modalOpen={userModalOpen}
      closeModal={closeModal}
      size="xl"
      testId="user-modal"
    >
      <UserModalContent />
    </WPQTModal>
  );
}

export { UserModal };
