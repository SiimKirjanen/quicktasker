import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { PipelineSelection } from "./PipelineSelection";
import { AddPipeline } from "./AddPipeline";

function PipelineHeader() {
  const {
    state: { activePipeline },
  } = useContext(PipelineContext);

  return (
    <div className="wpqt-flex wpqt-p-4 wpqt-gap-1">
      <div className="wpqt-text-lg">{activePipeline?.name}</div>
      <div className="wpqt-ml-auto wpqt-flex wpqt-gap-2">
        <AddPipeline />
        <PipelineSelection />
      </div>
    </div>
  );
}

export { PipelineHeader };
