import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "@wordpress/element";
import { Task } from "../../types/task";
import { reducer } from "../reducers/user-page-task-reducer";
import { UserPageAppContext } from "./UserPageAppContextProvider";
import { getTaskDataRequest } from "../api/user-page-api";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { Stage } from "../../types/stage";
import {
  SET_USER_PAGE_TASK_DATA,
  SET_USER_PAGE_TASK_LOADING,
} from "../constants";

const initialState: State = {
  task: null,
  taskStages: [],
  loading: true,
};

type State = {
  task: Task | null;
  taskStages: Stage[];
  loading: boolean;
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type UserPageTaskContextType = {
  state: State;
  userTaskDispatch: Dispatch;
  loadTask: () => void;
};

const UserPageTaskContext = createContext<UserPageTaskContextType>({
  state: initialState,
  userTaskDispatch: () => {},
  loadTask: () => {},
});

const UserPageTaskContextProvider = ({
  children,
  taskHash,
}: {
  children: React.ReactNode;
  taskHash: string | undefined;
}) => {
  const [state, userTaskDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    if (taskHash) {
      try {
        userTaskDispatch({ type: SET_USER_PAGE_TASK_LOADING, payload: true });
        const response = await getTaskDataRequest(pageHash, taskHash);
        userTaskDispatch({
          type: SET_USER_PAGE_TASK_DATA,
          payload: {
            task: response.data.task,
            stages: response.data.stages,
          },
        });
      } catch (error) {
        handleError(error);
      } finally {
        userTaskDispatch({ type: SET_USER_PAGE_TASK_LOADING, payload: false });
      }
    }
  };

  return (
    <UserPageTaskContext.Provider value={{ state, userTaskDispatch, loadTask }}>
      {children}
    </UserPageTaskContext.Provider>
  );
};

export {
  UserPageTaskContextProvider,
  UserPageTaskContext,
  type State,
  type Action,
};
