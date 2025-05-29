import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getTasksPdfExportRequest } from "../../api/api";

function useExportActions() {
  const getPipelineTasksPdf = async (pipelineId: string | null) => {
    try {
      const resp = await getTasksPdfExportRequest(pipelineId);

      return {
        success: true,
        data: resp.data,
      };
    } catch (error) {
      toast.error(__("Failed to generate PDF", "quicktasker"));
      console.error(error);

      return {
        success: false,
        data: null,
      };
    }
  };

  return {
    getPipelineTasksPdf,
  };
}

export { useExportActions };
