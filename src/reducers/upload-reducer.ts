import { SET_UPLOADS } from "../constants";
import { Action, State } from "../providers/UploadContextProvider";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_UPLOADS: {
      return {
        ...state,
        uploads: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
