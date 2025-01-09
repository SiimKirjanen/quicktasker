import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { useUploadActions } from "../../../hooks/actions/useUploadActions";
import { AppContext } from "../../../providers/AppContextProvider";
import { Upload } from "../../../types/upload";

type Props = {
  upload: Upload;
};
function UploadedItem({ upload }: Props) {
  const {
    state: { isUserAllowedToDelete, taskUploadsURL },
  } = useContext(AppContext);
  const { checkFileExists } = useUploadActions();
  const downloadUrl = `${taskUploadsURL}/${upload.upload_uuid}/${upload.file_name}`;

  const handleDownloadClick = async () => {
    const fileExists = await checkFileExists(downloadUrl);
    if (!fileExists) {
      toast.error(__("File was not found", "quicktasker"));
    }
  };

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-3 wpqt-main-border wpqt-p-2">
      <div className="wpqt-font-semibold">{upload.file_name}</div>
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
          <TrashIcon className="wpqt-icon-red wpqt-size-4 :hover:wpqt-text-red-800 wpqt-cursor-pointer" />
        )}
      </div>
    </div>
  );
}

export { UploadedItem };
