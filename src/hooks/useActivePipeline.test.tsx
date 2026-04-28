import { renderHook } from "@testing-library/react";
import React from "react";
import {
  ActivePipelineContext,
  State,
} from "../providers/ActivePipelineContextProvider";
import { Pipeline, PipelineView } from "../types/pipeline";
import { Stage } from "../types/stage";
import { Task } from "../types/task";
import { useActivePipeline } from "./useActivePipeline";

function makeTask(id: string, overrides: Partial<Task> = {}): Task {
  return {
    id,
    pipeline_id: "p1",
    pipeline_name: "Pipeline",
    stage_id: "s1",
    name: `Task ${id}`,
    description: "",
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

function makeStage(
  id: string,
  tasks: Task[] = [],
  overrides: Partial<Stage> = {},
): Stage {
  return {
    id,
    pipeline_id: "p1",
    name: `Stage ${id}`,
    description: "",
    stage_order: 1,
    tasks,
    ...overrides,
  };
}

function makePipeline(stages: Stage[]): Pipeline {
  return {
    id: "p1",
    name: "Pipeline",
    is_primary: false,
    stages,
  };
}

function makeState(activePipeline: Pipeline | null): State {
  return {
    loading: false,
    view: PipelineView.PIPELINE,
    activePipeline,
  };
}

function wrapper(state: State) {
  const ctx = {
    state,
    dispatch: jest.fn(),
    fetchAndSetPipelineData: jest.fn(),
  };
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ActivePipelineContext.Provider value={ctx}>
      {children}
    </ActivePipelineContext.Provider>
  );
  Wrapper.displayName = "ActivePipelineContextWrapper";
  return Wrapper;
}

describe("useActivePipeline", () => {
  describe("getActivePipelineStages", () => {
    it("returns [] when no active pipeline", () => {
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(null)),
      });
      expect(result.current.getActivePipelineStages()).toEqual([]);
    });

    it("returns the pipeline stages", () => {
      const stages = [makeStage("s1"), makeStage("s2")];
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(makePipeline(stages))),
      });
      expect(result.current.getActivePipelineStages()).toHaveLength(2);
    });
  });

  describe("getActivePipelinStageTasksLength", () => {
    it("returns 0 for unknown stage", () => {
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(
          makeState(makePipeline([makeStage("s1", [makeTask("t1")])])),
        ),
      });
      expect(result.current.getActivePipelinStageTasksLength("unknown")).toBe(
        0,
      );
    });

    it("returns task count for known stage", () => {
      const stage = makeStage("s1", [makeTask("t1"), makeTask("t2")]);
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(makePipeline([stage]))),
      });
      expect(result.current.getActivePipelinStageTasksLength("s1")).toBe(2);
    });
  });

  describe("getTaskStage", () => {
    it("returns null when task not found", () => {
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(
          makeState(makePipeline([makeStage("s1", [makeTask("t1")])])),
        ),
      });
      expect(result.current.getTaskStage("missing")).toBeNull();
    });

    it("returns the stage that contains the task", () => {
      const stage1 = makeStage("s1", [makeTask("t1")]);
      const stage2 = makeStage("s2", [makeTask("t2")]);
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(makePipeline([stage1, stage2]))),
      });
      expect(result.current.getTaskStage("t2")).toMatchObject({ id: "s2" });
    });
  });

  describe("getTaskOrderInStage", () => {
    it("returns null when task not in any stage", () => {
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(
          makeState(makePipeline([makeStage("s1", [makeTask("t1")])])),
        ),
      });
      expect(result.current.getTaskOrderInStage("missing")).toBeNull();
    });

    it("returns the index of the task within its stage", () => {
      const stage = makeStage("s1", [
        makeTask("t1"),
        makeTask("t2"),
        makeTask("t3"),
      ]);
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(makePipeline([stage]))),
      });
      expect(result.current.getTaskOrderInStage("t3")).toBe(2);
    });
  });

  describe("isTaskOnLastStage", () => {
    it("returns false when task not found", () => {
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(makePipeline([makeStage("s1", [])]))),
      });
      expect(result.current.isTaskOnLastStage("missing")).toBe(false);
    });

    it("returns true when task is on the last stage", () => {
      const stage1 = makeStage("s1", [makeTask("t1")]);
      const stage2 = makeStage("s2", [makeTask("t2")]);
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(makePipeline([stage1, stage2]))),
      });
      expect(result.current.isTaskOnLastStage("t2")).toBe(true);
      expect(result.current.isTaskOnLastStage("t1")).toBe(false);
    });
  });

  describe("stageOptions", () => {
    it("maps stages to label/value pairs", () => {
      const stages = [makeStage("s1"), makeStage("s2")];
      stages[0].name = "To Do";
      stages[1].name = "Done";
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(makePipeline(stages))),
      });
      expect(result.current.stageOptions).toEqual([
        { label: "To Do", value: "s1" },
        { label: "Done", value: "s2" },
      ]);
    });
  });

  describe("activePipelineTasks", () => {
    it("returns all tasks flattened across stages", () => {
      const stage1 = makeStage("s1", [makeTask("t1"), makeTask("t2")]);
      const stage2 = makeStage("s2", [makeTask("t3")]);
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(makePipeline([stage1, stage2]))),
      });
      expect(result.current.activePipelineTasks).toHaveLength(3);
      expect(result.current.activePipelineTasks.map((t) => t.id)).toEqual([
        "t1",
        "t2",
        "t3",
      ]);
    });

    it("returns [] when no pipeline", () => {
      const { result } = renderHook(() => useActivePipeline(), {
        wrapper: wrapper(makeState(null)),
      });
      expect(result.current.activePipelineTasks).toEqual([]);
    });
  });
});
