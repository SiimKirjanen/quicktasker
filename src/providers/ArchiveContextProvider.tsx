import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getArchivedTasksRequest } from "../api/api";
import {
  REMOVE_ARCHIVED_TASK,
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_SEARCH_VALUE,
  SET_ARCHIVE_TASKS,
  SET_FULL_PAGE_LOADING,
} from "../constants";
import { reducer } from "../reducers/archive-reducer";
import { ArchivedTask } from "../types/task";
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
      toast.error(__("Failed to fetch archived tasks", "quicktasker"));
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

export { ArchiveContext, ArchiveContextProvider, type Action, type State };
