import { renderHook } from "@testing-library/react";

jest.mock("../../api/user-page-api", () => ({
  addTaskCommentRequest: jest.fn(),
  addUserCommentRequest: jest.fn(),
  getTaskCommentsRequest: jest.fn(),
  getUserCommentsRequest: jest.fn(),
}));

const handleError = jest.fn();
jest.mock("../useErrorHandler", () => ({
  useErrorHandler: () => ({ handleError }),
}));

import * as api from "../../api/user-page-api";
import { useCommentActions } from "./useCommentActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => jest.clearAllMocks());

describe("user-page useCommentActions", () => {
  it("loadTaskComments forwards data on success", async () => {
    mockedApi.getTaskCommentsRequest.mockResolvedValue({
      data: [{ id: "c1" }],
    } as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useCommentActions());

    await result.current.loadTaskComments("h1", callback);

    expect(callback).toHaveBeenCalledWith([{ id: "c1" }]);
  });

  it("loadTaskComments calls handleError on failure", async () => {
    mockedApi.getTaskCommentsRequest.mockRejectedValue(new Error("x"));
    const { result } = renderHook(() => useCommentActions());

    await result.current.loadTaskComments("h1");

    expect(handleError).toHaveBeenCalled();
  });

  it("addTaskComment forwards data", async () => {
    mockedApi.addTaskCommentRequest.mockResolvedValue({
      data: [{ id: "c1" }],
    } as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useCommentActions());

    await result.current.addTaskComment("h1", "hi", callback);

    expect(mockedApi.addTaskCommentRequest).toHaveBeenCalledWith("h1", "hi");
    expect(callback).toHaveBeenCalledWith([{ id: "c1" }]);
  });

  it("loadUserComments invokes callback with data", async () => {
    mockedApi.getUserCommentsRequest.mockResolvedValue({
      data: [{ id: "c1" }],
    } as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useCommentActions());

    await result.current.loadUserComments(callback);

    expect(callback).toHaveBeenCalledWith([{ id: "c1" }]);
  });

  it("addUserComment invokes callback with data", async () => {
    mockedApi.addUserCommentRequest.mockResolvedValue({
      data: [{ id: "c1" }],
    } as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useCommentActions());

    await result.current.addUserComment("hi", callback);

    expect(mockedApi.addUserCommentRequest).toHaveBeenCalledWith("hi");
    expect(callback).toHaveBeenCalledWith([{ id: "c1" }]);
  });
});
