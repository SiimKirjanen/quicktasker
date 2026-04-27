import {
  ADD_ASSIGNED_USER_TO_USER_TASK,
  CHANGE_USER_TASK_DONE_STATUS,
  EDIT_USER_TASK,
  REMOVE_ASSIGNED_USER_FROM_USER_TASK,
  REMOVE_USER_TASK,
  SET_USER_TASKS,
  SET_USER_TASKS_FILTERED_PIPELINE,
  SET_USER_TASKS_SEARCH_VALUE,
} from "../constants";
import { Action, State } from "../providers/UserTasksContextProvider";
import { Task, TaskFromServer } from "../types/task";
import { UserTypes, type User, type WPUser } from "../types/user";
import { reducer } from "./user-tasks-reducer";

const baseState: State = { tasks: [], searchValue: "", filteredPipelineId: "" };

const makeServerTask = (overrides: Partial<TaskFromServer> = {}) =>
  ({
    id: "t1",
    task_order: "1",
    free_for_all: "0",
    is_archived: "0",
    is_done: "0",
    assigned_users: [],
    assigned_wp_users: [],
    ...overrides,
  }) as unknown as TaskFromServer;

const makeTask = (overrides: Partial<Task> = {}): Task =>
  ({
    id: "t1",
    task_order: 1,
    free_for_all: false,
    is_archived: false,
    is_done: false,
    assigned_users: [],
    assigned_wp_users: [],
    ...overrides,
  }) as unknown as Task;

const makeUser = (id = "u1"): User =>
  ({ id, user_type: UserTypes.QUICKTASKER }) as unknown as User;
const makeWPUser = (id = "wp1"): WPUser =>
  ({ id, user_type: UserTypes.WP_USER }) as unknown as WPUser;

describe("user-tasks reducer", () => {
  it("SET_USER_TASKS converts tasks", () => {
    const next = reducer(baseState, {
      type: SET_USER_TASKS,
      payload: [makeServerTask({ id: "a", task_order: "5" })],
    });
    expect(next.tasks[0].task_order).toBe(5);
  });

  it("REMOVE_USER_TASK", () => {
    const state: State = {
      ...baseState,
      tasks: [makeTask({ id: "a" }), makeTask({ id: "b" })],
    };
    const next = reducer(state, { type: REMOVE_USER_TASK, payload: "a" });
    expect(next.tasks.map((t) => t.id)).toEqual(["b"]);
  });

  it("EDIT_USER_TASK replaces converted task", () => {
    const state: State = {
      ...baseState,
      tasks: [makeTask({ id: "a", is_done: false })],
    };
    const next = reducer(state, {
      type: EDIT_USER_TASK,
      payload: makeServerTask({ id: "a", is_done: "1" }),
    });
    expect(next.tasks[0].is_done).toBe(true);
  });

  it("SET_USER_TASKS_SEARCH_VALUE", () => {
    const next = reducer(baseState, {
      type: SET_USER_TASKS_SEARCH_VALUE,
      payload: "x",
    });
    expect(next.searchValue).toBe("x");
  });

  it("SET_USER_TASKS_FILTERED_PIPELINE", () => {
    const next = reducer(baseState, {
      type: SET_USER_TASKS_FILTERED_PIPELINE,
      payload: "p1",
    });
    expect(next.filteredPipelineId).toBe("p1");
  });

  it("ADD_ASSIGNED_USER_TO_USER_TASK adds qt user", () => {
    const state: State = { ...baseState, tasks: [makeTask({ id: "a" })] };
    const u = makeUser();
    const next = reducer(state, {
      type: ADD_ASSIGNED_USER_TO_USER_TASK,
      payload: { taskId: "a", user: u },
    });
    expect(next.tasks[0].assigned_users).toEqual([u]);
  });

  it("ADD_ASSIGNED_USER_TO_USER_TASK adds wp user", () => {
    const state: State = { ...baseState, tasks: [makeTask({ id: "a" })] };
    const u = makeWPUser();
    const next = reducer(state, {
      type: ADD_ASSIGNED_USER_TO_USER_TASK,
      payload: { taskId: "a", user: u },
    });
    expect(next.tasks[0].assigned_wp_users).toEqual([u]);
  });

  it("REMOVE_ASSIGNED_USER_FROM_USER_TASK removes by id", () => {
    const u1 = makeUser("u-1");
    const u2 = makeUser("u-2");
    const state: State = {
      ...baseState,
      tasks: [makeTask({ id: "a", assigned_users: [u1, u2] })],
    };
    const next = reducer(state, {
      type: REMOVE_ASSIGNED_USER_FROM_USER_TASK,
      payload: { taskId: "a", user: u1 },
    });
    expect(next.tasks[0].assigned_users).toEqual([u2]);
  });

  it("CHANGE_USER_TASK_DONE_STATUS", () => {
    const state: State = { ...baseState, tasks: [makeTask({ id: "a" })] };
    const next = reducer(state, {
      type: CHANGE_USER_TASK_DONE_STATUS,
      payload: { taskId: "a", done: true },
    });
    expect(next.tasks[0].is_done).toBe(true);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
