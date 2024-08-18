import {
  OPEN_NEW_TASK_MODAL,
  OPEN_EDIT_TASK_MODAL,
  CLOSE_TASK_MODAL,
  OPEN_NEW_STAGE_MODAL,
  CLOSE_STAGE_MODAL,
  OPEN_STAGE_EDIT_MODAL,
} from "../constants";
import { Action, State } from "../providers/ModalContextProvider";
import { Stage } from "../types/stage";
import { Task } from "../types/task";

const closeModal = (state: State) => {
  return {
    ...state,
    taskModalOpen: false,
    targetStageId: "",
    taskToEdit: null,
    stageModalOpen: false,
    targetPipelineId: "",
    stageToEdit: null,
  };
};

const reducer = (state: State, action: Action) => {
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
      return closeModal(state);
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
      return closeModal(state);
    }
    default:
      return state;
  }
};

export { reducer };
