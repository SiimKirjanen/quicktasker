import { useContext } from "@wordpress/element";
import { updateWPUserPipelinesRequest } from "../../api/api";
import { ADD_WP_USER_PIPELINE_ID } from "../../constants";
import { AppContext } from "../../providers/AppContextProvider";
import { UserContext } from "../../providers/UserContextProvider";
import { WPUserPipelinesUpdate } from "../../types/user";

function useWPUserPipelineActions() {
  const {
    state: { currentUserId },
  } = useContext(AppContext);
  const { userDispatch } = useContext(UserContext);

  const updateWPUserPipelines = async (
    userId: string,
    pipelineIds: string[],
    callback?: (update: WPUserPipelinesUpdate) => void,
    onFailureCallback?: (error: unknown) => void,
    removeIntegrations = false,
  ) => {
    try {
      const response = await updateWPUserPipelinesRequest(
        userId,
        pipelineIds,
        removeIntegrations,
      );
      if (callback) callback(response.data);
    } catch (e) {
      if (onFailureCallback) onFailureCallback(e);
    }
  };

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

  return { updateWPUserPipelines, addCurrentUserToPipeline };
}

export { useWPUserPipelineActions };
