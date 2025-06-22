import { __ } from "@wordpress/i18n";
import { TaskExportMethods } from "../../../../types/task";

function getModalCtaBtnText(selectedMethod: TaskExportMethods): string {
  switch (selectedMethod) {
    case TaskExportMethods.PDF:
      return __("Export as PDF", "quicktasker");
    case TaskExportMethods.JSON:
      return __("Export as JSON", "quicktasker");
    default:
      return __("Export", "quicktasker");
  }
}

export { getModalCtaBtnText };
