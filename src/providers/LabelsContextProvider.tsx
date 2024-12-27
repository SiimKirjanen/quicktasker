import { createContext, useReducer } from "@wordpress/element";
import { ADD_LABEL, EDIT_LABEL, REMOVE_LABEL, SET_LABELS } from "../constants";
import { reducer } from "../reducers/labels-reducer";
import { Label } from "../types/label";

const initialState: State = {
  labels: [],
};

type State = {
  labels: Label[];
};

type Action =
  | { type: typeof SET_LABELS; payload: Label[] }
  | { type: typeof EDIT_LABEL; payload: Label }
  | { type: typeof REMOVE_LABEL; payload: Label }
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
