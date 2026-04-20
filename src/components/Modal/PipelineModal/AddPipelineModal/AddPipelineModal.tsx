import { useContext } from "@wordpress/element";
import { CLOSE_PIPELINE_MODAL } from "../../../../constants";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { WPQTModal } from "../../WPQTModal";
import { PipelineModalContent } from "./AddPipelineModalContent";

function AddPipelineModal() {
  const {
    state: { newPipelineModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const closeModal = () => modalDispatch({ type: CLOSE_PIPELINE_MODAL });

  return (
    <WPQTModal
      modalOpen={newPipelineModalOpen}
      closeModal={closeModal}
      size="sm"
    >
      <PipelineModalContent />
    </WPQTModal>
  );
}

export { AddPipelineModal };
