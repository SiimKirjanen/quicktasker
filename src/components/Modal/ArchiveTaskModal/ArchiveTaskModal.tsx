import { useContext } from "@wordpress/element";
import { CLOSE_ARCHIVE_TASK_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal } from "../WPQTModal";
import { ArchiveTaskModalContent } from "./ArchiveTaskModalContent";

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
