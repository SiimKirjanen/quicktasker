import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  saveTaskCompletionDoneSettingRequest,
  saveUserPageCustomStylesRequest,
} from "../../api/api";

function useSettingActions() {
  const saveCustomUserPageStyles = async (
    styles: string,
    callback?: (styles: string) => void,
  ) => {
    try {
      const response = await saveUserPageCustomStylesRequest(styles);
      if (callback) callback(response.data);
      toast.success(
        __("Custom user page styles saved successfully", "quicktasker"),
      );
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to save custom user page styles", "quicktasker"));
    }
  };

  const saveTaskCompletionDoneSetting = async (
    pipelineId: string,
    checked: boolean,
    callback?: (checked: boolean) => void,
  ) => {
    try {
      await saveTaskCompletionDoneSettingRequest(pipelineId, checked);
      if (callback) callback(checked);
    } catch (error) {
      if (callback) callback(!checked);
      console.error(error);
      toast.error(__("Failed to save setting", "quicktasker"));
    }
  };

  return {
    saveCustomUserPageStyles,
    saveTaskCompletionDoneSetting,
  };
}

export { useSettingActions };
