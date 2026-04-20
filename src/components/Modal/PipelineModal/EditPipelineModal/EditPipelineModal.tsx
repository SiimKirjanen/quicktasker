import { useContext } from "@wordpress/element";
import { CLOSE_PIPELINE_MODAL } from "../../../../constants";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { WPQTModal } from "../../WPQTModal";
import { EditPipelineModalContent } from "./EditPipelineModalContent";

function EditPipelineModal() {
  const {
    state: { pipelineModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const closeModal = () => modalDispatch({ type: CLOSE_PIPELINE_MODAL });

  return (
    <WPQTModal modalOpen={pipelineModalOpen} closeModal={closeModal} size="xl">
      <EditPipelineModalContent />
    </WPQTModal>
  );
}

export { EditPipelineModal };
