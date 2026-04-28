import { renderHook } from "@testing-library/react";
import React from "react";
import { PipelinesContext, State } from "../providers/PipelinesContextProvider";
import { Pipeline } from "../types/pipeline";
import { usePipelines } from "./usePipelines";

function makePipeline(name: string, id = "p1"): Pipeline {
  return { id, name, is_primary: false };
}

function wrapper(pipelines: Pipeline[]) {
  const ctx = { state: { pipelines } as State, pipelinesDispatch: jest.fn() };
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <PipelinesContext.Provider value={ctx}>
      {children}
    </PipelinesContext.Provider>
  );
  Wrapper.displayName = "PipelinesContextWrapper";
  return Wrapper;
}

describe("usePipelines", () => {
  it("exposes the pipelines list from context", () => {
    const pipelines = [makePipeline("Alpha"), makePipeline("Beta", "p2")];
    const { result } = renderHook(() => usePipelines(), {
      wrapper: wrapper(pipelines),
    });
    expect(result.current.pipelines).toHaveLength(2);
  });

  describe("checkIfPipelineNameExists", () => {
    it("returns true for an exact matching name", () => {
      const { result } = renderHook(() => usePipelines(), {
        wrapper: wrapper([makePipeline("Alpha")]),
      });
      expect(result.current.checkIfPipelineNameExists("Alpha")).toBe(true);
    });

    it("is case-insensitive", () => {
      const { result } = renderHook(() => usePipelines(), {
        wrapper: wrapper([makePipeline("Alpha")]),
      });
      expect(result.current.checkIfPipelineNameExists("ALPHA")).toBe(true);
      expect(result.current.checkIfPipelineNameExists("alpha")).toBe(true);
    });

    it("returns false when name does not exist", () => {
      const { result } = renderHook(() => usePipelines(), {
        wrapper: wrapper([makePipeline("Alpha")]),
      });
      expect(result.current.checkIfPipelineNameExists("Beta")).toBe(false);
    });

    it("returns false for empty pipeline list", () => {
      const { result } = renderHook(() => usePipelines(), {
        wrapper: wrapper([]),
      });
      expect(result.current.checkIfPipelineNameExists("Alpha")).toBe(false);
    });
  });
});
