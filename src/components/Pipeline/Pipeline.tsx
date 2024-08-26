import { useCallback, useContext } from "@wordpress/element";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from "@hello-pangea/dnd";
import { Pipeline } from "../../types/pipeline";
import { moveTaskRequest } from "../../api/api";
import { Stage } from "./Stage";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { AddStage } from "./AddStage";
import { TaskModal } from "../Modal/TaskModal/TaskModal";
import { StageModal } from "../Modal/StageModal/StageModal";
import { toast } from "react-toastify";
import { PipelineModal } from "../Modal/PipelineModal/PipelineModal";
import { Loading } from "../Loading/Loading";

const Pipeline = () => {
  const {
    state: { activePipeline, loading },
    dispatch,
  } = useContext(PipelineContext);

  const dispatchMove = (
    source: DraggableLocation,
    destination: DraggableLocation,
  ) => {
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
  };

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) {
        return;
      }

      dispatchMove(source, destination);

      try {
        await moveTaskRequest(
          draggableId,
          destination.droppableId,
          destination.index,
        );
      } catch (error) {
        console.error(error);
        dispatchMove(destination, source);
        toast.error("Failed to move a task");
      }
    },
    [activePipeline],
  );

  if (!activePipeline) {
    return <Loading />;
  }

  return (
    <div className="wpqt-pipeline-height wpqt-flex wpqt-gap-[24px] wpqt-overflow-x-auto wpqt-overflow-y-hidden">
      <DragDropContext onDragEnd={onDragEnd}>
        {activePipeline!.stages?.map((stage) => {
          return <Stage stage={stage} />;
        })}
      </DragDropContext>
      <AddStage pipelineId={activePipeline.id} />
      <TaskModal />
      <StageModal />
      <PipelineModal />
    </div>
  );
};
export default Pipeline;
