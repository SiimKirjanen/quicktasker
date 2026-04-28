import { renderHook } from "@testing-library/react";
import React from "react";
import { ArchiveContext, State } from "../../providers/ArchiveContextProvider";
import {
  WPQTArchiveDoneFilter,
  WPQTArchiveOrder,
  WPQTArvhiveTaskLimit,
} from "../../types/enums";
import { Task } from "../../types/task";
import { useArchiveFilter } from "./useArchiveFilter";

function makeState(overrides: Partial<State> = {}): State {
  return {
    archivedTasks: null,
    archiveLoading: false,
    archiveSearchValue: "",
    archiveFilteredPipelineId: "",
    archiveTaskDoneFilter: WPQTArchiveDoneFilter.All,
    archivedTaskLimit: WPQTArvhiveTaskLimit.ONE_HUNDRED,
    archiveFilterOrder: WPQTArchiveOrder.DESC,
    ...overrides,
  };
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
    is_archived: true,
    is_done: false,
    ...overrides,
  };
}

function wrapper(state: State) {
  const ctx = {
    state,
    archiveDispatch: jest.fn(),
    fetchAndSetArchivedTasks: jest.fn(),
  };
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ArchiveContext.Provider value={ctx}>{children}</ArchiveContext.Provider>
  );
  Wrapper.displayName = "ArchiveContextWrapper";
  return Wrapper;
}

describe("useArchiveFilter", () => {
  it("passes all tasks when filters are empty", () => {
    const { result } = renderHook(() => useArchiveFilter(), {
      wrapper: wrapper(makeState()),
    });
    expect(result.current.filterArchive(makeTask())).toBe(true);
  });

  it("filters by name search value (case-insensitive)", () => {
    const { result } = renderHook(() => useArchiveFilter(), {
      wrapper: wrapper(makeState({ archiveSearchValue: "hello" })),
    });
    expect(
      result.current.filterArchive(makeTask({ name: "Say Hello World" })),
    ).toBe(true);
    expect(result.current.filterArchive(makeTask({ name: "Other" }))).toBe(
      false,
    );
  });

  it("matches search value in description", () => {
    const { result } = renderHook(() => useArchiveFilter(), {
      wrapper: wrapper(makeState({ archiveSearchValue: "desc" })),
    });
    expect(
      result.current.filterArchive(
        makeTask({ name: "No match", description: "Some desc" }),
      ),
    ).toBe(true);
  });

  it("filters by pipeline id", () => {
    const { result } = renderHook(() => useArchiveFilter(), {
      wrapper: wrapper(makeState({ archiveFilteredPipelineId: "p2" })),
    });
    expect(result.current.filterArchive(makeTask({ pipeline_id: "p2" }))).toBe(
      true,
    );
    expect(result.current.filterArchive(makeTask({ pipeline_id: "p1" }))).toBe(
      false,
    );
  });

  it("DELETED filter matches tasks with null pipeline_name", () => {
    const { result } = renderHook(() => useArchiveFilter(), {
      wrapper: wrapper(makeState({ archiveFilteredPipelineId: "DELETED" })),
    });
    expect(
      result.current.filterArchive(makeTask({ pipeline_name: null })),
    ).toBe(true);
    expect(
      result.current.filterArchive(makeTask({ pipeline_name: "Pipeline" })),
    ).toBe(false);
  });

  it("Completed done filter passes only done tasks", () => {
    const { result } = renderHook(() => useArchiveFilter(), {
      wrapper: wrapper(
        makeState({ archiveTaskDoneFilter: WPQTArchiveDoneFilter.Completed }),
      ),
    });
    expect(result.current.filterArchive(makeTask({ is_done: true }))).toBe(
      true,
    );
    expect(result.current.filterArchive(makeTask({ is_done: false }))).toBe(
      false,
    );
  });

  it("NotCompleted done filter passes only not-done tasks", () => {
    const { result } = renderHook(() => useArchiveFilter(), {
      wrapper: wrapper(
        makeState({
          archiveTaskDoneFilter: WPQTArchiveDoneFilter.NotCompleted,
        }),
      ),
    });
    expect(result.current.filterArchive(makeTask({ is_done: false }))).toBe(
      true,
    );
    expect(result.current.filterArchive(makeTask({ is_done: true }))).toBe(
      false,
    );
  });

  it("combines search, pipeline, and done filters", () => {
    const { result } = renderHook(() => useArchiveFilter(), {
      wrapper: wrapper(
        makeState({
          archiveSearchValue: "task",
          archiveFilteredPipelineId: "p1",
          archiveTaskDoneFilter: WPQTArchiveDoneFilter.Completed,
        }),
      ),
    });
    const passing = makeTask({
      name: "task",
      pipeline_id: "p1",
      is_done: true,
    });
    expect(result.current.filterArchive(passing)).toBe(true);

    const failsSearch = makeTask({
      name: "other",
      description: "nothing here",
      pipeline_id: "p1",
      is_done: true,
    });
    expect(result.current.filterArchive(failsSearch)).toBe(false);
  });
});
