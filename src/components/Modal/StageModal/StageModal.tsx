import { WPQTModal } from "../WPQTModal";
import { useContext, useRef, useState } from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import {
  CLOSE_STAGE_MODAL,
  PIPELINE_ADD_STAGE,
  PIPELINE_EDIT_STAGE,
} from "../../../constants";
import { StageModalContent } from "./StageModalContent";
import { createNewStageRequest, editStageRequest } from "../../../api/api";
import { PipelineContext } from "../../../providers/PipelineContextProvider";
import { Stage } from "../../../types/stage";

function StageModal() {
  const {
    state: { stageModalOpen, targetPipelineId },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(PipelineContext);
  const [stageModalSaving, setStageModalSAving] = useState(false);
  const stageModalContentRef = useRef<any>(null);

  const closeStageModal = () => {
    modalDispatch({
      type: CLOSE_STAGE_MODAL,
    });
  };

  const handleSuccess = (type: string, stage: Stage) => {
    setStageModalSAving(false);
    dispatch({
      type,
      payload: {
        stage,
      },
    });
    closeStageModal();
    if (stageModalContentRef.current) {
      stageModalContentRef.current.clearContent();
    }
  };

  const handleError = (error: any) => {
    setStageModalSAving(false);
    console.error(error);
  };

  const addStage = async (stageName: string, stageDescription: string) => {
    try {
      setStageModalSAving(true);
      const response = await createNewStageRequest(
        targetPipelineId,
        stageName,
        stageDescription,
      );

      handleSuccess(PIPELINE_ADD_STAGE, {
        ...response.data,
        tasks: [],
      });
    } catch (error) {
      handleError(error);
    }
  };

  const editStage = async (stage: Stage) => {
    try {
      setStageModalSAving(true);
      await editStageRequest(stage);

      handleSuccess(PIPELINE_EDIT_STAGE, stage);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <WPQTModal modalOpen={stageModalOpen} closeModal={closeStageModal}>
      <StageModalContent
        ref={stageModalContentRef}
        editStage={editStage}
        addStage={addStage}
        stageModalSaving={stageModalSaving}
        stageTaskModalSaving={setStageModalSAving}
      />
    </WPQTModal>
  );
}

export { StageModal };
