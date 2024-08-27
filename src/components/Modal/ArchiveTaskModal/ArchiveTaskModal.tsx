import { useContext } from "@wordpress/element";
import { WPQTModal } from "../WPQTModal";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { CLOSE_ARCHIVE_TASK_MODAL } from "../../../constants";
import { ArchiveTaskModalContent } from "./ArchiveTaskModalContent";

function ArchiveTaskModal() {
  const {
    state: { archiveModalOpen },
    archiveDispatch,
  } = useContext(ArchiveContext);

  const closeArchiveModal = () => {
    archiveDispatch({ type: CLOSE_ARCHIVE_TASK_MODAL });
  };

  return (
    <WPQTModal modalOpen={archiveModalOpen} closeModal={closeArchiveModal}>
      <ArchiveTaskModalContent />
    </WPQTModal>
  );
}

export { ArchiveTaskModal };
