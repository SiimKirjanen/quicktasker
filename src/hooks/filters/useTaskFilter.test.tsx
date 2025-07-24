import { renderHook } from "@testing-library/react";
import React from "react";
import {
  ActivePipelineTaskViewContext,
  State,
} from "../../providers/ActivePipelineTaskViewContextProvider";
import { Task } from "../../types/task";
import { User, UserTypes, WPUser } from "../../types/user";
import { useTaskFilter } from "./useTaskFilter";

// Helper to create a mock Task
function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "t1",
    pipeline_id: "p1",
    pipeline_name: "Main Pipeline",
    stage_id: "stage1",
    name: "Test Task",
    description: "A description",
    created_at: "2024-06-01T00:00:00Z",
    due_date: null,
    task_order: 1,
    task_hash: "hash",
    assigned_labels: [],
    task_focus_color: "#fff",
    free_for_all: false,
    assigned_users: [],
    assigned_wp_users: [],
    is_archived: false,
    is_done: false,
    ...overrides,
  };
}

// Helper to create a mock User
function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: "u1",
    name: "User One",
    description: "desc",
    created_at: "2024-06-01T00:00:00Z",
    page_hash: "hash",
    assigned_tasks_count: "0",
    user_type: UserTypes.QUICKTASKER,
    is_active: true,
    has_password: true,
    ...overrides,
  };
}

// Helper to create a mock WP User
function createMockWPUser(overrides: Partial<WPUser> = {}): WPUser {
  return {
    id: "wp1",
    name: "WP User",
    description: "WP user description",
    created_at: "2024-06-01T00:00:00Z",
    caps: [],
    allcaps: [],
    roles: [],
    user_type: UserTypes.WP_USER,
    profile_picture: "",
    ...overrides,
  };
}

// Helper to create a mock context value
function createMockContextValue(state: State) {
  return {
    state,
    taskViewDispatch: jest.fn(),
  };
}

// The wrapper expects the full context value, not just State
const wrapper = (contextValue: {
  state: State;
  taskViewDispatch: jest.Mock;
}) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ActivePipelineTaskViewContext.Provider value={contextValue}>
      {children}
    </ActivePipelineTaskViewContext.Provider>
  );
  Wrapper.displayName = "ActivePipelineTaskViewContextWrapper";
  return Wrapper;
};

describe("useTaskFilter", () => {
  it("returns true when all filters are empty", () => {
    const contextValue = createMockContextValue({
      stageIdFilter: "",
      userFilter: { id: "", type: null },
      searchText: "",
    });
    const { result } = renderHook(() => useTaskFilter(), {
      wrapper: wrapper(contextValue),
    });
    const task = createMockTask();
    expect(result.current.taskViewFilter(task)).toBe(true);
  });

  it("filters by stageIdFilter", () => {
    const contextValue = createMockContextValue({
      stageIdFilter: "stage2",
      userFilter: { id: "", type: null },
      searchText: "",
    });
    const { result } = renderHook(() => useTaskFilter(), {
      wrapper: wrapper(contextValue),
    });
    const task = createMockTask({ stage_id: "stage1" });
    expect(result.current.taskViewFilter(task)).toBe(false);
    const matchingTask = createMockTask({ stage_id: "stage2" });
    expect(result.current.taskViewFilter(matchingTask)).toBe(true);
  });

  it("filters by QUICKTASKER userFilter", () => {
    const contextValue = createMockContextValue({
      stageIdFilter: "",
      userFilter: { id: "u1", type: UserTypes.QUICKTASKER },
      searchText: "",
    });
    const { result } = renderHook(() => useTaskFilter(), {
      wrapper: wrapper(contextValue),
    });
    const task = createMockTask({
      assigned_users: [createMockUser({ id: "u1", name: "User One" })],
    });
    expect(result.current.taskViewFilter(task)).toBe(true);

    const nonMatchingTask = createMockTask({
      assigned_users: [createMockUser({ id: "u2", name: "User Two" })],
    });
    expect(result.current.taskViewFilter(nonMatchingTask)).toBe(false);
  });

  it("filters by WP_USER userFilter", () => {
    const contextValue = createMockContextValue({
      stageIdFilter: "",
      userFilter: { id: "wp1", type: UserTypes.WP_USER },
      searchText: "",
    });
    const { result } = renderHook(() => useTaskFilter(), {
      wrapper: wrapper(contextValue),
    });
    const task = createMockTask({
      assigned_wp_users: [createMockWPUser({ id: "wp1", name: "WP User" })],
    });
    expect(result.current.taskViewFilter(task)).toBe(true);

    const nonMatchingTask = createMockTask({
      assigned_wp_users: [createMockWPUser({ id: "wp2", name: "WP User 2" })],
    });
    expect(result.current.taskViewFilter(nonMatchingTask)).toBe(false);
  });

  it("filters by searchText in name", () => {
    const contextValue = createMockContextValue({
      stageIdFilter: "",
      userFilter: { id: "", type: null },
      searchText: "test",
    });
    const { result } = renderHook(() => useTaskFilter(), {
      wrapper: wrapper(contextValue),
    });
    const task = createMockTask({ name: "Test Task" });
    expect(result.current.taskViewFilter(task)).toBe(true);

    const nonMatchingTask = createMockTask({ name: "Other Task" });
    expect(result.current.taskViewFilter(nonMatchingTask)).toBe(false);
  });

  it("filters by searchText in description", () => {
    const contextValue = createMockContextValue({
      stageIdFilter: "",
      userFilter: { id: "", type: null },
      searchText: "desc",
    });
    const { result } = renderHook(() => useTaskFilter(), {
      wrapper: wrapper(contextValue),
    });
    const task = createMockTask({ description: "A desc here" });
    expect(result.current.taskViewFilter(task)).toBe(true);

    const nonMatchingTask = createMockTask({ description: "No match" });
    expect(result.current.taskViewFilter(nonMatchingTask)).toBe(false);
  });

  it("combines all filters", () => {
    const contextValue = createMockContextValue({
      stageIdFilter: "stage1",
      userFilter: { id: "u1", type: UserTypes.QUICKTASKER },
      searchText: "test",
    });
    const { result } = renderHook(() => useTaskFilter(), {
      wrapper: wrapper(contextValue),
    });
    const matchingTask = createMockTask({
      stage_id: "stage1",
      name: "Test Task",
      assigned_users: [createMockUser({ id: "u1", name: "User One" })],
    });
    expect(result.current.taskViewFilter(matchingTask)).toBe(true);

    const nonMatchingTask = createMockTask({
      stage_id: "stage2",
      name: "Test Task",
      assigned_users: [createMockUser({ id: "u1", name: "User One" })],
    });
    expect(result.current.taskViewFilter(nonMatchingTask)).toBe(false);
  });
});
