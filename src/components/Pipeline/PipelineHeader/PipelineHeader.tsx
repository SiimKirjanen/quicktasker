import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../../providers/PipelineContextProvider";
import { PipelineSelectionDropdown } from "../../Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { OPEN_EDIT_PIPELINE_MODAL } from "../../../constants";
import { LoadingOval } from "../../Loading/Loading";

function PipelineHeader() {
  const {
    state: { activePipeline, loading },
  } = useContext(PipelineContext);
  const { modalDispatch } = useContext(ModalContext);

  const openEditPipelineModal = () => {
    modalDispatch({
      type: OPEN_EDIT_PIPELINE_MODAL,
      payload: {
        pipelineToEdit: activePipeline,
      },
    });
  };

  if (!activePipeline) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-gap-1 wpqt-py-4">
      <div>
        <div className="wpqt-text-lg">{activePipeline.name}</div>
        {activePipeline.description && <div>{activePipeline.description}</div>}
      </div>
      <PencilSquareIcon
        className="wpqt-size-5 wpqt-cursor-pointer wpqt-text-gray-400"
        onClick={openEditPipelineModal}
      />

      <div className="wpqt-ml-auto wpqt-flex wpqt-items-center wpqt-gap-2">
        {loading && <LoadingOval width="24" height="24" />}
        <PipelineSelectionDropdown />
      </div>
    </div>
  );
}

export { PipelineHeader };
