import { FaTrello } from "react-icons/fa6";
import { PiLetterCirclePFill } from "react-icons/pi";
import { TbBrandAsana } from "react-icons/tb";
import { PipelineImportSource } from "../../../types/imports";
import WPQTIcon from "./../../../../img/icon-80x80.png";

type Props = {
  selectedImportSource: PipelineImportSource;
  handleImportSourceChange: (source: PipelineImportSource) => void;
};
function ImportSourceSelection({
  selectedImportSource,
  handleImportSourceChange,
}: Props) {
  return (
    <div className="wpqt-flex wpqt-gap-2">
      <div
        data-testid="trello-container"
        className={`wpqt-flex wpqt-items-center wpqt-justify-center wpqt-p-1 wpqt-rounded-lg wpqt-border-none wpqt-cursor-pointer ${
          selectedImportSource === PipelineImportSource.TRELLO
            ? "wpqt-border wpqt-border-blue-500 !wpqt-border-solid"
            : ""
        }`}
        onClick={() => handleImportSourceChange(PipelineImportSource.TRELLO)}
      >
        <FaTrello
          className="wpqt-size-6 wpqt-trello-blue"
          data-testid="trello-icon"
        />
      </div>
      <div
        data-testid="asana-container"
        className={`wpqt-flex wpqt-items-center wpqt-justify-center wpqt-p-1 wpqt-rounded-lg wpqt-border-none wpqt-cursor-pointer ${
          selectedImportSource === PipelineImportSource.ASANA
            ? "wpqt-border wpqt-border-blue-500 !wpqt-border-solid"
            : ""
        }`}
        onClick={() => handleImportSourceChange(PipelineImportSource.ASANA)}
      >
        <TbBrandAsana
          className="wpqt-size-6 wpqt-asana-pink"
          data-testid="asana-icon"
        />
      </div>
      <div
        data-testid="pipedrive-container"
        className={`wpqt-flex wpqt-items-center wpqt-justify-center wpqt-p-1 wpqt-rounded-lg wpqt-border-none wpqt-cursor-pointer ${
          selectedImportSource === PipelineImportSource.PIPEDRIVE
            ? "wpqt-border wpqt-border-blue-500 !wpqt-border-solid"
            : ""
        }`}
        onClick={() => handleImportSourceChange(PipelineImportSource.PIPEDRIVE)}
      >
        <PiLetterCirclePFill
          className="wpqt-size-6 wpqt-pipedrive-green"
          data-testid="pipedrive-icon"
        />
      </div>
      <div
        data-testid="quicktasker-container"
        className={`wpqt-flex wpqt-items-center wpqt-justify-center wpqt-p-1 wpqt-rounded-lg wpqt-border-none wpqt-cursor-pointer ${
          selectedImportSource === PipelineImportSource.QUICKTASKER
            ? "wpqt-border wpqt-border-blue-500 !wpqt-border-solid"
            : ""
        }`}
        onClick={() =>
          handleImportSourceChange(PipelineImportSource.QUICKTASKER)
        }
      >
        <img
          src={WPQTIcon}
          className="wpqt-size-6"
          data-testid="quicktasker-icon"
        />
      </div>
    </div>
  );
}

export { ImportSourceSelection };
