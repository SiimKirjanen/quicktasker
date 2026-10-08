import { useContext } from "@wordpress/element";
import {
  updateQuicktaskerUserPipelinesRequest,
  updateWPUserPipelinesRequest,
} from "../../api/api";
import { ADD_WP_USER_PIPELINE_ID } from "../../constants";
import { AppContext } from "../../providers/AppContextProvider";
import { UserContext } from "../../providers/UserContextProvider";
import {
  UserPipelinesUpdate,
  UserTypes,
  WPUserPipelinesUpdate,
} from "../../types/user";

function useUserPipelineActions() {
  const {
    state: { currentUserId },
  } = useContext(AppContext);
  const { userDispatch } = useContext(UserContext);

  const updateWPUserPipelines = async (
    userId: string,
    addPipelineIds: string[],
    removePipelineIds: string[],
    callback?: (update: WPUserPipelinesUpdate) => void,
    onFailureCallback?: (error: unknown) => void,
  ) => {
    try {
      const response = await updateWPUserPipelinesRequest(
        userId,
        addPipelineIds,
        removePipelineIds,
      );
      if (callback) callback(response.data);
    } catch (e) {
      if (onFailureCallback) onFailureCallback(e);
    }
  };

  const updateQuicktaskerUserPipelines = async (
    userId: string,
    addPipelineIds: string[],
    removePipelineIds: string[],
    callback?: (update: UserPipelinesUpdate) => void,
    onFailureCallback?: (error: unknown) => void,
  ) => {
    try {
      const response = await updateQuicktaskerUserPipelinesRequest(
        userId,
        addPipelineIds,
        removePipelineIds,
      );
      if (callback) callback(response.data);
    } catch (e) {
      if (onFailureCallback) onFailureCallback(e);
    }
  };

  /**
   * Adds a user of either type to some boards and removes them from others.
   */
  const updateUserPipelines = (
    userType: UserTypes,
    userId: string,
    addPipelineIds: string[],
    removePipelineIds: string[],
    callback?: (update: UserPipelinesUpdate) => void,
    onFailureCallback?: (error: unknown) => void,
  ) =>
    userType === UserTypes.WP_USER
      ? updateWPUserPipelines(
          userId,
          addPipelineIds,
          removePipelineIds,
          callback,
          onFailureCallback,
        )
      : updateQuicktaskerUserPipelines(
          userId,
          addPipelineIds,
          removePipelineIds,
          callback,
          onFailureCallback,
        );

  /**
   * The server adds whoever creates or imports a board to it, so the current
   * user's boards in the loaded user data are updated to match.
   */
  const addCurrentUserToPipeline = (pipelineId: string) => {
    userDispatch({
      type: ADD_WP_USER_PIPELINE_ID,
      payload: { userId: currentUserId, pipelineId: Number(pipelineId) },
    });
  };

  return {
    updateWPUserPipelines,
    updateQuicktaskerUserPipelines,
    updateUserPipelines,
    addCurrentUserToPipeline,
  };
}

export { useUserPipelineActions };
