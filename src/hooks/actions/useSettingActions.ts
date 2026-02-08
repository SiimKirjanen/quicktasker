import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  saveTaskCompletionDoneSettingRequest,
  saveUserPageCustomStylesRequest,
} from "../../api/api";

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

  const saveTaskCompletionDoneSetting = async (
    pipelineId: string,
    checked: boolean,
  ): Promise<{ success: boolean; checked?: boolean }> => {
    try {
      await saveTaskCompletionDoneSettingRequest(pipelineId, checked);

      toast.success(
        __("Task completion restriction saved successfully", "quicktasker"),
      );

      return {
        success: true,
        checked,
      };
    } catch (error) {
      console.error(error);
      toast.error(
        __("Failed to save task completion restriction", "quicktasker"),
      );

      return {
        success: false,
      };
    }
  };

  return {
    saveCustomUserPageStyles,
    saveTaskCompletionDoneSetting,
  };
}

export { useSettingActions };
