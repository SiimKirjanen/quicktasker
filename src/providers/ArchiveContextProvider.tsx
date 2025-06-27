import { createContext, useEffect, useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getArchivedTasksRequest } from "../api/api";
import {
  ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
  ADD_LABEL_ARCHIVED_TASK,
  CHANGE_ARCHIVE_TASK_DONE_FILTER,
  CHANGE_ARCHIVED_TASK_DONE_STATUS,
  CHANGE_ARCHIVED_TASKS_LIMIT_FILTER,
  EDIT_ARCHIVED_TASK,
  REMOVE_ARCHIVED_TASK,
  REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK,
  REMOVE_LABEL_ARCHIVED_TASK,
  SET_ARCHIVE_FILTER_ORDER,
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_LOADING,
  SET_ARCHIVE_SEARCH_VALUE,
  SET_ARCHIVE_TASKS,
} from "../constants";
import { reducer } from "../reducers/archive-reducer";
import {
  WPQTArchiveDoneFilter,
  WPQTArchiveOrder,
  WPQTArvhiveTaskLimit,
} from "../types/enums";
import { Label } from "../types/label";
import { Task, TaskFromServer } from "../types/task";
import { User, WPUser } from "../types/user";

const initialState: State = {
  archivedTasks: null,
  archiveLoading: false,
  archiveSearchValue: "",
  archiveFilteredPipelineId: "",
  archiveTaskDoneFilter: WPQTArchiveDoneFilter.All,
  archivedTaskLimit: WPQTArvhiveTaskLimit.ONE_HUNDRED,
  archiveFilterOrder: WPQTArchiveOrder.DESC,
};

type State = {
  archivedTasks: Task[] | null;
  archiveLoading: boolean;
  archiveSearchValue: string;
  archiveFilteredPipelineId: string;
  archiveTaskDoneFilter: WPQTArchiveDoneFilter;
  archivedTaskLimit: WPQTArvhiveTaskLimit;
  archiveFilterOrder: WPQTArchiveOrder;
};

type Action =
  | { type: typeof SET_ARCHIVE_TASKS; payload: TaskFromServer[] }
  | { type: typeof SET_ARCHIVE_SEARCH_VALUE; payload: string }
  | { type: typeof SET_ARCHIVE_FILTERED_PIPELINE; payload: string }
  | {
      type: typeof ADD_ASSIGNED_USER_TO_ARCHIVED_TASK;
      payload: { taskId: string; user: User | WPUser };
    }
  | {
      type: typeof REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK;
      payload: { taskId: string; user: User | WPUser };
    }
  | { type: typeof REMOVE_ARCHIVED_TASK; payload: string }
  | { type: typeof EDIT_ARCHIVED_TASK; payload: TaskFromServer }
  | {
      type: typeof CHANGE_ARCHIVE_TASK_DONE_FILTER;
      payload: WPQTArchiveDoneFilter;
    }
  | {
      type: typeof ADD_LABEL_ARCHIVED_TASK;
      payload: { taskId: string; label: Label };
    }
  | {
      type: typeof REMOVE_LABEL_ARCHIVED_TASK;
      payload: { taskId: string; labelId: string };
    }
  | {
      type: typeof CHANGE_ARCHIVED_TASK_DONE_STATUS;
      payload: { taskId: string; done: boolean };
    }
  | {
      type: typeof SET_ARCHIVE_LOADING;
      payload: boolean;
    }
  | {
      type: typeof SET_ARCHIVE_FILTER_ORDER;
      payload: WPQTArchiveOrder;
    }
  | {
      type: typeof CHANGE_ARCHIVED_TASKS_LIMIT_FILTER;
      payload: WPQTArvhiveTaskLimit;
    };

type Dispatch = (action: Action) => void;

type ArchiveContextType = {
  state: State;
  archiveDispatch: Dispatch;
  fetchAndSetArchivedTasks: () => Promise<void>;
};

const ArchiveContext = createContext<ArchiveContextType>({
  state: initialState,
  archiveDispatch: () => {},
  fetchAndSetArchivedTasks: async () => {},
});

const ArchiveContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, archiveDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchAndSetArchivedTasks();
  }, []);

  const fetchAndSetArchivedTasks = async () => {
    try {
      archiveDispatch({ type: SET_ARCHIVE_LOADING, payload: true });
      const { data } = await getArchivedTasksRequest({
        search: state.archiveSearchValue,
        pipelineId: state.archiveFilteredPipelineId,
        doneFilter: state.archiveTaskDoneFilter,
        limit: state.archivedTaskLimit,
        order: state.archiveFilterOrder,
      });

      archiveDispatch({ type: SET_ARCHIVE_TASKS, payload: data });
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to fetch archived tasks", "quicktasker"));
    } finally {
      archiveDispatch({ type: SET_ARCHIVE_LOADING, payload: false });
    }
  };

  return (
    <ArchiveContext.Provider
      value={{ state, archiveDispatch, fetchAndSetArchivedTasks }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export { ArchiveContext, ArchiveContextProvider, type Action, type State };
