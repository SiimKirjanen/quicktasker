import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  createPipelineWebhookRequest,
  deletePipelineWebhookRequest,
  editWebhookRequest,
} from "../../api/api";
import {
  Webhook,
  WebhookTargetAction,
  WebhookTargetType,
} from "../../types/webhook";

function useWebhookActions() {
  async function createWebhook(
    pipelineId: string,
    targetType: WebhookTargetType,
    targetAction: WebhookTargetAction,
    webhookUrl: string,
    webhookConfirm: boolean,
  ) {
    try {
      const response = await createPipelineWebhookRequest(
        pipelineId,
        targetType,
        targetAction,
        webhookUrl,
        webhookConfirm,
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

  async function editWebhook(webhookId: string, data: Partial<Webhook>) {
    try {
      const response = await editWebhookRequest(webhookId, data);

      return {
        success: true,
        webhook: response.data.webhook,
      };
    } catch (error) {
      console.error("Error editing webhook:", error);
      toast.error(__(`Failed to edit webhook`, `quicktasker`));
      return {
        success: false,
        webhook: null,
      };
    }
  }

  return {
    createWebhook,
    editWebhook,
    deleteWebhook,
  };
}

export { useWebhookActions };
