import {
  useState,
  useCallback,
  useEffect,
  useContext,
} from "@wordpress/element";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Pipeline } from "../../types/pipeline";
import { getPipelineData } from "../../api/api";
import { Stage } from "./Stage";
import { PipelineContext } from "../../providers/PipelineContextProvider";

const Pipeline = () => {
  const {
    state: { pipeline, loading },
    dispatch,
  } = useContext(PipelineContext);

  useEffect(() => {
    (async () => {
      const pipelineData = await getPipelineData("2");

      dispatch({ type: "SET_PIPELINE", payload: pipelineData });
    })();
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

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
    },
    [pipeline]
  );

  if (!pipeline) {
    return "Loading...";
  }

  return (
    <div className="wpqt-flex">
      <DragDropContext onDragEnd={onDragEnd}>
        {pipeline.stages.map((stage) => {
          return <Stage droppableId={stage.id} tasks={stage.tasks} />;
        })}
      </DragDropContext>
    </div>
  );
};
export default Pipeline;
