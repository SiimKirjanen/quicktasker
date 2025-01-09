import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getUploadsRequest, uploadFileRequest } from "../../api/api";
import { UploadEntityType } from "../../types/upload";

function useUploadActions() {
  const getUplaods = async (entityId: string, entityType: UploadEntityType) => {
    try {
      const response = await getUploadsRequest(entityId, entityType);

      return { data: response.data, error: null };
    } catch (error) {
      console.error(error);

      return { data: null, error };
    }
  };

  const uploadFile = async (formData: FormData) => {
    try {
      const response = await uploadFileRequest(formData);
      toast.success(__("File uploaded successfully", "quicktasker"));

      return { data: response.data, error: null };
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to upload a file", "quicktasker"));
      return { data: null, error };
    }
  };

  const checkFileExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  return { getUplaods, uploadFile, checkFileExists };
}

export { useUploadActions };
