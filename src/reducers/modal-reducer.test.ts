import {
  ADD_ASSIGNED_USER_TO_EDITING_TASK,
  ARCHIVE_SETTINGS_MODAL_OPEN,
  CHANGE_TASK_DONE_STATUS,
  CHANGE_TASK_EXPORT_MODAL_METHOD,
  CHANGE_USER_SETTINGS_MODAL_OPEN,
  CLOSE_API_TOKEN_LOGS_MODAL,
  CLOSE_AUTOMATION_LOGS_MODAL,
  CLOSE_TASK_MODAL,
  CLOSE_WEBHOOKS_LOGS_MODAL,
  OPEN_API_TOKEN_LOGS_MODAL,
  OPEN_ARCHIVE_TASK_MODAL,
  OPEN_AUTOMATION_LOGS_MODAL,
  OPEN_EDIT_PIPELINE_MODAL,
  OPEN_EDIT_TASK_MODAL,
  OPEN_EDIT_USER_MODAL,
  OPEN_MOVE_TASK_MODAL,
  OPEN_NEW_PIPELINE_MODAL,
  OPEN_NEW_STAGE_MODAL,
  OPEN_NEW_USER_MODAL,
  OPEN_PIPELINE_IMPORT_MODAL,
  OPEN_STAGE_EDIT_MODAL,
  OPEN_TASK_COLOR_MODAL,
  OPEN_TASK_EXPORT_MODAL,
  OPEN_TASK_RESTORE_MODAL,
  OPEN_WEBHOOKS_LOGS_MODAL,
  REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
  SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
  SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN,
  UPDATE_API_TOKEN_LOGS_MODAL_SETTINGS,
  UPDATE_AUTOMATION_LOGS_MODAL_SETTINGS,
  UPDATE_WEBHOOKS_LOGS_MODAL_SETTINGS,
} from "../constants";
import { Action, initialState, State } from "../providers/ModalContextProvider";
import { TaskExportMethods, type Task } from "../types/task";
import { UserTypes, type User, type WPUser } from "../types/user";
import { reducer } from "./modal-reducer";

const makeTask = (overrides: Partial<Task> = {}): Task =>
  ({
    id: "t1",
    stage_id: "s1",
    is_done: false,
    assigned_users: [],
    assigned_wp_users: [],
    ...overrides,
  }) as Task;

const makeUser = (id = "u1"): User =>
  ({ id, user_type: UserTypes.QUICKTASKER }) as unknown as User;

const makeWPUser = (id = "wp1"): WPUser =>
  ({ id, user_type: UserTypes.WP_USER }) as unknown as WPUser;

