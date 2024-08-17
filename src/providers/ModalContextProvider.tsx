import { createContext, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/modal-reducer";
import { Task } from "../types/task";

const initialState = {
  taskModalOpen: false,
  targetStageId: "",
  taskToEdit: null,
};

type State = {
  taskModalOpen: boolean;
  targetStageId: string;
  taskToEdit: Task | null;
};

type Action = {
  type: string;
  payload?: any;
};

type ModalDispatch = (action: Action) => void;

type ModalContextType = {
  state: State;
  modalDispatch: ModalDispatch;
};

const ModalContext = createContext<ModalContextType>({
  state: initialState,
  modalDispatch: () => {},
});

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, modalDispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ state, modalDispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export {
  ModalContextProvider,
  ModalContext,
  type State,
  type Action,
  type ModalDispatch,
};
