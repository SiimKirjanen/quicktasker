import { useContext } from "@wordpress/element";
import {
  CLOSE_PIPELINE_MODAL,
  PIPELINE_ADD_PIPELINE,
} from "../../../../constants";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { WPQTModal } from "../../WPQTModal";
import { PipelineModalContent } from "./AddPipelineModalContent";

import { usePipelineActions } from "../../../../hooks/actions/usePipelineActions";
import { DispatchType, useModal } from "../../../../hooks/useModal";
import { ActivePipelineContext } from "../../../../providers/ActivePipelineContextProvider";

function AddPipelineModal() {
  const {
    state: { newPipelineModalOpen },
  } = useContext(ModalContext);
  const { fetchAndSetPipelineData } = useContext(ActivePipelineContext);
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError,
  } = useModal(CLOSE_PIPELINE_MODAL);
  const { addPipeline } = usePipelineActions();

  const onAddPipeline = async (
    pipelineName: string,
    pipelineDescription: string,
  ) => {
    setModalSaving(true);
    await addPipeline(
      pipelineName,
      pipelineDescription,
      (pipeline) => {
        handleSuccess(PIPELINE_ADD_PIPELINE, pipeline, DispatchType.PIPELINES);
        fetchAndSetPipelineData(pipeline.id);
        closeModal();
      },
      (error) => {
        handleError(error);
      },
    );
  };

  return (
    <WPQTModal modalOpen={newPipelineModalOpen} closeModal={closeModal}>
      <PipelineModalContent
        ref={modalContentRef}
        addPipeline={onAddPipeline}
        modalSaving={modalSaving}
        setModalSaving={setModalSaving}
      />
    </WPQTModal>
  );
}

export { AddPipelineModal };
