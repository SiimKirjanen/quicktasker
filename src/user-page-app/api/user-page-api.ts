import apiFetch from "@wordpress/api-fetch";
import { ExecutedAutomation } from "../../types/automation";
import { WPQTCommentFromServer } from "../../types/comment";
import { CustomFieldEntityType } from "../../types/custom-field";
import { WPQTResponse } from "../../types/response";
import { TaskFromServer } from "../../types/task";
import { getUserPageCodeParam } from "../../utils/url";
import { UserPageOverview } from "../types/user-page-overview";
import { ServerUserPageStatus } from "../types/user-page-status";
import { UserPageTaskResponse } from "../types/user-page-task-response";
import { UserPageUserResponse } from "../types/user-page-user-response";
import { UserSession } from "../types/user-session";

type UserPageApiHeaders = {
  "Content-Type": string;
  "X-WPQT-USER-API-Nonce": string;
  "X-WPQT-USER-PAGE-CODE"?: string;
};

function getCommonHeaders() {
  const userPageCode = getUserPageCodeParam();

  let headers: UserPageApiHeaders = {
    "Content-Type": "application/json",
    "X-WPQT-USER-API-Nonce": window.wpqt_user.userApiNonce,
  };

  if (userPageCode) {
    headers = {
      ...headers,
      "X-WPQT-USER-PAGE-CODE": userPageCode,
    };
  }

  return headers;
}

function getUserPageStatusRequest(): Promise<
  WPQTResponse<ServerUserPageStatus>
> {
  return apiFetch({
    path: `/wpqt/v1/user-page/status`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function setUpUserPageRequest(data: {
  password: string;
}): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/user-page/setup`,
    data,
    method: "POST",
    headers: getCommonHeaders(),
  });
}

function logInUserPageRequest(
  password: string,
): Promise<WPQTResponse<UserSession>> {
  return apiFetch({
    path: `/wpqt/v1/user-page/login`,
    method: "POST",
    data: { password },
    headers: getCommonHeaders(),
  });
}

function getOverviewRequest(): Promise<WPQTResponse<UserPageOverview>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/overview`,
    headers: getCommonHeaders(),
  });
}

function getAssignedTasksRequest(): Promise<WPQTResponse<TaskFromServer[]>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/assigned-tasks`,
    headers: getCommonHeaders(),
  });
}

function getAssignableTasksRequest(): Promise<WPQTResponse<TaskFromServer[]>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/assignable-tasks`,
    headers: getCommonHeaders(),
  });
}

function getTaskDataRequest(
  taskHash: string,
): Promise<WPQTResponse<UserPageTaskResponse>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/tasks/${taskHash}`,
    headers: getCommonHeaders(),
  });
}

function assignTaskToUser(taskHash: string): Promise<
  WPQTResponse<{
    task: TaskFromServer;
    executedAutomations: ExecutedAutomation[];
  }>
> {
  return apiFetch({
    method: "POST",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/users`,
    headers: getCommonHeaders(),
  });
}

function unAssignTaskFromUser(
  taskHash: string,
): Promise<WPQTResponse<TaskFromServer>> {
  return apiFetch({
    method: "DELETE",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/users`,
    headers: getCommonHeaders(),
  });
}

function changeTaskStageRequest(
  taskHash: string,
  stageId: string,
): Promise<WPQTResponse> {
  return apiFetch({
    method: "PATCH",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/stage`,
    data: { stageId },
    headers: getCommonHeaders(),
  });
}

function changeTaskDoneStatusRequest(
  taskHash: string,
  isDone: boolean,
): Promise<WPQTResponse> {
  return apiFetch({
    method: "PATCH",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/done`,
    data: { done: isDone },
    headers: getCommonHeaders(),
  });
}

function logoutUserPageRequest(): Promise<WPQTResponse> {
  return apiFetch({
    method: "POST",
    path: `/wpqt/v1/user-page/logout`,
    headers: getCommonHeaders(),
  });
}

function getTaskCommentsRequest(
  taskHash: string,
): Promise<WPQTResponse<WPQTCommentFromServer[]>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/comments`,
    headers: getCommonHeaders(),
  });
}

function addTaskCommentRequest(
  taskHash: string,
  comment: string,
): Promise<WPQTResponse<WPQTCommentFromServer[]>> {
  return apiFetch({
    method: "POST",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/comments`,
    data: { comment },
    headers: getCommonHeaders(),
  });
}

function getUserCommentsRequest(): Promise<
  WPQTResponse<WPQTCommentFromServer[]>
> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/user/comments`,
    headers: getCommonHeaders(),
  });
}

function addUserCommentRequest(
  comment: string,
): Promise<WPQTResponse<WPQTCommentFromServer[]>> {
  return apiFetch({
    method: "POST",
    path: `/wpqt/v1/user-page/user/comments`,
    data: { comment },
    headers: getCommonHeaders(),
  });
}

function getUserPageCommentsRequest(): Promise<
  WPQTResponse<WPQTCommentFromServer[]>
> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/comments`,
    headers: getCommonHeaders(),
  });
}

function getUserPageUserDataRequest(): Promise<
  WPQTResponse<UserPageUserResponse>
> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/user`,
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Custom Field requests
  ==================================================================================================================================================================================================================
*/

function updateCustomFieldValueRequest(
  entityId: string,
  entityType:
    | CustomFieldEntityType.Task
    | CustomFieldEntityType.QUICKTASKER
    | CustomFieldEntityType.WP_USER,
  customFieldId: string,
  value: string,
): Promise<WPQTResponse> {
  return apiFetch({
    method: "PATCH",
    path: `/wpqt/v1/user-page/custom-fields/${customFieldId}`,
    data: { entityId, entityType, customFieldId, value },
    headers: getCommonHeaders(),
  });
}

export {
  addTaskCommentRequest,
  addUserCommentRequest,
  assignTaskToUser,
  changeTaskDoneStatusRequest,
  changeTaskStageRequest,
  getAssignableTasksRequest,
  getAssignedTasksRequest,
  getOverviewRequest,
  getTaskCommentsRequest,
  getTaskDataRequest,
  getUserCommentsRequest,
  getUserPageCommentsRequest,
  getUserPageStatusRequest,
  getUserPageUserDataRequest,
  logInUserPageRequest,
  logoutUserPageRequest,
  setUpUserPageRequest,
  unAssignTaskFromUser,
  updateCustomFieldValueRequest,
};
