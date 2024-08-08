import apiFetch from "@wordpress/api-fetch";
import { Pipeline } from "../types/pipeline";

function getPipelineData(pipelineId: string): Promise<Pipeline> {
  return apiFetch({ path: `/wpqt/v1/pipeline/${pipelineId}` });
}

export { getPipelineData };
