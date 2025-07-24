import { Task } from "../../types/task";
import { convertTaskFromServer } from "../../utils/task";
import {
  SET_ASSIGNED_TASKS,
  SET_ASSIGNED_TASKS_LOADING,
  SET_ASSIGNED_TASKS_SEARCH_TEXT,
} from "../constants";
import { Action, State } from "../providers/UserAssignedTasksContextProvider";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_ASSIGNED_TASKS: {
      const assignedTasks: Task[] = action.payload.map(convertTaskFromServer);

      return {
        ...state,
        assignedTasks,
        loading: false,
      };
    }
    case SET_ASSIGNED_TASKS_LOADING: {
      const loading: boolean = action.payload;

      return {
        ...state,
        loading,
      };
    }
    case SET_ASSIGNED_TASKS_SEARCH_TEXT: {
      const searchText: string = action.payload;

      return {
        ...state,
        searchText,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
