import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  changeUserStatusRequest: jest.fn(),
  createUserRequest: jest.fn(),
  deleteUserRequest: jest.fn(),
  editUserRequest: jest.fn(),
  resetUserPasswordRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { useUserActions } from "./useUserActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useUserActions", () => {
  describe("createUser", () => {
    it("success path", async () => {
      mockedApi.createUserRequest.mockResolvedValue({
        data: { id: "u1" },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useUserActions());

      await result.current.createUser("name", "desc", callback);

      expect(callback).toHaveBeenCalledWith({ id: "u1" });
      expect(toast.success).toHaveBeenCalled();
    });

    it("failure path", async () => {
      mockedApi.createUserRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useUserActions());

      await result.current.createUser("n", "d");

      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("editUser", () => {
    it("returns success+user", async () => {
      mockedApi.editUserRequest.mockResolvedValue({
        data: { id: "u1" },
      } as never);
      const { result } = renderHook(() => useUserActions());

      const res = await result.current.editUser("u1", {} as never);

      expect(res).toEqual({ success: true, user: { id: "u1" } });
    });

    it("returns success=false on error", async () => {
      mockedApi.editUserRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useUserActions());

      const res = await result.current.editUser("u1", {} as never);

      expect(res).toEqual({ success: false });
    });
  });

  describe("changeUserStatus", () => {
    it("invokes callback on success", async () => {
      mockedApi.changeUserStatusRequest.mockResolvedValue({
        data: { id: "u1" },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useUserActions());

      await result.current.changeUserStatus("u1", true, callback);

      expect(mockedApi.changeUserStatusRequest).toHaveBeenCalledWith(
        "u1",
        true,
      );
      expect(callback).toHaveBeenCalledWith({ id: "u1" });
    });

    it("toasts error on failure", async () => {
      mockedApi.changeUserStatusRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useUserActions());

      await result.current.changeUserStatus("u1", true);

      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("deleteUser", () => {
    it("invokes callback with userId on success", async () => {
      mockedApi.deleteUserRequest.mockResolvedValue({} as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useUserActions());

      await result.current.deleteUser("u1", callback);

      expect(callback).toHaveBeenCalledWith("u1");
    });

    it("toasts error on failure", async () => {
      mockedApi.deleteUserRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useUserActions());

      await result.current.deleteUser("u1");

      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("resetUserPassword", () => {
    it("invokes callback with userId on success", async () => {
      mockedApi.resetUserPasswordRequest.mockResolvedValue({} as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useUserActions());

      await result.current.resetUserPassword("u1", callback);

      expect(callback).toHaveBeenCalledWith("u1");
    });

    it("toasts error on failure", async () => {
      mockedApi.resetUserPasswordRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useUserActions());

      await result.current.resetUserPassword("u1");

      expect(toast.error).toHaveBeenCalled();
    });
  });
});
