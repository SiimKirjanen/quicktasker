import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import React from "react";
import { AppContext } from "../../../providers/AppContextProvider";
import { Upload } from "../../../types/upload";
import { WPQTDropdown } from "../WPQTDropdown";

type Props = {
  upload: Upload;
  menuBtnClasses?: string;
};
function UploadInfoDropdown({ upload, menuBtnClasses = "" }: Props) {
  const {
    state: { taskUploadsURL },
  } = useContext(AppContext);
  const downloadUrl = `${taskUploadsURL}/${upload.upload_uuid}/${upload.file_name}`;

  return (
    <WPQTDropdown
      menuBtnClasses={`wpqt-inline-flex ${menuBtnClasses}`}
      anchor="top"
      menuBtn={() => (
        <InformationCircleIcon className={`wpqt-size-5 wpqt-icon-blue`} />
      )}
    >
      <div>
        <UploadInfoItem title={__("File name", "quicktasker")}>
          {upload.file_name}
        </UploadInfoItem>
        <UploadInfoItem title={__("File link", "quicktasker")}>
          <a href={downloadUrl} target="_blank" rel="noreferrer">
            {downloadUrl}
          </a>
        </UploadInfoItem>
        <UploadInfoItem title={__("Created at", "quicktasker")}>
          {upload.created_at}
        </UploadInfoItem>
        <UploadInfoItem title={__("Created by", "quicktasker")}>
          {upload.uploader_name}
        </UploadInfoItem>
      </div>
    </WPQTDropdown>
  );
}

type UploadInfoItemProps = {
  title: string;
  children: React.ReactNode;
};
function UploadInfoItem({ title, children }: UploadInfoItemProps) {
  return (
    <div className="wpqt-mb-2">
      <div className="wpqt-font-semibold wpqt-uppercase">{title}</div>
      <div>{children}</div>
    </div>
  );
}

export { UploadInfoDropdown };
