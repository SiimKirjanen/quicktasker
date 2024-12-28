import { createContext, useReducer } from "@wordpress/element";
import {
  ADD_LABEL,
  EDIT_LABEL,
  REMOVE_LABEL,
  SET_LABEL_ACTION_STATE_CREATION,
  SET_LABEL_ACTION_STATE_EDITING,
  SET_LABEL_ACTION_STATE_SELECTION,
  SET_LABELS,
} from "../constants";
import { reducer } from "../reducers/labels-reducer";
import { Label, LabelActionState } from "../types/label";

const initialState: State = {
  labels: null,
  labelActionState: LabelActionState.SELECTION,
  labelToEdit: null,
};

type State = {
  labels: Label[] | null;
  labelActionState: LabelActionState;
  labelToEdit: Label | null;
};

type Action =
  | { type: typeof SET_LABELS; payload: Label[] }
  | { type: typeof EDIT_LABEL; payload: Label }
  | { type: typeof REMOVE_LABEL; payload: Label }
  | { type: typeof SET_LABEL_ACTION_STATE_SELECTION }
  | { type: typeof SET_LABEL_ACTION_STATE_EDITING; payload: Label }
  | { type: typeof SET_LABEL_ACTION_STATE_CREATION }
  | { type: typeof ADD_LABEL; payload: Label };

type Dispatch = (action: Action) => void;

type UserContextType = {
  state: State;
  labelDispatch: Dispatch;
};

const LabelContext = createContext<UserContextType>({
  state: initialState,
  labelDispatch: () => {},
});

const LabelsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, labelDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );

  return (
    <LabelContext.Provider value={{ state, labelDispatch }}>
      {children}
    </LabelContext.Provider>
  );
};

export { LabelContext, LabelsContextProvider, type Action, type State };
