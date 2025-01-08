import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useUploadActions } from "../../../hooks/actions/useUploadActions";
import { UploadEntityType } from "../../../types/upload";
import { WPQTButton } from "../../common/Button/Button";

type Props = {
  entityId: string;
  entityType: UploadEntityType;
};
function Uploader({ entityId, entityType }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { uploadFile } = useUploadActions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
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
      const { data, error } = await uploadFile(formData);
      setUploading(false);
    }
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
      <div>{__("Select file to upload", "quicktasker")}</div>
      <input type="file" onChange={handleFileChange} />
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
