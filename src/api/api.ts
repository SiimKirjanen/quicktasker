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
import { ServerExtendedUser, ServerUser, User } from "../types/user";
import { ServerUserSession } from "../types/user-session";
import { WPQTTypes } from "../types/enums";

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
): Promise<WPQTResponse<TaskFromServer>> {
  return apiFetch({
    path: `/wpqt/v1/tasks`,
    method: "POST",
    data: {
      stageId,
      name,
      pipelineId,
    },
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
      freeForAll: task.free_for_all,
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

function restoreArchivedTaskRequest(taskId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/archive-restore`,
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

function getComments(
  typeId: string,
  type: string,
  isPrivate: boolean,
): Promise<WPQTResponse<WPQTCommentFromServer[]>> {
  const queryParams = new URLSearchParams({
    typeId,
    type,
    isPrivate: isPrivate.toString(),
  }).toString();
  return apiFetch({
    path: `/wpqt/v1/comments?${queryParams}`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function addCommentRequest(
  typeId: string,
  type: string,
  isPrivate: boolean,
  comment: string,
): Promise<WPQTResponse<WPQTCommentFromServer>> {
  return apiFetch({
    path: `/wpqt/v1/comments`,
    data: { comment, typeId, type, isPrivate },
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

function getLogsRequest(
  typeId: string,
  type: WPQTTypes,
): Promise<WPQTResponse<LogFromServer[]>> {
  const queryParams = new URLSearchParams({
    typeId,
    type,
  });
  return apiFetch({
    path: `/wpqt/v1/logs?${queryParams.toString()}`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function addLogRequest(
  typeId: string,
  type: string,
  text: string,
): Promise<WPQTResponse<LogFromServer>> {
  return apiFetch({
    path: `/wpqt/v1/logs`,
    method: "POST",
    data: { typeId, type, text },
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

function getUsersRequest(): Promise<WPQTResponse<ServerUser[]>> {
  return apiFetch({
    path: `/wpqt/v1/users`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function getExtendedUserRequest(
  userId: string,
): Promise<WPQTResponse<ServerExtendedUser>> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}/extended`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

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

function getUserTasksRequest(
  userId: string,
): Promise<WPQTResponse<TaskFromServer[]>> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}/tasks`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  User session requests
  ==================================================================================================================================================================================================================
*/

function getUserSessionsRequest(): Promise<WPQTResponse<ServerUserSession[]>> {
  return apiFetch({
    path: `/wpqt/v1/users/sessions`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function changeUserSessionStatusRequest(
  sessionId: string,
  status: boolean,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/users/sessions/${sessionId}/status`,
    method: "PATCH",
    data: { status },
    headers: getCommonHeaders(),
  });
}

function deleteUserSessionRequest(sessionId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/users/sessions/${sessionId}`,
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
  addCommentRequest,
  getTaskLogs,
  getComments,
  createUserRequest,
  editUserRequest,
  changeUserStatusRequest,
  deleteUserRequest,
  assignTaskToUserRequest,
  removeTaskFromUserRequest,
  getUserSessionsRequest,
  changeUserSessionStatusRequest,
  deleteUserSessionRequest,
  addLogRequest,
  getUserTasksRequest,
  getUsersRequest,
  getExtendedUserRequest,
  restoreArchivedTaskRequest,
  getLogsRequest,
};
