import apiFetch from "@wordpress/api-fetch";
import { ServerLogsFilterType } from "../pages/LogsPage/components/LogsPageContent/LogsPageContent";
import { AutomationCreationState } from "../reducers/automation-creation-reducer";
import {
  Automation,
  AutomationFromServer,
  ExecutedAutomation,
} from "../types/automation";
import { WPUserCapabilities } from "../types/capabilities";
import { WPQTCommentFromServer } from "../types/comment";
import { CustomField, CustomFieldEntityType } from "../types/custom-field";
import {
  WPQTArchiveDoneFilter,
  WPQTArchiveOrder,
  WPQTArvhiveTaskLimit,
  WPQTTypes,
} from "../types/enums";
import { PipelineImportSource, WPQTImport } from "../types/imports";
import { Label } from "../types/label";
import { LogFromServer } from "../types/log";
import { PipelineOverviewFilter } from "../types/overview";
import {
  FullPipelineDataFromServer,
  Pipeline,
  PipelineFromServer,
} from "../types/pipeline";
import { PipelineSettingsFromServer } from "../types/pipeline-settings";
import { DeletePipelineResponse } from "../types/requestResponse/delete-pipeline-response";
import { PipelineOverviewResponse } from "../types/requestResponse/pipeline-overview-response";
import { WPQTResponse } from "../types/response";
import { Stage, StageChangeDirection, StageFromServer } from "../types/stage";
import { Task, TaskFromServer } from "../types/task";
import { Upload, UploadEntityType } from "../types/upload";
import {
  ServerExtendedUser,
  ServerUser,
  User,
  UserTypes,
  WPUser,
} from "../types/user";
import { ServerUserSession } from "../types/user-session";

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

function deletePipelineRequest(
  pipelineId: string,
): Promise<WPQTResponse<DeletePipelineResponse>> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}`,
    method: "DELETE",
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
): Promise<
  WPQTResponse<{
    newTask: TaskFromServer;
    executedAutomations: ExecutedAutomation[];
  }>
> {
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
      dueDate: task.due_date,
    },
    headers: getCommonHeaders(),
  });
}

function deleteTaskRequest(taskId: string): Promise<
  WPQTResponse<{
    executedAutomations: ExecutedAutomation[];
  }>
> {
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

function restoreArchivedTaskRequest(
  taskId: string,
  boardId: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/archive-restore`,
    method: "PATCH",
    data: { boardId },
    headers: getCommonHeaders(),
  });
}