describe("modal reducer", () => {
  it("OPEN_EDIT_TASK_MODAL sets task and target stage", () => {
    const task = makeTask({ id: "t9", stage_id: "stage-9" });
    const next = reducer(initialState, {
      type: OPEN_EDIT_TASK_MODAL,
      payload: { taskToEdit: task },
    });
    expect(next.taskModalOpen).toBe(true);
    expect(next.taskToEdit).toBe(task);
    expect(next.targetStageId).toBe("stage-9");
  });

  it("OPEN_EDIT_TASK_MODAL merges taskModalSettings", () => {
    const task = makeTask();
    const next = reducer(initialState, {
      type: OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
        taskModalSettings: { allowToMarkTaskAsDone: false },
      },
    });
    expect(next.taskModalSettings.allowToMarkTaskAsDone).toBe(false);
  });

  it("CLOSE_TASK_MODAL resets to initial state", () => {
    const dirty: State = {
      ...initialState,
      taskModalOpen: true,
      taskToEdit: makeTask(),
    };
    const next = reducer(dirty, { type: CLOSE_TASK_MODAL });
    expect(next).toEqual(initialState);
  });

  it("ADD_ASSIGNED_USER_TO_EDITING_TASK adds quicktasker user", () => {
    const state: State = { ...initialState, taskToEdit: makeTask() };
    const user = makeUser("u-1");
    const next = reducer(state, {
      type: ADD_ASSIGNED_USER_TO_EDITING_TASK,
      payload: user,
    });
    expect(next.taskToEdit?.assigned_users).toEqual([user]);
    expect(next.taskToEdit?.assigned_wp_users).toEqual([]);
  });

  it("ADD_ASSIGNED_USER_TO_EDITING_TASK adds WP user", () => {
    const state: State = { ...initialState, taskToEdit: makeTask() };
    const user = makeWPUser("wp-1");
    const next = reducer(state, {
      type: ADD_ASSIGNED_USER_TO_EDITING_TASK,
      payload: user,
    });
    expect(next.taskToEdit?.assigned_wp_users).toEqual([user]);
    expect(next.taskToEdit?.assigned_users).toEqual([]);
  });

  it("REMOVE_ASSIGNED_USER_FROM_EDITING_TASK removes only matching user", () => {
    const u1 = makeUser("u-1");
    const u2 = makeUser("u-2");
    const state: State = {
      ...initialState,
      taskToEdit: makeTask({ assigned_users: [u1, u2] }),
    };
    const next = reducer(state, {
      type: REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
      payload: u1,
    });
    expect(next.taskToEdit?.assigned_users).toEqual([u2]);
  });

  it("OPEN_NEW_STAGE_MODAL stores targetPipelineId", () => {
    const next = reducer(initialState, {
      type: OPEN_NEW_STAGE_MODAL,
      payload: { targetPipelineId: "p-1" },
    });
    expect(next.stageModalOpen).toBe(true);
    expect(next.targetPipelineId).toBe("p-1");
  });

  it("OPEN_STAGE_EDIT_MODAL stores stageToEdit", () => {
    const stage = { id: "s-1", name: "Todo" } as never;
    const next = reducer(initialState, {
      type: OPEN_STAGE_EDIT_MODAL,
      payload: { stageToEdit: stage },
    });
    expect(next.stageModalOpen).toBe(true);
    expect(next.stageToEdit).toBe(stage);
  });

  it("OPEN_NEW_PIPELINE_MODAL flips flag", () => {
    const next = reducer(initialState, { type: OPEN_NEW_PIPELINE_MODAL });
    expect(next.newPipelineModalOpen).toBe(true);
  });

  it("OPEN_EDIT_PIPELINE_MODAL stores pipelineToEdit", () => {
    const pipeline = { id: "p-1", name: "Sales" } as never;
    const next = reducer(initialState, {
      type: OPEN_EDIT_PIPELINE_MODAL,
      payload: { pipelineToEdit: pipeline },
    });
    expect(next.pipelineModalOpen).toBe(true);
    expect(next.pipelineToEdit).toBe(pipeline);
  });

  it("OPEN_ARCHIVE_TASK_MODAL stores task", () => {
    const task = makeTask();
    const next = reducer(initialState, {
      type: OPEN_ARCHIVE_TASK_MODAL,
      payload: task,
    });
    expect(next.archiveTaskModalOpen).toBe(true);
    expect(next.archiveModalTask).toBe(task);
  });

  it("OPEN_NEW_USER_MODAL flips flag", () => {
    const next = reducer(initialState, { type: OPEN_NEW_USER_MODAL });
    expect(next.userModalOpen).toBe(true);
  });

  it("OPEN_EDIT_USER_MODAL stores user", () => {
    const user = makeUser();
    const next = reducer(initialState, {
      type: OPEN_EDIT_USER_MODAL,
      payload: user,
    });
    expect(next.userModalOpen).toBe(true);
    expect(next.userToEdit).toBe(user);
  });

  it("CHANGE_USER_SETTINGS_MODAL_OPEN(true) opens modal, false resets", () => {
    const opened = reducer(initialState, {
      type: CHANGE_USER_SETTINGS_MODAL_OPEN,
      payload: true,
    });
    expect(opened.userSettingsModalOpen).toBe(true);

    const closed = reducer(opened, {
      type: CHANGE_USER_SETTINGS_MODAL_OPEN,
      payload: false,
    });
    expect(closed).toEqual(initialState);
  });

  it("CHANGE_TASK_DONE_STATUS mutates taskToEdit.is_done", () => {
    const state: State = {
      ...initialState,
      taskToEdit: makeTask({ is_done: false }),
    };
    const next = reducer(state, {
      type: CHANGE_TASK_DONE_STATUS,
      payload: { done: true },
    });
    expect(next.taskToEdit?.is_done).toBe(true);
  });

  it("OPEN_MOVE_TASK_MODAL opens & stores task", () => {
    const task = makeTask();
    const next = reducer(initialState, {
      type: OPEN_MOVE_TASK_MODAL,
      payload: { task },
    });
    expect(next.moveTaskModalOpen).toBe(true);
    expect(next.taskToEdit).toBe(task);
  });

  it("OPEN_TASK_COLOR_MODAL opens & stores task", () => {
    const task = makeTask();
    const next = reducer(initialState, {
      type: OPEN_TASK_COLOR_MODAL,
      payload: { task },
    });
    expect(next.taskColorModalOpen).toBe(true);
    expect(next.taskToEdit).toBe(task);
  });

  it("OPEN_TASK_EXPORT_MODAL stores selected method", () => {
    const next = reducer(initialState, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.CSV },
    });
    expect(next.taskExportModalOpen).toBe(true);
    expect(next.taskExportModalSettings.selectedMethod).toBe(
      TaskExportMethods.CSV,
    );
  });

  it("CHANGE_TASK_EXPORT_MODAL_METHOD updates method without opening", () => {
    const next = reducer(initialState, {
      type: CHANGE_TASK_EXPORT_MODAL_METHOD,
      payload: { selectedMethod: TaskExportMethods.CSV },
    });
    expect(next.taskExportModalSettings.selectedMethod).toBe(
      TaskExportMethods.CSV,
    );
    expect(next.taskExportModalOpen).toBe(false);
  });

  it("OPEN_PIPELINE_IMPORT_MODAL flips flag", () => {
    const next = reducer(initialState, { type: OPEN_PIPELINE_IMPORT_MODAL });
    expect(next.pipelineImportModalOpen).toBe(true);
  });

  it("ARCHIVE_SETTINGS_MODAL_OPEN(true) opens, false resets", () => {
    const opened = reducer(initialState, {
      type: ARCHIVE_SETTINGS_MODAL_OPEN,
      payload: true,
    });
    expect(opened.archiveSettingsModalOpen).toBe(true);

    const closed = reducer(opened, {
      type: ARCHIVE_SETTINGS_MODAL_OPEN,
      payload: false,
    });
    expect(closed).toEqual(initialState);
  });

  it("OPEN_TASK_RESTORE_MODAL stores task to restore", () => {
    const task = makeTask();
    const next = reducer(initialState, {
      type: OPEN_TASK_RESTORE_MODAL,
      payload: { taskToRestore: task },
    });
    expect(next.taskRestoreModalOpen).toBe(true);
    expect(next.taskRestoreModalSettings.taskToRestore).toBe(task);
  });

  it("SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN toggles", () => {
    const next = reducer(initialState, {
      type: SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
      payload: true,
    });
    expect(next.customFieldCreatorModalOpen).toBe(true);
  });

  it("SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN toggles", () => {
    const next = reducer(initialState, {
      type: SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN,
      payload: true,
    });
    expect(next.customFieldRecoveryModalOpen).toBe(true);
  });

  it("OPEN/CLOSE/UPDATE webhooks logs modal", () => {
    const opened = reducer(initialState, {
      type: OPEN_WEBHOOKS_LOGS_MODAL,
      payload: { webhookId: "w-1" },
    });
    expect(opened.webhooksLogsModalOpen).toBe(true);
    expect(opened.webhooksLogsModalSettings.webhookId).toBe("w-1");

    const updated = reducer(opened, {
      type: UPDATE_WEBHOOKS_LOGS_MODAL_SETTINGS,
      payload: { webhookId: "w-2" },
    });
    expect(updated.webhooksLogsModalSettings.webhookId).toBe("w-2");

    const closed = reducer(updated, { type: CLOSE_WEBHOOKS_LOGS_MODAL });
    expect(closed.webhooksLogsModalOpen).toBe(false);
    expect(closed.webhooksLogsModalSettings.webhookId).toBe(null);
  });

  it("OPEN/CLOSE/UPDATE automation logs modal", () => {
    const opened = reducer(initialState, {
      type: OPEN_AUTOMATION_LOGS_MODAL,
      payload: { automationId: "a-1" },
    });
    expect(opened.automationLogsModalOpen).toBe(true);
    expect(opened.automationLogsModalSettings.automationId).toBe("a-1");

    const updated = reducer(opened, {
      type: UPDATE_AUTOMATION_LOGS_MODAL_SETTINGS,
      payload: { automationId: "a-2" },
    });
    expect(updated.automationLogsModalSettings.automationId).toBe("a-2");

    const closed = reducer(updated, { type: CLOSE_AUTOMATION_LOGS_MODAL });
    expect(closed.automationLogsModalOpen).toBe(false);
    expect(closed.automationLogsModalSettings.automationId).toBe(null);
  });

  it("OPEN/CLOSE/UPDATE api token logs modal", () => {
    const opened = reducer(initialState, {
      type: OPEN_API_TOKEN_LOGS_MODAL,
      payload: { apiTokenId: "t-1" },
    });
    expect(opened.apiTokenLogsModalOpen).toBe(true);
    expect(opened.apiTokenLogsModalSettings.apiTokenId).toBe("t-1");

    const updated = reducer(opened, {
      type: UPDATE_API_TOKEN_LOGS_MODAL_SETTINGS,
      payload: { apiTokenId: "t-2" },
    });
    expect(updated.apiTokenLogsModalSettings.apiTokenId).toBe("t-2");

    const closed = reducer(updated, { type: CLOSE_API_TOKEN_LOGS_MODAL });
    expect(closed.apiTokenLogsModalOpen).toBe(false);
    expect(closed.apiTokenLogsModalSettings.apiTokenId).toBe(null);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(initialState, unknown)).toBe(initialState);
  });
});
