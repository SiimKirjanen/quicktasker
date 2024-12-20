import { useContext } from "@wordpress/element";
import { ActivePipelineContext } from "../providers/ActivePipelineContextProvider";
import { Stage } from "../types/stage";

function useActivePipeline() {
  const {
    state: { activePipeline },
  } = useContext(ActivePipelineContext);

  const getActivePipelineStages = (): Stage[] => {
    return activePipeline?.stages || [];
  };

  const getActivePipelinStageTasksLength = (stageId: string): number => {
    const stages = getActivePipelineStages();

    if (!stages) {
      return 0;
    }

    const stage = stages.find((stage) => stage.id === stageId);

    if (!stage || !stage.tasks) {
      return 0;
    }

    return stage.tasks.length;
  };

  const getTaskStage = (taskId: string): null | Stage => {
    const stages = getActivePipelineStages();
    let taskStage: null | Stage = null;

    if (!stages) {
      return null;
    }

    stages.forEach((stage) => {
      if (!stage.tasks || taskStage) {
        return;
      }

      const task = stage.tasks.find((task) => task.id === taskId);

      if (task) {
        taskStage = stage;
      }
    });

    return taskStage;
  };

  const getTaskOrderInStage = (taskId: string): number | null => {
    const taskStage = getTaskStage(taskId);

    if (!taskStage || !taskStage.tasks) {
      return null;
    }

    const taskIndex = taskStage.tasks.findIndex((task) => task.id === taskId);

    return taskIndex !== -1 ? taskIndex : null;
  };

  return {
    getActivePipelineStages,
    getActivePipelinStageTasksLength,
    getTaskStage,
    getTaskOrderInStage,
  };
}

export { useActivePipeline };
