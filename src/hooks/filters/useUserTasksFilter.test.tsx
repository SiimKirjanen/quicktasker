import { renderHook } from "@testing-library/react";
import React from "react";
import {
  State,
  UserTasksContext,
} from "../../providers/UserTasksContextProvider";
import { Task } from "../../types/task";
import { useUserTasksFilter } from "./useUserTasksFilter";

function makeState(overrides: Partial<State> = {}): State {
  return { tasks: [], searchValue: "", filteredPipelineId: "", ...overrides };
}

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "t1",
    pipeline_id: "p1",
    pipeline_name: "Pipeline",
    stage_id: "s1",
    name: "Task Name",
    description: "Task description",
    created_at: "2024-01-01T00:00:00Z",
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

function wrapper(state: State) {
  const ctx = {
    state,
    userTasksDispatch: jest.fn(),
    fetchAndSetUserTasks: jest.fn(),
  };
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <UserTasksContext.Provider value={ctx}>
      {children}
    </UserTasksContext.Provider>
  );
  Wrapper.displayName = "UserTasksContextWrapper";
  return Wrapper;
}

describe("useUserTasksFilter", () => {
  it("passes all tasks when filters are empty", () => {
    const { result } = renderHook(() => useUserTasksFilter(), {
      wrapper: wrapper(makeState()),
    });
    expect(result.current.filterTasks(makeTask())).toBe(true);
  });

  it("matches search in name (case-insensitive)", () => {
    const { result } = renderHook(() => useUserTasksFilter(), {
      wrapper: wrapper(makeState({ searchValue: "fix" })),
    });
    expect(result.current.filterTasks(makeTask({ name: "Fix bug" }))).toBe(
      true,
    );
    expect(result.current.filterTasks(makeTask({ name: "Add feature" }))).toBe(
      false,
    );
  });

  it("matches search in description", () => {
    const { result } = renderHook(() => useUserTasksFilter(), {
      wrapper: wrapper(makeState({ searchValue: "urgent" })),
    });
    expect(
      result.current.filterTasks(
        makeTask({ name: "Task", description: "Urgent fix needed" }),
      ),
    ).toBe(true);
    expect(
      result.current.filterTasks(
        makeTask({ name: "Task", description: "Low priority" }),
      ),
    ).toBe(false);
  });

  it("filters by pipeline id", () => {
    const { result } = renderHook(() => useUserTasksFilter(), {
      wrapper: wrapper(makeState({ filteredPipelineId: "p2" })),
    });
    expect(result.current.filterTasks(makeTask({ pipeline_id: "p2" }))).toBe(
      true,
    );
    expect(result.current.filterTasks(makeTask({ pipeline_id: "p1" }))).toBe(
      false,
    );
  });

  it("combines search and pipeline filters", () => {
    const { result } = renderHook(() => useUserTasksFilter(), {
      wrapper: wrapper(
        makeState({ searchValue: "task", filteredPipelineId: "p1" }),
      ),
    });
    expect(
      result.current.filterTasks(makeTask({ name: "task", pipeline_id: "p1" })),
    ).toBe(true);
    expect(
      result.current.filterTasks(makeTask({ name: "task", pipeline_id: "p2" })),
    ).toBe(false);
  });
});
