import { useState, useCallback, useEffect } from "@wordpress/element";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { moveTask, reorderTask } from "../../utils/list";
import { Pipeline } from "../../types/pipeline";
import { getPipelineData } from "../../api/api";
import { Stage } from "./Stage";

const Pipeline = () => {
  const [pipelineData, setPipelineData] = useState<Pipeline | null>(null);

  useEffect(() => {
    (async () => {
      const pipelineData = await getPipelineData("2");
      console.log();
      setPipelineData(pipelineData);
    })();
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const targetStage = pipelineData?.stages.find(
          (stage) => stage.id === destination.droppableId
        );
        const targetStageClone = targetStage ? { ...targetStage } : null;
        const reorderedTasks = reorderTask(
          targetStageClone!.tasks,
          source.index,
          destination.index
        );

        setPipelineData({
          ...pipelineData!,
          stages: pipelineData!.stages.map((stage) =>
            stage.id === destination.droppableId
              ? { ...stage, tasks: reorderedTasks }
              : stage
          ),
        });
      } else {
        const stages = moveTask(pipelineData!.stages, source, destination);

        setPipelineData({
          ...pipelineData!,
          stages,
        });
      }
    },
    [pipelineData]
  );

  if (!pipelineData) {
    return "Loading...";
  }

  return (
    <div className="wpqt-flex">
      <DragDropContext onDragEnd={onDragEnd}>
        {pipelineData.stages.map((stage) => {
          return <Stage droppableId={stage.id} tasks={stage.tasks} />;
        })}
      </DragDropContext>
    </div>
  );
};
export default Pipeline;
