import { useContext } from "@wordpress/element";
import {
  CLOSE_PIPELINE_MODAL,
  PIPELINE_EDIT_PIPELINE,
} from "../../../../constants";
import { usePipelineActions } from "../../../../hooks/actions/usePipelineActions";
import { DispatchType, useModal } from "../../../../hooks/useModal";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { Pipeline } from "../../../../types/pipeline";
import { WPQTModal } from "../../WPQTModal";
import { EditPipelineModalContent } from "./EditPipelineModalContent";

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
  const { editPipeline } = usePipelineActions();

  const onEditPipeline = async (pipeline: Pipeline) => {
    setModalSaving(true);
    await editPipeline(
      pipeline,
      (pipeline) => {
        handleSuccess(
          PIPELINE_EDIT_PIPELINE,
          pipeline,
          DispatchType.ACTIVE_PIPELINE,
        );
      },
      (error) => {
        handleError(error);
      },
    );
  };

  return (
    <WPQTModal modalOpen={pipelineModalOpen} closeModal={closeModal} size="xl">
      <EditPipelineModalContent
        ref={modalContentRef}
        editPipeline={onEditPipeline}
        modalSaving={modalSaving}
        setModalSaving={setModalSaving}
      />
    </WPQTModal>
  );
}

export { EditPipelineModal };
