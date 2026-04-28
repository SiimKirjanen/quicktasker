import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/user-page-api", () => ({
  assignTaskToUser: jest.fn(),
  changeTaskDoneStatusRequest: jest.fn(),
  changeTaskStageRequest: jest.fn(),
  getTaskDataRequest: jest.fn(),
  unAssignTaskFromUser: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const handleError = jest.fn();
jest.mock("../useErrorHandler", () => ({
  useErrorHandler: () => ({ handleError }),
}));

import * as api from "../../api/user-page-api";
import { useTaskActions } from "./useTaskActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => jest.clearAllMocks());

describe("user-page useTaskActions", () => {
  it("getTask: invokes callback on success, handleError on failure", async () => {
    mockedApi.getTaskDataRequest.mockResolvedValueOnce({
      data: { task: { id: "t1" } },
    } as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useTaskActions());

    await result.current.getTask("h1", callback);
    expect(callback).toHaveBeenCalledWith({ task: { id: "t1" } });

    mockedApi.getTaskDataRequest.mockRejectedValueOnce(new Error("x"));
    await result.current.getTask("h1");
    expect(handleError).toHaveBeenCalled();
  });

  it("assignToTask: forwards task data and toasts success", async () => {
    mockedApi.assignTaskToUser.mockResolvedValue({
      data: { task: { id: "t1" } },
    } as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useTaskActions());

    await result.current.assignToTask("h1", callback);

    expect(callback).toHaveBeenCalledWith({ id: "t1" });
    expect(toast.success).toHaveBeenCalled();
  });

  it("assignToTask: handleError on failure", async () => {
    mockedApi.assignTaskToUser.mockRejectedValue(new Error("x"));
    const { result } = renderHook(() => useTaskActions());

    await result.current.assignToTask("h1");

    expect(handleError).toHaveBeenCalled();
  });

  it("unAssignFromTask: forwards data on success", async () => {
    mockedApi.unAssignTaskFromUser.mockResolvedValue({
      data: { id: "t1" },
    } as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useTaskActions());

    await result.current.unAssignFromTask("h1", callback);

    expect(callback).toHaveBeenCalledWith({ id: "t1" });
  });

  it("changeTaskStage: success path", async () => {
    mockedApi.changeTaskStageRequest.mockResolvedValue({} as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useTaskActions());

    await result.current.changeTaskStage("h1", "s1", callback);

    expect(mockedApi.changeTaskStageRequest).toHaveBeenCalledWith("h1", "s1");
    expect(callback).toHaveBeenCalled();
  });

  it("changeTaskDoneStatus: invokes callback with doneStatus", async () => {
    mockedApi.changeTaskDoneStatusRequest.mockResolvedValue({} as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useTaskActions());

    await result.current.changeTaskDoneStatus("h1", true, callback);

    expect(callback).toHaveBeenCalledWith(true);
    expect(toast.success).toHaveBeenCalled();
  });
});
