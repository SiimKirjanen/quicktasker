import {
  REMOVE_ARCHIVED_TASK,
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_SEARCH_VALUE,
  SET_ARCHIVE_TASKS,
} from "../constants";
import { Action, State } from "../providers/ArchiveContextProvider";
import { TaskFromServer } from "../types/task";
import { convertTaskFromServer } from "../utils/task";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_ARCHIVE_TASKS: {
      const archivedTasks: TaskFromServer[] = action.payload;

      return {
        ...state,
        archivedTasks: archivedTasks.map(convertTaskFromServer),
      };
    }
    case SET_ARCHIVE_SEARCH_VALUE: {
      const archiveSearchValue: string = action.payload;

      return {
        ...state,
        archiveSearchValue,
      };
    }
    case SET_ARCHIVE_FILTERED_PIPELINE: {
      const archiveFilteredPipelineId: string = action.payload;

      return {
        ...state,
        archiveFilteredPipelineId,
      };
    }
    case REMOVE_ARCHIVED_TASK: {
      const archivedTasks = (state.archivedTasks ?? []).filter(
        (task) => task.id !== action.payload,
      );

      return {
        ...state,
        archivedTasks,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
