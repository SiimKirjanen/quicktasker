import { useContext, useMemo } from "@wordpress/element";
import { ActivePipelineContext } from "../providers/ActivePipelineContextProvider";
import { Stage } from "../types/stage";
import { Task } from "../types/task";

function useActivePipeline() {
  const {
    state: { activePipeline },
  } = useContext(ActivePipelineContext);
  const activePipelineId = activePipeline?.id;

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

  const isTaskOnLastStage = (taskId: string): boolean => {
    const stages = getActivePipelineStages();

    if (!stages) {
      return false;
    }

    const taskStage = getTaskStage(taskId);

    if (!taskStage) {
      return false;
    }

    const lastStage = stages[stages.length - 1];

    return taskStage.id === lastStage.id;
  };

  const stageOptions = useMemo(() => {
    const stages = getActivePipelineStages();

    if (!stages) {
      return [];
    }

    return stages.map((stage) => ({
      label: stage.name,
      value: stage.id,
    }));
  }, [activePipeline]);

  const activePipelineTasks = useMemo(() => {
    const stages = getActivePipelineStages();
    const tasks: Task[] = [];

    if (!stages) {
      return tasks;
    }

    stages.forEach((stage) => {
      if (!stage.tasks) {
        return;
      }

      tasks.push(...stage.tasks);
    });

    return tasks;
  }, [activePipeline]);

  const activePipelineSettings = activePipeline?.settings;

  return {
    getActivePipelineStages,
    getActivePipelinStageTasksLength,
    getTaskStage,
    getTaskOrderInStage,
    activePipelineTasks,
    activePipelineSettings,
    isTaskOnLastStage,
    stageOptions,
    activePipelineId,
  };
}

export { useActivePipeline };
