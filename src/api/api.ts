import apiFetch from "@wordpress/api-fetch";
import { Pipeline } from "../types/pipeline";

function getPipelineData(pipelineId: string): Promise<Pipeline> {
  return apiFetch({ path: `/wpqt/v1/pipeline/${pipelineId}` });
}

function moveTaskRequest(
  taskId: string,
  stageId: string,
  order: number
): Promise<void> {
  return apiFetch({
    path: `/wpqt/v1/task/${taskId}/move`,
    method: "PATCH",
    data: { stageId, order },
  });
}

export { getPipelineData, moveTaskRequest };
