import { useCallback, useContext } from "@wordpress/element";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Pipeline } from "../../types/pipeline";
import { getPipelineData, moveTaskRequest } from "../../api/api";
import { Stage } from "./Stage";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { AddStage } from "./AddStage";

const Pipeline = () => {
  const {
    state: { pipeline, loading },
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
    [pipeline]
  );

  if (!pipeline) {
    return "Loading...";
  }

  return (
    <div className="wpqt-flex wpqt-gap-[24px] wpqt-items-start wpqt-overflow-x-auto wpqt-pipeline-height">
      <DragDropContext onDragEnd={onDragEnd}>
        {pipeline.stages.map((stage) => {
          return <Stage droppableId={stage.id} tasks={stage.tasks} />;
        })}
      </DragDropContext>
      <AddStage pipelineId={pipeline.id} />
    </div>
  );
};
export default Pipeline;
