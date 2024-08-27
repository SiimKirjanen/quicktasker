import { useContext } from "@wordpress/element";
import { WPQTModal } from "../WPQTModal";
import { CLOSE_ARCHIVE_TASK_MODAL } from "../../../constants";
import { ArchiveTaskModalContent } from "./ArchiveTaskModalContent";
import { ModalContext } from "../../../providers/ModalContextProvider";

function ArchiveTaskModal() {
  const {
    state: { archiveTaskModalOpen },
    modalDispatch,
  } = useContext(ModalContext);

  const closeArchiveModal = () => {
    modalDispatch({ type: CLOSE_ARCHIVE_TASK_MODAL });
  };

  return (
    <WPQTModal modalOpen={archiveTaskModalOpen} closeModal={closeArchiveModal}>
      <ArchiveTaskModalContent />
    </WPQTModal>
  );
}

export { ArchiveTaskModal };
