import { useContext } from "@wordpress/element";
import {
  CLOSE_STAGE_MODAL,
  PIPELINE_ADD_STAGE,
  PIPELINE_EDIT_STAGE,
} from "../../../constants";
import { useStageActions } from "../../../hooks/actions/useStageActions";
import { DispatchType, useModal } from "../../../hooks/useModal";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Stage } from "../../../types/stage";
import { WPQTModal } from "../WPQTModal";
import { StageModalContent } from "./StageModalContent";

function StageModal() {
  const {
    state: { stageModalOpen, targetPipelineId },
  } = useContext(ModalContext);
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError,
  } = useModal(CLOSE_STAGE_MODAL);
  const { editStage, addStage } = useStageActions();

  const onAddStage = async (stageName: string, stageDescription: string) => {
    try {
      setModalSaving(true);
      await addStage(targetPipelineId, stageName, stageDescription, (stage) => {
        handleSuccess(
          PIPELINE_ADD_STAGE,
          {
            stage: { ...stage, tasks: [] },
          },
          DispatchType.ACTIVE_PIPELINE,
        );
        closeModal();
      });
    } catch (error) {
      handleError(error);
    }
  };

  const onEditStage = async (stage: Stage) => {
    setModalSaving(true);
    await editStage(
      stage,
      (stage) => {
        handleSuccess(PIPELINE_EDIT_STAGE, stage, DispatchType.ACTIVE_PIPELINE);
        closeModal();
      },
      (error) => {
        handleError(error);
      },
    );
  };

  return (
    <WPQTModal modalOpen={stageModalOpen} closeModal={closeModal}>
      <StageModalContent
        ref={modalContentRef}
        editStage={onEditStage}
        addStage={onAddStage}
        stageModalSaving={modalSaving}
        stageTaskModalSaving={setModalSaving}
      />
    </WPQTModal>
  );
}

export { StageModal };
