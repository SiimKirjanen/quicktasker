import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "@wordpress/element";
import { ArchivedTask } from "../types/task";
import { getArchivedTasksRequest } from "../api/api";
import { toast } from "react-toastify";
import { reducer } from "../reducers/archive-reducer";
import {
  REMOVE_ARCHIVED_TASK,
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_SEARCH_VALUE,
  SET_ARCHIVE_TASKS,
  SET_FULL_PAGE_LOADING,
} from "../constants";
import { LoadingContext } from "./LoadingContextProvider";

const initialState: State = {
  archivedTasks: null,
  archiveLoading: false,
  archiveSearchValue: "",
  archiveFilteredPipelineId: "",
};

type State = {
  archivedTasks: ArchivedTask[] | null;
  archiveLoading: boolean;
  archiveSearchValue: string;
  archiveFilteredPipelineId: string;
};

type Action =
  | { type: typeof SET_ARCHIVE_TASKS; payload: ArchivedTask[] }
  | { type: typeof SET_ARCHIVE_SEARCH_VALUE; payload: string }
  | { type: typeof SET_ARCHIVE_FILTERED_PIPELINE; payload: string }
  | { type: typeof REMOVE_ARCHIVED_TASK; payload: string };

type Dispatch = (action: Action) => void;

type ArchiveContextType = {
  state: State;
  archiveDispatch: Dispatch;
};

const ArchiveContext = createContext<ArchiveContextType>({
  state: initialState,
  archiveDispatch: () => {},
});

const ArchiveContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, archiveDispatch] = useReducer(reducer, initialState);
  const { loadingDispatch } = useContext(LoadingContext);

  useEffect(() => {
    fetchAndSetArchivedTasks();
  }, []);

  const fetchAndSetArchivedTasks = async () => {
    try {
      loadingDispatch({
        type: SET_FULL_PAGE_LOADING,
        payload: true,
      });
      const { data } = await getArchivedTasksRequest();

      archiveDispatch({ type: SET_ARCHIVE_TASKS, payload: data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch archived tasks");
    } finally {
      loadingDispatch({
        type: SET_FULL_PAGE_LOADING,
        payload: false,
      });
    }
  };

  return (
    <ArchiveContext.Provider value={{ state, archiveDispatch }}>
      {children}
    </ArchiveContext.Provider>
  );
};

export { ArchiveContextProvider, ArchiveContext, type State, type Action };
