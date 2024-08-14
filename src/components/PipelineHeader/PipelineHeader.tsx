import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { PipelineSelection } from "./PipelineSelection";

function PipelineHeader() {
  const {
    state: { pipeline },
  } = useContext(PipelineContext);

  return (
    <div className="wpqt-flex wpqt-p-4">
      <div className="wpqt-text-lg">{pipeline?.name}</div>
      <div className="wpqt-ml-auto">
        <PipelineSelection />
      </div>
    </div>
  );
}

export { PipelineHeader };
