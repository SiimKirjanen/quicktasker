import {
  RESET_MISSING_CONTENT,
  SET_PIPELINE_MISSING,
  SET_PIPELINE_NO_ACCESS,
  SET_STAGE_MISSING,
  SET_TASK_MISSING,
} from "../constants";
import {
  Action,
  State,
  initialState,
} from "../providers/MissingContentProvider";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PIPELINE_MISSING: {
      const pipelineMissing: boolean = action.payload;

      return { ...state, pipelineMissing };
    }
    case SET_PIPELINE_NO_ACCESS: {
      return { ...state, pipelineNoAccess: action.payload };
    }
    case SET_STAGE_MISSING: {
      const stageMissing: boolean = action.payload;

      return {
        ...state,
        stageMissing: stageMissing,
      };
    }
    case RESET_MISSING_CONTENT: {
      return { ...initialState };
    }
    case SET_TASK_MISSING: {
      const taskMissing: boolean = action.payload;

      return {
        ...state,
        taskMissing: taskMissing,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
