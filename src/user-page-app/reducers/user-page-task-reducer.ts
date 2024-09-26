import { convertStageFromServer } from "../../utils/stage";
import { convertTaskFromServer } from "../../utils/task";
import {
  SET_USER_PAGE_TASK_DATA,
  SET_USER_PAGE_TASK_LOADING,
} from "../constants";
import { Action, State } from "../providers/UserPageTaskContextProvider";
import { UserPageTaskResponse } from "../types/user-page-task-response";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER_PAGE_TASK_DATA: {
      const data: UserPageTaskResponse = action.payload;
      console.log(data);

      return {
        ...state,
        task: convertTaskFromServer(data.task),
        taskStages: data.stages.map(convertStageFromServer),
      };
    }
    case SET_USER_PAGE_TASK_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};

export { reducer };
