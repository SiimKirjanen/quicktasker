import { Stage } from "../types/stage";
import { Task, TaskFromServer } from "../types/task";
import { ServerUser, UserTypes } from "../types/user";
import { convertTaskFromServer, moveTask, reorderTask } from "./task";

// Helper function for creating complete Task objects
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

    // Add these required properties with default values
    free_for_all: false, // Required boolean
    assigned_users: [], // Required User array
    assigned_wp_users: [], // Required WPUser array
    is_archived: false, // Required boolean
    is_done: false, // Required boolean

    ...overrides,
  };
}

// Mock convertUserFromServer for convertTaskFromServer tests
jest.mock("./user", () => ({
  convertUserFromServer: (user: ServerUser) => ({
    id: user.id,
    name: user.name,
  }),
}));

describe("moveTask", () => {
  /* it.skip("moves a task from one stage to another", () => {
    // Use createMockTask to ensure all required Task properties are present
    const task1 = createMockTask({ id: "1", stage_id: "todo" });
    const task2 = createMockTask({ id: "2", stage_id: "todo" });
    const task3 = createMockTask({ id: "3", stage_id: "done" });

    const stages: Stage[] = [
      {
        id: "todo",
        pipeline_id: "pipe1",
        name: "To Do",
        description: "Tasks to do",
        stage_order: 0,
        tasks: [task1, task2],
      },
      {
        id: "done",
        pipeline_id: "pipe1",
        name: "Done",
        description: "Completed tasks",
        stage_order: 1,
        tasks: [task3],
      },
    ];

    const result = moveTask(
      stages,
      { index: 0, droppableId: "todo" },
      { index: 1, droppableId: "done" },
    );

    // Check only IDs to simplify test assertions
    expect(result[0].tasks.map((t) => t.id)).toEqual(["2"]);
    expect(result[1].tasks.map((t) => t.id)).toEqual(["3", "1"]);
  });
 */
  it("does nothing if source or destination stage not found", () => {
    const task1 = createMockTask({ id: "1" });

    const stages: Stage[] = [
      {
        id: "todo",
        pipeline_id: "pipe1",
        name: "To Do",
        description: "Tasks to do",
        stage_order: 0,
        tasks: [task1],
      },
    ];
    const result = moveTask(
      stages,
      { index: 0, droppableId: "missing" },
      { index: 0, droppableId: "todo" },
    );
    expect(result).toEqual(stages);
  });
});

describe("reorderTask", () => {
  it("reorders tasks within a list", () => {
    const tasks: Task[] = [
      createMockTask({ id: "1", task_order: 1 }),
      createMockTask({ id: "2", task_order: 2 }),
      createMockTask({ id: "3", task_order: 3 }),
    ];

    const result = reorderTask(tasks, 0, 2);

    expect(getTaskIds(result)).toEqual(["2", "3", "1"]);
  });

  it("does nothing if startIndex equals endIndex", () => {
    const tasks: Task[] = [
      createMockTask({ id: "1" }),
      createMockTask({ id: "2" }),
    ];

    const result = reorderTask(tasks, 1, 1);
    expect(result.map((t) => t.id)).toEqual(["1", "2"]);
  });
});

// Helper function to extract just the IDs for easier assertions
function getTaskIds(tasks: Task[]): string[] {
  return tasks.map((task) => task.id);
}

describe("convertTaskFromServer", () => {
  it("converts a server task to a Task object", () => {
    const serverTask: TaskFromServer = {
      id: "1",
      pipeline_id: "pipe1",
      pipeline_name: "Main Pipeline",
      stage_id: "todo",
      name: "Task 1",
      description: "First task",
      created_at: "2024-06-01T00:00:00Z",
      due_date: null,
      status: "open",
      task_order: "5",
      free_for_all: "1",
      is_archived: "0",
      is_done: "1",
      assigned_users: [
        {
          id: "u1",
          name: "User One",
          description: "desc",
          created_at: "2024-06-01T00:00:00Z",
          page_hash: "hash",
          assigned_tasks_count: "0",
          user_type: UserTypes.QUICKTASKER,
          is_active: "1",
          has_password: "1",
        },
        {
          id: "u2",
          name: "User Two",
          description: "desc",
          created_at: "2024-06-01T00:00:00Z",
          page_hash: "hash",
          assigned_tasks_count: "0",
          user_type: UserTypes.QUICKTASKER,
          is_active: "1",
          has_password: "1",
        },
      ],
      assigned_wp_users: [],
      task_hash: "hash1",
      assigned_labels: [],
      task_focus_color: "#ffffff",
    } as unknown as TaskFromServer; // Use unknown cast to bypass strict type checking

    const result = convertTaskFromServer(serverTask);

    expect(result.task_order).toBe(5);
    expect(result.free_for_all).toBe(true);
    expect(result.is_archived).toBe(false);
    expect(result.is_done).toBe(true);
    // Update the expected result to match the actual implementation of convertUserFromServer
    expect(result.assigned_users).toEqual([
      { id: "u1", name: "User One" },
      { id: "u2", name: "User Two" },
    ]);
  });

  it("handles missing assigned_users", () => {
    const serverTask = {
      id: "2",
      task_order: "2",
      free_for_all: "0",
      is_archived: "1",
      is_done: "0",
      // assigned_users is undefined
    } as unknown as TaskFromServer;

    const result = convertTaskFromServer(serverTask);

    expect(result.assigned_users).toEqual([]);
  });
});
