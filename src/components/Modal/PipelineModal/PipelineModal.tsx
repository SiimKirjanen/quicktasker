import { useContext, useRef, useState } from "@wordpress/element";
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
import { PipelineContext } from "../../../providers/PipelineContextProvider";

function PipelineModal() {
  const {
    state: { pipelineModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(PipelineContext);
  const [modalSaving, setmodalSaving] = useState(false);
  const pipelineModalContentRef = useRef<any>(null);

  const closeModal = () => {
    modalDispatch({
      type: CLOSE_PIPELINE_MODAL,
    });
    clearModalContent();
  };

  const clearModalContent = () => {
    if (pipelineModalContentRef.current) {
      pipelineModalContentRef.current.clearContent();
    }
  };

  const handleSuccess = (type: string, pipeline: Pipeline) => {
    setmodalSaving(false);
    dispatch({
      type,
      payload: {
        pipeline,
      },
    });
    closeModal();
  };

  const handleError = (error: any) => {
    setmodalSaving(false);
    console.error(error);
  };

  const addPipeline = async (
    pipelineName: string,
    pipelineDescription: string,
  ) => {
    try {
      setmodalSaving(true);
      const response = await createPipelineRequest(
        pipelineName,
        pipelineDescription,
      );

      handleSuccess(PIPELINE_ADD_PIPELINE, {
        ...response.data,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const editPipeline = async (pipeline: Pipeline) => {
    try {
      setmodalSaving(true);
      const response = await editPipelineRequest(pipeline);

      handleSuccess(PIPELINE_EDIT_PIPELINE, response.data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <WPQTModal modalOpen={pipelineModalOpen} closeModal={closeModal}>
      <PipelineModalContent
        ref={pipelineModalContentRef}
        editPipeline={editPipeline}
        addPipeline={addPipeline}
        modalSaving={modalSaving}
        setModalSaving={setmodalSaving}
      />
    </WPQTModal>
  );
}

export { PipelineModal };
