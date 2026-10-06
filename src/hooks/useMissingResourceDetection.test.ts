import { renderHook } from "@testing-library/react";

jest.mock("react-toastify", () => ({
  toast: { info: jest.fn() },
}));

const mockDispatch = jest.fn();
jest.mock("./useMissingContent", () => ({
  useMissingContent: () => ({ pipelineMissing: false, dispatch: mockDispatch }),
}));

// The user's boards, as the server sent them.
let mockPipelines = [{ id: "1", name: "Board 1" }];
// The user's boards when they are reloaded from the server.
const mockRefreshPipelines = jest.fn();
jest.mock("./usePipelines", () => ({
  usePipelines: () => ({
    pipelines: mockPipelines,
    refreshPipelines: mockRefreshPipelines,
  }),
}));

import { toast } from "react-toastify";
import {
  SET_PIPELINE_MISSING,
  SET_PIPELINE_NO_ACCESS,
  SET_STAGE_MISSING,
  SET_TASK_MISSING,
  WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_STAGE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_TASK_NOT_FOUND,
} from "../constants";
import { useMissingResourceDetection } from "./useMissingResourceDetection";

beforeEach(() => {
  jest.clearAllMocks();
  mockPipelines = [{ id: "1", name: "Board 1" }];
  mockRefreshPipelines.mockResolvedValue(["1"]);
});

describe("useMissingResourceDetection", () => {
  describe("detectPipelineNoAccess", () => {
    const refused = { code: "rest_forbidden", data: { status: 403 } };

    it("dispatches SET_PIPELINE_NO_ACCESS when a board the user is not on is refused", async () => {
      const { result } = renderHook(() => useMissingResourceDetection());

      await expect(
        result.current.detectPipelineNoAccess(refused, "2"),
      ).resolves.toBe(true);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_PIPELINE_NO_ACCESS,
        payload: true,
      });
      expect(mockRefreshPipelines).not.toHaveBeenCalled();
    });

    it.each([
      ["another status", { data: { status: 400 } }],
      ["an error without a status", new Error("Network error")],
      ["no error", null],
    ])("ignores %s", async (_label, error) => {
      const { result } = renderHook(() => useMissingResourceDetection());

      await expect(
        result.current.detectPipelineNoAccess(error, "2"),
      ).resolves.toBe(false);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("checks the boards loaded by the time the request fails", async () => {
      // Requests start on the first render, before the boards are loaded.
      mockPipelines = [];
      const { result, rerender } = renderHook(() =>
        useMissingResourceDetection(),
      );
      const detectStartedEarly = result.current.detectPipelineNoAccess;

      mockPipelines = [{ id: "1", name: "Board 1" }];
      rerender();

      await expect(detectStartedEarly(refused, "1")).resolves.toBe(false);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("ignores a refused request for one of the user's boards, as a capability is missing", async () => {
      const { result } = renderHook(() => useMissingResourceDetection());

      await expect(
        result.current.detectPipelineNoAccess(refused, "1"),
      ).resolves.toBe(false);
      expect(mockRefreshPipelines).toHaveBeenCalledTimes(1);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("detects a board the user was removed from after the page loaded", async () => {
      mockRefreshPipelines.mockResolvedValue([]);
      const { result } = renderHook(() => useMissingResourceDetection());

      await expect(
        result.current.detectPipelineNoAccess(refused, "1"),
      ).resolves.toBe(true);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_PIPELINE_NO_ACCESS,
        payload: true,
      });
    });

    it("does not decide when the boards cannot be reloaded", async () => {
      mockRefreshPipelines.mockResolvedValue(null);
      const { result } = renderHook(() => useMissingResourceDetection());

      await expect(
        result.current.detectPipelineNoAccess(refused, "1"),
      ).resolves.toBe(false);
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });

  describe("detectMissingResources", () => {
    it("detects nothing for a non-matching error", () => {
      const { result } = renderHook(() => useMissingResourceDetection());
      const res = result.current.detectMissingResources({
        messages: ["OTHER_CODE"],
      });
      expect(res).toEqual({
        detected: false,
        pipelineMissing: false,
        stageMissing: false,
        taskMissing: false,
      });
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(toast.info).not.toHaveBeenCalled();
    });

    it("detects pipeline missing and dispatches SET_PIPELINE_MISSING", () => {
      const { result } = renderHook(() => useMissingResourceDetection());
      const res = result.current.detectMissingResources({
        messages: [WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND],
      });
      expect(res.detected).toBe(true);
      expect(res.pipelineMissing).toBe(true);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_PIPELINE_MISSING,
        payload: true,
      });
      expect(toast.info).not.toHaveBeenCalled();
    });

    it("detects stage missing, dispatches SET_STAGE_MISSING, and toasts", () => {
      const { result } = renderHook(() => useMissingResourceDetection());
      const res = result.current.detectMissingResources({
        messages: [WP_QUICKTASKER_EXCEPTION_STAGE_NOT_FOUND],
      });
      expect(res.detected).toBe(true);
      expect(res.stageMissing).toBe(true);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_STAGE_MISSING,
        payload: true,
      });
      expect(toast.info).toHaveBeenCalled();
    });

    it("detects task missing, dispatches SET_TASK_MISSING, and toasts", () => {
      const { result } = renderHook(() => useMissingResourceDetection());
      const res = result.current.detectMissingResources({
        messages: [WP_QUICKTASKER_EXCEPTION_TASK_NOT_FOUND],
      });
      expect(res.detected).toBe(true);
      expect(res.taskMissing).toBe(true);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_TASK_MISSING,
        payload: true,
      });
      expect(toast.info).toHaveBeenCalled();
    });

    it("returns detected: false for a non-object error", () => {
      const { result } = renderHook(() => useMissingResourceDetection());
      const res = result.current.detectMissingResources("some string error");
      expect(res.detected).toBe(false);
    });
  });

  describe("detectMissingPipelineResponse / detectMissingStageResponse", () => {
    it("detectMissingPipelineResponse returns true for pipeline code", () => {
      const { result } = renderHook(() => useMissingResourceDetection());
      expect(
        result.current.detectMissingPipelineResponse({
          messages: [WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND],
        }),
      ).toBe(true);
      expect(
        result.current.detectMissingPipelineResponse({ messages: ["OTHER"] }),
      ).toBe(false);
    });

    it("detectMissingStageResponse returns true for stage code", () => {
      const { result } = renderHook(() => useMissingResourceDetection());
      expect(
        result.current.detectMissingStageResponse({
          messages: [WP_QUICKTASKER_EXCEPTION_STAGE_NOT_FOUND],
        }),
      ).toBe(true);
    });
  });
});
