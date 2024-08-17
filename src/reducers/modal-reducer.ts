import {
  OPEN_NEW_TASK_MODAL,
  OPEN_EDIT_TASK_MODAL,
  CLOSE_TASK_MODAL,
} from "../constants";
import { Action, State } from "../providers/ModalContextProvider";

const closeModal = (state: State) => {
  return {
    ...state,
    taskModalOpen: false,
    targetStageId: "",
    taskToEdit: null,
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
      const { taskToEdit } = action.payload;

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
    default:
      return state;
  }
};

export { reducer };
