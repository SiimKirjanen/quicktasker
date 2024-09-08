import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "@wordpress/element";
import { Task } from "../../types/task";
import { reducer } from "../reducers/user-assigned-tasks-reducer";
import { getAssignedTasksRequest } from "../api/user-page-api";
import { UserPageAppContext } from "./UserPageAppContextProvider";
import { SET_ASSIGNED_TASKS, SET_ASSIGNED_TASKS_LOADING } from "../constants";

const initialState: State = {
  loading: true,
  assignedTasks: [],
};

type State = {
  loading: boolean;
  assignedTasks: Task[];
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type UserAssignedTasksContextType = {
  state: State;
  userAssignedTasksDispatch: Dispatch;
  loadAssignedTasks: () => void;
};

const UserAssignedTasksContext = createContext<UserAssignedTasksContextType>({
  state: initialState,
  userAssignedTasksDispatch: () => {},
  loadAssignedTasks: () => {},
});

const UserAssignedTasksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, userAssignedTasksDispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);

  useEffect(() => {
    loadAssignedTasks();
  }, [pageHash]);

  const loadAssignedTasks = async () => {
    try {
      userAssignedTasksDispatch({
        type: SET_ASSIGNED_TASKS_LOADING,
        payload: true,
      });
      const response = await getAssignedTasksRequest(pageHash);

      userAssignedTasksDispatch({
        type: SET_ASSIGNED_TASKS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      userAssignedTasksDispatch({
        type: SET_ASSIGNED_TASKS_LOADING,
        payload: false,
      });
    }
  };

  return (
    <UserAssignedTasksContext.Provider
      value={{ state, userAssignedTasksDispatch, loadAssignedTasks }}
    >
      {children}
    </UserAssignedTasksContext.Provider>
  );
};

export {
  UserAssignedTasksContextProvider,
  UserAssignedTasksContext,
  type State,
  type Action,
};
