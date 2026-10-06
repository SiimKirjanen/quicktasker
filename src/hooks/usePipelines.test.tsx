import { renderHook } from "@testing-library/react";
import React from "react";

const mockGetPipelinesRequest = jest.fn();
jest.mock("../api/api", () => ({
  getPipelinesRequest: () => mockGetPipelinesRequest(),
}));

import { PIPELINES_SET } from "../constants";
import { PipelinesContext, State } from "../providers/PipelinesContextProvider";
import { Pipeline } from "../types/pipeline";
import { usePipelines } from "./usePipelines";

function makePipeline(name: string, id = "p1"): Pipeline {
  return { id, name, is_primary: false };
}

function wrapper(pipelines: Pipeline[], pipelinesDispatch = jest.fn()) {
  const ctx = { state: { pipelines } as State, pipelinesDispatch };
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

  describe("refreshPipelines", () => {
    it("stores the reloaded boards and returns their IDs", async () => {
      const boards = [
        { id: 3, name: "Gamma" },
        { id: "4", name: "Delta" },
      ];
      mockGetPipelinesRequest.mockResolvedValue({ data: boards });
      const pipelinesDispatch = jest.fn();
      const { result } = renderHook(() => usePipelines(), {
        wrapper: wrapper([], pipelinesDispatch),
      });

      await expect(result.current.refreshPipelines()).resolves.toEqual([
        "3",
        "4",
      ]);
      expect(pipelinesDispatch).toHaveBeenCalledWith({
        type: PIPELINES_SET,
        payload: boards,
      });
    });

    it("returns null when the boards cannot be loaded", async () => {
      mockGetPipelinesRequest.mockRejectedValue(new Error("Network error"));
      jest.spyOn(console, "error").mockImplementation(() => {});
      const pipelinesDispatch = jest.fn();
      const { result } = renderHook(() => usePipelines(), {
        wrapper: wrapper([], pipelinesDispatch),
      });

      await expect(result.current.refreshPipelines()).resolves.toBeNull();
      expect(pipelinesDispatch).not.toHaveBeenCalled();
    });
  });
});
