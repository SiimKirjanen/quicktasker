import {
  CLOSE_ARCHIVE_TASK_MODAL,
  OPEN_ARCHIVE_TASK_MODAL,
  SET_ARCHIVE_TASKS,
} from "../constants";
import { Action, State } from "../providers/ArchiveContextProvider";
import { ArchivedTask, ArchivedTaskFromServer } from "../types/task";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_ARCHIVE_TASKS: {
      const archivedTasks: ArchivedTaskFromServer[] = action.payload;

      return {
        ...state,
        archivedTasks,
      };
    }
    case OPEN_ARCHIVE_TASK_MODAL: {
      const archiveTask: ArchivedTask = action.payload;

      return {
        ...state,
        archiveModalOpen: true,
        archiveModalTask: archiveTask,
      };
    }
    case CLOSE_ARCHIVE_TASK_MODAL: {
      return {
        ...state,
        archiveModalOpen: false,
        archiveModalTask: null,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
