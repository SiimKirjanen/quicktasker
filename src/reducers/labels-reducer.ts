import { ADD_LABEL, EDIT_LABEL, REMOVE_LABEL, SET_LABELS } from "../constants";
import { Action, State } from "../providers/LabelsContextProvider";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_LABELS: {
      return {
        ...state,
        labels: action.payload,
      };
    }
    case ADD_LABEL: {
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    }
    case EDIT_LABEL: {
      return {
        ...state,
        labels: state.labels.map((label) =>
          label.id === action.payload.id ? action.payload : label,
        ),
      };
    }
    case REMOVE_LABEL: {
      return {
        ...state,
        labels: state.labels.filter((label) => label.id !== action.payload.id),
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
