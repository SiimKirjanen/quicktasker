import { renderHook } from "@testing-library/react";

jest.mock("../../api/api", () => ({
  updateWPUserPipelinesRequest: jest.fn(),
}));

import * as api from "../../api/api";
import { useWPUserPipelineActions } from "./useWPUserPipelineActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => jest.clearAllMocks());

describe("useWPUserPipelineActions", () => {
  it("passes the saved boards to the callback on success", async () => {
    const update = {
      pipeline_ids: [2],
      removed_pipelines_with_assigned_tasks: [],
    };
    mockedApi.updateWPUserPipelinesRequest.mockResolvedValue({
      success: true,
      messages: [],
      data: update,
    });
    const success = jest.fn();
    const failure = jest.fn();
    const { result } = renderHook(() => useWPUserPipelineActions());

    await result.current.updateWPUserPipelines("u1", ["2"], success, failure);

    expect(mockedApi.updateWPUserPipelinesRequest).toHaveBeenCalledWith("u1", [
      "2",
    ]);
    expect(success).toHaveBeenCalledWith(update);
    expect(failure).not.toHaveBeenCalled();
  });

  it("invokes the failure callback on error", async () => {
    const err = new Error("x");
    mockedApi.updateWPUserPipelinesRequest.mockRejectedValue(err);
    const success = jest.fn();
    const failure = jest.fn();
    const { result } = renderHook(() => useWPUserPipelineActions());

    await result.current.updateWPUserPipelines("u1", [], success, failure);

    expect(failure).toHaveBeenCalledWith(err);
    expect(success).not.toHaveBeenCalled();
  });
});
