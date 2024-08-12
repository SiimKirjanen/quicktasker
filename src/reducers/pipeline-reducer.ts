import {
  PIPELINE_ADD_STAGE,
  PIPELINE_ADD_TASK,
  PIPELINE_DELETE_STAGE,
  PIPELINE_MOVE_TASK,
  PIPELINE_REORDER_TASK,
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
        pipeline: action.payload,
      };
    case PIPELINE_MOVE_TASK:
      const stages = moveTask(
        state.pipeline!.stages,
        action.payload.source,
        action.payload.destination
      );

      return {
        ...state,
        pipeline: {
          ...state.pipeline!,
          stages,
        },
      };
    case PIPELINE_REORDER_TASK:
      const { source, destination } = action.payload;
      const targetStageId = destination.droppableId;
      const targetIndex = destination.index;

      const targetStage = state.pipeline?.stages.find(
        (stage) => stage.id === targetStageId
      );

      const reorderedTasks = reorderTask(
        targetStage!.tasks,
        source.index,
        targetIndex
      );

      const updatedStages = state.pipeline!.stages.map((stage) =>
        stage.id === targetStageId ? { ...stage, tasks: reorderedTasks } : stage
      );

      return {
        ...state,
        pipeline: {
          ...state.pipeline!,
          stages: updatedStages,
        },
      };
    case PIPELINE_ADD_TASK:
      const {
        stageId,
        task: { id, name },
      }: { stageId: string; task: Task } = action.payload;

      return {
        ...state,
        pipeline: {
          ...state.pipeline!,
          stages: state.pipeline!.stages.map((stage) =>
            stage.id === stageId
              ? {
                  ...stage,
                  tasks: [
                    ...stage.tasks,
                    {
                      id,
                      name,
                    },
                  ],
                }
              : stage
          ),
        },
      };
    case PIPELINE_ADD_STAGE:
      const newStage: Stage = action.payload;

      return {
        ...state,
        pipeline: {
          ...state.pipeline,
          stages: [...state.pipeline!.stages, newStage],
        },
      };
    case PIPELINE_DELETE_STAGE:
      const deletedStageId = action.payload;
      console.log("Deleting stage", deletedStageId);

      return {
        ...state,
        pipeline: {
          ...state.pipeline,
          stages: state.pipeline!.stages.filter(
            (stage) => stage.id !== deletedStageId
          ),
        },
      };

    default:
      return state;
  }
};

export { pipelineReducer };