function getArchivedTasksRequest(filter: {
  search: string;
  pipelineId: string;
  doneFilter: WPQTArchiveDoneFilter;
  limit: WPQTArvhiveTaskLimit;
  order: WPQTArchiveOrder;
}): Promise<WPQTResponse<TaskFromServer[]>> {
  const queryParams = new URLSearchParams();

  if (filter.search) {
    queryParams.set("search", filter.search);
  }
  if (filter.pipelineId) {
    queryParams.set("pipelineId", filter.pipelineId);
  }
  if (filter.doneFilter) {
    queryParams.set("status", filter.doneFilter);
  }
  if (filter.limit !== null) {
    queryParams.set("limit", String(filter.limit));
  }
  if (filter.order) {
    queryParams.set("order", filter.order);
  }

  return apiFetch({
    path: `/wpqt/v1/tasks/archived?${queryParams}`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function markTaskDoneRequest(
  taskId: string,
  done: boolean,
): Promise<
  WPQTResponse<{
    task: Task;
    executedAutomations: ExecutedAutomation[];
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/done`,
    method: "PATCH",
    data: { done },
    headers: getCommonHeaders(),
  });
}

function updateTaskFocusColorRequest(
  taskId: string,
  color: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/tasks/${taskId}/focus-color`,
    method: "PATCH",
    data: { color },
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
): Promise<
  WPQTResponse<{
    newComment: WPQTCommentFromServer;
  }>
> {
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

function getGlobalLogsRequest(
  logsFilter: ServerLogsFilterType,
): Promise<WPQTResponse<LogFromServer[]>> {
  const queryParams = new URLSearchParams(
    Object.entries(logsFilter).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  return apiFetch({
    path: `/wpqt/v1/global-logs?${queryParams.toString()}`,
    method: "GET",
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
  userId: string,
  status: boolean,
): Promise<WPQTResponse<ServerUser>> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}/status`,
    method: "PATCH",
    data: { status },
    headers: getCommonHeaders(),
  });
}

function assignTaskToUserRequest(
  userId: string,
  taskId: string,
  userType: UserTypes,
): Promise<
  WPQTResponse<{
    executedAutomations: ExecutedAutomation[];
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}/tasks/${taskId}`,
    method: "POST",
    data: { user_type: userType },
    headers: getCommonHeaders(),
  });
}

function removeTaskFromUserRequest(
  userId: string,
  taskId: string,
  userType: UserTypes,
): Promise<
  WPQTResponse<{
    executedAutomations: ExecutedAutomation[];
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}/tasks/${taskId}`,
    method: "DELETE",
    data: { user_type: userType },
    headers: getCommonHeaders(),
  });
}

function deleteUserRequest(userId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}`,
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

function resetUserPasswordRequest(userId: string): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/users/${userId}/password-reset`,
    method: "PATCH",
    headers: getCommonHeaders(),
  });
}

function getWPUsersRequest(type: string): Promise<WPQTResponse<WPUser[]>> {
  return apiFetch({
    path: `/wpqt/v1/wp-users?type=${encodeURIComponent(type)}`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function updateWPUserPermissionsRequest(
  userId: string,
  capabilities: WPUserCapabilities,
) {
  return apiFetch({
    path: `/wpqt/v1/wp-users/${userId}/capabilities`,
    method: "PATCH",
    data: {
      quicktasker_admin_role: capabilities.quicktasker_admin_role,
      quicktasker_admin_role_allow_delete:
        capabilities.quicktasker_admin_role_allow_delete,
      quicktasker_admin_role_manage_users:
        capabilities.quicktasker_admin_role_manage_users,
      quicktasker_admin_role_manage_settings:
        capabilities.quicktasker_admin_role_manage_settings,
      quicktasker_admin_role_manage_archive:
        capabilities.quicktasker_admin_role_manage_archive,
    },
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

/*
  ==================================================================================================================================================================================================================
  Custom Field requests
  ==================================================================================================================================================================================================================
*/

function getCustomFieldsRequest(
  entityId: string,
  entityType: CustomFieldEntityType,
  activeFields: boolean,
): Promise<WPQTResponse<CustomField[]>> {
  const queryParams = new URLSearchParams({
    entityId,
    entityType,
    active: String(activeFields),
  });

  return apiFetch({
    path: `/wpqt/v1/custom-fields?${queryParams.toString()}`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function addCustomFieldRequest(
  entityId: string,
  entityType: CustomFieldEntityType,
  type: string,
  name: string,
  description: string,
): Promise<WPQTResponse<CustomField>> {
  return apiFetch({
    path: `/wpqt/v1/custom-fields`,
    method: "POST",
    data: { entityId, entityType, type, name, description },
    headers: getCommonHeaders(),
  });
}

function restoreCustomFieldRequest(
  customFieldId: string,
): Promise<WPQTResponse<CustomField>> {
  return apiFetch({
    path: `/wpqt/v1/custom-fields/${customFieldId}/restore`,
    method: "PATCH",
    headers: getCommonHeaders(),
  });
}

function markCustomFieldAsDeletedRequest(
  customFieldId: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/custom-fields/${customFieldId}`,
    method: "DELETE",
    headers: getCommonHeaders(),
  });
}

