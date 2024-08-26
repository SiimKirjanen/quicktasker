import { createContext, useEffect, useReducer } from "@wordpress/element";
import { ArchivedTask } from "../types/task";
import { getArchivedTasksRequest } from "../api/api";
import { toast } from "react-toastify";
import { reducer } from "../reducers/archive-reducer";
import { SET_ARCHIVE_TASKS } from "../constants";

const initialState = {
  archivedTasks: null,
  archiveLoading: false,
};

type State = {
  archivedTasks: ArchivedTask[] | null;
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type ArchiveContextType = {
  state: State;
  dispatch: Dispatch;
};

const ArchiveContext = createContext<ArchiveContextType>({
  state: initialState,
  dispatch: () => {},
});

const ArchiveContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchAndSetArchivedTasks();
  }, []);

  const fetchAndSetArchivedTasks = async () => {
    try {
      const { data } = await getArchivedTasksRequest();

      dispatch({ type: SET_ARCHIVE_TASKS, payload: data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch archived tasks");
    }
  };

  return (
    <ArchiveContext.Provider value={{ state, dispatch }}>
      {children}
    </ArchiveContext.Provider>
  );
};

export { ArchiveContextProvider, ArchiveContext, type State, type Action };
