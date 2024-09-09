import {
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_SEARCH_VALUE,
  SET_ARCHIVE_TASKS,
} from "../constants";
import { Action, State } from "../providers/ArchiveContextProvider";
import { ArchivedTaskFromServer } from "../types/task";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_ARCHIVE_TASKS: {
      const archivedTasks: ArchivedTaskFromServer[] = action.payload;

      return {
        ...state,
        archivedTasks,
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
    default: {
      return state;
    }
  }
};

export { reducer };