function updateCustomFieldValueRequest(
  customFieldId: string,
  value: string,
  entityId: string,
  entityType: "user" | "task",
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/custom-fields/${customFieldId}/value`,
    method: "PATCH",
    data: { value, entityId: String(entityId), entityType },
    headers: getCommonHeaders(),
  });
}

function updateCustomFieldDefaultValueRequest(
  customFieldId: string,
  value: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/custom-fields/${customFieldId}/default-value`,
    method: "PATCH",
    data: { value },
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Settings requests
  ==================================================================================================================================================================================================================
*/

function saveUserPageCustomStylesRequest(
  userPageCustomStyles: string,
): Promise<WPQTResponse<string>> {
  return apiFetch({
    path: `/wpqt/v1/settings/user-page-custom-styles`,
    method: "PATCH",
    data: { styles: userPageCustomStyles },
    headers: getCommonHeaders(),
  });
}

function getPipelineSettingsRequest(pipelineId: string): Promise<
  WPQTResponse<{
    settings: PipelineSettingsFromServer;
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/settings`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function saveTaskCompletionDoneSettingRequest(
  pipelineId: string,
  checked: boolean,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/settings/task-completion-done-restriction`,
    method: "PATCH",
    data: { allow_task_completion_only_on_last_stage: checked },
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Archive settings requests
  ==================================================================================================================================================================================================================
*/

function cleanArchiveTasksRequest(): Promise<
  WPQTResponse<{
    deletedTaskIds: string[];
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/archive/settings/task-cleanup`,
    method: "PATCH",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Overview requests
  ==================================================================================================================================================================================================================
*/

function getPipelineOverviewData(
  pipelineId: string,
  overviewFilter: PipelineOverviewFilter,
): Promise<WPQTResponse<PipelineOverviewResponse>> {
  const queryParams = new URLSearchParams({
    taskStartDate: overviewFilter.taskCreationDate || "",
    taskDoneDate: overviewFilter.taskDoneDate || "",
    taskAssignees: overviewFilter.taskAssignees.join(","),
  });

  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/overview?${queryParams.toString()}`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Automation requests
  ==================================================================================================================================================================================================================
*/

function getPipelineAutomationsRequest(pipelineId: string): Promise<
  WPQTResponse<{
    automations: AutomationFromServer[];
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/automations`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function createPipelineAutomationRequest(
  pipelineId: string,
  automation: AutomationCreationState,
): Promise<WPQTResponse<Automation>> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/automations`,
    method: "POST",
    data: {
      automationTargetId: null,
      automationTarget: automation.automationTarget,
      automationTrigger: automation.automationTrigger,
      automationAction: automation.automationAction?.id,
      automationActionTargetId: automation.automationActionTargetId,
      automationActionTargetType: automation.automationActionTargetType,
      automationMetadata: automation.metaData,
    },
    headers: getCommonHeaders(),
  });
}

function updateAutomationActiveStatusRequest(
  pipelineId: string,
  automationId: string,
  isActive: boolean,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/automations/${automationId}/active`,
    method: "PATCH",
    data: { active: isActive },
    headers: getCommonHeaders(),
  });
}

function deletePipelineAutomationsRequest(
  pipelineId: string,
  automationId: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/automations/${automationId}`,
    method: "DELETE",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Label requests
  ==================================================================================================================================================================================================================
*/

function getPipelineLabelsRequest(pipelineId: string): Promise<
  WPQTResponse<{
    labels: Label[];
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/labels`,
    method: "GET",
    headers: getCommonHeaders(),
  });
}

function createPipelineLabelRequest(
  pipelineId: string,
  name: string,
  color: string,
): Promise<
  WPQTResponse<{
    label: Label;
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/labels`,
    method: "POST",
    headers: getCommonHeaders(),
    data: { name, color },
  });
}

function assignLabelToTaskRequest(
  pipelineId: string,
  taskId: string,
  labelId: string,
): Promise<
  WPQTResponse<{
    label: Label;
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/tasks/${taskId}/labels`,
    method: "POST",
    headers: getCommonHeaders(),
    data: { labelId },
  });
}

function unassignLabelFromTaskRequest(
  pipelineId: string,
  taskId: string,
  labelId: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/tasks/${taskId}/labels/${labelId}`,
    method: "DELETE",
    headers: getCommonHeaders(),
  });
}

