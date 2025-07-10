/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/user-page-app/index.js":
/*!************************************!*\
  !*** ./src/user-page-app/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserPageApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserPageApp */ "./src/user-page-app/UserPageApp.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_UserPageApp__WEBPACK_IMPORTED_MODULE_1__["default"], {}), document.getElementById("wpqt-public-user-app"));

/***/ }),

/***/ "./src/api/api.ts":
/*!************************!*\
  !*** ./src/api/api.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCommentRequest: () => (/* binding */ addCommentRequest),
/* harmony export */   addCustomFieldRequest: () => (/* binding */ addCustomFieldRequest),
/* harmony export */   archiveStageTasksRequest: () => (/* binding */ archiveStageTasksRequest),
/* harmony export */   archiveTaskRequest: () => (/* binding */ archiveTaskRequest),
/* harmony export */   assignLabelToTaskRequest: () => (/* binding */ assignLabelToTaskRequest),
/* harmony export */   assignTaskToUserRequest: () => (/* binding */ assignTaskToUserRequest),
/* harmony export */   changeUserSessionStatusRequest: () => (/* binding */ changeUserSessionStatusRequest),
/* harmony export */   changeUserStatusRequest: () => (/* binding */ changeUserStatusRequest),
/* harmony export */   cleanArchiveTasksRequest: () => (/* binding */ cleanArchiveTasksRequest),
/* harmony export */   createNewStageRequest: () => (/* binding */ createNewStageRequest),
/* harmony export */   createPipelineAutomationRequest: () => (/* binding */ createPipelineAutomationRequest),
/* harmony export */   createPipelineLabelRequest: () => (/* binding */ createPipelineLabelRequest),
/* harmony export */   createPipelineRequest: () => (/* binding */ createPipelineRequest),
/* harmony export */   createTaskRequest: () => (/* binding */ createTaskRequest),
/* harmony export */   createUserRequest: () => (/* binding */ createUserRequest),
/* harmony export */   deleteLabelRequest: () => (/* binding */ deleteLabelRequest),
/* harmony export */   deletePipelineAutomationsRequest: () => (/* binding */ deletePipelineAutomationsRequest),
/* harmony export */   deletePipelineRequest: () => (/* binding */ deletePipelineRequest),
/* harmony export */   deleteStageRequest: () => (/* binding */ deleteStageRequest),
/* harmony export */   deleteTaskRequest: () => (/* binding */ deleteTaskRequest),
/* harmony export */   deleteUploadRequest: () => (/* binding */ deleteUploadRequest),
/* harmony export */   deleteUserRequest: () => (/* binding */ deleteUserRequest),
/* harmony export */   deleteUserSessionRequest: () => (/* binding */ deleteUserSessionRequest),
/* harmony export */   editPipelineRequest: () => (/* binding */ editPipelineRequest),
/* harmony export */   editStageRequest: () => (/* binding */ editStageRequest),
/* harmony export */   editTaskRequest: () => (/* binding */ editTaskRequest),
/* harmony export */   editUserRequest: () => (/* binding */ editUserRequest),
/* harmony export */   getArchivedTasksRequest: () => (/* binding */ getArchivedTasksRequest),
/* harmony export */   getComments: () => (/* binding */ getComments),
/* harmony export */   getCustomFieldsRequest: () => (/* binding */ getCustomFieldsRequest),
/* harmony export */   getExtendedUserRequest: () => (/* binding */ getExtendedUserRequest),
/* harmony export */   getGlobalLogsRequest: () => (/* binding */ getGlobalLogsRequest),
/* harmony export */   getLogsRequest: () => (/* binding */ getLogsRequest),
/* harmony export */   getPipelineAutomationsRequest: () => (/* binding */ getPipelineAutomationsRequest),
/* harmony export */   getPipelineData: () => (/* binding */ getPipelineData),
/* harmony export */   getPipelineLabelsRequest: () => (/* binding */ getPipelineLabelsRequest),
/* harmony export */   getPipelineOverviewData: () => (/* binding */ getPipelineOverviewData),
/* harmony export */   getPipelineSettingsRequest: () => (/* binding */ getPipelineSettingsRequest),
/* harmony export */   getTaskLogs: () => (/* binding */ getTaskLogs),
/* harmony export */   getUploadsRequest: () => (/* binding */ getUploadsRequest),
/* harmony export */   getUserSessionsRequest: () => (/* binding */ getUserSessionsRequest),
/* harmony export */   getUserTasksRequest: () => (/* binding */ getUserTasksRequest),
/* harmony export */   getUsersRequest: () => (/* binding */ getUsersRequest),
/* harmony export */   getWPUsersRequest: () => (/* binding */ getWPUsersRequest),
/* harmony export */   importRequest: () => (/* binding */ importRequest),
/* harmony export */   markCustomFieldAsDeletedRequest: () => (/* binding */ markCustomFieldAsDeletedRequest),
/* harmony export */   markTaskDoneRequest: () => (/* binding */ markTaskDoneRequest),
/* harmony export */   moveStageRequest: () => (/* binding */ moveStageRequest),
/* harmony export */   moveTaskRequest: () => (/* binding */ moveTaskRequest),
/* harmony export */   removeTaskFromUserRequest: () => (/* binding */ removeTaskFromUserRequest),
/* harmony export */   resetUserPasswordRequest: () => (/* binding */ resetUserPasswordRequest),
/* harmony export */   restoreArchivedTaskRequest: () => (/* binding */ restoreArchivedTaskRequest),
/* harmony export */   restoreCustomFieldRequest: () => (/* binding */ restoreCustomFieldRequest),
/* harmony export */   saveTaskCompletionDoneSettingRequest: () => (/* binding */ saveTaskCompletionDoneSettingRequest),
/* harmony export */   saveUserPageCustomStylesRequest: () => (/* binding */ saveUserPageCustomStylesRequest),
/* harmony export */   setPipelinePrimaryRequest: () => (/* binding */ setPipelinePrimaryRequest),
/* harmony export */   unassignLabelFromTaskRequest: () => (/* binding */ unassignLabelFromTaskRequest),
/* harmony export */   updateAutomationActiveStatusRequest: () => (/* binding */ updateAutomationActiveStatusRequest),
/* harmony export */   updateCustomFieldDefaultValueRequest: () => (/* binding */ updateCustomFieldDefaultValueRequest),
/* harmony export */   updateCustomFieldValueRequest: () => (/* binding */ updateCustomFieldValueRequest),
/* harmony export */   updateLabelRequest: () => (/* binding */ updateLabelRequest),
/* harmony export */   updateTaskFocusColorRequest: () => (/* binding */ updateTaskFocusColorRequest),
/* harmony export */   updateWPUserPermissionsRequest: () => (/* binding */ updateWPUserPermissionsRequest),
/* harmony export */   uploadFileRequest: () => (/* binding */ uploadFileRequest)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

function getCommonHeaders() {
  return {
    "Content-Type": "application/json",
    "X-WPQT-API-Nonce": window.wpqt.apiNonce
  };
}
/*
  ==================================================================================================================================================================================================================
  Pipeline requests
  ==================================================================================================================================================================================================================
*/
function getPipelineData(pipelineId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}`,
    headers: getCommonHeaders()
  });
}
function createPipelineRequest(name, description) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines`,
    method: "POST",
    data: {
      name,
      description
    },
    headers: getCommonHeaders()
  });
}
function editPipelineRequest(pipeline) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipeline.id}`,
    method: "PATCH",
    data: {
      name: pipeline.name,
      description: pipeline.description,
      is_primary: pipeline.is_primary
    },
    headers: getCommonHeaders()
  });
}
function setPipelinePrimaryRequest(pipelineId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/set-primary`,
    method: "PATCH",
    headers: getCommonHeaders()
  });
}
function deletePipelineRequest(pipelineId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}`,
    method: "DELETE",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Task requests
  ==================================================================================================================================================================================================================
*/
function moveTaskRequest(taskId, stageId, order) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${taskId}/move`,
    method: "PATCH",
    data: {
      stageId,
      order
    },
    headers: getCommonHeaders()
  });
}
function createTaskRequest(stageId, pipelineId, name) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks`,
    method: "POST",
    data: {
      stageId,
      name,
      pipelineId
    },
    headers: getCommonHeaders()
  });
}
function editTaskRequest(task) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${task.id}`,
    method: "PATCH",
    data: {
      id: task.id,
      name: task.name,
      description: task.description,
      freeForAll: task.free_for_all,
      dueDate: task.due_date
    },
    headers: getCommonHeaders()
  });
}
function deleteTaskRequest(taskId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${taskId}`,
    method: "DELETE",
    headers: getCommonHeaders()
  });
}
function archiveTaskRequest(taskId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${taskId}/archive`,
    method: "PATCH",
    headers: getCommonHeaders()
  });
}
function restoreArchivedTaskRequest(taskId, boardId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${taskId}/archive-restore`,
    method: "PATCH",
    data: {
      boardId
    },
    headers: getCommonHeaders()
  });
}
function getArchivedTasksRequest(filter) {
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
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/archived?${queryParams}`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function markTaskDoneRequest(taskId, done) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${taskId}/done`,
    method: "PATCH",
    data: {
      done
    },
    headers: getCommonHeaders()
  });
}
function updateTaskFocusColorRequest(taskId, color) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${taskId}/focus-color`,
    method: "PATCH",
    data: {
      color
    },
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Comment requests
  ==================================================================================================================================================================================================================
*/
function getComments(typeId, type, isPrivate) {
  const queryParams = new URLSearchParams({
    typeId,
    type,
    isPrivate: isPrivate.toString()
  }).toString();
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/comments?${queryParams}`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function addCommentRequest(typeId, type, isPrivate, comment) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/comments`,
    data: {
      comment,
      typeId,
      type,
      isPrivate
    },
    method: "POST",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Logs requests
  ==================================================================================================================================================================================================================
*/
function getTaskLogs(taskId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${taskId}/logs`,
    headers: getCommonHeaders()
  });
}
function getLogsRequest(typeId, type) {
  const queryParams = new URLSearchParams({
    typeId,
    type
  });
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/logs?${queryParams.toString()}`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function getGlobalLogsRequest(logsFilter) {
  const queryParams = new URLSearchParams(Object.entries(logsFilter).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {}));
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/global-logs?${queryParams.toString()}`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Stage requests
  ==================================================================================================================================================================================================================
*/
function createNewStageRequest(pipelineId, name, description) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/stages`,
    method: "POST",
    data: {
      pipelineId,
      name,
      description
    },
    headers: getCommonHeaders()
  });
}
function editStageRequest(stage) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/stages/${stage.id}`,
    method: "PATCH",
    data: {
      name: stage.name,
      description: stage.description
    },
    headers: getCommonHeaders()
  });
}
function moveStageRequest(stageId, direction) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/stages/${stageId}/move`,
    method: "PATCH",
    data: {
      direction
    },
    headers: getCommonHeaders()
  });
}
function deleteStageRequest(stageId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/stages/${stageId}`,
    method: "DELETE",
    data: {
      stageId
    },
    headers: getCommonHeaders()
  });
}
function archiveStageTasksRequest(stageId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/stages/${stageId}/archive-tasks`,
    method: "PATCH",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  User requests
  ==================================================================================================================================================================================================================
*/
function getUsersRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function getExtendedUserRequest(userId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}/extended`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function createUserRequest(name, description) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users`,
    method: "POST",
    data: {
      name,
      description
    },
    headers: getCommonHeaders()
  });
}
function editUserRequest(user) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${user.id}`,
    method: "PATCH",
    data: {
      user
    },
    headers: getCommonHeaders()
  });
}
function changeUserStatusRequest(userId, status) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}/status`,
    method: "PATCH",
    data: {
      status
    },
    headers: getCommonHeaders()
  });
}
function assignTaskToUserRequest(userId, taskId, userType) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}/tasks/${taskId}`,
    method: "POST",
    data: {
      user_type: userType
    },
    headers: getCommonHeaders()
  });
}
function removeTaskFromUserRequest(userId, taskId, userType) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}/tasks/${taskId}`,
    method: "DELETE",
    data: {
      user_type: userType
    },
    headers: getCommonHeaders()
  });
}
function deleteUserRequest(userId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}`,
    method: "DELETE",
    headers: getCommonHeaders()
  });
}
function getUserTasksRequest(userId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}/tasks`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function resetUserPasswordRequest(userId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}/password-reset`,
    method: "PATCH",
    headers: getCommonHeaders()
  });
}
function getWPUsersRequest(type) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/wp-users?type=${encodeURIComponent(type)}`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function updateWPUserPermissionsRequest(userId, capabilities) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/wp-users/${userId}/capabilities`,
    method: "PATCH",
    data: {
      quicktasker_admin_role: capabilities.quicktasker_admin_role,
      quicktasker_admin_role_allow_delete: capabilities.quicktasker_admin_role_allow_delete,
      quicktasker_admin_role_manage_users: capabilities.quicktasker_admin_role_manage_users,
      quicktasker_admin_role_manage_settings: capabilities.quicktasker_admin_role_manage_settings,
      quicktasker_admin_role_manage_archive: capabilities.quicktasker_admin_role_manage_archive,
      quicktasker_access_user_page_app: capabilities.quicktasker_access_user_page_app
    },
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  User session requests
  ==================================================================================================================================================================================================================
*/
function getUserSessionsRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/sessions`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function changeUserSessionStatusRequest(sessionId, status) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/sessions/${sessionId}/status`,
    method: "PATCH",
    data: {
      status
    },
    headers: getCommonHeaders()
  });
}
function deleteUserSessionRequest(sessionId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/sessions/${sessionId}`,
    method: "DELETE",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Custom Field requests
  ==================================================================================================================================================================================================================
*/
function getCustomFieldsRequest(entityId, entityType, activeFields) {
  const queryParams = new URLSearchParams({
    entityId,
    entityType,
    active: String(activeFields)
  });
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/custom-fields?${queryParams.toString()}`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function addCustomFieldRequest(entityId, entityType, type, name, description) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/custom-fields`,
    method: "POST",
    data: {
      entityId,
      entityType,
      type,
      name,
      description
    },
    headers: getCommonHeaders()
  });
}
function restoreCustomFieldRequest(customFieldId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/custom-fields/${customFieldId}/restore`,
    method: "PATCH",
    headers: getCommonHeaders()
  });
}
function markCustomFieldAsDeletedRequest(customFieldId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/custom-fields/${customFieldId}`,
    method: "DELETE",
    headers: getCommonHeaders()
  });
}
function updateCustomFieldValueRequest(customFieldId, value, entityId, entityType) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/custom-fields/${customFieldId}/value`,
    method: "PATCH",
    data: {
      value,
      entityId: String(entityId),
      entityType
    },
    headers: getCommonHeaders()
  });
}
function updateCustomFieldDefaultValueRequest(customFieldId, value) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/custom-fields/${customFieldId}/default-value`,
    method: "PATCH",
    data: {
      value
    },
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Settings requests
  ==================================================================================================================================================================================================================
*/
function saveUserPageCustomStylesRequest(userPageCustomStyles) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/settings/user-page-custom-styles`,
    method: "PATCH",
    data: {
      styles: userPageCustomStyles
    },
    headers: getCommonHeaders()
  });
}
function getPipelineSettingsRequest(pipelineId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/settings`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function saveTaskCompletionDoneSettingRequest(pipelineId, checked) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/settings/task-completion-done-restriction`,
    method: "PATCH",
    data: {
      allow_task_completion_only_on_last_stage: checked
    },
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Archive settings requests
  ==================================================================================================================================================================================================================
*/
function cleanArchiveTasksRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/archive/settings/task-cleanup`,
    method: "PATCH",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Overview requests
  ==================================================================================================================================================================================================================
