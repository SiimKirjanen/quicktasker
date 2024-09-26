import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "@wordpress/element";
import { getUserTasksRequest } from "../api/api";
import { toast } from "react-toastify";
import { Task } from "../types/task";
import { reducer } from "../reducers/user-tasks-reducer";
import { SET_FULL_PAGE_LOADING, SET_USER_TASKS } from "../constants";
import { LoadingContext } from "./LoadingContextProvider";

const initialState: State = {
  tasks: [],
  searchValue: "",
};

type State = {
  tasks: Task[];
  searchValue: string;
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type UserTasksContextType = {
  state: State;
  userTasksDispatch: Dispatch;
  fetchAndSetUserTasks: () => Promise<void>;
};

const UserTasksContext = createContext<UserTasksContextType>({
  state: initialState,
  userTasksDispatch: () => {},
  fetchAndSetUserTasks: async () => {},
});

const UserTasksContextProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const [state, userTasksDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );
  const { loadingDispatch } = useContext(LoadingContext);

  useEffect(() => {
    fetchAndSetUserTasks();
  }, []);

  const fetchAndSetUserTasks = async () => {
    try {
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: true });
      const response = await getUserTasksRequest(userId);
      userTasksDispatch({ type: SET_USER_TASKS, payload: response.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: false });
    }
  };

  return (
    <UserTasksContext.Provider
      value={{ state, userTasksDispatch, fetchAndSetUserTasks }}
    >
      {children}
    </UserTasksContext.Provider>
  );
};

export { UserTasksContextProvider, UserTasksContext, type State, type Action };
