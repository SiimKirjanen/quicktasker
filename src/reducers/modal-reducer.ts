import {
  ADD_ASSIGNED_USER_TO_EDITING_TASK,
  ARCHIVE_SETTINGS_MODAL_OPEN,
  CHANGE_TASK_DONE_STATUS,
  CHANGE_TASK_EXPORT_MODAL_METHOD,
  CHANGE_USER_SETTINGS_MODAL_OPEN,
  CLOSE_ARCHIVE_TASK_MODAL,
  CLOSE_AUTOMATION_LOGS_MODAL,
  CLOSE_MOVE_TASK_MODAL,
  CLOSE_PIPELINE_IMPORT_MODAL,
  CLOSE_PIPELINE_MODAL,
  CLOSE_STAGE_MODAL,
  CLOSE_TASK_COLOR_MODAL,
  CLOSE_TASK_EXPORT_MODAL,
  CLOSE_TASK_MODAL,
  CLOSE_TASK_RESTORE_MODAL,
  CLOSE_USER_MODAL,
  CLOSE_WEBHOOKS_LOGS_MODAL,
  OPEN_ARCHIVE_TASK_MODAL,
  OPEN_AUTOMATION_LOGS_MODAL,
  OPEN_EDIT_PIPELINE_MODAL,
  OPEN_EDIT_TASK_MODAL,
  OPEN_EDIT_USER_MODAL,
  OPEN_MOVE_TASK_MODAL,
  OPEN_NEW_PIPELINE_MODAL,
  OPEN_NEW_STAGE_MODAL,
  OPEN_NEW_USER_MODAL,
  OPEN_PIPELINE_IMPORT_MODAL,
  OPEN_STAGE_EDIT_MODAL,
  OPEN_TASK_COLOR_MODAL,
  OPEN_TASK_EXPORT_MODAL,
  OPEN_TASK_RESTORE_MODAL,
  OPEN_WEBHOOKS_LOGS_MODAL,
  REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
  SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
  SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN,
  UPDATE_AUTOMATION_LOGS_MODAL_SETTINGS,
  UPDATE_WEBHOOKS_LOGS_MODAL_SETTINGS,
} from "../constants";
import { isUser, isWPUser } from "../guards/user-guard";
import { Action, initialState, State } from "../providers/ModalContextProvider";
import { TaskModalSettings } from "../types/modal";
import { Pipeline } from "../types/pipeline";
import { Stage } from "../types/stage";
import { Task, TaskExportMethods } from "../types/task";
import { User, WPUser } from "../types/user";

