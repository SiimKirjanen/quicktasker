import { useContext } from "@wordpress/element";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { PipelineSelectionDropdown } from "../../Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { OPEN_EDIT_PIPELINE_MODAL } from "../../../constants";
import { LoadingOval } from "../../Loading/Loading";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

function PipelineHeader() {
  const {
    state: { activePipeline, loading },
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);
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
    <div className="wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-py-4">
      <div>
        <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
          <div className="wpqt-text-lg">{activePipeline.name}</div>
          <PencilSquareIcon
            className="wpqt-icon-green wpqt-size-5 wpqt-cursor-pointer"
            onClick={openEditPipelineModal}
          />
        </div>
        {activePipeline.description && (
          <div className="wpqt-italic">{activePipeline.description}</div>
        )}
      </div>

      <div className="wpqt-ml-auto wpqt-flex wpqt-items-center wpqt-gap-3">
        {loading ? (
          <LoadingOval width="24" height="24" />
        ) : (
          <ArrowPathIcon
            className="wpqt-size-5 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
            onClick={() => fetchAndSetPipelineData(activePipeline.id)}
          />
        )}

        <PipelineSelectionDropdown />
      </div>
    </div>
  );
}

export { PipelineHeader };
