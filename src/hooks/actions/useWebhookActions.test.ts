import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  createPipelineWebhookRequest: jest.fn(),
  deletePipelineWebhookRequest: jest.fn(),
  editWebhookRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { useWebhookActions } from "./useWebhookActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useWebhookActions", () => {
  describe("createWebhook", () => {
    it("returns webhook on success", async () => {
      mockedApi.createPipelineWebhookRequest.mockResolvedValue({
        data: { webhook: { id: "w1" } },
      } as never);
      const { result } = renderHook(() => useWebhookActions());

      const res = await result.current.createWebhook(
        "p1",
        "task" as never,
        "create" as never,
        "https://x",
        true,
      );

      expect(res).toEqual({ success: true, webhook: { id: "w1" } });
    });

    it("returns null webhook on failure", async () => {
      mockedApi.createPipelineWebhookRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useWebhookActions());

      const res = await result.current.createWebhook(
        "p1",
        "task" as never,
        "create" as never,
        "u",
        false,
      );

      expect(res).toEqual({ success: false, webhook: null });
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("deleteWebhook", () => {
    it("success", async () => {
      mockedApi.deletePipelineWebhookRequest.mockResolvedValue({} as never);
      const { result } = renderHook(() => useWebhookActions());

      const res = await result.current.deleteWebhook("w1");

      expect(res).toEqual({ success: true });
    });

    it("failure", async () => {
      mockedApi.deletePipelineWebhookRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useWebhookActions());

      const res = await result.current.deleteWebhook("w1");

      expect(res).toEqual({ success: false });
    });
  });

  describe("editWebhook", () => {
    it("success", async () => {
      mockedApi.editWebhookRequest.mockResolvedValue({
        data: { webhook: { id: "w1" } },
      } as never);
      const { result } = renderHook(() => useWebhookActions());

      const res = await result.current.editWebhook("w1", { active: true });

      expect(res).toEqual({ success: true, webhook: { id: "w1" } });
    });

    it("failure", async () => {
      mockedApi.editWebhookRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useWebhookActions());

      const res = await result.current.editWebhook("w1", {});

      expect(res).toEqual({ success: false, webhook: null });
    });
  });
});
