import {
  OPEN_NEW_TASK_MODAL,
  OPEN_EDIT_TASK_MODAL,
  CLOSE_TASK_MODAL,
  OPEN_NEW_STAGE_MODAL,
  CLOSE_STAGE_MODAL,
  OPEN_STAGE_EDIT_MODAL,
  CLOSE_PIPELINE_MODAL,
  OPEN_NEW_PIPELINE_MODAL,
  OPEN_EDIT_PIPELINE_MODAL,
  OPEN_ARCHIVE_TASK_MODAL,
  CLOSE_ARCHIVE_TASK_MODAL,
  CLOSE_USER_MODAL,
  OPEN_NEW_USER_MODAL,
  OPEN_EDIT_USER_MODAL,
} from "../constants";
import { Action, State, initialState } from "../providers/ModalContextProvider";
import { Pipeline } from "../types/pipeline";
import { Stage } from "../types/stage";
import { ArchivedTask, Task } from "../types/task";
import { User } from "../types/user";

const closeModal = () => {
  return {
    ...initialState,
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case OPEN_NEW_TASK_MODAL: {
      const { targetStageId }: { targetStageId: string } = action.payload;

      return {
        ...state,
        taskModalOpen: true,
        targetStageId,
        taskToEdit: null,
      };
    }
    case OPEN_EDIT_TASK_MODAL: {
      const { taskToEdit }: { taskToEdit: Task } = action.payload;

      return {
        ...state,
        taskModalOpen: true,
        taskToEdit,
        targetStageId: taskToEdit.stage_id,
      };
    }
    case CLOSE_TASK_MODAL: {
      return closeModal();
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
        pipelineModalOpen: true,
        pipelineToEdit: null,
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
      const archiveTask: ArchivedTask = action.payload;

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
    default:
      return state;
  }
};

export { reducer };
