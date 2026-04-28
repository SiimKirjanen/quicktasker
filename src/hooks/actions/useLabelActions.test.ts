import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  assignLabelToTaskRequest: jest.fn(),
  createPipelineLabelRequest: jest.fn(),
  deleteLabelRequest: jest.fn(),
  getPipelineLabelsRequest: jest.fn(),
  unassignLabelFromTaskRequest: jest.fn(),
  updateLabelRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { useLabelActions } from "./useLabelActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useLabelActions", () => {
  describe("getPipelineLabels", () => {
    it("invokes callback(true, labels) on success", async () => {
      mockedApi.getPipelineLabelsRequest.mockResolvedValue({
        data: { labels: [{ id: "l1" }] },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useLabelActions());

      await result.current.getPipelineLabels("p1", callback);

      expect(callback).toHaveBeenCalledWith(true, [{ id: "l1" }]);
    });

    it("invokes callback(false) on failure", async () => {
      mockedApi.getPipelineLabelsRequest.mockRejectedValue(new Error("x"));
      const callback = jest.fn();
      const { result } = renderHook(() => useLabelActions());

      await result.current.getPipelineLabels("p1", callback);

      expect(callback).toHaveBeenCalledWith(false);
    });
  });

  describe("createPipelineLabel", () => {
    it("success path", async () => {
      mockedApi.createPipelineLabelRequest.mockResolvedValue({
        data: { label: { id: "l1" } },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useLabelActions());

      await result.current.createPipelineLabel("p1", "n", "#fff", callback);

      expect(callback).toHaveBeenCalledWith(true, { id: "l1" });
      expect(toast.success).toHaveBeenCalled();
    });

    it("failure path", async () => {
      mockedApi.createPipelineLabelRequest.mockRejectedValue(new Error("x"));
      const callback = jest.fn();
      const { result } = renderHook(() => useLabelActions());

      await result.current.createPipelineLabel("p1", "n", "#fff", callback);

      expect(callback).toHaveBeenCalledWith(false);
    });
  });

  describe("editLabel", () => {
    it("success path", async () => {
      mockedApi.updateLabelRequest.mockResolvedValue({
        data: { label: { id: "l1" } },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useLabelActions());

      await result.current.editLabel("p1", { id: "l1" } as never, callback);

      expect(callback).toHaveBeenCalledWith(true, { id: "l1" });
    });

    it("failure path", async () => {
      mockedApi.updateLabelRequest.mockRejectedValue(new Error("x"));
      const callback = jest.fn();
      const { result } = renderHook(() => useLabelActions());

      await result.current.editLabel("p1", { id: "l1" } as never, callback);

      expect(callback).toHaveBeenCalledWith(false);
    });
  });

  describe("assignLabelToTask", () => {
    it("returns success+label", async () => {
      mockedApi.assignLabelToTaskRequest.mockResolvedValue({
        data: { label: { id: "l1" } },
      } as never);
      const { result } = renderHook(() => useLabelActions());

      const res = await result.current.assignLabelToTask("p", "t", "l");

      expect(res).toEqual({ success: true, label: { id: "l1" } });
    });

    it("returns success=false on failure", async () => {
      mockedApi.assignLabelToTaskRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useLabelActions());

      const res = await result.current.assignLabelToTask("p", "t", "l");

      expect(res).toEqual({ success: false });
    });
  });

  describe("usassignLabelFromTask", () => {
    it("success", async () => {
      mockedApi.unassignLabelFromTaskRequest.mockResolvedValue({} as never);
      const { result } = renderHook(() => useLabelActions());

      const res = await result.current.usassignLabelFromTask("p", "t", "l");

      expect(res).toEqual({ success: true });
    });

    it("failure", async () => {
      mockedApi.unassignLabelFromTaskRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useLabelActions());

      const res = await result.current.usassignLabelFromTask("p", "t", "l");

      expect(res).toEqual({ success: false });
    });
  });

  describe("deleteLabel", () => {
    it("success path forwards deletedLabel", async () => {
      mockedApi.deleteLabelRequest.mockResolvedValue({
        data: { deletedLabel: { id: "l1" } },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useLabelActions());

      await result.current.deleteLabel("p1", "l1", callback);

      expect(callback).toHaveBeenCalledWith(true, { id: "l1" });
    });

    it("failure path", async () => {
      mockedApi.deleteLabelRequest.mockRejectedValue(new Error("x"));
      const callback = jest.fn();
      const { result } = renderHook(() => useLabelActions());

      await result.current.deleteLabel("p1", "l1", callback);

      expect(callback).toHaveBeenCalledWith(false);
    });
  });
});
