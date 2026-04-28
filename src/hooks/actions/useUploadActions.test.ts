import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  deleteUploadRequest: jest.fn(),
  getUploadsRequest: jest.fn(),
  uploadFileRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { useUploadActions } from "./useUploadActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useUploadActions", () => {
  describe("getUplaods", () => {
    it("returns data on success", async () => {
      mockedApi.getUploadsRequest.mockResolvedValue({
        data: [{ id: "u1" }],
      } as never);
      const { result } = renderHook(() => useUploadActions());

      const res = await result.current.getUplaods("e1", "task" as never);

      expect(res).toEqual({ data: [{ id: "u1" }], error: null });
    });

    it("returns error on failure", async () => {
      const err = new Error("x");
      mockedApi.getUploadsRequest.mockRejectedValue(err);
      const { result } = renderHook(() => useUploadActions());

      const res = await result.current.getUplaods("e1", "task" as never);

      expect(res).toEqual({ data: null, error: err });
    });
  });

  describe("uploadFile", () => {
    it("success path", async () => {
      mockedApi.uploadFileRequest.mockResolvedValue({
        data: { id: "u1" },
      } as never);
      const { result } = renderHook(() => useUploadActions());

      const res = await result.current.uploadFile(new FormData());

      expect(res).toEqual({ data: { id: "u1" }, error: null });
      expect(toast.success).toHaveBeenCalled();
    });

    it("failure path", async () => {
      const err = new Error("x");
      mockedApi.uploadFileRequest.mockRejectedValue(err);
      const { result } = renderHook(() => useUploadActions());

      const res = await result.current.uploadFile(new FormData());

      expect(res).toEqual({ data: null, error: err });
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("deleteUpload", () => {
    it("success path", async () => {
      mockedApi.deleteUploadRequest.mockResolvedValue({
        data: { id: "u1" },
      } as never);
      const { result } = renderHook(() => useUploadActions());

      const res = await result.current.deleteUpload("u1");

      expect(res).toEqual({ data: { id: "u1" }, error: null });
    });

    it("failure path", async () => {
      mockedApi.deleteUploadRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useUploadActions());

      const res = await result.current.deleteUpload("u1");

      expect(res.data).toBeNull();
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("checkFileExists", () => {
    it("returns true when fetch ok", async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: true }) as never;
      const { result } = renderHook(() => useUploadActions());

      expect(await result.current.checkFileExists("/x")).toBe(true);
    });

    it("returns false when fetch not ok", async () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false }) as never;
      const { result } = renderHook(() => useUploadActions());

      expect(await result.current.checkFileExists("/x")).toBe(false);
    });

    it("returns false when fetch throws", async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error("x")) as never;
      const { result } = renderHook(() => useUploadActions());

      expect(await result.current.checkFileExists("/x")).toBe(false);
    });
  });
});
