import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  createPipelineWebhookRequest,
  deletePipelineWebhookRequest,
} from "../../api/api";
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
        webhook: response.data.webhook,
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

  async function deleteWebhook(webhookId: string) {
    try {
      await deletePipelineWebhookRequest(webhookId);
      toast.success(__(`Webhook deleted successfully`, `quicktasker`));

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error deleting webhook:", error);
      toast.error(__(`Failed to delete webhook`, `quicktasker`));

      return {
        success: false,
      };
    }
  }

  return {
    createWebhook,
    deleteWebhook,
  };
}

export { useWebhookActions };
