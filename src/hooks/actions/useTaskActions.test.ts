import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  archiveTaskRequest: jest.fn(),
  cleanArchiveTasksRequest: jest.fn(),
  deleteTaskRequest: jest.fn(),
  editTaskRequest2: jest.fn(),
  markTaskDoneRequest: jest.fn(),
  moveTaskRequest: jest.fn(),
  removeTaskFromUserRequest: jest.fn(),
  restoreArchivedTaskRequest: jest.fn(),
  updateTaskFocusColorRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const handleExecutedAutomations = jest.fn();
const displayErrorMessages = jest.fn();
const getMessagesFromResponse = jest.fn(() => ["err"]);
const detectMissingResources = jest.fn();

jest.mock("../useErrorHandler", () => ({
  useErrorHandler: () => ({ displayErrorMessages, getMessagesFromResponse }),
}));
jest.mock("../useMissingResourceDetection", () => ({
  useMissingResourceDetection: () => ({ detectMissingResources }),
}));
jest.mock("./useAutomationActions", () => ({
  useAutomationActions: () => ({ handleExecutedAutomations }),
}));

import * as api from "../../api/api";
import { useTaskActions } from "./useTaskActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useTaskActions", () => {
  describe("deleteTask", () => {
    it("calls api, success toast, automations, callback on success", async () => {
      mockedApi.deleteTaskRequest.mockResolvedValue({
        data: { executedAutomations: [{ id: "a" }] },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.deleteTask("t1", callback);

      expect(mockedApi.deleteTaskRequest).toHaveBeenCalledWith("t1");
      expect(callback).toHaveBeenCalledWith({ success: true, taskId: "t1" });
      expect(toast.success).toHaveBeenCalled();
      expect(handleExecutedAutomations).toHaveBeenCalledWith(
        [{ id: "a" }],
        "t1",
      );
    });

    it("calls callback with success=false and shows error toast on failure", async () => {
      mockedApi.deleteTaskRequest.mockRejectedValue(new Error("nope"));
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.deleteTask("t1", callback);

      expect(callback).toHaveBeenCalledWith({ success: false, taskId: "t1" });
      expect(toast.error).toHaveBeenCalled();
      expect(detectMissingResources).toHaveBeenCalled();
    });
  });

  describe("archiveTask", () => {
    it("success path", async () => {
      mockedApi.archiveTaskRequest.mockResolvedValue({} as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.archiveTask("t1", "p1", callback);

      expect(mockedApi.archiveTaskRequest).toHaveBeenCalledWith("t1", "p1");
      expect(callback).toHaveBeenCalledWith({ success: true, taskId: "t1" });
      expect(toast.success).toHaveBeenCalled();
    });

    it("failure path", async () => {
      mockedApi.archiveTaskRequest.mockRejectedValue(new Error("x"));
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.archiveTask("t1", "p1", callback);

      expect(callback).toHaveBeenCalledWith({ success: false, taskId: "t1" });
      expect(toast.error).toHaveBeenCalled();
    });
  });

  describe("restoreArchivedTask", () => {
    it("success path with empty messages", async () => {
      mockedApi.restoreArchivedTaskRequest.mockResolvedValue({} as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.restoreArchivedTask("t1", "b1", callback);

      expect(callback).toHaveBeenCalledWith({ success: true, messages: [] });
    });

    it("failure path forwards error messages", async () => {
      mockedApi.restoreArchivedTaskRequest.mockRejectedValue(new Error("x"));
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.restoreArchivedTask("t1", "b1", callback);

      expect(callback).toHaveBeenCalledWith({
        success: false,
        messages: ["err"],
      });
    });
  });

  describe("changeTaskDoneStatus", () => {
    it("invokes callback + automations on success", async () => {
      mockedApi.markTaskDoneRequest.mockResolvedValue({
        data: { executedAutomations: [] },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.changeTaskDoneStatus("t1", true, callback);

      expect(mockedApi.markTaskDoneRequest).toHaveBeenCalledWith("t1", true);
      expect(callback).toHaveBeenCalledWith(true);
      expect(handleExecutedAutomations).toHaveBeenCalled();
    });

    it("displays error messages on failure", async () => {
      mockedApi.markTaskDoneRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useTaskActions());

      await result.current.changeTaskDoneStatus("t1", true);

      expect(displayErrorMessages).toHaveBeenCalled();
      expect(detectMissingResources).toHaveBeenCalled();
    });
  });

  describe("moveTask", () => {
    it("callback(true) on success", async () => {
      mockedApi.moveTaskRequest.mockResolvedValue({} as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.moveTask("t1", "s1", 2, "p1", callback);

      expect(mockedApi.moveTaskRequest).toHaveBeenCalledWith(
        "t1",
        "s1",
        2,
        "p1",
      );
      expect(callback).toHaveBeenCalledWith(true);
    });

    it("callback(false) on failure", async () => {
      mockedApi.moveTaskRequest.mockRejectedValue(new Error("x"));
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.moveTask("t1", "s1", 2, "p1", callback);

      expect(callback).toHaveBeenCalledWith(false);
    });
  });

  describe("updateTaskFocusColor", () => {
    it("returns success payload on success", async () => {
      mockedApi.updateTaskFocusColorRequest.mockResolvedValue({} as never);
      const { result } = renderHook(() => useTaskActions());

      const res = await result.current.updateTaskFocusColor("t1", "red");

      expect(res).toEqual({ success: true, taskId: "t1", color: "red" });
    });

    it("returns failure payload on failure", async () => {
      mockedApi.updateTaskFocusColorRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useTaskActions());

      const res = await result.current.updateTaskFocusColor("t1", "red");

      expect(res).toEqual({ success: false, taskId: "t1", color: "red" });
    });
  });

  describe("cleanupTaskArchive", () => {
    it("returns deletedTaskIds on success", async () => {
      mockedApi.cleanArchiveTasksRequest.mockResolvedValue({
        data: { deletedTaskIds: ["a", "b"] },
      } as never);
      const { result } = renderHook(() => useTaskActions());

      const res = await result.current.cleanupTaskArchive();

      expect(res).toEqual({ success: true, deletedTaskIds: ["a", "b"] });
    });

    it("returns empty list on failure", async () => {
      mockedApi.cleanArchiveTasksRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useTaskActions());

      const res = await result.current.cleanupTaskArchive();

      expect(res).toEqual({ success: false, deletedTaskIds: [] });
    });
  });

  describe("editTask", () => {
    it("returns the task on success", async () => {
      mockedApi.editTaskRequest2.mockResolvedValue({
        data: { id: "t1" },
      } as never);
      const { result } = renderHook(() => useTaskActions());

      const res = await result.current.editTask("t1", {} as never);

      expect(res).toEqual({ success: true, task: { id: "t1" } });
    });

    it("returns null task on failure", async () => {
      mockedApi.editTaskRequest2.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useTaskActions());

      const res = await result.current.editTask("t1", {} as never);

      expect(res).toEqual({ success: false, task: null });
    });
  });

  describe("removeTaskFromUser", () => {
    it("calls api with QUICKTASKER user type and runs callback", async () => {
      mockedApi.removeTaskFromUserRequest.mockResolvedValue({
        data: { executedAutomations: [] },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useTaskActions());

      await result.current.removeTaskFromUser("u1", "t1", callback);

      expect(mockedApi.removeTaskFromUserRequest).toHaveBeenCalledWith(
        "u1",
        "t1",
        "quicktasker",
      );
      expect(callback).toHaveBeenCalled();
    });

    it("error toast on failure", async () => {
      mockedApi.removeTaskFromUserRequest.mockRejectedValue(new Error("x"));
      const { result } = renderHook(() => useTaskActions());

      await result.current.removeTaskFromUser("u1", "t1");

      expect(toast.error).toHaveBeenCalled();
      expect(detectMissingResources).toHaveBeenCalled();
    });
  });
});