*/
function getPipelineOverviewData(pipelineId, overviewFilter) {
  const queryParams = new URLSearchParams({
    taskStartDate: overviewFilter.taskCreationDate || "",
    taskDoneDate: overviewFilter.taskDoneDate || "",
    taskAssignees: overviewFilter.taskAssignees.join(",")
  });
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/overview?${queryParams.toString()}`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Automation requests
  ==================================================================================================================================================================================================================
*/
function getPipelineAutomationsRequest(pipelineId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/automations`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function createPipelineAutomationRequest(pipelineId, automation) {
  var _a;
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/automations`,
    method: "POST",
    data: {
      automationTargetId: null,
      automationTarget: automation.automationTarget,
      automationTrigger: automation.automationTrigger,
      automationAction: (_a = automation.automationAction) === null || _a === void 0 ? void 0 : _a.id,
      automationActionTargetId: automation.automationActionTargetId,
      automationActionTargetType: automation.automationActionTargetType,
      automationMetadata: automation.metaData
    },
    headers: getCommonHeaders()
  });
}
function updateAutomationActiveStatusRequest(pipelineId, automationId, isActive) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/automations/${automationId}/active`,
    method: "PATCH",
    data: {
      active: isActive
    },
    headers: getCommonHeaders()
  });
}
function deletePipelineAutomationsRequest(pipelineId, automationId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/automations/${automationId}`,
    method: "DELETE",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Label requests
  ==================================================================================================================================================================================================================
*/
function getPipelineLabelsRequest(pipelineId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/labels`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function createPipelineLabelRequest(pipelineId, name, color) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/labels`,
    method: "POST",
    headers: getCommonHeaders(),
    data: {
      name,
      color
    }
  });
}
function assignLabelToTaskRequest(pipelineId, taskId, labelId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/tasks/${taskId}/labels`,
    method: "POST",
    headers: getCommonHeaders(),
    data: {
      labelId
    }
  });
}
function unassignLabelFromTaskRequest(pipelineId, taskId, labelId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/tasks/${taskId}/labels/${labelId}`,
    method: "DELETE",
    headers: getCommonHeaders()
  });
}
function updateLabelRequest(pipelineId, label) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/labels/${label.id}`,
    method: "PATCH",
    headers: getCommonHeaders(),
    data: {
      name: label.name,
      color: label.color
    }
  });
}
function deleteLabelRequest(pipelineId, labelId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/pipelines/${pipelineId}/labels/${labelId}`,
    method: "DELETE",
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Upload requests
  ==================================================================================================================================================================================================================
*/
function getUploadsRequest(entityId, entityType) {
  const queryParams = new URLSearchParams({
    entity_id: entityId,
    entity_type: entityType
  });
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/uploads?${queryParams.toString()}`,
    method: "GET"
  });
}
function uploadFileRequest(formData) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/uploads`,
    method: "POST",
    body: formData
  });
}
function deleteUploadRequest(uploadId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/uploads/${uploadId}`,
    method: "DELETE"
  });
}
/*
  ==================================================================================================================================================================================================================
  Import requests
  ==================================================================================================================================================================================================================
*/
function importRequest(source, data) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/import`,
    method: "POST",
    data: {
      source,
      data
    },
    headers: getCommonHeaders()
  });
}


/***/ }),

/***/ "./src/components/Card/Card.tsx":
/*!**************************************!*\
  !*** ./src/components/Card/Card.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTCard: () => (/* binding */ WPQTCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");


function WPQTCard({
  className,
  onClick,
  title,
  description,
  children,
  dropdown,
  titleClassName = "",
  style = {}
}) {
  const hasDropdown = dropdown !== undefined;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__.clsx)("wpqt-relative wpqt-flex wpqt-flex-col wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-4", hasDropdown && "wpqt-pr-[24px]", className),
    style: style,
    onClick: onClick,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-mb-3",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: `wpqt-text-lg ${titleClassName}`,
        children: title
      }), description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-italic wpqt-text-gray-500",
        children: description
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-flex wpqt-flex-col wpqt-h-full",
      children: children
    }), hasDropdown && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-absolute wpqt-right-2 wpqt-top-1 wpqt-z-10",
      children: dropdown
    })]
  });
}


/***/ }),

/***/ "./src/components/Card/WPQTCardDataItem/WPQTCardDataItem.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/Card/WPQTCardDataItem/WPQTCardDataItem.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTCardDataItem: () => (/* binding */ WPQTCardDataItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function WPQTCardDataItem({
  label,
  value,
  valueClassName = "",
  valueLink,
  icon,
  onClick = () => {},
  className = "",
  labelClassName = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: `wpqt-mb-2 wpqt-flex wpqt-gap-2 wpqt-items-center ${className}`,
    onClick: onClick,
    children: [icon && icon, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: labelClassName,
      children: value ? `${label}:` : label
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: `${valueClassName}`,
      children: valueLink ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
        href: valueLink,
        target: "_blank",
        className: "wpqt-text-qtTextBlue wpqt-no-underline",
        rel: "noreferrer",
        onClick: e => e.stopPropagation(),
        children: value
      }) : value
    })]
  });
}


/***/ }),

/***/ "./src/components/CustomField/CustomFields/components/CustomFieldActions/CustomFieldActions.tsx":
/*!******************************************************************************************************!*\
  !*** ./src/components/CustomField/CustomFields/components/CustomFieldActions/CustomFieldActions.tsx ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFieldActions: () => (/* binding */ CustomFieldActions)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../Loading/Loading */ "./src/components/Loading/Loading.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};








function CustomFieldActions({
  data,
  onSave,
  locationOfCustomFields,
  onDelete,
  actionLoading
}) {
  const {
    state: {
      isUserAllowedToDelete
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_3__.AppContext);
  const isAllowedToDelete = data.entity_type === locationOfCustomFields;
  const isAllowedToSave = locationOfCustomFields === _types_custom_field__WEBPACK_IMPORTED_MODULE_4__.CustomFieldEntityType.Task || locationOfCustomFields === _types_custom_field__WEBPACK_IMPORTED_MODULE_4__.CustomFieldEntityType.Pipeline || locationOfCustomFields === _types_custom_field__WEBPACK_IMPORTED_MODULE_4__.CustomFieldEntityType.User;
  const entityTypeDisplay = data.entity_type === _types_custom_field__WEBPACK_IMPORTED_MODULE_4__.CustomFieldEntityType.Pipeline ? "board" : data.entity_type;
  const handleDelete = () => __awaiter(this, void 0, void 0, function* () {
    if (!isAllowedToDelete) {
      return;
    }
    onDelete();
  });
  if (actionLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_6__.Loading, {
      ovalSize: "24"
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-items-center wpqt-justify-center wpqt-gap-2",
    children: [isAllowedToSave && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__.WPQTButton, {
      onClick: onSave,
      btnText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "quicktasker")
    }), isUserAllowedToDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__.WPQTIconButton, Object.assign({
      onClick: handleDelete,
      className: `${!isAllowedToDelete ? "!wpqt-cursor-not-allowed" : ""}`,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "wpqt-icon-red wpqt-size-4"
      })
    }, !isAllowedToDelete && {
      tooltipId: `custom-field-${data.id}-delete`,
      tooltipText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("This custom field is inherited from %s settings and can't be deleted here", "quicktasker"), entityTypeDisplay)
    }))]
  });
}


/***/ }),

/***/ "./src/components/CustomField/CustomFields/components/CustomField/CustomField.tsx":
/*!****************************************************************************************!*\
  !*** ./src/components/CustomField/CustomFields/components/CustomField/CustomField.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomField: () => (/* binding */ CustomField),
/* harmony export */   CustomFieldTitle: () => (/* binding */ CustomFieldTitle)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useCustomFieldActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../hooks/actions/useCustomFieldActions */ "./src/hooks/actions/useCustomFieldActions.ts");
/* harmony import */ var _providers_CustomFieldsContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../providers/CustomFieldsContextProvider */ "./src/providers/CustomFieldsContextProvider.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _CustomFieldActions_CustomFieldActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CustomFieldActions/CustomFieldActions */ "./src/components/CustomField/CustomFields/components/CustomFieldActions/CustomFieldActions.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};








function CustomField({
  data
}) {
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const {
    state: {
      entityType,
      entityId
    },
    customFieldsDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_CustomFieldsContextProvider__WEBPACK_IMPORTED_MODULE_4__.CustomFieldsContext);
  const {
    updateCustomFieldValue,
    markCustomFieldAsDeleted,
    updateCustomFieldDefaultValue
  } = (0,_hooks_actions_useCustomFieldActions__WEBPACK_IMPORTED_MODULE_3__.useCustomFieldActions)();
  const [actionLoading, setActionLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const allowCustomFieldValueUpdate = entityType === _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.User || entityType === _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Task;
  const allowCustomFieldDefaultValueUpdate = entityType === _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Pipeline;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (data.value) {
      setValue(data.value);
    } else if (data.default_value) {
      setValue(data.default_value);
    }
  }, [data.value, data.default_value]);
  const handleSave = () => __awaiter(this, void 0, void 0, function* () {
    if (allowCustomFieldValueUpdate) {
      yield handleCustomFieldValueUpdate();
    } else if (allowCustomFieldDefaultValueUpdate) {
      yield handleCustomFieldDefaultValueUpdate();
    } else {
      console.error("Invalid entity type for saving custom field value");
    }
  });
  const handleCustomFieldValueUpdate = () => __awaiter(this, void 0, void 0, function* () {
    if (allowCustomFieldValueUpdate === false) {
      return;
    }
    setActionLoading(true);
    yield updateCustomFieldValue(data.id, value, entityId, entityType);
    setActionLoading(false);
  });
  const handleCustomFieldDefaultValueUpdate = () => __awaiter(this, void 0, void 0, function* () {
    if (allowCustomFieldDefaultValueUpdate === false) {
      return;
    }
    setActionLoading(true);
    yield updateCustomFieldDefaultValue(data.id, value);
    setActionLoading(false);
  });
  const handleDelete = () => __awaiter(this, void 0, void 0, function* () {
    setActionLoading(true);
    yield markCustomFieldAsDeleted(data.id, () => {
      customFieldsDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_2__.DELETE_CUSTOM_FIELD,
        payload: data.id
      });
    });
    setActionLoading(false);
  });
  let customFieldElement;
  switch (data.type) {
    case _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldType.Text:
      {
        customFieldElement = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextCustomField, {
          data: data,
          value: value,
          onChange: setValue
        });
        break;
      }
    case _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldType.Checkbox:
      {
        customFieldElement = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CheckboxCustomField, {
          data: data,
          value: value,
          onChange: setValue
        });
        break;
      }
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {}), customFieldElement, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomFieldActions_CustomFieldActions__WEBPACK_IMPORTED_MODULE_7__.CustomFieldActions, {
      data: data,
      locationOfCustomFields: entityType,
      onSave: handleSave,
      onDelete: handleDelete,
      actionLoading: actionLoading
    })]
  });
}
function TextCustomField({
  data,
  value,
  onChange
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CustomFieldTitle, {
      name: data.name,
      description: data.description
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_6__.WPQTInput, {
      value: value,
      onChange: onChange
    })]
  });
}
function CheckboxCustomField({
  data,
  value,
  onChange
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-flex-col wpqt-items-center",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CustomFieldTitle, {
      name: data.name,
      description: data.description
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
      type: "checkbox",
      checked: value === "true",
      className: "!wpqt-block",
      onChange: e => onChange(e.target.checked ? "true" : "false")
    })]
  });
}
function CustomFieldTitle({
  name,
  description = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-1 wpqt-text-base wpqt-font-semibold",
      children: name
    }), description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-2 wpqt-italic",
      children: description
    })]
  });
}


/***/ }),

/***/ "./src/components/Dropdown/WPQTDropdown.tsx":
/*!**************************************************!*\
  !*** ./src/components/Dropdown/WPQTDropdown.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTDropdown: () => (/* binding */ WPQTDropdown),
/* harmony export */   WPQTDropdownIcon: () => (/* binding */ WPQTDropdownIcon),
/* harmony export */   WPQTDropdownItem: () => (/* binding */ WPQTDropdownItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/menu/menu.js");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _Tooltip_WPQTTooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tooltip/WPQTTooltip */ "./src/components/Tooltip/WPQTTooltip.tsx");




function WPQTDropdown({
  children,
  menuBtn,
  menuBtnClasses = "",
  anchor = "bottom end"
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.Menu, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.MenuButton, {
      as: "div",
      className: `wpqt-cursor-pointer ${menuBtnClasses}`,
      onClick: event => event.stopPropagation(),
      children: ({
        active
      }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: menuBtn({
          active
        })
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.MenuItems, {
      anchor: anchor,
      transition: true,
      className: "wpqt-z-20 wpqt-origin-top wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-4 wpqt-transition wpqt-duration-200 wpqt-ease-out data-[closed]:wpqt-scale-95 data-[closed]:wpqt-opacity-0",
      children: children
    })]
  });
}
function WPQTDropdownIcon({
  isActive,
  IconComponent
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(IconComponent, {
    className: `wpqt-size-6 wpqt-text-gray-400 hover:wpqt-text-qtBlueHover ${isActive ? "wpqt-text-qtBlueHover" : ""}`
  });
}
function WPQTDropdownItem({
  text,
  onClick,
  icon,
  className,
  disabled = false,
  id = "",
  tooltipText = "",
  loading = false
}) {
  const showTooltip = tooltipText !== "" && id !== "";
  const tooltipAttributes = showTooltip ? {
    "data-tooltip-id": id,
    "data-tooltip-content": tooltipText,
    "data-tooltip-position-strategy": "fixed",
    "data-tooltip-variant": "info"
  } : {};
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.MenuItem, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({}, tooltipAttributes, {
      className: `wpqt-mb-3 wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-relative ${!disabled ? "wpqt-cursor-pointer hover:wpqt-underline" : "wpqt-cursor-not-allowed wpqt-line-through"} ${className}`,
      onClick: e => {
        if (!disabled && onClick) {
          onClick(e);
        }
      },
      children: [icon, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: `${loading ? "wpqt-invisible" : ""}`,
        children: text
      }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__.LoadingOval, {
        width: "16",
        height: "16",
        className: "wpqt-absolute wpqt-top-1/2 wpqt-left-1/2 wpqt-transform-center"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Tooltip_WPQTTooltip__WEBPACK_IMPORTED_MODULE_2__.WPQTTooltip, {
        id: id
      })]
    }))
  });
}


/***/ }),

/***/ "./src/components/ErrorBoundary/ErrorBoundary.tsx":
/*!********************************************************!*\
  !*** ./src/components/ErrorBoundary/ErrorBoundary.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



class ErrorBoundary extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(_) {
    return {
      hasError: true,
      error: _
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    var _a;
    if (this.state.hasError) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-flex wpqt-h-screen wpqt-items-center wpqt-justify-center wpqt-text-center wpqt-text-lg",
        children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Something went wrong. Please refresh the page.", "quicktasker"), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}), (_a = this.state.error) === null || _a === void 0 ? void 0 : _a.message]
      });
    }
    return this.props.children;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ "./src/components/Loading/Loading.tsx":
/*!********************************************!*\
  !*** ./src/components/Loading/Loading.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FullLoading: () => (/* binding */ FullLoading),
/* harmony export */   Loading: () => (/* binding */ Loading),
/* harmony export */   LoadingOval: () => (/* binding */ LoadingOval)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_loader_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loader-spinner */ "./node_modules/react-loader-spinner/dist/module.js");


function LoadingOval({
  width = "80",
  height = "80",
  className = "",
  color = "#1d4ed8",
  secondaryColor = "#2563eb"
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_loader_spinner__WEBPACK_IMPORTED_MODULE_1__.Oval, {
    visible: true,
    height: height,
    width: width,
    color: color,
    secondaryColor: secondaryColor,
    ariaLabel: "oval-loading",
    wrapperStyle: {},
    wrapperClass: className
  });
}
function FullLoading() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-flex wpqt-h-screen-minus-top-bar wpqt-flex-col wpqt-items-center wpqt-justify-center",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LoadingOval, {})
  });
}
function Loading({
  className = "",
  ovalSize
}) {
  const ovalProps = ovalSize ? {
    width: ovalSize,
    height: ovalSize
  } : {};
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: `wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center ${className}`,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LoadingOval, Object.assign({}, ovalProps))
  });
}


/***/ }),

/***/ "./src/components/Modal/WPQTModal.tsx":
/*!********************************************!*\
  !*** ./src/components/Modal/WPQTModal.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTModal: () => (/* binding */ WPQTModal),
/* harmony export */   WPQTModalField: () => (/* binding */ WPQTModalField),
/* harmony export */   WPQTModalFieldSet: () => (/* binding */ WPQTModalFieldSet),
/* harmony export */   WPQTModalFooter: () => (/* binding */ WPQTModalFooter),
/* harmony export */   WPQTModalTitle: () => (/* binding */ WPQTModalTitle)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/dialog/dialog.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/fieldset/fieldset.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/field/field.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/label/label.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _Tooltip_WPQTTooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tooltip/WPQTTooltip */ "./src/components/Tooltip/WPQTTooltip.tsx");





function WPQTModal({
  modalOpen,
  closeModal,
  children,
  size = "sm"
}) {
  const sizeClasses = {
    sm: "wpqt-max-w-sm",
    md: "wpqt-max-w-lg",
    lg: "wpqt-max-w-4xl",
    xl: "wpqt-max-w-6xl"
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.Dialog, {
    open: modalOpen,
    as: "div",
    className: "wpqt-relative wpqt-z-9999 focus:wpqt-outline-none",
    onClose: closeModal,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.DialogBackdrop, {
      className: "wpqt-fixed wpqt-inset-0 wpqt-bg-black/40"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-fixed wpqt-inset-0 wpqt-z-10 wpqt-w-screen wpqt-overflow-y-auto",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-mt-[8vh] wpqt-flex wpqt-justify-center",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.DialogPanel, {
          transition: true,
          className: `data-[closed]:wpqt-transform-[wpqt-scale(95%)] wpqt-relative wpqt-mt-[20px] wpqt-w-4/5 ${sizeClasses[size]} wpqt-rounded-xl wpqt-bg-white wpqt-p-8 wpqt-backdrop-blur-2xl wpqt-duration-300 wpqt-ease-out data-[closed]:wpqt-opacity-0`,
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "wpqt-group wpqt-absolute wpqt-right-[-20px] wpqt-top-[-20px] wpqt-flex wpqt-h-[40px] wpqt-w-[40px] wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-rounded-full wpqt-border wpqt-border-solid wpqt-bg-white wpqt-text-qtBorder",
            onClick: closeModal,
            "data-testid": "wpqt-modal-close-button",
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__["default"], {
              className: "wpqt-icon-blue group-hover:wpqt-icon-red wpqt-size-5"
            })
          }), children]
        })
      })
    })]
  });
}
function WPQTModalTitle({
  children,
  className = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.DialogTitle, {
    as: "div",
    className: `wpqt-text-base wpqt-font-semibold wpqt-text-black wpqt-mb-2 ${className}`,
    children: children
  });
}
function WPQTModalFieldSet({
  children
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Fieldset, {
    children: children
  });
}
function WPQTModalField({
  label,
  children,
  tooltipId,
  tooltipText
}) {
  const showToolTip = tooltipId && tooltipText;
  const tooltipAttributes = showToolTip ? {
    "data-tooltip-id": tooltipId,
    "data-tooltip-content": tooltipText,
    "data-tooltip-position-strategy": "fixed",
    "data-tooltip-variant": "info",
    "data-tooltip-place": "top-end"
  } : {};
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Field, {
    className: "wpqt-mb-3",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_7__.Label, Object.assign({
      className: "wpqt-mb-2 wpqt-block wpqt-text-sm/6 wpqt-font-medium"
    }, tooltipAttributes, {
      children: label
    })), children, showToolTip && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Tooltip_WPQTTooltip__WEBPACK_IMPORTED_MODULE_2__.WPQTTooltip, {
      id: tooltipId
    })]
  });
}
function WPQTModalFooter({
  onSave,
  saveBtnText,
  loading = false
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-flex wpqt-justify-end wpqt-px-2",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__.WPQTButton, {
      btnText: saveBtnText,
      loading: loading,
      onClick: onSave
    })
  });
}


/***/ }),

/***/ "./src/components/Tooltip/WPQTTooltip.tsx":
/*!************************************************!*\
  !*** ./src/components/Tooltip/WPQTTooltip.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTTooltip: () => (/* binding */ WPQTTooltip)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/react-tooltip.min.mjs");


function WPQTTooltip({
  id
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
    id: id,
    className: "wpqt-bg-red-600 wpqt-z-9999",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      children: "Tooltip content"
    })
  });
}


/***/ }),

/***/ "./src/components/common/Button/Button.tsx":
/*!*************************************************!*\
  !*** ./src/components/common/Button/Button.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ButtonStyleType: () => (/* binding */ ButtonStyleType),
/* harmony export */   ButtonType: () => (/* binding */ ButtonType),
/* harmony export */   WPQTButton: () => (/* binding */ WPQTButton),
/* harmony export */   WPQTIconButton: () => (/* binding */ WPQTIconButton),
/* harmony export */   WPQTOnlyIconBtn: () => (/* binding */ WPQTOnlyIconBtn)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/button/button.js");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _Tooltip_WPQTTooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tooltip/WPQTTooltip */ "./src/components/Tooltip/WPQTTooltip.tsx");




var ButtonType;
(function (ButtonType) {
  ButtonType["BUTTON"] = "button";
  ButtonType["SUBMIT"] = "submit";
  ButtonType["RESET"] = "reset";
})(ButtonType || (ButtonType = {}));
var ButtonStyleType;
(function (ButtonStyleType) {
  ButtonStyleType["PRIMARY"] = "primary";
  ButtonStyleType["SECONDARY"] = "secondary";
  ButtonStyleType["DANGER"] = "danger";
})(ButtonStyleType || (ButtonStyleType = {}));
function WPQTButton({
  onClick = () => {},
  btnText,
  className,
  type = ButtonType.BUTTON,
  disabled = false,
  loading = false,
  buttonStyleType = ButtonStyleType.PRIMARY
}) {
  const primaryClasses = "wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-transparent wpqt-bg-blue-500 wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-text-white wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 focus:wpqt-ring-blue-800 enabled:hover:wpqt-bg-blue-600";
  const secondaryClasses = "wpqt-inline-flex wpqt-cursor-pointer wpqt-bg-gray-100 wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 enabled:hover:wpqt-bg-gray-200";
  const dangerClasses = "wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-transparent wpqt-bg-red-500 wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-text-white wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 focus:wpqt-ring-red-800 enabled:hover:wpqt-bg-red-600";
  const buttonClasses = buttonStyleType === ButtonStyleType.PRIMARY ? primaryClasses : buttonStyleType === ButtonStyleType.SECONDARY ? secondaryClasses : dangerClasses;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
    disabled: disabled || loading,
    className: `${buttonClasses} ${className}`,
    onClick: onClick,
    type: type,
    children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__.LoadingOval, {
      width: "24",
      height: "24",
      color: "#ffffff",
      secondaryColor: "#ffffff"
    }) : btnText
  });
}
function WPQTIconButton({
  icon,
  text,
  onClick = () => {},
  className,
  tooltipId,
  tooltipText,
  loading = false
}) {
  const showTooltip = tooltipText && tooltipId;
  const tooltipAttributes = showTooltip ? {
    "data-tooltip-id": tooltipId,
    "data-tooltip-content": tooltipText,
    "data-tooltip-position-strategy": "fixed",
    "data-tooltip-variant": "info"
  } : {};
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({}, tooltipAttributes, {
    className: `wpqt-main-border wpqt-relative wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-gap-2 wpqt-bg-gray-100 wpqt-p-2 hover:wpqt-bg-white ${className}`,
    onClick: onClick,
    children: [icon, text || loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-gap-2 wpqt-items-center wpqt-relative",
      children: [text && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: `wpqt-whitespace-nowrap ${loading ? "wpqt-invisible" : ""}`,
        children: text
      }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__.LoadingOval, {
        width: "20",
        height: "20",
        className: "wpqt-absolute wpqt-top-1/2 wpqt-left-1/2 wpqt-transform-center"
      })]
    }) : null, showTooltip && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Tooltip_WPQTTooltip__WEBPACK_IMPORTED_MODULE_2__.WPQTTooltip, {
      id: tooltipId
    })]
  }));
}
function WPQTOnlyIconBtn({
  icon,
  onClick = () => {},
  className,
  loading = false
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: `wpqt-main-border wpqt-p-1 wpqt-relative wpqt-inline-flex wpqt-cursor-pointer wpqt-bg-gray-100 hover:wpqt-bg-white ${className}`,
    onClick: onClick,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: `wpqt-flex wpqt-items-center ${loading ? "wpqt-invisible" : ""}`,
      children: icon
    }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__.LoadingOval, {
      width: "20",
      height: "20",
      className: "wpqt-absolute wpqt-top-1/2 wpqt-left-1/2 wpqt-transform-center"
    })]
  });
}


/***/ }),

/***/ "./src/components/common/DataDisplay/DataDisplay.tsx":
/*!***********************************************************!*\
  !*** ./src/components/common/DataDisplay/DataDisplay.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataDisplay: () => (/* binding */ DataDisplay),
/* harmony export */   DisplayRow: () => (/* binding */ DisplayRow)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function DataDisplay({
  children
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: children
  });
}
function DisplayRow({
  children,
  label,
  className = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: `wpqt-mb-1 ${className}`,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "wpqt-font-semibold",
      children: label
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "wpqt-text-base",
      children: children
    })]
  });
}


/***/ }),

/***/ "./src/components/common/Form/Field.tsx":
/*!**********************************************!*\
  !*** ./src/components/common/Form/Field.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTField: () => (/* binding */ WPQTField)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/field/field.js");


function WPQTField({
  children,
  className
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Field, {
    className: className,
    children: children
  });
}


/***/ }),

/***/ "./src/components/common/Form/FieldSet.tsx":
/*!*************************************************!*\
  !*** ./src/components/common/Form/FieldSet.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTFieldSet: () => (/* binding */ WPQTFieldSet)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/fieldset/fieldset.js");


function WPQTFieldSet({
  children,
  className
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Fieldset, {
    className: `wpqt-border-none ${className}`,
    children: children
  });
}


/***/ }),

/***/ "./src/components/common/Form/Label.tsx":
/*!**********************************************!*\
  !*** ./src/components/common/Form/Label.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTLabel: () => (/* binding */ WPQTLabel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/label/label.js");


function WPQTLabel({
  children,
  className
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Label, {
    className: `wpqt-mb-2 wpqt-block ${className}`,
    children: children
  });
}


/***/ }),

/***/ "./src/components/common/Input/Input.tsx":
/*!***********************************************!*\
  !*** ./src/components/common/Input/Input.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputType: () => (/* binding */ InputType),
/* harmony export */   WPQTInput: () => (/* binding */ WPQTInput)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/input/input.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Loading/Loading */ "./src/components/Loading/Loading.tsx");




var InputType;
(function (InputType) {
  InputType["TEXT"] = "text";
  InputType["PASSWORD"] = "password";
})(InputType || (InputType = {}));
const WPQTInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  value,
  onChange,
  isAutoFocus,
  className = "",
  wrapperClassName = "",
  disabled = false,
  type = InputType.TEXT,
  loading = false,
  inputId,
  name
}, ref) => {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: `wpqt-inline-block wpqt-relative wpqt-mb-3 ${wrapperClassName}`,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.Input, {
      ref: ref,
      autoFocus: isAutoFocus,
      className: `wpqt-block wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`,
      value: value,
      disabled: disabled,
      onChange: e => onChange(e.target.value),
      type: type,
      id: inputId,
      name: name
    }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_2__.LoadingOval, {
      width: "24",
      height: "24",
      className: "wpqt-absolute wpqt-right-[-32px] wpqt-top-1/2 wpqt-transform-y-center"
    })]
  });
});


/***/ }),

/***/ "./src/components/common/TextArea/TextArea.tsx":
/*!*****************************************************!*\
  !*** ./src/components/common/TextArea/TextArea.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTTextarea: () => (/* binding */ WPQTTextarea)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/textarea/textarea.js");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");



function WPQTTextarea({
  value,
  onChange,
  rowsCount = 3,
  colsCount,
  className = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Textarea, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__.clsx)("wpqt-border-1 wpqt-mb-3 wpqt-block wpqt-w-auto wpqt-resize-none wpqt-rounded-lg wpqt-border-qtBorder wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6", `focus:wpqt-shadow-none focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`),
    rows: rowsCount,
    cols: colsCount,
    value: value,
    onChange: e => onChange(e.target.value)
  });
}


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ADD_ASSIGNED_USER_TO_ARCHIVED_TASK: () => (/* binding */ ADD_ASSIGNED_USER_TO_ARCHIVED_TASK),
/* harmony export */   ADD_ASSIGNED_USER_TO_EDITING_TASK: () => (/* binding */ ADD_ASSIGNED_USER_TO_EDITING_TASK),
/* harmony export */   ADD_ASSIGNED_USER_TO_USER_TASK: () => (/* binding */ ADD_ASSIGNED_USER_TO_USER_TASK),
/* harmony export */   ADD_CUSTOM_FIELD: () => (/* binding */ ADD_CUSTOM_FIELD),
/* harmony export */   ADD_LABEL: () => (/* binding */ ADD_LABEL),
/* harmony export */   ADD_LABEL_ARCHIVED_TASK: () => (/* binding */ ADD_LABEL_ARCHIVED_TASK),
/* harmony export */   ADD_PIPELINE_AUTOMATION: () => (/* binding */ ADD_PIPELINE_AUTOMATION),
/* harmony export */   ADD_UPLOAD: () => (/* binding */ ADD_UPLOAD),
/* harmony export */   ADD_USER: () => (/* binding */ ADD_USER),
/* harmony export */   ALLOWED_UPLOAD_FILE_TYPES: () => (/* binding */ ALLOWED_UPLOAD_FILE_TYPES),
/* harmony export */   ARCHIVE_SETTINGS_MODAL_OPEN: () => (/* binding */ ARCHIVE_SETTINGS_MODAL_OPEN),
/* harmony export */   CHANGE_ARCHIVED_TASKS_LIMIT_FILTER: () => (/* binding */ CHANGE_ARCHIVED_TASKS_LIMIT_FILTER),
/* harmony export */   CHANGE_ARCHIVED_TASK_DONE_STATUS: () => (/* binding */ CHANGE_ARCHIVED_TASK_DONE_STATUS),
/* harmony export */   CHANGE_ARCHIVE_TASK_DONE_FILTER: () => (/* binding */ CHANGE_ARCHIVE_TASK_DONE_FILTER),
/* harmony export */   CHANGE_TASK_DONE_STATUS: () => (/* binding */ CHANGE_TASK_DONE_STATUS),
/* harmony export */   CHANGE_TASK_EXPORT_MODAL_METHOD: () => (/* binding */ CHANGE_TASK_EXPORT_MODAL_METHOD),
/* harmony export */   CHANGE_USER_SESSION_STATUS: () => (/* binding */ CHANGE_USER_SESSION_STATUS),
/* harmony export */   CHANGE_USER_SETTINGS_MODAL_OPEN: () => (/* binding */ CHANGE_USER_SETTINGS_MODAL_OPEN),
/* harmony export */   CHANGE_USER_STATUS: () => (/* binding */ CHANGE_USER_STATUS),
/* harmony export */   CHANGE_USER_TASK_DONE_STATUS: () => (/* binding */ CHANGE_USER_TASK_DONE_STATUS),
/* harmony export */   CLOSE_ARCHIVE_TASK_MODAL: () => (/* binding */ CLOSE_ARCHIVE_TASK_MODAL),
/* harmony export */   CLOSE_AUTOMATIONS_MODAL: () => (/* binding */ CLOSE_AUTOMATIONS_MODAL),
/* harmony export */   CLOSE_AUTOMATION_CREATOR_MODAL: () => (/* binding */ CLOSE_AUTOMATION_CREATOR_MODAL),
/* harmony export */   CLOSE_EDIT_TASK_MODAL: () => (/* binding */ CLOSE_EDIT_TASK_MODAL),
/* harmony export */   CLOSE_MOVE_TASK_MODAL: () => (/* binding */ CLOSE_MOVE_TASK_MODAL),
/* harmony export */   CLOSE_NEW_TASK_MODAL: () => (/* binding */ CLOSE_NEW_TASK_MODAL),
/* harmony export */   CLOSE_PIPELINE_IMPORT_MODAL: () => (/* binding */ CLOSE_PIPELINE_IMPORT_MODAL),
/* harmony export */   CLOSE_PIPELINE_MODAL: () => (/* binding */ CLOSE_PIPELINE_MODAL),
/* harmony export */   CLOSE_STAGE_MODAL: () => (/* binding */ CLOSE_STAGE_MODAL),
/* harmony export */   CLOSE_TASK_COLOR_MODAL: () => (/* binding */ CLOSE_TASK_COLOR_MODAL),
/* harmony export */   CLOSE_TASK_EXPORT_MODAL: () => (/* binding */ CLOSE_TASK_EXPORT_MODAL),
/* harmony export */   CLOSE_TASK_MODAL: () => (/* binding */ CLOSE_TASK_MODAL),
/* harmony export */   CLOSE_TASK_RESTORE_MODAL: () => (/* binding */ CLOSE_TASK_RESTORE_MODAL),
/* harmony export */   CLOSE_USER_MODAL: () => (/* binding */ CLOSE_USER_MODAL),
/* harmony export */   DATETIME_FORMAT: () => (/* binding */ DATETIME_FORMAT),
/* harmony export */   DEFAULT_IMPORT_LABEL_COLOR: () => (/* binding */ DEFAULT_IMPORT_LABEL_COLOR),
/* harmony export */   DEFAULT_TASK_FOCUS_COLOR: () => (/* binding */ DEFAULT_TASK_FOCUS_COLOR),
/* harmony export */   DELETE_CUSTOM_FIELD: () => (/* binding */ DELETE_CUSTOM_FIELD),
/* harmony export */   DELETE_USER: () => (/* binding */ DELETE_USER),
/* harmony export */   DELETE_USER_SESSION: () => (/* binding */ DELETE_USER_SESSION),
/* harmony export */   EDIT_ARCHIVED_TASK: () => (/* binding */ EDIT_ARCHIVED_TASK),
/* harmony export */   EDIT_CUSTOM_FIELD: () => (/* binding */ EDIT_CUSTOM_FIELD),
/* harmony export */   EDIT_LABEL: () => (/* binding */ EDIT_LABEL),
/* harmony export */   EDIT_USER: () => (/* binding */ EDIT_USER),
/* harmony export */   EDIT_USER_TASK: () => (/* binding */ EDIT_USER_TASK),
/* harmony export */   FILE_NAME_REGEX: () => (/* binding */ FILE_NAME_REGEX),
/* harmony export */   HAS_AUTOMATIONS: () => (/* binding */ HAS_AUTOMATIONS),
/* harmony export */   INIT_APP_STATE: () => (/* binding */ INIT_APP_STATE),
/* harmony export */   MAX_UPLOAD_FILE_SIZE: () => (/* binding */ MAX_UPLOAD_FILE_SIZE),
/* harmony export */   OPEN_ARCHIVE_TASK_MODAL: () => (/* binding */ OPEN_ARCHIVE_TASK_MODAL),
/* harmony export */   OPEN_AUTOMATIONS_MODAL: () => (/* binding */ OPEN_AUTOMATIONS_MODAL),
/* harmony export */   OPEN_AUTOMATION_CREATOR_MODAL: () => (/* binding */ OPEN_AUTOMATION_CREATOR_MODAL),
/* harmony export */   OPEN_EDIT_PIPELINE_MODAL: () => (/* binding */ OPEN_EDIT_PIPELINE_MODAL),
/* harmony export */   OPEN_EDIT_TASK_MODAL: () => (/* binding */ OPEN_EDIT_TASK_MODAL),
/* harmony export */   OPEN_EDIT_USER_MODAL: () => (/* binding */ OPEN_EDIT_USER_MODAL),
/* harmony export */   OPEN_MOVE_TASK_MODAL: () => (/* binding */ OPEN_MOVE_TASK_MODAL),
/* harmony export */   OPEN_NEW_PIPELINE_MODAL: () => (/* binding */ OPEN_NEW_PIPELINE_MODAL),
/* harmony export */   OPEN_NEW_STAGE_MODAL: () => (/* binding */ OPEN_NEW_STAGE_MODAL),
/* harmony export */   OPEN_NEW_TASK_MODAL: () => (/* binding */ OPEN_NEW_TASK_MODAL),
/* harmony export */   OPEN_NEW_USER_MODAL: () => (/* binding */ OPEN_NEW_USER_MODAL),
/* harmony export */   OPEN_PIPELINE_IMPORT_MODAL: () => (/* binding */ OPEN_PIPELINE_IMPORT_MODAL),
/* harmony export */   OPEN_STAGE_EDIT_MODAL: () => (/* binding */ OPEN_STAGE_EDIT_MODAL),
/* harmony export */   OPEN_TASK_COLOR_MODAL: () => (/* binding */ OPEN_TASK_COLOR_MODAL),
/* harmony export */   OPEN_TASK_EXPORT_MODAL: () => (/* binding */ OPEN_TASK_EXPORT_MODAL),
/* harmony export */   OPEN_TASK_RESTORE_MODAL: () => (/* binding */ OPEN_TASK_RESTORE_MODAL),
/* harmony export */   PIPELINES_SET: () => (/* binding */ PIPELINES_SET),
/* harmony export */   PIPELINE_ADD_EXISTING_PIPELINE: () => (/* binding */ PIPELINE_ADD_EXISTING_PIPELINE),
/* harmony export */   PIPELINE_ADD_LABEL_TO_TASK: () => (/* binding */ PIPELINE_ADD_LABEL_TO_TASK),
/* harmony export */   PIPELINE_ADD_PIPELINE: () => (/* binding */ PIPELINE_ADD_PIPELINE),
/* harmony export */   PIPELINE_ADD_STAGE: () => (/* binding */ PIPELINE_ADD_STAGE),
/* harmony export */   PIPELINE_ADD_TASK: () => (/* binding */ PIPELINE_ADD_TASK),
/* harmony export */   PIPELINE_ADD_USER_TO_TASK: () => (/* binding */ PIPELINE_ADD_USER_TO_TASK),
/* harmony export */   PIPELINE_CHANGE_TASK_DONE_STATUS: () => (/* binding */ PIPELINE_CHANGE_TASK_DONE_STATUS),
/* harmony export */   PIPELINE_DELETE_STAGE: () => (/* binding */ PIPELINE_DELETE_STAGE),
/* harmony export */   PIPELINE_EDIT_LABEL: () => (/* binding */ PIPELINE_EDIT_LABEL),
/* harmony export */   PIPELINE_EDIT_PIPELINE: () => (/* binding */ PIPELINE_EDIT_PIPELINE),
/* harmony export */   PIPELINE_EDIT_STAGE: () => (/* binding */ PIPELINE_EDIT_STAGE),
/* harmony export */   PIPELINE_EDIT_TASK: () => (/* binding */ PIPELINE_EDIT_TASK),
/* harmony export */   PIPELINE_MOVE_STAGE: () => (/* binding */ PIPELINE_MOVE_STAGE),
/* harmony export */   PIPELINE_MOVE_TASK: () => (/* binding */ PIPELINE_MOVE_TASK),
/* harmony export */   PIPELINE_REMOVE_ACTIVE_PIPELINE: () => (/* binding */ PIPELINE_REMOVE_ACTIVE_PIPELINE),
/* harmony export */   PIPELINE_REMOVE_LABEL: () => (/* binding */ PIPELINE_REMOVE_LABEL),
/* harmony export */   PIPELINE_REMOVE_LABEL_FROM_TASK: () => (/* binding */ PIPELINE_REMOVE_LABEL_FROM_TASK),
/* harmony export */   PIPELINE_REMOVE_PIPELINE: () => (/* binding */ PIPELINE_REMOVE_PIPELINE),
/* harmony export */   PIPELINE_REMOVE_TASK: () => (/* binding */ PIPELINE_REMOVE_TASK),
/* harmony export */   PIPELINE_REMOVE_USER_FROM_TASK: () => (/* binding */ PIPELINE_REMOVE_USER_FROM_TASK),
/* harmony export */   PIPELINE_REORDER_TASK: () => (/* binding */ PIPELINE_REORDER_TASK),
/* harmony export */   PIPELINE_SET_EXISTING_PIPELINES: () => (/* binding */ PIPELINE_SET_EXISTING_PIPELINES),
/* harmony export */   PIPELINE_SET_LOADING: () => (/* binding */ PIPELINE_SET_LOADING),
/* harmony export */   PIPELINE_SET_PIPELINE: () => (/* binding */ PIPELINE_SET_PIPELINE),
/* harmony export */   PIPELINE_SET_PRIMARY: () => (/* binding */ PIPELINE_SET_PRIMARY),
/* harmony export */   PIPELINE_SET_PRIMARY2: () => (/* binding */ PIPELINE_SET_PRIMARY2),
/* harmony export */   PIPELINE_SET_TASK_FOCUS_COLOR: () => (/* binding */ PIPELINE_SET_TASK_FOCUS_COLOR),
/* harmony export */   PIPELINE_TOGGLE_VIEW: () => (/* binding */ PIPELINE_TOGGLE_VIEW),
/* harmony export */   REFETCH_ACTIVE_PIPELINE_INTERVAL: () => (/* binding */ REFETCH_ACTIVE_PIPELINE_INTERVAL),
/* harmony export */   REMOVE_ARCHIVED_TASK: () => (/* binding */ REMOVE_ARCHIVED_TASK),
/* harmony export */   REMOVE_ARCHIVED_TASKS: () => (/* binding */ REMOVE_ARCHIVED_TASKS),
/* harmony export */   REMOVE_ASSIGNED_USER_FROM_EDITING_TASK: () => (/* binding */ REMOVE_ASSIGNED_USER_FROM_EDITING_TASK),
/* harmony export */   REMOVE_ASSIGNED_USER_FROM_USER_TASK: () => (/* binding */ REMOVE_ASSIGNED_USER_FROM_USER_TASK),
/* harmony export */   REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK: () => (/* binding */ REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK),
/* harmony export */   REMOVE_LABEL: () => (/* binding */ REMOVE_LABEL),
/* harmony export */   REMOVE_LABEL_ARCHIVED_TASK: () => (/* binding */ REMOVE_LABEL_ARCHIVED_TASK),
/* harmony export */   REMOVE_PIPELINE_AUTOMATION: () => (/* binding */ REMOVE_PIPELINE_AUTOMATION),
/* harmony export */   REMOVE_UPLOAD: () => (/* binding */ REMOVE_UPLOAD),
/* harmony export */   REMOVE_USER_TASK: () => (/* binding */ REMOVE_USER_TASK),
/* harmony export */   RESET_AUTOMATION_TO_ACTION: () => (/* binding */ RESET_AUTOMATION_TO_ACTION),
/* harmony export */   RESET_AUTOMATION_TO_TARGET: () => (/* binding */ RESET_AUTOMATION_TO_TARGET),
/* harmony export */   RESET_AUTOMATION_TO_TRIGGER: () => (/* binding */ RESET_AUTOMATION_TO_TRIGGER),
/* harmony export */   RESET_LABEL_CONTEXT: () => (/* binding */ RESET_LABEL_CONTEXT),
/* harmony export */   RESET_PASSWORD: () => (/* binding */ RESET_PASSWORD),
/* harmony export */   SET_ARCHIVE_FILTERED_PIPELINE: () => (/* binding */ SET_ARCHIVE_FILTERED_PIPELINE),
/* harmony export */   SET_ARCHIVE_FILTER_ORDER: () => (/* binding */ SET_ARCHIVE_FILTER_ORDER),
/* harmony export */   SET_ARCHIVE_LOADING: () => (/* binding */ SET_ARCHIVE_LOADING),
/* harmony export */   SET_ARCHIVE_SEARCH_VALUE: () => (/* binding */ SET_ARCHIVE_SEARCH_VALUE),
/* harmony export */   SET_ARCHIVE_TASKS: () => (/* binding */ SET_ARCHIVE_TASKS),
/* harmony export */   SET_AUTOMATION_ACTION_TARGET: () => (/* binding */ SET_AUTOMATION_ACTION_TARGET),
/* harmony export */   SET_AUTOMATION_META: () => (/* binding */ SET_AUTOMATION_META),
/* harmony export */   SET_CUSTOM_FIELDS: () => (/* binding */ SET_CUSTOM_FIELDS),
/* harmony export */   SET_CUSTOM_FIELDS_LOCATION: () => (/* binding */ SET_CUSTOM_FIELDS_LOCATION),
/* harmony export */   SET_CUSTOM_FIELD_INITIAL_DATA: () => (/* binding */ SET_CUSTOM_FIELD_INITIAL_DATA),
/* harmony export */   SET_CUSTOM_FIELD_LOADING: () => (/* binding */ SET_CUSTOM_FIELD_LOADING),
/* harmony export */   SET_CUSTOM_USER_PAGE_STYLES: () => (/* binding */ SET_CUSTOM_USER_PAGE_STYLES),
/* harmony export */   SET_FULL_PAGE_LOADING: () => (/* binding */ SET_FULL_PAGE_LOADING),
/* harmony export */   SET_LABELS: () => (/* binding */ SET_LABELS),
/* harmony export */   SET_LABEL_ACTION_STATE_CREATION: () => (/* binding */ SET_LABEL_ACTION_STATE_CREATION),
/* harmony export */   SET_LABEL_ACTION_STATE_EDITING: () => (/* binding */ SET_LABEL_ACTION_STATE_EDITING),
/* harmony export */   SET_LABEL_ACTION_STATE_SELECTION: () => (/* binding */ SET_LABEL_ACTION_STATE_SELECTION),
/* harmony export */   SET_PIPELINE_AUTOMATIONS: () => (/* binding */ SET_PIPELINE_AUTOMATIONS),
/* harmony export */   SET_PIPELINE_AUTOMATIONS_LOADING: () => (/* binding */ SET_PIPELINE_AUTOMATIONS_LOADING),
/* harmony export */   SET_SITE_URL: () => (/* binding */ SET_SITE_URL),
/* harmony export */   SET_STAGE_FILTER: () => (/* binding */ SET_STAGE_FILTER),
/* harmony export */   SET_UPLOADS: () => (/* binding */ SET_UPLOADS),
/* harmony export */   SET_USERS: () => (/* binding */ SET_USERS),
/* harmony export */   SET_USERS_SEARCH_VALUE: () => (/* binding */ SET_USERS_SEARCH_VALUE),
/* harmony export */   SET_USER_FILTER: () => (/* binding */ SET_USER_FILTER),
/* harmony export */   SET_USER_SESSIONS: () => (/* binding */ SET_USER_SESSIONS),
/* harmony export */   SET_USER_SESSIONS_SEARCH_VALUE: () => (/* binding */ SET_USER_SESSIONS_SEARCH_VALUE),
/* harmony export */   SET_USER_TASKS: () => (/* binding */ SET_USER_TASKS),
/* harmony export */   SET_USER_TASKS_FILTERED_PIPELINE: () => (/* binding */ SET_USER_TASKS_FILTERED_PIPELINE),
/* harmony export */   SET_USER_TASKS_SEARCH_VALUE: () => (/* binding */ SET_USER_TASKS_SEARCH_VALUE),
/* harmony export */   SET_WP_USERS: () => (/* binding */ SET_WP_USERS),
/* harmony export */   TASK_FOCUS_BORDER_STYLE: () => (/* binding */ TASK_FOCUS_BORDER_STYLE),
/* harmony export */   TASK_FOCUS_BORDER_WIDTH: () => (/* binding */ TASK_FOCUS_BORDER_WIDTH),
/* harmony export */   UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS: () => (/* binding */ UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS),
/* harmony export */   WP_QUICKTASKER_INVALID_SESSION_TOKEN: () => (/* binding */ WP_QUICKTASKER_INVALID_SESSION_TOKEN)
/* harmony export */ });
//Pipeline reducer constants
const PIPELINE_SET_LOADING = "SET_LOADING";
const PIPELINE_SET_PIPELINE = "SET_PIPELINE";
const PIPELINE_MOVE_TASK = "MOVE_TASK";
const PIPELINE_REORDER_TASK = "REORDER_TASK";
const PIPELINE_ADD_TASK = "ADD_TASK";
const PIPELINE_ADD_STAGE = "ADD_STAGE";
const PIPELINE_DELETE_STAGE = "DELETE_STAGE";
const PIPELINE_SET_EXISTING_PIPELINES = "SET_EXISTING_PIPELINES";
const PIPELINE_ADD_EXISTING_PIPELINE = "ADD_EXISTING_PIPELINE";
const PIPELINE_EDIT_TASK = "EDIT_TASK";
const PIPELINE_EDIT_STAGE = "EDIT_STAGE";
const PIPELINE_MOVE_STAGE = "MOVE_STAGE";
const PIPELINE_ADD_PIPELINE = "ADD_PIPELINE";
const PIPELINE_EDIT_PIPELINE = "EDIT_PIPELINE";
const PIPELINE_SET_PRIMARY = "SET_PRIMARY";
const PIPELINES_SET = "SET_PIPELINES";
const PIPELINE_SET_PRIMARY2 = "SET_PRIMARY";
const PIPELINE_ADD_USER_TO_TASK = "ADD_USER_TO_TASK";
const PIPELINE_REMOVE_USER_FROM_TASK = "REMOVE_USER_FROM_TASK";
const PIPELINE_CHANGE_TASK_DONE_STATUS = "CHANGE_TASK_DONE_STATUS";
const PIPELINE_REMOVE_PIPELINE = "REMOVE_PIPELINE";
const PIPELINE_REMOVE_ACTIVE_PIPELINE = "REMOVE_ACTIVE_PIPELINE";
const PIPELINE_REMOVE_TASK = "REMOVE_TASK";
const PIPELINE_TOGGLE_VIEW = "TOGGLE_VIEW";
const PIPELINE_ADD_LABEL_TO_TASK = "ADD_LABEL_TO_TASK";
const PIPELINE_REMOVE_LABEL_FROM_TASK = "REMOVE_LABEL_FROM_TASK";
const PIPELINE_EDIT_LABEL = "EDIT_PIPELINE_LABEL";
const PIPELINE_REMOVE_LABEL = "REMOVE_PIPELINE_LABEL";
const PIPELINE_SET_TASK_FOCUS_COLOR = "SET_TASK_FOCUS_COLOR";
//Active pipeline task view reducer constants
const SET_STAGE_FILTER = "SET_STAGE_FILTER";
const SET_USER_FILTER = "SET_USER_FILTER";
//Modal reducer constants
const OPEN_NEW_TASK_MODAL = "OPEN_NEW_TASK_MODAL";
const CLOSE_NEW_TASK_MODAL = "CLOSE_NEW_TASK_MODAL";
const OPEN_EDIT_TASK_MODAL = "OPEN_EDIT_TASK_MODAL";
const CLOSE_EDIT_TASK_MODAL = "CLOSE_EDIT_TASK_MODAL";
const CLOSE_TASK_MODAL = "CLOSE_TASK_MODAL";
const OPEN_NEW_STAGE_MODAL = "OPEN_NEW_STAGE_MODAL";
const CLOSE_STAGE_MODAL = "CLOSE_STAGE_MODAL";
const OPEN_STAGE_EDIT_MODAL = "OPEN_STAGE_EDIT_MODAL";
const OPEN_NEW_PIPELINE_MODAL = "OPEN_NEW_PIPELINE_MODAL";
const OPEN_EDIT_PIPELINE_MODAL = "OPEN_EDIT_PIPELINE_MODAL";
const CLOSE_PIPELINE_MODAL = "CLOSE_PIPELINE_EDIT_MODAL";
const CLOSE_USER_MODAL = "CLOSE_USER_MODAL";
const OPEN_NEW_USER_MODAL = "OPEN_NEW_USER_MODAL";
const OPEN_EDIT_USER_MODAL = "OPEN_EDIT_USER_MODAL";
const ADD_ASSIGNED_USER_TO_EDITING_TASK = "ADD_ASSIGNED_USER_TO_EDITING_TASK";
const REMOVE_ASSIGNED_USER_FROM_EDITING_TASK = "REMOVE_ASSIGNED_USER_FROM_EDITING_TASK";
const CHANGE_USER_SETTINGS_MODAL_OPEN = "CHANGE_USER_SETTINGS_MODAL_OPEN";
const CHANGE_TASK_DONE_STATUS = "CHANGE_TASK_DONE_STATUS";
const OPEN_MOVE_TASK_MODAL = "OPEN_MOVE_TASK_MODAL";
const CLOSE_MOVE_TASK_MODAL = "CLOSE_MOVE_TASK_MODAL";
const OPEN_TASK_COLOR_MODAL = "OPEN_TASK_COLOR_MODAL";
const CLOSE_TASK_COLOR_MODAL = "CLOSE_TASK_COLOR_MODAL";
const OPEN_TASK_EXPORT_MODAL = "OPEN_TASK_EXPORT_MODAL";
const CLOSE_TASK_EXPORT_MODAL = "CLOSE_TASK_EXPORT_MODAL";
const CHANGE_TASK_EXPORT_MODAL_METHOD = "CHANGE_TASK_EXPORT_MODAL_METHOD";
const OPEN_PIPELINE_IMPORT_MODAL = "OPEN_PIPELINE_IMPORT_MODAL";
const CLOSE_PIPELINE_IMPORT_MODAL = "CLOSE_PIPELINE_IMPORT_MODAL";
const OPEN_AUTOMATION_CREATOR_MODAL = "OPEN_AUTOMATION_CREATOR_MODAL";
const CLOSE_AUTOMATION_CREATOR_MODAL = "CLOSE_AUTOMATION_CREATOR_MODAL";
const OPEN_AUTOMATIONS_MODAL = "OPEN_AUTOMATIONS_MODAL";
const CLOSE_AUTOMATIONS_MODAL = "CLOSE_AUTOMATIONS_MODAL";
const ARCHIVE_SETTINGS_MODAL_OPEN = "ARCHIVE_SETTINGS_MODAL_OPEN";
const OPEN_TASK_RESTORE_MODAL = "OPEN_TASK_RESTORE_MODAL";
const CLOSE_TASK_RESTORE_MODAL = "CLOSE_TASK_RESTORE_MODAL";
//Archive reducer constants
const SET_ARCHIVE_TASKS = "SET_ARCHIVE_TASKS";
const OPEN_ARCHIVE_TASK_MODAL = "OPEN_ARCHIVE_TASK_MODAL";
const CLOSE_ARCHIVE_TASK_MODAL = "CLOSE_ARCHIVE_TASK_MODAL";
const SET_ARCHIVE_SEARCH_VALUE = "SET_ARCHIVE_SEARCH_VALUE";
const SET_ARCHIVE_FILTERED_PIPELINE = "SET_ARCHIVE_FILTERED_PIPELINE";
const REMOVE_ARCHIVED_TASK = "REMOVE_ARCHIVED_TASK";
const REMOVE_ARCHIVED_TASKS = "REMOVE_ARCHIVED_TASKS";
const ADD_ASSIGNED_USER_TO_ARCHIVED_TASK = "ADD_ASSIGNED_USER_TO_ARCHIVED_TASK";
const REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK = "REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK";
const CHANGE_ARCHIVED_TASK_DONE_STATUS = "CHANGE_ARCHIVED_TASK_DONE_STATUS";
const EDIT_ARCHIVED_TASK = "EDIT_ARCHIVED_TASK";
const CHANGE_ARCHIVE_TASK_DONE_FILTER = "CHANGE_ARCHIVE_TASK_DONE_FILTER";
const ADD_LABEL_ARCHIVED_TASK = "ADD_LABEL_ARCHIVED_TASK";
const REMOVE_LABEL_ARCHIVED_TASK = "REMOVE_LABEL_ARCHIVED_TASK";
const CHANGE_ARCHIVED_TASKS_LIMIT_FILTER = "CHANGE_ARCHIVED_TASKS_LIMIT_FILTER";
const SET_ARCHIVE_LOADING = "SET_ARCHIVE_LOADING";
const SET_ARCHIVE_FILTER_ORDER = "SET_ARCHIVE_FILTER_ORDER";
//User reducer constants
const SET_USERS = "SET_USERS";
const SET_WP_USERS = "SET_WP_USERS";
const ADD_USER = "ADD_USER";
const SET_USERS_SEARCH_VALUE = "SET_USERS_SEARCH_VALUE";
const EDIT_USER = "EDIT_USER";
const DELETE_USER = "DELETE_USER";
const CHANGE_USER_STATUS = "CHANGE_USER_STATUS";
const RESET_PASSWORD = "RESET_PASSWORD";
//App reducer
const SET_SITE_URL = "SET_SITE_URL";
const INIT_APP_STATE = "INIT_APP_STATE";
const SET_CUSTOM_USER_PAGE_STYLES = "SET_CUSTOM_USER_PAGE_STYLES";
//Loading reducer
const SET_FULL_PAGE_LOADING = "SET_FULL_PAGE_LOADING";
//User sessions reducer
const SET_USER_SESSIONS_SEARCH_VALUE = "SET_USER_SESSIONS_SEARCH_VALUE";
const SET_USER_SESSIONS = "SET_USER_SESSIONS";
const CHANGE_USER_SESSION_STATUS = "CHANGE_USER_SESSION_STATUS";
const DELETE_USER_SESSION = "DELETE_USER_SESSION";
//User tasks reducer
const SET_USER_TASKS = "SET_USER_TASKS";
const SET_USER_TASKS_SEARCH_VALUE = "SET_USER_TASKS_SEARCH_VALUE";
const REMOVE_USER_TASK = "REMOVE_USER_TASK";
const EDIT_USER_TASK = "EDIT_USER_TASK";
const SET_USER_TASKS_FILTERED_PIPELINE = "SET_USER_TASKS_FILTERED_PIPELINE";
const ADD_ASSIGNED_USER_TO_USER_TASK = "ADD_ASSIGNED_USER_TO_USER_TASK";
const REMOVE_ASSIGNED_USER_FROM_USER_TASK = "REMOVE_ASSIGNED_USER_FROM_USER_TASK";
const CHANGE_USER_TASK_DONE_STATUS = "CHANGE_USER_TASK_DONE_STATUS";
//Custom Fields reducer
const SET_CUSTOM_FIELDS = "SET_CUSTOM_FIELDS";
const ADD_CUSTOM_FIELD = "ADD_CUSTOM_FIELD";
const EDIT_CUSTOM_FIELD = "EDIT_CUSTOM_FIELD";
const DELETE_CUSTOM_FIELD = "DELETE_CUSTOM_FIELD";
const SET_CUSTOM_FIELD_LOADING = "SET_CUSTOM_FIELD_LOADING";
const SET_CUSTOM_FIELDS_LOCATION = "SET_CUSTOM_FIELDS_LOCATION";
const SET_CUSTOM_FIELD_INITIAL_DATA = "SET_CUSTOM_FIELD_INITIAL_DATA";
//Labels reducer
const SET_LABELS = "SET_LABELS";
const ADD_LABEL = "ADD_LABEL";
const REMOVE_LABEL = "REMOVE_LABEL";
const EDIT_LABEL = "EDIT_LABEL";
const SET_LABEL_ACTION_STATE_SELECTION = "SET_LABEL_ACTION_STATE_SELECTION";
const SET_LABEL_ACTION_STATE_EDITING = "SET_LABEL_ACTION_STATE_EDITING";
const SET_LABEL_ACTION_STATE_CREATION = "SET_LABEL_ACTION_STATE_CREATION";
const RESET_LABEL_CONTEXT = "RESET_LABEL_CONTEXT";
//Pipeline automations reducer
const SET_PIPELINE_AUTOMATIONS = "SET_PIPELINE_AUTOMATIONS";
const SET_PIPELINE_AUTOMATIONS_LOADING = "SET_PIPELINE_AUTOMATIONS_LOADING";
const REMOVE_PIPELINE_AUTOMATION = "REMOVE_PIPELINE_AUTOMATION";
const ADD_PIPELINE_AUTOMATION = "ADD_PIPELINE_AUTOMATION";
const UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS = "UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS";
//Pipeline automation creeation reducer
const SET_AUTOMATION_META = "SET_META";
const SET_AUTOMATION_ACTION_TARGET = "SET_ACTION_TARGET";
const RESET_AUTOMATION_TO_TARGET = "RESET_AUTOMATION_TO_TARGET";
const RESET_AUTOMATION_TO_TRIGGER = "RESET_AUTOMATION_TO_TRIGGER";
const RESET_AUTOMATION_TO_ACTION = "RESET_AUTOMATION_TO_ACTION";
//Upload reducer constants
const SET_UPLOADS = "SET_UPLOADS";
const ADD_UPLOAD = "ADD_UPLOAD";
const REMOVE_UPLOAD = "REMOVE_UPLOAD";
//Timers
const REFETCH_ACTIVE_PIPELINE_INTERVAL = 30000;
//Misc
const WP_QUICKTASKER_INVALID_SESSION_TOKEN = "Invalid session token";
const HAS_AUTOMATIONS = false;
const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
//Styles
const DEFAULT_TASK_FOCUS_COLOR = "#ffffff";
const TASK_FOCUS_BORDER_WIDTH = "6px";
const TASK_FOCUS_BORDER_STYLE = "solid";
const DEFAULT_IMPORT_LABEL_COLOR = "#16a34a";
//Validation
const ALLOWED_UPLOAD_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "text/plain", "image/jpeg", "image/png", "image/gif", "image/bmp", "image/svg+xml", "audio/mpeg", "audio/wav", "audio/ogg", "video/mp4", "video/webm", "video/ogg", "application/zip", "application/x-rar-compressed", "application/x-tar", "application/gzip"];
const MAX_UPLOAD_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const FILE_NAME_REGEX = /^[a-zA-Z0-9_\-.]+$/;


/***/ }),

/***/ "./src/hooks/actions/useCustomFieldActions.ts":
/*!****************************************************!*\
  !*** ./src/hooks/actions/useCustomFieldActions.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCustomFieldActions: () => (/* binding */ useCustomFieldActions)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/api */ "./src/api/api.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



function useCustomFieldActions() {
  const addCustomField = (entityId, entityType, type, name, description, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.addCustomFieldRequest)(entityId, entityType, type, name, description);
      if (callback) callback(response.data);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to add a custom field", "quicktasker"));
    }
  });
  const markCustomFieldAsDeleted = (customFieldId, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.markCustomFieldAsDeletedRequest)(customFieldId);
      if (callback) callback();
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to mark custom field as deleted", "quicktasker"));
    }
  });
  const restoreCustomField = (customFieldId, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.restoreCustomFieldRequest)(customFieldId);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom field restored", "quicktasker"));
      if (callback) callback(response.data);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to restore custom field", "quicktasker"));
    }
  });
  const updateCustomFieldValue = (customFieldId, value, entityId, entityType, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.updateCustomFieldValueRequest)(customFieldId, value, entityId, entityType);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom field value updated", "quicktasker"));
      if (callback) callback();
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to update custom field value", "quicktasker"));
    }
  });
  const updateCustomFieldDefaultValue = (customFieldId, value) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.updateCustomFieldDefaultValueRequest)(customFieldId, value);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom field default value updated", "quicktasker"));
      return {
        success: true
      };
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to update custom field default value", "quicktasker"));
      return {
        success: false
      };
    }
  });
  return {
    addCustomField,
    markCustomFieldAsDeleted,
    restoreCustomField,
    updateCustomFieldValue,
    updateCustomFieldDefaultValue
  };
}


/***/ }),

/***/ "./src/providers/AppContextProvider.tsx":
/*!**********************************************!*\
  !*** ./src/providers/AppContextProvider.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppContext: () => (/* binding */ AppContext),
/* harmony export */   AppContextProvider: () => (/* binding */ AppContextProvider),
/* harmony export */   initialState: () => (/* binding */ initialState)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _reducers_app_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/app-reducer */ "./src/reducers/app-reducer.ts");




const initialState = {
  siteURL: "",
  pluginURL: "",
  publicUserPageId: "",
  is_customFields: false,
  timezone: "",
  isUserAllowedToDelete: false,
  userPageCustomStyles: "",
  taskUploadsURL: ""
};
const AppContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  appDispatch: () => {}
});
const AppContextProvider = ({
  children
}) => {
  const [state, appDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_app_reducer__WEBPACK_IMPORTED_MODULE_3__.reducer, initialState);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const siteURL = window.wpqt.siteURL;
    const publicUserPageId = window.wpqt.publicUserPageId;
    const timezone = window.wpqt.timezone;
    const isUserAllowedToDelete = window.wpqt.isUserAllowedToDelete === "1";
    const userPageCustomStyles = window.wpqt.userPageCustomStyles;
    const pluginURL = window.wpqt.pluginURL;
    const taskUploadsURL = window.wpqt.taskUploadsURL;
    appDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_2__.INIT_APP_STATE,
      payload: {
        siteURL,
        publicUserPageId,
        timezone,
        isUserAllowedToDelete,
        userPageCustomStyles,
        pluginURL,
        taskUploadsURL
      }
    });
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AppContext.Provider, {
    value: {
      state,
      appDispatch
    },
    children: children
  });
};


/***/ }),

/***/ "./src/providers/CustomFieldsContextProvider.tsx":
/*!*******************************************************!*\
  !*** ./src/providers/CustomFieldsContextProvider.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFieldsContext: () => (/* binding */ CustomFieldsContext),
/* harmony export */   CustomFieldsContextProvider: () => (/* binding */ CustomFieldsContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _reducers_custom_fields_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers/custom-fields-reducer */ "./src/reducers/custom-fields-reducer.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







const initialState = {
  customFields: [],
  loading: true,
  entityId: "",
  entityType: null
};
const CustomFieldsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  customFieldsDispatch: () => {},
  fetchCustomFields: () => {}
});
const CustomFieldsContextProvider = ({
  children,
  entityId,
  entityType
}) => {
  const [state, customFieldsDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_custom_fields_reducer__WEBPACK_IMPORTED_MODULE_6__.reducer, initialState);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchCustomFields();
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    customFieldsDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_CUSTOM_FIELD_INITIAL_DATA,
      payload: {
        entityType,
        entityId
      }
    });
  }, [entityType, entityId]);
  const fetchCustomFields = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      customFieldsDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_CUSTOM_FIELD_LOADING,
        payload: true
      });
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getCustomFieldsRequest)(entityId, entityType, true);
      customFieldsDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_CUSTOM_FIELDS,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to fetch custom fields", "quicktasker"));
    } finally {
      customFieldsDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_CUSTOM_FIELD_LOADING,
        payload: false
      });
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CustomFieldsContext.Provider, {
    value: {
      state,
      customFieldsDispatch,
      fetchCustomFields
    },
    children: children
  });
};


/***/ }),

/***/ "./src/reducers/app-reducer.ts":
/*!*************************************!*\
  !*** ./src/reducers/app-reducer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");

const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_SITE_URL:
      {
        const siteURL = action.payload;
        return Object.assign(Object.assign({}, state), {
          siteURL
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.INIT_APP_STATE:
      {
        const {
          siteURL,
          publicUserPageId,
          timezone,
          isUserAllowedToDelete,
          userPageCustomStyles,
          pluginURL,
          taskUploadsURL
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          siteURL,
          publicUserPageId,
          timezone,
          isUserAllowedToDelete,
          userPageCustomStyles,
          pluginURL,
          taskUploadsURL
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_CUSTOM_USER_PAGE_STYLES:
      {
        const userPageCustomStyles = action.payload;
        return Object.assign(Object.assign({}, state), {
          userPageCustomStyles
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "./src/reducers/custom-fields-reducer.ts":
/*!***********************************************!*\
  !*** ./src/reducers/custom-fields-reducer.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");

const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_CUSTOM_FIELD_LOADING:
      {
        const loading = action.payload;
        return Object.assign(Object.assign({}, state), {
          loading
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_CUSTOM_FIELD_INITIAL_DATA:
      {
        const {
          entityId,
          entityType
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          entityId,
          entityType
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_CUSTOM_FIELDS:
      {
        const customFields = action.payload;
        return Object.assign(Object.assign({}, state), {
          customFields
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.ADD_CUSTOM_FIELD:
      {
        const customField = action.payload;
        return Object.assign(Object.assign({}, state), {
          customFields: [...state.customFields, customField]
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.DELETE_CUSTOM_FIELD:
      {
        const customFieldId = action.payload;
        const customFields = state.customFields.filter(customField => customField.id !== customFieldId);
        return Object.assign(Object.assign({}, state), {
          customFields
        });
      }
    default:
      {
        return state;
      }
  }
};


/***/ }),

/***/ "./src/types/automation.ts":
/*!*********************************!*\
  !*** ./src/types/automation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionTargetType: () => (/* binding */ ActionTargetType),
/* harmony export */   AutomationAction: () => (/* binding */ AutomationAction),
/* harmony export */   AutomationTrigger: () => (/* binding */ AutomationTrigger),
/* harmony export */   SeatRegAutomationTrigger: () => (/* binding */ SeatRegAutomationTrigger),
/* harmony export */   TargetType: () => (/* binding */ TargetType),
/* harmony export */   WoocommerceOrderAutomationTrigger: () => (/* binding */ WoocommerceOrderAutomationTrigger)
/* harmony export */ });
var AutomationTrigger;
(function (AutomationTrigger) {
  AutomationTrigger["TASK_DONE"] = "task-done";
  AutomationTrigger["Task_NOT_DONE"] = "task-not-done";
  AutomationTrigger["TASK_CREATED"] = "task-created";
  AutomationTrigger["TASK_DELETED"] = "task-deleted";
  AutomationTrigger["TASK_ASSIGNED"] = "task-assigned";
  AutomationTrigger["TASK_UNASSIGNED"] = "task-unassigned";
  AutomationTrigger["TASK_PUBLIC_COMMENT_ADDED"] = "task-public-comment-added";
  AutomationTrigger["TASK_PRIVATE_COMMENT_ADDED"] = "task-private-comment-added";
  AutomationTrigger["TASK_FILE_UPLOADED"] = "task-attachment-added";
  AutomationTrigger["TASK_FILE_DELETED"] = "task-attachment-deleted";
})(AutomationTrigger || (AutomationTrigger = {}));
var WoocommerceOrderAutomationTrigger;
(function (WoocommerceOrderAutomationTrigger) {
  WoocommerceOrderAutomationTrigger["WOOCOMMERCE_ORDER_ADDED"] = "woocommerce-order-added";
})(WoocommerceOrderAutomationTrigger || (WoocommerceOrderAutomationTrigger = {}));
var SeatRegAutomationTrigger;
(function (SeatRegAutomationTrigger) {
  SeatRegAutomationTrigger["SEATREG_BOOKING_CREATED"] = "seatreg-booking-created";
  SeatRegAutomationTrigger["SEATREG_BOOKING_APPROVED"] = "seatreg-booking-approved";
  SeatRegAutomationTrigger["SEATREG_BOOKING_APPROVED_VIA_MANAGER"] = "seatreg-booking-approved-via-manager";
  SeatRegAutomationTrigger["SEATREG_BOOKING_PENDING"] = "seatreg-booking-pending";
  SeatRegAutomationTrigger["SEATREG_BOOKING_PENDING_VIA_MANAGER"] = "seatreg-booking-pending-via-manager";
})(SeatRegAutomationTrigger || (SeatRegAutomationTrigger = {}));
var TargetType;
(function (TargetType) {
  TargetType["PIPELINE"] = "pipeline";
  TargetType["Stage"] = "stage";
  TargetType["Task"] = "task";
  TargetType["quicktasker"] = "quicktasker";
  TargetType["WOOCOMMERCE_ORDER"] = "woocommerce-order";
  TargetType["SEATREG_BOOKING"] = "seatreg-booking";
})(TargetType || (TargetType = {}));
var ActionTargetType;
(function (ActionTargetType) {
  ActionTargetType["PIPELINE"] = "pipeline";
  ActionTargetType["STAGE"] = "stage";
  ActionTargetType["TASK"] = "task";
  ActionTargetType["QUICKTASKER"] = "quicktasker";
  ActionTargetType["WP_USER"] = "wp-user";
})(ActionTargetType || (ActionTargetType = {}));
var AutomationAction;
(function (AutomationAction) {
  AutomationAction["ARCHIVE_TASK"] = "archive-task";
  AutomationAction["ASSIGN_USER"] = "assign-user";
  AutomationAction["NEW_ENTITY_EMAIL"] = "new-entity-email";
  AutomationAction["DELETED_ENTITY_EMAIL"] = "deleted-entity-email";
  AutomationAction["TASK_ASSIGNED_EMAIL"] = "task-assigned-email";
  AutomationAction["TASK_UNASSIGNED_EMAIL"] = "task-unassigned-email";
  AutomationAction["TASK_PUBLIC_COMMENT_ADDED_EMAIL"] = "task-public-comment-added-email";
  AutomationAction["TASK_PRIVATE_COMMENT_ADDED_EMAIL"] = "task-private-comment-added-email";
  AutomationAction["TASK_FILE_UPLOADED_EMAIL"] = "task-attachment-added-email";
  AutomationAction["TASK_FILE_DELETED_EMAIL"] = "task-attachment-deleted-email";
  AutomationAction["CREATE_TASK"] = "create-task";
  AutomationAction["SEND_SLACK_MESSAGE"] = "send-slack-message";
})(AutomationAction || (AutomationAction = {}));


/***/ }),

/***/ "./src/types/custom-field.ts":
/*!***********************************!*\
  !*** ./src/types/custom-field.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFieldEntityType: () => (/* binding */ CustomFieldEntityType),
/* harmony export */   CustomFieldType: () => (/* binding */ CustomFieldType)
/* harmony export */ });
var CustomFieldType;
(function (CustomFieldType) {
  CustomFieldType["Text"] = "text";
  CustomFieldType["Select"] = "select";
  CustomFieldType["Checkbox"] = "checkbox";
  CustomFieldType["Radio"] = "radio";
  CustomFieldType["Datetime"] = "datetime";
  CustomFieldType["File"] = "file";
})(CustomFieldType || (CustomFieldType = {}));
var CustomFieldEntityType;
(function (CustomFieldEntityType) {
  CustomFieldEntityType["User"] = "user";
  CustomFieldEntityType["Pipeline"] = "pipeline";
  CustomFieldEntityType["Users"] = "users";
  CustomFieldEntityType["Task"] = "task";
})(CustomFieldEntityType || (CustomFieldEntityType = {}));


/***/ }),

/***/ "./src/types/user.ts":
/*!***************************!*\
  !*** ./src/types/user.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTypes: () => (/* binding */ UserTypes)
/* harmony export */ });
var UserTypes;
(function (UserTypes) {
  UserTypes["QUICKTASKER"] = "quicktasker";
  UserTypes["WP_USER"] = "wp-user";
})(UserTypes || (UserTypes = {}));


/***/ }),

/***/ "./src/user-page-app/UserPageApp.tsx":
/*!*******************************************!*\
  !*** ./src/user-page-app/UserPageApp.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _components_ErrorBoundary_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ErrorBoundary/ErrorBoundary */ "./src/components/ErrorBoundary/ErrorBoundary.tsx");
/* harmony import */ var _components_Pages_AssignableTasksPage_AssignableTasksPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Pages/AssignableTasksPage/AssignableTasksPage */ "./src/user-page-app/components/Pages/AssignableTasksPage/AssignableTasksPage.tsx");
/* harmony import */ var _components_Pages_ErrorPage_ErrorPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Pages/ErrorPage/ErrorPage */ "./src/user-page-app/components/Pages/ErrorPage/ErrorPage.tsx");
/* harmony import */ var _components_Pages_HomePage_HomePage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Pages/HomePage/HomePage */ "./src/user-page-app/components/Pages/HomePage/HomePage.tsx");
/* harmony import */ var _components_Pages_LoadingPage_LoadingPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Pages/LoadingPage/LoadingPage */ "./src/user-page-app/components/Pages/LoadingPage/LoadingPage.tsx");
/* harmony import */ var _components_Pages_LoginPage_LoginPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Pages/LoginPage/LoginPage */ "./src/user-page-app/components/Pages/LoginPage/LoginPage.tsx");
/* harmony import */ var _components_Pages_NotificationsPage_NotificationsPage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Pages/NotificationsPage/NotificationsPage */ "./src/user-page-app/components/Pages/NotificationsPage/NotificationsPage.tsx");
/* harmony import */ var _components_Pages_ProfilePage_ProfilePage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Pages/ProfilePage/ProfilePage */ "./src/user-page-app/components/Pages/ProfilePage/ProfilePage.tsx");
/* harmony import */ var _components_Pages_SetUpPage_SetUpPage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/Pages/SetUpPage/SetUpPage */ "./src/user-page-app/components/Pages/SetUpPage/SetUpPage.tsx");
/* harmony import */ var _components_Pages_TaskCommentsPage_TaskCommentsPage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/Pages/TaskCommentsPage/TaskCommentsPage */ "./src/user-page-app/components/Pages/TaskCommentsPage/TaskCommentsPage.tsx");
/* harmony import */ var _components_Pages_TaskPage_TaskPage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/Pages/TaskPage/TaskPage */ "./src/user-page-app/components/Pages/TaskPage/TaskPage.tsx");
/* harmony import */ var _components_Pages_UserCommentsPage_UserCommentsPage__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/Pages/UserCommentsPage/UserCommentsPage */ "./src/user-page-app/components/Pages/UserCommentsPage/UserCommentsPage.tsx");
/* harmony import */ var _components_Pages_UserTasksPage_UserTasksPage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/Pages/UserTasksPage/UserTasksPage */ "./src/user-page-app/components/Pages/UserTasksPage/UserTasksPage.tsx");
/* harmony import */ var _hooks_useSession__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./hooks/useSession */ "./src/user-page-app/hooks/useSession.tsx");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./providers/UserPageNotificationsContextProvider */ "./src/user-page-app/providers/UserPageNotificationsContextProvider.tsx");





















function UserPageContent() {
  const {
    state: {
      initialLoading,
      isActiveUser,
      setupCompleted
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_18__.UserPageAppContext);
  const {
    isLoggedIn
  } = (0,_hooks_useSession__WEBPACK_IMPORTED_MODULE_17__.useSession)();
  if (initialLoading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_LoadingPage_LoadingPage__WEBPACK_IMPORTED_MODULE_8__.LoadingPage, {});
  }
  if (!isActiveUser) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_ErrorPage_ErrorPage__WEBPACK_IMPORTED_MODULE_6__.ErrorPage, {
      errorTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User is not active", "quicktasker"),
      errorDescription: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Your user is not active. Please contact site administrator.", "quicktasker")
    });
  }
  if (!setupCompleted) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_SetUpPage_SetUpPage__WEBPACK_IMPORTED_MODULE_12__.SetUpPage, {});
  }
  if (!isLoggedIn()) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_LoginPage_LoginPage__WEBPACK_IMPORTED_MODULE_9__.LoginPage, {});
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_20__.HashRouter, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Routes, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Route, {
        path: "/",
        element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_HomePage_HomePage__WEBPACK_IMPORTED_MODULE_7__.HomePage, {})
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Route, {
        path: "/user/profile",
        element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_ProfilePage_ProfilePage__WEBPACK_IMPORTED_MODULE_11__.PprofilePage, {})
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Route, {
        path: "/user-tasks",
        element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_UserTasksPage_UserTasksPage__WEBPACK_IMPORTED_MODULE_16__.UserTasksPage, {})
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Route, {
        path: "/assignable-tasks",
        element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_AssignableTasksPage_AssignableTasksPage__WEBPACK_IMPORTED_MODULE_5__.AssignableTasksPage, {})
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Route, {
        path: "/tasks/:taskHash",
        element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_TaskPage_TaskPage__WEBPACK_IMPORTED_MODULE_14__.TaskPage, {})
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Route, {
        path: "/notifications",
        element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_NotificationsPage_NotificationsPage__WEBPACK_IMPORTED_MODULE_10__.NotificationsPage, {})
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Route, {
        path: "/tasks/:taskHash/comments",
        element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_TaskCommentsPage_TaskCommentsPage__WEBPACK_IMPORTED_MODULE_13__.TaskCommentsPage, {})
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_21__.Route, {
        path: "/user/comments",
        element: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_UserCommentsPage_UserCommentsPage__WEBPACK_IMPORTED_MODULE_15__.UserCommentsPage, {})
      })]
    })
  });
}
function UserPageApp() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ErrorBoundary_ErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_18__.UserPageAppContextProvider, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_19__.UserPageNotificationsContextProvider, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserPageContent, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_toastify__WEBPACK_IMPORTED_MODULE_3__.ToastContainer, {
          closeOnClick: true,
          position: "bottom-center",
          toastClassName: "wpqt-bottom-[80px] lg:wpqt-bottom-[20px]",
          autoClose: 2000
        })]
      })
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserPageApp);

/***/ }),

/***/ "./src/user-page-app/api/user-page-api.ts":
/*!************************************************!*\
  !*** ./src/user-page-app/api/user-page-api.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTaskCommentRequest: () => (/* binding */ addTaskCommentRequest),
/* harmony export */   addUserCommentRequest: () => (/* binding */ addUserCommentRequest),
/* harmony export */   assignTaskToUser: () => (/* binding */ assignTaskToUser),
/* harmony export */   changeTaskDoneStatusRequest: () => (/* binding */ changeTaskDoneStatusRequest),
/* harmony export */   changeTaskStageRequest: () => (/* binding */ changeTaskStageRequest),
/* harmony export */   getAssignableTasksRequest: () => (/* binding */ getAssignableTasksRequest),
/* harmony export */   getAssignedTasksRequest: () => (/* binding */ getAssignedTasksRequest),
/* harmony export */   getOverviewRequest: () => (/* binding */ getOverviewRequest),
/* harmony export */   getTaskCommentsRequest: () => (/* binding */ getTaskCommentsRequest),
/* harmony export */   getTaskDataRequest: () => (/* binding */ getTaskDataRequest),
/* harmony export */   getUserCommentsRequest: () => (/* binding */ getUserCommentsRequest),
/* harmony export */   getUserPageCommentsRequest: () => (/* binding */ getUserPageCommentsRequest),
/* harmony export */   getUserPageStatusRequest: () => (/* binding */ getUserPageStatusRequest),
/* harmony export */   getUserPageUserDataRequest: () => (/* binding */ getUserPageUserDataRequest),
/* harmony export */   logInUserPageRequest: () => (/* binding */ logInUserPageRequest),
/* harmony export */   logoutUserPageRequest: () => (/* binding */ logoutUserPageRequest),
/* harmony export */   setUpUserPageRequest: () => (/* binding */ setUpUserPageRequest),
/* harmony export */   unAssignTaskFromUser: () => (/* binding */ unAssignTaskFromUser),
/* harmony export */   updateCustomFieldValueRequest: () => (/* binding */ updateCustomFieldValueRequest)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/url */ "./src/utils/url.ts");


function getCommonHeaders() {
  const userPageCode = (0,_utils_url__WEBPACK_IMPORTED_MODULE_1__.getUserPageCodeParam)();
  let headers = {
    "Content-Type": "application/json",
    "X-WPQT-USER-API-Nonce": window.wpqt_user.userApiNonce
  };
  if (userPageCode) {
    headers = Object.assign(Object.assign({}, headers), {
      "X-WPQT-USER-PAGE-CODE": userPageCode
    });
  }
  return headers;
}
function getUserPageStatusRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/user-page/status`,
    method: "GET",
    headers: getCommonHeaders()
  });
}
function setUpUserPageRequest(data) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/user-page/setup`,
    data,
    method: "POST",
    headers: getCommonHeaders()
  });
}
function logInUserPageRequest(password) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/user-page/login`,
    method: "POST",
    data: {
      password
    },
    headers: getCommonHeaders()
  });
}
function getOverviewRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "GET",
    path: `/wpqt/v1/user-page/overview`,
    headers: getCommonHeaders()
  });
}
function getAssignedTasksRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "GET",
    path: `/wpqt/v1/user-page/assigned-tasks`,
    headers: getCommonHeaders()
  });
}
function getAssignableTasksRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "GET",
    path: `/wpqt/v1/user-page/assignable-tasks`,
    headers: getCommonHeaders()
  });
}
function getTaskDataRequest(taskHash) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "GET",
    path: `/wpqt/v1/user-page/tasks/${taskHash}`,
    headers: getCommonHeaders()
  });
}
function assignTaskToUser(taskHash) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "POST",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/users`,
    headers: getCommonHeaders()
  });
}
function unAssignTaskFromUser(taskHash) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "DELETE",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/users`,
    headers: getCommonHeaders()
  });
}
function changeTaskStageRequest(taskHash, stageId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "PATCH",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/stage`,
    data: {
      stageId
    },
    headers: getCommonHeaders()
  });
}
function changeTaskDoneStatusRequest(taskHash, isDone) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "PATCH",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/done`,
    data: {
      done: isDone
    },
    headers: getCommonHeaders()
  });
}
function logoutUserPageRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "POST",
    path: `/wpqt/v1/user-page/logout`,
    headers: getCommonHeaders()
  });
}
function getTaskCommentsRequest(taskHash) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "GET",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/comments`,
    headers: getCommonHeaders()
  });
}
function addTaskCommentRequest(taskHash, comment) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "POST",
    path: `/wpqt/v1/user-page/tasks/${taskHash}/comments`,
    data: {
      comment
    },
    headers: getCommonHeaders()
  });
}
function getUserCommentsRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "GET",
    path: `/wpqt/v1/user-page/user/comments`,
    headers: getCommonHeaders()
  });
}
function addUserCommentRequest(comment) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "POST",
    path: `/wpqt/v1/user-page/user/comments`,
    data: {
      comment
    },
    headers: getCommonHeaders()
  });
}
function getUserPageCommentsRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "GET",
    path: `/wpqt/v1/user-page/comments`,
    headers: getCommonHeaders()
  });
}
function getUserPageUserDataRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "GET",
    path: `/wpqt/v1/user-page/user`,
    headers: getCommonHeaders()
  });
}
/*
  ==================================================================================================================================================================================================================
  Custom Field requests
  ==================================================================================================================================================================================================================
*/
function updateCustomFieldValueRequest(entityId, entityType, customFieldId, value) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "PATCH",
    path: `/wpqt/v1/user-page/custom-fields/${customFieldId}`,
    data: {
      entityId,
      entityType,
      customFieldId,
      value
    },
    headers: getCommonHeaders()
  });
}


/***/ }),

/***/ "./src/user-page-app/components/CommentsApp/CommentItem/CommentItem.tsx":
/*!******************************************************************************!*\
  !*** ./src/user-page-app/components/CommentsApp/CommentItem/CommentItem.tsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommentItem: () => (/* binding */ CommentItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


function CommentItem({
  comment
}) {
  const isAdminComment = comment.is_admin_comment;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-flex-col wpqt-items-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: isAdminComment ? "wpqt-font-semibold wpqt-text-lg" : "wpqt-font-normal",
        children: comment.author_name
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-sm",
        children: isAdminComment ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Admin", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("QuickTasker", "quicktasker")
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-break-all wpqt-text-center wpqt-leading-normal wpqt-mb-4 md:wpqt-mb-0",
      children: comment.text
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/CommentsApp/CommentsApp.tsx":
/*!******************************************************************!*\
  !*** ./src/user-page-app/components/CommentsApp/CommentsApp.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommentsApp: () => (/* binding */ CommentsApp)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ChatBubbleLeftIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _components_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
/* harmony import */ var _hooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../hooks/useLocalStorage */ "./src/user-page-app/hooks/useLocalStorage.tsx");
/* harmony import */ var _providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../providers/UserPageNotificationsContextProvider */ "./src/user-page-app/providers/UserPageNotificationsContextProvider.tsx");
/* harmony import */ var _CommentItem_CommentItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CommentItem/CommentItem */ "./src/user-page-app/components/CommentsApp/CommentItem/CommentItem.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};










function CommentsApp({
  comments,
  addComments
}) {
  const {
    checkNewComments
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_7__.UserPageNotificationsContext);
  const [comment, setComment] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const commentsContainerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [addCommentLoading, setAddCommentLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    storeComments
  } = (0,_hooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_6__.useLocalStorage)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTo({
        top: commentsContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [comments]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (comments && comments.length > 0) {
      storeSeenComments();
    }
  }, [comments]);
  const saveComment = () => __awaiter(this, void 0, void 0, function* () {
    if (!comment) {
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Comment cant be empty", "quicktasker"));
      return;
    }
    setAddCommentLoading(true);
    yield addComments(comment);
    setComment("");
    setAddCommentLoading(false);
  });
  const storeSeenComments = () => __awaiter(this, void 0, void 0, function* () {
    yield storeComments(comments);
    yield checkNewComments();
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-flex-col wpqt-gap-7",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      ref: commentsContainerRef,
      className: "wpqt-comments-app-height wpqt-overflow-y-auto",
      children: comments && comments.length === 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-center",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No comments found", "quicktasker")
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-grid wpqt-grid-cols-1 md:wpqt-grid-cols-[auto_1fr] wpqt-gap-3 md:wpqt-gap-8 wpqt-items-center wpqt-px-2",
        children: comments.map(comment => {
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentItem_CommentItem__WEBPACK_IMPORTED_MODULE_8__.CommentItem, {
            comment: comment
          }, comment.id);
        })
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-flex-col wpqt-gap-4 wpqt-w-full md:wpqt-w-2/4 wpqt-mx-auto",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_5__.WPQTTextarea, {
        value: comment,
        onChange: setComment
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_4__.WPQTIconButton, {
        loading: addCommentLoading,
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add comment", "quicktasker"),
        onClick: saveComment,
        icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
          className: "wpqt-icon-green wpqt-size-5"
        })
      })]
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/CustomField/CustomField/CustomField.tsx":
/*!******************************************************************************!*\
  !*** ./src/user-page-app/components/CustomField/CustomField/CustomField.tsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomField: () => (/* binding */ CustomField)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_Input_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _components_CustomField_CustomFields_components_CustomField_CustomField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/CustomField/CustomFields/components/CustomField/CustomField */ "./src/components/CustomField/CustomFields/components/CustomField/CustomField.tsx");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/debounce */ "./src/utils/debounce.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







function CustomField({
  data,
  saveCustomFieldValueChange,
  valueChangeEnabled = true
}) {
  const handleChange = value => __awaiter(this, void 0, void 0, function* () {
    yield saveCustomFieldValueChange(data.id, value);
  });
  switch (data.type) {
    case _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldType.Text:
      {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextCustomField, {
          data: data,
          onHandleChange: handleChange,
          valueChangeEnabled: valueChangeEnabled
        });
      }
    case _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldType.Checkbox:
      {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CheckboxCustomField, {
          data: data,
          onHandleChange: handleChange,
          valueChangeEnabled: valueChangeEnabled
        });
      }
  }
}
function TextCustomField({
  data,
  onHandleChange,
  valueChangeEnabled
}) {
  const [value, setValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setValue(data.value || data.default_value || "");
  }, [data.value, data.default_value]);
  const debouncedHandleChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)((0,_utils_debounce__WEBPACK_IMPORTED_MODULE_6__.debounce)(newValue => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield onHandleChange(newValue);
    setLoading(false);
  }), 600), [onHandleChange]);
  const onChange = newValue => {
    setValue(newValue);
    debouncedHandleChange(newValue);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-text-center",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_CustomField_CustomFields_components_CustomField_CustomField__WEBPACK_IMPORTED_MODULE_3__.CustomFieldTitle, {
      name: data.name,
      description: data.description
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Input_Input__WEBPACK_IMPORTED_MODULE_2__.WPQTInput, {
      value: value,
      onChange: onChange,
      disabled: !valueChangeEnabled,
      loading: loading
    })]
  });
}
function CheckboxCustomField({
  data,
  onHandleChange,
  valueChangeEnabled
}) {
  const [isChecked, setIsChecked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(data.value === "true");
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setIsChecked(data.value === "true");
  }, [data.value]);
  const onChange = e => __awaiter(this, void 0, void 0, function* () {
    setIsChecked(e.target.checked);
    setLoading(true);
    yield onHandleChange(e.target.checked ? "true" : "false");
    setLoading(false);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-text-center",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_CustomField_CustomFields_components_CustomField_CustomField__WEBPACK_IMPORTED_MODULE_3__.CustomFieldTitle, {
      name: data.name,
      description: data.description
    }), loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__.Loading, {
      ovalSize: "24"
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
      type: "checkbox",
      checked: isChecked,
      onChange: onChange,
      disabled: !valueChangeEnabled
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/CustomField/CustomFieldsWrap/CustomFieldsWrap.tsx":
/*!****************************************************************************************!*\
  !*** ./src/user-page-app/components/CustomField/CustomFieldsWrap/CustomFieldsWrap.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFieldsWrap: () => (/* binding */ CustomFieldsWrap)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _hooks_actions_useCustomFieldActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/actions/useCustomFieldActions */ "./src/user-page-app/hooks/actions/useCustomFieldActions.ts");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _CustomField_CustomField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CustomField/CustomField */ "./src/user-page-app/components/CustomField/CustomField/CustomField.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};






function CustomFieldsWrap({
  entityId,
  entityType,
  entity,
  customFields
}) {
  const {
    state: {
      cf,
      userId
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserPageAppContext);
  const {
    updateCustomFieldValue
  } = (0,_hooks_actions_useCustomFieldActions__WEBPACK_IMPORTED_MODULE_3__.useCustomFieldActions)();
  const valueChangeEnabled = entityType === _types_custom_field__WEBPACK_IMPORTED_MODULE_2__.CustomFieldEntityType.User || entityType === _types_custom_field__WEBPACK_IMPORTED_MODULE_2__.CustomFieldEntityType.Task && "assigned_users" in entity && entity.assigned_users.some(user => user.id === userId);
  const saveCustomFieldValueChange = (customFieldId, value) => __awaiter(this, void 0, void 0, function* () {
    yield updateCustomFieldValue(entityId, entityType, customFieldId, value);
  });
  if (!cf || !customFields) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3",
    children: customFields.map(cf => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomField_CustomField__WEBPACK_IMPORTED_MODULE_5__.CustomField, {
      data: cf,
      valueChangeEnabled: valueChangeEnabled,
      saveCustomFieldValueChange: saveCustomFieldValueChange
    }, cf.id))
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Dropdown/ProfileDropdown/ProfileDropdown.tsx":
/*!***********************************************************************************!*\
  !*** ./src/user-page-app/components/Dropdown/ProfileDropdown/ProfileDropdown.tsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfileDropdown: () => (/* binding */ ProfileDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArrowRightStartOnRectangleIcon.js");
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/solid */ "./node_modules/@heroicons/react/24/solid/esm/UserCircleIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_Dropdown_WPQTDropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Dropdown/WPQTDropdown */ "./src/components/Dropdown/WPQTDropdown.tsx");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _hooks_useSession__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../hooks/useSession */ "./src/user-page-app/hooks/useSession.tsx");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};












function ProfileDropdown() {
  const {
    loadUserPageStatus,
    userPageAppDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_8__.UserPageAppContext);
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_6__.useErrorHandler)();
  const {
    deleteSessionCookie
  } = (0,_hooks_useSession__WEBPACK_IMPORTED_MODULE_7__.useSession)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useNavigate)();
  const logOut = () => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_4__.logoutUserPageRequest)();
      yield deleteSessionCookie();
      userPageAppDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_USER_LOGGED_IN,
        payload: false
      });
      loadUserPageStatus();
    } catch (error) {
      handleError(error);
      loadUserPageStatus();
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Dropdown_WPQTDropdown__WEBPACK_IMPORTED_MODULE_3__.WPQTDropdown, {
    anchor: "bottom end",
    menuBtn: ({
      active
    }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: `wpqt-icon-blue wpqt-size-11 ${active ? "wpqt-text-blue-900" : ""} hover:wpqt-text-blue-900`
      })
    }),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_WPQTDropdown__WEBPACK_IMPORTED_MODULE_3__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("View profile", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "wpqt-icon-blue wpqt-size-4"
      }),
      className: "wpqt-mb-4",
      onClick: () => {
        navigate("/user/profile");
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_WPQTDropdown__WEBPACK_IMPORTED_MODULE_3__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Log out", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
        className: "wpqt-icon-red wpqt-size-4"
      }),
      className: "!wpqt-mb-0",
      onClick: logOut
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Modal/StageSelectionModal/StageSelectionModal.tsx":
/*!****************************************************************************************!*\
  !*** ./src/user-page-app/components/Modal/StageSelectionModal/StageSelectionModal.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StageSelectionModal: () => (/* binding */ StageSelectionModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/radio-group/radio-group.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/field/field.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/label/label.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PencilSquareIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _components_Modal_WPQTModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/Modal/WPQTModal */ "./src/components/Modal/WPQTModal.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../hooks/actions/useTaskActions */ "./src/user-page-app/hooks/actions/useTaskActions.ts");
/* harmony import */ var _providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/UserPageTaskContextProvider */ "./src/user-page-app/providers/UserPageTaskContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};











function StageSelectionModal({
  task,
  stages,
  open,
  onClose
}) {
  const {
    userTaskDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_8__.UserPageTaskContext);
  const [selectedStageId, setSelectedStageId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(task.stage_id);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    changeTaskStage
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_7__.useTaskActions)();
  const onSave = () => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield changeTaskStage(task.task_hash, selectedStageId, () => {
      userTaskDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_6__.UPDATE_USER_PAGE_TASK_STAGE,
        payload: selectedStageId
      });
    });
    setLoading(false);
    onClose();
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Modal_WPQTModal__WEBPACK_IMPORTED_MODULE_5__.WPQTModal, {
    modalOpen: open,
    closeModal: onClose,
    size: "sm",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
      className: "wpqt-text-center",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task stage selection", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_9__.RadioGroup, {
      value: selectedStageId,
      onChange: setSelectedStageId,
      className: "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-5",
      children: stages.map(stage => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_10__.Field, {
        className: "wpqt-flex wpqt-items-center wpqt-gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_9__.Radio, {
          value: stage.id,
          className: "wpqt-group wpqt-flex wpqt-size-5 wpqt-items-center wpqt-justify-center wpqt-rounded-full wpqt-border data-[checked]:wpqt-bg-blue-400",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
            className: "wpqt-invisible wpqt-size-2 wpqt-rounded-full wpqt-bg-white group-data-[checked]:wpqt-visible"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_11__.Label, {
          children: stage.name
        })]
      }, stage.id))
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mt-5 wpqt-flex wpqt-justify-center",
      children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__.LoadingOval, {
        width: "32",
        height: "32"
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "quicktasker"),
        icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
          className: "wpqt-icon-green wpqt-size-5"
        }),
        onClick: onSave
      })
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Navigation/Navigation.tsx":
/*!****************************************************************!*\
  !*** ./src/user-page-app/components/Navigation/Navigation.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationBar: () => (/* binding */ NavigationBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/HomeIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArrowPathIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/BellAlertIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/BellIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/UserPageNotificationsContextProvider */ "./src/user-page-app/providers/UserPageNotificationsContextProvider.tsx");
/* harmony import */ var _Dropdown_ProfileDropdown_ProfileDropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Dropdown/ProfileDropdown/ProfileDropdown */ "./src/user-page-app/components/Dropdown/ProfileDropdown/ProfileDropdown.tsx");







function NavigationBar({
  loading,
  onRefresh = () => {}
}) {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useNavigate)();
  const {
    checkNewComments
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_3__.UserPageNotificationsContext);
  const refresh = () => {
    onRefresh();
    checkNewComments();
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-grid wpqt-h-[60px] wpqt-grid-cols-[1fr_auto_1fr] wpqt-items-center wpqt-border-0 wpqt-border-t wpqt-border-solid wpqt-border-y-gray-300 wpqt-px-4 wpqt-py-2 lg:wpqt-border-b lg:wpqt-border-t-0",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-flex wpqt-gap-2",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_6__["default"], {
        onClick: () => navigate("/"),
        className: "wpqt-size-8 wpqt-cursor-pointer"
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-text-center",
      children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_2__.LoadingOval, {
        width: "30",
        height: "30"
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "wpqt-icon-blue wpqt-size-9 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover",
        onClick: refresh
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-items-center wpqt-justify-end wpqt-gap-3",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NotificationIcon, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Dropdown_ProfileDropdown_ProfileDropdown__WEBPACK_IMPORTED_MODULE_4__.ProfileDropdown, {})]
    })]
  });
}
function NotificationIcon() {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useNavigate)();
  const {
    state: {
      newComments
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_3__.UserPageNotificationsContext);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: newComments.length > 0 ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: "wpqt-icon-red wpqt-size-7 wpqt-animate-bellShake wpqt-cursor-pointer",
      onClick: () => {
        navigate("/notifications");
      }
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
      className: "wpqt-icon-gray wpqt-size-7 wpqt-cursor-pointer",
      onClick: () => {
        navigate("/notifications");
      }
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/AssignableTasksPage/AssignableTasksPage.tsx":
/*!****************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/AssignableTasksPage/AssignableTasksPage.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssignableTasksPage: () => (/* binding */ AssignableTasksPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CalendarIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ViewColumnsIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ClockIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CheckBadgeIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_Card_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Card/Card */ "./src/components/Card/Card.tsx");
/* harmony import */ var _components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem */ "./src/components/Card/WPQTCardDataItem/WPQTCardDataItem.tsx");
/* harmony import */ var _hooks_useTimezone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hooks/useTimezone */ "./src/user-page-app/hooks/useTimezone.ts");
/* harmony import */ var _providers_UserAssignableTasksContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/UserAssignableTasksContextProvider */ "./src/user-page-app/providers/UserAssignableTasksContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");










function AssignableTasksPage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserAssignableTasksContextProvider__WEBPACK_IMPORTED_MODULE_6__.UserAssignableTasksContextProvider, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AssignebaleTasksPageContent, {})
  });
}
function AssignebaleTasksPageContent() {
  const {
    state: {
      loading,
      assignableTasks
    },
    loadAssignableTasks
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserAssignableTasksContextProvider__WEBPACK_IMPORTED_MODULE_6__.UserAssignableTasksContext);
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  const {
    convertToWPTimezone
  } = (0,_hooks_useTimezone__WEBPACK_IMPORTED_MODULE_5__.useTimezone)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_7__.PageWrap, {
    loading: loading,
    onRefresh: loadAssignableTasks,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_7__.PageContentWrap, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_7__.PageTitle, {
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Tasks available for self-assignment", "quicktasker"),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Assignable tasks", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-user-page-card-flex",
        children: assignableTasks.map(task => {
          const dueDate = task.due_date ? convertToWPTimezone(task.due_date) : null;
          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCard, {
            className: "wpqt-cursor-pointer wpqt-min-w-[340px]",
            title: task.name,
            description: task.description,
            onClick: () => navigate(`/tasks/${task.task_hash}`),
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__.WPQTCardDataItem, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Created", "quicktasker"),
              value: convertToWPTimezone(task.created_at),
              icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
                className: "wpqt-size-5 wpqt-icon-blue"
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__.WPQTCardDataItem, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board", "quicktasker"),
              value: task.pipeline_name ? task.pipeline_name : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board is deleted!", "quicktasker"),
              icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
                className: "wpqt-size-5 wpqt-icon-blue"
              })
            }), dueDate && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__.WPQTCardDataItem, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Due date", "quicktasker"),
              value: dueDate,
              icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
                className: "wpqt-size-5 wpqt-icon-blue"
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__.WPQTCardDataItem, {
              label: task.is_done ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task completed", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task not completed", "quicktasker"),
              value: task.stage_id,
              icon: task.is_done ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
                className: "wpqt-size-5 wpqt-icon-green"
              }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
                className: "wpqt-size-5 wpqt-icon-gray"
              })
            })]
          }, task.task_hash);
        })
      })]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/ErrorPage/ErrorPage.tsx":
/*!********************************************************************!*\
  !*** ./src/user-page-app/components/Pages/ErrorPage/ErrorPage.tsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorPage: () => (/* binding */ ErrorPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");


function ErrorPage({
  errorTitle,
  errorDescription
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_1__.PageScreenMiddle, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
      children: errorTitle
    }), errorDescription && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      children: errorDescription
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/HomePage/HomePage.tsx":
/*!******************************************************************!*\
  !*** ./src/user-page-app/components/Pages/HomePage/HomePage.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EyeIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};









function HomePage() {
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [overview, setOverview] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_5__.useErrorHandler)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    getOverviewData();
  }, []);
  const getOverviewData = () => __awaiter(this, void 0, void 0, function* () {
    try {
      setLoading(true);
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_4__.getOverviewRequest)();
      setOverview(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.PageWrap, {
    loading: loading,
    onRefresh: getOverviewData,
    className: "wpqt-flex wpqt-items-center wpqt-justify-center",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.PageContentWrap, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center wpqt-gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Assigned tasks:", "quicktasker"), " ", overview === null || overview === void 0 ? void 0 : overview.assignedTasksCount]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
            className: "wpqt-size-5 wpqt-icon-blue"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("View assigned tasks", "quicktasker"),
          className: "wpqt-mb-5",
          onClick: () => navigate("/user-tasks")
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Assignable tasks:", "quicktasker"), " ", overview === null || overview === void 0 ? void 0 : overview.assignableTaskCount]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
            className: "wpqt-size-5 wpqt-icon-green"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("View assignable tasks", "quicktasker"),
          onClick: () => navigate("/assignable-tasks")
        })]
      })
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/LoadingPage/LoadingPage.tsx":
/*!************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/LoadingPage/LoadingPage.tsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingPage: () => (/* binding */ LoadingPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");


function LoadingPage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__.FullLoading, {});
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/LoginPage/LoginPage.tsx":
/*!********************************************************************!*\
  !*** ./src/user-page-app/components/Pages/LoginPage/LoginPage.tsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPage: () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
/* harmony import */ var _components_QuickTaskerUserLogin_QuickTaskerUserLogin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/QuickTaskerUserLogin/QuickTaskerUserLogin */ "./src/user-page-app/components/Pages/LoginPage/components/QuickTaskerUserLogin/QuickTaskerUserLogin.tsx");






function LoginPage() {
  const {
    state: {
      userName,
      isQuicktaskerUser,
      isWordPressUser
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_3__.UserPageAppContext);
  if (isQuicktaskerUser) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_QuickTaskerUserLogin_QuickTaskerUserLogin__WEBPACK_IMPORTED_MODULE_5__.QuickTaskerUserLogin, {});
  }
  if (isWordPressUser) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.PageScreenMiddle, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.PageTitle, {
        titleClassName: "wpqt-font-normal",
        className: "wpqt-mb-2",
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Your WordPress session has expired", "quicktasker"),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hello", "quicktasker"), userName)
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please log in to continue", "quicktasker")
      })]
    });
  }
  return null;
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/LoginPage/components/ForgotPassword/ForgotPassword.tsx":
/*!***************************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/LoginPage/components/ForgotPassword/ForgotPassword.tsx ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ForgotPassword: () => (/* binding */ ForgotPassword)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



function ForgotPassword() {
  const [guideOpen, setGuideOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-flex-col wpqt-gap3 wpqt-items-center wpqt-mt-2 wpqt-text-sm wpqt-cursor-pointer wpqt-relative wpqt-min-w-[300px] wpqt-text-blue-500",
    onClick: () => setGuideOpen(!guideOpen),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-2",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Forgot the password?", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: `wpqt-text-center wpqt-absolute wpqt-top-full wpqt-left-0 wpqt-w-full ${guideOpen ? "wpqt-animate-fadeIn" : "wpqt-animate-fadeOut"} ${!guideOpen && "wpqt-hidden"}`,
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please contact the site admin to reset your password", "quicktasker")
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/LoginPage/components/QuickTaskerUserLogin/QuickTaskerUserLogin.tsx":
/*!***************************************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/LoginPage/components/QuickTaskerUserLogin/QuickTaskerUserLogin.tsx ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuickTaskerUserLogin: () => (/* binding */ QuickTaskerUserLogin)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _components_common_Form_Field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../components/common/Form/Field */ "./src/components/common/Form/Field.tsx");
/* harmony import */ var _components_common_Form_FieldSet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../components/common/Form/FieldSet */ "./src/components/common/Form/FieldSet.tsx");
/* harmony import */ var _components_common_Input_Input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../components/common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _hooks_useSession__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../hooks/useSession */ "./src/user-page-app/hooks/useSession.tsx");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
/* harmony import */ var _ForgotPassword_ForgotPassword__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../ForgotPassword/ForgotPassword */ "./src/user-page-app/components/Pages/LoginPage/components/ForgotPassword/ForgotPassword.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
















function QuickTaskerUserLogin() {
  const {
    state: {
      userName
    },
    userPageAppDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_13__.UserPageAppContext);
  const [password, setPassword] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    setSessionCookie
  } = (0,_hooks_useSession__WEBPACK_IMPORTED_MODULE_12__.useSession)();
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_11__.useErrorHandler)();
  const login = e => __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
    if (!password) {
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please enter a password", "quicktasker"));
      return;
    }
    try {
      setLoading(true);
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_9__.logInUserPageRequest)(password);
      yield setSessionCookie(response.data);
      userPageAppDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_10__.SET_USER_LOGGED_IN,
        payload: true
      });
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_14__.PageScreenMiddle, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_14__.PageTitle, {
      titleClassName: "wpqt-font-normal",
      className: "wpqt-mb-2",
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please log in to continue", "quicktasker"),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hello %s", "quicktasker"), userName)
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
      onSubmit: login,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_common_Form_FieldSet__WEBPACK_IMPORTED_MODULE_7__.WPQTFieldSet, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Form_Field__WEBPACK_IMPORTED_MODULE_6__.WPQTField, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Input_Input__WEBPACK_IMPORTED_MODULE_8__.WPQTInput, {
            value: password,
            onChange: setPassword,
            type: _components_common_Input_Input__WEBPACK_IMPORTED_MODULE_8__.InputType.PASSWORD
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Form_Field__WEBPACK_IMPORTED_MODULE_6__.WPQTField, {
          className: "wpqt-flex wpqt-justify-center",
          children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__.Loading, {
            ovalSize: "32"
          }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__.WPQTButton, {
            btnText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Login", "quicktasker"),
            type: _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__.ButtonType.SUBMIT
          })
        })]
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ForgotPassword_ForgotPassword__WEBPACK_IMPORTED_MODULE_15__.ForgotPassword, {})]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/NotificationsPage/NotificationsPage.tsx":
/*!************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/NotificationsPage/NotificationsPage.tsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationsPage: () => (/* binding */ NotificationsPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/UserPageNotificationsContextProvider */ "./src/user-page-app/providers/UserPageNotificationsContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
/* harmony import */ var _components_NotificationItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/NotificationItem */ "./src/user-page-app/components/Pages/NotificationsPage/components/NotificationItem.tsx");






function NotificationsPage() {
  const {
    state: {
      newComments,
      loading
    },
    checkNewComments
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageNotificationsContextProvider__WEBPACK_IMPORTED_MODULE_3__.UserPageNotificationsContext);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    checkNewComments();
  }, []);
  const groupedComments = newComments.reduce((acc, comment) => {
    const key = `${comment.type_id}-${comment.type}`;
    if (!acc[key]) {
      acc[key] = {
        typeId: comment.type_id,
        type: comment.type,
        numberOfComments: 0,
        subjectName: comment.subject_name || "",
        subjectHash: comment.subject_hash || ""
      };
    }
    acc[key].numberOfComments += 1;
    return acc;
  }, {});
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.PageWrap, {
    loading: loading,
    onRefresh: checkNewComments,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.PageContentWrap, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "wpqt-text-center",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("You have %d new %s", "quicktasker"), newComments.length, newComments.length === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("comment", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("comments", "quicktasker"))
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-grid wpqt-grid-cols-1  sm:wpqt-grid-cols-2 wpqt-gap-2 lg:wpqt-grid-cols-4",
        children: Object.values(groupedComments).map(notification => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_NotificationItem__WEBPACK_IMPORTED_MODULE_5__.NotificationItem, {
          notification: notification
        }, notification.typeId))
      })]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/NotificationsPage/components/NotificationItem.tsx":
/*!**********************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/NotificationsPage/components/NotificationItem.tsx ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationItem: () => (/* binding */ NotificationItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_Card_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../components/Card/Card */ "./src/components/Card/Card.tsx");



function NotificationItem({
  notification
}) {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  const onClick = () => {
    if (notification.type === "task") {
      navigate(`/tasks/${notification.subjectHash}/comments`);
    } else {
      navigate(`/user/comments`);
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_1__.WPQTCard, {
    title: notification.subjectName,
    onClick: onClick,
    className: "wpqt-cursor-pointer",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [notification.numberOfComments, " new comments"]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/Page/Page.tsx":
/*!**********************************************************!*\
  !*** ./src/user-page-app/components/Pages/Page/Page.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageContentWrap: () => (/* binding */ PageContentWrap),
/* harmony export */   PageScreenMiddle: () => (/* binding */ PageScreenMiddle),
/* harmony export */   PageTitle: () => (/* binding */ PageTitle),
/* harmony export */   PageWrap: () => (/* binding */ PageWrap)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Navigation/Navigation */ "./src/user-page-app/components/Navigation/Navigation.tsx");


function PageWrap({
  children,
  loading = false,
  onRefresh,
  className
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-flex-col",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: `wpqt-user-app-content-height wpqt-order-1 wpqt-overflow-y-auto lg:wpqt-order-2 ${className}`,
      children: children
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-order-2 lg:wpqt-order-1",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_1__.NavigationBar, {
        loading: loading,
        onRefresh: onRefresh
      })
    })]
  });
}
function PageContentWrap({
  children
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-p-4",
    children: children
  });
}
function PageScreenMiddle({
  children
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-flex wpqt-h-screen wpqt-flex-col wpqt-items-center wpqt-justify-center",
    children: children
  });
}
function PageTitle({
  children,
  description,
  titleClassName = "",
  className = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: `wpqt-mb-6 ${className}`,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
      className: `wpqt-m-0 wpqt-text-center wpqt-text-2xl wpqt-font-normal ${titleClassName}`,
      children: children
    }), description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mt-1 wpqt-text-center wpqt-text-gray-600",
      children: description
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/ProfilePage/ProfilePage.tsx":
/*!************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/ProfilePage/ProfilePage.tsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PprofilePage: () => (/* binding */ PprofilePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _providers_UserPageUserContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/UserPageUserContextProvider */ "./src/user-page-app/providers/UserPageUserContextProvider.tsx");
/* harmony import */ var _CustomField_CustomFieldsWrap_CustomFieldsWrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../CustomField/CustomFieldsWrap/CustomFieldsWrap */ "./src/user-page-app/components/CustomField/CustomFieldsWrap/CustomFieldsWrap.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
/* harmony import */ var _components_ProfileActions_ProfileActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/ProfileActions/ProfileActions */ "./src/user-page-app/components/Pages/ProfilePage/components/ProfileActions/ProfileActions.tsx");
/* harmony import */ var _components_UserDetails_UserDetails__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/UserDetails/UserDetails */ "./src/user-page-app/components/Pages/ProfilePage/components/UserDetails/UserDetails.tsx");









function PprofilePage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserPageUserContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserPageUserContextProvider, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProfilePageContent, {})
  });
}
function ProfilePageContent() {
  const {
    state: {
      loading,
      user,
      customFields
    },
    loadUserData
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageUserContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserPageUserContext);
  if (!user) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.PageWrap, {
    loading: loading,
    onRefresh: loadUserData,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.PageContentWrap, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.PageTitle, {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User details", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_UserDetails_UserDetails__WEBPACK_IMPORTED_MODULE_8__.UserDetails, {
          user: user
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomField_CustomFieldsWrap_CustomFieldsWrap__WEBPACK_IMPORTED_MODULE_5__.CustomFieldsWrap, {
          entityId: user.id,
          entityType: _types_custom_field__WEBPACK_IMPORTED_MODULE_3__.CustomFieldEntityType.User,
          entity: user,
          customFields: customFields
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ProfileActions_ProfileActions__WEBPACK_IMPORTED_MODULE_7__.ProfileActions, {})]
      })]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/ProfilePage/components/ProfileActions/ProfileActions.tsx":
/*!*****************************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/ProfilePage/components/ProfileActions/ProfileActions.tsx ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfileActions: () => (/* binding */ ProfileActions)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ChatBubbleLeftIcon.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");





function ProfileActions() {
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-mt-4 wpqt-flex wpqt-gap-3",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__.WPQTIconButton, {
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: "wpqt-icon-blue wpqt-size-5"
      }),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Manage user comments", "quicktasker"),
      onClick: () => {
        navigate(`/user/comments`);
      }
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/ProfilePage/components/UserDetails/UserDetails.tsx":
/*!***********************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/ProfilePage/components/UserDetails/UserDetails.tsx ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserDetails: () => (/* binding */ UserDetails)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../components/common/DataDisplay/DataDisplay */ "./src/components/common/DataDisplay/DataDisplay.tsx");



function UserDetails({
  user
}) {
  if (!user) {
    return null;
  }
  const rowClasses = "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-mb-4 wpqt-gap-1 wpqt-text-xl";
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-mb-4",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DataDisplay, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Name", "quicktasker"),
        className: rowClasses,
        children: user.name
      }), user.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Description", "quicktasker"),
        className: rowClasses,
        children: user.description
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Assigned tasks count", "quicktasker"),
        className: rowClasses,
        children: user.assigned_tasks_count
      })]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/SetUpPage/SetUpPage.tsx":
/*!********************************************************************!*\
  !*** ./src/user-page-app/components/Pages/SetUpPage/SetUpPage.tsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetUpPage: () => (/* binding */ SetUpPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _components_common_Form_Field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/common/Form/Field */ "./src/components/common/Form/Field.tsx");
/* harmony import */ var _components_common_Form_FieldSet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/common/Form/FieldSet */ "./src/components/common/Form/FieldSet.tsx");
/* harmony import */ var _components_common_Form_Label__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/common/Form/Label */ "./src/components/common/Form/Label.tsx");
/* harmony import */ var _components_common_Input_Input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};













function SetUpPage() {
  const {
    state: {
      userName
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_11__.UserPageAppContext);
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_10__.useErrorHandler)();
  const [password, setPassword] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [passwordRepeat, setPasswordRepeat] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [validationError, setValidationError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (password !== passwordRepeat) {
      setValidationError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Passwords do not match", "quicktasker"));
    } else {
      setValidationError("");
    }
  }, [password, passwordRepeat]);
  const submitSetup = e => __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
    if (!password || !passwordRepeat) {
      setValidationError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please enter a password", "quicktasker"));
      return;
    }
    if (validationError) {
      return;
    }
    const data = {
      password
    };
    try {
      setLoading(true);
      yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_9__.setUpUserPageRequest)(data);
      window.location.reload();
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_12__.PageScreenMiddle, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_12__.PageTitle, {
      titleClassName: "wpqt-font-normal",
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please complete the setup", "quicktasker"),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hello %s", "quicktasker"), userName)
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
      onSubmit: submitSetup,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_common_Form_FieldSet__WEBPACK_IMPORTED_MODULE_5__.WPQTFieldSet, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_common_Form_Field__WEBPACK_IMPORTED_MODULE_4__.WPQTField, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Form_Label__WEBPACK_IMPORTED_MODULE_6__.WPQTLabel, {
            className: "wpqt-text-center",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter your new password", "quicktasker")
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Input_Input__WEBPACK_IMPORTED_MODULE_7__.WPQTInput, {
            value: password,
            onChange: setPassword,
            type: _components_common_Input_Input__WEBPACK_IMPORTED_MODULE_7__.InputType.PASSWORD
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_common_Form_Field__WEBPACK_IMPORTED_MODULE_4__.WPQTField, {
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Form_Label__WEBPACK_IMPORTED_MODULE_6__.WPQTLabel, {
            className: "wpqt-text-center",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Repeat your new password", "quicktasker")
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Input_Input__WEBPACK_IMPORTED_MODULE_7__.WPQTInput, {
            value: passwordRepeat,
            onChange: setPasswordRepeat,
            type: _components_common_Input_Input__WEBPACK_IMPORTED_MODULE_7__.InputType.PASSWORD
          })]
        }), validationError && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-text-qtTextRed wpqt-mb-3",
          children: validationError
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Form_Field__WEBPACK_IMPORTED_MODULE_4__.WPQTField, {
          className: "wpqt-text-center",
          children: loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_8__.Loading, {
            ovalSize: "32"
          }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTButton, {
            btnText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Setup", "quicktasker"),
            type: _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.ButtonType.SUBMIT
          })
        })]
      })
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/TaskCommentsPage/TaskCommentsPage.tsx":
/*!**********************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/TaskCommentsPage/TaskCommentsPage.tsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskCommentsPage: () => (/* binding */ TaskCommentsPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _utils_comment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/comment */ "./src/utils/comment.ts");
/* harmony import */ var _utils_task__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/task */ "./src/utils/task.ts");
/* harmony import */ var _hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hooks/actions/useCommentActions */ "./src/user-page-app/hooks/actions/useCommentActions.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hooks/actions/useTaskActions */ "./src/user-page-app/hooks/actions/useTaskActions.ts");
/* harmony import */ var _CommentsApp_CommentsApp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../CommentsApp/CommentsApp */ "./src/user-page-app/components/CommentsApp/CommentsApp.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};










function TaskCommentsPage() {
  const {
    taskHash
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useParams)();
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [task, setTask] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [comments, setComments] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    loadTaskComments,
    addTaskComment
  } = (0,_hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_5__.useCommentActions)();
  const {
    getTask
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_6__.useTaskActions)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadTask();
    loadComments();
  }, []);
  const loadTask = () => __awaiter(this, void 0, void 0, function* () {
    yield getTask(taskHash, data => {
      setTask((0,_utils_task__WEBPACK_IMPORTED_MODULE_4__.convertTaskFromServer)(data.task));
    });
  });
  const loadComments = () => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield loadTaskComments(taskHash, comments => {
      setComments(comments.map(_utils_comment__WEBPACK_IMPORTED_MODULE_3__.convertCommentFromServer));
    });
    setLoading(false);
  });
  const onAddComment = comment => __awaiter(this, void 0, void 0, function* () {
    yield addTaskComment(task.task_hash, comment, comments => {
      setComments(comments);
    });
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_8__.PageWrap, {
    loading: loading,
    onRefresh: loadComments,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_8__.PageContentWrap, {
      children: [task && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_8__.PageTitle, {
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Comments related to the task", "quicktasker"),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("%s comments", "quicktasker"), task.name)
      }), comments && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsApp_CommentsApp__WEBPACK_IMPORTED_MODULE_7__.CommentsApp, {
        comments: comments,
        addComments: onAddComment
      })]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/TaskPage/TaskControls/TaskControls.tsx":
/*!***********************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/TaskPage/TaskControls/TaskControls.tsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskControls: () => (/* binding */ TaskControls)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserMinusIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ChatBubbleLeftIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserPlusIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../hooks/actions/useTaskActions */ "./src/user-page-app/hooks/actions/useTaskActions.ts");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../providers/UserPageTaskContextProvider */ "./src/user-page-app/providers/UserPageTaskContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};










function TaskControls({
  task
}) {
  const {
    state: {
      userId
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_6__.UserPageAppContext);
  const {
    userTaskDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_7__.UserPageTaskContext);
  const {
    assignToTask,
    unAssignFromTask
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_5__.useTaskActions)();
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  const isAssignedToTask = task === null || task === void 0 ? void 0 : task.assigned_users.some(user => user.id === userId);
  if (task === null) {
    return null;
  }
  const onAssignToTask = () => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield assignToTask(task.task_hash, data => {
      userTaskDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_4__.UPDATE_USER_PAGE_TASK_DATA,
        payload: data
      });
    });
    setLoading(false);
  });
  const onUnassignFromTask = () => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield unAssignFromTask(task.task_hash, () => {
      navigate(`/`);
    });
    setLoading(false);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-mt-5 wpqt-flex wpqt-flex-wrap wpqt-justify-center wpqt-gap-4",
    children: [isAssignedToTask && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      loading: loading,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "wpqt-icon-red wpqt-size-5"
      }),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Unassign from task", "quicktasker"),
      onClick: onUnassignFromTask
    }), isAssignedToTask && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: "wpqt-icon-blue wpqt-size-5"
      }),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Manage task comments", "quicktasker"),
      onClick: () => {
        navigate(`/tasks/${task.task_hash}/comments`);
      }
    }), !isAssignedToTask && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      loading: loading,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "wpqt-icon-green wpqt-size-5"
      }),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Assing to task", "quicktasker"),
      onClick: onAssignToTask
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/TaskPage/TaskDetails/TaskDetails.tsx":
/*!*********************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/TaskPage/TaskDetails/TaskDetails.tsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskDetails: () => (/* binding */ TaskDetails)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../components/common/DataDisplay/DataDisplay */ "./src/components/common/DataDisplay/DataDisplay.tsx");
/* harmony import */ var _hooks_useTimezone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hooks/useTimezone */ "./src/user-page-app/hooks/useTimezone.ts");




function TaskDetails({
  task
}) {
  const {
    convertToWPTimezone
  } = (0,_hooks_useTimezone__WEBPACK_IMPORTED_MODULE_3__.useTimezone)();
  if (!task) {
    return null;
  }
  const rowClasses = "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-mb-4 wpqt-gap-1";
  const combinedUsers = [...(task.assigned_users || []), ...(task.assigned_wp_users || [])];
  const hasAssignedUsers = combinedUsers.length > 0;
  const dueDate = task.due_date ? convertToWPTimezone(task.due_date) : null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DataDisplay, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Name", "quicktasker"),
        className: rowClasses,
        children: task.name
      }), task.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Description", "quicktasker"),
        className: rowClasses,
        children: task.description
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Board", "quicktasker"),
        className: rowClasses,
        children: task.pipeline_name
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Created at", "quicktasker"),
        className: rowClasses,
        children: convertToWPTimezone(task.created_at)
      }), dueDate && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Due date", "quicktasker"),
        className: rowClasses,
        children: dueDate
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Free for all", "quicktasker"),
        className: rowClasses,
        children: task.free_for_all ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Yes", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No", "quicktasker")
      }), hasAssignedUsers && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_DataDisplay_DataDisplay__WEBPACK_IMPORTED_MODULE_2__.DisplayRow, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Assigned users", "quicktasker"),
        className: rowClasses,
        children: combinedUsers.map(user => user.name).join(", ")
      })]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/TaskPage/TaskDoneStatus/TaskDoneStatus.tsx":
/*!***************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/TaskPage/TaskDoneStatus/TaskDoneStatus.tsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskDoneStatus: () => (/* binding */ TaskDoneStatus)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CheckBadgeIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../hooks/actions/useTaskActions */ "./src/user-page-app/hooks/actions/useTaskActions.ts");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../providers/UserPageTaskContextProvider */ "./src/user-page-app/providers/UserPageTaskContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};









function TaskDoneStatus({
  task
}) {
  const {
    changeTaskDoneStatus
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_5__.useTaskActions)();
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    state: {
      pipelineSettings,
      taskStages
    },
    userTaskDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_7__.UserPageTaskContext);
  const {
    state: {
      userId
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_6__.UserPageAppContext);
  const isAssigned = task === null || task === void 0 ? void 0 : task.assigned_users.some(user => user.id === userId);
  const isDone = task.is_done;
  const doneMessage = isDone ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task is completed", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task is incomplete", "quicktasker");
  const lastStage = taskStages.reduce((prev, current) => {
    return Number(prev.stage_order) > Number(current.stage_order) ? prev : current;
  });
  const taskIsOnLastStage = task.stage_id === lastStage.id;
  const allowToMarkTaskAsDone = !pipelineSettings.allow_only_last_stage_task_done || taskIsOnLastStage;
  const handleDoneStatusChange = done => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield changeTaskDoneStatus(task.task_hash, done, () => {
      userTaskDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_4__.UPDATE_USER_PAGE_TASK_DONE,
        payload: {
          done
        }
      });
    });
    setLoading(false);
  });
  if (!isAssigned) {
    return null;
  }
  if (!allowToMarkTaskAsDone) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-mt-2 wpqt-mb-2 wpqt-flex wpqt-flex-col wpqt-items-center",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-font-medium",
      children: doneMessage
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-text-gray-400 wpqt-text-sm wpqt-mb-2",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Click to change", "quicktasker")
    }), loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__.Loading, {
      ovalSize: "36"
    }) : isDone ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: "wpqt-size-9 wpqt-icon-green wpqt-cursor-pointer",
      onClick: () => {
        handleDoneStatusChange(false);
      }
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: "wpqt-size-9 wpqt-text-gray-300 wpqt-cursor-pointer",
      onClick: () => {
        handleDoneStatusChange(true);
      }
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/TaskPage/TaskPage.tsx":
/*!******************************************************************!*\
  !*** ./src/user-page-app/components/Pages/TaskPage/TaskPage.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskPage: () => (/* binding */ TaskPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/UserPageTaskContextProvider */ "./src/user-page-app/providers/UserPageTaskContextProvider.tsx");
/* harmony import */ var _CustomField_CustomFieldsWrap_CustomFieldsWrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../CustomField/CustomFieldsWrap/CustomFieldsWrap */ "./src/user-page-app/components/CustomField/CustomFieldsWrap/CustomFieldsWrap.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
/* harmony import */ var _TaskControls_TaskControls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TaskControls/TaskControls */ "./src/user-page-app/components/Pages/TaskPage/TaskControls/TaskControls.tsx");
/* harmony import */ var _TaskDetails_TaskDetails__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TaskDetails/TaskDetails */ "./src/user-page-app/components/Pages/TaskPage/TaskDetails/TaskDetails.tsx");
/* harmony import */ var _TaskDoneStatus_TaskDoneStatus__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TaskDoneStatus/TaskDoneStatus */ "./src/user-page-app/components/Pages/TaskPage/TaskDoneStatus/TaskDoneStatus.tsx");
/* harmony import */ var _TaskStageSelect_TaskStageSelect__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TaskStageSelect/TaskStageSelect */ "./src/user-page-app/components/Pages/TaskPage/TaskStageSelect/TaskStageSelect.tsx");












function TaskPage() {
  const {
    taskHash
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useParams)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserPageTaskContextProvider, {
    taskHash: taskHash,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TaskPageContent, {})
  });
}
function TaskPageContent() {
  const {
    state: {
      loading,
      task,
      customFields
    },
    loadTask
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserPageTaskContext);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.PageWrap, {
    loading: loading,
    onRefresh: loadTask,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.PageContentWrap, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.PageTitle, {
        children: [" ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task details", "quicktasker")]
      }), task && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TaskDetails_TaskDetails__WEBPACK_IMPORTED_MODULE_8__.TaskDetails, {
          task: task
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TaskStageSelect_TaskStageSelect__WEBPACK_IMPORTED_MODULE_10__.TaskStageSelect, {
          task: task
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TaskDoneStatus_TaskDoneStatus__WEBPACK_IMPORTED_MODULE_9__.TaskDoneStatus, {
          task: task
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomField_CustomFieldsWrap_CustomFieldsWrap__WEBPACK_IMPORTED_MODULE_5__.CustomFieldsWrap, {
          entityId: task.id,
          entityType: _types_custom_field__WEBPACK_IMPORTED_MODULE_3__.CustomFieldEntityType.Task,
          entity: task,
          customFields: customFields
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TaskControls_TaskControls__WEBPACK_IMPORTED_MODULE_7__.TaskControls, {
          task: task
        })]
      })]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/TaskPage/TaskStageSelect/TaskStageSelect.tsx":
/*!*****************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/TaskPage/TaskStageSelect/TaskStageSelect.tsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskStageSelect: () => (/* binding */ TaskStageSelect)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PaperAirplaneIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../providers/UserPageTaskContextProvider */ "./src/user-page-app/providers/UserPageTaskContextProvider.tsx");
/* harmony import */ var _Modal_StageSelectionModal_StageSelectionModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Modal/StageSelectionModal/StageSelectionModal */ "./src/user-page-app/components/Modal/StageSelectionModal/StageSelectionModal.tsx");








function TaskStageSelect({
  task
}) {
  const {
    state: {
      taskStages
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageTaskContextProvider__WEBPACK_IMPORTED_MODULE_5__.UserPageTaskContext);
  const {
    state: {
      userId
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserPageAppContext);
  const [selectionModalOpen, setSelectionModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const changeEnabled = task === null || task === void 0 ? void 0 : task.assigned_users.some(user => user.id === userId);
  const currentTaskStage = taskStages.find(stage => stage.id === (task === null || task === void 0 ? void 0 : task.stage_id));
  if (task === null) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-mb-3",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-3 wpqt-font-medium",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task is on stage %s", "quicktasker"), currentTaskStage === null || currentTaskStage === void 0 ? void 0 : currentTaskStage.name)
    }), changeEnabled && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Change stage", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "wpqt-size-5 wpqt-icon-blue"
      }),
      onClick: () => setSelectionModalOpen(true)
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Modal_StageSelectionModal_StageSelectionModal__WEBPACK_IMPORTED_MODULE_6__.StageSelectionModal, {
      stages: taskStages,
      task: task,
      open: selectionModalOpen,
      onClose: () => setSelectionModalOpen(false)
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/UserCommentsPage/UserCommentsPage.tsx":
/*!**********************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/UserCommentsPage/UserCommentsPage.tsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserCommentsPage: () => (/* binding */ UserCommentsPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/actions/useCommentActions */ "./src/user-page-app/hooks/actions/useCommentActions.ts");
/* harmony import */ var _CommentsApp_CommentsApp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../CommentsApp/CommentsApp */ "./src/user-page-app/components/CommentsApp/CommentsApp.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};






function UserCommentsPage() {
  const [userComments, setUserComments] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const {
    loadUserComments,
    addUserComment
  } = (0,_hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_3__.useCommentActions)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    getUserComments();
  }, []);
  const getUserComments = () => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield loadUserComments(comments => {
      setUserComments(comments);
    });
    setLoading(false);
  });
  const onAddUserComment = comment => __awaiter(this, void 0, void 0, function* () {
    yield addUserComment(comment, comments => {
      setUserComments(comments);
    });
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_5__.PageWrap, {
    loading: loading,
    onRefresh: getUserComments,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_5__.PageContentWrap, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_5__.PageTitle, {
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Comments related to your user", "quicktasker"),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User comments", "quicktasker")
      }), userComments && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsApp_CommentsApp__WEBPACK_IMPORTED_MODULE_4__.CommentsApp, {
        comments: userComments,
        addComments: onAddUserComment
      })]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/UserTasksPage/UserTasks.tsx":
/*!************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/UserTasksPage/UserTasks.tsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTasks: () => (/* binding */ UserTasks)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CalendarIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ViewColumnsIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ClockIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CheckBadgeIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_Card_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Card/Card */ "./src/components/Card/Card.tsx");
/* harmony import */ var _components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem */ "./src/components/Card/WPQTCardDataItem/WPQTCardDataItem.tsx");
/* harmony import */ var _hooks_useTimezone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hooks/useTimezone */ "./src/user-page-app/hooks/useTimezone.ts");
/* harmony import */ var _providers_UserAssignedTasksContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/UserAssignedTasksContextProvider */ "./src/user-page-app/providers/UserAssignedTasksContextProvider.tsx");









function UserTasks() {
  const {
    state: {
      assignedTasks
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserAssignedTasksContextProvider__WEBPACK_IMPORTED_MODULE_6__.UserAssignedTasksContext);
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  const {
    convertToWPTimezone
  } = (0,_hooks_useTimezone__WEBPACK_IMPORTED_MODULE_5__.useTimezone)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-user-page-card-flex",
    children: assignedTasks.map(task => {
      const isCompleted = task.is_done;
      const dueDate = task.due_date ? convertToWPTimezone(task.due_date) : null;
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCard, {
        className: "wpqt-cursor-pointer wpqt-min-w-[340px]",
        title: task.name,
        description: task.description,
        onClick: () => navigate(`/tasks/${task.task_hash}`),
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__.WPQTCardDataItem, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Created", "quicktasker"),
          value: convertToWPTimezone(task.created_at),
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
            className: "wpqt-size-5 wpqt-icon-blue"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__.WPQTCardDataItem, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board", "quicktasker"),
          value: task.pipeline_name ? task.pipeline_name : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board is deleted!", "quicktasker"),
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
            className: "wpqt-size-5 wpqt-icon-blue"
          })
        }), dueDate && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__.WPQTCardDataItem, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Due date", "quicktasker"),
          value: dueDate,
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
            className: "wpqt-size-5 wpqt-icon-blue"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_WPQTCardDataItem_WPQTCardDataItem__WEBPACK_IMPORTED_MODULE_4__.WPQTCardDataItem, {
          label: isCompleted ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task completed", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task not completed", "quicktasker"),
          value: task.stage_id,
          icon: isCompleted ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
            className: "wpqt-size-5 wpqt-icon-green"
          }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
            className: "wpqt-size-5 wpqt-icon-gray"
          })
        })]
      }, task.id);
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/UserTasksPage/UserTasksPage.tsx":
/*!****************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/UserTasksPage/UserTasksPage.tsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTasksPage: () => (/* binding */ UserTasksPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _providers_UserAssignedTasksContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/UserAssignedTasksContextProvider */ "./src/user-page-app/providers/UserAssignedTasksContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Page/Page */ "./src/user-page-app/components/Pages/Page/Page.tsx");
/* harmony import */ var _UserTasks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UserTasks */ "./src/user-page-app/components/Pages/UserTasksPage/UserTasks.tsx");






function UserTasksPage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserAssignedTasksContextProvider__WEBPACK_IMPORTED_MODULE_3__.UserAssignedTasksContextProvider, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserTaskPageContent, {})
  });
}
function UserTaskPageContent() {
  const {
    state: {
      loading
    },
    loadAssignedTasks
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserAssignedTasksContextProvider__WEBPACK_IMPORTED_MODULE_3__.UserAssignedTasksContext);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.PageWrap, {
    loading: loading,
    onRefresh: loadAssignedTasks,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.PageContentWrap, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.PageTitle, {
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Tasks that are assigned to you", "quicktasker"),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Assigned tasks", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserTasks__WEBPACK_IMPORTED_MODULE_5__.UserTasks, {})]
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/constants.ts":
/*!****************************************!*\
  !*** ./src/user-page-app/constants.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHANGE_USER_PAGE_NOTIFICATIONS_LOADING: () => (/* binding */ CHANGE_USER_PAGE_NOTIFICATIONS_LOADING),
/* harmony export */   CHECK_NEW_COMMENTS_INTERVAL: () => (/* binding */ CHECK_NEW_COMMENTS_INTERVAL),
/* harmony export */   REMOVE_ASSIGNABLE_TASK: () => (/* binding */ REMOVE_ASSIGNABLE_TASK),
/* harmony export */   SESSION_EXPIRE_NOTIFICATION_TRESHOLD: () => (/* binding */ SESSION_EXPIRE_NOTIFICATION_TRESHOLD),
/* harmony export */   SESSION_NOTIFICATION_CHECK_INTERVAL: () => (/* binding */ SESSION_NOTIFICATION_CHECK_INTERVAL),
/* harmony export */   SET_ASSIGNABLE_TASKS: () => (/* binding */ SET_ASSIGNABLE_TASKS),
/* harmony export */   SET_ASSIGNABLE_TASKS_LOADING: () => (/* binding */ SET_ASSIGNABLE_TASKS_LOADING),
/* harmony export */   SET_ASSIGNED_TASKS: () => (/* binding */ SET_ASSIGNED_TASKS),
/* harmony export */   SET_ASSIGNED_TASKS_LOADING: () => (/* binding */ SET_ASSIGNED_TASKS_LOADING),
/* harmony export */   SET_INIT_DATA: () => (/* binding */ SET_INIT_DATA),
/* harmony export */   SET_USER_LOGGED_IN: () => (/* binding */ SET_USER_LOGGED_IN),
/* harmony export */   SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS: () => (/* binding */ SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS),
/* harmony export */   SET_USER_PAGE_STATUS: () => (/* binding */ SET_USER_PAGE_STATUS),
/* harmony export */   SET_USER_PAGE_TASK_DATA: () => (/* binding */ SET_USER_PAGE_TASK_DATA),
/* harmony export */   SET_USER_PAGE_TASK_LOADING: () => (/* binding */ SET_USER_PAGE_TASK_LOADING),
/* harmony export */   SET_USER_PAGE_USER_DATA: () => (/* binding */ SET_USER_PAGE_USER_DATA),
/* harmony export */   SET_USER_PAGE_USER_LOADING: () => (/* binding */ SET_USER_PAGE_USER_LOADING),
/* harmony export */   UPDATE_CUSTOM_FIELD_VALUE: () => (/* binding */ UPDATE_CUSTOM_FIELD_VALUE),
/* harmony export */   UPDATE_USER_PAGE_TASK_DATA: () => (/* binding */ UPDATE_USER_PAGE_TASK_DATA),
/* harmony export */   UPDATE_USER_PAGE_TASK_DONE: () => (/* binding */ UPDATE_USER_PAGE_TASK_DONE),
/* harmony export */   UPDATE_USER_PAGE_TASK_STAGE: () => (/* binding */ UPDATE_USER_PAGE_TASK_STAGE)
/* harmony export */ });
// User page reducer constants
const SET_USER_PAGE_STATUS = "SET_USER_PAGE_STATUS";
const SET_USER_LOGGED_IN = "SET_USER_LOGGED_IN";
const SET_INIT_DATA = "SET_INIT_DATA";
// Assigned tasks reducer constants
const SET_ASSIGNED_TASKS = "SET_ASSIGNED_TASKS";
const SET_ASSIGNED_TASKS_LOADING = "SET_ASSIGNED_TASKS_LOADING";
//Assignable tasks reducer constants
const SET_ASSIGNABLE_TASKS = "SET_ASSIGNABLE_TASKS";
const SET_ASSIGNABLE_TASKS_LOADING = "SET_ASSIGNABLE_TASKS_LOADING";
const REMOVE_ASSIGNABLE_TASK = "REMOVE_ASSIGNABLE_TASK";
//User page task reducer constants
const SET_USER_PAGE_TASK_DATA = "SET_USER_PAGE_TASK_DATA";
const SET_USER_PAGE_TASK_LOADING = "SET_USER_PAGE_TASK_LOADING";
const UPDATE_USER_PAGE_TASK_DATA = "UPDATE_USER_PAGE_TASK_DATA";
const UPDATE_USER_PAGE_TASK_STAGE = "UPDATE_USER_PAGE_TASK_STAGE";
const UPDATE_USER_PAGE_TASK_DONE = "UPDATE_USER_PAGE_TASK_DONE";
//User page notifications reducer constants
const SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS = "SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS";
const CHANGE_USER_PAGE_NOTIFICATIONS_LOADING = "CHANGE_USER_PAGE_NOTIFICATIONS_LOADING";
// User page user reducer constants
const SET_USER_PAGE_USER_DATA = "SET_USER_PAGE_USER_DATA";
const SET_USER_PAGE_USER_LOADING = "SET_USER_PAGE_USER_LOADING";
// Custom feilds
const UPDATE_CUSTOM_FIELD_VALUE = "UPDATE_CUSTOM_FIELD_VALUE";
//Time
const SESSION_EXPIRE_NOTIFICATION_TRESHOLD = 30; // in minutes
// Intervals
const SESSION_NOTIFICATION_CHECK_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
const CHECK_NEW_COMMENTS_INTERVAL = 60 * 2000; // 2 minute in milliseconds


/***/ }),

/***/ "./src/user-page-app/hooks/actions/useCommentActions.ts":
/*!**************************************************************!*\
  !*** ./src/user-page-app/hooks/actions/useCommentActions.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCommentActions: () => (/* binding */ useCommentActions)
/* harmony export */ });
/* harmony import */ var _utils_comment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/comment */ "./src/utils/comment.ts");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _useErrorHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



function useCommentActions() {
  const {
    handleError
  } = (0,_useErrorHandler__WEBPACK_IMPORTED_MODULE_2__.useErrorHandler)();
  const loadTaskComments = (taskHash, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_1__.getTaskCommentsRequest)(taskHash);
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  });
  const addTaskComment = (taskHash, comment, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_1__.addTaskCommentRequest)(taskHash, comment);
      const comments = response.data.map(_utils_comment__WEBPACK_IMPORTED_MODULE_0__.convertCommentFromServer);
      if (callback) callback(comments);
    } catch (error) {
      handleError(error);
    }
  });
  const loadUserComments = callback => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_1__.getUserCommentsRequest)();
      const comments = response.data.map(_utils_comment__WEBPACK_IMPORTED_MODULE_0__.convertCommentFromServer);
      callback(comments);
    } catch (error) {
      handleError(error);
    }
  });
  const addUserComment = (commentText, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_1__.addUserCommentRequest)(commentText);
      const comments = response.data.map(_utils_comment__WEBPACK_IMPORTED_MODULE_0__.convertCommentFromServer);
      callback(comments);
    } catch (error) {
      handleError(error);
    }
  });
  return {
    loadTaskComments,
    addTaskComment,
    loadUserComments,
    addUserComment
  };
}


/***/ }),

/***/ "./src/user-page-app/hooks/actions/useCustomFieldActions.ts":
/*!******************************************************************!*\
  !*** ./src/user-page-app/hooks/actions/useCustomFieldActions.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCustomFieldActions: () => (/* binding */ useCustomFieldActions)
/* harmony export */ });
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _useErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


function useCustomFieldActions() {
  const {
    handleError
  } = (0,_useErrorHandler__WEBPACK_IMPORTED_MODULE_1__.useErrorHandler)();
  const updateCustomFieldValue = (entityId, entityType, customFieldId, value, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_0__.updateCustomFieldValueRequest)(entityId, entityType, customFieldId, value);
      if (callback) callback();
    } catch (error) {
      handleError(error);
    }
  });
  return {
    updateCustomFieldValue
  };
}


/***/ }),

/***/ "./src/user-page-app/hooks/actions/useTaskActions.ts":
/*!***********************************************************!*\
  !*** ./src/user-page-app/hooks/actions/useTaskActions.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTaskActions: () => (/* binding */ useTaskActions)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _useErrorHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




function useTaskActions() {
  const {
    handleError
  } = (0,_useErrorHandler__WEBPACK_IMPORTED_MODULE_3__.useErrorHandler)();
  const getTask = (taskHash, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.getTaskDataRequest)(taskHash);
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  });
  const assignToTask = (taskHash, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.assignTaskToUser)(taskHash);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task assigned successfully", "quicktasker"));
      if (callback) callback(response.data.task);
    } catch (error) {
      handleError(error);
    }
  });
  const unAssignFromTask = (taskHash, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.unAssignTaskFromUser)(taskHash);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task unassigned successfully", "quicktasker"));
      if (callback) callback(response.data);
    } catch (error) {
      handleError(error);
    }
  });
  const changeTaskStage = (taskHash, stageId, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.changeTaskStageRequest)(taskHash, stageId);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task stage changed successfully", "quicktasker"));
      if (callback) callback();
    } catch (error) {
      handleError(error);
    }
  });
  const changeTaskDoneStatus = (taskHash, doneStatus, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const successMessage = doneStatus ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task marked as completed", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task marked as incomplete", "quicktasker");
      yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.changeTaskDoneStatusRequest)(taskHash, doneStatus);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success(successMessage);
      if (callback) callback(doneStatus);
    } catch (error) {
      handleError(error);
    }
  });
  return {
    getTask,
    assignToTask,
    changeTaskStage,
    unAssignFromTask,
    changeTaskDoneStatus
  };
}


/***/ }),

/***/ "./src/user-page-app/hooks/useErrorHandler.tsx":
/*!*****************************************************!*\
  !*** ./src/user-page-app/hooks/useErrorHandler.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useErrorHandler: () => (/* binding */ useErrorHandler)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _useSession__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useSession */ "./src/user-page-app/hooks/useSession.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};






function useErrorHandler() {
  const {
    loadUserPageStatus
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserPageAppContext);
  const {
    deleteSessionCookie
  } = (0,_useSession__WEBPACK_IMPORTED_MODULE_5__.useSession)();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = error => __awaiter(this, void 0, void 0, function* () {
    console.error(error);
    if (error.messages && Array.isArray(error.messages) && error.messages.length > 0) {
      const errorMessage = error.messages.join(", ");
      const hasInvalidTokenError = errorMessage.includes(_constants__WEBPACK_IMPORTED_MODULE_3__.WP_QUICKTASKER_INVALID_SESSION_TOKEN);
      if (hasInvalidTokenError) {
        react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.info((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Your session has expired. Please log in to continue.", "quicktasker"));
        yield deleteSessionCookie();
        loadUserPageStatus();
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error(errorMessage);
      }
    }
  });
  return {
    handleError
  };
}


/***/ }),

/***/ "./src/user-page-app/hooks/useLocalStorage.tsx":
/*!*****************************************************!*\
  !*** ./src/user-page-app/hooks/useLocalStorage.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLocalStorage: () => (/* binding */ useLocalStorage)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_comment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/comment */ "./src/utils/comment.ts");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



const WPQT_STORED_COMMENTS_KEY = "wpqt-stored-comments";
function useLocalStorage() {
  const {
    state: {
      pageHash
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__.UserPageAppContext);
  const getStoredComments = () => __awaiter(this, void 0, void 0, function* () {
    const storedComments = localStorage.getItem(`${WPQT_STORED_COMMENTS_KEY}-${pageHash}`);
    return storedComments ? JSON.parse(storedComments) : [];
  });
  const storeComments = comments => __awaiter(this, void 0, void 0, function* () {
    const storedComments = yield getStoredComments();
    const newComments = (0,_utils_comment__WEBPACK_IMPORTED_MODULE_1__.filterNewComments)(comments, storedComments);
    const updatedComments = [...storedComments, ...newComments];
    localStorage.setItem(`${WPQT_STORED_COMMENTS_KEY}-${pageHash}`, JSON.stringify(updatedComments));
  });
  return {
    getStoredComments,
    storeComments
  };
}


/***/ }),

/***/ "./src/user-page-app/hooks/useSession.tsx":
/*!************************************************!*\
  !*** ./src/user-page-app/hooks/useSession.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSession: () => (/* binding */ useSession)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.mjs");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



function useSession() {
  const {
    state: {
      pageHash,
      isQuicktaskerUser,
      isWordPressUser,
      userId
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__.UserPageAppContext);
  /**
   * Sets the session cookie and stores the session expiration in local storage.
   *
   * @param {UserSession} session - The user session object containing session details.
   * @returns {Promise<void>} A promise that resolves when the session cookie and expiration are set.
   */
  const setSessionCookie = session => __awaiter(this, void 0, void 0, function* () {
    const expireDate = new Date(`${session.expiresAtUTC}Z`);
    localStorage.setItem(`wpqt-session-expiration-${pageHash}`, expireDate.toISOString());
    js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].set(`wpqt-session-token-${pageHash}`, session.sessionToken, {
      expires: expireDate,
      path: "/",
      sameSite: "strict"
    });
  });
  const getSessionCookieValue = () => {
    return js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].get(`wpqt-session-token-${pageHash}`);
  };
  const isLoggedIn = () => {
    if (isQuicktaskerUser) {
      return !!js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].get(`wpqt-session-token-${pageHash}`);
    } else if (isWordPressUser) {
      return !!userId;
    }
    return false;
  };
  /**
   * Deletes the session cookie and removes the session expiration from local storage.
   *
   * This function removes the session expiration associated with the given page hash
   * from the local storage and deletes the session token cookie.
   *
   * @async
   * @function deleteSessionCookie
   * @returns {Promise<void>} A promise that resolves when the session cookie and local storage item are removed.
   */
  const deleteSessionCookie = () => __awaiter(this, void 0, void 0, function* () {
    localStorage.removeItem(`wpqt-session-expiration-${pageHash}`);
    js_cookie__WEBPACK_IMPORTED_MODULE_1__["default"].remove(`wpqt-session-token-${pageHash}`);
  });
  /**
   * Retrieves the remaining session time for a given page hash.
   *
   * @param {string | null} pageHash - The unique identifier for the user page.
   * @returns {number | null} - The time left in minutes, or null if no expiration is found.
   */
  const getSessionTimeLeft = pageHash => {
    if (!pageHash) {
      return null;
    }
    const expirationString = localStorage.getItem(`wpqt-session-expiration-${pageHash}`);
    if (!expirationString) {
      return null;
    }
    const expirationDate = new Date(expirationString);
    const timeLeft = expirationDate.getTime() - new Date().getTime();
    // Convert milliseconds to minutes
    return timeLeft > 0 ? Math.floor(timeLeft / 1000 / 60) : 0;
  };
  return {
    setSessionCookie,
    getSessionCookieValue,
    isLoggedIn,
    deleteSessionCookie,
    getSessionTimeLeft
  };
}


/***/ }),

/***/ "./src/user-page-app/hooks/useTimezone.ts":
/*!************************************************!*\
  !*** ./src/user-page-app/hooks/useTimezone.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTimezone: () => (/* binding */ useTimezone)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/timezone */ "./src/utils/timezone.ts");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");



const useTimezone = () => {
  const {
    state: {
      timezone
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__.UserPageAppContext);
  const convertToWPTimezone = utcDateTime => {
    return (0,_utils_timezone__WEBPACK_IMPORTED_MODULE_1__.convertToTimezone)(utcDateTime, timezone);
  };
  return {
    convertToWPTimezone
  };
};


/***/ }),

/***/ "./src/user-page-app/providers/UserAssignableTasksContextProvider.tsx":
/*!****************************************************************************!*\
  !*** ./src/user-page-app/providers/UserAssignableTasksContextProvider.tsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserAssignableTasksContext: () => (/* binding */ UserAssignableTasksContext),
/* harmony export */   UserAssignableTasksContextProvider: () => (/* binding */ UserAssignableTasksContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _reducers_user_assignable_tasks_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers/user-assignable-tasks-reducer */ "./src/user-page-app/reducers/user-assignable-tasks-reducer.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







const initialState = {
  loading: true,
  assignableTasks: []
};
const UserAssignableTasksContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  userAssignableTasksDispatch: () => {},
  loadAssignableTasks: () => {}
});
const UserAssignableTasksContextProvider = ({
  children
}) => {
  const [state, userAssignableTasksDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_assignable_tasks_reducer__WEBPACK_IMPORTED_MODULE_6__.reducer, initialState);
  const {
    state: {
      pageHash
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__.UserPageAppContext);
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_5__.useErrorHandler)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadAssignableTasks();
  }, [pageHash]);
  const loadAssignableTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      userAssignableTasksDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_4__.SET_ASSIGNABLE_TASKS_LOADING,
        payload: true
      });
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_3__.getAssignableTasksRequest)();
      userAssignableTasksDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_4__.SET_ASSIGNABLE_TASKS,
        payload: response.data
      });
    } catch (error) {
      handleError(error);
    } finally {
      userAssignableTasksDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_4__.SET_ASSIGNABLE_TASKS_LOADING,
        payload: false
      });
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserAssignableTasksContext.Provider, {
    value: {
      state,
      userAssignableTasksDispatch,
      loadAssignableTasks
    },
    children: children
  });
};


/***/ }),

/***/ "./src/user-page-app/providers/UserAssignedTasksContextProvider.tsx":
/*!**************************************************************************!*\
  !*** ./src/user-page-app/providers/UserAssignedTasksContextProvider.tsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserAssignedTasksContext: () => (/* binding */ UserAssignedTasksContext),
/* harmony export */   UserAssignedTasksContextProvider: () => (/* binding */ UserAssignedTasksContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _reducers_user_assigned_tasks_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers/user-assigned-tasks-reducer */ "./src/user-page-app/reducers/user-assigned-tasks-reducer.ts");
/* harmony import */ var _UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







const initialState = {
  loading: true,
  assignedTasks: []
};
const UserAssignedTasksContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  userAssignedTasksDispatch: () => {},
  loadAssignedTasks: () => {}
});
const UserAssignedTasksContextProvider = ({
  children
}) => {
  const [state, userAssignedTasksDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_assigned_tasks_reducer__WEBPACK_IMPORTED_MODULE_5__.reducer, initialState);
  const {
    state: {
      pageHash
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_6__.UserPageAppContext);
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_4__.useErrorHandler)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadAssignedTasks();
  }, [pageHash]);
  const loadAssignedTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      userAssignedTasksDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_ASSIGNED_TASKS_LOADING,
        payload: true
      });
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.getAssignedTasksRequest)();
      userAssignedTasksDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_ASSIGNED_TASKS,
        payload: response.data
      });
    } catch (error) {
      handleError(error);
    } finally {
      userAssignedTasksDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_ASSIGNED_TASKS_LOADING,
        payload: false
      });
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserAssignedTasksContext.Provider, {
    value: {
      state,
      userAssignedTasksDispatch,
      loadAssignedTasks
    },
    children: children
  });
};


/***/ }),

/***/ "./src/user-page-app/providers/UserPageAppContextProvider.tsx":
/*!********************************************************************!*\
  !*** ./src/user-page-app/providers/UserPageAppContextProvider.tsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserPageAppContext: () => (/* binding */ UserPageAppContext),
/* harmony export */   UserPageAppContextProvider: () => (/* binding */ UserPageAppContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/url */ "./src/utils/url.ts");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _hooks_useSession__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/useSession */ "./src/user-page-app/hooks/useSession.tsx");
/* harmony import */ var _reducers_user_page_app_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../reducers/user-page-app-reducer */ "./src/user-page-app/reducers/user-page-app-reducer.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};








const initialState = {
  initialLoading: true,
  isActiveUser: false,
  setupCompleted: false,
  isLoggedIn: false,
  pageHash: (0,_utils_url__WEBPACK_IMPORTED_MODULE_2__.getUserPageCodeParam)(),
  userId: null,
  userName: null,
  cf: false,
  timezone: "",
  isQuicktaskerUser: false,
  isWordPressUser: false
};
const UserPageAppContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  userPageAppDispatch: () => {},
  loadUserPageStatus: () => {}
});
const UserPageAppContextProvider = ({
  children
}) => {
  const [state, userPageAppDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_page_app_reducer__WEBPACK_IMPORTED_MODULE_7__.reducer, initialState);
  const {
    isLoggedIn
  } = (0,_hooks_useSession__WEBPACK_IMPORTED_MODULE_6__.useSession)();
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_5__.useErrorHandler)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const timezone = window.wpqt_user.timezone;
    userPageAppDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_4__.SET_INIT_DATA,
      payload: {
        timezone
      }
    });
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadUserPageStatus();
  }, []);
  const loadUserPageStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const userLoggedIn = isLoggedIn();
      const {
        data
      } = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_3__.getUserPageStatusRequest)();
      userPageAppDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_4__.SET_USER_PAGE_STATUS,
        payload: Object.assign(Object.assign({}, data), {
          isLoggedIn: userLoggedIn
        })
      });
    } catch (error) {
      handleError(error);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserPageAppContext.Provider, {
    value: {
      state,
      userPageAppDispatch,
      loadUserPageStatus
    },
    children: children
  });
};


/***/ }),

/***/ "./src/user-page-app/providers/UserPageNotificationsContextProvider.tsx":
/*!******************************************************************************!*\
  !*** ./src/user-page-app/providers/UserPageNotificationsContextProvider.tsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserPageNotificationsContext: () => (/* binding */ UserPageNotificationsContext),
/* harmony export */   UserPageNotificationsContextProvider: () => (/* binding */ UserPageNotificationsContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _utils_comment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/comment */ "./src/utils/comment.ts");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _hooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../hooks/useLocalStorage */ "./src/user-page-app/hooks/useLocalStorage.tsx");
/* harmony import */ var _hooks_useSession__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../hooks/useSession */ "./src/user-page-app/hooks/useSession.tsx");
/* harmony import */ var _reducers_user_page_notifications_reducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../reducers/user-page-notifications-reducer */ "./src/user-page-app/reducers/user-page-notifications-reducer.ts");
/* harmony import */ var _UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};












const initialState = {
  newComments: [],
  loading: true
};
const UserPageNotificationsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  userPageNotificationsDispatch: () => {},
  checkNewComments: () => __awaiter(void 0, void 0, void 0, function* () {})
});
const UserPageNotificationsContextProvider = ({
  children
}) => {
  const [state, userPageNotificationsDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_page_notifications_reducer__WEBPACK_IMPORTED_MODULE_10__.reducer, initialState);
  const {
    state: {
      pageHash
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_11__.UserPageAppContext);
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_7__.useErrorHandler)();
  const {
    getStoredComments
  } = (0,_hooks_useLocalStorage__WEBPACK_IMPORTED_MODULE_8__.useLocalStorage)();
  const {
    isLoggedIn,
    getSessionTimeLeft
  } = (0,_hooks_useSession__WEBPACK_IMPORTED_MODULE_9__.useSession)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const interval = setInterval(() => {
      checkNewComments();
    }, _constants__WEBPACK_IMPORTED_MODULE_6__.CHECK_NEW_COMMENTS_INTERVAL);
    checkNewComments();
    return () => {
      clearInterval(interval);
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const interval = setInterval(() => {
      sessionExpireTimeCheck();
    }, _constants__WEBPACK_IMPORTED_MODULE_6__.SESSION_NOTIFICATION_CHECK_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const setLoading = loading => {
    userPageNotificationsDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_6__.CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
      payload: loading
    });
  };
  const sessionExpireTimeCheck = () => {
    if (!isLoggedIn()) {
      return;
    }
    const timeLeft = getSessionTimeLeft(pageHash);
    if (timeLeft && timeLeft <= _constants__WEBPACK_IMPORTED_MODULE_6__.SESSION_EXPIRE_NOTIFICATION_TRESHOLD) {
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.info((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Your session is about to expire in %s minutes", "quicktasker"), timeLeft));
    }
  };
  const checkNewComments = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!isLoggedIn()) {
      return;
    }
    try {
      setLoading(true);
      const storedComments = yield getStoredComments();
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_5__.getUserPageCommentsRequest)();
      const comments = response.data.map(_utils_comment__WEBPACK_IMPORTED_MODULE_4__.convertCommentFromServer);
      const newComments = (0,_utils_comment__WEBPACK_IMPORTED_MODULE_4__.filterNewComments)(comments, storedComments);
      userPageNotificationsDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_6__.SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS,
        payload: newComments
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserPageNotificationsContext.Provider, {
    value: {
      state,
      userPageNotificationsDispatch,
      checkNewComments
    },
    children: children
  });
};


/***/ }),

/***/ "./src/user-page-app/providers/UserPageTaskContextProvider.tsx":
/*!*********************************************************************!*\
  !*** ./src/user-page-app/providers/UserPageTaskContextProvider.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserPageTaskContext: () => (/* binding */ UserPageTaskContext),
/* harmony export */   UserPageTaskContextProvider: () => (/* binding */ UserPageTaskContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _reducers_user_page_task_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers/user-page-task-reducer */ "./src/user-page-app/reducers/user-page-task-reducer.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};






const initialState = {
  task: null,
  taskStages: [],
  customFields: [],
  pipelineSettings: {
    allow_only_last_stage_task_done: false
  },
  loading: true
};
const UserPageTaskContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  userTaskDispatch: () => {},
  loadTask: () => {}
});
const UserPageTaskContextProvider = ({
  children,
  taskHash
}) => {
  const [state, userTaskDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_page_task_reducer__WEBPACK_IMPORTED_MODULE_5__.reducer, initialState);
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_4__.useErrorHandler)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadTask();
  }, []);
  const loadTask = () => __awaiter(void 0, void 0, void 0, function* () {
    if (taskHash) {
      try {
        userTaskDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_TASK_LOADING,
          payload: true
        });
        const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.getTaskDataRequest)(taskHash);
        userTaskDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_TASK_DATA,
          payload: response.data
        });
      } catch (error) {
        handleError(error);
      } finally {
        userTaskDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_TASK_LOADING,
          payload: false
        });
      }
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserPageTaskContext.Provider, {
    value: {
      state,
      userTaskDispatch,
      loadTask
    },
    children: children
  });
};


/***/ }),

/***/ "./src/user-page-app/providers/UserPageUserContextProvider.tsx":
/*!*********************************************************************!*\
  !*** ./src/user-page-app/providers/UserPageUserContextProvider.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserPageUserContext: () => (/* binding */ UserPageUserContext),
/* harmony export */   UserPageUserContextProvider: () => (/* binding */ UserPageUserContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useErrorHandler */ "./src/user-page-app/hooks/useErrorHandler.tsx");
/* harmony import */ var _reducers_user_page_user_recuder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers/user-page-user-recuder */ "./src/user-page-app/reducers/user-page-user-recuder.ts");
/* harmony import */ var _UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







const initialState = {
  user: null,
  customFields: [],
  loading: true
};
const UserPageUserContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  useUserPageUserDispatch: () => {},
  loadUserData: () => {}
});
const UserPageUserContextProvider = ({
  children
}) => {
  const [state, useUserPageUserDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_page_user_recuder__WEBPACK_IMPORTED_MODULE_5__.reducer, initialState);
  const {
    state: {
      pageHash
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_6__.UserPageAppContext);
  const {
    handleError
  } = (0,_hooks_useErrorHandler__WEBPACK_IMPORTED_MODULE_4__.useErrorHandler)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (pageHash) {
      loadUserData();
    }
  }, []);
  const loadUserData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      useUserPageUserDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_USER_LOADING,
        payload: true
      });
      const response = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.getUserPageUserDataRequest)();
      useUserPageUserDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_USER_DATA,
        payload: response.data
      });
    } catch (error) {
      handleError(error);
    } finally {
      useUserPageUserDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_USER_LOADING,
        payload: false
      });
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserPageUserContext.Provider, {
    value: {
      state,
      useUserPageUserDispatch,
      loadUserData
    },
    children: children
  });
};


/***/ }),

/***/ "./src/user-page-app/reducers/user-assignable-tasks-reducer.ts":
/*!*********************************************************************!*\
  !*** ./src/user-page-app/reducers/user-assignable-tasks-reducer.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _utils_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/task */ "./src/utils/task.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");


const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_1__.SET_ASSIGNABLE_TASKS_LOADING:
      {
        const loading = action.payload;
        return Object.assign(Object.assign({}, state), {
          loading
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_1__.SET_ASSIGNABLE_TASKS:
      {
        const tasks = action.payload;
        return Object.assign(Object.assign({}, state), {
          assignableTasks: tasks.map(_utils_task__WEBPACK_IMPORTED_MODULE_0__.convertTaskFromServer)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_1__.REMOVE_ASSIGNABLE_TASK:
      {
        const taskId = action.payload;
        return Object.assign(Object.assign({}, state), {
          assignableTasks: state.assignableTasks.filter(task => task.id !== taskId)
        });
      }
    default:
      {
        return state;
      }
  }
};


/***/ }),

/***/ "./src/user-page-app/reducers/user-assigned-tasks-reducer.ts":
/*!*******************************************************************!*\
  !*** ./src/user-page-app/reducers/user-assigned-tasks-reducer.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _utils_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/task */ "./src/utils/task.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");


const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_1__.SET_ASSIGNED_TASKS:
      {
        const assignedTasks = action.payload.map(_utils_task__WEBPACK_IMPORTED_MODULE_0__.convertTaskFromServer);
        return Object.assign(Object.assign({}, state), {
          assignedTasks,
          loading: false
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_1__.SET_ASSIGNED_TASKS_LOADING:
      {
        const loading = action.payload;
        return Object.assign(Object.assign({}, state), {
          loading
        });
      }
    default:
      {
        return state;
      }
  }
};


/***/ }),

/***/ "./src/user-page-app/reducers/user-page-app-reducer.ts":
/*!*************************************************************!*\
  !*** ./src/user-page-app/reducers/user-page-app-reducer.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");

const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_PAGE_STATUS:
      {
        const {
          isActiveUser,
          isLoggedIn,
          setupCompleted,
          userId,
          userName,
          isQuicktaskerUser,
          isWordPressUser
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          isActiveUser,
          isLoggedIn,
          setupCompleted,
          initialLoading: false,
          userId,
          userName,
          isQuicktaskerUser,
          isWordPressUser
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_LOGGED_IN:
      {
        const isLoggedIn = action.payload;
        return Object.assign(Object.assign({}, state), {
          isLoggedIn
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_INIT_DATA:
      {
        const {
          timezone
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          timezone
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "./src/user-page-app/reducers/user-page-notifications-reducer.ts":
/*!***********************************************************************!*\
  !*** ./src/user-page-app/reducers/user-page-notifications-reducer.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");

const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS:
      {
        const newComments = action.payload;
        return Object.assign(Object.assign({}, state), {
          newComments
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_USER_PAGE_NOTIFICATIONS_LOADING:
      {
        const loading = action.payload;
        return Object.assign(Object.assign({}, state), {
          loading
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "./src/user-page-app/reducers/user-page-task-reducer.ts":
/*!**************************************************************!*\
  !*** ./src/user-page-app/reducers/user-page-task-reducer.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/pipeline-settings */ "./src/utils/pipeline-settings.ts");
/* harmony import */ var _utils_stage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/stage */ "./src/utils/stage.ts");
/* harmony import */ var _utils_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/task */ "./src/utils/task.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");




const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_TASK_DATA:
      {
        const data = action.payload;
        return Object.assign(Object.assign({}, state), {
          task: (0,_utils_task__WEBPACK_IMPORTED_MODULE_2__.convertTaskFromServer)(data.task),
          taskStages: data.stages.map(_utils_stage__WEBPACK_IMPORTED_MODULE_1__.convertStageFromServer),
          customFields: data.customFields,
          pipelineSettings: (0,_utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_0__.convertPublicPipelineSettingsFromServer)(data.pipelineSettings)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_3__.UPDATE_USER_PAGE_TASK_DATA:
      {
        const data = action.payload;
        return Object.assign(Object.assign({}, state), {
          task: (0,_utils_task__WEBPACK_IMPORTED_MODULE_2__.convertTaskFromServer)(data)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_TASK_LOADING:
      {
        return Object.assign(Object.assign({}, state), {
          loading: action.payload
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_3__.UPDATE_USER_PAGE_TASK_STAGE:
      {
        const stageId = action.payload;
        return Object.assign(Object.assign({}, state), {
          task: state.task ? Object.assign(Object.assign({}, state.task), {
            stage_id: stageId
          }) : null
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_3__.UPDATE_USER_PAGE_TASK_DONE:
      {
        const {
          done
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          task: state.task ? Object.assign(Object.assign({}, state.task), {
            is_done: done
          }) : null
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "./src/user-page-app/reducers/user-page-user-recuder.ts":
/*!**************************************************************!*\
  !*** ./src/user-page-app/reducers/user-page-user-recuder.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _utils_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/user */ "./src/utils/user.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");


const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_1__.SET_USER_PAGE_USER_DATA:
      {
        const {
          user,
          customFields
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          user: (0,_utils_user__WEBPACK_IMPORTED_MODULE_0__.convertUserFromServer)(user),
          customFields
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_1__.SET_USER_PAGE_USER_LOADING:
      {
        const loading = action.payload;
        return Object.assign(Object.assign({}, state), {
          loading
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "./src/utils/comment.ts":
/*!******************************!*\
  !*** ./src/utils/comment.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertCommentFromServer: () => (/* binding */ convertCommentFromServer),
/* harmony export */   filterNewComments: () => (/* binding */ filterNewComments)
/* harmony export */ });
const convertCommentFromServer = comment => Object.assign(Object.assign({}, comment), {
  is_admin_comment: comment.is_admin_comment === "1"
});
const filterNewComments = (comments, storedComments) => {
  return comments.filter(comment => !storedComments.find(c => c.id === comment.id));
};


/***/ }),

/***/ "./src/utils/debounce.ts":
/*!*******************************!*\
  !*** ./src/utils/debounce.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce)
/* harmony export */ });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
}


/***/ }),

/***/ "./src/utils/pipeline-settings.ts":
/*!****************************************!*\
  !*** ./src/utils/pipeline-settings.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertPipelineSettingsFromServer: () => (/* binding */ convertPipelineSettingsFromServer),
/* harmony export */   convertPublicPipelineSettingsFromServer: () => (/* binding */ convertPublicPipelineSettingsFromServer)
/* harmony export */ });
const convertPipelineSettingsFromServer = pipelineSettings => {
  return Object.assign(Object.assign({}, pipelineSettings), {
    allow_only_last_stage_task_done: pipelineSettings.allow_only_last_stage_task_done === "1"
  });
};
const convertPublicPipelineSettingsFromServer = pipelineSettings => {
  return Object.assign(Object.assign({}, pipelineSettings), {
    allow_only_last_stage_task_done: pipelineSettings.allow_only_last_stage_task_done === "1"
  });
};


/***/ }),

/***/ "./src/utils/stage.ts":
/*!****************************!*\
  !*** ./src/utils/stage.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertStageFromServer: () => (/* binding */ convertStageFromServer)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/utils/task.ts");

const convertStageFromServer = stage => Object.assign(Object.assign({}, stage), {
  stage_order: Number(stage.stage_order),
  tasks: (stage.tasks || []).map(task => Object.assign({}, (0,_task__WEBPACK_IMPORTED_MODULE_0__.convertTaskFromServer)(task)))
});


/***/ }),

/***/ "./src/utils/task.ts":
/*!***************************!*\
  !*** ./src/utils/task.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertTaskFromServer: () => (/* binding */ convertTaskFromServer),
/* harmony export */   moveTask: () => (/* binding */ moveTask),
/* harmony export */   reorderTask: () => (/* binding */ reorderTask)
/* harmony export */ });
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ "./src/utils/user.ts");

/**
 * Moves a task from one stage to another within a list of stages.
 *
 * @param stages                           - The list of stages.
 * @param droppableSource                  - The source stage and index of the task being moved.
 * @param droppableDestination             - The destination stage and index where the task will be moved to.
 * @param droppableSource.index
 * @param droppableSource.droppableId
 * @param droppableDestination.index
 * @param droppableDestination.droppableId
 * @return The updated list of stages after moving the task.
 */
const moveTask = (stages, droppableSource, droppableDestination) => {
  const stagesClone = [...stages];
  const sourceStage = stagesClone.find(stage => stage.id === droppableSource.droppableId);
  const destinationStage = stagesClone.find(stage => stage.id === droppableDestination.droppableId);
  if ((sourceStage === null || sourceStage === void 0 ? void 0 : sourceStage.tasks) && (destinationStage === null || destinationStage === void 0 ? void 0 : destinationStage.tasks)) {
    const [removed] = sourceStage.tasks.splice(droppableSource.index, 1);
    destinationStage.tasks.splice(droppableDestination.index, 0, removed);
  }
  return stagesClone;
};
/**
 * Reorders a list of tasks after a task has been moved.
 *
 * @param list       - The list of tasks.
 * @param startIndex - The index of the task being moved.
 * @param endIndex   - The index where the task will be moved to.
 * @return The updated list of tasks after reordering.
 */
const reorderTask = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
/**
 * Converts a task object received from the server to a Task object.
 * @param task - The task object received from the server.
 * @return The converted Task object.
 */
const convertTaskFromServer = task => Object.assign(Object.assign({}, task), {
  task_order: Number(task.task_order),
  free_for_all: task.free_for_all === "1",
  is_archived: task.is_archived === "1",
  is_done: task.is_done === "1",
  assigned_users: task.assigned_users ? task.assigned_users.map(user => Object.assign({}, (0,_user__WEBPACK_IMPORTED_MODULE_0__.convertUserFromServer)(user))) : []
});


/***/ }),

/***/ "./src/utils/timezone.ts":
/*!*******************************!*\
  !*** ./src/utils/timezone.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertToTimezone: () => (/* binding */ convertToTimezone),
/* harmony export */   convertUTCDatetimeToWPTimezone: () => (/* binding */ convertUTCDatetimeToWPTimezone)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/timezone */ "./node_modules/dayjs/plugin/timezone.js");
/* harmony import */ var dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs/plugin/utc */ "./node_modules/dayjs/plugin/utc.js");
/* harmony import */ var dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_2__);



dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_utc__WEBPACK_IMPORTED_MODULE_2___default()));
dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_timezone__WEBPACK_IMPORTED_MODULE_1___default()));
/**
 * Converts a given UTC date-time string to a specified WordPress timezone.
 *
 * @param utcDateTime - The date-time string in UTC format.
 * @param wpTimezone - The WordPress timezone to convert the date-time to.
 * @returns The formatted date-time string in the specified timezone, or the original UTC date-time string with "(UTC)" appended in case of an error.
 *
 * @throws Will log an error to the console if the conversion fails.
 */
const convertToTimezone = (utcDateTime, wpTimezone) => {
  try {
    const zonedDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default().utc(utcDateTime).tz(wpTimezone);
    const formattedDate = zonedDate.format("MMMM D, YYYY HH:mm");
    return formattedDate;
  } catch (error) {
    console.error("Error: ", error);
    return utcDateTime + " (UTC)";
  }
};
/**
 * Converts a UTC datetime string to a WordPress timezone Date object.
 *
 * @param utcDateTime - The UTC datetime string to be converted.
 * @param wpTimezone - The WordPress timezone identifier.
 * @returns The converted Date object in the specified WordPress timezone.
 * @throws Will log an error to the console if the conversion fails. In this case, the original UTC date-time string will be returned as a Date object.
 */
const convertUTCDatetimeToWPTimezone = (utcDateTime, wpTimezone) => {
  try {
    const zonedDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default().utc(utcDateTime).tz(wpTimezone).toDate();
    return zonedDate;
  } catch (error) {
    console.error("Error: ", error);
    return new Date(utcDateTime);
  }
};

/***/ }),

/***/ "./src/utils/url.ts":
/*!**************************!*\
  !*** ./src/utils/url.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getQueryParam: () => (/* binding */ getQueryParam),
/* harmony export */   getUserPageCodeParam: () => (/* binding */ getUserPageCodeParam)
/* harmony export */ });
const getQueryParam = param => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(param);
};
const getUserPageCodeParam = () => {
  return getQueryParam("code");
};


/***/ }),

/***/ "./src/utils/user.ts":
/*!***************************!*\
  !*** ./src/utils/user.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertExtendedUserFromServer: () => (/* binding */ convertExtendedUserFromServer),
/* harmony export */   convertUserFromServer: () => (/* binding */ convertUserFromServer),
/* harmony export */   mapActionTargetTypeToUserType: () => (/* binding */ mapActionTargetTypeToUserType),
/* harmony export */   userTypeStrings: () => (/* binding */ userTypeStrings)
/* harmony export */ });
/* harmony import */ var _types_automation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/automation */ "./src/types/automation.ts");
/* harmony import */ var _types_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/user */ "./src/types/user.ts");


const convertUserFromServer = user => Object.assign(Object.assign({}, user), {
  is_active: user.is_active === "1",
  has_password: user.has_password === "1"
});
const convertExtendedUserFromServer = user => Object.assign(Object.assign({}, user), {
  is_active: user.is_active === "1"
});
const mapActionTargetTypeToUserType = type => {
  switch (type) {
    case _types_automation__WEBPACK_IMPORTED_MODULE_0__.ActionTargetType.QUICKTASKER:
      return _types_user__WEBPACK_IMPORTED_MODULE_1__.UserTypes.QUICKTASKER;
    case _types_automation__WEBPACK_IMPORTED_MODULE_0__.ActionTargetType.WP_USER:
      return _types_user__WEBPACK_IMPORTED_MODULE_1__.UserTypes.WP_USER;
    default:
      return null;
  }
};
const userTypeStrings = {
  [_types_user__WEBPACK_IMPORTED_MODULE_1__.UserTypes.QUICKTASKER]: "Quicktasker",
  [_types_user__WEBPACK_IMPORTED_MODULE_1__.UserTypes.WP_USER]: "WordPress User"
};


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"userApp": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkquicktasker"] = globalThis["webpackChunkquicktasker"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/user-page-app/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=userApp.js.map