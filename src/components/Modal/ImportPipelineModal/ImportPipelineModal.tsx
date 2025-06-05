import { useContext, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { FaTrello } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import { CLOSE_PIPELINE_IMPORT_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { PipelineImportSource } from "../../../types/pipeline";
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTModal } from "../WPQTModal";

function ImportPipelineModal() {
  const {
    state: { pipelineImportModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const [selectedImportSource] = useState(PipelineImportSource.TRELLO);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <WPQTModal
      modalOpen={pipelineImportModalOpen}
      closeModal={() => {
        modalDispatch({ type: CLOSE_PIPELINE_IMPORT_MODAL });
      }}
    >
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
        <div className="wpqt-text-lg">{__("Import board", "quicktasker")}</div>
        <div>
          <div
            className={`wpqt-flex wpqt-items-center wpqt-justify-center wpqt-p-1 wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-cursor-pointer ${
              selectedImportSource === PipelineImportSource.TRELLO
                ? "wpqt-border wpqt-border-blue-500"
                : ""
            }`}
          >
            <FaTrello className="wpqt-size-5 wpqt-trello-blue" />
          </div>
        </div>
        <WPQTIconButton
          text={__("Select import file", "quicktasker")}
          onClick={handleFileButtonClick}
          icon={<MdFileUpload className="wpqt-size-5 wpqt-icon-blue" />}
          className="wpqt-mt-4"
        />
        <input
          type="file"
          ref={fileInputRef}
          id="import-upload"
          className="wpqt-hidden"
          accept=".json"
        />
      </div>
    </WPQTModal>
  );
}

export { ImportPipelineModal };
