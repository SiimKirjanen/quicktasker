import { useContext } from "@wordpress/element";
import {
  CLOSE_PIPELINE_MODAL,
  PIPELINE_EDIT_PIPELINE,
} from "../../../../constants";
import { DispatchType, useModal } from "../../../../hooks/useModal";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { PipelineFromServer } from "../../../../types/pipeline";
import { WPQTModal } from "../../WPQTModal";
import { EditPipelineModalContent } from "./EditPipelineModalContent";

function EditPipelineModal() {
  const {
    state: { pipelineModalOpen },
  } = useContext(ModalContext);
  const { closeModal, handleSuccess } = useModal(CLOSE_PIPELINE_MODAL);

  const onPipelineEditSuccess = (pipeline: PipelineFromServer) => {
    handleSuccess(
      PIPELINE_EDIT_PIPELINE,
      pipeline,
      DispatchType.ACTIVE_PIPELINE,
    );
    handleSuccess(PIPELINE_EDIT_PIPELINE, pipeline, DispatchType.PIPELINES);
  };

  return (
    <WPQTModal modalOpen={pipelineModalOpen} closeModal={closeModal} size="xl">
      <EditPipelineModalContent onPipelineEditSuccess={onPipelineEditSuccess} />
    </WPQTModal>
  );
}

export { EditPipelineModal };
