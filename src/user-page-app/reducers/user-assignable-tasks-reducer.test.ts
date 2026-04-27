import { Task, TaskFromServer } from "../../types/task";
import {
  REMOVE_ASSIGNABLE_TASK,
  SET_ASSIGNABLE_TASKS,
  SET_ASSIGNABLE_TASKS_LOADING,
  SET_ASSIGNABLE_TASKS_SEARCH_TEXT,
} from "../constants";
import { Action, State } from "../providers/UserAssignableTasksContextProvider";
import { reducer } from "./user-assignable-tasks-reducer";

const baseState: State = { loading: true, assignableTasks: [], searchText: "" };

const makeServerTask = (id: string): TaskFromServer =>
  ({
    id,
    task_order: "1",
    free_for_all: "0",
    is_archived: "0",
    is_done: "0",
    assigned_users: [],
  }) as unknown as TaskFromServer;

const makeTask = (id: string): Task =>
  ({ id, task_order: 1, assigned_users: [] }) as unknown as Task;

describe("user-assignable-tasks reducer", () => {
  it("SET_ASSIGNABLE_TASKS_LOADING", () => {
    const next = reducer(baseState, {
      type: SET_ASSIGNABLE_TASKS_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("SET_ASSIGNABLE_TASKS converts tasks", () => {
    const next = reducer(baseState, {
      type: SET_ASSIGNABLE_TASKS,
      payload: [makeServerTask("a")],
    });
    expect(next.assignableTasks[0].id).toBe("a");
  });

  it("REMOVE_ASSIGNABLE_TASK", () => {
    const state: State = {
      ...baseState,
      assignableTasks: [makeTask("a"), makeTask("b")],
    };
    const next = reducer(state, {
      type: REMOVE_ASSIGNABLE_TASK,
      payload: "a",
    });
    expect(next.assignableTasks.map((t) => t.id)).toEqual(["b"]);
  });

  it("SET_ASSIGNABLE_TASKS_SEARCH_TEXT", () => {
    const next = reducer(baseState, {
      type: SET_ASSIGNABLE_TASKS_SEARCH_TEXT,
      payload: "x",
    });
    expect(next.searchText).toBe("x");
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
