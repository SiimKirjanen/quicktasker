import { useContext, useRef, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  ADD_UPLOAD,
  ALLOWED_UPLOAD_FILE_TYPES,
  FILE_NAME_REGEX,
  MAX_UPLOAD_FILE_SIZE,
} from "../../../constants";
import { useUploadActions } from "../../../hooks/actions/useUploadActions";
import { UploadContext } from "../../../providers/UploadContextProvider";
import { UploadEntityType } from "../../../types/upload";
import { WPQTButton } from "../../common/Button/Button";

type Props = {
  entityId: string;
  entityType: UploadEntityType;
};
function Uploader({ entityId, entityType }: Props) {
  const { uploadDispatch } = useContext(UploadContext);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { uploadFile } = useUploadActions();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > MAX_UPLOAD_FILE_SIZE) {
        toast.error(
          sprintf(
            __("File size exceeds the maximum limit of %d MB", "quicktasker"),
            MAX_UPLOAD_FILE_SIZE,
          ),
        );
        return;
      }

      if (!FILE_NAME_REGEX.test(selectedFile.name)) {
        toast.error(__("Invalid file name", "quicktasker"));
        return;
      }

      if (selectedFile.size === 0) {
        toast.error(__("The selected file is empty", "quicktasker"));
        return;
      }

      setFile(selectedFile);
    }
  };

  const generateFormData = () => {
    if (!file) {
      return null;
    }

    const formData = new FormData();

    formData.append("file_to_upload", file);
    formData.append("entity_id", entityId);
    formData.append("entity_type", entityType);

    return formData;
  };

  const handleUpload = async () => {
    const formData = generateFormData();

    if (formData) {
      setUploading(true);
      const { data } = await uploadFile(formData);
      if (data) {
        uploadDispatch({
          type: ADD_UPLOAD,
          payload: data.upload,
        });
        resetState();
      }
      setUploading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2 wpqt-items-start">
      <div className="wpqt-max-w-[300px]">
        {sprintf(
          __("Select file to upload (Max size: %d MB)", "quicktasker"),
          MAX_UPLOAD_FILE_SIZE / 1024 / 1024,
        )}
        <br />
        {__(
          "Allowed characters in file name: Latin letters, numbers, underscores, hyphens, and dots.",
          "quicktasker",
        )}
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        accept={ALLOWED_UPLOAD_FILE_TYPES.join(",")}
      />
      {file && (
        <WPQTButton
          btnText={__("Upload", "quicktasker")}
          loading={uploading}
          onClick={handleUpload}
        />
      )}
    </div>
  );
}

export { Uploader };
