import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  createPipelineAutomationRequest: jest.fn(),
  deletePipelineAutomationsRequest: jest.fn(),
  updateAutomationActiveStatusRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn(), info: jest.fn() },
}));

const mockDispatch = jest.fn();
jest.mock("../../providers/ActivePipelineContextProvider", () => ({
  ActivePipelineContext: { Provider: () => null },
}));
jest.mock("@wordpress/element", () => {
  const actual = jest.requireActual("@wordpress/element");
  return {
    ...actual,
    useContext: () => ({ dispatch: mockDispatch }),
  };
});

import * as api from "../../api/api";
import {
  PIPELINE_ADD_USER_TO_TASK,
  PIPELINE_REMOVE_TASK,
} from "../../constants";
import { AutomationAction } from "../../types/automation";
import { UserTypes } from "../../types/user";
import { useAutomationActions } from "./useAutomationActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("useAutomationActions", () => {
  describe("handleExecutedAutomations", () => {
    it("does nothing when list empty", () => {
      const { result } = renderHook(() => useAutomationActions());
      result.current.handleExecutedAutomations([], "t1");
      expect(toast.info).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("dispatches REMOVE_TASK on ARCHIVE_TASK", () => {
      const { result } = renderHook(() => useAutomationActions());
      result.current.handleExecutedAutomations(
        [
          {
            automation_action: AutomationAction.ARCHIVE_TASK,
          } as never,
        ],
        "t1",
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: PIPELINE_REMOVE_TASK,
        payload: "t1",
      });
      expect(toast.info).toHaveBeenCalled();
    });

    it("dispatches ADD_USER_TO_TASK on ASSIGN_USER with valid user", () => {
      const { result } = renderHook(() => useAutomationActions());
      const user = { id: "u1", user_type: UserTypes.QUICKTASKER };
      result.current.handleExecutedAutomations(
        [
          {
            automation_action: AutomationAction.ASSIGN_USER,
            executionResult: { user, task: {} },
          } as never,
        ],
        "t1",
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: PIPELINE_ADD_USER_TO_TASK,
        payload: { taskId: "t1", user },
      });
    });

    it("does not toast for email actions", () => {
      const { result } = renderHook(() => useAutomationActions());
      result.current.handleExecutedAutomations(
        [
          {
            automation_action: AutomationAction.NEW_ENTITY_EMAIL,
          } as never,
        ],
        "t1",
      );
      expect(toast.info).not.toHaveBeenCalled();
    });
  });

  describe("createAutomation", () => {
    it("success path", async () => {
      mockedApi.createPipelineAutomationRequest.mockResolvedValue({
        data: { id: "a1" },
      } as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useAutomationActions());

      await result.current.createAutomation("p1", {} as never, callback);

      expect(callback).toHaveBeenCalledWith(true, { id: "a1" });
    });

    it("failure path", async () => {
      mockedApi.createPipelineAutomationRequest.mockRejectedValue(
        new Error("x"),
      );
      const callback = jest.fn();
      const { result } = renderHook(() => useAutomationActions());

      await result.current.createAutomation("p1", {} as never, callback);

      expect(callback).toHaveBeenCalledWith(false, null);
    });
  });

  describe("updateAutomationActiveStatus", () => {
    it("returns success+data", async () => {
      mockedApi.updateAutomationActiveStatusRequest.mockResolvedValue({
        data: { id: "a1" },
      } as never);
      const { result } = renderHook(() => useAutomationActions());

      const res = await result.current.updateAutomationActiveStatus(
        "p1",
        "a1",
        true,
      );

      expect(res).toEqual({ success: true, data: { id: "a1" } });
    });

    it("returns failure", async () => {
      mockedApi.updateAutomationActiveStatusRequest.mockRejectedValue(
        new Error("x"),
      );
      const { result } = renderHook(() => useAutomationActions());

      const res = await result.current.updateAutomationActiveStatus(
        "p1",
        "a1",
        false,
      );

      expect(res).toEqual({ success: false, data: null });
    });
  });

  describe("deleteAutomation", () => {
    it("invokes callback(true) on success", async () => {
      mockedApi.deletePipelineAutomationsRequest.mockResolvedValue({} as never);
      const callback = jest.fn();
      const { result } = renderHook(() => useAutomationActions());

      await result.current.deleteAutomation("p1", "a1", callback);

      expect(callback).toHaveBeenCalledWith(true);
    });

    it("invokes callback(false) on failure", async () => {
      mockedApi.deletePipelineAutomationsRequest.mockRejectedValue(
        new Error("x"),
      );
      const callback = jest.fn();
      const { result } = renderHook(() => useAutomationActions());

      await result.current.deleteAutomation("p1", "a1", callback);

      expect(callback).toHaveBeenCalledWith(false);
    });
  });
});
