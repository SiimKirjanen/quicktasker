import {
  EDIT_USER_TASK,
  REMOVE_USER_TASK,
  SET_USER_TASKS,
  SET_USER_TASKS_FILTERED_PIPELINE,
} from "../constants";
import { Action, State } from "../providers/UserTasksContextProvider";
import { TaskFromServer } from "../types/task";
import { convertTaskFromServer } from "../utils/task";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER_TASKS: {
      const payload: TaskFromServer[] = action.payload;
      const tasks = payload.map(convertTaskFromServer);

      return {
        ...state,
        tasks,
      };
    }
    case REMOVE_USER_TASK: {
      const taskId: string = action.payload;

      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== taskId),
      };
    }
    case EDIT_USER_TASK: {
      const task: TaskFromServer = action.payload;
      const updatedTasks = state.tasks.map((t) => {
        if (t.id === task.id) {
          return convertTaskFromServer(task);
        }
        return t;
      });

      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case SET_USER_TASKS_FILTERED_PIPELINE: {
      const filteredPipelineId = action.payload;

      return {
        ...state,
        filteredPipelineId,
      };
    }
    default:
      return state;
  }
};

export { reducer };
