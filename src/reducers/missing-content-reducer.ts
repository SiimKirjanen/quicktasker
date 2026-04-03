import { RESET_MISSING_CONTENT, SET_PIPELINE_MISSING } from "../constants";
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
    case RESET_MISSING_CONTENT: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
