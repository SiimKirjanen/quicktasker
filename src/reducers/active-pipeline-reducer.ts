import {
  PIPELINE_ADD_LABEL_TO_TASK,
  PIPELINE_ADD_STAGE,
  PIPELINE_ADD_TASK,
  PIPELINE_ADD_USER_TO_TASK,
  PIPELINE_CHANGE_TASK_DONE_STATUS,
  PIPELINE_DELETE_STAGE,
  PIPELINE_EDIT_LABEL,
  PIPELINE_EDIT_PIPELINE,
  PIPELINE_EDIT_SETTINGS,
  PIPELINE_EDIT_STAGE,
  PIPELINE_EDIT_TASK,
  PIPELINE_MOVE_TASK,
  PIPELINE_REMOVE_ACTIVE_PIPELINE,
  PIPELINE_REMOVE_LABEL,
  PIPELINE_REMOVE_LABEL_FROM_TASK,
  PIPELINE_REMOVE_TASK,
  PIPELINE_REMOVE_USER_FROM_TASK,
  PIPELINE_REORDER_TASK,
  PIPELINE_SET_LOADING,
  PIPELINE_SET_PIPELINE,
  PIPELINE_SET_TASK_FOCUS_COLOR,
  PIPELINE_TOGGLE_VIEW,
} from "../constants";
import { isUser, isWPUser } from "../guards/user-guard";
import { Action, State } from "../providers/ActivePipelineContextProvider";
import { PipelineFromServer } from "../types/pipeline";
import { Stage, StageFromServer } from "../types/stage";
import { Task, TaskFromServer } from "../types/task";
import { UserTypes } from "../types/user";
import { convertPipelineSettingsFromServer } from "../utils/pipeline-settings";
import { convertStageFromServer } from "../utils/stage";
import { convertTaskFromServer, moveTask, reorderTask } from "../utils/task";