function updateLabelRequest(
  pipelineId: string,
  label: Label,
): Promise<
  WPQTResponse<{
    label: Label;
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/labels/${label.id}`,
    method: "PATCH",
    headers: getCommonHeaders(),
    data: { name: label.name, color: label.color },
  });
}

function deleteLabelRequest(
  pipelineId: string,
  labelId: string,
): Promise<
  WPQTResponse<{
    deletedLabel: Label;
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/pipelines/${pipelineId}/labels/${labelId}`,
    method: "DELETE",
    headers: getCommonHeaders(),
  });
}

/*
  ==================================================================================================================================================================================================================
  Upload requests
  ==================================================================================================================================================================================================================
*/

function getUploadsRequest(
  entityId: string,
  entityType: UploadEntityType,
): Promise<
  WPQTResponse<{
    uploads: Upload[];
  }>
> {
  const queryParams = new URLSearchParams({
    entity_id: entityId,
    entity_type: entityType,
  });

  return apiFetch({
    path: `/wpqt/v1/uploads?${queryParams.toString()}`,
    method: "GET",
  });
}

function uploadFileRequest(formData: FormData): Promise<
  WPQTResponse<{
    upload: Upload;
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/uploads`,
    method: "POST",
    body: formData,
  });
}

function deleteUploadRequest(uploadId: string): Promise<
  WPQTResponse<{
    deletedUpload: Upload;
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/uploads/${uploadId}`,
    method: "DELETE",
  });
}

/*
  ==================================================================================================================================================================================================================
  Import requests
  ==================================================================================================================================================================================================================
*/

function importRequest(
  source: PipelineImportSource,
  data: WPQTImport,
): Promise<
  WPQTResponse<{
    pipeline: PipelineFromServer;
  }>
> {
  return apiFetch({
    path: `/wpqt/v1/import`,
    method: "POST",
    data: { source, data },
    headers: getCommonHeaders(),
  });
}

export {
  addCommentRequest,
  addCustomFieldRequest,
  archiveStageTasksRequest,
  archiveTaskRequest,
  assignLabelToTaskRequest,
  assignTaskToUserRequest,
  changeUserSessionStatusRequest,
  changeUserStatusRequest,
  cleanArchiveTasksRequest,
  createNewStageRequest,
  createPipelineAutomationRequest,
  createPipelineLabelRequest,
  createPipelineRequest,
  createTaskRequest,
  createUserRequest,
  deleteLabelRequest,
  deletePipelineAutomationsRequest,
  deletePipelineRequest,
  deleteStageRequest,
  deleteTaskRequest,
  deleteUploadRequest,
  deleteUserRequest,
  deleteUserSessionRequest,
  editPipelineRequest,
  editStageRequest,
  editTaskRequest,
  editUserRequest,
  getArchivedTasksRequest,
  getComments,
  getCustomFieldsRequest,
  getExtendedUserRequest,
  getGlobalLogsRequest,
  getLogsRequest,
  getPipelineAutomationsRequest,
  getPipelineData,
  getPipelineLabelsRequest,
  getPipelineOverviewData,
  getPipelineSettingsRequest,
  getTaskLogs,
  getUploadsRequest,
  getUserSessionsRequest,
  getUsersRequest,
  getUserTasksRequest,
  getWPUsersRequest,
  importRequest,
  markCustomFieldAsDeletedRequest,
  markTaskDoneRequest,
  moveStageRequest,
  moveTaskRequest,
  removeTaskFromUserRequest,
  resetUserPasswordRequest,
  restoreArchivedTaskRequest,
  restoreCustomFieldRequest,
  saveTaskCompletionDoneSettingRequest,
  saveUserPageCustomStylesRequest,
  setPipelinePrimaryRequest,
  unassignLabelFromTaskRequest,
  updateAutomationActiveStatusRequest,
  updateCustomFieldDefaultValueRequest,
  updateCustomFieldValueRequest,
  updateLabelRequest,
  updateTaskFocusColorRequest,
  updateWPUserPermissionsRequest,
  uploadFileRequest,
};
