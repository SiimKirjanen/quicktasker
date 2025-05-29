import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getTasksPdfExportRequest } from "../../api/api";

function useExportActions() {
  const getPipelineTasksPdf = async (pipelineId: string | null) => {
    try {
      const resp = await getTasksPdfExportRequest(pipelineId);
    } catch (error) {
      toast.error(__("Failed to generate PDF", "quicktasker"));
    }
  };

  return {
    getPipelineTasksPdf,
  };
}

export { useExportActions };
