import {
  ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
  ADD_LABEL_ARCHIVED_TASK,
  CHANGE_ARCHIVE_TASK_DONE_FILTER,
  CHANGE_ARCHIVED_TASK_DONE_STATUS,
  CHANGE_ARCHIVED_TASKS_LIMIT_FILTER,
  EDIT_ARCHIVED_TASK,
  REMOVE_ARCHIVED_TASK,
  REMOVE_ARCHIVED_TASKS,
  REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK,
  REMOVE_LABEL_ARCHIVED_TASK,
  SET_ARCHIVE_FILTER_ORDER,
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_LOADING,
  SET_ARCHIVE_SEARCH_VALUE,
  SET_ARCHIVE_TASKS,
} from "../constants";
import { Action, State } from "../providers/ArchiveContextProvider";
import {
  WPQTArchiveDoneFilter,
  WPQTArchiveOrder,
  WPQTArvhiveTaskLimit,
} from "../types/enums";
import { Task, TaskFromServer } from "../types/task";
import { UserTypes, type User, type WPUser } from "../types/user";
import { reducer } from "./archive-reducer";

const baseState: State = {
  archivedTasks: null,
  archiveLoading: false,
  archiveSearchValue: "",
  archiveFilteredPipelineId: "",
  archiveTaskDoneFilter: WPQTArchiveDoneFilter.All,
  archivedTaskLimit: WPQTArvhiveTaskLimit.ONE_HUNDRED,
  archiveFilterOrder: WPQTArchiveOrder.DESC,
};

const makeServerTask = (
  overrides: Partial<TaskFromServer> = {},
): TaskFromServer =>
  ({
    id: "t1",
    stage_id: "s1",
    task_order: "1",
    free_for_all: "0",
    is_archived: "1",
    is_done: "0",
    assigned_users: [],
    assigned_wp_users: [],
    assigned_labels: [],
    ...overrides,
  }) as unknown as TaskFromServer;

const makeTask = (overrides: Partial<Task> = {}): Task =>
  ({
    id: "t1",
    stage_id: "s1",
    task_order: 1,
    free_for_all: false,
    is_archived: true,
    is_done: false,
    assigned_users: [],
    assigned_wp_users: [],
    assigned_labels: [],
    ...overrides,
  }) as unknown as Task;

const makeUser = (id = "u1"): User =>
  ({ id, user_type: UserTypes.QUICKTASKER }) as unknown as User;
const makeWPUser = (id = "wp1"): WPUser =>
  ({ id, user_type: UserTypes.WP_USER }) as unknown as WPUser;

