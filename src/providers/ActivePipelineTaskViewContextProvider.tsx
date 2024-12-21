import { createContext, useReducer } from "@wordpress/element";
import { SET_STAGE_FILTER, SET_USER_FILTER } from "../constants";

import { activePipelineTaskViewReducer } from "../reducers/active-pipeline-task-view-reducer";
import { UserFilter } from "../types/user";

type State = {
  stageIdFilter: string;
  userFilter: UserFilter;
};

const initialState: State = {
  stageIdFilter: "",
  userFilter: {
    id: null,
    type: null,
  },
};

type Action =
  | { type: typeof SET_STAGE_FILTER; payload: string }
  | { type: typeof SET_USER_FILTER; payload: UserFilter };

type Dispatch = (action: Action) => void;

type TaskViewContextType = {
  state: State;
  taskViewDispatch: Dispatch;
};

const ActivePipelineTaskViewContext = createContext<TaskViewContextType>({
  state: initialState,
  taskViewDispatch: () => {},
});

const ActivePipelineTaskViewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, taskViewDispatch] = useReducer(
    activePipelineTaskViewReducer,
    initialState,
  );

  return (
    <ActivePipelineTaskViewContext.Provider value={{ state, taskViewDispatch }}>
      {children}
    </ActivePipelineTaskViewContext.Provider>
  );
};

export {
  ActivePipelineTaskViewContext,
  ActivePipelineTaskViewContextProvider,
  type Action,
  type State,
};
