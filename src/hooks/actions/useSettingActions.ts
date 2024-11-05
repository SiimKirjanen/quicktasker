import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { saveUserPageCustomStylesRequest } from "../../api/api";

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

  return {
    saveCustomUserPageStyles,
  };
}

export { useSettingActions };
