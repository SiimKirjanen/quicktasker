import { renderHook } from "@testing-library/react";
import React from "react";

jest.mock("../../api/api", () => ({
  updateWPUserPipelinesRequest: jest.fn(),
  updateQuicktaskerUserPipelinesRequest: jest.fn(),
}));

import * as api from "../../api/api";
import { ADD_WP_USER_PIPELINE_ID } from "../../constants";
import {
  AppContext,
  initialState as appInitialState,
} from "../../providers/AppContextProvider";
import { UserContext } from "../../providers/UserContextProvider";
import { UserTypes } from "../../types/user";
import { useUserPipelineActions } from "./useUserPipelineActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => jest.clearAllMocks());

describe("useUserPipelineActions", () => {
  it("passes the saved boards to the callback on success", async () => {
    const update = {
      pipeline_ids: [2],
      added_pipeline_ids: [2],
      removed_pipeline_ids: [3],
      stopped_integrations: [],
      removed_pipelines_with_assigned_tasks: [],
    };
    mockedApi.updateWPUserPipelinesRequest.mockResolvedValue({
      success: true,
      messages: [],
      data: update,
    });
    const success = jest.fn();
    const failure = jest.fn();
    const { result } = renderHook(() => useUserPipelineActions());

    await result.current.updateWPUserPipelines(
      "u1",
      ["2"],
      ["3"],
      success,
      failure,
    );

    expect(mockedApi.updateWPUserPipelinesRequest).toHaveBeenCalledWith(
      "u1",
      ["2"],
      ["3"],
    );
    expect(success).toHaveBeenCalledWith(update);
    expect(failure).not.toHaveBeenCalled();
  });

  it("invokes the failure callback on error", async () => {
    const err = new Error("x");
    mockedApi.updateWPUserPipelinesRequest.mockRejectedValue(err);
    const success = jest.fn();
    const failure = jest.fn();
    const { result } = renderHook(() => useUserPipelineActions());

    await result.current.updateWPUserPipelines(
      "u1",
      [],
      ["2"],
      success,
      failure,
    );

    expect(failure).toHaveBeenCalledWith(err);
    expect(success).not.toHaveBeenCalled();
  });

  it("saves a QuickTasker's boards and passes them to the callback", async () => {
    const update = {
      pipeline_ids: [4],
      added_pipeline_ids: [4],
      removed_pipeline_ids: [],
      removed_pipelines_with_assigned_tasks: [],
    };
    mockedApi.updateQuicktaskerUserPipelinesRequest.mockResolvedValue({
      success: true,
      messages: [],
      data: update,
    });
    const success = jest.fn();
    const { result } = renderHook(() => useUserPipelineActions());

    await result.current.updateQuicktaskerUserPipelines(
      "q1",
      ["4"],
      [],
      success,
    );

    expect(
      mockedApi.updateQuicktaskerUserPipelinesRequest,
    ).toHaveBeenCalledWith("q1", ["4"], []);
    expect(success).toHaveBeenCalledWith(update);
  });

  it("invokes the failure callback when saving a QuickTasker's boards fails", async () => {
    const err = new Error("x");
    mockedApi.updateQuicktaskerUserPipelinesRequest.mockRejectedValue(err);
    const failure = jest.fn();
    const { result } = renderHook(() => useUserPipelineActions());

    await result.current.updateQuicktaskerUserPipelines(
      "q1",
      ["4"],
      [],
      jest.fn(),
      failure,
    );

    expect(failure).toHaveBeenCalledWith(err);
  });

  it("saves the boards through the request of the user's type", async () => {
    const update = {
      pipeline_ids: [],
      added_pipeline_ids: [],
      removed_pipeline_ids: [],
      removed_pipelines_with_assigned_tasks: [],
      stopped_integrations: [],
    };
    mockedApi.updateWPUserPipelinesRequest.mockResolvedValue({
      success: true,
      messages: [],
      data: update,
    });
    mockedApi.updateQuicktaskerUserPipelinesRequest.mockResolvedValue({
      success: true,
      messages: [],
      data: update,
    });
    const { result } = renderHook(() => useUserPipelineActions());

    await result.current.updateUserPipelines(
      UserTypes.QUICKTASKER,
      "q1",
      ["1"],
      [],
    );
    await result.current.updateUserPipelines(
      UserTypes.WP_USER,
      "w1",
      [],
      ["2"],
    );

    expect(
      mockedApi.updateQuicktaskerUserPipelinesRequest,
    ).toHaveBeenCalledWith("q1", ["1"], []);
    expect(mockedApi.updateWPUserPipelinesRequest).toHaveBeenCalledWith(
      "w1",
      [],
      ["2"],
    );
  });

  it("adds the current user to a board they created or imported", () => {
    const userDispatch = jest.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppContext.Provider
        value={{
          state: { ...appInitialState, currentUserId: "7" },
          appDispatch: jest.fn(),
        }}
      >
        <UserContext.Provider
          value={{
            state: { users: [], wpUsers: [], usersSearchValue: "" },
            userDispatch,
            updateUsers: jest.fn(),
            updateWPUsers: jest.fn(),
          }}
        >
          {children}
        </UserContext.Provider>
      </AppContext.Provider>
    );
    const { result } = renderHook(() => useUserPipelineActions(), {
      wrapper,
    });

    result.current.addCurrentUserToPipeline("12");

    expect(userDispatch).toHaveBeenCalledWith({
      type: ADD_WP_USER_PIPELINE_ID,
      payload: { userId: "7", pipelineId: 12 },
    });
  });
});
