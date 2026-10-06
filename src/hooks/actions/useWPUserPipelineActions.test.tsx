import { renderHook } from "@testing-library/react";
import React from "react";

jest.mock("../../api/api", () => ({
  updateWPUserPipelinesRequest: jest.fn(),
}));

import * as api from "../../api/api";
import { ADD_WP_USER_PIPELINE_ID } from "../../constants";
import {
  AppContext,
  initialState as appInitialState,
} from "../../providers/AppContextProvider";
import { UserContext } from "../../providers/UserContextProvider";
import { useWPUserPipelineActions } from "./useWPUserPipelineActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => jest.clearAllMocks());

describe("useWPUserPipelineActions", () => {
  it("passes the saved boards to the callback on success", async () => {
    const update = {
      pipeline_ids: [2],
      deleted_integrations: [],
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

    expect(mockedApi.updateWPUserPipelinesRequest).toHaveBeenCalledWith(
      "u1",
      ["2"],
      false,
    );
    expect(success).toHaveBeenCalledWith(update);
    expect(failure).not.toHaveBeenCalled();
  });

  it("passes on the confirmation to delete the user's API tokens and webhooks", async () => {
    mockedApi.updateWPUserPipelinesRequest.mockResolvedValue({
      success: true,
      messages: [],
      data: {
        pipeline_ids: [],
        deleted_integrations: [],
        removed_pipelines_with_assigned_tasks: [],
      },
    });
    const { result } = renderHook(() => useWPUserPipelineActions());

    await result.current.updateWPUserPipelines(
      "u1",
      [],
      jest.fn(),
      jest.fn(),
      true,
    );

    expect(mockedApi.updateWPUserPipelinesRequest).toHaveBeenCalledWith(
      "u1",
      [],
      true,
    );
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
    const { result } = renderHook(() => useWPUserPipelineActions(), {
      wrapper,
    });

    result.current.addCurrentUserToPipeline("12");

    expect(userDispatch).toHaveBeenCalledWith({
      type: ADD_WP_USER_PIPELINE_ID,
      payload: { userId: "7", pipelineId: 12 },
    });
  });
});
