import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  addCustomFieldRequest: jest.fn(),
  markCustomFieldAsDeletedRequest: jest.fn(),
  restoreCustomFieldRequest: jest.fn(),
  updateCustomFieldDefaultValueRequest: jest.fn(),
  updateCustomFieldValueRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { useCustomFieldActions } from "./useCustomFieldActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useCustomFieldActions", () => {
  describe("addCustomField", () => {
    it("invokes callback on success", async () => {
      mockedApi.addCustomFieldRequest.mockResolvedValue({
        data: { id: "cf1" },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useCustomFieldActions());

      await result.current.addCustomField(
        "e1",
        "task" as never,
        "text" as never,
        "n",
        "d",
        callback,
      );

      expect(callback).toHaveBeenCalledWith({ id: "cf1" });
    });

    it("toasts error on failure", async () => {
      mockedApi.addCustomFieldRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useCustomFieldActions());

      await result.current.addCustomField(
        "e1",
        "task" as never,
        "text" as never,
        "n",
        "d",
      );

      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("markCustomFieldAsDeleted", () => {
    it("invokes callback on success", async () => {
      mockedApi.markCustomFieldAsDeletedRequest.mockResolvedValue({} as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useCustomFieldActions());

      await result.current.markCustomFieldAsDeleted("cf1", callback);

      expect(callback).toHaveBeenCalled();
    });

    it("toasts error on failure", async () => {
      mockedApi.markCustomFieldAsDeletedRequest.mockRejectedValue(
        new Error("x"),
      );
      const { result } = renderHook(() => useCustomFieldActions());

      await result.current.markCustomFieldAsDeleted("cf1");

      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("restoreCustomField", () => {
    it("invokes callback with restored field", async () => {
      mockedApi.restoreCustomFieldRequest.mockResolvedValue({
        data: { id: "cf1" },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useCustomFieldActions());

      await result.current.restoreCustomField("cf1", callback);

      expect(callback).toHaveBeenCalledWith({ id: "cf1" });
    });

    it("toasts error on failure", async () => {
      mockedApi.restoreCustomFieldRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useCustomFieldActions());

      await result.current.restoreCustomField("cf1", jest.fn());

      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("updateCustomFieldValue", () => {
    it("invokes callback on success", async () => {
      mockedApi.updateCustomFieldValueRequest.mockResolvedValue({} as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useCustomFieldActions());

      await result.current.updateCustomFieldValue(
        "cf1",
        "v",
        "e1",
        "task",
        callback,
      );

      expect(mockedApi.updateCustomFieldValueRequest).toHaveBeenCalledWith(
        "cf1",
        "v",
        "e1",
        "task",
      );
      expect(callback).toHaveBeenCalled();
    });

    it("toasts error on failure", async () => {
      mockedApi.updateCustomFieldValueRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useCustomFieldActions());

      await result.current.updateCustomFieldValue("cf1", "v", "e1", "task");

      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("updateCustomFieldDefaultValue", () => {
    it("returns success", async () => {
      mockedApi.updateCustomFieldDefaultValueRequest.mockResolvedValue(
        {} as never,
      );
      const { result } = renderHook(() => useCustomFieldActions());

      const res = await result.current.updateCustomFieldDefaultValue(
        "cf1",
        "v",
      );

      expect(res).toEqual({ success: true });
    });

    it("returns failure", async () => {
      mockedApi.updateCustomFieldDefaultValueRequest.mockRejectedValue(
        new Error("x"),
      );
      const { result } = renderHook(() => useCustomFieldActions());

      const res = await result.current.updateCustomFieldDefaultValue(
        "cf1",
        "v",
      );

      expect(res).toEqual({ success: false });
    });
  });
});
