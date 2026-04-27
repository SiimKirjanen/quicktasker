import { Task, TaskFromServer } from "../../types/task";
import {
  SET_USER_PAGE_TASK_DATA,
  SET_USER_PAGE_TASK_LOADING,
  UPDATE_USER_PAGE_TASK_DATA,
  UPDATE_USER_PAGE_TASK_DONE,
  UPDATE_USER_PAGE_TASK_STAGE,
} from "../constants";
import { Action, State } from "../providers/UserPageTaskContextProvider";
import { reducer } from "./user-page-task-reducer";

const baseState: State = {
  task: null,
  taskStages: [],
  customFields: [],
  pipelineSettings: { allow_only_last_stage_task_done: false },
  loading: true,
};

const makeServerTask = (id: string): TaskFromServer =>
  ({
    id,
    task_order: "1",
    free_for_all: "0",
    is_archived: "0",
    is_done: "0",
    assigned_users: [],
  }) as unknown as TaskFromServer;

const makeTask = (overrides: Partial<Task> = {}): Task =>
  ({
    id: "t1",
    task_order: 1,
    is_done: false,
    stage_id: "s1",
    assigned_users: [],
    ...overrides,
  }) as unknown as Task;

describe("user-page-task reducer", () => {
  it("SET_USER_PAGE_TASK_DATA converts task/stages/settings", () => {
    const next = reducer(baseState, {
      type: SET_USER_PAGE_TASK_DATA,
      payload: {
        task: makeServerTask("a"),
        stages: [],
        customFields: [],
        pipelineSettings: {
          allow_only_last_stage_task_done: "1",
        },
      } as never,
    });
    expect(next.task?.id).toBe("a");
    expect(next.pipelineSettings.allow_only_last_stage_task_done).toBe(true);
  });

  it("UPDATE_USER_PAGE_TASK_DATA re-converts task", () => {
    const next = reducer(baseState, {
      type: UPDATE_USER_PAGE_TASK_DATA,
      payload: makeServerTask("b"),
    });
    expect(next.task?.id).toBe("b");
  });

  it("SET_USER_PAGE_TASK_LOADING", () => {
    const next = reducer(baseState, {
      type: SET_USER_PAGE_TASK_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("UPDATE_USER_PAGE_TASK_STAGE updates stage_id when task exists", () => {
    const state: State = { ...baseState, task: makeTask({ stage_id: "s1" }) };
    const next = reducer(state, {
      type: UPDATE_USER_PAGE_TASK_STAGE,
      payload: "s2",
    });
    expect(next.task?.stage_id).toBe("s2");
  });

  it("UPDATE_USER_PAGE_TASK_STAGE no-op when task null", () => {
    const next = reducer(baseState, {
      type: UPDATE_USER_PAGE_TASK_STAGE,
      payload: "s2",
    });
    expect(next.task).toBeNull();
  });

  it("UPDATE_USER_PAGE_TASK_DONE updates is_done when task exists", () => {
    const state: State = { ...baseState, task: makeTask({ is_done: false }) };
    const next = reducer(state, {
      type: UPDATE_USER_PAGE_TASK_DONE,
      payload: { done: true },
    });
    expect(next.task?.is_done).toBe(true);
  });

  it("UPDATE_USER_PAGE_TASK_DONE no-op when task null", () => {
    const next = reducer(baseState, {
      type: UPDATE_USER_PAGE_TASK_DONE,
      payload: { done: true },
    });
    expect(next.task).toBeNull();
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
