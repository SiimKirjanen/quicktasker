import { createContext, useReducer } from "@wordpress/element";
import {
  ADD_ASSIGNED_USER_TO_EDITING_TASK,
  ARCHIVE_SETTINGS_MODAL_OPEN,
  CHANGE_TASK_DONE_STATUS,
  CHANGE_TASK_EXPORT_MODAL_METHOD,
  CHANGE_USER_SETTINGS_MODAL_OPEN,
  CLOSE_ARCHIVE_TASK_MODAL,
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
  SET_WEBHOOK_CREATION_MODAL_OPEN,
  SET_WEBHOOKS_MODAL_OPEN,
  UPDATE_WEBHOOKS_LOGS_MODAL_SETTINGS,
} from "../constants";
import { reducer } from "../reducers/modal-reducer";
import {
  TaskExportModalSettings,
  TaskModalSettings,
  TaskRestoreModalSettings,
  WebhooksLogsModalSettings,
} from "../types/modal";
import { Pipeline } from "../types/pipeline";
import { Stage } from "../types/stage";
import { Task, TaskExportMethods } from "../types/task";
import { User, WPUser } from "../types/user";

const initialState: State = {
  taskModalOpen: false,
  targetStageId: "",
  taskToEdit: null,
  taskModalSettings: {
    allowToMarkTaskAsDone: true,
  },
  moveTaskModalOpen: false,
  stageModalOpen: false,
  stageToEdit: null,
  targetPipelineId: "",
  pipelineModalOpen: false,
  newPipelineModalOpen: false,
  pipelineToEdit: null,
  archiveTaskModalOpen: false,
  archiveModalTask: null,
  userModalOpen: false,
  userToEdit: null,
  userSettingsModalOpen: false,
  taskColorModalOpen: false,
  taskExportModalOpen: false,
  taskExportModalSettings: {
    selectedMethod: TaskExportMethods.PDF,
  },
  pipelineImportModalOpen: false,
  automationCreatorModalOpen: false,
  automationsModalOpen: false,
  archiveSettingsModalOpen: false,
  taskRestoreModalOpen: false,
  taskRestoreModalSettings: {
    taskToRestore: null,
  },
  customFieldCreatorModalOpen: false,
  customFieldRecoveryModalOpen: false,
  webhookCreationModalOpen: false,
  webhooksModalOpen: false,
  webhooksLogsModalOpen: false,
  webhooksLogsModalSettings: {
    webhookId: null,
  },
};

type State = {
  taskModalOpen: boolean;
  targetStageId: string;
  taskToEdit: Task | null;
  taskModalSettings: TaskModalSettings;
  moveTaskModalOpen: boolean;
  stageModalOpen: boolean;
  stageToEdit: Stage | null;
  targetPipelineId: string;
  pipelineModalOpen: boolean;
  newPipelineModalOpen: boolean;
  pipelineToEdit: Pipeline | null;
  archiveTaskModalOpen: boolean;
  archiveModalTask: Task | null;
  userModalOpen: boolean;
  userToEdit: User | null;
  userSettingsModalOpen: boolean;
  taskColorModalOpen: boolean;
  taskExportModalOpen: boolean;
  taskExportModalSettings: TaskExportModalSettings;
  pipelineImportModalOpen: boolean;
  automationCreatorModalOpen: boolean;
  automationsModalOpen: boolean;
  archiveSettingsModalOpen: boolean;
  taskRestoreModalOpen: boolean;
  taskRestoreModalSettings: TaskRestoreModalSettings;
  customFieldCreatorModalOpen: boolean;
  customFieldRecoveryModalOpen: boolean;
  webhookCreationModalOpen: boolean;
  webhooksModalOpen: boolean;
  webhooksLogsModalOpen: boolean;
  webhooksLogsModalSettings: WebhooksLogsModalSettings;
};

