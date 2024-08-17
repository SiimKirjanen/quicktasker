import { useCallback, useContext } from "@wordpress/element";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Pipeline } from "../../types/pipeline";
import { moveTaskRequest } from "../../api/api";
import { Stage } from "./Stage";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { AddStage } from "./AddStage";
import { TaskModal } from "../Modal/TaskModal/TaskModal";

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
    [activePipeline]
  );

  if (!activePipeline) {
    return "Loading...";
  }

  return (
    <div className="wpqt-flex wpqt-gap-[24px] wpqt-pr-5 wpqt-overflow-x-auto wpqt-overflow-y-hidden wpqt-pipeline-height">
      <DragDropContext onDragEnd={onDragEnd}>
        {activePipeline.stages.map((stage) => {
          return (
            <Stage
              stageId={stage.id}
              stageTasks={stage.tasks}
              stageName={stage.name}
              stageDescription={stage.description}
            />
          );
        })}
      </DragDropContext>
      <AddStage pipelineId={activePipeline.id} />
      <TaskModal />
    </div>
  );
};
export default Pipeline;
