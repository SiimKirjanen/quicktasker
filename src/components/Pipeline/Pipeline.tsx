import { useCallback, useContext } from "@wordpress/element";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Pipeline } from "../../types/pipeline";
import { moveTaskRequest } from "../../api/api";
import { Stage } from "./Stage";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { AddStage } from "./AddStage";
import { TaskModal } from "../Modal/TaskModal/TaskModal";
import { StageModal } from "../Modal/StageModal/StageModal";

const Pipeline = () => {
  const {
    state: { activePipeline, loading },
    dispatch,
  } = useContext(PipelineContext);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        dispatch({
          type: "REORDER_TASK",
          payload: {
            source,
            destination,
          },
        });
      } else {
        dispatch({
          type: "MOVE_TASK",
          payload: {
            source,
            destination,
          },
        });
      }

      moveTaskRequest(draggableId, destination.droppableId, destination.index);
    },
    [activePipeline],
  );

  if (!activePipeline) {
    return;
  }

  return (
    <div className="wpqt-pipeline-height wpqt-flex wpqt-gap-[24px] wpqt-overflow-x-auto wpqt-overflow-y-hidden wpqt-pr-5">
      <DragDropContext onDragEnd={onDragEnd}>
        {activePipeline.stages.map((stage) => {
          return <Stage stage={stage} />;
        })}
      </DragDropContext>
      <AddStage pipelineId={activePipeline.id} />
      <TaskModal />
      <StageModal />
    </div>
  );
};
export default Pipeline;
