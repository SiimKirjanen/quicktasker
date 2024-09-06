import apiFetch from "@wordpress/api-fetch";
import {
  FullPipelineDataFromServer,
  Pipeline,
  PipelineFromServer,
} from "../types/pipeline";
import { ArchivedTaskFromServer, Task, TaskFromServer } from "../types/task";
import { Stage, StageChangeDirection, StageFromServer } from "../types/stage";
import { WPQTResponse } from "../types/response";
import { LogFromServer } from "../types/log";
import { WPQTCommentFromServer } from "../types/comment";
import { ServerUser, User } from "../types/user";

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
): Promise<WPQTResponse<FullPipelineDataFromServer>> {
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
  pipelineId: string,
  name: string,
  description: string,
): Promise<WPQTResponse<TaskFromServer>> {
  return apiFetch({
    path: `/wpqt/v1/tasks`,
    method: "POST",
    data: { stageId, name, description, pipelineId },
    headers: getCommonHeaders(),
  });
}

function editTaskRequest(task: Task): Promise<WPQTResponse<TaskFromServer>> {
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

function deleteTaskRequest(taskId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}`,
    method: "DELETE",
    headers: getCommonHeaders(),
  });
}

function archiveTaskRequest(taskId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/archive`,
    method: "PATCH",
    headers: getCommonHeaders(),
  });
}

function getArchivedTasksRequest(): Promise<
  WPQTResponse<ArchivedTaskFromServer[]>
> {
  return apiFetch({
    path: `/wpqt/v1/tasks/archived`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Comment requests
  ==================================================================================================================================================================================================================
*/

function getTaskComments(
  taskId: string,
): Promise<WPQTResponse<WPQTCommentFromServer[]>> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/comments`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function addTaskCommentRequest(
  taskId: string,
  comment: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/comments`,
    data: { comment },
    method: "POST",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Logs requests
  ==================================================================================================================================================================================================================
*/

function getTaskLogs(taskId: string): Promise<WPQTResponse<LogFromServer[]>> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/logs`,
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
): Promise<WPQTResponse<StageFromServer>> {
  return apiFetch({
    path: `/wpqt/v1/stages`,
    method: "POST",
    data: { pipelineId, name, description },
    headers: getCommonHeaders(),
  });
}

function editStageRequest(
  stage: Stage,
): Promise<WPQTResponse<StageFromServer>> {
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
): Promise<WPQTResponse<StageFromServer>> {
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

function archiveStageTasksRequest(stageId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/stages/${stageId}/archive-tasks`,
    method: "PATCH",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  User requests
  ==================================================================================================================================================================================================================
*/

function createUserRequest(
  name: string,
  description: string,
): Promise<WPQTResponse<ServerUser>> {
  return apiFetch({
    path: `/wpqt/v1/users`,
    method: "POST",
    data: { name, description },
    headers: getCommonHeaders(),
  });
}

function editUserRequest(user: User): Promise<WPQTResponse<ServerUser>> {
  return apiFetch({
    path: `/wpqt/v1/users/${user.id}`,
    method: "PATCH",
    data: { user },
    headers: getCommonHeaders(),
  });
}

function changeUserStatusRequest(
  user: User,
  status: boolean,
): Promise<WPQTResponse<ServerUser>> {
  return apiFetch({
    path: `/wpqt/v1/users/${user.id}/status`,
    method: "PATCH",
    data: { status },
    headers: getCommonHeaders(),
  });
}

function assignTaskToUserRequest(
  userId: string,
  taskId: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}/tasks`,
    method: "POST",
    data: { task_id: taskId },
    headers: getCommonHeaders(),
  });
}

function removeTaskFromUserRequest(
  userId: string,
  taskId: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}/tasks`,
    method: "DELETE",
    data: { task_id: taskId },
    headers: getCommonHeaders(),
  });
}

function deleteUserRequest(user: User): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/users/${user.id}`,
    method: "DELETE",
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
  deleteTaskRequest,
  archiveTaskRequest,
  archiveStageTasksRequest,
  getArchivedTasksRequest,
  addTaskCommentRequest,
  getTaskLogs,
  getTaskComments,
  createUserRequest,
  editUserRequest,
  changeUserStatusRequest,
  deleteUserRequest,
  assignTaskToUserRequest,
  removeTaskFromUserRequest,
};
