import { TaskFromServer } from "../../types/task";
import {
  SET_ASSIGNED_TASKS,
  SET_ASSIGNED_TASKS_LOADING,
  SET_ASSIGNED_TASKS_SEARCH_TEXT,
} from "../constants";
import { Action, State } from "../providers/UserAssignedTasksContextProvider";
import { reducer } from "./user-assigned-tasks-reducer";

const baseState: State = { loading: true, assignedTasks: [], searchText: "" };

const makeServerTask = (id: string): TaskFromServer =>
  ({
    id,
    task_order: "1",
    free_for_all: "0",
    is_archived: "0",
    is_done: "0",
    assigned_users: [],
  }) as unknown as TaskFromServer;

describe("user-assigned-tasks reducer", () => {
  it("SET_ASSIGNED_TASKS converts tasks and clears loading", () => {
    const next = reducer(baseState, {
      type: SET_ASSIGNED_TASKS,
      payload: [makeServerTask("a")],
    });
    expect(next.assignedTasks[0].id).toBe("a");
    expect(next.loading).toBe(false);
  });

  it("SET_ASSIGNED_TASKS_LOADING", () => {
    const next = reducer(baseState, {
      type: SET_ASSIGNED_TASKS_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("SET_ASSIGNED_TASKS_SEARCH_TEXT", () => {
    const next = reducer(baseState, {
      type: SET_ASSIGNED_TASKS_SEARCH_TEXT,
      payload: "x",
    });
    expect(next.searchText).toBe("x");
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
