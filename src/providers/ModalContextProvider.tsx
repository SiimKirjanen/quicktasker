import { createContext, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/modal-reducer";
import { ArchivedTask, Task } from "../types/task";
import { Stage } from "../types/stage";
import { Pipeline } from "../types/pipeline";
import { User } from "../types/user";

const initialState: State = {
  taskModalOpen: false,
  targetStageId: "",
  taskToEdit: null,
  stageModalOpen: false,
  stageToEdit: null,
  targetPipelineId: "",
  pipelineModalOpen: false,
  pipelineToEdit: null,
  archiveTaskModalOpen: false,
  archiveModalTask: null,
  userModalOpen: false,
  userToEdit: null,
};

type State = {
  taskModalOpen: boolean;
  targetStageId: string;
  taskToEdit: Task | null;
  stageModalOpen: boolean;
  stageToEdit: Stage | null;
  targetPipelineId: string;
  pipelineModalOpen: boolean;
  pipelineToEdit: Pipeline | null;
  archiveTaskModalOpen: boolean;
  archiveModalTask: ArchivedTask | null;
  userModalOpen: boolean;
  userToEdit: User | null;
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
  initialState,
  type State,
  type Action,
  type ModalDispatch,
};
