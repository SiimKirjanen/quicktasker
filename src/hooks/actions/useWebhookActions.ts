import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { createPipelineWebhookRequest } from "../../api/api";
import { WebhookTargetAction, WebhookTargetType } from "../../types/webhook";

function useWebhookActions() {
  async function createWebhook(
    pipelineId: string,
    targetType: WebhookTargetType,
    targetAction: WebhookTargetAction,
    webhookUrl: string,
  ) {
    try {
      const response = await createPipelineWebhookRequest(
        pipelineId,
        targetType,
        targetAction,
        webhookUrl,
      );

      return {
        success: true,
        webhook: response.data,
      };
    } catch (error) {
      console.error("Error creating webhook:", error);
      toast.error(__(`Failed to create webhook`, `quicktasker`));
      return {
        success: false,
        webhook: null,
      };
    }
  }

  return {
    createWebhook,
  };
}

export { useWebhookActions };