describe("archive reducer", () => {
  it("SET_ARCHIVE_TASKS converts server tasks", () => {
    const next = reducer(baseState, {
      type: SET_ARCHIVE_TASKS,
      payload: [makeServerTask({ id: "a", task_order: "3" })],
    });
    expect(next.archivedTasks?.[0].id).toBe("a");
    expect(next.archivedTasks?.[0].task_order).toBe(3);
  });

  it("SET_ARCHIVE_SEARCH_VALUE", () => {
    const next = reducer(baseState, {
      type: SET_ARCHIVE_SEARCH_VALUE,
      payload: "foo",
    });
    expect(next.archiveSearchValue).toBe("foo");
  });

  it("SET_ARCHIVE_FILTERED_PIPELINE", () => {
    const next = reducer(baseState, {
      type: SET_ARCHIVE_FILTERED_PIPELINE,
      payload: "p1",
    });
    expect(next.archiveFilteredPipelineId).toBe("p1");
  });

  it("REMOVE_ARCHIVED_TASK removes by id", () => {
    const state: State = {
      ...baseState,
      archivedTasks: [makeTask({ id: "a" }), makeTask({ id: "b" })],
    };
    const next = reducer(state, { type: REMOVE_ARCHIVED_TASK, payload: "a" });
    expect(next.archivedTasks?.map((t) => t.id)).toEqual(["b"]);
  });

  it("REMOVE_ARCHIVED_TASKS removes multiple", () => {
    const state: State = {
      ...baseState,
      archivedTasks: [
        makeTask({ id: "a" }),
        makeTask({ id: "b" }),
        makeTask({ id: "c" }),
      ],
    };
    const next = reducer(state, {
      type: REMOVE_ARCHIVED_TASKS,
      payload: ["a", "c"],
    });
    expect(next.archivedTasks?.map((t) => t.id)).toEqual(["b"]);
  });

  it("ADD_ASSIGNED_USER_TO_ARCHIVED_TASK adds qt user", () => {
    const state: State = {
      ...baseState,
      archivedTasks: [makeTask({ id: "a" })],
    };
    const u = makeUser("u-1");
    const next = reducer(state, {
      type: ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
      payload: { taskId: "a", user: u },
    });
    expect(next.archivedTasks?.[0].assigned_users).toEqual([u]);
  });

  it("ADD_ASSIGNED_USER_TO_ARCHIVED_TASK adds wp user", () => {
    const state: State = {
      ...baseState,
      archivedTasks: [makeTask({ id: "a" })],
    };
    const u = makeWPUser("wp-1");
    const next = reducer(state, {
      type: ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
      payload: { taskId: "a", user: u },
    });
    expect(next.archivedTasks?.[0].assigned_wp_users).toEqual([u]);
  });

  it("REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK removes qt user", () => {
    const u1 = makeUser("u-1");
    const u2 = makeUser("u-2");
    const state: State = {
      ...baseState,
      archivedTasks: [makeTask({ id: "a", assigned_users: [u1, u2] })],
    };
    const next = reducer(state, {
      type: REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK,
      payload: { taskId: "a", user: u1 },
    });
    expect(next.archivedTasks?.[0].assigned_users).toEqual([u2]);
  });

  it("CHANGE_ARCHIVED_TASK_DONE_STATUS toggles is_done on matching task", () => {
    const state: State = {
      ...baseState,
      archivedTasks: [makeTask({ id: "a" }), makeTask({ id: "b" })],
    };
    const next = reducer(state, {
      type: CHANGE_ARCHIVED_TASK_DONE_STATUS,
      payload: { taskId: "a", done: true },
    });
    expect(next.archivedTasks?.find((t) => t.id === "a")?.is_done).toBe(true);
    expect(next.archivedTasks?.find((t) => t.id === "b")?.is_done).toBe(false);
  });

  it("EDIT_ARCHIVED_TASK replaces matching task with converted version", () => {
    const state: State = {
      ...baseState,
      archivedTasks: [makeTask({ id: "a", task_order: 1 })],
    };
    const next = reducer(state, {
      type: EDIT_ARCHIVED_TASK,
      payload: makeServerTask({ id: "a", task_order: "9" }),
    });
    expect(next.archivedTasks?.[0].task_order).toBe(9);
  });

  it("CHANGE_ARCHIVE_TASK_DONE_FILTER", () => {
    const next = reducer(baseState, {
      type: CHANGE_ARCHIVE_TASK_DONE_FILTER,
      payload: WPQTArchiveDoneFilter.Completed,
    });
    expect(next.archiveTaskDoneFilter).toBe(WPQTArchiveDoneFilter.Completed);
  });

  it("ADD_LABEL_ARCHIVED_TASK appends label", () => {
    const state: State = {
      ...baseState,
      archivedTasks: [makeTask({ id: "a", assigned_labels: [] })],
    };
    const label = { id: "l1", name: "x", color: "#000" } as never;
    const next = reducer(state, {
      type: ADD_LABEL_ARCHIVED_TASK,
      payload: { taskId: "a", label },
    });
    expect(next.archivedTasks?.[0].assigned_labels).toEqual([label]);
  });

  it("REMOVE_LABEL_ARCHIVED_TASK removes by labelId", () => {
    const label = { id: "l1" } as never;
    const state: State = {
      ...baseState,
      archivedTasks: [makeTask({ id: "a", assigned_labels: [label] })],
    };
    const next = reducer(state, {
      type: REMOVE_LABEL_ARCHIVED_TASK,
      payload: { taskId: "a", labelId: "l1" },
    });
    expect(next.archivedTasks?.[0].assigned_labels).toEqual([]);
  });

  it("CHANGE_ARCHIVED_TASKS_LIMIT_FILTER", () => {
    const next = reducer(baseState, {
      type: CHANGE_ARCHIVED_TASKS_LIMIT_FILTER,
      payload: WPQTArvhiveTaskLimit.TWO_HUNDRED,
    });
    expect(next.archivedTaskLimit).toBe(WPQTArvhiveTaskLimit.TWO_HUNDRED);
  });

  it("SET_ARCHIVE_LOADING", () => {
    const next = reducer(baseState, {
      type: SET_ARCHIVE_LOADING,
      payload: true,
    });
    expect(next.archiveLoading).toBe(true);
  });

  it("SET_ARCHIVE_FILTER_ORDER", () => {
    const next = reducer(baseState, {
      type: SET_ARCHIVE_FILTER_ORDER,
      payload: WPQTArchiveOrder.ASC,
    });
    expect(next.archiveFilterOrder).toBe(WPQTArchiveOrder.ASC);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
