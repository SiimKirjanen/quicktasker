import apiFetch from "@wordpress/api-fetch";
import { Pipeline } from "../types/pipeline";
import { Task } from "../types/task";
import { Stage } from "../types/stage";
import { WPQTResponse } from "../types/response";

function getPipelineData(pipelineId: string): Promise<WPQTResponse<Pipeline>> {
  return apiFetch({ path: `/wpqt/v1/pipeline/${pipelineId}` });
}

function moveTaskRequest(
  taskId: string,
  stageId: string,
  order: number
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/move`,
    method: "PATCH",
    data: { stageId, order },
  });
}

function createTaskRequest(
  stageId: string,
  name: string
): Promise<WPQTResponse<Task>> {
  return apiFetch({
    path: `/wpqt/v1/tasks`,
    method: "POST",
    data: { stageId, name },
  });
}

function createNewStageRequest(
  pipelineId: string,
  name: string
): Promise<WPQTResponse<Stage>> {
  return apiFetch({
    path: `/wpqt/v1/stages`,
    method: "POST",
    data: { pipelineId, name },
  });
}

function deleteStageRequest(stageId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/stages/${stageId}`,
    method: "DELETE",
    data: { stageId },
  });
}

export {
  getPipelineData,
  moveTaskRequest,
  createTaskRequest,
  createNewStageRequest,
  deleteStageRequest,
};
