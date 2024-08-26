import { SET_ARCHIVE_TASKS } from "../constants";
import { Action, State } from "../providers/ArchiveContextProvider";
import { ArchivedTaskFromServer, Task } from "../types/task";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_ARCHIVE_TASKS: {
      const archivedTasks: ArchivedTaskFromServer[] = action.payload;

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
