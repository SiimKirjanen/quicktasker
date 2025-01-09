import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { REMOVE_UPLOAD } from "../../../constants";
import { useUploadActions } from "../../../hooks/actions/useUploadActions";
import { AppContext } from "../../../providers/AppContextProvider";
import { UploadContext } from "../../../providers/UploadContextProvider";
import { Upload } from "../../../types/upload";
import { Loading } from "../../Loading/Loading";

type Props = {
  upload: Upload;
};
function UploadedItem({ upload }: Props) {
  const {
    state: { isUserAllowedToDelete, taskUploadsURL },
  } = useContext(AppContext);
  const { uploadDispatch } = useContext(UploadContext);
  const [loading, setLoading] = useState(false);
  const { checkFileExists, deleteUpload } = useUploadActions();
  const downloadUrl = `${taskUploadsURL}/${upload.upload_uuid}/${upload.file_name}`;

  const handleDownloadClick = async () => {
    const fileExists = await checkFileExists(downloadUrl);
    if (!fileExists) {
      toast.error(__("File was not found", "quicktasker"));
    }
  };

  const handleDeleteClick = async () => {
    setLoading(true);
    const { data } = await deleteUpload(upload.id);

    if (data) {
      uploadDispatch({
        type: REMOVE_UPLOAD,
        payload: upload.id,
      });
    }
    setLoading(false);
  };

  const actions = (
    <div className="wpqt-flex wpqt-gap-4 wpqt-justify-end">
      <a
        href={downloadUrl}
        download
        onClick={handleDownloadClick}
        className="focus:wpqt-shadow-none"
      >
        <ArrowDownTrayIcon className="wpqt-icon-blue wpqt-size-4 :hover:wpqt-text-blue-800 wpqt-cursor-pointer" />
      </a>
      {isUserAllowedToDelete && (
        <TrashIcon
          className="wpqt-icon-red wpqt-size-4 :hover:wpqt-text-red-800 wpqt-cursor-pointer"
          onClick={handleDeleteClick}
        />
      )}
    </div>
  );

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-3 wpqt-main-border wpqt-p-2">
      <div className="wpqt-font-semibold">{upload.file_name}</div>
      {loading ? (
        <Loading ovalSize="22" className="!wpqt-items-end" />
      ) : (
        actions
      )}
    </div>
  );
}

export { UploadedItem };
