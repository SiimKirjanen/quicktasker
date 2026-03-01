import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  deletePipelineApiTokenRequest,
  postPipelineApiTokenRequest,
} from "../../api/api";
import { ApiTokenFromServer, NewApiToken } from "../../types/api-token";

function useApiTokenActions() {
  async function createApiToken(
    apiToken: NewApiToken,
  ): Promise<{ success: boolean; data?: ApiTokenFromServer }> {
    try {
      const response = await postPipelineApiTokenRequest(apiToken);
      toast.success(__("API token created", "quicktasker"));

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error creating API token:", error);
      toast.error(__("Error creating API token", "quicktasker"));

      return {
        success: false,
      };
    }
  }
  async function deleteApiToken(
    tokenId: string,
    pipelineId: string,
  ): Promise<{ success: boolean }> {
    try {
      await deletePipelineApiTokenRequest(pipelineId, tokenId);
      toast.success(__("API token deleted", "quicktasker"));

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error deleting API token:", error);
      toast.error(__("Error deleting API token", "quicktasker"));

      return {
        success: false,
      };
    }
  }

  return {
    createApiToken,
    deleteApiToken,
  };
}

export { useApiTokenActions };
