import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  createNewStageRequest: jest.fn(),
  editStageRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const detectMissingResources = jest.fn();
jest.mock("../useMissingResourceDetection", () => ({
  useMissingResourceDetection: () => ({ detectMissingResources }),
}));

import * as api from "../../api/api";
import { useStageActions } from "./useStageActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useStageActions", () => {
  describe("addStage", () => {
    it("success path", async () => {
      mockedApi.createNewStageRequest.mockResolvedValue({
        data: { id: "s1" },
      } as never);
      const success = jest.fn();
      const { result } = renderHook(() => useStageActions());

      await result.current.addStage("p1", "name", "desc", success);

      expect(mockedApi.createNewStageRequest).toHaveBeenCalledWith(
        "p1",
        "name",
        "desc",
      );
      expect(success).toHaveBeenCalledWith({ id: "s1" });
      expect(toast.success).toHaveBeenCalled();
    });

    it("failure path runs errorCallback + missing resource detection", async () => {
      const err = new Error("x");
      mockedApi.createNewStageRequest.mockRejectedValue(err);
      const error = jest.fn();
      const { result } = renderHook(() => useStageActions());

      await result.current.addStage("p1", "n", "d", undefined, error);

      expect(error).toHaveBeenCalledWith(err);
      expect(detectMissingResources).toHaveBeenCalledWith(err);
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("editStage", () => {
    it("success path", async () => {
      mockedApi.editStageRequest.mockResolvedValue({
        data: { id: "s1" },
      } as never);
      const success = jest.fn();
      const { result } = renderHook(() => useStageActions());

      await result.current.editStage({ id: "s1" } as never, success);

      expect(success).toHaveBeenCalledWith({ id: "s1" });
    });

    it("failure path", async () => {
      const err = new Error("x");
      mockedApi.editStageRequest.mockRejectedValue(err);
      const error = jest.fn();
      const { result } = renderHook(() => useStageActions());

      await result.current.editStage({ id: "s1" } as never, undefined, error);

      expect(error).toHaveBeenCalledWith(err);
      expect(detectMissingResources).toHaveBeenCalled();
    });
  });
});
