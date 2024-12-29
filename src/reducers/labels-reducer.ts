import {
  ADD_LABEL,
  EDIT_LABEL,
  REMOVE_LABEL,
  RESET_LABEL_CONTEXT,
  SET_LABEL_ACTION_STATE_CREATION,
  SET_LABEL_ACTION_STATE_EDITING,
  SET_LABEL_ACTION_STATE_SELECTION,
  SET_LABELS,
} from "../constants";
import {
  Action,
  initialLabelContextState,
  State,
} from "../providers/LabelsContextProvider";
import { LabelActionState } from "../types/label";

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
        labels: state.labels
          ? [...state.labels, action.payload]
          : [action.payload],
        labelActionState: LabelActionState.SELECTION,
      };
    }
    case EDIT_LABEL: {
      return {
        ...state,
        labels: state.labels
          ? state.labels.map((label) =>
              label.id === action.payload.id ? action.payload : label,
            )
          : [action.payload],
      };
    }
    case REMOVE_LABEL: {
      return {
        ...state,
        labels: state.labels
          ? state.labels.filter((label) => label.id !== action.payload.id)
          : [],
      };
    }
    case SET_LABEL_ACTION_STATE_SELECTION: {
      return {
        ...state,
        labelActionState: LabelActionState.SELECTION,
        labelToEdit: null,
      };
    }
    case SET_LABEL_ACTION_STATE_EDITING: {
      return {
        ...state,
        labelActionState: LabelActionState.EDIT,
        labelToEdit: action.payload,
      };
    }
    case SET_LABEL_ACTION_STATE_CREATION: {
      return {
        ...state,
        labelActionState: LabelActionState.CREATION,
        labelToEdit: null,
      };
    }
    case RESET_LABEL_CONTEXT: {
      return initialLabelContextState;
    }
    default: {
      return state;
    }
  }
};

export { reducer };
