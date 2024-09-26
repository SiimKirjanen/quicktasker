import apiFetch from "@wordpress/api-fetch";
import { WPQTResponse } from "../../types/response";
import { ServerUserPageStatus } from "../types/user-page-status";
import { UserSession } from "../types/user-session";
import { UserPageOverview } from "../types/user-page-overview";
import { TaskFromServer } from "../../types/task";
import { UserPageTaskResponse } from "../types/user-page-task-response";

function getCommonHeaders() {
  return {
    "Content-Type": "application/json",
    "X-WPQT-USER-API-Nonce": window.wpqt_user.userApiNonce,
  };
}

function getUserPageStatusRequest(
  pageHash: string,
): Promise<WPQTResponse<ServerUserPageStatus>> {
  return apiFetch({
    path: `/wpqt/v1/user-pages/${pageHash}/status`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function setUpUserPageRequest(
  pageHash: string,
  data: { password: string },
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/user-pages/${pageHash}/setup`,
    data,
    method: "POST",
    headers: getCommonHeaders(),
  });
}

function logInUserPageRequest(
  pageHash: string,
  password: string,
): Promise<WPQTResponse<UserSession>> {
  return apiFetch({
    path: `/wpqt/v1/user-pages/${pageHash}/login`,
    method: "POST",
    data: { password },
    headers: getCommonHeaders(),
  });
}

function getOverviewRequest(
  pageHash: string,
): Promise<WPQTResponse<UserPageOverview>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-pages/${pageHash}/overview`,
    headers: getCommonHeaders(),
  });
}

function getAssignedTasksRequest(
  pageHash: string,
): Promise<WPQTResponse<TaskFromServer[]>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-pages/${pageHash}/assigned-tasks`,
    headers: getCommonHeaders(),
  });
}

function getAssignableTasksRequest(
  pageHash: string,
): Promise<WPQTResponse<TaskFromServer[]>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-pages/${pageHash}/assignable-tasks`,
    headers: getCommonHeaders(),
  });
}

function getTaskDataRequest(
  pageHash: string,
  taskHash: string,
): Promise<WPQTResponse<UserPageTaskResponse>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-pages/${pageHash}/tasks/${taskHash}`,
    headers: getCommonHeaders(),
  });
}

function assignTaskToUser(
  pageHash: string,
  taskHash: string,
): Promise<WPQTResponse<TaskFromServer>> {
  return apiFetch({
    method: "POST",
    path: `/wpqt/v1/user-pages/${pageHash}/tasks/${taskHash}/users`,
    headers: getCommonHeaders(),
  });
}

function unAssignTaskFromUser(
  pageHash: string,
  taskHash: string,
): Promise<WPQTResponse<TaskFromServer>> {
  return apiFetch({
    method: "DELETE",
    path: `/wpqt/v1/user-pages/${pageHash}/tasks/${taskHash}/users`,
    headers: getCommonHeaders(),
  });
}

function changeTaskStageRequest(
  pageHash: string,
  taskHash: string,
  stageId: string,
): Promise<WPQTResponse<UserPageTaskResponse>> {
  return apiFetch({
    method: "PATCH",
    path: `/wpqt/v1/user-pages/${pageHash}/tasks/${taskHash}/stage`,
    data: { stageId },
    headers: getCommonHeaders(),
  });
}

function logoutUserPageRequest(pageHash: string): Promise<WPQTResponse> {
  return apiFetch({
    method: "POST",
    path: `/wpqt/v1/user-pages/${pageHash}/logout`,
    headers: getCommonHeaders(),
  });
}

export {
  getUserPageStatusRequest,
  setUpUserPageRequest,
  logInUserPageRequest,
  getOverviewRequest,
  getAssignedTasksRequest,
  getAssignableTasksRequest,
  getTaskDataRequest,
  assignTaskToUser,
  unAssignTaskFromUser,
  changeTaskStageRequest,
  logoutUserPageRequest,
};