type Action =
  | {
      type: typeof OPEN_EDIT_TASK_MODAL;
      payload: { taskToEdit: Task; taskModalSettings?: TaskModalSettings };
    }
  | { type: typeof CLOSE_TASK_MODAL }
  | { type: typeof ADD_ASSIGNED_USER_TO_EDITING_TASK; payload: User | WPUser }
  | {
      type: typeof REMOVE_ASSIGNED_USER_FROM_EDITING_TASK;
      payload: User | WPUser;
    }
  | { type: typeof OPEN_NEW_STAGE_MODAL; payload: { targetPipelineId: string } }
  | { type: typeof OPEN_STAGE_EDIT_MODAL; payload: { stageToEdit: Stage } }
  | { type: typeof CLOSE_STAGE_MODAL }
  | { type: typeof OPEN_NEW_PIPELINE_MODAL }
  | {
      type: typeof OPEN_EDIT_PIPELINE_MODAL;
      payload: { pipelineToEdit: Pipeline };
    }
  | { type: typeof CLOSE_PIPELINE_MODAL }
  | { type: typeof OPEN_ARCHIVE_TASK_MODAL; payload: Task }
  | { type: typeof CLOSE_ARCHIVE_TASK_MODAL }
  | { type: typeof OPEN_NEW_USER_MODAL }
  | { type: typeof OPEN_EDIT_USER_MODAL; payload: User }
  | { type: typeof CHANGE_USER_SETTINGS_MODAL_OPEN; payload: boolean }
  | {
      type: typeof CHANGE_TASK_DONE_STATUS;
      payload: { done: boolean };
    }
  | { type: typeof OPEN_MOVE_TASK_MODAL; payload: { task: Task } }
  | { type: typeof CLOSE_MOVE_TASK_MODAL }
  | { type: typeof CLOSE_USER_MODAL }
  | { type: typeof OPEN_TASK_COLOR_MODAL; payload: { task: Task } }
  | { type: typeof CLOSE_TASK_COLOR_MODAL }
  | {
      type: typeof OPEN_TASK_EXPORT_MODAL;
      payload: {
        selectedMethod: TaskExportMethods;
      };
    }
  | {
      type: typeof CHANGE_TASK_EXPORT_MODAL_METHOD;
      payload: { selectedMethod: TaskExportMethods };
    }
  | { type: typeof CLOSE_TASK_EXPORT_MODAL }
  | { type: typeof OPEN_PIPELINE_IMPORT_MODAL }
  | { type: typeof CLOSE_PIPELINE_IMPORT_MODAL }
  | { type: typeof ARCHIVE_SETTINGS_MODAL_OPEN; payload: boolean }
  | {
      type: typeof OPEN_TASK_RESTORE_MODAL;
      payload: { taskToRestore: Task };
    }
  | { type: typeof CLOSE_TASK_RESTORE_MODAL }
  | { type: typeof SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN; payload: boolean }
  | { type: typeof SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN; payload: boolean }
  | { type: typeof SET_WEBHOOK_CREATION_MODAL_OPEN; payload: boolean }
  | { type: typeof OPEN_WEBHOOKS_LOGS_MODAL; payload: { webhookId: string } }
  | { type: typeof CLOSE_WEBHOOKS_LOGS_MODAL }
  | {
      type: typeof UPDATE_WEBHOOKS_LOGS_MODAL_SETTINGS;
      payload: Partial<WebhooksLogsModalSettings>;
    }
  | { type: typeof SET_WEBHOOKS_MODAL_OPEN; payload: boolean };

type ModalDispatch = (action: Action) => void;

type ModalContextType = {
  state: State;
  modalDispatch: ModalDispatch;
};

const ModalContext = createContext<ModalContextType>({
  state: initialState,
  modalDispatch: () => {},
});

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, modalDispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, modalDispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export {
  initialState,
  ModalContext,
  ModalContextProvider,
  type Action,
  type ModalContextType,
  type ModalDispatch,
  type State,
};
