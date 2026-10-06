import { useContext } from "@wordpress/element";
import { getPipelinesRequest } from "../api/api";
import { PIPELINES_SET } from "../constants";
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

  /**
   * Reloads the boards the user can access, as they may have changed since the page loaded.
   *
   * @returns The IDs of the boards, or null if they could not be loaded.
   */
  async function refreshPipelines(): Promise<string[] | null> {
    try {
      const response = await getPipelinesRequest();
      pipelinesDispatch({ type: PIPELINES_SET, payload: response.data });

      return response.data.map((pipeline) => String(pipeline.id));
    } catch (e) {
      console.error(e);

      return null;
    }
  }

  return {
    pipelines,
    pipelinesDispatch,
    checkIfPipelineNameExists,
    refreshPipelines,
  };
}

export { usePipelines };
