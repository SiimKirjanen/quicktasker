import apiFetch from "@wordpress/api-fetch";
import { Pipeline } from "../types/pipeline";
import { Task } from "../types/task";
import { Stage } from "../types/stage";
import { WPQTResponse } from "../types/response";

function getCommonHeaders() {
  return {
    "Content-Type": "application/json",
    "X-WPQT-API-Nonce": window.wpqt.apiNonce,
  };
}

function getPipelineData(pipelineId: string): Promise<WPQTResponse<Pipeline>> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}`,
    headers: getCommonHeaders(),
  });
}

function createPipelineRequest(name: string): Promise<WPQTResponse<Pipeline>> {
  return apiFetch({
    path: `/wpqt/v1/pipelines`,
    method: "POST",
    data: { name },
    headers: getCommonHeaders(),
  });
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
    headers: getCommonHeaders(),
  });
}

function createTaskRequest(
  stageId: string,
  name: string,
  description: string
): Promise<WPQTResponse<Task>> {
  return apiFetch({
    path: `/wpqt/v1/tasks`,
    method: "POST",
    data: { stageId, name, description },
    headers: getCommonHeaders(),
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
    headers: getCommonHeaders(),
  });
}

function deleteStageRequest(stageId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/stages/${stageId}`,
    method: "DELETE",
    data: { stageId },
    headers: getCommonHeaders(),
  });
}

export {
  getPipelineData,
  moveTaskRequest,
  createTaskRequest,
  createNewStageRequest,
  deleteStageRequest,
  createPipelineRequest,
};
