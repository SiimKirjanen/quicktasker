import { useContext } from "@wordpress/element";
import { WPQTModal } from "../../WPQTModal";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { EditPipelineModalContent } from "./EditPipelineModalContent";
import {
  CLOSE_PIPELINE_MODAL,
  PIPELINE_EDIT_PIPELINE,
} from "../../../../constants";
import { editPipelineRequest } from "../../../../api/api";
import { Pipeline } from "../../../../types/pipeline";
import { DispatchType, useModal } from "../../../../hooks/useModal";

function EditPipelineModal() {
  const {
    state: { pipelineModalOpen },
  } = useContext(ModalContext);
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError,
  } = useModal(CLOSE_PIPELINE_MODAL);

  const editPipeline = async (pipeline: Pipeline) => {
    try {
      setModalSaving(true);
      const response = await editPipelineRequest(pipeline);

      handleSuccess(
        PIPELINE_EDIT_PIPELINE,
        response.data,
        DispatchType.ACTIVE_PIPELINE,
      );
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <WPQTModal modalOpen={pipelineModalOpen} closeModal={closeModal} size="lg">
      <EditPipelineModalContent
        ref={modalContentRef}
        editPipeline={editPipeline}
        modalSaving={modalSaving}
        setModalSaving={setModalSaving}
      />
    </WPQTModal>
  );
}

export { EditPipelineModal };
