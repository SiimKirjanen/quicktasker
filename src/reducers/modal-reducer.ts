import { NEW_TASK_MODAL_OPEN } from "../constants";
import { Action, State } from "../providers/ModalContextProvider";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case NEW_TASK_MODAL_OPEN:
      const {
        taskModalOpen,
        targetStageId = "",
      }: { taskModalOpen: boolean; targetStageId?: string } = action.payload;

      return {
        ...state,
        taskModalOpen,
        targetStageId,
      };
    default:
      return state;
  }
};

export { reducer };
