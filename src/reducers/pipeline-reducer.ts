import {
  PIPELINE_ADD_EXISTING_PIPELINE,
  PIPELINE_ADD_PIPELINE,
  PIPELINE_ADD_STAGE,
  PIPELINE_ADD_TASK,
  PIPELINE_DELETE_STAGE,
  PIPELINE_EDIT_PIPELINE,
  PIPELINE_EDIT_STAGE,
  PIPELINE_EDIT_TASK,
  PIPELINE_MOVE_STAGE,
  PIPELINE_MOVE_TASK,
  PIPELINE_REORDER_TASK,
  PIPELINE_SET_EXISTING_PIPELINES,
  PIPELINE_SET_LOADING,
  PIPELINE_SET_PIPELINE,
} from "../constants";
import { Action, State } from "../providers/PipelineContextProvider";
import { Stage } from "../types/stage";
import { Task } from "../types/task";
import { moveTask, reorderTask } from "../utils/task";
import { Pipeline } from "../types/pipeline";

const pipelineReducer = (state: State, action: Action) => {
  switch (action.type) {
    case PIPELINE_SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PIPELINE_SET_PIPELINE:
      return {
        ...state,
        activePipeline: action.payload,
      };
    case PIPELINE_MOVE_TASK:
      const stages = moveTask(
        state.activePipeline!.stages,
        action.payload.source,
        action.payload.destination,
      );

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline!,
          stages,
        },
      };
    case PIPELINE_REORDER_TASK:
      const { source, destination } = action.payload;
      const targetStageId = destination.droppableId;
      const targetIndex = destination.index;

      const targetStage = state.activePipeline?.stages.find(
        (stage) => stage.id === targetStageId,
      );

      const reorderedTasks = reorderTask(
        targetStage!.tasks,
        source.index,
        targetIndex,
      );

      const updatedStages = state.activePipeline!.stages.map((stage) =>
        stage.id === targetStageId
          ? { ...stage, tasks: reorderedTasks }
          : stage,
      );

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline!,
          stages: updatedStages,
        },
      };
    case PIPELINE_ADD_TASK: {
      const newTask: Task = action.payload;

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline!,
          stages: state.activePipeline!.stages.map((stage) =>
            stage.id === newTask.stage_id
              ? {
                  ...stage,
                  tasks: [...stage.tasks, newTask],
                }
              : stage,
          ),
        },
      };
    }
    case PIPELINE_EDIT_TASK: {
      const editedTask: Task = action.payload;

      const updatedStages = state.activePipeline!.stages.map((stage) =>
        stage.id === editedTask.stage_id
          ? {
              ...stage,
              tasks: stage.tasks.map((task) =>
                task.id === editedTask.id ? editedTask : task,
              ),
            }
          : stage,
      );

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline!,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_ADD_STAGE:
      const stage: Stage = action.payload;

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: [...state.activePipeline!.stages, stage],
        },
      };
    case PIPELINE_EDIT_STAGE: {
      const updatedStage: Stage = action.payload;

      const updateStage = (stage: Stage) => {
        if (stage.id === updatedStage.id) {
          return {
            ...stage,
            name: updatedStage.name,
            description: updatedStage.description,
          };
        }
        return stage;
      };

      const updatedStages = state.activePipeline!.stages.map(updateStage);

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_MOVE_STAGE: {
      const { sourceIndex, destinationIndex } = action.payload;

      const stages = [...state.activePipeline!.stages];
      const [removedStage] = stages.splice(sourceIndex, 1);
      stages.splice(destinationIndex, 0, removedStage);

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages,
        },
      };
    }
    case PIPELINE_DELETE_STAGE:
      const deletedStageId = action.payload;

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: state.activePipeline!.stages.filter(
            (stage) => stage.id !== deletedStageId,
          ),
        },
      };
    case PIPELINE_SET_EXISTING_PIPELINES:
      return {
        ...state,
        existingPipelines: action.payload,
      };
    case PIPELINE_ADD_EXISTING_PIPELINE:
      return {
        ...state,
        existingPipelines: [...state.existingPipelines, action.payload],
      };
    case PIPELINE_ADD_PIPELINE: {
      const pipeline = action.payload;

      return {
        ...state,
        existingPipelines: [...state.existingPipelines, pipeline],
      };
    }
    case PIPELINE_EDIT_PIPELINE: {
      const pipeline: Pipeline = action.payload;

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          name: pipeline.name,
          description: pipeline.description,
        },
        existingPipelines: state.existingPipelines.map((p) =>
          p.id === pipeline.id ? pipeline : p,
        ),
      };
    }
    default:
      return state;
  }
};

export { pipelineReducer };
