import { renderHook } from "@testing-library/react";

jest.mock("react-toastify", () => ({
  toast: { info: jest.fn() },
}));

const mockDispatch = jest.fn();
jest.mock("./useMissingContent", () => ({
  useMissingContent: () => ({ pipelineMissing: false, dispatch: mockDispatch }),
}));

import { toast } from "react-toastify";
import {
  SET_PIPELINE_MISSING,
  SET_STAGE_MISSING,
  SET_TASK_MISSING,
  WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_STAGE_NOT_FOUND,
  WP_QUICKTASKER_EXCEPTION_TASK_NOT_FOUND,
} from "../constants";
import { useMissingResourceDetection } from "./useMissingResourceDetection";

beforeEach(() => jest.clearAllMocks());

describe("useMissingResourceDetection", () => {
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
