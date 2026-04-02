import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  savePipelineSettingsRequest,
  saveUserPageCustomStylesRequest,
} from "../../api/api";
import { PipelineSettings } from "../../types/pipeline-settings";

function useSettingActions() {
  const saveCustomUserPageStyles = async (
    styles: string,
  ): Promise<{ success: boolean; styles?: string }> => {
    try {
      const response = await saveUserPageCustomStylesRequest(styles);

      toast.success(
        __("Custom tasks app styles saved successfully", "quicktasker"),
      );

      return {
        success: true,
        styles: response.data,
      };
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to save custom tasks app styles", "quicktasker"));

      return {
        success: false,
      };
    }
  };

  const savePipelineSettings = async (
    pipelineId: string,
    pipelineSettings: Partial<PipelineSettings>,
  ): Promise<{ success: boolean }> => {
    try {
      await savePipelineSettingsRequest(pipelineId, pipelineSettings);

      toast.success(
        __("Pipeline settings updated successfully", "quicktasker"),
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to update pipeline settings", "quicktasker"));

      return {
        success: false,
      };
    }
  };

  return {
    saveCustomUserPageStyles,
    savePipelineSettings,
  };
}

export { useSettingActions };
