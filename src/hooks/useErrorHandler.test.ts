import { renderHook } from "@testing-library/react";

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn() },
}));

import { toast } from "react-toastify";
import { useErrorHandler } from "./useErrorHandler";

beforeEach(() => jest.clearAllMocks());

describe("useErrorHandler", () => {
  describe("getMessagesFromResponse", () => {
    it("returns [] for non-object values", () => {
      const { result } = renderHook(() => useErrorHandler());
      expect(result.current.getMessagesFromResponse(null)).toEqual([]);
      expect(result.current.getMessagesFromResponse("string")).toEqual([]);
      expect(result.current.getMessagesFromResponse(42)).toEqual([]);
    });

    it("returns [] when messages field is missing", () => {
      const { result } = renderHook(() => useErrorHandler());
      expect(result.current.getMessagesFromResponse({ code: 400 })).toEqual([]);
    });

    it("returns [] when messages is not an array", () => {
      const { result } = renderHook(() => useErrorHandler());
      expect(
        result.current.getMessagesFromResponse({ messages: "oops" }),
      ).toEqual([]);
    });

    it("returns the messages array when present", () => {
      const { result } = renderHook(() => useErrorHandler());
      expect(
        result.current.getMessagesFromResponse({ messages: ["err1", "err2"] }),
      ).toEqual(["err1", "err2"]);
    });
  });

  describe("displayErrorMessages", () => {
    it("calls toast.error with joined messages when messages are present", async () => {
      const { result } = renderHook(() => useErrorHandler());
      await result.current.displayErrorMessages({
        messages: ["Error A", "Error B"],
      });
      expect(toast.error).toHaveBeenCalledWith("Error A, Error B");
    });

    it("does not call toast.error when messages array is empty", async () => {
      const { result } = renderHook(() => useErrorHandler());
      await result.current.displayErrorMessages({ messages: [] });
      expect(toast.error).not.toHaveBeenCalled();
    });

    it("does not call toast.error when messages field is missing", async () => {
      const { result } = renderHook(() => useErrorHandler());
      await result.current.displayErrorMessages({});
      expect(toast.error).not.toHaveBeenCalled();
    });
  });
});
