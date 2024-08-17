import {
  PIPELINE_ADD_EXISTING_PIPELINE,
  PIPELINE_ADD_STAGE,
  PIPELINE_ADD_TASK,
  PIPELINE_DELETE_STAGE,
  PIPELINE_EDIT_TASK,
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
      const {
        targetStageId,
        task: { id, name, description },
      }: { targetStageId: string; task: Task } = action.payload;

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline!,
          stages: state.activePipeline!.stages.map((stage) =>
            stage.id === targetStageId
              ? {
                  ...stage,
                  tasks: [
                    ...stage.tasks,
                    {
                      id,
                      name,
                      description,
                    },
                  ],
                }
              : stage,
          ),
        },
      };
    }
    case PIPELINE_EDIT_TASK: {
      const {
        targetStageId,
        task: { id, name, description },
      }: { targetStageId: string; task: Task } = action.payload;

      console.log(targetStageId, id, name, description);

      const updatedStages = state.activePipeline!.stages.map((stage) =>
        stage.id === targetStageId
          ? {
              ...stage,
              tasks: stage.tasks.map((task) =>
                task.id === id
                  ? {
                      id,
                      name,
                      description,
                    }
                  : task,
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
      const newStage: Stage = action.payload;

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: [...state.activePipeline!.stages, newStage],
        },
      };
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
    default:
      return state;
  }
};

export { pipelineReducer };
