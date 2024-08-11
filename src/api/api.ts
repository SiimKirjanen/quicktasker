import apiFetch from "@wordpress/api-fetch";
import { Pipeline } from "../types/pipeline";
import { Task } from "../types/task";
import { Stage } from "../types/stage";

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

function createTaskRequest(stageId: string, name: string): Promise<Task> {
  return apiFetch({
    path: `/wpqt/v1/tasks`,
    method: "POST",
    data: { stageId, name },
  });
}

function createNewStageRequest(
  pipelineId: string,
  name: string
): Promise<Stage> {
  return apiFetch({
    path: `/wpqt/v1/stages`,
    method: "POST",
    data: { pipelineId, name },
  });
}

export {
  getPipelineData,
  moveTaskRequest,
  createTaskRequest,
  createNewStageRequest,
};
