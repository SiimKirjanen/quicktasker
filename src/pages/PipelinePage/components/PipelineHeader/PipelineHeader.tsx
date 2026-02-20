import {
  ArrowPathIcon,
  RectangleStackIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { PipelineSelectionDropdown } from "../../../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown";
import { LoadingOval } from "../../../../components/Loading/Loading";
import { PIPELINE_TOGGLE_VIEW } from "../../../../constants";
import { useApp } from "../../../../hooks/useApp";
import { ActivePipelineContext } from "../../../../providers/ActivePipelineContextProvider";
import { PipelineView } from "../../../../types/pipeline";
import { BoardOptionsSelection } from "./components/BoardOptionsSelection/BoardOptionsSelection";
import { TaskExportSelection } from "./components/TaskExportSelection/TaskExportSelection";

function PipelineHeader() {
  const {
    state: { activePipeline, loading },
    fetchAndSetPipelineData,
  } = useContext(ActivePipelineContext);
  const {
    state: { isUserAllowedToManageSettings },
  } = useApp();

  if (!activePipeline) {
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
        {isUserAllowedToManageSettings && <BoardOptionsSelection />}
        <TaskExportSelection />
        <PipelineModeSelector />
        {loading ? (
          <LoadingOval width="24" height="24" />
        ) : (
          <ArrowPathIcon
            className="wpqt-size-6 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
            data-testid="refresh-icon"
            onClick={() => fetchAndSetPipelineData(activePipeline.id)}
          />
        )}

        <PipelineSelectionDropdown
          activePipeline={activePipeline}
          onPipelineClick={(pipelineId) => fetchAndSetPipelineData(pipelineId)}
        />
      </div>
    </div>
  );
}

function PipelineModeSelector() {
  const {
    state: { view },
    dispatch,
  } = useContext(ActivePipelineContext);

  const toggleView = () => {
    dispatch({
      type: PIPELINE_TOGGLE_VIEW,
      payload:
        view === PipelineView.PIPELINE
          ? PipelineView.TASK
          : PipelineView.PIPELINE,
    });
  };

  return (
    <div
      className="wpqt-flex wpqt-gap-1 wpqt-items-center wpqt-cursor-pointer wpqt-text-blue-400 wpqt-text-base :hover:wpqt-text-blue-600 wpqt-group"
      onClick={toggleView}
    >
      {view === PipelineView.PIPELINE ? (
        <>
          <RectangleStackIcon className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
          <span className="group-hover:wpqt-text-blue-600">
            {__("Switch to Task view", "quicktasker")}
          </span>
        </>
      ) : (
        <>
          <ViewColumnsIcon className="wpqt-size-5 wpqt-text-blue-400 group-hover:wpqt-text-blue-600" />
          <span className="group-hover:wpqt-text-blue-600">
            {__("Switch to Board view", "quicktasker")}
          </span>
        </>
      )}
    </div>
  );
}

export { PipelineHeader };
