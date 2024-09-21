import { useContext } from "@wordpress/element";
import { WPQTModal } from "../WPQTModal";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { PipelineModalContent } from "./PipelineModalContent";
import {
  CLOSE_PIPELINE_MODAL,
  PIPELINE_ADD_PIPELINE,
  PIPELINE_EDIT_PIPELINE,
} from "../../../constants";
import { createPipelineRequest, editPipelineRequest } from "../../../api/api";
import { Pipeline } from "../../../types/pipeline";
import { DispatchType, useModal } from "../../../hooks/useModal";

function PipelineModal() {
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

  const addPipeline = async (
    pipelineName: string,
    pipelineDescription: string,
  ) => {
    try {
      setModalSaving(true);
      const response = await createPipelineRequest(
        pipelineName,
        pipelineDescription,
      );

      handleSuccess(
        PIPELINE_ADD_PIPELINE,
        response.data,
        DispatchType.PIPELINES,
      );
    } catch (error) {
      handleError(error);
    }
  };

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
    <WPQTModal modalOpen={pipelineModalOpen} closeModal={closeModal}>
      <PipelineModalContent
        ref={modalContentRef}
        editPipeline={editPipeline}
        addPipeline={addPipeline}
        modalSaving={modalSaving}
        setModalSaving={setModalSaving}
      />
    </WPQTModal>
  );
}

export { PipelineModal };
