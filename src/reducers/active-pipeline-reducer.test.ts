import {
  PIPELINE_ADD_LABEL_TO_TASK,
  PIPELINE_ADD_STAGE,
  PIPELINE_ADD_TASK,
  PIPELINE_ADD_USER_TO_TASK,
  PIPELINE_CHANGE_TASK_DONE_STATUS,
  PIPELINE_DELETE_STAGE,
  PIPELINE_EDIT_LABEL,
  PIPELINE_EDIT_PIPELINE,
  PIPELINE_EDIT_SETTINGS,
  PIPELINE_EDIT_STAGE,
  PIPELINE_EDIT_TASK,
  PIPELINE_MOVE_TASK,
  PIPELINE_REMOVE_ACTIVE_PIPELINE,
  PIPELINE_REMOVE_LABEL,
  PIPELINE_REMOVE_LABEL_FROM_TASK,
  PIPELINE_REMOVE_TASK,
  PIPELINE_REMOVE_USER_FROM_TASK,
  PIPELINE_REORDER_TASK,
  PIPELINE_SET_LOADING,
  PIPELINE_SET_PIPELINE,
  PIPELINE_SET_TASK_FOCUS_COLOR,
  PIPELINE_TOGGLE_VIEW,
} from "../constants";
import { Action, State } from "../providers/ActivePipelineContextProvider";
import { Pipeline, PipelineFromServer } from "../types/pipeline";
import { Stage } from "../types/stage";
import { Task } from "../types/task";
import { UserTypes, type User, type WPUser } from "../types/user";
import { activePipelineReducer as reducer } from "./active-pipeline-reducer";

const makeUser = (id = "u1"): User =>
  ({ id, user_type: UserTypes.QUICKTASKER }) as unknown as User;
const makeWPUser = (id = "wp1"): WPUser =>
  ({ id, user_type: UserTypes.WP_USER }) as unknown as WPUser;

const makeTask = (overrides: Partial<Task> = {}): Task =>
  ({
    id: "t1",
    stage_id: "s1",
    task_order: 1,
    is_done: false,
    assigned_users: [],
    assigned_wp_users: [],
    assigned_labels: [],
    ...overrides,
  }) as unknown as Task;

const makeStage = (overrides: Partial<Stage> = {}): Stage =>
  ({
    id: "s1",
    name: "Stage",
    description: "",
    tasks: [],
    ...overrides,
  }) as unknown as Stage;

const makePipeline = (stages: Stage[] = []): Pipeline =>
  ({
    id: "p1",
    name: "Pipeline",
    description: "",
    is_primary: false,
    stages,
    settings: { pipeline_refresh_interval: 0 },
  }) as unknown as Pipeline;

const stateWith = (stages: Stage[]): State =>
  ({
    activePipeline: makePipeline(stages),
    loading: false,
    view: "BOARD",
  }) as unknown as State;

