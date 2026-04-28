import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  savePipelineSettingsRequest: jest.fn(),
  saveUserPageCustomStylesRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { useSettingActions } from "./useSettingActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useSettingActions", () => {
  describe("saveCustomUserPageStyles", () => {
    it("returns success+styles", async () => {
      mockedApi.saveUserPageCustomStylesRequest.mockResolvedValue({
        data: ".x{}",
      } as never);
      const { result } = renderHook(() => useSettingActions());

      const res = await result.current.saveCustomUserPageStyles(".x{}");

      expect(res).toEqual({ success: true, styles: ".x{}" });
    });

    it("returns failure on error", async () => {
      mockedApi.saveUserPageCustomStylesRequest.mockRejectedValue(
        new Error("x"),
      );
      const { result } = renderHook(() => useSettingActions());

      const res = await result.current.saveCustomUserPageStyles(".x{}");

      expect(res).toEqual({ success: false });
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("savePipelineSettings", () => {
    it("returns success", async () => {
      mockedApi.savePipelineSettingsRequest.mockResolvedValue({} as never);
      const { result } = renderHook(() => useSettingActions());

      const res = await result.current.savePipelineSettings("p1", {});

      expect(mockedApi.savePipelineSettingsRequest).toHaveBeenCalledWith(
        "p1",
        {},
      );
      expect(res).toEqual({ success: true });
    });

    it("returns failure", async () => {
      mockedApi.savePipelineSettingsRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useSettingActions());

      const res = await result.current.savePipelineSettings("p1", {});

      expect(res).toEqual({ success: false });
    });
  });
});
