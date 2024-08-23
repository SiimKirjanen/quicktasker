import apiFetch from "@wordpress/api-fetch";
import { Pipeline, PipelineFromServer } from "../types/pipeline";
import { Task } from "../types/task";
import { Stage, StageChangeDirection } from "../types/stage";
import { WPQTResponse } from "../types/response";

function getCommonHeaders() {
  return {
    "Content-Type": "application/json",
    "X-WPQT-API-Nonce": window.wpqt.apiNonce,
  };
}

/*
  ==================================================================================================================================================================================================================
  Pipeline requests
  ==================================================================================================================================================================================================================
*/

function getPipelineData(
  pipelineId: string,
): Promise<WPQTResponse<PipelineFromServer>> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}`,
    headers: getCommonHeaders(),
  });
}

function createPipelineRequest(
  name: string,
  description: string,
): Promise<WPQTResponse<PipelineFromServer>> {
  return apiFetch({
    path: `/wpqt/v1/pipelines`,
    method: "POST",
    data: { name, description },
    headers: getCommonHeaders(),
  });
}

function editPipelineRequest(
  pipeline: Pipeline,
): Promise<WPQTResponse<PipelineFromServer>> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipeline.id}`,
    method: "PATCH",
    data: {
      name: pipeline.name,
      description: pipeline.description,
      is_primary: pipeline.is_primary,
    },
    headers: getCommonHeaders(),
  });
}

function setPipelinePrimaryRequest(pipelineId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/set-primary`,
    method: "PATCH",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Task requests
  ==================================================================================================================================================================================================================
*/

function moveTaskRequest(
  taskId: string,
  stageId: string,
  order: number,
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
  description: string,
): Promise<WPQTResponse<Task>> {
  return apiFetch({
    path: `/wpqt/v1/tasks`,
    method: "POST",
    data: { stageId, name, description },
    headers: getCommonHeaders(),
  });
}

function editTaskRequest(task: Task): Promise<WPQTResponse<Task>> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${task.id}`,
    method: "PATCH",
    data: {
      id: task.id,
      name: task.name,
      description: task.description,
    },
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Stage requests
  ==================================================================================================================================================================================================================
*/

function createNewStageRequest(
  pipelineId: string,
  name: string,
  description: string,
): Promise<WPQTResponse<Stage>> {
  return apiFetch({
    path: `/wpqt/v1/stages`,
    method: "POST",
    data: { pipelineId, name, description },
    headers: getCommonHeaders(),
  });
}

function editStageRequest(stage: Stage): Promise<WPQTResponse<Stage>> {
  return apiFetch({
    path: `/wpqt/v1/stages/${stage.id}`,
    method: "PATCH",
    data: { name: stage.name, description: stage.description },
    headers: getCommonHeaders(),
  });
}

function moveStageRequest(
  stageId: string,
  direction: StageChangeDirection,
): Promise<WPQTResponse<Stage>> {
  return apiFetch({
    path: `/wpqt/v1/stages/${stageId}/move`,
    method: "PATCH",
    data: { direction },
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
  editTaskRequest,
  editStageRequest,
  moveStageRequest,
  editPipelineRequest,
  setPipelinePrimaryRequest,
};