describe("active-pipeline reducer", () => {
  it("PIPELINE_SET_LOADING", () => {
    const state = { activePipeline: null, loading: false } as State;
    const next = reducer(state, { type: PIPELINE_SET_LOADING, payload: true });
    expect(next.loading).toBe(true);
  });

  it("PIPELINE_SET_PIPELINE converts is_primary string", () => {
    const state = { activePipeline: null, loading: false } as State;
    const payload = {
      id: "p1",
      name: "P",
      stages: [],
      is_primary: "1",
    } as unknown as PipelineFromServer;
    const next = reducer(state, { type: PIPELINE_SET_PIPELINE, payload });
    expect(next.activePipeline?.is_primary).toBe(true);
  });

  it("PIPELINE_EDIT_SETTINGS merges settings", () => {
    const state = stateWith([]);
    const next = reducer(state, {
      type: PIPELINE_EDIT_SETTINGS,
      payload: { pipeline_refresh_interval: 99 } as never,
    });
    expect(next.activePipeline?.settings?.pipeline_refresh_interval).toBe(99);
  });

  it("PIPELINE_EDIT_SETTINGS no-op when no pipeline", () => {
    const state = { activePipeline: null, loading: false } as State;
    const next = reducer(state, {
      type: PIPELINE_EDIT_SETTINGS,
      payload: { pipeline_refresh_interval: 99 } as never,
    });
    expect(next).toBe(state);
  });

  it("PIPELINE_ADD_TASK adds task to matching stage", () => {
    const state = stateWith([makeStage({ id: "s1", tasks: [] })]);
    const serverTask = {
      id: "t1",
      stage_id: "s1",
      task_order: "1",
      free_for_all: "0",
      is_archived: "0",
      is_done: "0",
      assigned_users: [],
    };
    const next = reducer(state, {
      type: PIPELINE_ADD_TASK,
      payload: serverTask as never,
    });
    expect(next.activePipeline?.stages?.[0].tasks).toHaveLength(1);
    expect(next.activePipeline?.stages?.[0].tasks?.[0].id).toBe("t1");
  });

  it("PIPELINE_EDIT_TASK replaces matching task", () => {
    const state = stateWith([
      makeStage({ id: "s1", tasks: [makeTask({ id: "t1", is_done: false })] }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_EDIT_TASK,
      payload: {
        id: "t1",
        stage_id: "s1",
        task_order: "1",
        free_for_all: "0",
        is_archived: "0",
        is_done: "1",
        assigned_users: [],
      } as never,
    });
    expect(next.activePipeline?.stages?.[0].tasks?.[0].is_done).toBe(true);
  });

  it("PIPELINE_ADD_STAGE appends stage", () => {
    const state = stateWith([makeStage({ id: "s1" })]);
    const next = reducer(state, {
      type: PIPELINE_ADD_STAGE,
      payload: { stage: makeStage({ id: "s2", name: "Done" }) },
    });
    expect(next.activePipeline?.stages?.map((s) => s.id)).toEqual(["s1", "s2"]);
  });

  it("PIPELINE_EDIT_STAGE updates name & description", () => {
    const state = stateWith([
      makeStage({ id: "s1", name: "Old", description: "x" }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_EDIT_STAGE,
      payload: makeStage({ id: "s1", name: "New", description: "y" }),
    });
    expect(next.activePipeline?.stages?.[0].name).toBe("New");
    expect(next.activePipeline?.stages?.[0].description).toBe("y");
  });

  it("PIPELINE_DELETE_STAGE removes by id", () => {
    const state = stateWith([makeStage({ id: "s1" }), makeStage({ id: "s2" })]);
    const next = reducer(state, {
      type: PIPELINE_DELETE_STAGE,
      payload: "s1",
    });
    expect(next.activePipeline?.stages?.map((s) => s.id)).toEqual(["s2"]);
  });

  it("PIPELINE_ADD_USER_TO_TASK adds qt user", () => {
    const state = stateWith([
      makeStage({ id: "s1", tasks: [makeTask({ id: "t1" })] }),
    ]);
    const u = makeUser();
    const next = reducer(state, {
      type: PIPELINE_ADD_USER_TO_TASK,
      payload: { taskId: "t1", user: u },
    });
    expect(next.activePipeline?.stages?.[0].tasks?.[0].assigned_users).toEqual([
      u,
    ]);
  });

  it("PIPELINE_ADD_USER_TO_TASK adds wp user", () => {
    const state = stateWith([
      makeStage({ id: "s1", tasks: [makeTask({ id: "t1" })] }),
    ]);
    const u = makeWPUser();
    const next = reducer(state, {
      type: PIPELINE_ADD_USER_TO_TASK,
      payload: { taskId: "t1", user: u },
    });
    expect(
      next.activePipeline?.stages?.[0].tasks?.[0].assigned_wp_users,
    ).toEqual([u]);
  });

  it("PIPELINE_REMOVE_USER_FROM_TASK removes qt user", () => {
    const u1 = makeUser("u-1");
    const u2 = makeUser("u-2");
    const state = stateWith([
      makeStage({
        id: "s1",
        tasks: [makeTask({ id: "t1", assigned_users: [u1, u2] })],
      }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_REMOVE_USER_FROM_TASK,
      payload: { taskId: "t1", userId: "u-1", userType: UserTypes.QUICKTASKER },
    });
    expect(
      next.activePipeline?.stages?.[0].tasks?.[0].assigned_users?.map(
        (u) => u.id,
      ),
    ).toEqual(["u-2"]);
  });

  it("PIPELINE_EDIT_PIPELINE updates name/description/is_primary", () => {
    const state = stateWith([]);
    const next = reducer(state, {
      type: PIPELINE_EDIT_PIPELINE,
      payload: {
        id: "p1",
        name: "Renamed",
        description: "y",
        is_primary: "1",
      } as never,
    });
    expect(next.activePipeline?.name).toBe("Renamed");
    expect(next.activePipeline?.is_primary).toBe(true);
  });

  it("PIPELINE_CHANGE_TASK_DONE_STATUS toggles task is_done", () => {
    const state = stateWith([
      makeStage({ id: "s1", tasks: [makeTask({ id: "t1" })] }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_CHANGE_TASK_DONE_STATUS,
      payload: { taskId: "t1", done: true },
    });
    expect(next.activePipeline?.stages?.[0].tasks?.[0].is_done).toBe(true);
  });

  it("PIPELINE_REMOVE_ACTIVE_PIPELINE clears pipeline", () => {
    const state = stateWith([]);
    const next = reducer(state, { type: PIPELINE_REMOVE_ACTIVE_PIPELINE });
    expect(next.activePipeline).toBeNull();
  });

  it("PIPELINE_REMOVE_TASK filters out task", () => {
    const state = stateWith([
      makeStage({
        id: "s1",
        tasks: [makeTask({ id: "t1" }), makeTask({ id: "t2" })],
      }),
    ]);
    const next = reducer(state, { type: PIPELINE_REMOVE_TASK, payload: "t1" });
    expect(next.activePipeline?.stages?.[0].tasks?.map((t) => t.id)).toEqual([
      "t2",
    ]);
  });

  it("PIPELINE_TOGGLE_VIEW", () => {
    const state = stateWith([]);
    const next = reducer(state, {
      type: PIPELINE_TOGGLE_VIEW,
      payload: "LIST" as never,
    });
    expect(next.view).toBe("LIST");
  });

  it("PIPELINE_ADD_LABEL_TO_TASK appends label", () => {
    const state = stateWith([
      makeStage({ id: "s1", tasks: [makeTask({ id: "t1" })] }),
    ]);
    const label = { id: "l1", name: "x", color: "#000" } as never;
    const next = reducer(state, {
      type: PIPELINE_ADD_LABEL_TO_TASK,
      payload: { taskId: "t1", label },
    });
    expect(next.activePipeline?.stages?.[0].tasks?.[0].assigned_labels).toEqual(
      [label],
    );
  });

  it("PIPELINE_REMOVE_LABEL_FROM_TASK removes by labelId", () => {
    const label = { id: "l1" } as never;
    const state = stateWith([
      makeStage({
        id: "s1",
        tasks: [makeTask({ id: "t1", assigned_labels: [label] })],
      }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_REMOVE_LABEL_FROM_TASK,
      payload: { taskId: "t1", labelId: "l1" },
    });
    expect(next.activePipeline?.stages?.[0].tasks?.[0].assigned_labels).toEqual(
      [],
    );
  });

  it("PIPELINE_EDIT_LABEL replaces matching label across tasks", () => {
    const label = { id: "l1", name: "Old" } as never;
    const updated = { id: "l1", name: "New" } as never;
    const state = stateWith([
      makeStage({
        id: "s1",
        tasks: [makeTask({ id: "t1", assigned_labels: [label] })],
      }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_EDIT_LABEL,
      payload: { label: updated },
    });
    expect(next.activePipeline?.stages?.[0].tasks?.[0].assigned_labels).toEqual(
      [updated],
    );
  });

  it("PIPELINE_REMOVE_LABEL strips label from all tasks", () => {
    const l1 = { id: "l1" } as never;
    const l2 = { id: "l2" } as never;
    const state = stateWith([
      makeStage({
        id: "s1",
        tasks: [makeTask({ id: "t1", assigned_labels: [l1, l2] })],
      }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_REMOVE_LABEL,
      payload: "l1",
    });
    expect(next.activePipeline?.stages?.[0].tasks?.[0].assigned_labels).toEqual(
      [l2],
    );
  });

  it("PIPELINE_SET_TASK_FOCUS_COLOR sets color on task", () => {
    const state = stateWith([
      makeStage({ id: "s1", tasks: [makeTask({ id: "t1" })] }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_SET_TASK_FOCUS_COLOR,
      payload: { taskId: "t1", color: "#abcdef" },
    });
    expect(
      (next.activePipeline?.stages?.[0].tasks?.[0] as never as Task)
        .task_focus_color,
    ).toBe("#abcdef");
  });

  it("PIPELINE_REORDER_TASK reorders within stage", () => {
    const state = stateWith([
      makeStage({
        id: "s1",
        tasks: [
          makeTask({ id: "t1" }),
          makeTask({ id: "t2" }),
          makeTask({ id: "t3" }),
        ],
      }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_REORDER_TASK,
      payload: {
        source: { droppableId: "s1", index: 0 },
        destination: { droppableId: "s1", index: 2 },
      } as never,
    });
    expect(next.activePipeline?.stages?.[0].tasks?.map((t) => t.id)).toEqual([
      "t2",
      "t3",
      "t1",
    ]);
  });

  it("PIPELINE_MOVE_TASK moves task across stages", () => {
    const state = stateWith([
      makeStage({ id: "s1", tasks: [makeTask({ id: "t1" })] }),
      makeStage({ id: "s2", tasks: [] }),
    ]);
    const next = reducer(state, {
      type: PIPELINE_MOVE_TASK,
      payload: {
        source: { droppableId: "s1", index: 0 },
        destination: { droppableId: "s2", index: 0 },
      } as never,
    });
    expect(
      next.activePipeline?.stages?.find((s) => s.id === "s1")?.tasks,
    ).toEqual([]);
    expect(
      next.activePipeline?.stages
        ?.find((s) => s.id === "s2")
        ?.tasks?.map((t) => t.id),
    ).toEqual(["t1"]);
  });

  it("returns state for unknown action", () => {
    const state = stateWith([]);
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(state, unknown)).toBe(state);
  });
});
