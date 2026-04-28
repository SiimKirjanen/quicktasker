import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  createPipelineRequest: jest.fn(),
  deletePipelineRequest: jest.fn(),
  editPipelineRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { usePipelineActions } from "./usePipelineActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("usePipelineActions", () => {
  describe("addPipeline", () => {
    it("calls successCallback on success", async () => {
      mockedApi.createPipelineRequest.mockResolvedValue({
        data: { id: "p1" },
      } as never);
      const success = jest.fn();
      const { result } = renderHook(() => usePipelineActions());

      await result.current.addPipeline("name", "desc", success);

      expect(mockedApi.createPipelineRequest).toHaveBeenCalledWith(
        "name",
        "desc",
      );
      expect(success).toHaveBeenCalledWith({ id: "p1" });
      expect(toast.success).toHaveBeenCalled();
    });

    it("calls errorCallback on failure", async () => {
      const err = new Error("x");
      mockedApi.createPipelineRequest.mockRejectedValue(err);
      const error = jest.fn();
      const { result } = renderHook(() => usePipelineActions());

      await result.current.addPipeline("n", "d", undefined, error);

      expect(error).toHaveBeenCalledWith(err);
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("editPipeline", () => {
    it("returns success+pipeline on success", async () => {
      mockedApi.editPipelineRequest.mockResolvedValue({
        data: { id: "p1" },
      } as never);
      const { result } = renderHook(() => usePipelineActions());

      const res = await result.current.editPipeline("p1", {} as never);

      expect(res).toEqual({ success: true, pipeline: { id: "p1" } });
    });

    it("returns failure on error", async () => {
      const err = new Error("x");
      mockedApi.editPipelineRequest.mockRejectedValue(err);
      const { result } = renderHook(() => usePipelineActions());

      const res = await result.current.editPipeline("p1", {} as never);

      expect(res).toEqual({ success: false, error: err });
    });
  });

  describe("deletePipeline", () => {
    it("invokes callback with deletedPipelineId + pipelineIdToLoad", async () => {
      mockedApi.deletePipelineRequest.mockResolvedValue({
        data: { deletedPipelineId: "p1", pipelineIdToLoad: "p2" },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => usePipelineActions());

      await result.current.deletePipeline("p1", callback);

      expect(callback).toHaveBeenCalledWith("p1", "p2");
    });

    it("shows error toast on failure", async () => {
      mockedApi.deletePipelineRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => usePipelineActions());

      await result.current.deletePipeline("p1");

      expect(toast.error).toHaveBeenCalled();
    });
  });
});
