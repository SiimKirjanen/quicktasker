import { __ } from "@wordpress/i18n";
import { CustomFieldEntityType } from "../types/custom-field";

const CustomFieldEntityTypeString: { [key in CustomFieldEntityType]: string } =
  {
    [CustomFieldEntityType.Pipeline]: __("Board", "quicktasker"),
    [CustomFieldEntityType.Task]: __("Task", "quicktasker"),
    [CustomFieldEntityType.User]: __("User", "quicktasker"),
    [CustomFieldEntityType.Users]: __("Global users", "quicktasker"),
  };
export { CustomFieldEntityTypeString };
