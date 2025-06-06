import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { importRequest } from "../../api/api";
import { PipelineImportSource, WPQTImport } from "../../types/imports";

function useImportActions() {
  const importPipeline = async (
    source: PipelineImportSource,
    data: WPQTImport,
  ) => {
    try {
      const response = await importRequest(source, data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      toast.error(__("Import failed", "quicktasker"));

      return {
        success: false,
        error: error,
      };
    }
  };

  return {
    importPipeline,
  };
}

export { useImportActions };
