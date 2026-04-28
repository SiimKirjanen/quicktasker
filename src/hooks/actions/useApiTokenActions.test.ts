import { renderHook } from "@testing-library/react";

jest.mock("../../api/api", () => ({
  deletePipelineApiTokenRequest: jest.fn(),
  postPipelineApiTokenRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { useApiTokenActions } from "./useApiTokenActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useApiTokenActions", () => {
  describe("createApiToken", () => {
    it("returns success+data", async () => {
      mockedApi.postPipelineApiTokenRequest.mockResolvedValue({
        data: { id: "t1" },
      } as never);
      const { result } = renderHook(() => useApiTokenActions());

      const res = await result.current.createApiToken({} as never);

      expect(res).toEqual({ success: true, data: { id: "t1" } });
    });

    it("returns success=false on error", async () => {
      mockedApi.postPipelineApiTokenRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useApiTokenActions());

      const res = await result.current.createApiToken({} as never);

      expect(res).toEqual({ success: false });
    });
  });

  describe("deleteApiToken", () => {
    it("calls api with pipelineId then tokenId", async () => {
      mockedApi.deletePipelineApiTokenRequest.mockResolvedValue({} as never);
      const { result } = renderHook(() => useApiTokenActions());

      const res = await result.current.deleteApiToken("t1", "p1");

      expect(mockedApi.deletePipelineApiTokenRequest).toHaveBeenCalledWith(
        "p1",
        "t1",
      );
      expect(res).toEqual({ success: true });
    });

    it("returns success=false on error", async () => {
      mockedApi.deletePipelineApiTokenRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useApiTokenActions());

      const res = await result.current.deleteApiToken("t1", "p1");

      expect(res).toEqual({ success: false });
    });
  });
});