const closeModal = () => {
  return {
    ...initialState,
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case OPEN_EDIT_TASK_MODAL: {
      const {
        taskToEdit,
        taskModalSettings,
      }: { taskToEdit: Task; taskModalSettings?: TaskModalSettings } =
        action.payload;

      return {
        ...state,
        taskModalOpen: true,
        taskToEdit,
        targetStageId: taskToEdit.stage_id,
        taskModalSettings: {
          ...state.taskModalSettings,
          ...taskModalSettings,
        },
      };
    }
    case CLOSE_TASK_MODAL: {
      return closeModal();
    }
    case ADD_ASSIGNED_USER_TO_EDITING_TASK: {
      const user: User | WPUser = action.payload;

      return {
        ...state,
        taskToEdit: {
          ...state.taskToEdit!,
          assigned_users: isUser(user)
            ? [user, ...(state.taskToEdit?.assigned_users ?? [])]
            : (state.taskToEdit?.assigned_users ?? []),
          assigned_wp_users: isWPUser(user)
            ? [user, ...(state.taskToEdit?.assigned_wp_users ?? [])]
            : (state.taskToEdit?.assigned_wp_users ?? []),
        },
      };
    }
    case REMOVE_ASSIGNED_USER_FROM_EDITING_TASK: {
      const user: User | WPUser = action.payload;

      return {
        ...state,
        taskToEdit: {
          ...state.taskToEdit!,
          assigned_users: isUser(user)
            ? (state.taskToEdit?.assigned_users ?? []).filter(
                (assignedUser: User) => assignedUser.id !== user.id,
              )
            : (state.taskToEdit?.assigned_users ?? []),
          assigned_wp_users: isWPUser(user)
            ? (state.taskToEdit?.assigned_wp_users ?? []).filter(
                (assignedWPUser: WPUser) => assignedWPUser.id !== user.id,
              )
            : (state.taskToEdit?.assigned_wp_users ?? []),
        },
      };
    }
    case OPEN_NEW_STAGE_MODAL: {
      const { targetPipelineId }: { targetPipelineId: string } = action.payload;

      return {
        ...state,
        stageModalOpen: true,
        targetPipelineId,
      };
    }
    case OPEN_STAGE_EDIT_MODAL: {
      const { stageToEdit }: { stageToEdit: Stage } = action.payload;

      return {
        ...state,
        stageModalOpen: true,
        stageToEdit,
      };
    }
    case CLOSE_STAGE_MODAL: {
      return closeModal();
    }
    case OPEN_NEW_PIPELINE_MODAL: {
      return {
        ...state,
        newPipelineModalOpen: true,
      };
    }
    case OPEN_EDIT_PIPELINE_MODAL: {
      const { pipelineToEdit }: { pipelineToEdit: Pipeline } = action.payload;

      return {
        ...state,
        pipelineModalOpen: true,
        pipelineToEdit,
      };
    }
    case CLOSE_PIPELINE_MODAL: {
      return closeModal();
    }
    case OPEN_ARCHIVE_TASK_MODAL: {
      const archiveTask: Task = action.payload;

      return {
        ...state,
        archiveTaskModalOpen: true,
        archiveModalTask: archiveTask,
      };
    }
    case CLOSE_ARCHIVE_TASK_MODAL: {
      return closeModal();
    }
    case OPEN_NEW_USER_MODAL: {
      return {
        ...state,
        userModalOpen: true,
      };
    }
    case OPEN_EDIT_USER_MODAL: {
      const userToEdit: User = action.payload;

      return {
        ...state,
        userModalOpen: true,
        userToEdit,
      };
    }
    case CLOSE_USER_MODAL: {
      return closeModal();
    }
    case CHANGE_USER_SETTINGS_MODAL_OPEN: {
      const open: boolean = action.payload;

      if (open) {
        return {
          ...state,
          userSettingsModalOpen: true,
        };
      }
      return closeModal();
    }
    case CHANGE_TASK_DONE_STATUS: {
      const { done }: { done: boolean } = action.payload;

      return {
        ...state,
        taskToEdit: {
          ...state.taskToEdit!,
          is_done: done,
        },
      };
    }
    case OPEN_MOVE_TASK_MODAL: {
      const { task }: { task: Task } = action.payload;

      return {
        ...state,
        moveTaskModalOpen: true,
        taskToEdit: task,
      };
    }
    case CLOSE_MOVE_TASK_MODAL: {
      return closeModal();
    }
    case OPEN_TASK_COLOR_MODAL: {
      const { task }: { task: Task } = action.payload;

      return {
        ...state,
        taskColorModalOpen: true,
        taskToEdit: task,
      };
    }
    case CLOSE_TASK_COLOR_MODAL: {
      return closeModal();
    }
    case OPEN_TASK_EXPORT_MODAL: {
      const { selectedMethod }: { selectedMethod: TaskExportMethods } =
        action.payload;

      return {
        ...state,
        taskExportModalOpen: true,
        taskExportModalSettings: {
          ...state.taskExportModalSettings,
          selectedMethod,
        },
      };
    }
    case CLOSE_TASK_EXPORT_MODAL: {
      return closeModal();
    }
    case CHANGE_TASK_EXPORT_MODAL_METHOD: {
      const { selectedMethod }: { selectedMethod: TaskExportMethods } =
        action.payload;

      return {
        ...state,
        taskExportModalSettings: {
          ...state.taskExportModalSettings,
          selectedMethod,
        },
      };
    }
    case OPEN_PIPELINE_IMPORT_MODAL: {
      return {
        ...state,
        pipelineImportModalOpen: true,
      };
    }
    case CLOSE_PIPELINE_IMPORT_MODAL: {
      return closeModal();
    }
    case ARCHIVE_SETTINGS_MODAL_OPEN: {
      const open: boolean = action.payload;

      if (open) {
        return {
          ...state,
          archiveSettingsModalOpen: true,
        };
      }
      return closeModal();
    }
    case OPEN_TASK_RESTORE_MODAL: {
      const { taskToRestore }: { taskToRestore: Task } = action.payload;

      return {
        ...state,
        taskRestoreModalOpen: true,
        taskRestoreModalSettings: {
          ...state.taskRestoreModalSettings,
          taskToRestore,
        },
      };
    }
    case SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN: {
      const open: boolean = action.payload;

      return {
        ...state,
        customFieldCreatorModalOpen: open,
      };
    }
    case SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN: {
      const open: boolean = action.payload;

      return {
        ...state,
        customFieldRecoveryModalOpen: open,
      };
    }
    case CLOSE_TASK_RESTORE_MODAL: {
      return closeModal();
    }
    case OPEN_WEBHOOKS_LOGS_MODAL: {
      const { webhookId }: { webhookId: string } = action.payload;

      return {
        ...state,
        webhooksLogsModalOpen: true,
        webhooksLogsModalSettings: {
          ...state.webhooksLogsModalSettings,
          webhookId,
        },
      };
    }
    case CLOSE_WEBHOOKS_LOGS_MODAL: {
      return {
        ...state,
        webhooksLogsModalOpen: false,
        webhooksLogsModalSettings: {
          ...initialState.webhooksLogsModalSettings,
        },
      };
    }
    case UPDATE_WEBHOOKS_LOGS_MODAL_SETTINGS: {
      const settings = action.payload;

      return {
        ...state,
        webhooksLogsModalSettings: {
          ...state.webhooksLogsModalSettings,
          ...settings,
        },
      };
    }
    case OPEN_AUTOMATION_LOGS_MODAL: {
      const { automationId }: { automationId: string } = action.payload;

      return {
        ...state,
        automationLogsModalOpen: true,
        automationLogsModalSettings: {
          ...state.automationLogsModalSettings,
          automationId,
        },
      };
    }
    case CLOSE_AUTOMATION_LOGS_MODAL: {
      return {
        ...state,
        automationLogsModalOpen: false,
        automationLogsModalSettings: {
          ...initialState.automationLogsModalSettings,
        },
      };
    }
    case UPDATE_AUTOMATION_LOGS_MODAL_SETTINGS: {
      const settings = action.payload;

      return {
        ...state,
        automationLogsModalSettings: {
          ...state.automationLogsModalSettings,
          ...settings,
        },
      };
    }
    default:
      return state;
  }
};

export { reducer };
