import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { PipelineSelectionDropdown } from "../../../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { LoadingOval } from "../../../../components/Loading/Loading";
import { useMissingContent } from "../../../../hooks/useMissingContent";
import { ActivePipelineContext } from "../../../../providers/ActivePipelineContextProvider";
import { BoardOptionsSelection } from "./components/BoardOptionsSelection/BoardOptionsSelection";
import { TaskExportSelection } from "./components/TaskExportSelection/TaskExportSelection";

function PipelineHeader() {
  const {
    state: { activePipeline, loading },
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);
  const { pipelineMissing } = useMissingContent();

  if (!activePipeline || pipelineMissing) {
    return null;
  }

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-py-5">
      <div>
        <div className="wpqt-flex wpqt-items-center wpqt-gap-2">
          <div className="wpqt-text-lg wpqt-font-semibold">
            {activePipeline.name}
          </div>
        </div>
        {activePipeline.description && (
          <div className="wpqt-italic">{activePipeline.description}</div>
        )}
      </div>

      <div className="wpqt-ml-auto wpqt-flex wpqt-items-center wpqt-gap-3">
        <BoardOptionsSelection />
        <TaskExportSelection />
        <div className="wpqt-mx-5">
          {loading ? (
            <LoadingOval width="28" height="28" />
          ) : (
            <ArrowPathIcon
              className="wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
              data-testid="refresh-icon"
              onClick={() => fetchAndSetPipelineData(activePipeline.id)}
            />
          )}
        </div>

        <PipelineSelectionDropdown
          activePipeline={activePipeline}
          onPipelineClick={(pipelineId) => fetchAndSetPipelineData(pipelineId)}
        />
      </div>
    </div>
  );
}

export { PipelineHeader };
