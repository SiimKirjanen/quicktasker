import { Task } from "../../types/task";
import { filterTasks } from "./task-search";

// Helper function to create mock Task objects
function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "mock-id",
    pipeline_id: "pipe1",
    pipeline_name: "Main Pipeline",
    stage_id: "todo",
    name: "Mock Task",
    description: "Mock description",
    created_at: "2024-06-01T00:00:00Z",
    due_date: null,
    task_order: 1,
    task_hash: "hash",
    assigned_labels: [],
    task_focus_color: "#ffffff",
    free_for_all: false,
    assigned_users: [],
    assigned_wp_users: [],
    is_archived: false,
    is_done: false,
    ...overrides,
  };
}

describe("filterTasks", () => {
  it("returns true when search value is empty", () => {
    const task = createMockTask();
    const result = filterTasks(task, "");
    expect(result).toBe(true);
  });

  it("returns true when task name contains search value", () => {
    const task = createMockTask({ name: "Complete Project Report" });
    const result = filterTasks(task, "project");
    expect(result).toBe(true);
  });

  it("returns true when task description contains search value", () => {
    const task = createMockTask({
      name: "Task Name",
      description: "Contains important details about the project",
    });
    const result = filterTasks(task, "important");
    expect(result).toBe(true);
  });

  it("returns true when pipeline name contains search value", () => {
    const task = createMockTask({
      name: "Task Name",
      description: "Task Description",
      pipeline_name: "Marketing Campaign",
    });
    const result = filterTasks(task, "marketing");
    expect(result).toBe(true);
  });

  it("returns false when search value is not found in task name, description, or pipeline name", () => {
    const task = createMockTask({
      name: "Task Name",
      description: "Task Description",
      pipeline_name: "Marketing Campaign",
    });
    const result = filterTasks(task, "development");
    expect(result).toBe(false);
  });

  it("handles case insensitivity correctly", () => {
    const task = createMockTask({
      name: "UPPERCASE TASK",
      description: "MiXeD cAsE description",
      pipeline_name: "lowercase pipeline",
    });

    expect(filterTasks(task, "UPPERCASE")).toBe(true);
    expect(filterTasks(task, "uppercase")).toBe(true);
    expect(filterTasks(task, "MiXeD")).toBe(true);
    expect(filterTasks(task, "mixed")).toBe(true);
    expect(filterTasks(task, "PIPELINE")).toBe(true);
    expect(filterTasks(task, "pipeline")).toBe(true);
  });

  it("handles missing description and pipeline name", () => {
    const task = createMockTask({
      name: "Task Name",
      description: undefined,
      pipeline_name: undefined,
    });

    expect(filterTasks(task, "task")).toBe(true);
    expect(filterTasks(task, "description")).toBe(false);
    expect(filterTasks(task, "pipeline")).toBe(false);
  });

  it("handles special characters in search string", () => {
    const task = createMockTask({
      name: "Task with (special) characters!",
      description: "Contains @#$% symbols",
    });

    expect(filterTasks(task, "(special)")).toBe(true);
    expect(filterTasks(task, "@#$%")).toBe(true);
    expect(filterTasks(task, "!")).toBe(true);
  });
});