const activePipelineReducer = (state: State, action: Action) => {
  switch (action.type) {
    case PIPELINE_SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PIPELINE_SET_PIPELINE: {
      const pipelineData: PipelineFromServer = action.payload;

      const transformedStages = (pipelineData.stages || []).map(
        (stage: StageFromServer) => {
          return {
            ...convertStageFromServer(stage),
          };
        },
      );

      const transformedSettings = pipelineData.settings
        ? convertPipelineSettingsFromServer(pipelineData.settings)
        : undefined;

      return {
        ...state,
        activePipeline: {
          ...pipelineData,
          stages: transformedStages,
          settings: transformedSettings,
          is_primary: pipelineData.is_primary === "1",
        },
      };
    }
    case PIPELINE_EDIT_SETTINGS: {
      if (!state.activePipeline || !state.activePipeline.settings) {
        return state;
      }
      const updatedSettings = action.payload;

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          settings: {
            ...state.activePipeline.settings,
            ...updatedSettings,
          },
        },
      };
    }
    case PIPELINE_MOVE_TASK: {
      if (!state.activePipeline || !state.activePipeline.stages) {
        return state;
      }

      const stages = moveTask(
        state.activePipeline.stages,
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
    }
    case PIPELINE_REORDER_TASK: {
      const { source, destination } = action.payload;
      const targetStageId = destination.droppableId;
      const targetIndex = destination.index;

      if (!state.activePipeline) {
        return state;
      }

      const targetStage = state.activePipeline.stages?.find(
        (stage) => stage.id === targetStageId,
      );

      if (!targetStage || !targetStage.tasks) {
        return state;
      }

      const reorderedTasks = reorderTask(
        targetStage!.tasks,
        source.index,
        targetIndex,
      );

      const updatedStages = state.activePipeline.stages?.map((stage) =>
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
    }
    case PIPELINE_ADD_TASK: {
      const newTask: Task = convertTaskFromServer(
        action.payload as TaskFromServer,
      );

      if (!state.activePipeline) {
        return state;
      }

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline!,
          stages: state.activePipeline.stages?.map((stage) =>
            stage.id === newTask.stage_id
              ? {
                  ...stage,
                  tasks: [...(stage.tasks || []), newTask],
                }
              : stage,
          ),
        },
      };
    }
    case PIPELINE_EDIT_TASK: {
      const editedTask: Task = convertTaskFromServer(
        action.payload as TaskFromServer,
      );

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) =>
        stage.id === editedTask.stage_id
          ? {
              ...stage,
              tasks: stage.tasks?.map((task) =>
                task.id === editedTask.id ? { ...task, ...editedTask } : task,
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
    case PIPELINE_ADD_STAGE: {
      const { stage } = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: [...(state.activePipeline.stages || []), stage],
        },
      };
    }
    case PIPELINE_EDIT_STAGE: {
      const updatedStage: Stage = action.payload;

      if (!state.activePipeline) {
        return state;
      }

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

      const updatedStages = state.activePipeline.stages?.map(updateStage);

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_DELETE_STAGE: {
      const deletedStageId = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: state.activePipeline.stages?.filter(
            (stage) => stage.id !== deletedStageId,
          ),
        },
      };
    }
    case PIPELINE_ADD_USER_TO_TASK: {
      const { taskId, user } = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        const updatedTasks = stage.tasks?.map((task: Task) => {
          if (task.id === taskId) {
            const updatedAssignedUsers = isUser(user)
              ? [user, ...(task.assigned_users || [])]
              : task.assigned_users || [];

            const updatedAssignedWPUsers = isWPUser(user)
              ? [user, ...(task.assigned_wp_users || [])]
              : task.assigned_wp_users || [];

            return {
              ...task,
              assigned_users: updatedAssignedUsers,
              assigned_wp_users: updatedAssignedWPUsers,
            };
          }
          return task;
        });

        return {
          ...stage,
          tasks: updatedTasks,
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_REMOVE_USER_FROM_TASK: {
      const { taskId, userId, userType } = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        const updatedTasks = stage.tasks?.map((task: Task) => {
          if (task.id === taskId) {
            return {
              ...task,
              assigned_users:
                userType === UserTypes.QUICKTASKER
                  ? task.assigned_users?.filter((user) => user.id !== userId)
                  : task.assigned_users,
              assigned_wp_users:
                userType === UserTypes.WP_USER
                  ? task.assigned_wp_users?.filter((user) => user.id !== userId)
                  : task.assigned_wp_users,
            };
          }
          return task;
        });

        return {
          ...stage,
          tasks: updatedTasks,
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_EDIT_PIPELINE: {
      const updatedPipeline: PipelineFromServer = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          name: updatedPipeline.name,
          description: updatedPipeline.description,
          is_primary: updatedPipeline.is_primary === "1",
        },
      };
    }
    case PIPELINE_CHANGE_TASK_DONE_STATUS: {
      const { taskId, done } = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        const updatedTasks = stage.tasks?.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              is_done: done,
            };
          }
          return task;
        });

        return {
          ...stage,
          tasks: updatedTasks,
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_REMOVE_ACTIVE_PIPELINE: {
      return {
        ...state,
        activePipeline: null,
      };
    }
    case PIPELINE_REMOVE_TASK: {
      const taskId = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        return {
          ...stage,
          tasks: stage.tasks?.filter((task) => task.id !== taskId),
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_TOGGLE_VIEW: {
      return {
        ...state,
        view: action.payload,
      };
    }
    case PIPELINE_ADD_LABEL_TO_TASK: {
      const { taskId, label } = action.payload;
      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        const updatedTasks = stage.tasks?.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              assigned_labels: [...(task.assigned_labels || []), label],
            };
          }
          return task;
        });

        return {
          ...stage,
          tasks: updatedTasks,
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_REMOVE_LABEL_FROM_TASK: {
      const { taskId, labelId } = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        const updatedTasks = stage.tasks?.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              assigned_labels: (task.assigned_labels || []).filter(
                (label) => label.id !== labelId,
              ),
            };
          }
          return task;
        });

        return {
          ...stage,
          tasks: updatedTasks,
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_EDIT_LABEL: {
      const { label } = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        const updatedTasks = stage.tasks?.map((task) => {
          return {
            ...task,
            assigned_labels: (task.assigned_labels || []).map(
              (assignedLabel) =>
                assignedLabel.id === label.id ? label : assignedLabel,
            ),
          };
        });

        return {
          ...stage,
          tasks: updatedTasks,
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_REMOVE_LABEL: {
      const labelId = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        const updatedTasks = stage.tasks?.map((task) => {
          return {
            ...task,
            assigned_labels: (task.assigned_labels || []).filter(
              (assignedLabel) => assignedLabel.id !== labelId,
            ),
          };
        });

        return {
          ...stage,
          tasks: updatedTasks,
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    case PIPELINE_SET_TASK_FOCUS_COLOR: {
      const { taskId, color } = action.payload;

      if (!state.activePipeline) {
        return state;
      }

      const updatedStages = state.activePipeline.stages?.map((stage) => {
        const updatedTasks = stage.tasks?.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              task_focus_color: color,
            };
          }
          return task;
        });

        return {
          ...stage,
          tasks: updatedTasks,
        };
      });

      return {
        ...state,
        activePipeline: {
          ...state.activePipeline,
          stages: updatedStages,
        },
      };
    }
    default:
      return state;
  }
};

export { activePipelineReducer };
