import { useContext } from "@wordpress/element";
import { PipelinesContext } from "../providers/PipelinesContextProvider";

function usePipelines() {
  const {
    state: { pipelines },
    pipelinesDispatch,
  } = useContext(PipelinesContext);

  function checkIfPipelineNameExists(pipelineName: string) {
    return pipelines.some(
      (pipeline) => pipeline.name.toLowerCase() === pipelineName.toLowerCase(),
    );
  }

  return {
    pipelines,
    pipelinesDispatch,
    checkIfPipelineNameExists,
  };
}

export { usePipelines };
