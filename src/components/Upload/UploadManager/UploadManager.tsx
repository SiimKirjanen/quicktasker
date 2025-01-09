import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { SET_UPLOADS } from "../../../constants";
import { useUploadActions } from "../../../hooks/actions/useUploadActions";
import { UploadContext } from "../../../providers/UploadContextProvider";
import { UploadEntityType } from "../../../types/upload";
import { Loading } from "../../Loading/Loading";
import { UploadedItem } from "../UploadedItem/UploadedItem";
import { Uploader } from "../Uploader/Uploader";

type Props = {
  entityId: string;
  entityType: UploadEntityType;
};
function UploadManager({ entityId, entityType }: Props) {
  const {
    state: { uploads },
    uploadDispatch,
  } = useContext(UploadContext);
  const [fetchingUploads, setFetchingUploads] = useState(true);
  const { getUplaods } = useUploadActions();

  const fetchUploads = async () => {
    setFetchingUploads(true);
    const { data, error } = await getUplaods(entityId, entityType);
    setFetchingUploads(false);

    if (data && data.uploads) {
      uploadDispatch({
        type: SET_UPLOADS,
        payload: data.uploads,
      });
    }
    if (error) {
      toast.error(__("Failed to fetch uploads", "quicktasker"));
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <div className="wpqt-flex wpqt-gap-2">
      <Uploader entityId={entityId} entityType={entityType} />
      <div className="wpqt-flex wpqt-gap-2 wpqt-flex-wrap wpqt-items-start">
        {fetchingUploads ? (
          <Loading ovalSize="24" />
        ) : (
          uploads.map((upload) => (
            <UploadedItem key={upload.id} upload={upload} />
          ))
        )}
      </div>
    </div>
  );
}

export { UploadManager };
