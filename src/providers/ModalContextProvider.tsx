import { createContext, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/modal-reducer";
import { ArchivedTask, Task } from "../types/task";
import { Stage } from "../types/stage";
import { Pipeline } from "../types/pipeline";
import { User } from "../types/user";
import {
  OPEN_EDIT_TASK_MODAL,
  CLOSE_TASK_MODAL,
  ADD_ASSIGNED_USER_TO_EDITING_TASK,
  REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
  OPEN_NEW_STAGE_MODAL,
  OPEN_STAGE_EDIT_MODAL,
  CLOSE_STAGE_MODAL,
  OPEN_NEW_PIPELINE_MODAL,
  OPEN_EDIT_PIPELINE_MODAL,
  CLOSE_PIPELINE_MODAL,
  OPEN_ARCHIVE_TASK_MODAL,
  CLOSE_ARCHIVE_TASK_MODAL,
  OPEN_NEW_USER_MODAL,
  OPEN_EDIT_USER_MODAL,
  CLOSE_USER_MODAL,
} from "../constants";

const initialState: State = {
  taskModalOpen: false,
  targetStageId: "",
  taskToEdit: null,
  stageModalOpen: false,
  stageToEdit: null,
  targetPipelineId: "",
  pipelineModalOpen: false,
  newPipelineModalOpen: false,
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
  newPipelineModalOpen: boolean;
  pipelineToEdit: Pipeline | null;
  archiveTaskModalOpen: boolean;
  archiveModalTask: ArchivedTask | null;
  userModalOpen: boolean;
  userToEdit: User | null;
};

type Action =
  | { type: typeof OPEN_EDIT_TASK_MODAL; payload: { taskToEdit: Task } }
  | { type: typeof CLOSE_TASK_MODAL }
  | { type: typeof ADD_ASSIGNED_USER_TO_EDITING_TASK; payload: User }
  | { type: typeof REMOVE_ASSIGNED_USER_FROM_EDITING_TASK; payload: User }
  | { type: typeof OPEN_NEW_STAGE_MODAL; payload: { targetPipelineId: string } }
  | { type: typeof OPEN_STAGE_EDIT_MODAL; payload: { stageToEdit: Stage } }
  | { type: typeof CLOSE_STAGE_MODAL }
  | { type: typeof OPEN_NEW_PIPELINE_MODAL }
  | {
      type: typeof OPEN_EDIT_PIPELINE_MODAL;
      payload: { pipelineToEdit: Pipeline };
    }
  | { type: typeof CLOSE_PIPELINE_MODAL }
  | { type: typeof OPEN_ARCHIVE_TASK_MODAL; payload: ArchivedTask }
  | { type: typeof CLOSE_ARCHIVE_TASK_MODAL }
  | { type: typeof OPEN_NEW_USER_MODAL }
  | { type: typeof OPEN_EDIT_USER_MODAL; payload: User }
  | { type: typeof CLOSE_USER_MODAL };

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
