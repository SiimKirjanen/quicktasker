import {
  SET_STAGE_FILTER,
  SET_TASK_VIEW_SEARCH_TEXT,
  SET_USER_FILTER,
} from "../constants";
import {
  Action,
  State,
} from "../providers/ActivePipelineTaskViewContextProvider";

const activePipelineTaskViewReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER_FILTER: {
      const { id, type } = action.payload;

      return {
        ...state,
        userFilter: {
          id,
          type,
        },
      };
    }
    case SET_STAGE_FILTER: {
      return {
        ...state,
        stageIdFilter: action.payload,
      };
    }
    case SET_TASK_VIEW_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    default:
      return state;
  }
};

export { activePipelineTaskViewReducer };
