import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  importRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { useImportActions } from "./useImportActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useImportActions", () => {
  it("returns success+data on success", async () => {
    mockedApi.importRequest.mockResolvedValue({
      data: { pipelineId: "p1" },
    } as never);
    const { result } = renderHook(() => useImportActions());

    const res = await result.current.importPipeline(
      "trello" as never,
      {} as never,
    );

    expect(res).toEqual({ success: true, data: { pipelineId: "p1" } });
  });

  it("returns failure+error on failure", async () => {
    const err = new Error("x");
    mockedApi.importRequest.mockRejectedValue(err);
    const { result } = renderHook(() => useImportActions());

    const res = await result.current.importPipeline(
      "trello" as never,
      {} as never,
    );

    expect(res).toEqual({ success: false, error: err });
    expect(toast.error).toHaveBeenCalled();
  });
});
