/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/App.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_App__WEBPACK_IMPORTED_MODULE_1__["default"], {}), document.getElementById("wpqt-app"));

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _components_ErrorBoundary_ErrorBoundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ErrorBoundary/ErrorBoundary */ "./src/components/ErrorBoundary/ErrorBoundary.tsx");
/* harmony import */ var _hooks_useCurrentPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/useCurrentPage */ "./src/hooks/useCurrentPage.tsx");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _providers_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./providers/LoadingContextProvider */ "./src/providers/LoadingContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./providers/PipelinesContextProvider */ "./src/providers/PipelinesContextProvider.tsx");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");









function App() {
  const currentPage = (0,_hooks_useCurrentPage__WEBPACK_IMPORTED_MODULE_3__.useCurrentPage)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ErrorBoundary_ErrorBoundary__WEBPACK_IMPORTED_MODULE_2__["default"], {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_4__.AppContextProvider, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_8__.UserContextProvider, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_6__.ModalContextProvider, {
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_7__.PipelinesContextProvider, {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_providers_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_5__.LoadingContextProvider, {
              children: [currentPage, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_toastify__WEBPACK_IMPORTED_MODULE_1__.ToastContainer, {
                position: "bottom-right"
              })]
            })
          })
        })
      })
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

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
/* harmony export */   assignTaskToUserRequest: () => (/* binding */ assignTaskToUserRequest),
/* harmony export */   changeUserSessionStatusRequest: () => (/* binding */ changeUserSessionStatusRequest),
/* harmony export */   changeUserStatusRequest: () => (/* binding */ changeUserStatusRequest),
/* harmony export */   createNewStageRequest: () => (/* binding */ createNewStageRequest),
/* harmony export */   createPipelineRequest: () => (/* binding */ createPipelineRequest),
/* harmony export */   createTaskRequest: () => (/* binding */ createTaskRequest),
/* harmony export */   createUserRequest: () => (/* binding */ createUserRequest),
/* harmony export */   deletePipelineRequest: () => (/* binding */ deletePipelineRequest),
/* harmony export */   deleteStageRequest: () => (/* binding */ deleteStageRequest),
/* harmony export */   deleteTaskRequest: () => (/* binding */ deleteTaskRequest),
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
/* harmony export */   getPipelineData: () => (/* binding */ getPipelineData),
/* harmony export */   getPipelineOverviewData: () => (/* binding */ getPipelineOverviewData),
/* harmony export */   getPipelineSettingsRequest: () => (/* binding */ getPipelineSettingsRequest),
/* harmony export */   getTaskLogs: () => (/* binding */ getTaskLogs),
/* harmony export */   getUserSessionsRequest: () => (/* binding */ getUserSessionsRequest),
/* harmony export */   getUserTasksRequest: () => (/* binding */ getUserTasksRequest),
/* harmony export */   getUsersRequest: () => (/* binding */ getUsersRequest),
/* harmony export */   markCustomFieldAsDeletedRequest: () => (/* binding */ markCustomFieldAsDeletedRequest),
/* harmony export */   markTaskDoneRequest: () => (/* binding */ markTaskDoneRequest),
/* harmony export */   moveStageRequest: () => (/* binding */ moveStageRequest),
/* harmony export */   moveTaskRequest: () => (/* binding */ moveTaskRequest),
/* harmony export */   removeTaskFromUserRequest: () => (/* binding */ removeTaskFromUserRequest),
/* harmony export */   resetUserPasswordRequest: () => (/* binding */ resetUserPasswordRequest),
/* harmony export */   restoreArchivedTaskRequest: () => (/* binding */ restoreArchivedTaskRequest),
/* harmony export */   saveTaskCompletionDoneSettingRequest: () => (/* binding */ saveTaskCompletionDoneSettingRequest),
/* harmony export */   saveUserPageCustomStylesRequest: () => (/* binding */ saveUserPageCustomStylesRequest),
/* harmony export */   setPipelinePrimaryRequest: () => (/* binding */ setPipelinePrimaryRequest),
/* harmony export */   updateCustomFieldValueRequest: () => (/* binding */ updateCustomFieldValueRequest)
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
      freeForAll: task.free_for_all
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
function restoreArchivedTaskRequest(taskId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/${taskId}/archive-restore`,
    method: "PATCH",
    headers: getCommonHeaders()
  });
}
function getArchivedTasksRequest() {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/tasks/archived`,
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
function assignTaskToUserRequest(userId, taskId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}/tasks`,
    method: "POST",
    data: {
      task_id: taskId
    },
    headers: getCommonHeaders()
  });
}
function removeTaskFromUserRequest(userId, taskId) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/users/${userId}/tasks`,
    method: "DELETE",
    data: {
      task_id: taskId
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
function getCustomFieldsRequest(entityId, entityType) {
  const queryParams = new URLSearchParams({
    entityId,
    entityType
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


/***/ }),

/***/ "./src/components/Card/Card.tsx":
/*!**************************************!*\
  !*** ./src/components/Card/Card.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTCard: () => (/* binding */ WPQTCard),
/* harmony export */   WPQTCardDataItem: () => (/* binding */ WPQTCardDataItem)
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
  dropdown
}) {
  const hasDropdown = dropdown !== undefined;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__.clsx)("wpqt-relative wpqt-flex wpqt-flex-col wpqt-rounded wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-4", hasDropdown && "wpqt-pr-[24px]", className),
    onClick: onClick,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-mb-3",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-lg",
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

/***/ "./src/components/Card/TaskCardActions.tsx":
/*!*************************************************!*\
  !*** ./src/components/Card/TaskCardActions.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskCardActions: () => (/* binding */ TaskCardActions)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CheckBadgeIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/actions/useTaskActions */ "./src/hooks/actions/useTaskActions.ts");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Loading/Loading */ "./src/components/Loading/Loading.tsx");
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





function TaskCardActions({
  task,
  onDoneStatusChange,
  className = ""
}) {
  const {
    changeTaskDoneStatus
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_2__.useTaskActions)();
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const isTaskCompleted = task.is_done;
  const changeDone = done => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield changeTaskDoneStatus(task.id, done, isCompleted => {
      onDoneStatusChange(task.id, isCompleted);
    });
    setLoading(false);
  });
  if (loading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__.Loading, {
      ovalSize: "24",
      className: "wpqt-mt-auto"
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: `wpqt-flex wpqt-justify-center wpqt-mt-auto ${className}`,
    children: isTaskCompleted ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "wpqt-size-6 wpqt-icon-green",
      onClick: e => {
        e.stopPropagation();
        changeDone(false);
      }
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__["default"], {
      className: "wpqt-size-6 wpqt-text-gray-300",
      onClick: e => {
        e.stopPropagation();
        changeDone(true);
      }
    })
  });
}


/***/ }),

/***/ "./src/components/CustomField/CustomFieldCreation/CustomFieldCreation.tsx":
/*!********************************************************************************!*\
  !*** ./src/components/CustomField/CustomFieldCreation/CustomFieldCreation.tsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFieldCreation: () => (/* binding */ CustomFieldCreation)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/XCircleIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PlusCircleIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useCustomFieldActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/actions/useCustomFieldActions */ "./src/hooks/actions/useCustomFieldActions.ts");
/* harmony import */ var _providers_CustomFieldsContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../providers/CustomFieldsContextProvider */ "./src/providers/CustomFieldsContextProvider.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/Select/WPQTSelect */ "./src/components/common/Select/WPQTSelect.tsx");
/* harmony import */ var _common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
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












function CustomFieldCreation({
  description
}) {
  const [customFieldName, setCustomFieldName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [customFieldDescription, setCustomFieldDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [isCreationOpen, setIsCreationOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [selectedCustomFieldType, setSelectedCustomFieldType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(_types_custom_field__WEBPACK_IMPORTED_MODULE_6__.CustomFieldType.Text);
  const {
    addCustomField
  } = (0,_hooks_actions_useCustomFieldActions__WEBPACK_IMPORTED_MODULE_4__.useCustomFieldActions)();
  const {
    state: {
      entityId,
      entityType
    },
    customFieldsDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_CustomFieldsContextProvider__WEBPACK_IMPORTED_MODULE_5__.CustomFieldsContext);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const customFieldTypeOptions = [{
    value: _types_custom_field__WEBPACK_IMPORTED_MODULE_6__.CustomFieldType.Text,
    label: "Text"
  }, {
    value: _types_custom_field__WEBPACK_IMPORTED_MODULE_6__.CustomFieldType.Checkbox,
    label: "Checkbox"
  }];
  const createCustomField = () => __awaiter(this, void 0, void 0, function* () {
    if (!entityId || !entityType) {
      console.error("Entity ID or Entity Type is missing");
      return;
    }
    setLoading(true);
    yield addCustomField(entityId, entityType, selectedCustomFieldType, customFieldName, customFieldDescription, newCustomField => {
      customFieldsDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.ADD_CUSTOM_FIELD,
        payload: newCustomField
      });
      resetState();
    });
    setLoading(false);
  });
  const resetState = () => {
    setCustomFieldName("");
    setCustomFieldDescription("");
    setSelectedCustomFieldType(_types_custom_field__WEBPACK_IMPORTED_MODULE_6__.CustomFieldType.Text);
    setIsCreationOpen(false);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-mb-6 wpqt-flex wpqt-flex-col wpqt-items-center",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Custom Fields", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-4 wpqt-text-center",
      children: description
    }), isCreationOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-gap-4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-mb-2",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Name", "quicktasker")
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_8__.WPQTInput, {
          value: customFieldName,
          onChange: setCustomFieldName
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-mb-2",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Description", "quicktasker")
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_10__.WPQTTextarea, {
          value: customFieldDescription,
          onChange: setCustomFieldDescription
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-mb-2",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Type", "quicktasker")
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_9__.WPQTSelect, {
          selectedOptionValue: selectedCustomFieldType,
          options: customFieldTypeOptions,
          onSelectionChange: selection => {
            setSelectedCustomFieldType(selection);
          },
          allSelector: false
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-justify-end wpqt-gap-3",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_7__.WPQTIconButton, {
        text: isCreationOpen ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Cancel", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add new custom field", "quicktasker"),
        onClick: () => setIsCreationOpen(!isCreationOpen),
        icon: isCreationOpen ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
          className: "wpqt-icon-red wpqt-size-5"
        }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
          className: "wpqt-icon-green wpqt-size-5"
        })
      }), isCreationOpen && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_7__.WPQTIconButton, {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add", "quicktasker"),
        onClick: createCustomField,
        loading: loading,
        icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
          className: "wpqt-icon-green wpqt-size-5"
        })
      })]
    })]
  });
}


/***/ }),

/***/ "./src/components/CustomField/CustomFieldsAd/CustomFieldsAd.tsx":
/*!**********************************************************************!*\
  !*** ./src/components/CustomField/CustomFieldsAd/CustomFieldsAd.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFieldsAd: () => (/* binding */ CustomFieldsAd)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


function CustomFieldsAd() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center wpqt-h-full",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
      className: "wpqt-font-semibold",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Custom fields")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-text-center wpqt-mb-4",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Premium feature to create and manage custom data fields. Allows to add extra data to tasks and users.")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-text-blue-500 wpqt-font-semibold",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
        href: "https://payhip.com/b/84TLC",
        target: "_blank",
        rel: "noreferrer",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Get the premium version", "quicktasker")
      })
    })]
  });
}


/***/ }),

/***/ "./src/components/CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap.tsx":
/*!****************************************************************************************!*\
  !*** ./src/components/CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFieldsInModalWrap: () => (/* binding */ CustomFieldsInModalWrap)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _providers_CustomFieldsContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/CustomFieldsContextProvider */ "./src/providers/CustomFieldsContextProvider.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _CustomFieldCreation_CustomFieldCreation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CustomFieldCreation/CustomFieldCreation */ "./src/components/CustomField/CustomFieldCreation/CustomFieldCreation.tsx");
/* harmony import */ var _CustomFields_CustomFields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CustomFields/CustomFields */ "./src/components/CustomField/CustomFields/CustomFields.tsx");
/* harmony import */ var _CustomFieldsAd_CustomFieldsAd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../CustomFieldsAd/CustomFieldsAd */ "./src/components/CustomField/CustomFieldsAd/CustomFieldsAd.tsx");









const descriptions = {
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.User]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add custom fields to this user only.", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Users]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add custom fields to all users. If you want to add custom fields to a specific user, please go to that user settings.", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Pipeline]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add custom fields to all tasks in this board.", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Task]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add custom fields to this task only. If you want to add custom fields to all tasks in this board, please go to board settings.", "quicktasker")
};
const existingFieldsDescriptions = {
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.User]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add custom fields to this user only.", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Users]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add custom fields to all users. If you want to add custom fields to a specific user, please go to that user settings.", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Pipeline]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add custom fields to all tasks in this board.", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Task]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Custom fields applied to this task, including both task-specific and board-level fields.", "quicktasker")
};
const titles = {
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.User]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User custom fields", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Users]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Users custom fields", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Pipeline]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board custom fields", "quicktasker"),
  [_types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Task]: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task custom fields", "quicktasker")
};
function CustomFieldsInModalWrap({
  entityId,
  entityType
}) {
  const {
    state: {
      is_customFields
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_3__.AppContext);
  const creationDescription = descriptions[entityType];
  const customFieldsTitle = titles[entityType];
  const customFieldsDescription = existingFieldsDescriptions[entityType];
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: is_customFields ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_providers_CustomFieldsContextProvider__WEBPACK_IMPORTED_MODULE_4__.CustomFieldsContextProvider, {
        entityId: entityId,
        entityType: entityType,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomFieldCreation_CustomFieldCreation__WEBPACK_IMPORTED_MODULE_6__.CustomFieldCreation, {
          description: creationDescription
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
          className: "wpqt-text-center",
          children: customFieldsTitle
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-mb-4 wpqt-text-center",
          children: customFieldsDescription
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomFields_CustomFields__WEBPACK_IMPORTED_MODULE_7__.CustomFields, {})]
      })
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomFieldsAd_CustomFieldsAd__WEBPACK_IMPORTED_MODULE_8__.CustomFieldsAd, {})
  });
}


/***/ }),

/***/ "./src/components/CustomField/CustomFields/CustomFields.tsx":
/*!******************************************************************!*\
  !*** ./src/components/CustomField/CustomFields/CustomFields.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFields: () => (/* binding */ CustomFields)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EyeIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _providers_CustomFieldsContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/CustomFieldsContextProvider */ "./src/providers/CustomFieldsContextProvider.tsx");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _components_CustomField_CustomField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/CustomField/CustomField */ "./src/components/CustomField/CustomFields/components/CustomField/CustomField.tsx");








function CustomFields() {
  const {
    state: {
      loading,
      customFields
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_CustomFieldsContextProvider__WEBPACK_IMPORTED_MODULE_3__.CustomFieldsContext);
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  if (loading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-flex wpqt-justify-center",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_5__.LoadingOval, {
        width: "36",
        height: "36"
      })
    });
  }
  if (customFields && customFields.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-text-center wpqt-font-semibold",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No related custom fields created", "quicktasker")
    });
  }
  if (!isOpen) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-flex wpqt-justify-center",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_4__.WPQTIconButton, {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Show custom fields", "quicktasker"),
        onClick: () => setIsOpen(true),
        icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "wpqt-icon-blue wpqt-size-5"
        })
      })
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-my-6 wpqt-grid wpqt-grid-cols-[100px_1fr_100px] wpqt-items-center wpqt-gap-3",
      children: customFields.map(customField => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_CustomField_CustomField__WEBPACK_IMPORTED_MODULE_6__.CustomField, {
        data: customField
      }, customField.id))
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-flex wpqt-justify-center",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_4__.WPQTIconButton, {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Close", "quicktasker"),
        onClick: () => setIsOpen(false),
        icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "wpqt-icon-red wpqt-size-5"
        })
      })
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
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PencilSquareIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
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
  const isAllowedToSave = locationOfCustomFields === _types_custom_field__WEBPACK_IMPORTED_MODULE_4__.CustomFieldEntityType.Task || locationOfCustomFields === _types_custom_field__WEBPACK_IMPORTED_MODULE_4__.CustomFieldEntityType.User;
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
    children: [isAllowedToSave && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__.WPQTIconButton, {
      onClick: onSave,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "wpqt-icon-green wpqt-size-4"
      }),
      tooltipId: `custom-field-${data.id}-update`,
      tooltipText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit custom field value", "quicktasker")
    }), isUserAllowedToDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__.WPQTIconButton, Object.assign({
      onClick: handleDelete,
      className: `${!isAllowedToDelete ? "!wpqt-cursor-not-allowed" : ""}`,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
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
    markCustomFieldAsDeleted
  } = (0,_hooks_actions_useCustomFieldActions__WEBPACK_IMPORTED_MODULE_3__.useCustomFieldActions)();
  const [actionLoading, setActionLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (data.value) {
      setValue(data.value);
    }
  }, [data.value]);
  const handleSave = () => __awaiter(this, void 0, void 0, function* () {
    if (entityType === _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.User || entityType === _types_custom_field__WEBPACK_IMPORTED_MODULE_5__.CustomFieldEntityType.Task) {
      setActionLoading(true);
      yield updateCustomFieldValue(data.id, value, entityId, entityType);
      setActionLoading(false);
    } else {
      console.error("Invalid entity type for saving custom field value");
    }
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

/***/ "./src/components/Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown.tsx":
/*!*******************************************************************************!*\
  !*** ./src/components/Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown.tsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchivedTaskDropdown: () => (/* binding */ ArchivedTaskDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EllipsisHorizontalIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EyeIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArrowUturnUpIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/actions/useTaskActions */ "./src/hooks/actions/useTaskActions.ts");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../providers/ArchiveContextProvider */ "./src/providers/ArchiveContextProvider.tsx");
/* harmony import */ var _WPQTDropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../WPQTDropdown */ "./src/components/Dropdown/WPQTDropdown.tsx");
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








function ArchivedTaskDropdown({
  task
}) {
  const {
    state: {
      isUserAllowedToDelete
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_4__.AppContext);
  const {
    archiveDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_5__.ArchiveContext);
  const {
    deleteTask,
    restoreArchivedTask
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_3__.useTaskActions)();
  const [isRestoring, setIsRestoring] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [isDeleting, setIsDeleting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const pipelineExists = task.pipeline_name !== null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_6__.WPQTDropdown, {
    menuBtn: ({
      active
    }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_6__.WPQTDropdownIcon, {
      isActive: active,
      IconComponent: _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"]
    }),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_6__.WPQTDropdownItem, {
      text: "View task",
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: "wpqt-icon-blue wpqt-size-4"
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_6__.WPQTDropdownItem, {
      text: "Restore task",
      loading: isRestoring,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "wpqt-icon-green wpqt-size-4"
      }),
      disabled: !pipelineExists,
      id: `restore-task-${task.id}-dropdown-item`,
      tooltipText: "Task cannot be restored because the board has been deleted.",
      onClick: e => __awaiter(this, void 0, void 0, function* () {
        e.stopPropagation();
        setIsRestoring(true);
        yield restoreArchivedTask(task.id, () => {
          archiveDispatch({
            type: _constants__WEBPACK_IMPORTED_MODULE_2__.REMOVE_ARCHIVED_TASK,
            payload: task.id
          });
        });
        setIsRestoring(false);
      })
    }), isUserAllowedToDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_6__.WPQTDropdownItem, {
      text: "Delete",
      loading: isDeleting,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: "wpqt-icon-red wpqt-size-4"
      }),
      onClick: e => __awaiter(this, void 0, void 0, function* () {
        e.stopPropagation();
        setIsDeleting(true);
        yield deleteTask(task.id, () => {
          archiveDispatch({
            type: _constants__WEBPACK_IMPORTED_MODULE_2__.REMOVE_ARCHIVED_TASK,
            payload: task.id
          });
        });
        setIsDeleting(false);
      }),
      className: "!wpqt-mb-0"
    })]
  });
}


/***/ }),

/***/ "./src/components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown.tsx":
/*!*****************************************************************************************!*\
  !*** ./src/components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown.tsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineSelectionDropdown: () => (/* binding */ PipelineSelectionDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/menu/menu.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/StarIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PlusCircleIcon.js");
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @heroicons/react/24/solid */ "./node_modules/@heroicons/react/24/solid/esm/ChevronDownIcon.js");
/* harmony import */ var _heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @heroicons/react/24/solid */ "./node_modules/@heroicons/react/24/solid/esm/StarIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../providers/PipelinesContextProvider */ "./src/providers/PipelinesContextProvider.tsx");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _WPQTDropdown__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../WPQTDropdown */ "./src/components/Dropdown/WPQTDropdown.tsx");
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















function PipelineSelectionDropdown() {
  const {
    state: {
      activePipeline
    },
    fetchAndSetPipelineData
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_7__.ActivePipelineContext);
  const {
    state: {
      pipelines
    },
    pipelinesDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_9__.PipelinesContext);
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_8__.ModalContext);
  const changePipelinePrimary = pipeline => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_5__.setPipelinePrimaryRequest)(pipeline.id);
      pipelinesDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_6__.PIPELINE_SET_PRIMARY,
        payload: pipeline.id
      });
    } catch (e) {
      console.error(e);
      react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to set primary board", "quicktasker"));
    }
  });
  const openPipelineModal = () => __awaiter(this, void 0, void 0, function* () {
    modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_6__.OPEN_NEW_PIPELINE_MODAL
    });
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_11__.WPQTDropdown, {
    menuBtnClasses: "wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1 wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-p-3",
    menuBtn: ({
      active
    }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-leading-none",
        children: activePipeline === null || activePipeline === void 0 ? void 0 : activePipeline.name
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_12__["default"], {
        className: `wpqt-size-4 ${active ? "wpqt-text-qtBlueHover" : ""}`
      })]
    }),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-4 wpqt-text-center wpqt-font-bold",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Change board", "quicktasker")
    }), pipelines.map(existingPipeline => {
      const isPrimary = existingPipeline.is_primary;
      const isCurrentPipeline = (activePipeline === null || activePipeline === void 0 ? void 0 : activePipeline.id) === existingPipeline.id;
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_13__.MenuItem, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "wpqt-mb-3 wpqt-flex wpqt-gap-2",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__.clsx)("wpqt-cursor-pointer wpqt-text-center", {
              "wpqt-font-bold": isCurrentPipeline
            }),
            onClick: () => fetchAndSetPipelineData(existingPipeline.id),
            children: existingPipeline.name
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "wpqt-ml-auto",
            children: isPrimary ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_14__["default"], {
              className: "wpqt-size-4 wpqt-cursor-pointer wpqt-text-blue-500"
            }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_15__["default"], {
              className: "wpqt-size-4 wpqt-cursor-pointer wpqt-text-gray-400",
              onClick: e => {
                e.stopPropagation();
                changePipelinePrimary(existingPipeline);
              }
            })
          })]
        })
      }, existingPipeline.id);
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_13__.MenuItem, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-mt-4 wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-2",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_10__.WPQTIconButton, {
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add new board", "quicktasker"),
          onClick: openPipelineModal,
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_16__["default"], {
            className: "wpqt-size-6 wpqt-icon-green"
          }),
          className: "wpqt-bg-white hover:!wpqt-bg-gray-100"
        })
      })
    }, "new-pipeline")]
  });
}


/***/ }),

/***/ "./src/components/Dropdown/StageControlsDropdown/StageControlsDropdown.tsx":
/*!*********************************************************************************!*\
  !*** ./src/components/Dropdown/StageControlsDropdown/StageControlsDropdown.tsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StageControlsDropdown: () => (/* binding */ StageControlsDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/Cog8ToothIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ChevronLeftIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ChevronRightIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PencilSquareIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArchiveBoxIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _WPQTDropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../WPQTDropdown */ "./src/components/Dropdown/WPQTDropdown.tsx");
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











function StageControlsDropdown({
  stage
}) {
  var _a, _b, _c, _d;
  const {
    dispatch,
    state: {
      activePipeline
    },
    fetchAndSetPipelineData
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_6__.ActivePipelineContext);
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_8__.ModalContext);
  const {
    state: {
      isUserAllowedToDelete
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_7__.AppContext);
  const [moveLoading, setMoveLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [archiveLoading, setArchiveLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [deleteLoading, setDeleteLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const stagesLength = (_b = (_a = activePipeline === null || activePipeline === void 0 ? void 0 : activePipeline.stages) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
  const stageTasksLenght = (_d = (_c = stage.tasks) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
  const stageOrder = +stage.stage_order;
  const showMoveLeft = stageOrder > 0 && stageOrder < stagesLength;
  const showMoveRight = stageOrder !== stagesLength - 1;
  const deleteStage = () => __awaiter(this, void 0, void 0, function* () {
    try {
      setDeleteLoading(true);
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.deleteStageRequest)(stage.id);
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.PIPELINE_DELETE_STAGE,
        payload: stage.id
      });
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to delete a stage", "quicktasker"));
    } finally {
      setDeleteLoading(false);
    }
  });
  const openStageEditModal = () => {
    modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_5__.OPEN_STAGE_EDIT_MODAL,
      payload: {
        stageToEdit: stage
      }
    });
  };
  const moveStage = direction => __awaiter(this, void 0, void 0, function* () {
    try {
      setMoveLoading(true);
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.moveStageRequest)(stage.id, direction);
      yield fetchAndSetPipelineData(activePipeline.id);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to move a stage", "quicktasker"));
    } finally {
      setMoveLoading(false);
    }
  });
  const archiveAllStageTasks = () => __awaiter(this, void 0, void 0, function* () {
    try {
      setArchiveLoading(true);
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.archiveStageTasksRequest)(stage.id);
      yield fetchAndSetPipelineData(activePipeline.id);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Archived all %s tasks", "quicktasker"), stage.name));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to archive stage %s tasks", "quicktasker"), stage.name));
    } finally {
      setArchiveLoading(false);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_9__.WPQTDropdown, {
    menuBtn: ({
      active
    }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_9__.WPQTDropdownIcon, {
      isActive: active,
      IconComponent: _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"]
    }),
    children: [showMoveLeft && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_9__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Move left", "quicktasker"),
      loading: moveLoading,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "wpqt-icon-blue wpqt-size-4"
      }),
      onClick: () => moveStage("left")
    }), showMoveRight && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_9__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Move right", "quicktasker"),
      loading: moveLoading,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
        className: "wpqt-icon-blue wpqt-size-4"
      }),
      onClick: () => moveStage("right")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_9__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit stage", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_13__["default"], {
        className: "wpqt-icon-green wpqt-size-4"
      }),
      onClick: openStageEditModal
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_9__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Archive all stage tasks", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_14__["default"], {
        className: "wpqt-icon-blue wpqt-size-4"
      }),
      loading: archiveLoading,
      onClick: archiveAllStageTasks,
      disabled: stageTasksLenght === 0,
      id: `item-dropdown-${stage.id}-archive`,
      tooltipText: stageTasksLenght === 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No tasks to archive on the stage", "quicktasker") : undefined
    }), isUserAllowedToDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_9__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete stage", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_15__["default"], {
        className: "wpqt-icon-red wpqt-size-4"
      }),
      loading: deleteLoading,
      onClick: deleteStage,
      disabled: stageTasksLenght > 0,
      className: "!wpqt-mb-0",
      id: `item-dropdown-${stage.id}`,
      tooltipText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Stage can be deleted when there are no tasks on it", "quicktasker")
    })]
  });
}


/***/ }),

/***/ "./src/components/Dropdown/TaskControlsDropdown/TaskControlsDropdown.tsx":
/*!*******************************************************************************!*\
  !*** ./src/components/Dropdown/TaskControlsDropdown/TaskControlsDropdown.tsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskControlsDropdown: () => (/* binding */ TaskControlsDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EllipsisHorizontalIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArchiveBoxIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PencilSquareIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/actions/useTaskActions */ "./src/hooks/actions/useTaskActions.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _WPQTDropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../WPQTDropdown */ "./src/components/Dropdown/WPQTDropdown.tsx");
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










function TaskControlsDropdown({
  task
}) {
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_7__.ModalContext);
  const {
    state: {
      activePipeline
    },
    fetchAndSetPipelineData
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_5__.ActivePipelineContext);
  const {
    state: {
      isUserAllowedToDelete
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_6__.AppContext);
  const {
    deleteTask,
    archiveTask
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_4__.useTaskActions)();
  const [deleteLoading, setDeleteLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const openTaskEditModal = e => {
    e.stopPropagation();
    modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task
      }
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_8__.WPQTDropdown, {
    menuBtn: ({
      active
    }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_8__.WPQTDropdownIcon, {
      isActive: active,
      IconComponent: _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"]
    }),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_8__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Archive task", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: "wpqt-icon-blue wpqt-size-4"
      }),
      onClick: e => {
        e.stopPropagation();
        archiveTask(task.id, () => {
          fetchAndSetPipelineData(activePipeline.id);
        });
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_8__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit task", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "wpqt-icon-green wpqt-size-4"
      }),
      onClick: openTaskEditModal
    }), isUserAllowedToDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_8__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete task", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
        className: "wpqt-icon-red wpqt-size-4"
      }),
      loading: deleteLoading,
      onClick: e => __awaiter(this, void 0, void 0, function* () {
        e.stopPropagation();
        setDeleteLoading(true);
        yield deleteTask(task.id, () => {
          fetchAndSetPipelineData(activePipeline.id);
        });
        setDeleteLoading(false);
      }),
      className: "!wpqt-mb-0"
    })]
  });
}


/***/ }),

/***/ "./src/components/Dropdown/UserAssignementDropdown/UserAssignementDropdown.tsx":
/*!*************************************************************************************!*\
  !*** ./src/components/Dropdown/UserAssignementDropdown/UserAssignementDropdown.tsx ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserAssignementDropdown: () => (/* binding */ UserAssignementDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserCircleIcon.js");
/* harmony import */ var _User_UserAssignementSelection_UserAssignementSelection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../User/UserAssignementSelection/UserAssignementSelection */ "./src/components/User/UserAssignementSelection/UserAssignementSelection.tsx");
/* harmony import */ var _WPQTDropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../WPQTDropdown */ "./src/components/Dropdown/WPQTDropdown.tsx");




function UserAssignementDropdown({
  task,
  onUserAdd = () => {},
  onUserDelete = () => {},
  menuBtnClasses = ""
}) {
  const hasAssignedUsers = task.assigned_users && task.assigned_users.length > 0;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_2__.WPQTDropdown, {
    menuBtnClasses: `wpqt-inline-flex ${menuBtnClasses}`,
    anchor: "bottom start",
    menuBtn: () => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-group wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: `wpqt-mr-1 wpqt-size-5 ${hasAssignedUsers ? "wpqt-text-blue-400" : "wpqt-text-gray-300"} group-hover:wpqt-text-blue-600`
      }), task.assigned_users && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: task.assigned_users.map((user, index) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
          children: [user.name, index < task.assigned_users.length - 1 && ", "]
        }, user.id))
      })]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_User_UserAssignementSelection_UserAssignementSelection__WEBPACK_IMPORTED_MODULE_1__.UserAssignementSelection, {
      task: task,
      onUserAdd: onUserAdd,
      onUserDelete: onUserDelete
    })
  });
}


/***/ }),

/***/ "./src/components/Dropdown/UserDropdown/UserDropdown.tsx":
/*!***************************************************************!*\
  !*** ./src/components/Dropdown/UserDropdown/UserDropdown.tsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserDropdown: () => (/* binding */ UserDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EllipsisHorizontalIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/RectangleStackIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PencilSquareIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/KeyIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PowerIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/actions/useUserActions */ "./src/hooks/actions/useUserActions.ts");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
/* harmony import */ var _WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../WPQTDropdown */ "./src/components/Dropdown/WPQTDropdown.tsx");
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









function UserDropdown({
  user
}) {
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_5__.ModalContext);
  const {
    userDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_6__.UserContext);
  const {
    changeUserStatus,
    deleteUser,
    resetUserPassword
  } = (0,_hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_4__.useUserActions)();
  const [isResettingPw, setIsResettingPw] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [isDeleting, setIsDeleting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [isChangingStatus, setIsChangingStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const userIsActive = user.is_active;
  const openEditUserModal = e => {
    e.stopPropagation();
    modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.OPEN_EDIT_USER_MODAL,
      payload: user
    });
  };
  const onChangeUserStatus = status => __awaiter(this, void 0, void 0, function* () {
    setIsChangingStatus(true);
    yield changeUserStatus(user.id, status, () => {
      userDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.CHANGE_USER_STATUS,
        payload: {
          userId: user.id,
          isActive: status
        }
      });
    });
    setIsChangingStatus(false);
  });
  const onDeleteUser = e => __awaiter(this, void 0, void 0, function* () {
    e.stopPropagation();
    setIsDeleting(true);
    yield deleteUser(user.id, userId => {
      userDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_3__.DELETE_USER,
        payload: userId
      });
    });
    setIsDeleting(false);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdown, {
    menuBtn: ({
      active
    }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdownIcon, {
      isActive: active,
      IconComponent: _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"]
    }),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User details", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "wpqt-icon-blue wpqt-size-4"
      }),
      onClick: e => {
        e.stopPropagation();
        window.location.hash = `#/users/${user.id}`;
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User tasks", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: "wpqt-icon-blue wpqt-size-4"
      }),
      onClick: e => {
        e.stopPropagation();
        window.location.hash = `#/users/${user.id}/tasks`;
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit user", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "wpqt-icon-green wpqt-size-4"
      }),
      onClick: openEditUserModal
    }), user.has_password && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Reset password", "quicktasker"),
      loading: isResettingPw,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_12__["default"], {
        className: "wpqt-icon-red wpqt-size-4"
      }),
      onClick: e => __awaiter(this, void 0, void 0, function* () {
        e.stopPropagation();
        setIsResettingPw(true);
        yield resetUserPassword(user.id, () => {
          userDispatch({
            type: _constants__WEBPACK_IMPORTED_MODULE_3__.RESET_PASSWORD,
            payload: user.id
          });
        });
        setIsResettingPw(false);
      })
    }), userIsActive && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Disable user", "quicktasker"),
      loading: isChangingStatus,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_13__["default"], {
        className: "wpqt-icon-red wpqt-size-4"
      }),
      className: "!wpqt-mb-0",
      onClick: e => {
        e.stopPropagation();
        onChangeUserStatus(false);
      }
    }), !userIsActive && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdownItem, {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Activate user", "quicktasker"),
        loading: isChangingStatus,
        icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_13__["default"], {
          className: "wpqt-icon-green wpqt-size-4"
        }),
        onClick: e => {
          e.stopPropagation();
          onChangeUserStatus(true);
        }
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_7__.WPQTDropdownItem, {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete user", "quicktasker"),
        loading: isDeleting,
        icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_14__["default"], {
          className: "wpqt-icon-red wpqt-size-4"
        }),
        onClick: onDeleteUser
      })]
    })]
  });
}


/***/ }),

/***/ "./src/components/Dropdown/UserTaskDropdown/UserTaskDropdown.tsx":
/*!***********************************************************************!*\
  !*** ./src/components/Dropdown/UserTaskDropdown/UserTaskDropdown.tsx ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTaskDropdown: () => (/* binding */ UserTaskDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EllipsisHorizontalIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserMinusIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _WPQTDropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../WPQTDropdown */ "./src/components/Dropdown/WPQTDropdown.tsx");
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





function UserTaskDropdown({
  taskId,
  onUnAssignTask
}) {
  const [isUnassigning, setIsUnassigning] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_3__.WPQTDropdown, {
    menuBtn: ({
      active
    }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_3__.WPQTDropdownIcon, {
      isActive: active,
      IconComponent: _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__["default"]
    }),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTDropdown__WEBPACK_IMPORTED_MODULE_3__.WPQTDropdownItem, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Unassign from task", "quicktasker"),
      loading: isUnassigning,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "wpqt-icon-red wpqt-size-4"
      }),
      onClick: e => __awaiter(this, void 0, void 0, function* () {
        e.stopPropagation();
        setIsUnassigning(true);
        yield onUnAssignTask(taskId);
        setIsUnassigning(false);
      }),
      className: "!wpqt-mb-0"
    })
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
        className: "wpqt-absolute wpqt-top-1/2 wpqt-left-1/2 wpqt-transform-y-center wpqt-transform-x-center"
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

/***/ "./src/components/Filter/ArchiveFilter/ArchiveFilter.tsx":
/*!***************************************************************!*\
  !*** ./src/components/Filter/ArchiveFilter/ArchiveFilter.tsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveFilter: () => (/* binding */ ArchiveFilter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/input/input.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/ArchiveContextProvider */ "./src/providers/ArchiveContextProvider.tsx");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../types/enums */ "./src/types/enums.tsx");
/* harmony import */ var _common_Select_PipelineFilterSelect_PipelineFilterSelect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/Select/PipelineFilterSelect/PipelineFilterSelect */ "./src/components/common/Select/PipelineFilterSelect/PipelineFilterSelect.tsx");
/* harmony import */ var _common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../common/Select/WPQTSelect */ "./src/components/common/Select/WPQTSelect.tsx");
/* harmony import */ var _WPQTFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../WPQTFilter */ "./src/components/Filter/WPQTFilter.tsx");










function ArchiveFilter() {
  const {
    state: {
      archiveSearchValue,
      archiveFilteredPipelineId,
      archiveTaskDoneFilter
    },
    archiveDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_4__.ArchiveContext);
  const setArchiveSearchValue = event => {
    archiveDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_ARCHIVE_SEARCH_VALUE,
      payload: event.target.value
    });
  };
  const onSelectionChange = selection => {
    archiveDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_ARCHIVE_FILTERED_PIPELINE,
      payload: selection
    });
  };
  const convertToWPQTArchiveDoneFilter = selection => {
    switch (selection) {
      case _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.All:
        return _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.All;
      case _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.Completed:
        return _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.Completed;
      case _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.NotCompleted:
        return _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.NotCompleted;
      default:
        throw new Error(`Invalid selection: ${selection}`);
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTFilter__WEBPACK_IMPORTED_MODULE_8__.WPQTFilter, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Archive filtering", "quicktasker"),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_9__.Input, {
      type: "text",
      value: archiveSearchValue,
      onChange: setArchiveSearchValue
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_PipelineFilterSelect_PipelineFilterSelect__WEBPACK_IMPORTED_MODULE_6__.PipelineFilterSelect, {
      selectedOptionValue: archiveFilteredPipelineId,
      selectionChange: onSelectionChange,
      extraOptions: [{
        value: "DELETED",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("DELETED", "quicktasker")
      }]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_7__.WPQTSelect, {
      allSelector: false,
      selectedOptionValue: archiveTaskDoneFilter,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("All status", "quicktasker"),
        value: _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.All
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Completed", "quicktasker"),
        value: _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.Completed
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Not completed", "quicktasker"),
        value: _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTArchiveDoneFilter.NotCompleted
      }],
      onSelectionChange: selection => {
        const filter = convertToWPQTArchiveDoneFilter(selection);
        archiveDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_3__.CHANGE_ARCHIVE_TASK_DONE_FILTER,
          payload: filter
        });
      }
    })]
  });
}


/***/ }),

/***/ "./src/components/Filter/LogsFilter/LogsFilter.tsx":
/*!*********************************************************!*\
  !*** ./src/components/Filter/LogsFilter/LogsFilter.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogsFilter: () => (/* binding */ LogsFilter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/FunnelIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../pages/LogsPage/components/LogsPageContent/LogsPageContent */ "./src/pages/LogsPage/components/LogsPageContent/LogsPageContent.tsx");
/* harmony import */ var _providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/PipelinesContextProvider */ "./src/providers/PipelinesContextProvider.tsx");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/Select/WPQTSelect */ "./src/components/common/Select/WPQTSelect.tsx");
/* harmony import */ var _WPQTFilter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../WPQTFilter */ "./src/components/Filter/WPQTFilter.tsx");









const LogsFilter = ({
  filterSettings,
  setFilterSettings
}) => {
  const {
    state: {
      pipelines
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_4__.PipelinesContext);
  const [localFilterSettings, setLocalFilterSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(filterSettings);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTFilter__WEBPACK_IMPORTED_MODULE_7__.WPQTFilter, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Logs filtering", "quicktasker"),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_6__.WPQTSelect, {
      allSelector: false,
      selectedOptionValue: localFilterSettings.type,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("All types", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogTypeEnum.All
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogTypeEnum.Pipeline
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Stage", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogTypeEnum.Stage
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogTypeEnum.Task
      }],
      onSelectionChange: selection => {
        setLocalFilterSettings(Object.assign(Object.assign({}, localFilterSettings), {
          type: selection,
          typeId: ""
        }));
      }
    }), localFilterSettings.type === _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogTypeEnum.Pipeline && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_6__.WPQTSelect, {
      allSelector: true,
      selectedOptionValue: localFilterSettings.typeId,
      options: pipelines.map(pipeline => ({
        label: pipeline.name,
        value: pipeline.id
      })),
      onSelectionChange: selection => {
        setLocalFilterSettings(Object.assign(Object.assign({}, localFilterSettings), {
          typeId: selection
        }));
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_6__.WPQTSelect, {
      allSelector: false,
      selectedOptionValue: localFilterSettings.createdBy,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Everyone", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogCreatedByEnum.All
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Admin", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogCreatedByEnum.Admin
      }, {
        label: "QuickTasker",
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogCreatedByEnum.Quicktasker
      }],
      onSelectionChange: selection => {
        setLocalFilterSettings(Object.assign(Object.assign({}, localFilterSettings), {
          createdBy: selection
        }));
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_6__.WPQTSelect, {
      allSelector: false,
      selectedOptionValue: localFilterSettings.numberOfLogs,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Show 100", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogNumberEnum.Hundred
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Show 200", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogNumberEnum.TwoHundred
      }, {
        label: "Show 500",
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogNumberEnum.FiveHundred
      }, {
        label: "Show all",
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogNumberEnum.All
      }],
      onSelectionChange: selection => {
        setLocalFilterSettings(Object.assign(Object.assign({}, localFilterSettings), {
          numberOfLogs: selection
        }));
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_WPQTSelect__WEBPACK_IMPORTED_MODULE_6__.WPQTSelect, {
      allSelector: false,
      selectedOptionValue: localFilterSettings.order,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("ASC", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogOrderEnum.Asc
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("DESC", "quicktasker"),
        value: _pages_LogsPage_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_3__.LogOrderEnum.Desc
      }],
      onSelectionChange: selection => {
        setLocalFilterSettings(Object.assign(Object.assign({}, localFilterSettings), {
          order: selection
        }));
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__.WPQTIconButton, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Apply filter", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: "wpqt-size-5 wpqt-icon-blue"
      }),
      onClick: () => setFilterSettings(localFilterSettings)
    })]
  });
};


/***/ }),

/***/ "./src/components/Filter/NoFilterResults/NoFilterResults.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/Filter/NoFilterResults/NoFilterResults.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoFilterResults: () => (/* binding */ NoFilterResults)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


function NoFilterResults({
  text = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No results found", "quicktasker")
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-font-semibold",
    children: text
  });
}


/***/ }),

/***/ "./src/components/Filter/UserFilter/UserFilter.tsx":
/*!*********************************************************!*\
  !*** ./src/components/Filter/UserFilter/UserFilter.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserFilter: () => (/* binding */ UserFilter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/input/input.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
/* harmony import */ var _WPQTFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../WPQTFilter */ "./src/components/Filter/WPQTFilter.tsx");







function UserFilter() {
  const {
    state: {
      usersSearchValue
    },
    userDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserContext);
  const setArchiveSearchValue = event => {
    userDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USERS_SEARCH_VALUE,
      payload: event.target.value
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTFilter__WEBPACK_IMPORTED_MODULE_5__.WPQTFilter, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User filtering", "quicktasker"),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Input, {
      type: "text",
      value: usersSearchValue,
      onChange: setArchiveSearchValue
    })
  });
}


/***/ }),

/***/ "./src/components/Filter/UserSessionsFilter/UserSessionsFilter.tsx":
/*!*************************************************************************!*\
  !*** ./src/components/Filter/UserSessionsFilter/UserSessionsFilter.tsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserSessionsFilter: () => (/* binding */ UserSessionsFilter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/UserSessionsContextProvider */ "./src/providers/UserSessionsContextProvider.tsx");
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _WPQTFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../WPQTFilter */ "./src/components/Filter/WPQTFilter.tsx");







function UserSessionsFilter() {
  const {
    state: {
      sessionsSearchValue
    },
    usersSessionDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserSessionsContext);
  const setSessionSearchValue = value => {
    usersSessionDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_SESSIONS_SEARCH_VALUE,
      payload: value
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTFilter__WEBPACK_IMPORTED_MODULE_6__.WPQTFilter, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Session filtering", "quicktasker"),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_5__.WPQTInput, {
      value: sessionsSearchValue,
      onChange: setSessionSearchValue
    })
  });
}


/***/ }),

/***/ "./src/components/Filter/UserTasksFilter/UserTasksFilter.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/Filter/UserTasksFilter/UserTasksFilter.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTasksFilter: () => (/* binding */ UserTasksFilter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_UserTasksContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/UserTasksContextProvider */ "./src/providers/UserTasksContextProvider.tsx");
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _common_Select_PipelineFilterSelect_PipelineFilterSelect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/Select/PipelineFilterSelect/PipelineFilterSelect */ "./src/components/common/Select/PipelineFilterSelect/PipelineFilterSelect.tsx");
/* harmony import */ var _WPQTFilter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../WPQTFilter */ "./src/components/Filter/WPQTFilter.tsx");








function UserTasksFilter() {
  const {
    state: {
      searchValue,
      filteredPipelineId
    },
    userTasksDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserTasksContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserTasksContext);
  const onValueChange = value => {
    userTasksDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_TASKS_SEARCH_VALUE,
      payload: value
    });
  };
  const onPipelineChange = pipelineId => {
    userTasksDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_TASKS_FILTERED_PIPELINE,
      payload: pipelineId
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTFilter__WEBPACK_IMPORTED_MODULE_7__.WPQTFilter, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Filter tasks", "quicktasker"),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_5__.WPQTInput, {
      value: searchValue,
      onChange: onValueChange,
      className: "!wpqt-mb-0"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Select_PipelineFilterSelect_PipelineFilterSelect__WEBPACK_IMPORTED_MODULE_6__.PipelineFilterSelect, {
      selectedOptionValue: filteredPipelineId,
      selectionChange: onPipelineChange
    })]
  });
}


/***/ }),

/***/ "./src/components/Filter/WPQTFilter.tsx":
/*!**********************************************!*\
  !*** ./src/components/Filter/WPQTFilter.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTFilter: () => (/* binding */ WPQTFilter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function WPQTFilter({
  children,
  title,
  childrenClassName = "",
  titleClassName = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-mb-8",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: `wpqt-mb-2 wpqt-text-base ${titleClassName}`,
      children: title
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: `wpqt-flex wpqt-gap-2 wpqt-items-center ${childrenClassName}`,
      children: children
    })]
  });
}


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
  className = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_loader_spinner__WEBPACK_IMPORTED_MODULE_1__.Oval, {
    visible: true,
    height: height,
    width: width,
    color: "#1d4ed8",
    secondaryColor: "#2563eb",
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
  className,
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

/***/ "./src/components/Log/LogItem.tsx":
/*!****************************************!*\
  !*** ./src/components/Log/LogItem.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogItem: () => (/* binding */ LogItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useTimezone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useTimezone */ "./src/hooks/useTimezone.ts");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../types/enums */ "./src/types/enums.tsx");




const LogItem = ({
  log
}) => {
  const {
    convertToWPTimezone
  } = (0,_hooks_useTimezone__WEBPACK_IMPORTED_MODULE_2__.useTimezone)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-center wpqt-mb-1",
        children: log.author_name
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-center",
        children: log.created_by === _types_enums__WEBPACK_IMPORTED_MODULE_3__.WPQTLogCreatedBy.Admin ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Admin", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("QuickTasker", "quicktasker")
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: log.text
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: convertToWPTimezone(log.created_at)
    })]
  });
};


/***/ }),

/***/ "./src/components/Modal/PipelineModal/AddPipelineModal/AddPipelineModal.tsx":
/*!**********************************************************************************!*\
  !*** ./src/components/Modal/PipelineModal/AddPipelineModal/AddPipelineModal.tsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddPipelineModal: () => (/* binding */ AddPipelineModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");
/* harmony import */ var _AddPipelineModalContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AddPipelineModalContent */ "./src/components/Modal/PipelineModal/AddPipelineModal/AddPipelineModalContent.tsx");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../hooks/useModal */ "./src/hooks/useModal.tsx");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
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









function AddPipelineModal() {
  const {
    state: {
      newPipelineModalOpen
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_4__.ModalContext);
  const {
    fetchAndSetPipelineData
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__.ActivePipelineContext);
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError
  } = (0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_7__.useModal)(_constants__WEBPACK_IMPORTED_MODULE_3__.CLOSE_PIPELINE_MODAL);
  const addPipeline = (pipelineName, pipelineDescription) => __awaiter(this, void 0, void 0, function* () {
    try {
      setModalSaving(true);
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.createPipelineRequest)(pipelineName, pipelineDescription);
      handleSuccess(_constants__WEBPACK_IMPORTED_MODULE_3__.PIPELINE_ADD_PIPELINE, response.data, _hooks_useModal__WEBPACK_IMPORTED_MODULE_7__.DispatchType.PIPELINES);
      fetchAndSetPipelineData(response.data.id);
    } catch (error) {
      handleError(error);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_5__.WPQTModal, {
    modalOpen: newPipelineModalOpen,
    closeModal: closeModal,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AddPipelineModalContent__WEBPACK_IMPORTED_MODULE_6__.PipelineModalContent, {
      ref: modalContentRef,
      addPipeline: addPipeline,
      modalSaving: modalSaving,
      setModalSaving: setModalSaving
    })
  });
}


/***/ }),

/***/ "./src/components/Modal/PipelineModal/AddPipelineModal/AddPipelineModalContent.tsx":
/*!*****************************************************************************************!*\
  !*** ./src/components/Modal/PipelineModal/AddPipelineModal/AddPipelineModalContent.tsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineModalContent: () => (/* binding */ PipelineModalContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");






const PipelineModalContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  addPipeline,
  modalSaving
}, ref) => {
  const [pipelineName, setPipelineName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [pipelineDescription, setPipelineDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const savePipeline = () => {
    addPipeline(pipelineName, pipelineDescription);
  };
  const clearContent = () => {
    setPipelineName("");
    setPipelineDescription("");
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, () => ({
    clearContent
  }));
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTModal__WEBPACK_IMPORTED_MODULE_5__.WPQTModalFieldSet, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_5__.WPQTModalField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Name", "quicktasker"),
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_3__.WPQTInput, {
          isAutoFocus: true,
          value: pipelineName,
          onChange: newValue => setPipelineName(newValue)
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_5__.WPQTModalField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Description", "quicktasker"),
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_4__.WPQTTextarea, {
          rowsCount: 3,
          value: pipelineDescription,
          onChange: newValue => setPipelineDescription(newValue)
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_5__.WPQTModalFooter, {
      onSave: savePipeline,
      loading: modalSaving,
      saveBtnText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add board", "quicktasker")
    })]
  });
});


/***/ }),

/***/ "./src/components/Modal/PipelineModal/EditPipelineModal/EditPipelineModal.tsx":
/*!************************************************************************************!*\
  !*** ./src/components/Modal/PipelineModal/EditPipelineModal/EditPipelineModal.tsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditPipelineModal: () => (/* binding */ EditPipelineModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../hooks/useModal */ "./src/hooks/useModal.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");
/* harmony import */ var _EditPipelineModalContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EditPipelineModalContent */ "./src/components/Modal/PipelineModal/EditPipelineModal/EditPipelineModalContent.tsx");
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








function EditPipelineModal() {
  const {
    state: {
      pipelineModalOpen
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_5__.ModalContext);
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError
  } = (0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__.useModal)(_constants__WEBPACK_IMPORTED_MODULE_3__.CLOSE_PIPELINE_MODAL);
  const editPipeline = pipeline => __awaiter(this, void 0, void 0, function* () {
    try {
      setModalSaving(true);
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.editPipelineRequest)(pipeline);
      handleSuccess(_constants__WEBPACK_IMPORTED_MODULE_3__.PIPELINE_EDIT_PIPELINE, response.data, _hooks_useModal__WEBPACK_IMPORTED_MODULE_4__.DispatchType.ACTIVE_PIPELINE);
    } catch (error) {
      handleError(error);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModal, {
    modalOpen: pipelineModalOpen,
    closeModal: closeModal,
    size: "xl",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_EditPipelineModalContent__WEBPACK_IMPORTED_MODULE_7__.EditPipelineModalContent, {
      ref: modalContentRef,
      editPipeline: editPipeline,
      modalSaving: modalSaving,
      setModalSaving: setModalSaving
    })
  });
}


/***/ }),

/***/ "./src/components/Modal/PipelineModal/EditPipelineModal/EditPipelineModalContent.tsx":
/*!*******************************************************************************************!*\
  !*** ./src/components/Modal/PipelineModal/EditPipelineModal/EditPipelineModalContent.tsx ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditPipelineModalContent: () => (/* binding */ EditPipelineModalContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_usePipelineActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../hooks/actions/usePipelineActions */ "./src/hooks/actions/usePipelineActions.ts");
/* harmony import */ var _hooks_useLoadingStates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../hooks/useLoadingStates */ "./src/hooks/useLoadingStates.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../providers/PipelinesContextProvider */ "./src/providers/PipelinesContextProvider.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
/* harmony import */ var _CustomField_CustomFieldsInModalWrap_CustomFieldsInModalWrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap */ "./src/components/CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");

















const EditPipelineModalContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  editPipeline,
  modalSaving
}, ref) => {
  const {
    state: {
      pipelineToEdit
    },
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_8__.ModalContext);
  const {
    fetchAndSetPipelineData,
    dispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_7__.ActivePipelineContext);
  const {
    pipelinesDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_9__.PipelinesContext);
  const {
    deletePipeline
  } = (0,_hooks_actions_usePipelineActions__WEBPACK_IMPORTED_MODULE_5__.usePipelineActions)();
  const [pipelineName, setPipelineName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [pipelineDescription, setPipelineDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const {
    loading1: isDeletingBoard,
    setLoading1: setIsDeletingBoard
  } = (0,_hooks_useLoadingStates__WEBPACK_IMPORTED_MODULE_6__.useLoadingStates)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (pipelineToEdit) {
      setPipelineName(pipelineToEdit.name);
      setPipelineDescription(pipelineToEdit.description || "");
    }
  }, [pipelineToEdit]);
  const savePipeline = () => {
    if (pipelineToEdit) {
      editPipeline(Object.assign(Object.assign({}, pipelineToEdit), {
        name: pipelineName,
        description: pipelineDescription
      }));
    }
  };
  const onDeletePipeline = () => {
    if (!pipelineToEdit) return;
    setIsDeletingBoard(true);
    deletePipeline(pipelineToEdit.id, (removedPipelineId, pipelineIdToLoad) => {
      modalDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_4__.CLOSE_PIPELINE_MODAL
      });
      setIsDeletingBoard(false);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board deleted", "quicktasker"));
      pipelinesDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_4__.PIPELINE_REMOVE_PIPELINE,
        payload: removedPipelineId
      });
      if (pipelineIdToLoad !== null) {
        pipelinesDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_4__.PIPELINE_SET_PRIMARY,
          payload: pipelineIdToLoad
        });
        fetchAndSetPipelineData(pipelineIdToLoad);
      } else {
        dispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_4__.PIPELINE_REMOVE_ACTIVE_PIPELINE
        });
      }
    });
  };
  const clearContent = () => {
    setPipelineName("");
    setPipelineDescription("");
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, () => ({
    clearContent
  }));
  if (!pipelineToEdit) return null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[1fr_auto]",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-r-gray-300 md:wpqt-pr-3",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "wpqt-mb-5 wpqt-grid wpqt-grid-cols-1 wpqt-gap-4 md:wpqt-grid-cols-[auto_1fr]",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTModal__WEBPACK_IMPORTED_MODULE_15__.WPQTModalFieldSet, {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_15__.WPQTModalField, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Name", "quicktasker"),
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_12__.WPQTInput, {
                isAutoFocus: true,
                value: pipelineName,
                onChange: newValue => setPipelineName(newValue)
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_15__.WPQTModalField, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Description", "quicktasker"),
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_13__.WPQTTextarea, {
                rowsCount: 3,
                value: pipelineDescription,
                onChange: newValue => setPipelineDescription(newValue)
              })
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomField_CustomFieldsInModalWrap_CustomFieldsInModalWrap__WEBPACK_IMPORTED_MODULE_14__.CustomFieldsInModalWrap, {
            entityId: pipelineToEdit.id,
            entityType: _types_custom_field__WEBPACK_IMPORTED_MODULE_10__.CustomFieldEntityType.Pipeline
          })]
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-flex wpqt-flex-col wpqt-gap-2",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_11__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_16__["default"], {
            className: "wpqt-icon-red wpqt-size-5"
          }),
          loading: isDeletingBoard,
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete board", "quicktasker"),
          onClick: onDeletePipeline
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_15__.WPQTModalFooter, {
      onSave: savePipeline,
      loading: modalSaving,
      saveBtnText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "quicktasker")
    })]
  });
});


/***/ }),

/***/ "./src/components/Modal/StageModal/StageModal.tsx":
/*!********************************************************!*\
  !*** ./src/components/Modal/StageModal/StageModal.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StageModal: () => (/* binding */ StageModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/useModal */ "./src/hooks/useModal.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");
/* harmony import */ var _StageModalContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./StageModalContent */ "./src/components/Modal/StageModal/StageModalContent.tsx");
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








function StageModal() {
  const {
    state: {
      stageModalOpen,
      targetPipelineId
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_5__.ModalContext);
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError
  } = (0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__.useModal)(_constants__WEBPACK_IMPORTED_MODULE_3__.CLOSE_STAGE_MODAL);
  const addStage = (stageName, stageDescription) => __awaiter(this, void 0, void 0, function* () {
    try {
      setModalSaving(true);
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.createNewStageRequest)(targetPipelineId, stageName, stageDescription);
      handleSuccess(_constants__WEBPACK_IMPORTED_MODULE_3__.PIPELINE_ADD_STAGE, Object.assign(Object.assign({}, response.data), {
        tasks: []
      }), _hooks_useModal__WEBPACK_IMPORTED_MODULE_4__.DispatchType.ACTIVE_PIPELINE);
    } catch (error) {
      handleError(error);
    }
  });
  const editStage = stage => __awaiter(this, void 0, void 0, function* () {
    try {
      setModalSaving(true);
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.editStageRequest)(stage);
      handleSuccess(_constants__WEBPACK_IMPORTED_MODULE_3__.PIPELINE_EDIT_STAGE, response.data, _hooks_useModal__WEBPACK_IMPORTED_MODULE_4__.DispatchType.ACTIVE_PIPELINE);
    } catch (error) {
      handleError(error);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModal, {
    modalOpen: stageModalOpen,
    closeModal: closeModal,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_StageModalContent__WEBPACK_IMPORTED_MODULE_7__.StageModalContent, {
      ref: modalContentRef,
      editStage: editStage,
      addStage: addStage,
      stageModalSaving: modalSaving,
      stageTaskModalSaving: setModalSaving
    })
  });
}


/***/ }),

/***/ "./src/components/Modal/StageModal/StageModalContent.tsx":
/*!***************************************************************!*\
  !*** ./src/components/Modal/StageModal/StageModalContent.tsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StageModalContent: () => (/* binding */ StageModalContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");







const StageModalContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  editStage,
  addStage,
  stageModalSaving
}, ref) => {
  const {
    state: {
      stageToEdit
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_3__.ModalContext);
  const [stageName, setStageName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [stageDescription, setStageDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const editingStage = !!stageToEdit;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stageToEdit) {
      setStageName(stageToEdit.name);
      setStageDescription(stageToEdit.description);
    }
  }, [stageToEdit]);
  const saveStage = () => {
    editingStage ? editStage(Object.assign(Object.assign({}, stageToEdit), {
      name: stageName,
      description: stageDescription
    })) : addStage(stageName, stageDescription);
  };
  const clearContent = () => {
    setStageName("");
    setStageDescription("");
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, () => ({
    clearContent
  }));
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModalTitle, {
      children: editingStage ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit Stage", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add Stage", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModalFieldSet, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModalField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Name", "quicktasker"),
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_4__.WPQTInput, {
          isAutoFocus: true,
          value: stageName,
          onChange: newValue => setStageName(newValue)
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModalField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Description", "quicktasker"),
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_5__.WPQTTextarea, {
          rowsCount: 3,
          value: stageDescription,
          onChange: newValue => setStageDescription(newValue)
        })
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModalFooter, {
      onSave: saveStage,
      loading: stageModalSaving,
      saveBtnText: editingStage ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add stage", "quicktasker")
    })]
  });
});


/***/ }),

/***/ "./src/components/Modal/TaskModal/TaskModal.tsx":
/*!******************************************************!*\
  !*** ./src/components/Modal/TaskModal/TaskModal.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskModal: () => (/* binding */ TaskModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/actions/useTaskActions */ "./src/hooks/actions/useTaskActions.ts");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hooks/useModal */ "./src/hooks/useModal.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");
/* harmony import */ var _TaskModalContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TaskModalContent */ "./src/components/Modal/TaskModal/TaskModalContent.tsx");
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









function TaskModal({
  editTaskCallback,
  deleteTaskCallback
}) {
  const {
    state: {
      taskModalOpen
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_6__.ModalContext);
  const {
    deleteTask
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_4__.useTaskActions)();
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError
  } = (0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_5__.useModal)(_constants__WEBPACK_IMPORTED_MODULE_3__.CLOSE_TASK_MODAL);
  const editTask = task => __awaiter(this, void 0, void 0, function* () {
    try {
      setModalSaving(true);
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.editTaskRequest)(task);
      handleSuccess(_constants__WEBPACK_IMPORTED_MODULE_3__.PIPELINE_EDIT_TASK, response.data, _hooks_useModal__WEBPACK_IMPORTED_MODULE_5__.DispatchType.ACTIVE_PIPELINE);
      if (editTaskCallback) {
        editTaskCallback(response.data);
      }
    } catch (error) {
      handleError(error);
    }
  });
  const onDeleteTask = task => __awaiter(this, void 0, void 0, function* () {
    deleteTask(task.id, () => {
      if (deleteTaskCallback) {
        deleteTaskCallback(task);
      }
    });
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_7__.WPQTModal, {
    modalOpen: taskModalOpen,
    closeModal: closeModal,
    size: "xl",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TaskModalContent__WEBPACK_IMPORTED_MODULE_8__.TaskModalContent, {
      ref: modalContentRef,
      editTask: editTask,
      deleteTask: onDeleteTask,
      taskModalSaving: modalSaving
    })
  });
}


/***/ }),

/***/ "./src/components/Modal/TaskModal/TaskModalContent.tsx":
/*!*************************************************************!*\
  !*** ./src/components/Modal/TaskModal/TaskModalContent.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskModalContent: () => (/* binding */ TaskModalContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArrowUturnUpIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArchiveBoxIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CheckBadgeIcon.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hooks/actions/useTaskActions */ "./src/hooks/actions/useTaskActions.ts");
/* harmony import */ var _hooks_useLoadingStates__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../hooks/useLoadingStates */ "./src/hooks/useLoadingStates.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../providers/ArchiveContextProvider */ "./src/providers/ArchiveContextProvider.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
/* harmony import */ var _common_Toggle_Toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../common/Toggle/Toggle */ "./src/components/common/Toggle/Toggle.tsx");
/* harmony import */ var _CustomField_CustomFieldsInModalWrap_CustomFieldsInModalWrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap */ "./src/components/CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap.tsx");
/* harmony import */ var _Dropdown_UserAssignementDropdown_UserAssignementDropdown__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../Dropdown/UserAssignementDropdown/UserAssignementDropdown */ "./src/components/Dropdown/UserAssignementDropdown/UserAssignementDropdown.tsx");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _Tab_CommentsAndLogs_TaskModalTabs_TaskModalTabs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../Tab/CommentsAndLogs/TaskModalTabs/TaskModalTabs */ "./src/components/Tab/CommentsAndLogs/TaskModalTabs/TaskModalTabs.tsx");
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





















const TaskModalContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  taskModalSaving,
  editTask,
  deleteTask
}, ref) => {
  const {
    state: {
      taskToEdit,
      taskModalSettings
    },
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_3__.ModalContext);
  const {
    state: {
      isUserAllowedToDelete
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_9__.AppContext);
  const {
    state: {
      activePipeline
    },
    fetchAndSetPipelineData
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__.ActivePipelineContext);
  const {
    archiveDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_10__.ArchiveContext);
  const [taskName, setTaskName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [taskDescription, setTaskDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [freeForAllTask, setFreeForAllTask] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    archiveTask,
    restoreArchivedTask
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_6__.useTaskActions)();
  const {
    loading1: isDeletingTask,
    setLoading1: setIsDeletingTask,
    loading2: archiveLoading,
    setLoading2: setArchiveLoading
  } = (0,_hooks_useLoadingStates__WEBPACK_IMPORTED_MODULE_7__.useLoadingStates)();
  const isTaskArchived = taskToEdit === null || taskToEdit === void 0 ? void 0 : taskToEdit.is_archived;
  const pipelineExists = (taskToEdit === null || taskToEdit === void 0 ? void 0 : taskToEdit.pipeline_name) !== null;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDescription(taskToEdit.description);
      setFreeForAllTask(taskToEdit.free_for_all);
    }
  }, [taskToEdit]);
  const saveTask = () => {
    if (taskToEdit) {
      editTask(Object.assign(Object.assign({}, taskToEdit), {
        name: taskName,
        description: taskDescription,
        free_for_all: freeForAllTask
      }));
    }
  };
  const clearContent = () => {
    setTaskName("");
    setTaskDescription("");
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, () => ({
    clearContent
  }));
  if (!taskToEdit) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[1fr_auto]",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-r-gray-300 md:wpqt-pr-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "wpqt-mb-5 wpqt-grid wpqt-grid-cols-1 wpqt-gap-4 md:wpqt-grid-cols-[auto_1fr]",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTModal__WEBPACK_IMPORTED_MODULE_4__.WPQTModalFieldSet, {
            children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_4__.WPQTModalField, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Name", "quicktasker"),
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_13__.WPQTInput, {
                isAutoFocus: true,
                value: taskName,
                onChange: newValue => setTaskName(newValue)
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_4__.WPQTModalField, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Description", "quicktasker"),
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_14__.WPQTTextarea, {
                rowsCount: 3,
                value: taskDescription,
                onChange: newValue => setTaskDescription(newValue)
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_4__.WPQTModalField, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Assigned users", "quicktasker"),
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Dropdown_UserAssignementDropdown_UserAssignementDropdown__WEBPACK_IMPORTED_MODULE_17__.UserAssignementDropdown, {
                task: taskToEdit,
                onUserAdd: user => {
                  modalDispatch({
                    type: _constants__WEBPACK_IMPORTED_MODULE_5__.ADD_ASSIGNED_USER_TO_EDITING_TASK,
                    payload: user
                  });
                },
                onUserDelete: user => {
                  modalDispatch({
                    type: _constants__WEBPACK_IMPORTED_MODULE_5__.REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
                    payload: user
                  });
                }
              })
            }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_4__.WPQTModalField, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Free for all task", "quicktasker"),
              tooltipId: `free-for-all-${taskToEdit.id}-tooltip`,
              tooltipText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("When enabled, all QuickTasker users have the ability to self-assign or unassign this task.", "quicktasker"),
              children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Toggle_Toggle__WEBPACK_IMPORTED_MODULE_15__.Toggle, {
                checked: freeForAllTask,
                handleChange: setFreeForAllTask
              })
            }), taskModalSettings.allowToMarkTaskAsDone && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TaskDoneStatus, {
              taskId: taskToEdit.id,
              isCompleted: taskToEdit.is_done
            })]
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomField_CustomFieldsInModalWrap_CustomFieldsInModalWrap__WEBPACK_IMPORTED_MODULE_16__.CustomFieldsInModalWrap, {
              entityId: taskToEdit.id,
              entityType: _types_custom_field__WEBPACK_IMPORTED_MODULE_11__.CustomFieldEntityType.Task
            })
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-mt-7 md:wpqt-pr-3",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Tab_CommentsAndLogs_TaskModalTabs_TaskModalTabs__WEBPACK_IMPORTED_MODULE_19__.TaskModalTabs, {
            task: taskToEdit
          })
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-flex wpqt-flex-col wpqt-gap-2",
        children: [isTaskArchived && pipelineExists && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_12__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_20__["default"], {
            className: "wpqt-icon-green wpqt-size-5"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Restore task", "quicktasker"),
          onClick: () => {
            restoreArchivedTask(taskToEdit.id, () => {
              modalDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_5__.CLOSE_TASK_MODAL
              });
              archiveDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_5__.REMOVE_ARCHIVED_TASK,
                payload: taskToEdit.id
              });
            });
          }
        }), !isTaskArchived && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_12__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_21__["default"], {
            className: "wpqt-icon-blue wpqt-size-5"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Archive task", "quicktasker"),
          loading: archiveLoading,
          onClick: () => {
            setArchiveLoading(true);
            archiveTask(taskToEdit.id, () => {
              modalDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_5__.CLOSE_TASK_MODAL
              });
              fetchAndSetPipelineData(activePipeline.id);
              setArchiveLoading(false);
            });
          }
        }), isUserAllowedToDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_12__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_22__["default"], {
            className: "wpqt-icon-red wpqt-size-5"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete task", "quicktasker"),
          loading: isDeletingTask,
          onClick: () => __awaiter(void 0, void 0, void 0, function* () {
            setIsDeletingTask(true);
            yield deleteTask(taskToEdit);
            modalDispatch({
              type: _constants__WEBPACK_IMPORTED_MODULE_5__.CLOSE_TASK_MODAL
            });
            setIsDeletingTask(false);
          })
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_4__.WPQTModalFooter, {
      onSave: saveTask,
      saveBtnText: taskModalSaving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Saving...", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "quicktasker")
    })]
  });
});
function TaskDoneStatus({
  isCompleted,
  taskId
}) {
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_3__.ModalContext);
  const {
    dispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__.ActivePipelineContext);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    changeTaskDoneStatus
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_6__.useTaskActions)();
  const toggleTaskDontStatus = () => __awaiter(this, void 0, void 0, function* () {
    setIsLoading(true);
    yield changeTaskDoneStatus(taskId, !isCompleted, isCompleted => {
      modalDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.PIPELINE_CHANGE_TASK_DONE_STATUS,
        payload: {
          done: isCompleted
        }
      });
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.PIPELINE_CHANGE_TASK_DONE_STATUS,
        payload: {
          taskId,
          done: isCompleted
        }
      });
    });
    setIsLoading(false);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_4__.WPQTModalField, {
    label: isCompleted ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task completed", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task not completed", "quicktasker"),
    children: isLoading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_18__.LoadingOval, {
      width: "24",
      height: "24"
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_23__["default"], {
      onClick: toggleTaskDontStatus,
      className: `wpqt-size-6 ${isCompleted ? "wpqt-icon-green" : "wpqt-text-gray-300"} wpqt-cursor-pointer`
    })
  });
}


/***/ }),

/***/ "./src/components/Modal/UserModal/UserModal.tsx":
/*!******************************************************!*\
  !*** ./src/components/Modal/UserModal/UserModal.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserModal: () => (/* binding */ UserModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/actions/useUserActions */ "./src/hooks/actions/useUserActions.ts");
/* harmony import */ var _hooks_useModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/useModal */ "./src/hooks/useModal.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");
/* harmony import */ var _UserModalContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UserModalContent */ "./src/components/Modal/UserModal/UserModalContent.tsx");
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








function UserModal() {
  const {
    state: {
      userModalOpen
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_5__.ModalContext);
  const {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess
  } = (0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_4__.useModal)(_constants__WEBPACK_IMPORTED_MODULE_2__.CLOSE_USER_MODAL);
  const {
    editUser
  } = (0,_hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_3__.useUserActions)();
  const onEditUser = user => __awaiter(this, void 0, void 0, function* () {
    setModalSaving(true);
    yield editUser(user, userData => {
      handleSuccess(_constants__WEBPACK_IMPORTED_MODULE_2__.EDIT_USER, userData, _hooks_useModal__WEBPACK_IMPORTED_MODULE_4__.DispatchType.USER);
    });
    setModalSaving(false);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModal, {
    modalOpen: userModalOpen,
    closeModal: closeModal,
    size: "xl",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserModalContent__WEBPACK_IMPORTED_MODULE_7__.UserModalContent, {
      ref: modalContentRef,
      modalSaving: modalSaving,
      editUser: onEditUser
    })
  });
}


/***/ }),

/***/ "./src/components/Modal/UserModal/UserModalContent.tsx":
/*!*************************************************************!*\
  !*** ./src/components/Modal/UserModal/UserModalContent.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserModalContent: () => (/* binding */ UserModalContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/RectangleStackIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/KeyIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PowerIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/actions/useUserActions */ "./src/hooks/actions/useUserActions.ts");
/* harmony import */ var _hooks_useLoadingStates__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hooks/useLoadingStates */ "./src/hooks/useLoadingStates.ts");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _common_Input_Input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
/* harmony import */ var _CustomField_CustomFieldsInModalWrap_CustomFieldsInModalWrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap */ "./src/components/CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap.tsx");
/* harmony import */ var _Tab_CommentsAndLogs_UserModalTabs_UserModalTabs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../Tab/CommentsAndLogs/UserModalTabs/UserModalTabs */ "./src/components/Tab/CommentsAndLogs/UserModalTabs/UserModalTabs.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");
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

















const UserModalContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function UserModalContent({
  modalSaving,
  editUser
}, ref) {
  const {
    state: {
      userToEdit
    },
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_7__.ModalContext);
  const {
    state: {
      isUserAllowedToDelete
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_6__.AppContext);
  const [userName, setUserName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [userDescription, setUserDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [isActiveUser, setIsActiveUser] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [hasPassword, setHasPassword] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    changeUserStatus,
    deleteUser,
    resetUserPassword
  } = (0,_hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_4__.useUserActions)();
  const {
    userDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_8__.UserContext);
  const {
    loading1: isResetPWLoading,
    setLoading1: setIsResetPWLoading,
    loading2: isActivateLoading,
    setLoading2: setIsActivateLoading,
    loading3: isDeleteLoading,
    setLoading3: setIsDeleteLoading
  } = (0,_hooks_useLoadingStates__WEBPACK_IMPORTED_MODULE_5__.useLoadingStates)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (userToEdit) {
      setUserName(userToEdit.name);
      setUserDescription(userToEdit.description);
      setIsActiveUser(userToEdit.is_active);
      setHasPassword(userToEdit.has_password);
    }
  }, [userToEdit]);
  const clearContent = () => {
    setUserName("");
    setUserDescription("");
  };
  const saveUser = () => {
    if (userToEdit) {
      editUser(Object.assign(Object.assign({}, userToEdit), {
        name: userName,
        description: userDescription
      }));
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useImperativeHandle)(ref, () => ({
    clearContent
  }));
  if (!userToEdit) return null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[1fr_auto]",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-r-gray-300 md:wpqt-pr-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "wpqt-grid wpqt-grid-cols-1 wpqt-gap-3 md:wpqt-grid-cols-[auto_1fr]",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_WPQTModal__WEBPACK_IMPORTED_MODULE_15__.WPQTModalFieldSet, {
              children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_15__.WPQTModalField, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Name", "quicktasker"),
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Input_Input__WEBPACK_IMPORTED_MODULE_11__.WPQTInput, {
                  isAutoFocus: true,
                  value: userName,
                  onChange: newValue => setUserName(newValue)
                })
              }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_15__.WPQTModalField, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Description", "quicktasker"),
                children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_12__.WPQTTextarea, {
                  rowsCount: 3,
                  value: userDescription,
                  onChange: newValue => setUserDescription(newValue)
                })
              })]
            })
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomField_CustomFieldsInModalWrap_CustomFieldsInModalWrap__WEBPACK_IMPORTED_MODULE_13__.CustomFieldsInModalWrap, {
            entityId: userToEdit.id,
            entityType: _types_custom_field__WEBPACK_IMPORTED_MODULE_9__.CustomFieldEntityType.User
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-mt-7",
          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Tab_CommentsAndLogs_UserModalTabs_UserModalTabs__WEBPACK_IMPORTED_MODULE_14__.UserModalTabs, {
            user: userToEdit
          })
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-flex wpqt-flex-col wpqt-gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_10__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_16__["default"], {
            className: "wpqt-icon-blue wpqt-size-4"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User details", "quicktasker"),
          onClick: () => {
            window.location.hash = `#/users/${userToEdit.id}`;
            modalDispatch({
              type: _constants__WEBPACK_IMPORTED_MODULE_3__.CLOSE_USER_MODAL
            });
          }
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_10__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_17__["default"], {
            className: "wpqt-icon-blue wpqt-size-5"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User tasks", "quicktasker"),
          onClick: () => {
            window.location.hash = `#/users/${userToEdit.id}/tasks`;
            modalDispatch({
              type: _constants__WEBPACK_IMPORTED_MODULE_3__.CLOSE_USER_MODAL
            });
          }
        }), hasPassword && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_10__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_18__["default"], {
            className: "wpqt-icon-red wpqt-size-5"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Reset password", "quicktasker"),
          loading: isResetPWLoading,
          onClick: () => __awaiter(this, void 0, void 0, function* () {
            setIsResetPWLoading(true);
            yield resetUserPassword(userToEdit.id, () => {
              userDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_3__.RESET_PASSWORD,
                payload: userToEdit.id
              });
              setHasPassword(false);
            });
            setIsResetPWLoading(false);
          })
        }), !isActiveUser && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_10__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_19__["default"], {
            className: "wpqt-icon-green wpqt-size-5"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Activate user", "quicktasker"),
          loading: isActivateLoading,
          onClick: () => __awaiter(this, void 0, void 0, function* () {
            setIsActivateLoading(true);
            yield changeUserStatus(userToEdit.id, true, userData => {
              userDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_3__.EDIT_USER,
                payload: Object.assign({}, userData)
              });
              setIsActiveUser(true);
            });
            setIsActivateLoading(false);
          })
        }), isActiveUser && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_10__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_19__["default"], {
            className: "wpqt-icon-red wpqt-size-5"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Disable user", "quicktasker"),
          loading: isActivateLoading,
          onClick: () => __awaiter(this, void 0, void 0, function* () {
            setIsActivateLoading(true);
            yield changeUserStatus(userToEdit.id, false, userData => {
              userDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_3__.EDIT_USER,
                payload: Object.assign({}, userData)
              });
              setIsActiveUser(false);
            });
            setIsActivateLoading(false);
          })
        }), isUserAllowedToDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_10__.WPQTIconButton, {
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_20__["default"], {
            className: "wpqt-icon-red wpqt-size-5"
          }),
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete user", "quicktasker"),
          loading: isDeleteLoading,
          onClick: () => __awaiter(this, void 0, void 0, function* () {
            setIsDeleteLoading(true);
            yield deleteUser(userToEdit.id, userId => {
              userDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_3__.DELETE_USER,
                payload: userId
              });
              modalDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_3__.CLOSE_USER_MODAL
              });
            });
            setIsDeleteLoading(false);
          })
        })]
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_15__.WPQTModalFooter, {
      onSave: saveUser,
      saveBtnText: modalSaving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Saving...", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "quicktasker")
    })]
  });
});


/***/ }),

/***/ "./src/components/Modal/UsersSettingsModal/UsersSettingsModal.tsx":
/*!************************************************************************!*\
  !*** ./src/components/Modal/UsersSettingsModal/UsersSettingsModal.tsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsersSettingsModal: () => (/* binding */ UsersSettingsModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _types_custom_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../types/custom-field */ "./src/types/custom-field.ts");
/* harmony import */ var _CustomField_CustomFieldsInModalWrap_CustomFieldsInModalWrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap */ "./src/components/CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap.tsx");
/* harmony import */ var _WPQTModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../WPQTModal */ "./src/components/Modal/WPQTModal.tsx");







function UsersSettingsModal() {
  const {
    state: {
      userSettingsModalOpen
    },
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_3__.ModalContext);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTModal__WEBPACK_IMPORTED_MODULE_6__.WPQTModal, {
    modalOpen: userSettingsModalOpen,
    closeModal: () => modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_2__.CHANGE_USER_SETTINGS_MODAL_OPEN,
      payload: false
    }),
    size: "lg",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CustomField_CustomFieldsInModalWrap_CustomFieldsInModalWrap__WEBPACK_IMPORTED_MODULE_5__.CustomFieldsInModalWrap, {
        entityId: "null",
        entityType: _types_custom_field__WEBPACK_IMPORTED_MODULE_4__.CustomFieldEntityType.Users
      })
    })
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
/* harmony import */ var react_icons_tfi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-icons/tfi */ "./node_modules/react-icons/tfi/index.mjs");
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
  children
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.DialogTitle, {
    as: "div",
    className: "wpqt-text-base/7 wpqt-font-medium wpqt-text-black",
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
    className: "wpqt-mt-4 wpqt-flex wpqt-justify-end",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__.WPQTIconButton, {
      text: saveBtnText,
      loading: loading,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_icons_tfi__WEBPACK_IMPORTED_MODULE_8__.TfiSave, {
        className: "wpqt-icon-blue wpqt-size-4"
      }),
      onClick: onSave
    })
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/CommentsAndLogsTabContent.tsx":
/*!**************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/CommentsAndLogsTabContent.tsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommentsAndLogsTabContent: () => (/* binding */ CommentsAndLogsTabContent),
/* harmony export */   TabContentCommentItem: () => (/* binding */ TabContentCommentItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ChatBubbleLeftIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArrowPathIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useTimezone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/useTimezone */ "./src/hooks/useTimezone.ts");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
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








function CommentsAndLogsTabContent({
  typeId,
  fetchData,
  renderItem,
  noDataMessage,
  explanation,
  onAdd = () => __awaiter(this, void 0, void 0, function* () {
    return undefined;
  }),
  enableAdd = false
}) {
  const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [newEntry, setNewEntry] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [loadingComments, setLoadingComments] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [addingEntry, setAddingEntry] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadData();
  }, [typeId]);
  const loadData = () => __awaiter(this, void 0, void 0, function* () {
    setLoadingComments(true);
    const data = yield fetchData();
    if (data) {
      setData(data);
    }
    setLoadingComments(false);
  });
  const addEntry = () => __awaiter(this, void 0, void 0, function* () {
    setAddingEntry(true);
    const entry = yield onAdd(newEntry);
    if (entry) {
      setData(prevData => prevData ? [...prevData, entry] : [entry]);
      setNewEntry("");
    }
    setAddingEntry(false);
  });
  if (data === null) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-flex wpqt-justify-center",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__.LoadingOval, {
        width: "30",
        height: "30"
      })
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [explanation && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-3 wpqt-text-center wpqt-font-semibold",
      children: explanation
    }), data.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-3 wpqt-text-center",
      children: noDataMessage
    }), data.length > 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-[28px] wpqt-mt-[56px] wpqt-logs-grid",
      children: data.map(item => renderItem(item))
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-3 wpqt-flex wpqt-justify-center",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CommentsRefresh, {
        isLoading: loadingComments,
        refreshComemnts: loadData
      })
    }), enableAdd && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-flex wpqt-justify-center",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-w-2/3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_6__.WPQTTextarea, {
          rowsCount: 3,
          value: newEntry,
          onChange: text => setNewEntry(text),
          className: "wpqt-mb-4 wpqt-w-full"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_common_Button_Button__WEBPACK_IMPORTED_MODULE_5__.WPQTIconButton, {
          text: "Add comment",
          loading: addingEntry,
          onClick: addEntry,
          className: "wpqt-float-right",
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
            className: "wpqt-icon-blue wpqt-size-5"
          })
        })]
      })
    })]
  });
}
function CommentsRefresh({
  isLoading,
  refreshComemnts
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: isLoading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__.LoadingOval, {
      width: "32",
      height: "32"
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: "wpqt-icon-blue wpqt-size-8 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover",
      onClick: refreshComemnts
    })
  });
}
function TabContentCommentItem({
  item
}) {
  const {
    convertToWPTimezone
  } = (0,_hooks_useTimezone__WEBPACK_IMPORTED_MODULE_3__.useTimezone)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-center wpqt-mb-1",
        children: item.author_name
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-center",
        children: item.is_admin_comment ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Admin", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("QuickTasker", "quicktasker")
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: item.text
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: convertToWPTimezone(item.created_at)
    })]
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/TaskModalTabs/LogsTabContent.tsx":
/*!*****************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/TaskModalTabs/LogsTabContent.tsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogsTabContent: () => (/* binding */ LogsTabContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../types/enums */ "./src/types/enums.tsx");
/* harmony import */ var _Log_LogItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Log/LogItem */ "./src/components/Log/LogItem.tsx");
/* harmony import */ var _CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CommentsAndLogsTabContent */ "./src/components/Tab/CommentsAndLogs/CommentsAndLogsTabContent.tsx");
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






function LogsTabContent({
  taskId
}) {
  const fetchLogs = () => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.getLogsRequest)(taskId, _types_enums__WEBPACK_IMPORTED_MODULE_3__.WPQTTypes.Task);
      return response.data;
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("Failed to get log");
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_5__.CommentsAndLogsTabContent, {
    typeId: taskId,
    fetchData: fetchLogs,
    renderItem: log => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Log_LogItem__WEBPACK_IMPORTED_MODULE_4__.LogItem, {
      log: log
    }),
    noDataMessage: "No logs available",
    explanation: "Logs can be seen only by WordPress users (with required permissions)"
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/TaskModalTabs/PrivateCommentsTabContent.tsx":
/*!****************************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/TaskModalTabs/PrivateCommentsTabContent.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommentsTabContent: () => (/* binding */ CommentsTabContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hooks/actions/useCommentActions */ "./src/hooks/actions/useCommentActions.ts");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../types/enums */ "./src/types/enums.tsx");
/* harmony import */ var _utils_comment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../utils/comment */ "./src/utils/comment.ts");
/* harmony import */ var _CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommentsAndLogsTabContent */ "./src/components/Tab/CommentsAndLogs/CommentsAndLogsTabContent.tsx");
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







function CommentsTabContent({
  taskId
}) {
  const {
    addComment
  } = (0,_hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_3__.useCommentActions)();
  const onAddComment = newEntry => __awaiter(this, void 0, void 0, function* () {
    const response = yield addComment(taskId, _types_enums__WEBPACK_IMPORTED_MODULE_4__.WPQTTypes.Task, true, newEntry);
    if (response) {
      return (0,_utils_comment__WEBPACK_IMPORTED_MODULE_5__.convertCommentFromServer)(response);
    }
  });
  const fetchPrivateComments = () => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.getComments)(taskId, _types_enums__WEBPACK_IMPORTED_MODULE_4__.WPQTTypes.Task, true);
      return response.data.map(_utils_comment__WEBPACK_IMPORTED_MODULE_5__.convertCommentFromServer);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("Failed to load comments");
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__.CommentsAndLogsTabContent, {
    typeId: taskId,
    fetchData: fetchPrivateComments,
    onAdd: onAddComment,
    renderItem: comment => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__.TabContentCommentItem, {
      item: comment
    }),
    noDataMessage: "No comments available",
    explanation: "Comments that can be added and viewed only by WordPress users (with required permissions).",
    enableAdd: true
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/TaskModalTabs/PublicCommentsTabContent.tsx":
/*!***************************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/TaskModalTabs/PublicCommentsTabContent.tsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PublicCommentsTabContent: () => (/* binding */ PublicCommentsTabContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hooks/actions/useCommentActions */ "./src/hooks/actions/useCommentActions.ts");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../types/enums */ "./src/types/enums.tsx");
/* harmony import */ var _utils_comment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../utils/comment */ "./src/utils/comment.ts");
/* harmony import */ var _CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommentsAndLogsTabContent */ "./src/components/Tab/CommentsAndLogs/CommentsAndLogsTabContent.tsx");
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







function PublicCommentsTabContent({
  taskId
}) {
  const {
    addComment
  } = (0,_hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_3__.useCommentActions)();
  const onAddComment = newEntry => __awaiter(this, void 0, void 0, function* () {
    const response = yield addComment(taskId, _types_enums__WEBPACK_IMPORTED_MODULE_4__.WPQTTypes.Task, false, newEntry);
    if (response) {
      return (0,_utils_comment__WEBPACK_IMPORTED_MODULE_5__.convertCommentFromServer)(response);
    }
  });
  const fetchComments = () => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.getComments)(taskId, _types_enums__WEBPACK_IMPORTED_MODULE_4__.WPQTTypes.Task, false);
      return response.data.map(_utils_comment__WEBPACK_IMPORTED_MODULE_5__.convertCommentFromServer);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error("Failed to load comments");
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__.CommentsAndLogsTabContent, {
    typeId: taskId,
    fetchData: fetchComments,
    onAdd: onAddComment,
    renderItem: comment => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__.TabContentCommentItem, {
      item: comment
    }),
    noDataMessage: "No comments available",
    explanation: "Comments that can be added and viewed by WordPress users (with required permissions) and QuickTasker users who have been assigned to the task.",
    enableAdd: true
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/TaskModalTabs/TaskModalTabs.tsx":
/*!****************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/TaskModalTabs/TaskModalTabs.tsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskModalTabs: () => (/* binding */ TaskModalTabs)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WPQTTabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../WPQTTabs */ "./src/components/Tab/WPQTTabs.tsx");
/* harmony import */ var _LogsTabContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LogsTabContent */ "./src/components/Tab/CommentsAndLogs/TaskModalTabs/LogsTabContent.tsx");
/* harmony import */ var _PrivateCommentsTabContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PrivateCommentsTabContent */ "./src/components/Tab/CommentsAndLogs/TaskModalTabs/PrivateCommentsTabContent.tsx");
/* harmony import */ var _PublicCommentsTabContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PublicCommentsTabContent */ "./src/components/Tab/CommentsAndLogs/TaskModalTabs/PublicCommentsTabContent.tsx");





function TaskModalTabs({
  task
}) {
  const tabs = ["Private comments", "Public comments", "Logs"];
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTTabs__WEBPACK_IMPORTED_MODULE_1__.WPQTTabs, {
    tabs: tabs,
    tabsContent: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PrivateCommentsTabContent__WEBPACK_IMPORTED_MODULE_3__.CommentsTabContent, {
      taskId: task.id
    }, 1), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublicCommentsTabContent__WEBPACK_IMPORTED_MODULE_4__.PublicCommentsTabContent, {
      taskId: task.id
    }, 2), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_LogsTabContent__WEBPACK_IMPORTED_MODULE_2__.LogsTabContent, {
      taskId: task.id
    }, 3)]
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/UserModalTabs/LogsTabContent.tsx":
/*!*****************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/UserModalTabs/LogsTabContent.tsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogsTabContent: () => (/* binding */ LogsTabContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../types/enums */ "./src/types/enums.tsx");
/* harmony import */ var _Log_LogItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Log/LogItem */ "./src/components/Log/LogItem.tsx");
/* harmony import */ var _CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommentsAndLogsTabContent */ "./src/components/Tab/CommentsAndLogs/CommentsAndLogsTabContent.tsx");
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







function LogsTabContent({
  userId
}) {
  const fetchLogs = () => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_3__.getLogsRequest)(userId, _types_enums__WEBPACK_IMPORTED_MODULE_4__.WPQTTypes.User);
      return response.data;
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to load log", "quicktasker"));
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__.CommentsAndLogsTabContent, {
    typeId: userId,
    fetchData: fetchLogs,
    renderItem: log => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Log_LogItem__WEBPACK_IMPORTED_MODULE_5__.LogItem, {
      log: log
    }),
    noDataMessage: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No logs available", "quicktasker"),
    explanation: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Logs can be seen only by WordPress users (with required permissions)", "quicktasker")
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/UserModalTabs/PrivateCommentsTabContent.tsx":
/*!****************************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/UserModalTabs/PrivateCommentsTabContent.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrivateCommentsTabContent: () => (/* binding */ PrivateCommentsTabContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../types/enums */ "./src/types/enums.tsx");
/* harmony import */ var _utils_comment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../utils/comment */ "./src/utils/comment.ts");
/* harmony import */ var _CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CommentsAndLogsTabContent */ "./src/components/Tab/CommentsAndLogs/CommentsAndLogsTabContent.tsx");
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







function PrivateCommentsTabContent({
  userId
}) {
  const addComment = newEntry => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_3__.addCommentRequest)(userId, _types_enums__WEBPACK_IMPORTED_MODULE_4__.WPQTTypes.User, true, newEntry);
      return (0,_utils_comment__WEBPACK_IMPORTED_MODULE_5__.convertCommentFromServer)(response.data);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to add private comment", "quicktasker"));
    }
  });
  const fetchPrivateComments = () => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_3__.getComments)(userId, _types_enums__WEBPACK_IMPORTED_MODULE_4__.WPQTTypes.User, true);
      return response.data.map(_utils_comment__WEBPACK_IMPORTED_MODULE_5__.convertCommentFromServer);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to load private comments", "quicktasker"));
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__.CommentsAndLogsTabContent, {
    typeId: userId,
    fetchData: fetchPrivateComments,
    onAdd: addComment,
    renderItem: comment => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_6__.TabContentCommentItem, {
      item: comment
    }),
    noDataMessage: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No comments available", "quicktasker"),
    explanation: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Comments that can be added and viewed only by WordPress users (with required permissions).", "quicktasker"),
    enableAdd: true
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/UserModalTabs/PublicCommentsTabContent.tsx":
/*!***************************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/UserModalTabs/PublicCommentsTabContent.tsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PublicCommentsTabContent: () => (/* binding */ PublicCommentsTabContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../hooks/actions/useCommentActions */ "./src/hooks/actions/useCommentActions.ts");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../types/enums */ "./src/types/enums.tsx");
/* harmony import */ var _utils_comment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utils/comment */ "./src/utils/comment.ts");
/* harmony import */ var _CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CommentsAndLogsTabContent */ "./src/components/Tab/CommentsAndLogs/CommentsAndLogsTabContent.tsx");
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








function PublicCommentsTabContent({
  userId
}) {
  const {
    addComment
  } = (0,_hooks_actions_useCommentActions__WEBPACK_IMPORTED_MODULE_4__.useCommentActions)();
  const onAddComment = newEntry => __awaiter(this, void 0, void 0, function* () {
    const connemntFromServer = yield addComment(userId, _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTTypes.User, false, newEntry);
    if (connemntFromServer) {
      return (0,_utils_comment__WEBPACK_IMPORTED_MODULE_6__.convertCommentFromServer)(connemntFromServer);
    }
  });
  const fetchComments = () => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_3__.getComments)(userId, _types_enums__WEBPACK_IMPORTED_MODULE_5__.WPQTTypes.User, false);
      return response.data.map(_utils_comment__WEBPACK_IMPORTED_MODULE_6__.convertCommentFromServer);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to load comments", "quicktasker"));
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_7__.CommentsAndLogsTabContent, {
    typeId: userId,
    fetchData: fetchComments,
    onAdd: onAddComment,
    renderItem: comment => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_CommentsAndLogsTabContent__WEBPACK_IMPORTED_MODULE_7__.TabContentCommentItem, {
      item: comment
    }),
    noDataMessage: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No comments available", "quicktasker"),
    explanation: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Comments that can be added and viewed by WordPress users (with required permissions) and current QuickTasker user (in user page).", "quicktasker"),
    enableAdd: true
  });
}


/***/ }),

/***/ "./src/components/Tab/CommentsAndLogs/UserModalTabs/UserModalTabs.tsx":
/*!****************************************************************************!*\
  !*** ./src/components/Tab/CommentsAndLogs/UserModalTabs/UserModalTabs.tsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserModalTabs: () => (/* binding */ UserModalTabs)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WPQTTabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../WPQTTabs */ "./src/components/Tab/WPQTTabs.tsx");
/* harmony import */ var _LogsTabContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LogsTabContent */ "./src/components/Tab/CommentsAndLogs/UserModalTabs/LogsTabContent.tsx");
/* harmony import */ var _PrivateCommentsTabContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PrivateCommentsTabContent */ "./src/components/Tab/CommentsAndLogs/UserModalTabs/PrivateCommentsTabContent.tsx");
/* harmony import */ var _PublicCommentsTabContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PublicCommentsTabContent */ "./src/components/Tab/CommentsAndLogs/UserModalTabs/PublicCommentsTabContent.tsx");






function UserModalTabs({
  user
}) {
  const tabs = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Private comments", "quicktasker"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Public comments", "quicktasker"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Logs", "quicktasker")];
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTTabs__WEBPACK_IMPORTED_MODULE_2__.WPQTTabs, {
    tabs: tabs,
    tabsContent: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PrivateCommentsTabContent__WEBPACK_IMPORTED_MODULE_4__.PrivateCommentsTabContent, {
      userId: user.id
    }, 1), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PublicCommentsTabContent__WEBPACK_IMPORTED_MODULE_5__.PublicCommentsTabContent, {
      userId: user.id
    }, 2), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_LogsTabContent__WEBPACK_IMPORTED_MODULE_3__.LogsTabContent, {
      userId: user.id
    }, 3)]
  });
}


/***/ }),

/***/ "./src/components/Tab/WPQTTabs.tsx":
/*!*****************************************!*\
  !*** ./src/components/Tab/WPQTTabs.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTTabs: () => (/* binding */ WPQTTabs)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/tabs/tabs.js");


function WPQTTabs({
  tabs,
  tabsContent,
  tabClassName = "",
  tabListClassName = ""
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.TabGroup, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.TabList, {
      className: `wpqt-mb-6 wpqt-flex wpqt-border-0 wpqt-border-b wpqt-border-solid wpqt-border-b-gray-300 ${tabListClassName}`,
      children: tabs.map(tab => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(WPQTTab, {
        className: tabClassName,
        children: tab
      }, tab))
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.TabPanels, {
      children: tabsContent.map((tabContent, index) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(WPQTTabPanel, {
        children: tabContent
      }, index))
    })]
  });
}
function WPQTTab({
  children,
  className
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Tab, {
    as: "div",
    className: `wpqt-flex-1 wpqt-cursor-pointer wpqt-p-1 wpqt-pb-[10px] wpqt-text-center wpqt-text-lg data-[selected]:wpqt-border-b-2 data-[selected]:wpqt-border-l-0 data-[selected]:wpqt-border-r-0 data-[selected]:wpqt-border-t-0 data-[selected]:wpqt-border-solid data-[selected]:wpqt-border-b-blue-500 ${className}`,
    children: children
  });
}
function WPQTTabPanel({
  children
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    children: children
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
    className: "wpqt-bg-red-600",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      children: "Tooltip content"
    })
  });
}


/***/ }),

/***/ "./src/components/User/UserAssignementSelection/UserAssignementSelection.tsx":
/*!***********************************************************************************!*\
  !*** ./src/components/User/UserAssignementSelection/UserAssignementSelection.tsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserAssignementSelection: () => (/* binding */ UserAssignementSelection)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/MinusIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PlusIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
/* harmony import */ var _Loading_Loading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Loading/Loading */ "./src/components/Loading/Loading.tsx");
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










function UserAssignementSelection({
  task,
  onUserAdd,
  onUserDelete
}) {
  const {
    state: {
      users
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_7__.UserContext);
  const {
    dispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_6__.ActivePipelineContext);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const availableUsers = users.filter(user => {
    var _a;
    return !((_a = task.assigned_users) !== null && _a !== void 0 ? _a : []).some(assignedUser => assignedUser.id === user.id);
  });
  const assignUser = user => __awaiter(this, void 0, void 0, function* () {
    try {
      setLoading(true);
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.assignTaskToUserRequest)(user.id, task.id);
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.PIPELINE_ADD_USER_TO_TASK,
        payload: {
          taskId: task.id,
          user
        }
      });
      onUserAdd(user);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to assign user", "quicktasker"));
    } finally {
      setLoading(false);
    }
  });
  const removeUser = user => __awaiter(this, void 0, void 0, function* () {
    try {
      setLoading(true);
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.removeTaskFromUserRequest)(user.id, task.id);
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.PIPELINE_REMOVE_USER_FROM_TASK,
        payload: {
          taskId: task.id,
          userId: user.id
        }
      });
      onUserDelete(user);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to remove user", "quicktasker"));
    } finally {
      setLoading(false);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-w-[320px] wpqt-flex-col",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserAssignementSection, {
      sectionTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Assigned users", "quicktasker"),
      users: task.assigned_users,
      onItemSelect: removeUser,
      ActionIcon: _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"],
      actionIconClasses: "wpqt-icon-red",
      noUsersText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No users assigned", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserAssignementSection, {
      sectionTitle: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Assign a user", "quicktasker"),
      users: availableUsers,
      onItemSelect: assignUser,
      actionIconClasses: "wpqt-icon-green",
      noUsersText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No users available to assign", "quicktasker")
    }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-flex wpqt-justify-center",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_8__.LoadingOval, {
        width: "30",
        height: "30"
      })
    })]
  });
}
function UserAssignementSection({
  sectionTitle,
  onItemSelect = () => {},
  users = [],
  ActionIcon = _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"],
  actionIconClasses,
  noUsersText
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-mb-2",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-mb-2 wpqt-text-lg",
      children: sectionTitle
    }), users.map(user => {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        onClick: e => {
          e.stopPropagation();
          onItemSelect(user);
        },
        className: "wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-px-2 wpqt-py-1 hover:wpqt-bg-gray-100",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "wpqt-flex wpqt-flex-col",
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            children: user.name
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
            className: "wpqt-italic",
            children: user.description
          })]
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ActionIcon, {
          className: `wpqt-ml-auto wpqt-size-5 ${actionIconClasses}`
        })]
      }, user.id);
    }), users.length === 0 && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: noUsersText
    })]
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
/* harmony export */   ButtonType: () => (/* binding */ ButtonType),
/* harmony export */   WPQTButton: () => (/* binding */ WPQTButton),
/* harmony export */   WPQTIconButton: () => (/* binding */ WPQTIconButton)
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
function WPQTButton({
  onClick = () => {},
  btnText,
  className,
  type = ButtonType.BUTTON
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: `wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-whitespace-nowrap wpqt-rounded-lg wpqt-border wpqt-border-transparent wpqt-bg-blue-500 wpqt-px-3 wpqt-py-1 wpqt-text-sm/6 wpqt-text-white wpqt-transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:wpqt-outline-none focus:wpqt-ring-4 focus:wpqt-ring-blue-800 enabled:hover:wpqt-bg-blue-600 ${className}`,
    onClick: onClick,
    type: type,
    children: btnText
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
    children: [icon, text && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: `wpqt-whitespace-nowrap ${loading ? "wpqt-invisible" : ""}`,
      children: text
    }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__.LoadingOval, {
      width: "20",
      height: "20",
      className: "wpqt-absolute wpqt-top-1/2 wpqt-left-1/2 wpqt-transform-y-center wpqt-transform-x-center"
    }), showTooltip && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Tooltip_WPQTTooltip__WEBPACK_IMPORTED_MODULE_2__.WPQTTooltip, {
      id: tooltipId
    })]
  }));
}


/***/ }),

/***/ "./src/components/common/Header/Header.tsx":
/*!*************************************************!*\
  !*** ./src/components/common/Header/Header.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTPageHeader: () => (/* binding */ WPQTPageHeader)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function WPQTPageHeader({
  children,
  description = null,
  icon = null
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-mb-6 wpqt-inline-grid wpqt-grid-cols-[auto_auto] wpqt-items-center wpqt-gap-2",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
        children: [children, icon && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
          className: "wpqt-ml-1 wpqt-align-middle",
          children: icon
        })]
      }), description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: description
      })]
    })
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
  loading = false
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
      type: type
    }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Loading_Loading__WEBPACK_IMPORTED_MODULE_2__.LoadingOval, {
      width: "24",
      height: "24",
      className: "wpqt-absolute wpqt-right-[-32px] wpqt-top-1/2 wpqt-transform-y-center"
    })]
  });
});


/***/ }),

/***/ "./src/components/common/Select/PipelineFilterSelect/PipelineFilterSelect.tsx":
/*!************************************************************************************!*\
  !*** ./src/components/common/Select/PipelineFilterSelect/PipelineFilterSelect.tsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineFilterSelect: () => (/* binding */ PipelineFilterSelect)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../providers/PipelinesContextProvider */ "./src/providers/PipelinesContextProvider.tsx");
/* harmony import */ var _WPQTSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../WPQTSelect */ "./src/components/common/Select/WPQTSelect.tsx");




function PipelineFilterSelect({
  selectedOptionValue,
  selectionChange,
  extraOptions = []
}) {
  const {
    state: {
      pipelines
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_2__.PipelinesContext);
  const pipelineOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => pipelines.map(pipeline => ({
    value: pipeline.id,
    label: pipeline.name
  })), [pipelines]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_WPQTSelect__WEBPACK_IMPORTED_MODULE_3__.WPQTSelect, {
    options: [...pipelineOptions, ...extraOptions],
    selectedOptionValue: selectedOptionValue,
    onSelectionChange: selectionChange
  });
}


/***/ }),

/***/ "./src/components/common/Select/WPQTSelect.tsx":
/*!*****************************************************!*\
  !*** ./src/components/common/Select/WPQTSelect.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTSelect: () => (/* binding */ WPQTSelect)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/select/select.js");


function WPQTSelect({
  options,
  selectedOptionValue,
  onSelectionChange,
  allSelector = true,
  className = ""
}) {
  const handleChange = event => {
    const selectedValue = event.target.value;
    onSelectionChange(selectedValue);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_1__.Select, {
    value: selectedOptionValue,
    onChange: handleChange,
    className: `!wpqt-rounded-lg !wpqt-border !wpqt-border-solid !wpqt-border-qtBorder !wpqt-px-2 !wpqt-pr-6 !wpqt-py-1 focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`,
    children: [allSelector && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
      value: "",
      children: "All boards"
    }), options.map(option => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
      value: option.value,
      children: option.label
    }, option.value))]
  });
}


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
  className
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_2__.Textarea, {
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__.clsx)("wpqt-border-1 wpqt-mb-3 wpqt-block wpqt-resize-none wpqt-rounded-lg wpqt-border-qtBorder wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6", `focus:wpqt-shadow-none focus:wpqt-outline-none data-[focus]:wpqt-outline-2 data-[focus]:wpqt--outline-offset-2 data-[focus]:wpqt-outline-gray-300 ${className}`),
    rows: rowsCount,
    value: value,
    onChange: e => onChange(e.target.value)
  });
}


/***/ }),

/***/ "./src/components/common/Toggle/Toggle.tsx":
/*!*************************************************!*\
  !*** ./src/components/common/Toggle/Toggle.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toggle: () => (/* binding */ Toggle)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_switch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-switch */ "./node_modules/react-switch/dist/index.dev.mjs");


function Toggle({
  checked,
  handleChange
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_switch__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onChange: handleChange,
    checked: checked,
    uncheckedIcon: false,
    checkedIcon: false,
    height: 20,
    width: 44
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
/* harmony export */   ADD_USER: () => (/* binding */ ADD_USER),
/* harmony export */   CHANGE_ARCHIVED_TASK_DONE_STATUS: () => (/* binding */ CHANGE_ARCHIVED_TASK_DONE_STATUS),
/* harmony export */   CHANGE_ARCHIVE_TASK_DONE_FILTER: () => (/* binding */ CHANGE_ARCHIVE_TASK_DONE_FILTER),
/* harmony export */   CHANGE_TASK_DONE_STATUS: () => (/* binding */ CHANGE_TASK_DONE_STATUS),
/* harmony export */   CHANGE_USER_SESSION_STATUS: () => (/* binding */ CHANGE_USER_SESSION_STATUS),
/* harmony export */   CHANGE_USER_SETTINGS_MODAL_OPEN: () => (/* binding */ CHANGE_USER_SETTINGS_MODAL_OPEN),
/* harmony export */   CHANGE_USER_STATUS: () => (/* binding */ CHANGE_USER_STATUS),
/* harmony export */   CHANGE_USER_TASK_DONE_STATUS: () => (/* binding */ CHANGE_USER_TASK_DONE_STATUS),
/* harmony export */   CLOSE_ARCHIVE_TASK_MODAL: () => (/* binding */ CLOSE_ARCHIVE_TASK_MODAL),
/* harmony export */   CLOSE_EDIT_TASK_MODAL: () => (/* binding */ CLOSE_EDIT_TASK_MODAL),
/* harmony export */   CLOSE_NEW_TASK_MODAL: () => (/* binding */ CLOSE_NEW_TASK_MODAL),
/* harmony export */   CLOSE_PIPELINE_MODAL: () => (/* binding */ CLOSE_PIPELINE_MODAL),
/* harmony export */   CLOSE_STAGE_MODAL: () => (/* binding */ CLOSE_STAGE_MODAL),
/* harmony export */   CLOSE_TASK_MODAL: () => (/* binding */ CLOSE_TASK_MODAL),
/* harmony export */   CLOSE_USER_MODAL: () => (/* binding */ CLOSE_USER_MODAL),
/* harmony export */   DELETE_CUSTOM_FIELD: () => (/* binding */ DELETE_CUSTOM_FIELD),
/* harmony export */   DELETE_USER: () => (/* binding */ DELETE_USER),
/* harmony export */   DELETE_USER_SESSION: () => (/* binding */ DELETE_USER_SESSION),
/* harmony export */   EDIT_ARCHIVED_TASK: () => (/* binding */ EDIT_ARCHIVED_TASK),
/* harmony export */   EDIT_CUSTOM_FIELD: () => (/* binding */ EDIT_CUSTOM_FIELD),
/* harmony export */   EDIT_USER: () => (/* binding */ EDIT_USER),
/* harmony export */   EDIT_USER_TASK: () => (/* binding */ EDIT_USER_TASK),
/* harmony export */   INIT_APP_STATE: () => (/* binding */ INIT_APP_STATE),
/* harmony export */   OPEN_ARCHIVE_TASK_MODAL: () => (/* binding */ OPEN_ARCHIVE_TASK_MODAL),
/* harmony export */   OPEN_EDIT_PIPELINE_MODAL: () => (/* binding */ OPEN_EDIT_PIPELINE_MODAL),
/* harmony export */   OPEN_EDIT_TASK_MODAL: () => (/* binding */ OPEN_EDIT_TASK_MODAL),
/* harmony export */   OPEN_EDIT_USER_MODAL: () => (/* binding */ OPEN_EDIT_USER_MODAL),
/* harmony export */   OPEN_NEW_PIPELINE_MODAL: () => (/* binding */ OPEN_NEW_PIPELINE_MODAL),
/* harmony export */   OPEN_NEW_STAGE_MODAL: () => (/* binding */ OPEN_NEW_STAGE_MODAL),
/* harmony export */   OPEN_NEW_TASK_MODAL: () => (/* binding */ OPEN_NEW_TASK_MODAL),
/* harmony export */   OPEN_NEW_USER_MODAL: () => (/* binding */ OPEN_NEW_USER_MODAL),
/* harmony export */   OPEN_STAGE_EDIT_MODAL: () => (/* binding */ OPEN_STAGE_EDIT_MODAL),
/* harmony export */   PIPELINES_SET: () => (/* binding */ PIPELINES_SET),
/* harmony export */   PIPELINE_ADD_EXISTING_PIPELINE: () => (/* binding */ PIPELINE_ADD_EXISTING_PIPELINE),
/* harmony export */   PIPELINE_ADD_PIPELINE: () => (/* binding */ PIPELINE_ADD_PIPELINE),
/* harmony export */   PIPELINE_ADD_STAGE: () => (/* binding */ PIPELINE_ADD_STAGE),
/* harmony export */   PIPELINE_ADD_TASK: () => (/* binding */ PIPELINE_ADD_TASK),
/* harmony export */   PIPELINE_ADD_USER_TO_TASK: () => (/* binding */ PIPELINE_ADD_USER_TO_TASK),
/* harmony export */   PIPELINE_CHANGE_TASK_DONE_STATUS: () => (/* binding */ PIPELINE_CHANGE_TASK_DONE_STATUS),
/* harmony export */   PIPELINE_DELETE_STAGE: () => (/* binding */ PIPELINE_DELETE_STAGE),
/* harmony export */   PIPELINE_EDIT_PIPELINE: () => (/* binding */ PIPELINE_EDIT_PIPELINE),
/* harmony export */   PIPELINE_EDIT_STAGE: () => (/* binding */ PIPELINE_EDIT_STAGE),
/* harmony export */   PIPELINE_EDIT_TASK: () => (/* binding */ PIPELINE_EDIT_TASK),
/* harmony export */   PIPELINE_MOVE_STAGE: () => (/* binding */ PIPELINE_MOVE_STAGE),
/* harmony export */   PIPELINE_MOVE_TASK: () => (/* binding */ PIPELINE_MOVE_TASK),
/* harmony export */   PIPELINE_REMOVE_ACTIVE_PIPELINE: () => (/* binding */ PIPELINE_REMOVE_ACTIVE_PIPELINE),
/* harmony export */   PIPELINE_REMOVE_PIPELINE: () => (/* binding */ PIPELINE_REMOVE_PIPELINE),
/* harmony export */   PIPELINE_REMOVE_USER_FROM_TASK: () => (/* binding */ PIPELINE_REMOVE_USER_FROM_TASK),
/* harmony export */   PIPELINE_REORDER_TASK: () => (/* binding */ PIPELINE_REORDER_TASK),
/* harmony export */   PIPELINE_SET_EXISTING_PIPELINES: () => (/* binding */ PIPELINE_SET_EXISTING_PIPELINES),
/* harmony export */   PIPELINE_SET_LOADING: () => (/* binding */ PIPELINE_SET_LOADING),
/* harmony export */   PIPELINE_SET_PIPELINE: () => (/* binding */ PIPELINE_SET_PIPELINE),
/* harmony export */   PIPELINE_SET_PRIMARY: () => (/* binding */ PIPELINE_SET_PRIMARY),
/* harmony export */   PIPELINE_SET_PRIMARY2: () => (/* binding */ PIPELINE_SET_PRIMARY2),
/* harmony export */   REFETCH_ACTIVE_PIPELINE_INTERVAL: () => (/* binding */ REFETCH_ACTIVE_PIPELINE_INTERVAL),
/* harmony export */   REMOVE_ARCHIVED_TASK: () => (/* binding */ REMOVE_ARCHIVED_TASK),
/* harmony export */   REMOVE_ASSIGNED_USER_FROM_EDITING_TASK: () => (/* binding */ REMOVE_ASSIGNED_USER_FROM_EDITING_TASK),
/* harmony export */   REMOVE_ASSIGNED_USER_FROM_USER_TASK: () => (/* binding */ REMOVE_ASSIGNED_USER_FROM_USER_TASK),
/* harmony export */   REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK: () => (/* binding */ REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK),
/* harmony export */   REMOVE_USER_TASK: () => (/* binding */ REMOVE_USER_TASK),
/* harmony export */   RESET_PASSWORD: () => (/* binding */ RESET_PASSWORD),
/* harmony export */   SET_ARCHIVE_FILTERED_PIPELINE: () => (/* binding */ SET_ARCHIVE_FILTERED_PIPELINE),
/* harmony export */   SET_ARCHIVE_SEARCH_VALUE: () => (/* binding */ SET_ARCHIVE_SEARCH_VALUE),
/* harmony export */   SET_ARCHIVE_TASKS: () => (/* binding */ SET_ARCHIVE_TASKS),
/* harmony export */   SET_CUSTOM_FIELDS: () => (/* binding */ SET_CUSTOM_FIELDS),
/* harmony export */   SET_CUSTOM_FIELDS_LOCATION: () => (/* binding */ SET_CUSTOM_FIELDS_LOCATION),
/* harmony export */   SET_CUSTOM_FIELD_INITIAL_DATA: () => (/* binding */ SET_CUSTOM_FIELD_INITIAL_DATA),
/* harmony export */   SET_CUSTOM_FIELD_LOADING: () => (/* binding */ SET_CUSTOM_FIELD_LOADING),
/* harmony export */   SET_CUSTOM_USER_PAGE_STYLES: () => (/* binding */ SET_CUSTOM_USER_PAGE_STYLES),
/* harmony export */   SET_FULL_PAGE_LOADING: () => (/* binding */ SET_FULL_PAGE_LOADING),
/* harmony export */   SET_SITE_URL: () => (/* binding */ SET_SITE_URL),
/* harmony export */   SET_USERS: () => (/* binding */ SET_USERS),
/* harmony export */   SET_USERS_SEARCH_VALUE: () => (/* binding */ SET_USERS_SEARCH_VALUE),
/* harmony export */   SET_USER_SESSIONS: () => (/* binding */ SET_USER_SESSIONS),
/* harmony export */   SET_USER_SESSIONS_SEARCH_VALUE: () => (/* binding */ SET_USER_SESSIONS_SEARCH_VALUE),
/* harmony export */   SET_USER_TASKS: () => (/* binding */ SET_USER_TASKS),
/* harmony export */   SET_USER_TASKS_FILTERED_PIPELINE: () => (/* binding */ SET_USER_TASKS_FILTERED_PIPELINE),
/* harmony export */   SET_USER_TASKS_SEARCH_VALUE: () => (/* binding */ SET_USER_TASKS_SEARCH_VALUE),
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
//Archive reducer constants
const SET_ARCHIVE_TASKS = "SET_ARCHIVE_TASKS";
const OPEN_ARCHIVE_TASK_MODAL = "OPEN_ARCHIVE_TASK_MODAL";
const CLOSE_ARCHIVE_TASK_MODAL = "CLOSE_ARCHIVE_TASK_MODAL";
const SET_ARCHIVE_SEARCH_VALUE = "SET_ARCHIVE_SEARCH_VALUE";
const SET_ARCHIVE_FILTERED_PIPELINE = "SET_ARCHIVE_FILTERED_PIPELINE";
const REMOVE_ARCHIVED_TASK = "REMOVE_ARCHIVED_TASK";
const ADD_ASSIGNED_USER_TO_ARCHIVED_TASK = "ADD_ASSIGNED_USER_TO_ARCHIVED_TASK";
const REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK = "REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK";
const CHANGE_ARCHIVED_TASK_DONE_STATUS = "CHANGE_ARCHIVED_TASK_DONE_STATUS";
const EDIT_ARCHIVED_TASK = "EDIT_ARCHIVED_TASK";
const CHANGE_ARCHIVE_TASK_DONE_FILTER = "CHANGE_ARCHIVE_TASK_DONE_FILTER";
//User reducer constants
const SET_USERS = "SET_USERS";
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
//Timers
const REFETCH_ACTIVE_PIPELINE_INTERVAL = 30000;
//Misc
const WP_QUICKTASKER_INVALID_SESSION_TOKEN = "Invalid session token";


/***/ }),

/***/ "./src/hooks/actions/useCommentActions.ts":
/*!************************************************!*\
  !*** ./src/hooks/actions/useCommentActions.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCommentActions: () => (/* binding */ useCommentActions)
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



function useCommentActions() {
  const addComment = (typeId, type, isPrivate, commentText) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.addCommentRequest)(typeId, type, isPrivate, commentText);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comment added", "quicktasker"));
      return response.data;
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to add comment", "quicktasker"));
    }
  });
  return {
    addComment
  };
}


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
  const updateCustomFieldValue = (customFieldId, value, entityId, entityType, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.updateCustomFieldValueRequest)(customFieldId, value, entityId, entityType);
      if (callback) callback();
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to update custom field value", "quicktasker"));
    }
  });
  return {
    addCustomField,
    markCustomFieldAsDeleted,
    updateCustomFieldValue
  };
}


/***/ }),

/***/ "./src/hooks/actions/usePipelineActions.ts":
/*!*************************************************!*\
  !*** ./src/hooks/actions/usePipelineActions.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePipelineActions: () => (/* binding */ usePipelineActions)
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



function usePipelineActions() {
  const deletePipeline = (pipelineId, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.deletePipelineRequest)(pipelineId);
      if (callback) callback(response.data.deletedPipelineId, response.data.pipelineIdToLoad);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to delete board", "quicktasker"));
    }
  });
  return {
    deletePipeline
  };
}


/***/ }),

/***/ "./src/hooks/actions/useSettingActions.ts":
/*!************************************************!*\
  !*** ./src/hooks/actions/useSettingActions.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSettingActions: () => (/* binding */ useSettingActions)
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



function useSettingActions() {
  const saveCustomUserPageStyles = (styles, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.saveUserPageCustomStylesRequest)(styles);
      if (callback) callback(response.data);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom user page styles saved successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to save custom user page styles", "quicktasker"));
    }
  });
  const saveTaskCompletionDoneSetting = (pipelineId, checked, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.saveTaskCompletionDoneSettingRequest)(pipelineId, checked);
      if (callback) callback(checked);
    } catch (error) {
      if (callback) callback(!checked);
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to save setting", "quicktasker"));
    }
  });
  return {
    saveCustomUserPageStyles,
    saveTaskCompletionDoneSetting
  };
}


/***/ }),

/***/ "./src/hooks/actions/useTaskActions.ts":
/*!*********************************************!*\
  !*** ./src/hooks/actions/useTaskActions.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTaskActions: () => (/* binding */ useTaskActions)
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



const useTaskActions = () => {
  const deleteTask = (taskId, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.deleteTaskRequest)(taskId);
      if (callback) callback();
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task deleted", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to delete a task", "quicktasker"));
    }
  });
  const archiveTask = (taskId, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.archiveTaskRequest)(taskId);
      if (callback) callback();
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task archived", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to archive a task", "quicktasker"));
    }
  });
  const restoreArchivedTask = (taskId, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.restoreArchivedTaskRequest)(taskId);
      if (callback) callback();
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task restored", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to restore a task", "quicktasker"));
    }
  });
  const removeTaskFromUser = (userId, taskId, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.removeTaskFromUserRequest)(userId, taskId);
      if (callback) callback();
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task has been unassigned", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task unassignment failed. Try again", "quicktasker"));
    }
  });
  const changeTaskDoneStatus = (taskId, isCompleted, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const successMessage = isCompleted ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task marked as completed", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Task marked as incomplete", "quicktasker");
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.markTaskDoneRequest)(taskId, isCompleted);
      if (callback) callback(isCompleted);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success(successMessage);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to change task status", "quicktasker"));
    }
  });
  return {
    deleteTask,
    archiveTask,
    restoreArchivedTask,
    removeTaskFromUser,
    changeTaskDoneStatus
  };
};


/***/ }),

/***/ "./src/hooks/actions/useUserActions.ts":
/*!*********************************************!*\
  !*** ./src/hooks/actions/useUserActions.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useUserActions: () => (/* binding */ useUserActions)
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



function useUserActions() {
  const createUser = (userName, userDescription, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.createUserRequest)(userName, userDescription);
      if (callback) callback(response.data);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("User created successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("User creation failed. Please try again", "quicktasker"));
    }
  });
  const editUser = (user, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.editUserRequest)(user);
      if (callback) callback(response.data);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("User edited successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("User edit failed. Please try again", "quicktasker"));
    }
  });
  const changeUserStatus = (userId, status, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.changeUserStatusRequest)(userId, status);
      if (callback) callback(response.data);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("User status changed successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to change user status. Please try again", "quicktasker"));
    }
  });
  const deleteUser = (userId, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.deleteUserRequest)(userId);
      if (callback) callback(userId);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("User deleted successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to delete user. Please try again", "quicktasker"));
    }
  });
  const resetUserPassword = (userId, callback) => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.resetUserPasswordRequest)(userId);
      if (callback) callback(userId);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("User password reset successfully", "quicktasker"));
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Failed to reset user password. Please try again", "quicktasker"));
    }
  });
  return {
    createUser,
    editUser,
    changeUserStatus,
    deleteUser,
    resetUserPassword
  };
}


/***/ }),

/***/ "./src/hooks/filters/useArchiveFilter.tsx":
/*!************************************************!*\
  !*** ./src/hooks/filters/useArchiveFilter.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useArchiveFilter: () => (/* binding */ useArchiveFilter)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/ArchiveContextProvider */ "./src/providers/ArchiveContextProvider.tsx");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types/enums */ "./src/types/enums.tsx");



const useArchiveFilter = () => {
  const {
    state: {
      archiveSearchValue,
      archiveFilteredPipelineId,
      archiveTaskDoneFilter
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_1__.ArchiveContext);
  const filterArchive = archivedTask => {
    const matchesSearchValue = archivedTask.name.toLowerCase().includes(archiveSearchValue.toLowerCase()) || archivedTask.description && archivedTask.description.toLowerCase().includes(archiveSearchValue.toLowerCase());
    const matchesPipelineId = !archiveFilteredPipelineId || (archiveFilteredPipelineId === "DELETED" ? archivedTask.pipeline_name === null : archivedTask.pipeline_id === archiveFilteredPipelineId);
    const matchesTaskDoneFilter = archiveTaskDoneFilter === _types_enums__WEBPACK_IMPORTED_MODULE_2__.WPQTArchiveDoneFilter.All || archiveTaskDoneFilter === _types_enums__WEBPACK_IMPORTED_MODULE_2__.WPQTArchiveDoneFilter.Completed && archivedTask.is_done || archiveTaskDoneFilter === _types_enums__WEBPACK_IMPORTED_MODULE_2__.WPQTArchiveDoneFilter.NotCompleted && !archivedTask.is_done;
    return matchesSearchValue && matchesPipelineId && matchesTaskDoneFilter;
  };
  return {
    filterArchive
  };
};


/***/ }),

/***/ "./src/hooks/filters/useUserFilter.tsx":
/*!*********************************************!*\
  !*** ./src/hooks/filters/useUserFilter.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useUserFilter: () => (/* binding */ useUserFilter)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");


const useUserFilter = () => {
  const {
    state: {
      usersSearchValue
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_1__.UserContext);
  const filterUsers = user => {
    const matchesSearchValue = user.name.toLowerCase().includes(usersSearchValue.toLowerCase()) || user.description && user.description.toLowerCase().includes(usersSearchValue.toLowerCase());
    return matchesSearchValue;
  };
  return {
    filterUsers
  };
};


/***/ }),

/***/ "./src/hooks/filters/useUserSessionsFilter.tsx":
/*!*****************************************************!*\
  !*** ./src/hooks/filters/useUserSessionsFilter.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useUserSessionsFilter: () => (/* binding */ useUserSessionsFilter)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/UserSessionsContextProvider */ "./src/providers/UserSessionsContextProvider.tsx");


const useUserSessionsFilter = () => {
  const {
    state: {
      sessionsSearchValue
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_1__.UserSessionsContext);
  const filterSessions = userSession => {
    const matchesSearchValue = userSession.user_name.toLowerCase().includes(sessionsSearchValue.toLowerCase()) || userSession.user_description && userSession.user_description.toLowerCase().includes(sessionsSearchValue.toLowerCase());
    return matchesSearchValue;
  };
  return {
    filterSessions
  };
};


/***/ }),

/***/ "./src/hooks/filters/useUserTasksFilter.tsx":
/*!**************************************************!*\
  !*** ./src/hooks/filters/useUserTasksFilter.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useUserTasksFilter: () => (/* binding */ useUserTasksFilter)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers_UserTasksContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../providers/UserTasksContextProvider */ "./src/providers/UserTasksContextProvider.tsx");


const useUserTasksFilter = () => {
  const {
    state: {
      searchValue,
      filteredPipelineId
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_UserTasksContextProvider__WEBPACK_IMPORTED_MODULE_1__.UserTasksContext);
  const filterTasks = task => {
    const matchesSearchValue = task.name && task.name.toLowerCase().includes(searchValue.toLowerCase()) || task.description && task.description.toLowerCase().includes(searchValue.toLowerCase());
    const matchesPipelineId = !filteredPipelineId || task.pipeline_id === filteredPipelineId;
    return matchesSearchValue && matchesPipelineId;
  };
  return {
    filterTasks
  };
};


/***/ }),

/***/ "./src/hooks/useCurrentPage.tsx":
/*!**************************************!*\
  !*** ./src/hooks/useCurrentPage.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCurrentPage: () => (/* binding */ useCurrentPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_ArchivePage_ArchivePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/ArchivePage/ArchivePage */ "./src/pages/ArchivePage/ArchivePage.tsx");
/* harmony import */ var _pages_GuidePage_GuidePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/GuidePage/GuidePage */ "./src/pages/GuidePage/GuidePage.tsx");
/* harmony import */ var _pages_LogsPage_LogsPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/LogsPage/LogsPage */ "./src/pages/LogsPage/LogsPage.tsx");
/* harmony import */ var _pages_OverviewPage_OverviewPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pages/OverviewPage/OverviewPage */ "./src/pages/OverviewPage/OverviewPage.tsx");
/* harmony import */ var _pages_PipelinePage_PipelinePage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pages/PipelinePage/PipelinePage */ "./src/pages/PipelinePage/PipelinePage.tsx");
/* harmony import */ var _pages_SettingsPage_SettingsPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pages/SettingsPage/SettingsPage */ "./src/pages/SettingsPage/SettingsPage.tsx");
/* harmony import */ var _pages_UserPage_UserPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pages/UserPage/UserPage */ "./src/pages/UserPage/UserPage.tsx");
/* harmony import */ var _pages_UserSessionsPage_UserSessionsPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../pages/UserSessionsPage/UserSessionsPage */ "./src/pages/UserSessionsPage/UserSessionsPage.tsx");
/* harmony import */ var _pages_UsersPage_UsersPage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../pages/UsersPage/UsersPage */ "./src/pages/UsersPage/UsersPage.tsx");
/* harmony import */ var _pages_UserTasksPage_UserTasksPage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../pages/UserTasksPage/UserTasksPage */ "./src/pages/UserTasksPage/UserTasksPage.tsx");












const useCurrentPage = () => {
  const [currentPage, setCurrentPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(getPageFromUrl());
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleUrlChange = () => {
      setCurrentPage(getPageFromUrl());
      setSubMenuItemActive();
    };
    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);
  return currentPage;
};
const getPageFromUrl = () => {
  const {
    page,
    hash
  } = getUrlParams();
  if (page === "wp-quick-tasks") {
    const userTasksMatch = hash.match(/^#\/users\/(\d+)\/tasks$/);
    if (userTasksMatch) {
      const userId = userTasksMatch[1];
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_UserTasksPage_UserTasksPage__WEBPACK_IMPORTED_MODULE_11__.UserTasksPage, {
        userId: userId
      });
    }
    const userMatch = hash.match(/^#\/users\/(\d+)$/);
    if (userMatch) {
      const userId = userMatch[1];
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_UserPage_UserPage__WEBPACK_IMPORTED_MODULE_8__.UserPage, {
        userId: userId
      });
    }
    switch (hash) {
      case "#/users":
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_UsersPage_UsersPage__WEBPACK_IMPORTED_MODULE_10__.UsersPage, {});
      case "#/overview":
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_OverviewPage_OverviewPage__WEBPACK_IMPORTED_MODULE_5__.OverviewPage, {});
      case "#/archive":
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_ArchivePage_ArchivePage__WEBPACK_IMPORTED_MODULE_2__.ArchivePage, {});
      case "#/user-sessions":
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_UserSessionsPage_UserSessionsPage__WEBPACK_IMPORTED_MODULE_9__.UserSessionsPage, {});
      case "#/logs":
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_LogsPage_LogsPage__WEBPACK_IMPORTED_MODULE_4__.LogsPage, {});
      case "#/settings":
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_SettingsPage_SettingsPage__WEBPACK_IMPORTED_MODULE_7__.SettingsPage, {});
      case "#/guide":
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_GuidePage_GuidePage__WEBPACK_IMPORTED_MODULE_3__.GuidePage, {});
      default:
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_pages_PipelinePage_PipelinePage__WEBPACK_IMPORTED_MODULE_6__.PipelinePage, {});
    }
  }
};
const setSubMenuItemActive = () => {
  const {
    page,
    hash
  } = getUrlParams();
  if (page !== "wp-quick-tasks") {
    return;
  }
  const submenuItems = document.querySelectorAll("#toplevel_page_wp-quick-tasks .wp-submenu li");
  submenuItems.forEach(item => item.classList.remove("wpqt-current"));
  const hashMap = {
    "#/users": "#/users",
    "#/overview": "#/overview",
    "#/archive": "#/archive",
    "#/user-sessions": "#/user-sessions",
    "#/logs": "#/logs",
    "#/settings": "#/settings",
    "#/guide": "#/guide",
    default: ""
  };
  let targetHash = hashMap.default;
  if (hashMap[hash] !== undefined) {
    targetHash = hashMap[hash];
  } else if (/^#\/users(\/\d+)?(\/tasks)?$/.test(hash)) {
    targetHash = "#/users";
  }
  submenuItems.forEach(item => {
    const link = item.querySelector("a");
    if (link && link.getAttribute("href") && link.getAttribute("href") === `admin.php?page=wp-quick-tasks${targetHash}`) {
      item.classList.add("wpqt-current");
    }
  });
};
const getUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page");
  const hash = window.location.hash;
  return {
    page,
    hash
  };
};


/***/ }),

/***/ "./src/hooks/useLoadingStates.ts":
/*!***************************************!*\
  !*** ./src/hooks/useLoadingStates.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLoadingStates: () => (/* binding */ useLoadingStates)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function useLoadingStates() {
  const [loading1, setLoading1] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [loading2, setLoading2] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [loading3, setLoading3] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return {
    loading1,
    loading2,
    setLoading1,
    setLoading2,
    loading3,
    setLoading3
  };
}


/***/ }),

/***/ "./src/hooks/useModal.tsx":
/*!********************************!*\
  !*** ./src/hooks/useModal.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DispatchType: () => (/* binding */ DispatchType),
/* harmony export */   useModal: () => (/* binding */ useModal)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../providers/PipelinesContextProvider */ "./src/providers/PipelinesContextProvider.tsx");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */





var DispatchType;
(function (DispatchType) {
  DispatchType["ACTIVE_PIPELINE"] = "ACTIVE_PIPELINE";
  DispatchType["PIPELINES"] = "PIPELINES";
  DispatchType["USER"] = "USER";
})(DispatchType || (DispatchType = {}));
const useModal = closeActionType => {
  const [modalSaving, setModalSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const modalContentRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_2__.ModalContext);
  const {
    dispatch: activePipelineDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_1__.ActivePipelineContext);
  const {
    pipelinesDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_3__.PipelinesContext);
  const {
    userDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserContext);
  const closeModal = () => {
    modalDispatch({
      type: closeActionType
    });
    clearModalContent();
  };
  const clearModalContent = () => {
    if (modalContentRef.current) {
      modalContentRef.current.clearContent();
    }
  };
  const handleSuccess = (type, payload, dispatchType) => {
    let dispatchFunction;
    switch (dispatchType) {
      case DispatchType.PIPELINES:
        {
          dispatchFunction = pipelinesDispatch;
          break;
        }
      case DispatchType.ACTIVE_PIPELINE:
        {
          dispatchFunction = activePipelineDispatch;
          break;
        }
      case DispatchType.USER:
        {
          dispatchFunction = userDispatch;
          break;
        }
      default:
        dispatchFunction = activePipelineDispatch;
        break;
    }
    setModalSaving(false);
    dispatchFunction({
      type,
      payload
    });
    closeModal();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = error => {
    setModalSaving(false);
    console.error(error);
  };
  return {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError
  };
};


/***/ }),

/***/ "./src/hooks/usePageLinks.tsx":
/*!************************************!*\
  !*** ./src/hooks/usePageLinks.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePageLinks: () => (/* binding */ usePageLinks)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");


function usePageLinks() {
  const {
    state: {
      siteURL,
      publicUserPageId
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_1__.AppContext);
  const userPage = siteURL + `/wpqt?page=${publicUserPageId}&page_id=wpqt`;
  return {
    userPage
  };
}


/***/ }),

/***/ "./src/hooks/useTimezone.ts":
/*!**********************************!*\
  !*** ./src/hooks/useTimezone.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTimezone: () => (/* binding */ useTimezone)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _utils_timezone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/timezone */ "./src/utils/timezone.ts");



const useTimezone = () => {
  const {
    state: {
      timezone
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_1__.AppContext);
  const convertToWPTimezone = utcDateTime => {
    return (0,_utils_timezone__WEBPACK_IMPORTED_MODULE_2__.convertToTimezone)(utcDateTime, timezone);
  };
  return {
    convertToWPTimezone
  };
};


/***/ }),

/***/ "./src/pages/ArchivePage/ArchivePage.tsx":
/*!***********************************************!*\
  !*** ./src/pages/ArchivePage/ArchivePage.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchivePage: () => (/* binding */ ArchivePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/ArchiveContextProvider */ "./src/providers/ArchiveContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _Archive_Archive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Archive/Archive */ "./src/pages/ArchivePage/Archive/Archive.tsx");






function ArchivePage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_3__.ArchiveContextProvider, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.Page, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__.WPQTPageHeader, {
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Archived tasks management page.", "quicktasker"),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Archive", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Archive_Archive__WEBPACK_IMPORTED_MODULE_5__.Archive, {})]
    })
  });
}


/***/ }),

/***/ "./src/pages/ArchivePage/Archive/Archive.tsx":
/*!***************************************************!*\
  !*** ./src/pages/ArchivePage/Archive/Archive.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Archive: () => (/* binding */ Archive)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Filter_ArchiveFilter_ArchiveFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Filter/ArchiveFilter/ArchiveFilter */ "./src/components/Filter/ArchiveFilter/ArchiveFilter.tsx");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _components_Modal_TaskModal_TaskModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Modal/TaskModal/TaskModal */ "./src/components/Modal/TaskModal/TaskModal.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../providers/ArchiveContextProvider */ "./src/providers/ArchiveContextProvider.tsx");
/* harmony import */ var _ArchiveItems_ArchiveItems__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ArchiveItems/ArchiveItems */ "./src/pages/ArchivePage/Archive/ArchiveItems/ArchiveItems.tsx");








function Archive() {
  const {
    state: {
      archivedTasks
    },
    archiveDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_6__.ArchiveContext);
  if (!archivedTasks) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__.Loading, {
      className: "wpqt-h-[200px]"
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_ArchiveFilter_ArchiveFilter__WEBPACK_IMPORTED_MODULE_2__.ArchiveFilter, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ArchiveItems_ArchiveItems__WEBPACK_IMPORTED_MODULE_7__.ArchiveItems, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Modal_TaskModal_TaskModal__WEBPACK_IMPORTED_MODULE_4__.TaskModal, {
      editTaskCallback: task => {
        archiveDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_5__.EDIT_ARCHIVED_TASK,
          payload: task
        });
      },
      deleteTaskCallback: task => {
        archiveDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_5__.REMOVE_ARCHIVED_TASK,
          payload: task.id
        });
      }
    })]
  });
}


/***/ }),

/***/ "./src/pages/ArchivePage/Archive/ArchiveItem/ArchiveItem.tsx":
/*!*******************************************************************!*\
  !*** ./src/pages/ArchivePage/Archive/ArchiveItem/ArchiveItem.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveItem: () => (/* binding */ ArchiveItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ViewColumnsIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Card_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Card/Card */ "./src/components/Card/Card.tsx");
/* harmony import */ var _components_Card_TaskCardActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Card/TaskCardActions */ "./src/components/Card/TaskCardActions.tsx");
/* harmony import */ var _components_Dropdown_ArchivedTaskDropdown_ArchivedTaskDropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown */ "./src/components/Dropdown/ArchivedTaskDropdown/ArchivedTaskDropdown.tsx");
/* harmony import */ var _components_Dropdown_UserAssignementDropdown_UserAssignementDropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown */ "./src/components/Dropdown/UserAssignementDropdown/UserAssignementDropdown.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../providers/ArchiveContextProvider */ "./src/providers/ArchiveContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");











function ArchiveItem({
  task
}) {
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_9__.ModalContext);
  const {
    archiveDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_8__.ArchiveContext);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCard, {
    title: task.name,
    description: task.description,
    dropdown: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_ArchivedTaskDropdown_ArchivedTaskDropdown__WEBPACK_IMPORTED_MODULE_5__.ArchivedTaskDropdown, {
      task: task
    }),
    className: "wpqt-cursor-pointer",
    onClick: () => {
      modalDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_7__.OPEN_EDIT_TASK_MODAL,
        payload: {
          taskToEdit: task
        }
      });
    },
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCardDataItem, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board", "quicktasker"),
      value: task.pipeline_name ? task.pipeline_name : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Board is deleted!", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: "wpqt-size-5 wpqt-icon-blue"
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_UserAssignementDropdown_UserAssignementDropdown__WEBPACK_IMPORTED_MODULE_6__.UserAssignementDropdown, {
      menuBtnClasses: "wpqt-self-start",
      task: task,
      onUserAdd: user => {
        archiveDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_7__.ADD_ASSIGNED_USER_TO_ARCHIVED_TASK,
          payload: {
            taskId: task.id,
            user
          }
        });
      },
      onUserDelete: user => {
        archiveDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_7__.REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK,
          payload: {
            taskId: task.id,
            user
          }
        });
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_TaskCardActions__WEBPACK_IMPORTED_MODULE_4__.TaskCardActions, {
      task: task,
      onDoneStatusChange: (taskId, done) => {
        archiveDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_7__.CHANGE_ARCHIVED_TASK_DONE_STATUS,
          payload: {
            taskId,
            done
          }
        });
      }
    })]
  });
}


/***/ }),

/***/ "./src/pages/ArchivePage/Archive/ArchiveItems/ArchiveItems.tsx":
/*!*********************************************************************!*\
  !*** ./src/pages/ArchivePage/Archive/ArchiveItems/ArchiveItems.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveItems: () => (/* binding */ ArchiveItems)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Filter/NoFilterResults/NoFilterResults */ "./src/components/Filter/NoFilterResults/NoFilterResults.tsx");
/* harmony import */ var _hooks_filters_useArchiveFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../hooks/filters/useArchiveFilter */ "./src/hooks/filters/useArchiveFilter.tsx");
/* harmony import */ var _providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../providers/ArchiveContextProvider */ "./src/providers/ArchiveContextProvider.tsx");
/* harmony import */ var _ArchiveItem_ArchiveItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ArchiveItem/ArchiveItem */ "./src/pages/ArchivePage/Archive/ArchiveItem/ArchiveItem.tsx");







function ArchiveItems() {
  var _a;
  const {
    state: {
      archivedTasks = []
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ArchiveContextProvider__WEBPACK_IMPORTED_MODULE_5__.ArchiveContext);
  const {
    filterArchive
  } = (0,_hooks_filters_useArchiveFilter__WEBPACK_IMPORTED_MODULE_4__.useArchiveFilter)();
  const filteredArchiveItems = (_a = archivedTasks === null || archivedTasks === void 0 ? void 0 : archivedTasks.filter(filterArchive)) !== null && _a !== void 0 ? _a : [];
  if (archivedTasks && archivedTasks.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_3__.NoFilterResults, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No tasks archived", "quicktasker")
    });
  }
  if (filteredArchiveItems && filteredArchiveItems.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_3__.NoFilterResults, {});
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-card-grid",
      children: filteredArchiveItems.map(task => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ArchiveItem_ArchiveItem__WEBPACK_IMPORTED_MODULE_6__.ArchiveItem, {
        task: task
      }, task.id))
    })
  });
}


/***/ }),

/***/ "./src/pages/GuidePage/GuidePage.tsx":
/*!*******************************************!*\
  !*** ./src/pages/GuidePage/GuidePage.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GuidePage: () => (/* binding */ GuidePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");






const GuidePage = () => {
  const {
    state: {
      pluginURL
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_4__.AppContext);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_5__.Page, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_3__.WPQTPageHeader, {
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Reading material about QuickTasker features and usage.", "quicktasker"),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Guide", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
        target: "_blank",
        rel: "noreferrer",
        href: pluginURL + "help/index.html",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("View Guide", "quicktasker")
      })
    })]
  });
};


/***/ }),

/***/ "./src/pages/LogsPage/LogsPage.tsx":
/*!*****************************************!*\
  !*** ./src/pages/LogsPage/LogsPage.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogsPage: () => (/* binding */ LogsPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/LogsPageContent/LogsPageContent */ "./src/pages/LogsPage/components/LogsPageContent/LogsPageContent.tsx");





const LogsPage = () => {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_3__.Page, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__.WPQTPageHeader, {
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("The logs page where you can see all logs and filter them.", "quicktasker"),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Logs", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_LogsPageContent_LogsPageContent__WEBPACK_IMPORTED_MODULE_4__.LogsPageContent, {})]
  });
};


/***/ }),

/***/ "./src/pages/LogsPage/components/LogsPageContent/LogsPageContent.tsx":
/*!***************************************************************************!*\
  !*** ./src/pages/LogsPage/components/LogsPageContent/LogsPageContent.tsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogCreatedByEnum: () => (/* binding */ LogCreatedByEnum),
/* harmony export */   LogNumberEnum: () => (/* binding */ LogNumberEnum),
/* harmony export */   LogOrderEnum: () => (/* binding */ LogOrderEnum),
/* harmony export */   LogTypeEnum: () => (/* binding */ LogTypeEnum),
/* harmony export */   LogsPageContent: () => (/* binding */ LogsPageContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _components_Filter_LogsFilter_LogsFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Filter/LogsFilter/LogsFilter */ "./src/components/Filter/LogsFilter/LogsFilter.tsx");
/* harmony import */ var _Logs_Logs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Logs/Logs */ "./src/pages/LogsPage/components/Logs/Logs.tsx");
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






var LogTypeEnum;
(function (LogTypeEnum) {
  LogTypeEnum["Pipeline"] = "pipeline";
  LogTypeEnum["Stage"] = "stage";
  LogTypeEnum["Task"] = "task";
  LogTypeEnum["All"] = "all";
})(LogTypeEnum || (LogTypeEnum = {}));
var LogCreatedByEnum;
(function (LogCreatedByEnum) {
  LogCreatedByEnum["Admin"] = "admin";
  LogCreatedByEnum["Quicktasker"] = "quicktasker_user";
  LogCreatedByEnum["All"] = "all";
})(LogCreatedByEnum || (LogCreatedByEnum = {}));
var LogOrderEnum;
(function (LogOrderEnum) {
  LogOrderEnum["Asc"] = "asc";
  LogOrderEnum["Desc"] = "desc";
})(LogOrderEnum || (LogOrderEnum = {}));
var LogNumberEnum;
(function (LogNumberEnum) {
  LogNumberEnum["Hundred"] = "100";
  LogNumberEnum["TwoHundred"] = "200";
  LogNumberEnum["FiveHundred"] = "500";
  LogNumberEnum["All"] = "all";
})(LogNumberEnum || (LogNumberEnum = {}));
const LogsPageContent = () => {
  const [logs, setLogs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [filterSettings, setFilterSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    numberOfLogs: LogNumberEnum.Hundred,
    type: LogTypeEnum.All,
    typeId: "",
    createdBy: LogCreatedByEnum.All,
    order: LogOrderEnum.Desc
  });
  const [loadingLogs, setLoadingLogs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [shouldFetchLogs, setShouldFetchLogs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (shouldFetchLogs) {
      fetchLogs();
      setShouldFetchLogs(false);
    }
  }, [filterSettings, shouldFetchLogs]);
  const fetchLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      setLoadingLogs(true);
      const filter = Object.assign({}, filterSettings);
      if (filter.numberOfLogs === LogNumberEnum.All) {
        delete filter.numberOfLogs;
      }
      if (filter.type === LogTypeEnum.All) {
        delete filter.type;
      }
      if (filter.typeId === "") {
        delete filter.typeId;
      }
      if (filter.createdBy === LogCreatedByEnum.All) {
        delete filter.createdBy;
      }
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_3__.getGlobalLogsRequest)(filter);
      setLogs(response.data);
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.error("Failed to fetch logs");
    } finally {
      setLoadingLogs(false);
    }
  });
  const applyFilter = appliedFilterSettings => __awaiter(void 0, void 0, void 0, function* () {
    setFilterSettings(appliedFilterSettings);
    setShouldFetchLogs(true);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_LogsFilter_LogsFilter__WEBPACK_IMPORTED_MODULE_4__.LogsFilter, {
      filterSettings: filterSettings,
      setFilterSettings: applyFilter
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Logs_Logs__WEBPACK_IMPORTED_MODULE_5__.Logs, {
      logs: logs,
      loading: loadingLogs
    })]
  });
};


/***/ }),

/***/ "./src/pages/LogsPage/components/Logs/Logs.tsx":
/*!*****************************************************!*\
  !*** ./src/pages/LogsPage/components/Logs/Logs.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logs: () => (/* binding */ Logs)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _components_Log_LogItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Log/LogItem */ "./src/components/Log/LogItem.tsx");



const Logs = ({
  logs,
  loading
}) => {
  if (loading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_1__.Loading, {
      ovalSize: "64",
      className: "wpqt-mt-12"
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-logs-grid",
    children: logs.map(log => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Log_LogItem__WEBPACK_IMPORTED_MODULE_2__.LogItem, {
      log: log
    }, log.id))
  });
};


/***/ }),

/***/ "./src/pages/OverviewPage/OverviewPage.tsx":
/*!*************************************************!*\
  !*** ./src/pages/OverviewPage/OverviewPage.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OverviewPage: () => (/* binding */ OverviewPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _components_Tab_WPQTTabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Tab/WPQTTabs */ "./src/components/Tab/WPQTTabs.tsx");
/* harmony import */ var _providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../providers/PipelinesContextProvider */ "./src/providers/PipelinesContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _components_PipelineOverview_PipelineOverview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/PipelineOverview/PipelineOverview */ "./src/pages/OverviewPage/components/PipelineOverview/PipelineOverview.tsx");








function OverviewPage() {
  const {
    state: {
      pipelines
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_5__.PipelinesContext);
  const pipelineNames = pipelines.map(pipeline => pipeline.name);
  const tabContent = pipelines.map(pipeline => {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_PipelineOverview_PipelineOverview__WEBPACK_IMPORTED_MODULE_7__.PipelineOverview, {
      pipeline: pipeline
    }, pipeline.id);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_6__.Page, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_3__.WPQTPageHeader, {
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("This is the overview page.", "quicktasker"),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Overview", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Tab_WPQTTabs__WEBPACK_IMPORTED_MODULE_4__.WPQTTabs, {
      tabs: pipelineNames,
      tabsContent: tabContent,
      tabListClassName: "wpqt-gap-5",
      tabClassName: "wpqt-flex-none"
    })]
  });
}


/***/ }),

/***/ "./src/pages/OverviewPage/components/ArchivedTaskChart/ArchivedTaskChart.tsx":
/*!***********************************************************************************!*\
  !*** ./src/pages/OverviewPage/components/ArchivedTaskChart/ArchivedTaskChart.tsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArhivedTaskChart: () => (/* binding */ ArhivedTaskChart)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-google-charts */ "./node_modules/react-google-charts/dist/index.js");
/* harmony import */ var _utils_statistics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/statistics */ "./src/utils/statistics.ts");
/* harmony import */ var _NotEnoughData_NotEnoughData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NotEnoughData/NotEnoughData */ "./src/pages/OverviewPage/components/NotEnoughData/NotEnoughData.tsx");





function ArhivedTaskChart({
  pipelineOverviewData,
  options,
  width
}) {
  var _a, _b;
  const archivedPieChartData = [["Archived tasks", "Task Count"], ["Archived tasks", parseInt((_a = pipelineOverviewData === null || pipelineOverviewData === void 0 ? void 0 : pipelineOverviewData.archivedTasksCount) !== null && _a !== void 0 ? _a : "0") || 0], ["Not archived tasks", parseInt((_b = pipelineOverviewData === null || pipelineOverviewData === void 0 ? void 0 : pipelineOverviewData.notArchivedTasksCount) !== null && _b !== void 0 ? _b : "0") || 0]];
  const hasEnoughData = (0,_utils_statistics__WEBPACK_IMPORTED_MODULE_2__.hasEnoughDataCheck)(archivedPieChartData);
  if (!hasEnoughData) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_NotEnoughData_NotEnoughData__WEBPACK_IMPORTED_MODULE_3__.NotEnoughData, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Not enough data to display archived tasks chart", "quicktasker")
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_google_charts__WEBPACK_IMPORTED_MODULE_4__.Chart, {
    chartType: "PieChart",
    data: archivedPieChartData,
    options: Object.assign(Object.assign({}, options), {
      title: "Archived tasks"
    }),
    width: width,
    height: "400px"
  });
}


/***/ }),

/***/ "./src/pages/OverviewPage/components/NotEnoughData/NotEnoughData.tsx":
/*!***************************************************************************!*\
  !*** ./src/pages/OverviewPage/components/NotEnoughData/NotEnoughData.tsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotEnoughData: () => (/* binding */ NotEnoughData)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function NotEnoughData({
  text
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-flex wpqt-justify-center wpqt-items-center wpqt-h-[400px] wpqt-w-[500px] wpqt-font-semibold",
    children: text
  });
}


/***/ }),

/***/ "./src/pages/OverviewPage/components/PipelineOverviewToolBar/PipelineOverviewToolBar.tsx":
/*!***********************************************************************************************!*\
  !*** ./src/pages/OverviewPage/components/PipelineOverviewToolBar/PipelineOverviewToolBar.tsx ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineOverviewToolBar: () => (/* binding */ PipelineOverviewToolBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_date_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-date-picker */ "./node_modules/react-date-picker/dist/esm/index.js");
/* harmony import */ var _components_Filter_WPQTFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Filter/WPQTFilter */ "./src/components/Filter/WPQTFilter.tsx");





function PipelineOverviewToolBar({
  overviewFilter,
  onCreationDateChange,
  onDoneDateChange
}) {
  const formatDate = value => {
    if (value instanceof Date) {
      return dayjs__WEBPACK_IMPORTED_MODULE_2___default()(value).format("YYYY-MM-DD");
    }
    return "";
  };
  const handleCreationDateChange = value => {
    const dateString = formatDate(value);
    onCreationDateChange(dateString);
  };
  const handleDoneDateChange = value => {
    const dateString = formatDate(value);
    onDoneDateChange(dateString);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Filter_WPQTFilter__WEBPACK_IMPORTED_MODULE_3__.WPQTFilter, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Statistics filtering", "quicktasker"),
      titleClassName: "wpqt-text-center",
      childrenClassName: "wpqt-gap-6 wpqt-justify-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-mb-2",
          children: "Task creation date"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_date_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
          onChange: handleCreationDateChange,
          value: overviewFilter.taskCreationDate,
          format: "y-MM-dd",
          id: "taskCreationDate"
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-mb-2",
          children: "Task done date"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_date_picker__WEBPACK_IMPORTED_MODULE_4__["default"], {
          onChange: handleDoneDateChange,
          value: overviewFilter.taskDoneDate,
          format: "y-MM-dd",
          id: "taskCreationDate"
        })]
      })]
    })
  });
}


/***/ }),

/***/ "./src/pages/OverviewPage/components/PipelineOverview/PipelineOverview.tsx":
/*!*********************************************************************************!*\
  !*** ./src/pages/OverviewPage/components/PipelineOverview/PipelineOverview.tsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineOverview: () => (/* binding */ PipelineOverview)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _ArchivedTaskChart_ArchivedTaskChart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ArchivedTaskChart/ArchivedTaskChart */ "./src/pages/OverviewPage/components/ArchivedTaskChart/ArchivedTaskChart.tsx");
/* harmony import */ var _PipelineOverviewToolBar_PipelineOverviewToolBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../PipelineOverviewToolBar/PipelineOverviewToolBar */ "./src/pages/OverviewPage/components/PipelineOverviewToolBar/PipelineOverviewToolBar.tsx");
/* harmony import */ var _StageDistributionChart_StageDistributionChart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../StageDistributionChart/StageDistributionChart */ "./src/pages/OverviewPage/components/StageDistributionChart/StageDistributionChart.tsx");
/* harmony import */ var _TaskStatusChart_TaskStatusChart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../TaskStatusChart/TaskStatusChart */ "./src/pages/OverviewPage/components/TaskStatusChart/TaskStatusChart.tsx");
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








function PipelineOverview({
  pipeline
}) {
  const [overviewFilter, setOverviewFilter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    taskCreationDate: null,
    taskDoneDate: null,
    taskAssignees: []
  });
  const [pipelineOverviewData, setPipelineOverviewData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const fetchPipelineOverview = () => __awaiter(this, void 0, void 0, function* () {
      try {
        setLoading(true);
        const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.getPipelineOverviewData)(pipeline.id, overviewFilter);
        setPipelineOverviewData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });
    fetchPipelineOverview();
  }, [pipeline.id, overviewFilter]);
  const defaultChartoptions = {
    legend: {
      position: "left",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14
      }
    }
  };
  if (loading || !pipelineOverviewData) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__.Loading, {
      ovalSize: "48"
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PipelineOverviewToolBar_PipelineOverviewToolBar__WEBPACK_IMPORTED_MODULE_5__.PipelineOverviewToolBar, {
      overviewFilter: overviewFilter,
      onCreationDateChange: value => {
        setOverviewFilter(Object.assign(Object.assign({}, overviewFilter), {
          taskCreationDate: value
        }));
      },
      onDoneDateChange: value => {
        setOverviewFilter(Object.assign(Object.assign({}, overviewFilter), {
          taskDoneDate: value
        }));
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-flex-wrap wpqt-justify-center xl:wpqt-justify-start",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_StageDistributionChart_StageDistributionChart__WEBPACK_IMPORTED_MODULE_6__.StageDistributionChart, {
        pipelineOverviewData: pipelineOverviewData,
        options: defaultChartoptions,
        width: "500px"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TaskStatusChart_TaskStatusChart__WEBPACK_IMPORTED_MODULE_7__.TaskStatusChart, {
        pipelineOverviewData: pipelineOverviewData,
        options: defaultChartoptions,
        width: "500px"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ArchivedTaskChart_ArchivedTaskChart__WEBPACK_IMPORTED_MODULE_4__.ArhivedTaskChart, {
        pipelineOverviewData: pipelineOverviewData,
        options: defaultChartoptions,
        width: "500px"
      })]
    })]
  });
}


/***/ }),

/***/ "./src/pages/OverviewPage/components/StageDistributionChart/StageDistributionChart.tsx":
/*!*********************************************************************************************!*\
  !*** ./src/pages/OverviewPage/components/StageDistributionChart/StageDistributionChart.tsx ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StageDistributionChart: () => (/* binding */ StageDistributionChart)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-google-charts */ "./node_modules/react-google-charts/dist/index.js");
/* harmony import */ var _utils_statistics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/statistics */ "./src/utils/statistics.ts");
/* harmony import */ var _NotEnoughData_NotEnoughData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NotEnoughData/NotEnoughData */ "./src/pages/OverviewPage/components/NotEnoughData/NotEnoughData.tsx");





function StageDistributionChart({
  pipelineOverviewData,
  options,
  width
}) {
  var _a;
  const stagesPieChartData = [["Stage", "Task Count"], ...((_a = pipelineOverviewData === null || pipelineOverviewData === void 0 ? void 0 : pipelineOverviewData.stages.map(stage => [stage.name, parseInt(stage.tasksCount) || 0])) !== null && _a !== void 0 ? _a : [])];
  const hasEnoughData = (0,_utils_statistics__WEBPACK_IMPORTED_MODULE_2__.hasEnoughDataCheck)(stagesPieChartData);
  if (!hasEnoughData) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_NotEnoughData_NotEnoughData__WEBPACK_IMPORTED_MODULE_3__.NotEnoughData, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Not enough data to display task distribution by stages chart", "quicktasker")
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_google_charts__WEBPACK_IMPORTED_MODULE_4__.Chart, {
    chartType: "PieChart",
    data: stagesPieChartData,
    options: Object.assign(Object.assign({}, options), {
      title: "Task distribution by stages"
    }),
    width: width,
    height: "400px"
  });
}


/***/ }),

/***/ "./src/pages/OverviewPage/components/TaskStatusChart/TaskStatusChart.tsx":
/*!*******************************************************************************!*\
  !*** ./src/pages/OverviewPage/components/TaskStatusChart/TaskStatusChart.tsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskStatusChart: () => (/* binding */ TaskStatusChart)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-google-charts */ "./node_modules/react-google-charts/dist/index.js");
/* harmony import */ var _utils_statistics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/statistics */ "./src/utils/statistics.ts");
/* harmony import */ var _NotEnoughData_NotEnoughData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NotEnoughData/NotEnoughData */ "./src/pages/OverviewPage/components/NotEnoughData/NotEnoughData.tsx");





function TaskStatusChart({
  pipelineOverviewData,
  options,
  width
}) {
  var _a, _b;
  const taskDonePieChartData = [["Task status", "Task Count"], ["Done", parseInt((_a = pipelineOverviewData === null || pipelineOverviewData === void 0 ? void 0 : pipelineOverviewData.doneTasksCount) !== null && _a !== void 0 ? _a : "0") || 0], ["Not Done", parseInt((_b = pipelineOverviewData === null || pipelineOverviewData === void 0 ? void 0 : pipelineOverviewData.notDoneTasksCount) !== null && _b !== void 0 ? _b : "0") || 0]];
  const hasEnoughData = (0,_utils_statistics__WEBPACK_IMPORTED_MODULE_2__.hasEnoughDataCheck)(taskDonePieChartData);
  if (!hasEnoughData) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_NotEnoughData_NotEnoughData__WEBPACK_IMPORTED_MODULE_3__.NotEnoughData, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Not enough data to display task status chart", "quicktasker")
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_google_charts__WEBPACK_IMPORTED_MODULE_4__.Chart, {
    chartType: "PieChart",
    data: taskDonePieChartData,
    options: Object.assign(Object.assign({}, options), {
      title: "Task status"
    }),
    width: width,
    height: "400px"
  });
}


/***/ }),

/***/ "./src/pages/Page/Page.tsx":
/*!*********************************!*\
  !*** ./src/pages/Page/Page.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Page: () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _providers_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/LoadingContextProvider */ "./src/providers/LoadingContextProvider.tsx");




function Page({
  children
}) {
  const {
    state: {
      fullPageLoading
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_3__.LoadingContext);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-pr-4",
    children: fullPageLoading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_2__.FullLoading, {}) : children
  });
}


/***/ }),

/***/ "./src/pages/PipelinePage/PipelinePage.tsx":
/*!*************************************************!*\
  !*** ./src/pages/PipelinePage/PipelinePage.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelinePage: () => (/* binding */ PipelinePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal_PipelineModal_AddPipelineModal_AddPipelineModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Modal/PipelineModal/AddPipelineModal/AddPipelineModal */ "./src/components/Modal/PipelineModal/AddPipelineModal/AddPipelineModal.tsx");
/* harmony import */ var _components_Modal_PipelineModal_EditPipelineModal_EditPipelineModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Modal/PipelineModal/EditPipelineModal/EditPipelineModal */ "./src/components/Modal/PipelineModal/EditPipelineModal/EditPipelineModal.tsx");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _components_Pipeline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Pipeline */ "./src/pages/PipelinePage/components/Pipeline.tsx");
/* harmony import */ var _components_PipelineHeader_PipelineHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/PipelineHeader/PipelineHeader */ "./src/pages/PipelinePage/components/PipelineHeader/PipelineHeader.tsx");







const PipelinePage = () => {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_3__.ActivePipelineContextProvider, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_4__.Page, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_PipelineHeader_PipelineHeader__WEBPACK_IMPORTED_MODULE_6__.PipelineHeader, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pipeline__WEBPACK_IMPORTED_MODULE_5__["default"], {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Modal_PipelineModal_AddPipelineModal_AddPipelineModal__WEBPACK_IMPORTED_MODULE_1__.AddPipelineModal, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Modal_PipelineModal_EditPipelineModal_EditPipelineModal__WEBPACK_IMPORTED_MODULE_2__.EditPipelineModal, {})]
    })
  });
};


/***/ }),

/***/ "./src/pages/PipelinePage/components/AddStage.tsx":
/*!********************************************************!*\
  !*** ./src/pages/PipelinePage/components/AddStage.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddStage: () => (/* binding */ AddStage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PlusCircleIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
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






function AddStage({
  pipelineId,
  stagesLength = 0
}) {
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_4__.ModalContext);
  const openNewStageModal = () => __awaiter(this, void 0, void 0, function* () {
    modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.OPEN_NEW_STAGE_MODAL,
      payload: {
        targetPipelineId: pipelineId
      }
    });
  });
  if (stagesLength === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-pipeline-height wpqt-flex wpqt-w-full wpqt-items-center wpqt-justify-center",
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-main-border wpqt-flex wpqt-cursor-pointer wpqt-flex-col wpqt-items-center wpqt-justify-start wpqt-gap-y-1 wpqt-p-3 hover:wpqt-bg-gray-100",
        onClick: openNewStageModal,
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__["default"], {
          className: "wpqt-size-6 wpqt-text-green-600"
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-whitespace-nowrap",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add first stage", "quicktasker")
        })]
      })
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-main-border wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-flex-col wpqt-items-center wpqt-justify-start wpqt-self-start wpqt-p-3 hover:wpqt-bg-gray-100",
    onClick: openNewStageModal,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: "wpqt-size-6 wpqt-text-green-600"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-whitespace-nowrap",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add stage", "quicktasker")
    })]
  });
}


/***/ }),

/***/ "./src/pages/PipelinePage/components/AddTask.tsx":
/*!*******************************************************!*\
  !*** ./src/pages/PipelinePage/components/AddTask.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddTask: () => (/* binding */ AddTask)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/XCircleIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PlusCircleIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _components_common_Input_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
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










function AddTask({
  stageId
}) {
  const [taskName, setTaskName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [showTaskInput, setShowTaskInput] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const componentRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const inputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    state: {
      activePipeline
    },
    dispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__.ActivePipelineContext);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleKeyDown = event => {
      if (event.key === "Enter" && document.activeElement === inputRef.current) {
        createTask();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [taskName]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleClickOutside = event => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        clearState();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _a;
    if (showTaskInput) {
      (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }, [showTaskInput]);
  const createTask = () => __awaiter(this, void 0, void 0, function* () {
    if (!taskName) {
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Task name is required", "quicktasker"));
      return;
    }
    try {
      setLoading(true);
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.createTaskRequest)(stageId, activePipeline.id, taskName);
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_7__.PIPELINE_ADD_TASK,
        payload: response.data
      });
      clearState();
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to create task", "quicktasker"));
    } finally {
      setLoading(false);
    }
  });
  const clearState = () => {
    setShowTaskInput(false);
    setTaskName("");
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    ref: componentRef,
    className: "wpqt-sticky wpqt-bottom-0 wpqt-z-10 wpqt-order-1 wpqt-mt-2 wpqt-flex wpqt-justify-center wpqt-bg-gray-100 wpqt-py-2",
    children: showTaskInput ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-items-center wpqt-gap-3",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Input_Input__WEBPACK_IMPORTED_MODULE_5__.WPQTInput, {
        ref: inputRef,
        value: taskName,
        onChange: value => setTaskName(value),
        wrapperClassName: "!wpqt-mb-0",
        className: "!wpqt-mb-0"
      }), loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_6__.LoadingOval, {
        width: "24",
        height: "24"
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
          className: "wpqt-icon-red wpqt-size-6 wpqt-cursor-pointer",
          onClick: clearState
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
          className: "wpqt-icon-green wpqt-size-6 wpqt-cursor-pointer",
          onClick: createTask
        })]
      })]
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      onClick: () => setShowTaskInput(true),
      className: "wpqt-main-border wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-gap-2 wpqt-p-2 hover:wpqt-bg-white",
      children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add task", "quicktasker"), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: "wpqt-size-6 wpqt-text-green-600"
      })]
    })
  });
}


/***/ }),

/***/ "./src/pages/PipelinePage/components/Pipeline.tsx":
/*!********************************************************!*\
  !*** ./src/pages/PipelinePage/components/Pipeline.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @hello-pangea/dnd */ "./node_modules/@hello-pangea/dnd/dist/dnd.esm.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _components_Modal_StageModal_StageModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/Modal/StageModal/StageModal */ "./src/components/Modal/StageModal/StageModal.tsx");
/* harmony import */ var _components_Modal_TaskModal_TaskModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Modal/TaskModal/TaskModal */ "./src/components/Modal/TaskModal/TaskModal.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _AddStage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AddStage */ "./src/pages/PipelinePage/components/AddStage.tsx");
/* harmony import */ var _PipelineIntro__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PipelineIntro */ "./src/pages/PipelinePage/components/PipelineIntro.tsx");
/* harmony import */ var _Stage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Stage */ "./src/pages/PipelinePage/components/Stage.tsx");
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













const Pipeline = () => {
  var _a, _b;
  const {
    state: {
      activePipeline
    },
    dispatch,
    fetchAndSetPipelineData
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_8__.ActivePipelineContext);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const refetchDataInterval = setInterval(() => {
      if (activePipeline) {
        fetchAndSetPipelineData(activePipeline.id);
      }
    }, _constants__WEBPACK_IMPORTED_MODULE_7__.REFETCH_ACTIVE_PIPELINE_INTERVAL);
    return () => clearInterval(refetchDataInterval);
  }, [activePipeline]);
  const dispatchMove = (source, destination) => {
    if (source.droppableId === destination.droppableId) {
      dispatch({
        type: "REORDER_TASK",
        payload: {
          source,
          destination
        }
      });
    } else {
      dispatch({
        type: "MOVE_TASK",
        payload: {
          source,
          destination
        }
      });
    }
  };
  const onDragEnd = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(result => __awaiter(void 0, void 0, void 0, function* () {
    const {
      source,
      destination,
      draggableId
    } = result;
    if (!destination) {
      return;
    }
    dispatchMove(source, destination);
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.moveTaskRequest)(draggableId, destination.droppableId, destination.index);
    } catch (error) {
      console.error(error);
      dispatchMove(destination, source);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to move a task", "quicktasker"));
    }
  }), [activePipeline]);
  const deleteTaskCallback = () => {
    if (activePipeline) {
      fetchAndSetPipelineData(activePipeline.id);
    }
  };
  if (!activePipeline) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PipelineIntro__WEBPACK_IMPORTED_MODULE_10__.PipelineIntro, {});
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-pipeline-height wpqt-flex wpqt-gap-[24px] wpqt-overflow-x-auto wpqt-overflow-y-hidden",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_12__.DragDropContext, {
      onDragEnd: onDragEnd,
      children: (_a = activePipeline.stages) === null || _a === void 0 ? void 0 : _a.map((stage, index) => {
        const isLastStage = index === activePipeline.stages.length - 1;
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Stage__WEBPACK_IMPORTED_MODULE_11__.Stage, {
          stage: stage,
          isLastStage: isLastStage
        }, stage.id);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AddStage__WEBPACK_IMPORTED_MODULE_9__.AddStage, {
      pipelineId: activePipeline.id,
      stagesLength: (_b = activePipeline.stages) === null || _b === void 0 ? void 0 : _b.length
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Modal_TaskModal_TaskModal__WEBPACK_IMPORTED_MODULE_6__.TaskModal, {
      deleteTaskCallback: deleteTaskCallback
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Modal_StageModal_StageModal__WEBPACK_IMPORTED_MODULE_5__.StageModal, {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pipeline);

/***/ }),

/***/ "./src/pages/PipelinePage/components/PipelineHeader/PipelineHeader.tsx":
/*!*****************************************************************************!*\
  !*** ./src/pages/PipelinePage/components/PipelineHeader/PipelineHeader.tsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineHeader: () => (/* binding */ PipelineHeader)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/Cog8ToothIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/ArrowPathIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Dropdown_PipelineSelectionDropdown_PipelineSelectionDropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown */ "./src/components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown.tsx");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");








function PipelineHeader() {
  const {
    state: {
      activePipeline,
      loading
    },
    fetchAndSetPipelineData
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_5__.ActivePipelineContext);
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_6__.ModalContext);
  const openEditPipelineModal = () => {
    if (!activePipeline) {
      return;
    }
    modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_4__.OPEN_EDIT_PIPELINE_MODAL,
      payload: {
        pipelineToEdit: activePipeline
      }
    });
  };
  if (!activePipeline) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-py-5",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-flex wpqt-items-center wpqt-gap-2",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          className: "wpqt-text-lg",
          children: activePipeline.name
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "wpqt-text-gray-400 wpqt-size-6 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover",
          onClick: openEditPipelineModal
        })]
      }), activePipeline.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-italic",
        children: activePipeline.description
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-ml-auto wpqt-flex wpqt-items-center wpqt-gap-3",
      children: [loading ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__.LoadingOval, {
        width: "24",
        height: "24"
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: "wpqt-size-6 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover",
        onClick: () => fetchAndSetPipelineData(activePipeline.id)
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_PipelineSelectionDropdown_PipelineSelectionDropdown__WEBPACK_IMPORTED_MODULE_2__.PipelineSelectionDropdown, {})]
    })]
  });
}


/***/ }),

/***/ "./src/pages/PipelinePage/components/PipelineIntro.tsx":
/*!*************************************************************!*\
  !*** ./src/pages/PipelinePage/components/PipelineIntro.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineIntro: () => (/* binding */ PipelineIntro)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PlusCircleIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
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






function PipelineIntro() {
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_4__.ModalContext);
  const openPipelineModal = () => __awaiter(this, void 0, void 0, function* () {
    modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_3__.OPEN_NEW_PIPELINE_MODAL
    });
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-flex wpqt-h-screen-minus-top-bar wpqt-items-center wpqt-justify-center",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      onClick: openPipelineModal,
      className: "wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-2",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "wpqt-icon-green wpqt-size-6 wpqt-cursor-pointer"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add your first Board", "quicktasker")
      })]
    })
  });
}


/***/ }),

/***/ "./src/pages/PipelinePage/components/Stage.tsx":
/*!*****************************************************!*\
  !*** ./src/pages/PipelinePage/components/Stage.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Stage: () => (/* binding */ Stage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @hello-pangea/dnd */ "./node_modules/@hello-pangea/dnd/dist/dnd.esm.js");
/* harmony import */ var _components_Dropdown_StageControlsDropdown_StageControlsDropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Dropdown/StageControlsDropdown/StageControlsDropdown */ "./src/components/Dropdown/StageControlsDropdown/StageControlsDropdown.tsx");
/* harmony import */ var _AddTask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddTask */ "./src/pages/PipelinePage/components/AddTask.tsx");
/* harmony import */ var _Task_Task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Task/Task */ "./src/pages/PipelinePage/components/Task/Task.tsx");





function TaskCount({
  tasks
}) {
  const taskCount = tasks.length;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
    className: "wpqt-rounded-lg wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-px-1 wpqt-text-xs",
    children: taskCount
  });
}
function Stage({
  stage,
  isLastStage
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    "data-stage-id": stage.id,
    className: `wpqt-relative wpqt-mb-3 wpqt-flex wpqt-max-h-full wpqt-w-[360px] wpqt-flex-none wpqt-flex-col wpqt-overflow-hidden wpqt-rounded-md wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-gray-100`,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-mb-4 wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-1 wpqt-px-4 wpqt-pt-3",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-mr-auto wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-text-base wpqt-leading-none",
        children: [stage.name, " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TaskCount, {
          tasks: stage.tasks
        })]
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_StageControlsDropdown_StageControlsDropdown__WEBPACK_IMPORTED_MODULE_1__.StageControlsDropdown, {
        stage: stage
      }), stage.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-w-full wpqt-flex-shrink-0 wpqt-flex-grow-0 wpqt-text-sm",
        children: stage.description
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_4__.Droppable, {
      droppableId: stage.id,
      children: provided => {
        var _a;
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          ref: provided.innerRef,
          className: "wpqt-flex wpqt-h-full wpqt-flex-col wpqt-overflow-y-auto wpqt-overflow-x-hidden",
          children: [(_a = stage.tasks) === null || _a === void 0 ? void 0 : _a.map((task, index) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Task_Task__WEBPACK_IMPORTED_MODULE_3__.Task, {
            task: task,
            index: index,
            onLastStage: isLastStage
          }, task.id)), provided.placeholder, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AddTask__WEBPACK_IMPORTED_MODULE_2__.AddTask, {
            stageId: stage.id
          })]
        });
      }
    })]
  });
}


/***/ }),

/***/ "./src/pages/PipelinePage/components/Task/Task.tsx":
/*!*********************************************************!*\
  !*** ./src/pages/PipelinePage/components/Task/Task.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @hello-pangea/dnd */ "./node_modules/@hello-pangea/dnd/dist/dnd.esm.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CheckBadgeIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Dropdown_TaskControlsDropdown_TaskControlsDropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Dropdown/TaskControlsDropdown/TaskControlsDropdown */ "./src/components/Dropdown/TaskControlsDropdown/TaskControlsDropdown.tsx");
/* harmony import */ var _components_Dropdown_UserAssignementDropdown_UserAssignementDropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown */ "./src/components/Dropdown/UserAssignementDropdown/UserAssignementDropdown.tsx");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../hooks/actions/useTaskActions */ "./src/hooks/actions/useTaskActions.ts");
/* harmony import */ var _providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../providers/ActivePipelineContextProvider */ "./src/providers/ActivePipelineContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
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











function Task({
  task,
  index,
  onLastStage
}) {
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_8__.ModalContext);
  const {
    state: {
      activePipeline
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_7__.ActivePipelineContext);
  const pipelineSettings = activePipeline === null || activePipeline === void 0 ? void 0 : activePipeline.settings;
  const allowToMarkTaskAsDone = !pipelineSettings.allow_only_last_stage_task_done || onLastStage;
  const openEditTaskModal = () => {
    modalDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_5__.OPEN_EDIT_TASK_MODAL,
      payload: {
        taskToEdit: task,
        taskModalSettings: {
          allowToMarkTaskAsDone
        }
      }
    });
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_9__.Draggable, {
    draggableId: task.id,
    index: index,
    children: provided => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", Object.assign({
      ref: provided.innerRef
    }, provided.draggableProps, provided.dragHandleProps, {
      className: "wpqt-relative wpqt-mx-4 wpqt-mb-2 wpqt-flex !wpqt-cursor-pointer wpqt-flex-col wpqt-gap-1 wpqt-rounded wpqt-border wpqt-border-gray-200 wpqt-bg-white wpqt-p-3 wpqt-shadow hover:wpqt-shadow-md",
      onClick: openEditTaskModal,
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-absolute wpqt-right-[12px] wpqt-top-[12px]",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_TaskControlsDropdown_TaskControlsDropdown__WEBPACK_IMPORTED_MODULE_2__.TaskControlsDropdown, {
          task: task
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-base",
        children: task.name
      }), task.description && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-text-sm wpqt-italic",
        children: task.description
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-mt-2",
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_UserAssignementDropdown_UserAssignementDropdown__WEBPACK_IMPORTED_MODULE_3__.UserAssignementDropdown, {
          task: task
        })
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TaskActions, {
        task: task,
        allowToMarkTaskAsDone: allowToMarkTaskAsDone
      })]
    }))
  }, task.id);
}
function TaskActions({
  task,
  allowToMarkTaskAsDone
}) {
  const {
    dispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ActivePipelineContextProvider__WEBPACK_IMPORTED_MODULE_7__.ActivePipelineContext);
  const {
    changeTaskDoneStatus
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_6__.useTaskActions)();
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const isTaskCompleted = task.is_done;
  const changeDone = done => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);
    yield changeTaskDoneStatus(task.id, done, isCompleted => {
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.PIPELINE_CHANGE_TASK_DONE_STATUS,
        payload: {
          taskId: task.id,
          done: isCompleted
        }
      });
    });
    setLoading(false);
  });
  if (!allowToMarkTaskAsDone) {
    return null;
  }
  if (loading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__.Loading, {
      ovalSize: "24"
    });
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-flex wpqt-justify-center",
    children: isTaskCompleted ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
      className: "wpqt-size-6 wpqt-icon-green",
      onClick: e => {
        e.stopPropagation();
        changeDone(false);
      }
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
      className: "wpqt-size-6 wpqt-icon-gray",
      onClick: e => {
        e.stopPropagation();
        changeDone(true);
      }
    })
  });
}


/***/ }),

/***/ "./src/pages/SettingsPage/SettingsPage.tsx":
/*!*************************************************!*\
  !*** ./src/pages/SettingsPage/SettingsPage.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPage: () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _components_CustomStyleSetting_CustomStyleSetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/CustomStyleSetting/CustomStyleSetting */ "./src/pages/SettingsPage/components/CustomStyleSetting/CustomStyleSetting.tsx");
/* harmony import */ var _components_PipelineSettings_PipelinesSettingsTabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/PipelineSettings/PipelinesSettingsTabs */ "./src/pages/SettingsPage/components/PipelineSettings/PipelinesSettingsTabs.tsx");






const SettingsPage = () => {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_3__.Page, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__.WPQTPageHeader, {
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Manage settings, preferences, and configurations.", "quicktasker"),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Settings", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_CustomStyleSetting_CustomStyleSetting__WEBPACK_IMPORTED_MODULE_4__.CustomStyleSetting, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_PipelineSettings_PipelinesSettingsTabs__WEBPACK_IMPORTED_MODULE_5__.PipelinesSettingsTabs, {})]
  });
};


/***/ }),

/***/ "./src/pages/SettingsPage/components/CustomStyleSetting/CustomStyleSetting.tsx":
/*!*************************************************************************************!*\
  !*** ./src/pages/SettingsPage/components/CustomStyleSetting/CustomStyleSetting.tsx ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomStyleSetting: () => (/* binding */ CustomStyleSetting)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_tfi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/tfi */ "./node_modules/react-icons/tfi/index.mjs");
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _components_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useSettingActions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../hooks/actions/useSettingActions */ "./src/hooks/actions/useSettingActions.ts");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _Settings_Settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Settings/Settings */ "./src/pages/SettingsPage/components/Settings/Settings.tsx");
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










const CustomStyleSetting = () => {
  const {
    state: {
      userPageCustomStyles: initialUserPageCustomStyles
    },
    appDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_7__.AppContext);
  const [userPageCustomStyles, setUserPageCustomStylesState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [isSaving, setIsSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    saveCustomUserPageStyles
  } = (0,_hooks_actions_useSettingActions__WEBPACK_IMPORTED_MODULE_6__.useSettingActions)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setUserPageCustomStylesState(initialUserPageCustomStyles);
  }, [initialUserPageCustomStyles]);
  const onSave = () => __awaiter(void 0, void 0, void 0, function* () {
    setIsSaving(true);
    yield saveCustomUserPageStyles(userPageCustomStyles, styles => {
      appDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_CUSTOM_USER_PAGE_STYLES,
        payload: styles
      });
    });
    setIsSaving(false);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Settings_Settings__WEBPACK_IMPORTED_MODULE_8__.Settings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Custom style", "quicktasker"),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add custom CSS rules for QuickTasker user page.", "quicktasker"),
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_4__.WPQTTextarea, {
      value: userPageCustomStyles,
      onChange: setUserPageCustomStylesState
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "quicktasker"),
      loading: isSaving,
      onClick: onSave,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_icons_tfi__WEBPACK_IMPORTED_MODULE_9__.TfiSave, {
        className: "wpqt-icon-blue wpqt-size-4"
      })
    })]
  });
};


/***/ }),

/***/ "./src/pages/SettingsPage/components/PipelineSettings/PipelinesSettingsTabs.tsx":
/*!**************************************************************************************!*\
  !*** ./src/pages/SettingsPage/components/PipelineSettings/PipelinesSettingsTabs.tsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelinesSettingsTabs: () => (/* binding */ PipelinesSettingsTabs)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Tab_WPQTTabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Tab/WPQTTabs */ "./src/components/Tab/WPQTTabs.tsx");
/* harmony import */ var _providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../providers/PipelinesContextProvider */ "./src/providers/PipelinesContextProvider.tsx");
/* harmony import */ var _components_PipelineSettings_PipelineSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/PipelineSettings/PipelineSettings */ "./src/pages/SettingsPage/components/PipelineSettings/components/PipelineSettings/PipelineSettings.tsx");





function PipelinesSettingsTabs() {
  const {
    state: {
      pipelines
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_PipelinesContextProvider__WEBPACK_IMPORTED_MODULE_3__.PipelinesContext);
  const pipelineNames = pipelines.map(pipeline => pipeline.name);
  const tabContent = pipelines.map(pipeline => {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_PipelineSettings_PipelineSettings__WEBPACK_IMPORTED_MODULE_4__.PipelineSettings, {
      pipeline: pipeline
    }, pipeline.id);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Tab_WPQTTabs__WEBPACK_IMPORTED_MODULE_2__.WPQTTabs, {
      tabs: pipelineNames,
      tabsContent: tabContent,
      tabListClassName: "wpqt-gap-5",
      tabClassName: "wpqt-flex-none"
    })
  });
}


/***/ }),

/***/ "./src/pages/SettingsPage/components/PipelineSettings/components/PipelineSettings/PipelineSettings.tsx":
/*!*************************************************************************************************************!*\
  !*** ./src/pages/SettingsPage/components/PipelineSettings/components/PipelineSettings/PipelineSettings.tsx ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineSettings: () => (/* binding */ PipelineSettings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../utils/pipeline-settings */ "./src/utils/pipeline-settings.ts");
/* harmony import */ var _TaskCompletionDoneSetting_TaskCompletionDoneSetting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TaskCompletionDoneSetting/TaskCompletionDoneSetting */ "./src/pages/SettingsPage/components/PipelineSettings/components/TaskCompletionDoneSetting/TaskCompletionDoneSetting.tsx");
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






function PipelineSettings({
  pipeline
}) {
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const loadSettings = () => __awaiter(this, void 0, void 0, function* () {
      try {
        setLoading(true);
        const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_2__.getPipelineSettingsRequest)(pipeline.id);
        setSettings((0,_utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_4__.convertPipelineSettingsFromServer)(response.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });
    loadSettings();
  }, []);
  if (loading) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_3__.Loading, {});
  }
  if (!settings) {
    return null;
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_TaskCompletionDoneSetting_TaskCompletionDoneSetting__WEBPACK_IMPORTED_MODULE_5__.TaskCompletionDoneSetting, {
      pipelineId: pipeline.id,
      allow_only_last_stage_task_done: settings.allow_only_last_stage_task_done
    })
  });
}


/***/ }),

/***/ "./src/pages/SettingsPage/components/PipelineSettings/components/TaskCompletionDoneSetting/TaskCompletionDoneSetting.tsx":
/*!*******************************************************************************************************************************!*\
  !*** ./src/pages/SettingsPage/components/PipelineSettings/components/TaskCompletionDoneSetting/TaskCompletionDoneSetting.tsx ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskCompletionDoneSetting: () => (/* binding */ TaskCompletionDoneSetting)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_Toggle_Toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../components/common/Toggle/Toggle */ "./src/components/common/Toggle/Toggle.tsx");
/* harmony import */ var _components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../components/Loading/Loading */ "./src/components/Loading/Loading.tsx");
/* harmony import */ var _hooks_actions_useSettingActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../hooks/actions/useSettingActions */ "./src/hooks/actions/useSettingActions.ts");
/* harmony import */ var _Settings_Settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Settings/Settings */ "./src/pages/SettingsPage/components/Settings/Settings.tsx");
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







function TaskCompletionDoneSetting({
  allow_only_last_stage_task_done,
  pipelineId
}) {
  const [checked, setChecked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(allow_only_last_stage_task_done);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    saveTaskCompletionDoneSetting
  } = (0,_hooks_actions_useSettingActions__WEBPACK_IMPORTED_MODULE_5__.useSettingActions)();
  const onToggle = checked => __awaiter(this, void 0, void 0, function* () {
    setChecked(checked);
    setLoading(true);
    yield saveTaskCompletionDoneSetting(pipelineId, checked, checked => {
      setChecked(checked);
    });
    setLoading(false);
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Settings_Settings__WEBPACK_IMPORTED_MODULE_6__.Settings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Restrict Task Completion", "quicktasker"),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Allow to mark task as done only on board last stage. By default, task can be marked as done on any stage. Will apply also to QuickTasker page", "quicktasker"),
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-gap-2 wpqt-items-center",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Toggle_Toggle__WEBPACK_IMPORTED_MODULE_3__.Toggle, {
        checked: checked,
        handleChange: onToggle
      }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Loading_Loading__WEBPACK_IMPORTED_MODULE_4__.LoadingOval, {
        width: "20",
        height: "20"
      })]
    })
  });
}


/***/ }),

/***/ "./src/pages/SettingsPage/components/Settings/Settings.tsx":
/*!*****************************************************************!*\
  !*** ./src/pages/SettingsPage/components/Settings/Settings.tsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Settings: () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Settings = ({
  children,
  title,
  description
}) => {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-mb-3",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
      children: title
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
      children: description
    }), children]
  });
};


/***/ }),

/***/ "./src/pages/UserPage/UserPage.tsx":
/*!*****************************************!*\
  !*** ./src/pages/UserPage/UserPage.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserPage: () => (/* binding */ UserPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../api/api */ "./src/api/api.ts");
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../providers/LoadingContextProvider */ "./src/providers/LoadingContextProvider.tsx");
/* harmony import */ var _utils_user__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/user */ "./src/utils/user.ts");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _components_UserControls_UserControls__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/UserControls/UserControls */ "./src/pages/UserPage/components/UserControls/UserControls.tsx");
/* harmony import */ var _components_UserDetails_UserDetails__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/UserDetails/UserDetails */ "./src/pages/UserPage/components/UserDetails/UserDetails.tsx");
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












function UserPage({
  userId
}) {
  const {
    loadingDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_7__.LoadingContext);
  const [userData, setUserData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const getUserData = () => __awaiter(this, void 0, void 0, function* () {
      try {
        loadingDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_6__.SET_FULL_PAGE_LOADING,
          payload: true
        });
        const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getExtendedUserRequest)(userId);
        setUserData((0,_utils_user__WEBPACK_IMPORTED_MODULE_8__.convertExtendedUserFromServer)(response.data));
      } catch (error) {
        console.error(error);
        react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to get user data. Please try again", "quicktasker"));
      } finally {
        loadingDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_6__.SET_FULL_PAGE_LOADING,
          payload: false
        });
      }
    });
    getUserData();
  }, []);
  const onChangeStatus = status => __awaiter(this, void 0, void 0, function* () {
    setUserData(prevData => {
      if (prevData) {
        return Object.assign(Object.assign({}, prevData), {
          is_active: status
        });
      }
      return prevData;
    });
  });
  const onChangeSetUpStatus = status => __awaiter(this, void 0, void 0, function* () {
    setUserData(prevData => {
      if (prevData) {
        return Object.assign(Object.assign({}, prevData), {
          setup_completed: status
        });
      }
      return prevData;
    });
  });
  const onChangePasswordStatus = status => __awaiter(this, void 0, void 0, function* () {
    setUserData(prevData => {
      if (prevData) {
        return Object.assign(Object.assign({}, prevData), {
          has_password: status
        });
      }
      return prevData;
    });
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Page_Page__WEBPACK_IMPORTED_MODULE_9__.Page, {
    children: userData && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_5__.WPQTPageHeader, {
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User details", "quicktasker"),
        children: userData.name
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_UserDetails_UserDetails__WEBPACK_IMPORTED_MODULE_11__.UserDetails, {
        data: userData
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_UserControls_UserControls__WEBPACK_IMPORTED_MODULE_10__.UserControls, {
        data: userData,
        changeStatus: onChangeStatus,
        changeSetUpStatus: onChangeSetUpStatus,
        changePasswordStatus: onChangePasswordStatus
      })]
    })
  });
}


/***/ }),

/***/ "./src/pages/UserPage/components/UserControls/UserControls.tsx":
/*!*********************************************************************!*\
  !*** ./src/pages/UserPage/components/UserControls/UserControls.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserControls: () => (/* binding */ UserControls)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/RectangleStackIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PowerIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/KeyIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../hooks/actions/useUserActions */ "./src/hooks/actions/useUserActions.ts");
/* harmony import */ var _hooks_useLoadingStates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../hooks/useLoadingStates */ "./src/hooks/useLoadingStates.ts");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
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









function UserControls({
  data,
  changeStatus,
  changeSetUpStatus,
  changePasswordStatus
}) {
  const {
    changeUserStatus,
    deleteUser,
    resetUserPassword
  } = (0,_hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_5__.useUserActions)();
  const {
    userDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_7__.UserContext);
  const {
    loading1: isResetPWLoading,
    setLoading1: setIsResetPWLoading,
    loading2: isActivateLoading,
    setLoading2: setIsActivateLoading,
    loading3: isDeleteLoading,
    setLoading3: setIsDeleteLoading
  } = (0,_hooks_useLoadingStates__WEBPACK_IMPORTED_MODULE_6__.useLoadingStates)();
  const isUserActive = data.is_active;
  const hasPassword = data.has_password;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-mt-5 wpqt-flex wpqt-gap-2",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: "wpqt-icon-blue wpqt-size-5"
      }),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User tasks", "quicktasker"),
      onClick: () => {
        window.location.hash = `#/users/${data.id}/tasks`;
      }
    }), !isUserActive && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "wpqt-icon-green wpqt-size-5"
      }),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Activate user", "quicktasker"),
      loading: isActivateLoading,
      onClick: () => __awaiter(this, void 0, void 0, function* () {
        setIsActivateLoading(true);
        yield changeUserStatus(data.id, true, userData => {
          userDispatch({
            type: _constants__WEBPACK_IMPORTED_MODULE_4__.EDIT_USER,
            payload: Object.assign({}, userData)
          });
          changeStatus(true);
        });
        setIsActivateLoading(false);
      })
    }), isUserActive && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "wpqt-icon-red wpqt-size-5"
      }),
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Disable user", "quicktasker"),
      loading: isActivateLoading,
      onClick: () => __awaiter(this, void 0, void 0, function* () {
        setIsActivateLoading(true);
        yield changeUserStatus(data.id, false, userData => {
          userDispatch({
            type: _constants__WEBPACK_IMPORTED_MODULE_4__.EDIT_USER,
            payload: Object.assign({}, userData)
          });
          changeStatus(false);
        });
        setIsActivateLoading(false);
      })
    }), hasPassword && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: "wpqt-icon-red wpqt-size-5"
      }),
      loading: isResetPWLoading,
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Reset password", "quicktasker"),
      onClick: () => __awaiter(this, void 0, void 0, function* () {
        setIsResetPWLoading(true);
        yield resetUserPassword(data.id, () => {
          changeSetUpStatus(false);
          changePasswordStatus(false);
        });
        setIsResetPWLoading(false);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_3__.WPQTIconButton, {
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "wpqt-icon-red wpqt-size-5"
      }),
      loading: isDeleteLoading,
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete user", "quicktasker"),
      onClick: () => __awaiter(this, void 0, void 0, function* () {
        setIsDeleteLoading(true);
        yield deleteUser(data.id, userId => {
          userDispatch({
            type: _constants__WEBPACK_IMPORTED_MODULE_4__.DELETE_USER,
            payload: userId
          });
          window.location.hash = `#/users`;
        });
        setIsDeleteLoading(false);
      })
    })]
  });
}


/***/ }),

/***/ "./src/pages/UserPage/components/UserDetails/UserDetails.tsx":
/*!*******************************************************************!*\
  !*** ./src/pages/UserPage/components/UserDetails/UserDetails.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserDetails: () => (/* binding */ UserDetails)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/CalendarIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/RectangleStackIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/LockClosedIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PowerIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EyeIcon.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_usePageLinks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../hooks/usePageLinks */ "./src/hooks/usePageLinks.tsx");
/* harmony import */ var _hooks_useTimezone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hooks/useTimezone */ "./src/hooks/useTimezone.ts");





function UserDetails({
  data
}) {
  const {
    userPage
  } = (0,_hooks_usePageLinks__WEBPACK_IMPORTED_MODULE_2__.usePageLinks)();
  const {
    convertToWPTimezone
  } = (0,_hooks_useTimezone__WEBPACK_IMPORTED_MODULE_3__.useTimezone)();
  const isActive = data.is_active;
  const userPageLink = userPage + "&code=" + data.page_hash;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-flex-col wpqt-gap-2",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserDetailItem, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Name", "quicktasker"),
      value: data.name,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: "wpqt-size-5 wpqt-icon-blue"
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserDetailItem, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Created at", "quicktasker"),
      value: convertToWPTimezone(data.created_at),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: "wpqt-size-5 wpqt-icon-blue"
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserDetailItem, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Assigned tasks count", "quicktasker"),
      value: data.assigned_tasks_count,
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: "wpqt-size-5 wpqt-icon-blue"
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserDetailItem, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Setup completed", "quicktasker"),
      value: data.setup_completed ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Yes", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__["default"], {
        className: "wpqt-size-5 wpqt-text-yellow-600"
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserDetailItem, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Is active", "quicktasker"),
      value: isActive ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Yes", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: `wpqt-size-5 ${isActive ? "wpqt-icon-green" : "wpqt-icon-red"}`
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserDetailItem, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("User Page", "quicktasker"),
      value: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
        href: userPageLink,
        rel: "noreferrer",
        target: "_blank",
        children: userPageLink
      }),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: `wpqt-size-5 wpqt-icon-blue`
      })
    })]
  });
}
function UserDetailItem({
  label,
  value,
  icon
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "wpqt-flex wpqt-items-center wpqt-gap-2",
    children: [icon, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "wpqt-font-semibold",
      children: [label, ": "]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      children: value
    })]
  });
}


/***/ }),

/***/ "./src/pages/UserSessionsPage/UserSessionsPage.tsx":
/*!*********************************************************!*\
  !*** ./src/pages/UserSessionsPage/UserSessionsPage.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserSessionsPage: () => (/* binding */ UserSessionsPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _components_Filter_UserSessionsFilter_UserSessionsFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Filter/UserSessionsFilter/UserSessionsFilter */ "./src/components/Filter/UserSessionsFilter/UserSessionsFilter.tsx");
/* harmony import */ var _providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../providers/UserSessionsContextProvider */ "./src/providers/UserSessionsContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _components_UserSessions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/UserSessions */ "./src/pages/UserSessionsPage/components/UserSessions.tsx");







function UserSessionsPage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserSessionsContextProvider, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_5__.Page, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__.WPQTPageHeader, {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Quicktasker sessions", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_UserSessionsFilter_UserSessionsFilter__WEBPACK_IMPORTED_MODULE_3__.UserSessionsFilter, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_UserSessions__WEBPACK_IMPORTED_MODULE_6__.UserSessions, {})]
    })
  });
}


/***/ }),

/***/ "./src/pages/UserSessionsPage/components/UserSession.tsx":
/*!***************************************************************!*\
  !*** ./src/pages/UserSessionsPage/components/UserSession.tsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserSession: () => (/* binding */ UserSession)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PowerIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/TrashIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../api/api */ "./src/api/api.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_useTimezone__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hooks/useTimezone */ "./src/hooks/useTimezone.ts");
/* harmony import */ var _providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../providers/AppContextProvider */ "./src/providers/AppContextProvider.tsx");
/* harmony import */ var _providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../providers/UserSessionsContextProvider */ "./src/providers/UserSessionsContextProvider.tsx");
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










function UserSession({
  session
}) {
  const {
    usersSessionDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_8__.UserSessionsContext);
  const {
    state: {
      isUserAllowedToDelete
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_AppContextProvider__WEBPACK_IMPORTED_MODULE_7__.AppContext);
  const {
    convertToWPTimezone
  } = (0,_hooks_useTimezone__WEBPACK_IMPORTED_MODULE_6__.useTimezone)();
  const isActive = session.is_active;
  const changeSessionStatus = status => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.changeUserSessionStatusRequest)(session.id, status);
      usersSessionDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.CHANGE_USER_SESSION_STATUS,
        payload: {
          sessionId: session.id,
          status
        }
      });
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to change session status", "quicktasker"));
    }
  });
  const deleteSession = () => __awaiter(this, void 0, void 0, function* () {
    try {
      yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.deleteUserSessionRequest)(session.id);
      usersSessionDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.DELETE_USER_SESSION,
        payload: session.id
      });
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to delete session", "quicktasker"));
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: session.user_name
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "wpqt-italic",
        children: session.user_description
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: convertToWPTimezone(session.created_at_utc)
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      children: convertToWPTimezone(session.expires_at_utc)
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: isActive ? "wpqt-text-qtTextGreen" : "wpqt-text-qtTextRed",
      children: isActive ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("On", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Off", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-flex wpqt-items-center wpqt-gap-4",
      children: [isActive ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "wpqt-icon-red wpqt-size-5 wpqt-cursor-pointer",
        onClick: () => changeSessionStatus(false),
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Turn session off", "quicktasker")
      }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "wpqt-icon-green wpqt-size-5 wpqt-cursor-pointer",
        onClick: () => changeSessionStatus(true),
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Turn session on", "quicktasker")
      }), isUserAllowedToDelete && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
        className: "wpqt-icon-red wpqt-size-5 wpqt-cursor-pointer",
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Delete session", "quicktasker"),
        onClick: deleteSession
      })]
    })]
  });
}


/***/ }),

/***/ "./src/pages/UserSessionsPage/components/UserSessions.tsx":
/*!****************************************************************!*\
  !*** ./src/pages/UserSessionsPage/components/UserSessions.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserSessions: () => (/* binding */ UserSessions)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_filters_useUserSessionsFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/filters/useUserSessionsFilter */ "./src/hooks/filters/useUserSessionsFilter.tsx");
/* harmony import */ var _providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../providers/UserSessionsContextProvider */ "./src/providers/UserSessionsContextProvider.tsx");
/* harmony import */ var _UserSession__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UserSession */ "./src/pages/UserSessionsPage/components/UserSession.tsx");






function UserSessions() {
  const {
    state: {
      userSessions
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserSessionsContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserSessionsContext);
  const {
    filterSessions
  } = (0,_hooks_filters_useUserSessionsFilter__WEBPACK_IMPORTED_MODULE_3__.useUserSessionsFilter)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-mb-4 wpqt-grid wpqt-grid-cols-5 wpqt-font-bold",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Session owner", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Created at", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Expires at", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Status", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Actions", "quicktasker")
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-grid wpqt-grid-cols-5 wpqt-items-center wpqt-gap-y-4",
      children: userSessions.filter(filterSessions).map(session => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserSession__WEBPACK_IMPORTED_MODULE_5__.UserSession, {
        session: session
      }, session.id))
    })]
  });
}


/***/ }),

/***/ "./src/pages/UserTasksPage/UserTasks.tsx":
/*!***********************************************!*\
  !*** ./src/pages/UserTasksPage/UserTasks.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTasks: () => (/* binding */ UserTasks)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Card_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Card/Card */ "./src/components/Card/Card.tsx");
/* harmony import */ var _components_Card_TaskCardActions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Card/TaskCardActions */ "./src/components/Card/TaskCardActions.tsx");
/* harmony import */ var _components_Dropdown_UserAssignementDropdown_UserAssignementDropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Dropdown/UserAssignementDropdown/UserAssignementDropdown */ "./src/components/Dropdown/UserAssignementDropdown/UserAssignementDropdown.tsx");
/* harmony import */ var _components_Dropdown_UserTaskDropdown_UserTaskDropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Dropdown/UserTaskDropdown/UserTaskDropdown */ "./src/components/Dropdown/UserTaskDropdown/UserTaskDropdown.tsx");
/* harmony import */ var _components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/Filter/NoFilterResults/NoFilterResults */ "./src/components/Filter/NoFilterResults/NoFilterResults.tsx");
/* harmony import */ var _components_Modal_TaskModal_TaskModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Modal/TaskModal/TaskModal */ "./src/components/Modal/TaskModal/TaskModal.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hooks/actions/useTaskActions */ "./src/hooks/actions/useTaskActions.ts");
/* harmony import */ var _hooks_filters_useUserTasksFilter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../hooks/filters/useUserTasksFilter */ "./src/hooks/filters/useUserTasksFilter.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _providers_UserTasksContextProvider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../providers/UserTasksContextProvider */ "./src/providers/UserTasksContextProvider.tsx");
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














function UserTasks({
  userId
}) {
  var _a;
  const {
    filterTasks
  } = (0,_hooks_filters_useUserTasksFilter__WEBPACK_IMPORTED_MODULE_11__.useUserTasksFilter)();
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_12__.ModalContext);
  const {
    state: {
      tasks
    },
    userTasksDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserTasksContextProvider__WEBPACK_IMPORTED_MODULE_13__.UserTasksContext);
  const {
    removeTaskFromUser
  } = (0,_hooks_actions_useTaskActions__WEBPACK_IMPORTED_MODULE_10__.useTaskActions)();
  const filteredTasks = (_a = tasks === null || tasks === void 0 ? void 0 : tasks.filter(filterTasks)) !== null && _a !== void 0 ? _a : [];
  const unAssignTask = taskId => __awaiter(this, void 0, void 0, function* () {
    yield removeTaskFromUser(userId, taskId, () => {
      userTasksDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_9__.REMOVE_USER_TASK,
        payload: taskId
      });
    });
  });
  const onEditTaskCallback = task => {
    userTasksDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_9__.EDIT_USER_TASK,
      payload: task
    });
  };
  if (tasks && tasks.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_7__.NoFilterResults, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User has no tasks", "quicktasker")
    });
  }
  if (filteredTasks && filteredTasks.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_7__.NoFilterResults, {});
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "wpqt-card-grid",
      children: filteredTasks.map(task => {
        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCard, {
          className: "wpqt-cursor-pointer",
          title: task.name,
          description: task.description,
          dropdown: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_UserTaskDropdown_UserTaskDropdown__WEBPACK_IMPORTED_MODULE_6__.UserTaskDropdown, {
            taskId: task.id,
            onUnAssignTask: unAssignTask
          }),
          onClick: () => {
            modalDispatch({
              type: _constants__WEBPACK_IMPORTED_MODULE_9__.OPEN_EDIT_TASK_MODAL,
              payload: {
                taskToEdit: task
              }
            });
          },
          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_UserAssignementDropdown_UserAssignementDropdown__WEBPACK_IMPORTED_MODULE_5__.UserAssignementDropdown, {
            task: task,
            onUserAdd: user => {
              userTasksDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_9__.ADD_ASSIGNED_USER_TO_USER_TASK,
                payload: {
                  taskId: task.id,
                  user
                }
              });
            },
            onUserDelete: user => {
              userTasksDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_9__.REMOVE_ASSIGNED_USER_FROM_USER_TASK,
                payload: {
                  taskId: task.id,
                  user
                }
              });
            }
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_TaskCardActions__WEBPACK_IMPORTED_MODULE_4__.TaskCardActions, {
            task: task,
            onDoneStatusChange: (taskId, done) => {
              userTasksDispatch({
                type: _constants__WEBPACK_IMPORTED_MODULE_9__.CHANGE_USER_TASK_DONE_STATUS,
                payload: {
                  taskId,
                  done
                }
              });
            }
          })]
        }, task.id);
      })
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Modal_TaskModal_TaskModal__WEBPACK_IMPORTED_MODULE_8__.TaskModal, {
      editTaskCallback: onEditTaskCallback
    })]
  });
}


/***/ }),

/***/ "./src/pages/UserTasksPage/UserTasksPage.tsx":
/*!***************************************************!*\
  !*** ./src/pages/UserTasksPage/UserTasksPage.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTasksPage: () => (/* binding */ UserTasksPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _components_Filter_UserTasksFilter_UserTasksFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Filter/UserTasksFilter/UserTasksFilter */ "./src/components/Filter/UserTasksFilter/UserTasksFilter.tsx");
/* harmony import */ var _providers_UserTasksContextProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../providers/UserTasksContextProvider */ "./src/providers/UserTasksContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _UserTasks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UserTasks */ "./src/pages/UserTasksPage/UserTasks.tsx");







function UserTasksPage({
  userId
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserTasksContextProvider__WEBPACK_IMPORTED_MODULE_4__.UserTasksContextProvider, {
    userId: userId,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_5__.Page, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_2__.WPQTPageHeader, {
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tasks assigned to user", "quicktasker"),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("User tasks", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_UserTasksFilter_UserTasksFilter__WEBPACK_IMPORTED_MODULE_3__.UserTasksFilter, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserTasks__WEBPACK_IMPORTED_MODULE_6__.UserTasks, {
        userId: userId
      })]
    })
  });
}


/***/ }),

/***/ "./src/pages/UsersPage/UsersPage.tsx":
/*!*******************************************!*\
  !*** ./src/pages/UsersPage/UsersPage.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UsersPage: () => (/* binding */ UsersPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/Cog8ToothIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Filter_UserFilter_UserFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Filter/UserFilter/UserFilter */ "./src/components/Filter/UserFilter/UserFilter.tsx");
/* harmony import */ var _components_Modal_UserModal_UserModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Modal/UserModal/UserModal */ "./src/components/Modal/UserModal/UserModal.tsx");
/* harmony import */ var _components_Modal_UsersSettingsModal_UsersSettingsModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Modal/UsersSettingsModal/UsersSettingsModal */ "./src/components/Modal/UsersSettingsModal/UsersSettingsModal.tsx");
/* harmony import */ var _components_common_Header_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/common/Header/Header */ "./src/components/common/Header/Header.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../constants */ "./src/constants.ts");
/* harmony import */ var _providers_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../providers/LoadingContextProvider */ "./src/providers/LoadingContextProvider.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
/* harmony import */ var _Page_Page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Page/Page */ "./src/pages/Page/Page.tsx");
/* harmony import */ var _components_AddUser_AddUser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/AddUser/AddUser */ "./src/pages/UsersPage/components/AddUser/AddUser.tsx");
/* harmony import */ var _components_UserList_UserList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/UserList/UserList */ "./src/pages/UsersPage/components/UserList/UserList.tsx");
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















function UsersPage() {
  const {
    updateUsers
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_10__.UserContext);
  const {
    loadingDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_8__.LoadingContext);
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_9__.ModalContext);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const updateUsersAsync = () => __awaiter(this, void 0, void 0, function* () {
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_7__.SET_FULL_PAGE_LOADING,
        payload: true
      });
      yield updateUsers();
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_7__.SET_FULL_PAGE_LOADING,
        payload: false
      });
    });
    updateUsersAsync();
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Page_Page__WEBPACK_IMPORTED_MODULE_11__.Page, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Header_Header__WEBPACK_IMPORTED_MODULE_6__.WPQTPageHeader, {
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Create and manage QuickTaskers who can access a mobile-like page to manage their assigned tasks.", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_14__["default"], {
        className: "wpqt-icon-gray wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover",
        onClick: () => {
          modalDispatch({
            type: _constants__WEBPACK_IMPORTED_MODULE_7__.CHANGE_USER_SETTINGS_MODAL_OPEN,
            payload: true
          });
        }
      }),
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("QuickTaskers", "quicktasker")
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_AddUser_AddUser__WEBPACK_IMPORTED_MODULE_12__.AddUser, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_UserFilter_UserFilter__WEBPACK_IMPORTED_MODULE_3__.UserFilter, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_UserList_UserList__WEBPACK_IMPORTED_MODULE_13__.UserList, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Modal_UsersSettingsModal_UsersSettingsModal__WEBPACK_IMPORTED_MODULE_5__.UsersSettingsModal, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Modal_UserModal_UserModal__WEBPACK_IMPORTED_MODULE_4__.UserModal, {})]
  });
}


/***/ }),

/***/ "./src/pages/UsersPage/components/AddUser/AddUser.tsx":
/*!************************************************************!*\
  !*** ./src/pages/UsersPage/components/AddUser/AddUser.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddUser: () => (/* binding */ AddUser)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/UserPlusIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _components_common_Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/common/Button/Button */ "./src/components/common/Button/Button.tsx");
/* harmony import */ var _components_common_Input_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/common/Input/Input */ "./src/components/common/Input/Input.tsx");
/* harmony import */ var _components_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/common/TextArea/TextArea */ "./src/components/common/TextArea/TextArea.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../hooks/actions/useUserActions */ "./src/hooks/actions/useUserActions.ts");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
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











function AddUser() {
  const [showInput, setShowInput] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [userName, setUserName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const [userDescription, setUserDescription] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  const {
    userDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_9__.UserContext);
  const {
    createUser
  } = (0,_hooks_actions_useUserActions__WEBPACK_IMPORTED_MODULE_8__.useUserActions)();
  const onCreateUser = () => __awaiter(this, void 0, void 0, function* () {
    if (!userName) {
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error("User name is required");
      return;
    }
    yield createUser(userName, userDescription, userData => {
      userDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_7__.ADD_USER,
        payload: userData
      });
      clearStatus();
    });
  });
  const clearStatus = () => {
    setUserName("");
    setUserDescription("");
    setShowInput(false);
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-mb-6",
    children: showInput ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "wpqt-w-1/4",
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
        className: "wpqt-mb-2 wpqt-block wpqt-font-semibold",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User name", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Input_Input__WEBPACK_IMPORTED_MODULE_5__.WPQTInput, {
        value: userName,
        onChange: setUserName,
        className: "wpqt-w-full"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
        className: "wpqt-mb-2 wpqt-block wpqt-font-semibold",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("User description", "quicktasker")
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_TextArea_TextArea__WEBPACK_IMPORTED_MODULE_6__.WPQTTextarea, {
        value: userDescription,
        onChange: setUserDescription,
        className: "wpqt-w-full"
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "wpqt-flex wpqt-justify-end wpqt-gap-3",
        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_4__.WPQTIconButton, {
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Cancel", "quicktasker"),
          onClick: clearStatus,
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_10__["default"], {
            className: "wpqt-icon-red wpqt-size-5"
          })
        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_4__.WPQTIconButton, {
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add", "quicktasker"),
          onClick: onCreateUser,
          icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
            className: "wpqt-icon-green wpqt-size-5"
          })
        })]
      })]
    }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_4__.WPQTIconButton, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add User", "quicktasker"),
      onClick: () => setShowInput(true),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_11__["default"], {
        className: "wpqt-icon-green wpqt-size-5"
      })
    })
  });
}


/***/ }),

/***/ "./src/pages/UsersPage/components/UserListItem/UserListItem.tsx":
/*!**********************************************************************!*\
  !*** ./src/pages/UsersPage/components/UserListItem/UserListItem.tsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserListItem: () => (/* binding */ UserListItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/EyeIcon.js");
/* harmony import */ var _heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @heroicons/react/24/outline */ "./node_modules/@heroicons/react/24/outline/esm/PowerIcon.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Card_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Card/Card */ "./src/components/Card/Card.tsx");
/* harmony import */ var _components_Dropdown_UserDropdown_UserDropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Dropdown/UserDropdown/UserDropdown */ "./src/components/Dropdown/UserDropdown/UserDropdown.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.ts");
/* harmony import */ var _hooks_usePageLinks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../hooks/usePageLinks */ "./src/hooks/usePageLinks.tsx");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");









function UserListItem({
  user
}) {
  const {
    userPage
  } = (0,_hooks_usePageLinks__WEBPACK_IMPORTED_MODULE_6__.usePageLinks)();
  const {
    modalDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_7__.ModalContext);
  const userIsActive = user.is_active;
  const userPageLink = userPage + "&code=" + user.page_hash;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCard, {
    title: user.name,
    description: user.description,
    dropdown: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Dropdown_UserDropdown_UserDropdown__WEBPACK_IMPORTED_MODULE_4__.UserDropdown, {
      user: user
    }),
    onClick: () => {
      modalDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.OPEN_EDIT_USER_MODAL,
        payload: user
      });
    },
    className: "wpqt-cursor-pointer",
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCardDataItem, {
      className: "hover:wpqt-underline wpqt-self-start",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Open user page", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: "wpqt-size-5 wpqt-icon-blue"
      }),
      onClick: e => {
        e.stopPropagation();
        window.open(userPageLink, "_blank");
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCardDataItem, {
      className: "hover:wpqt-underline wpqt-self-start",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("View user details", "quicktasker"),
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: "wpqt-size-5 wpqt-icon-blue"
      }),
      onClick: e => {
        e.stopPropagation();
        window.location.hash = `#/users/${user.id}`;
      }
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card_Card__WEBPACK_IMPORTED_MODULE_3__.WPQTCardDataItem, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Status", "quicktasker"),
      value: userIsActive ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Active", "quicktasker") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Disabled", "quicktasker"),
      valueClassName: userIsActive ? "wpqt-text-qtTextGreen wpqt-font-bold" : "wpqt-text-qtTextRed wpqt-font-bold",
      icon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: `wpqt-size-5 ${userIsActive ? "wpqt-icon-green" : "wpqt-icon-red"}`
      })
    })]
  });
}


/***/ }),

/***/ "./src/pages/UsersPage/components/UserList/UserList.tsx":
/*!**************************************************************!*\
  !*** ./src/pages/UsersPage/components/UserList/UserList.tsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserList: () => (/* binding */ UserList)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Filter/NoFilterResults/NoFilterResults */ "./src/components/Filter/NoFilterResults/NoFilterResults.tsx");
/* harmony import */ var _hooks_filters_useUserFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../hooks/filters/useUserFilter */ "./src/hooks/filters/useUserFilter.tsx");
/* harmony import */ var _providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../providers/UserContextProvider */ "./src/providers/UserContextProvider.tsx");
/* harmony import */ var _UserListItem_UserListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../UserListItem/UserListItem */ "./src/pages/UsersPage/components/UserListItem/UserListItem.tsx");







function UserList() {
  const {
    state: {
      users
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserContextProvider__WEBPACK_IMPORTED_MODULE_5__.UserContext);
  const {
    filterUsers
  } = (0,_hooks_filters_useUserFilter__WEBPACK_IMPORTED_MODULE_4__.useUserFilter)();
  const filteredUsers = users.filter(filterUsers);
  if (users && users.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_3__.NoFilterResults, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No users found", "quicktasker")
    });
  }
  if (filteredUsers && filteredUsers.length === 0) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Filter_NoFilterResults_NoFilterResults__WEBPACK_IMPORTED_MODULE_3__.NoFilterResults, {});
  }
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "wpqt-card-grid",
    children: filteredUsers.map(user => {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_UserListItem_UserListItem__WEBPACK_IMPORTED_MODULE_6__.UserListItem, {
        user: user
      }, user.id);
    })
  });
}


/***/ }),

/***/ "./src/providers/ActivePipelineContextProvider.tsx":
/*!*********************************************************!*\
  !*** ./src/providers/ActivePipelineContextProvider.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActivePipelineContext: () => (/* binding */ ActivePipelineContext),
/* harmony export */   ActivePipelineContextProvider: () => (/* binding */ ActivePipelineContextProvider)
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
/* harmony import */ var _reducers_active_pipeline_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers/active-pipeline-reducer */ "./src/reducers/active-pipeline-reducer.ts");
/* harmony import */ var _LoadingContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LoadingContextProvider */ "./src/providers/LoadingContextProvider.tsx");
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
  loading: false,
  activePipeline: null
};
const ActivePipelineContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  dispatch: () => {},
  fetchAndSetPipelineData: () => Promise.resolve()
});
const ActivePipelineContextProvider = ({
  children
}) => {
  const [state, dispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_active_pipeline_reducer__WEBPACK_IMPORTED_MODULE_6__.activePipelineReducer, initialState);
  const {
    loadingDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_7__.LoadingContext);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const initialActivePipelineId = window.wpqt.initialActivePipelineId;
    if (initialActivePipelineId) {
      fetchAndSetPipelineData(initialActivePipelineId, true);
    }
  }, []);
  const setLoadingState = (isLoading, fullPageLoading) => {
    if (fullPageLoading) {
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_FULL_PAGE_LOADING,
        payload: isLoading
      });
    } else {
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.PIPELINE_SET_LOADING,
        payload: isLoading
      });
    }
  };
  const fetchAndSetPipelineData = (pipelineId_1, ...args_1) => __awaiter(void 0, [pipelineId_1, ...args_1], void 0, function* (pipelineId, fullPageLoading = false) {
    try {
      setLoadingState(true, fullPageLoading);
      const {
        data: {
          pipeline
        }
      } = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getPipelineData)(pipelineId);
      dispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.PIPELINE_SET_PIPELINE,
        payload: pipeline
      });
    } catch (e) {
      console.error(e);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Unable to load the board. Please try again later.", "quicktasker"));
    } finally {
      setLoadingState(false, fullPageLoading);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ActivePipelineContext.Provider, {
    value: {
      state,
      dispatch,
      fetchAndSetPipelineData
    },
    children: children
  });
};


/***/ }),

/***/ "./src/providers/AppContextProvider.tsx":
/*!**********************************************!*\
  !*** ./src/providers/AppContextProvider.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppContext: () => (/* binding */ AppContext),
/* harmony export */   AppContextProvider: () => (/* binding */ AppContextProvider)
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
  userPageCustomStyles: ""
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
    appDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_2__.INIT_APP_STATE,
      payload: {
        siteURL,
        publicUserPageId,
        timezone,
        isUserAllowedToDelete,
        userPageCustomStyles,
        pluginURL
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

/***/ "./src/providers/ArchiveContextProvider.tsx":
/*!**************************************************!*\
  !*** ./src/providers/ArchiveContextProvider.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArchiveContext: () => (/* binding */ ArchiveContext),
/* harmony export */   ArchiveContextProvider: () => (/* binding */ ArchiveContextProvider)
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
/* harmony import */ var _reducers_archive_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers/archive-reducer */ "./src/reducers/archive-reducer.ts");
/* harmony import */ var _types_enums__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../types/enums */ "./src/types/enums.tsx");
/* harmony import */ var _LoadingContextProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LoadingContextProvider */ "./src/providers/LoadingContextProvider.tsx");
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
  archivedTasks: null,
  archiveLoading: false,
  archiveSearchValue: "",
  archiveFilteredPipelineId: "",
  archiveTaskDoneFilter: _types_enums__WEBPACK_IMPORTED_MODULE_7__.WPQTArchiveDoneFilter.All
};
const ArchiveContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  archiveDispatch: () => {}
});
const ArchiveContextProvider = ({
  children
}) => {
  const [state, archiveDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_archive_reducer__WEBPACK_IMPORTED_MODULE_6__.reducer, initialState);
  const {
    loadingDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_8__.LoadingContext);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchAndSetArchivedTasks();
  }, []);
  const fetchAndSetArchivedTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_FULL_PAGE_LOADING,
        payload: true
      });
      const {
        data
      } = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getArchivedTasksRequest)();
      archiveDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_ARCHIVE_TASKS,
        payload: data
      });
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to fetch archived tasks", "quicktasker"));
    } finally {
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_FULL_PAGE_LOADING,
        payload: false
      });
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ArchiveContext.Provider, {
    value: {
      state,
      archiveDispatch
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
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getCustomFieldsRequest)(entityId, entityType);
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

/***/ "./src/providers/LoadingContextProvider.tsx":
/*!**************************************************!*\
  !*** ./src/providers/LoadingContextProvider.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingContext: () => (/* binding */ LoadingContext),
/* harmony export */   LoadingContextProvider: () => (/* binding */ LoadingContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers_loading_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/loading-reducer */ "./src/reducers/loading-reducer.ts");



const initialState = {
  fullPageLoading: false
};
const LoadingContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  loadingDispatch: () => {}
});
const LoadingContextProvider = ({
  children
}) => {
  const [state, loadingDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_loading_reducer__WEBPACK_IMPORTED_MODULE_2__.reducer, initialState);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LoadingContext.Provider, {
    value: {
      state,
      loadingDispatch
    },
    children: children
  });
};


/***/ }),

/***/ "./src/providers/ModalContextProvider.tsx":
/*!************************************************!*\
  !*** ./src/providers/ModalContextProvider.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalContext: () => (/* binding */ ModalContext),
/* harmony export */   ModalContextProvider: () => (/* binding */ ModalContextProvider),
/* harmony export */   initialState: () => (/* binding */ initialState)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers_modal_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/modal-reducer */ "./src/reducers/modal-reducer.ts");



const initialState = {
  taskModalOpen: false,
  targetStageId: "",
  taskToEdit: null,
  taskModalSettings: {
    allowToMarkTaskAsDone: true
  },
  stageModalOpen: false,
  stageToEdit: null,
  targetPipelineId: "",
  pipelineModalOpen: false,
  newPipelineModalOpen: false,
  pipelineToEdit: null,
  archiveTaskModalOpen: false,
  archiveModalTask: null,
  userModalOpen: false,
  userToEdit: null,
  userSettingsModalOpen: false
};
const ModalContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  modalDispatch: () => {}
});
const ModalContextProvider = ({
  children
}) => {
  const [state, modalDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_modal_reducer__WEBPACK_IMPORTED_MODULE_2__.reducer, initialState);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ModalContext.Provider, {
    value: {
      state,
      modalDispatch
    },
    children: children
  });
};


/***/ }),

/***/ "./src/providers/PipelinesContextProvider.tsx":
/*!****************************************************!*\
  !*** ./src/providers/PipelinesContextProvider.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelinesContext: () => (/* binding */ PipelinesContext),
/* harmony export */   PipelinesContextProvider: () => (/* binding */ PipelinesContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _reducers_pipelines_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/pipelines-reducer */ "./src/reducers/pipelines-reducer.ts");




const initialState = {
  pipelines: []
};
const PipelinesContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  pipelinesDispatch: () => {}
});
const PipelinesContextProvider = ({
  children
}) => {
  const [state, pipelinesDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_pipelines_reducer__WEBPACK_IMPORTED_MODULE_3__.reducer, initialState);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const initialPipelines = window.wpqt.initialPipelines;
    pipelinesDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_2__.PIPELINES_SET,
      payload: initialPipelines
    });
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PipelinesContext.Provider, {
    value: {
      state,
      pipelinesDispatch
    },
    children: children
  });
};


/***/ }),

/***/ "./src/providers/UserContextProvider.tsx":
/*!***********************************************!*\
  !*** ./src/providers/UserContextProvider.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserContext: () => (/* binding */ UserContext),
/* harmony export */   UserContextProvider: () => (/* binding */ UserContextProvider)
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
/* harmony import */ var _reducers_user_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers/user-reducer */ "./src/reducers/user-reducer.ts");
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
  users: [],
  usersSearchValue: ""
};
const UserContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  userDispatch: () => {},
  updateUsers: () => __awaiter(void 0, void 0, void 0, function* () {})
});
const UserContextProvider = ({
  children
}) => {
  const [state, userDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_reducer__WEBPACK_IMPORTED_MODULE_6__.reducer, initialState);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const initialUsers = window.wpqt.initialUsers;
    userDispatch({
      type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_USERS,
      payload: initialUsers
    });
  }, []);
  const updateUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getUsersRequest)();
      userDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_USERS,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to fetch users", "quicktasker"));
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserContext.Provider, {
    value: {
      state,
      userDispatch,
      updateUsers
    },
    children: children
  });
};


/***/ }),

/***/ "./src/providers/UserSessionsContextProvider.tsx":
/*!*******************************************************!*\
  !*** ./src/providers/UserSessionsContextProvider.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserSessionsContext: () => (/* binding */ UserSessionsContext),
/* harmony export */   UserSessionsContextProvider: () => (/* binding */ UserSessionsContextProvider)
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
/* harmony import */ var _reducers_user_sessions_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers/user-sessions-reducer */ "./src/reducers/user-sessions-reducer.ts");
/* harmony import */ var _LoadingContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LoadingContextProvider */ "./src/providers/LoadingContextProvider.tsx");
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
  sessionsSearchValue: "",
  userSessions: []
};
const UserSessionsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  usersSessionDispatch: () => {},
  loadUserSessions: () => __awaiter(void 0, void 0, void 0, function* () {})
});
const UserSessionsContextProvider = ({
  children
}) => {
  const [state, usersSessionDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_sessions_reducer__WEBPACK_IMPORTED_MODULE_6__.reducer, initialState);
  const {
    loadingDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_7__.LoadingContext);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadUserSessions();
  }, []);
  const loadUserSessions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_FULL_PAGE_LOADING,
        payload: true
      });
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getUserSessionsRequest)();
      usersSessionDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_USER_SESSIONS,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to fetch user sessions", "quicktasker"));
    } finally {
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_FULL_PAGE_LOADING,
        payload: false
      });
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserSessionsContext.Provider, {
    value: {
      state,
      usersSessionDispatch,
      loadUserSessions
    },
    children: children
  });
};


/***/ }),

/***/ "./src/providers/UserTasksContextProvider.tsx":
/*!****************************************************!*\
  !*** ./src/providers/UserTasksContextProvider.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTasksContext: () => (/* binding */ UserTasksContext),
/* harmony export */   UserTasksContextProvider: () => (/* binding */ UserTasksContextProvider)
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
/* harmony import */ var _reducers_user_tasks_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../reducers/user-tasks-reducer */ "./src/reducers/user-tasks-reducer.ts");
/* harmony import */ var _LoadingContextProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LoadingContextProvider */ "./src/providers/LoadingContextProvider.tsx");
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
  tasks: [],
  searchValue: "",
  filteredPipelineId: ""
};
const UserTasksContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  userTasksDispatch: () => {},
  fetchAndSetUserTasks: () => __awaiter(void 0, void 0, void 0, function* () {})
});
const UserTasksContextProvider = ({
  children,
  userId
}) => {
  const [state, userTasksDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_tasks_reducer__WEBPACK_IMPORTED_MODULE_6__.reducer, initialState);
  const {
    loadingDispatch
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_LoadingContextProvider__WEBPACK_IMPORTED_MODULE_7__.LoadingContext);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchAndSetUserTasks();
  }, []);
  const fetchAndSetUserTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_FULL_PAGE_LOADING,
        payload: true
      });
      const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_4__.getUserTasksRequest)(userId);
      userTasksDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_USER_TASKS,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
      react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Failed to fetch user tasks", "quicktasker"));
    } finally {
      loadingDispatch({
        type: _constants__WEBPACK_IMPORTED_MODULE_5__.SET_FULL_PAGE_LOADING,
        payload: false
      });
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserTasksContext.Provider, {
    value: {
      state,
      userTasksDispatch,
      fetchAndSetUserTasks
    },
    children: children
  });
};


/***/ }),

/***/ "./src/reducers/active-pipeline-reducer.ts":
/*!*************************************************!*\
  !*** ./src/reducers/active-pipeline-reducer.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activePipelineReducer: () => (/* binding */ activePipelineReducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/pipeline-settings */ "./src/utils/pipeline-settings.ts");
/* harmony import */ var _utils_stage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/stage */ "./src/utils/stage.ts");
/* harmony import */ var _utils_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/task */ "./src/utils/task.ts");




const activePipelineReducer = (state, action) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_SET_LOADING:
      return Object.assign(Object.assign({}, state), {
        loading: action.payload
      });
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_SET_PIPELINE:
      {
        const pipelineData = action.payload;
        const transformedStages = (pipelineData.stages || []).map(stage => {
          return Object.assign({}, (0,_utils_stage__WEBPACK_IMPORTED_MODULE_2__.convertStageFromServer)(stage));
        });
        const transformedSettings = pipelineData.settings ? (0,_utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_1__.convertPipelineSettingsFromServer)(pipelineData.settings) : undefined;
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, pipelineData), {
            stages: transformedStages,
            settings: transformedSettings,
            is_primary: pipelineData.is_primary === "1"
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_MOVE_TASK:
      {
        if (!state.activePipeline || !state.activePipeline.stages) {
          return state;
        }
        const stages = (0,_utils_task__WEBPACK_IMPORTED_MODULE_3__.moveTask)(state.activePipeline.stages, action.payload.source, action.payload.destination);
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_REORDER_TASK:
      {
        const {
          source,
          destination
        } = action.payload;
        const targetStageId = destination.droppableId;
        const targetIndex = destination.index;
        if (!state.activePipeline) {
          return state;
        }
        const targetStage = (_a = state.activePipeline.stages) === null || _a === void 0 ? void 0 : _a.find(stage => stage.id === targetStageId);
        if (!targetStage || !targetStage.tasks) {
          return state;
        }
        const reorderedTasks = (0,_utils_task__WEBPACK_IMPORTED_MODULE_3__.reorderTask)(targetStage.tasks, source.index, targetIndex);
        const updatedStages = (_b = state.activePipeline.stages) === null || _b === void 0 ? void 0 : _b.map(stage => stage.id === targetStageId ? Object.assign(Object.assign({}, stage), {
          tasks: reorderedTasks
        }) : stage);
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: updatedStages
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_ADD_TASK:
      {
        const newTask = (0,_utils_task__WEBPACK_IMPORTED_MODULE_3__.convertTaskFromServer)(action.payload);
        if (!state.activePipeline) {
          return state;
        }
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: (_c = state.activePipeline.stages) === null || _c === void 0 ? void 0 : _c.map(stage => stage.id === newTask.stage_id ? Object.assign(Object.assign({}, stage), {
              tasks: [...(stage.tasks || []), newTask]
            }) : stage)
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_EDIT_TASK:
      {
        const editedTask = (0,_utils_task__WEBPACK_IMPORTED_MODULE_3__.convertTaskFromServer)(action.payload);
        if (!state.activePipeline) {
          return state;
        }
        const updatedStages = (_d = state.activePipeline.stages) === null || _d === void 0 ? void 0 : _d.map(stage => {
          var _a;
          return stage.id === editedTask.stage_id ? Object.assign(Object.assign({}, stage), {
            tasks: (_a = stage.tasks) === null || _a === void 0 ? void 0 : _a.map(task => task.id === editedTask.id ? editedTask : task)
          }) : stage;
        });
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: updatedStages
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_ADD_STAGE:
      {
        const stage = action.payload;
        if (!state.activePipeline) {
          return state;
        }
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: [...(state.activePipeline.stages || []), stage]
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_EDIT_STAGE:
      {
        const updatedStage = action.payload;
        if (!state.activePipeline) {
          return state;
        }
        const updateStage = stage => {
          if (stage.id === updatedStage.id) {
            return Object.assign(Object.assign({}, stage), {
              name: updatedStage.name,
              description: updatedStage.description
            });
          }
          return stage;
        };
        const updatedStages = (_e = state.activePipeline.stages) === null || _e === void 0 ? void 0 : _e.map(updateStage);
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: updatedStages
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_DELETE_STAGE:
      {
        const deletedStageId = action.payload;
        if (!state.activePipeline) {
          return state;
        }
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: (_f = state.activePipeline.stages) === null || _f === void 0 ? void 0 : _f.filter(stage => stage.id !== deletedStageId)
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_ADD_USER_TO_TASK:
      {
        const {
          taskId,
          user
        } = action.payload;
        if (!state.activePipeline) {
          return state;
        }
        const updatedStages = (_g = state.activePipeline.stages) === null || _g === void 0 ? void 0 : _g.map(stage => {
          var _a;
          const updatedTasks = (_a = stage.tasks) === null || _a === void 0 ? void 0 : _a.map(task => {
            if (task.id === taskId) {
              return Object.assign(Object.assign({}, task), {
                assigned_users: [user, ...(task.assigned_users || [])]
              });
            }
            return task;
          });
          return Object.assign(Object.assign({}, stage), {
            tasks: updatedTasks
          });
        });
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: updatedStages
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_REMOVE_USER_FROM_TASK:
      {
        const {
          taskId,
          userId
        } = action.payload;
        if (!state.activePipeline) {
          return state;
        }
        const updatedStages = (_h = state.activePipeline.stages) === null || _h === void 0 ? void 0 : _h.map(stage => {
          var _a;
          const updatedTasks = (_a = stage.tasks) === null || _a === void 0 ? void 0 : _a.map(task => {
            var _a;
            if (task.id === taskId) {
              return Object.assign(Object.assign({}, task), {
                assigned_users: (_a = task.assigned_users) === null || _a === void 0 ? void 0 : _a.filter(user => user.id !== userId)
              });
            }
            return task;
          });
          return Object.assign(Object.assign({}, stage), {
            tasks: updatedTasks
          });
        });
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: updatedStages
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_EDIT_PIPELINE:
      {
        const updatedPipeline = action.payload;
        if (!state.activePipeline) {
          return state;
        }
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            name: updatedPipeline.name,
            description: updatedPipeline.description,
            is_primary: updatedPipeline.is_primary === "1"
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_CHANGE_TASK_DONE_STATUS:
      {
        const {
          taskId,
          done
        } = action.payload;
        if (!state.activePipeline) {
          return state;
        }
        const updatedStages = (_j = state.activePipeline.stages) === null || _j === void 0 ? void 0 : _j.map(stage => {
          var _a;
          const updatedTasks = (_a = stage.tasks) === null || _a === void 0 ? void 0 : _a.map(task => {
            if (task.id === taskId) {
              return Object.assign(Object.assign({}, task), {
                is_done: done
              });
            }
            return task;
          });
          return Object.assign(Object.assign({}, stage), {
            tasks: updatedTasks
          });
        });
        return Object.assign(Object.assign({}, state), {
          activePipeline: Object.assign(Object.assign({}, state.activePipeline), {
            stages: updatedStages
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_REMOVE_ACTIVE_PIPELINE:
      {
        return Object.assign(Object.assign({}, state), {
          activePipeline: null
        });
      }
    default:
      return state;
  }
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
          pluginURL
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          siteURL,
          publicUserPageId,
          timezone,
          isUserAllowedToDelete,
          userPageCustomStyles,
          pluginURL
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

/***/ "./src/reducers/archive-reducer.ts":
/*!*****************************************!*\
  !*** ./src/reducers/archive-reducer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _utils_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/task */ "./src/utils/task.ts");


const reducer = (state, action) => {
  var _a, _b, _c, _d, _e;
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_ARCHIVE_TASKS:
      {
        const archivedTasks = action.payload;
        return Object.assign(Object.assign({}, state), {
          archivedTasks: archivedTasks.map(_utils_task__WEBPACK_IMPORTED_MODULE_1__.convertTaskFromServer)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_ARCHIVE_SEARCH_VALUE:
      {
        const archiveSearchValue = action.payload;
        return Object.assign(Object.assign({}, state), {
          archiveSearchValue
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_ARCHIVE_FILTERED_PIPELINE:
      {
        const archiveFilteredPipelineId = action.payload;
        return Object.assign(Object.assign({}, state), {
          archiveFilteredPipelineId
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.REMOVE_ARCHIVED_TASK:
      {
        const archivedTasks = ((_a = state.archivedTasks) !== null && _a !== void 0 ? _a : []).filter(task => task.id !== action.payload);
        return Object.assign(Object.assign({}, state), {
          archivedTasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.ADD_ASSIGNED_USER_TO_ARCHIVED_TASK:
      {
        const {
          taskId,
          user
        } = action.payload;
        const archivedTasks = ((_b = state.archivedTasks) !== null && _b !== void 0 ? _b : []).map(task => {
          if (task.id === taskId) {
            return Object.assign(Object.assign({}, task), {
              assigned_users: [user, ...task.assigned_users]
            });
          }
          return task;
        });
        return Object.assign(Object.assign({}, state), {
          archivedTasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.REMOVE_ASSINGED_USER_FROM_ARCHIVED_TASK:
      {
        const {
          taskId,
          user
        } = action.payload;
        const archivedTasks = ((_c = state.archivedTasks) !== null && _c !== void 0 ? _c : []).map(task => {
          if (task.id === taskId) {
            return Object.assign(Object.assign({}, task), {
              assigned_users: task.assigned_users.filter(assignedUser => assignedUser.id !== user.id)
            });
          }
          return task;
        });
        return Object.assign(Object.assign({}, state), {
          archivedTasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_ARCHIVED_TASK_DONE_STATUS:
      {
        const {
          taskId,
          done
        } = action.payload;
        const archivedTasks = ((_d = state.archivedTasks) !== null && _d !== void 0 ? _d : []).map(task => {
          if (task.id === taskId) {
            return Object.assign(Object.assign({}, task), {
              is_done: done
            });
          }
          return task;
        });
        return Object.assign(Object.assign({}, state), {
          archivedTasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.EDIT_ARCHIVED_TASK:
      {
        const editedTask = action.payload;
        const archivedTasks = ((_e = state.archivedTasks) !== null && _e !== void 0 ? _e : []).map(task => {
          if (task.id === editedTask.id) {
            return (0,_utils_task__WEBPACK_IMPORTED_MODULE_1__.convertTaskFromServer)(editedTask);
          }
          return task;
        });
        return Object.assign(Object.assign({}, state), {
          archivedTasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_ARCHIVE_TASK_DONE_FILTER:
      {
        const archiveTaskDoneFilter = action.payload;
        return Object.assign(Object.assign({}, state), {
          archiveTaskDoneFilter
        });
      }
    default:
      {
        return state;
      }
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

/***/ "./src/reducers/loading-reducer.ts":
/*!*****************************************!*\
  !*** ./src/reducers/loading-reducer.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");

const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_FULL_PAGE_LOADING:
      {
        const fullPageLoading = action.payload;
        return Object.assign(Object.assign({}, state), {
          fullPageLoading
        });
      }
    default:
      {
        return state;
      }
  }
};


/***/ }),

/***/ "./src/reducers/modal-reducer.ts":
/*!***************************************!*\
  !*** ./src/reducers/modal-reducer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../providers/ModalContextProvider */ "./src/providers/ModalContextProvider.tsx");


const closeModal = () => {
  return Object.assign({}, _providers_ModalContextProvider__WEBPACK_IMPORTED_MODULE_1__.initialState);
};
const reducer = (state, action) => {
  var _a, _b, _c, _d;
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.OPEN_EDIT_TASK_MODAL:
      {
        const {
          taskToEdit,
          taskModalSettings
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          taskModalOpen: true,
          taskToEdit,
          targetStageId: taskToEdit.stage_id,
          taskModalSettings: Object.assign(Object.assign({}, state.taskModalSettings), taskModalSettings)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CLOSE_TASK_MODAL:
      {
        return closeModal();
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.ADD_ASSIGNED_USER_TO_EDITING_TASK:
      {
        const user = action.payload;
        return Object.assign(Object.assign({}, state), {
          taskToEdit: Object.assign(Object.assign({}, state.taskToEdit), {
            assigned_users: [user, ...((_b = (_a = state.taskToEdit) === null || _a === void 0 ? void 0 : _a.assigned_users) !== null && _b !== void 0 ? _b : [])]
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.REMOVE_ASSIGNED_USER_FROM_EDITING_TASK:
      {
        const user = action.payload;
        return Object.assign(Object.assign({}, state), {
          taskToEdit: Object.assign(Object.assign({}, state.taskToEdit), {
            assigned_users: ((_d = (_c = state.taskToEdit) === null || _c === void 0 ? void 0 : _c.assigned_users) !== null && _d !== void 0 ? _d : []).filter(assignedUser => assignedUser.id !== user.id)
          })
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.OPEN_NEW_STAGE_MODAL:
      {
        const {
          targetPipelineId
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          stageModalOpen: true,
          targetPipelineId
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.OPEN_STAGE_EDIT_MODAL:
      {
        const {
          stageToEdit
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          stageModalOpen: true,
          stageToEdit
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CLOSE_STAGE_MODAL:
      {
        return closeModal();
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.OPEN_NEW_PIPELINE_MODAL:
      {
        return Object.assign(Object.assign({}, state), {
          newPipelineModalOpen: true
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.OPEN_EDIT_PIPELINE_MODAL:
      {
        const {
          pipelineToEdit
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          pipelineModalOpen: true,
          pipelineToEdit
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CLOSE_PIPELINE_MODAL:
      {
        return closeModal();
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.OPEN_ARCHIVE_TASK_MODAL:
      {
        const archiveTask = action.payload;
        return Object.assign(Object.assign({}, state), {
          archiveTaskModalOpen: true,
          archiveModalTask: archiveTask
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CLOSE_ARCHIVE_TASK_MODAL:
      {
        return closeModal();
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.OPEN_NEW_USER_MODAL:
      {
        return Object.assign(Object.assign({}, state), {
          userModalOpen: true
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.OPEN_EDIT_USER_MODAL:
      {
        const userToEdit = action.payload;
        return Object.assign(Object.assign({}, state), {
          userModalOpen: true,
          userToEdit
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CLOSE_USER_MODAL:
      {
        return closeModal();
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_USER_SETTINGS_MODAL_OPEN:
      {
        const open = action.payload;
        if (open) {
          return Object.assign(Object.assign({}, state), {
            userSettingsModalOpen: true
          });
        }
        return closeModal();
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_TASK_DONE_STATUS:
      {
        const {
          done
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          taskToEdit: Object.assign(Object.assign({}, state.taskToEdit), {
            is_done: done
          })
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "./src/reducers/pipelines-reducer.ts":
/*!*******************************************!*\
  !*** ./src/reducers/pipelines-reducer.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/pipeline-settings */ "./src/utils/pipeline-settings.ts");
/* harmony import */ var _utils_stage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/stage */ "./src/utils/stage.ts");



const reducer = (state, action) => {
  var _a;
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINES_SET:
      {
        const pipelines = action.payload;
        const transformStage = stage => {
          return Object.assign({}, (0,_utils_stage__WEBPACK_IMPORTED_MODULE_2__.convertStageFromServer)(stage));
        };
        const transformPipeline = pipeline => {
          var _a;
          return Object.assign(Object.assign({}, pipeline), {
            stages: (_a = pipeline.stages) === null || _a === void 0 ? void 0 : _a.map(transformStage),
            settings: pipeline.settings ? (0,_utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_1__.convertPipelineSettingsFromServer)(pipeline.settings) : undefined,
            is_primary: pipeline.is_primary === "1"
          });
        };
        return Object.assign(Object.assign({}, state), {
          pipelines: pipelines.map(transformPipeline)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_ADD_PIPELINE:
      {
        const pipeline = action.payload;
        const transformStage = stage => {
          return Object.assign({}, (0,_utils_stage__WEBPACK_IMPORTED_MODULE_2__.convertStageFromServer)(stage));
        };
        const transformedPipeline = Object.assign(Object.assign({}, pipeline), {
          stages: (_a = pipeline.stages) === null || _a === void 0 ? void 0 : _a.map(transformStage),
          settings: pipeline.settings ? (0,_utils_pipeline_settings__WEBPACK_IMPORTED_MODULE_1__.convertPipelineSettingsFromServer)(pipeline.settings) : undefined,
          is_primary: false
        });
        return Object.assign(Object.assign({}, state), {
          pipelines: [...state.pipelines, transformedPipeline]
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_SET_PRIMARY:
      {
        const primaryPipelineId = action.payload;
        return Object.assign(Object.assign({}, state), {
          pipelines: state.pipelines.map(pipeline => Object.assign(Object.assign({}, pipeline), {
            is_primary: pipeline.id === primaryPipelineId
          }))
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_EDIT_PIPELINE:
      {
        const pipeline = action.payload;
        return Object.assign(Object.assign({}, state), {
          pipelines: state.pipelines.map(p => p.id === pipeline.id ? pipeline : p)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.PIPELINE_REMOVE_PIPELINE:
      {
        const pipelineId = action.payload;
        return Object.assign(Object.assign({}, state), {
          pipelines: state.pipelines.filter(pipeline => pipeline.id !== pipelineId)
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "./src/reducers/user-reducer.ts":
/*!**************************************!*\
  !*** ./src/reducers/user-reducer.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _utils_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/user */ "./src/utils/user.ts");


const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USERS:
      {
        const serverUsers = action.payload;
        const users = serverUsers.map(_utils_user__WEBPACK_IMPORTED_MODULE_1__.convertUserFromServer);
        return Object.assign(Object.assign({}, state), {
          users
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.ADD_USER:
      {
        const serverUser = action.payload;
        const user = (0,_utils_user__WEBPACK_IMPORTED_MODULE_1__.convertUserFromServer)(serverUser);
        return Object.assign(Object.assign({}, state), {
          users: [...state.users, user]
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.EDIT_USER:
      {
        const editedServerUser = action.payload;
        const editedUser = (0,_utils_user__WEBPACK_IMPORTED_MODULE_1__.convertUserFromServer)(editedServerUser);
        const users = state.users.map(user => user.id === editedUser.id ? editedUser : user);
        return Object.assign(Object.assign({}, state), {
          users
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_USER_STATUS:
      {
        const {
          isActive,
          userId
        } = action.payload;
        const users = state.users.map(user => user.id === userId ? Object.assign(Object.assign({}, user), {
          is_active: isActive
        }) : user);
        return Object.assign(Object.assign({}, state), {
          users
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.RESET_PASSWORD:
      {
        const userId = action.payload;
        const users = state.users.map(user => user.id === userId ? Object.assign(Object.assign({}, user), {
          has_password: false
        }) : user);
        return Object.assign(Object.assign({}, state), {
          users
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.DELETE_USER:
      {
        const userId = action.payload;
        const users = state.users.filter(user => user.id !== userId);
        return Object.assign(Object.assign({}, state), {
          users
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USERS_SEARCH_VALUE:
      {
        const usersSearchValue = action.payload;
        return Object.assign(Object.assign({}, state), {
          usersSearchValue
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "./src/reducers/user-sessions-reducer.ts":
/*!***********************************************!*\
  !*** ./src/reducers/user-sessions-reducer.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _utils_user_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/user-session */ "./src/utils/user-session.ts");


const reducer = (state, action) => {
  var _a;
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_SESSIONS_SEARCH_VALUE:
      {
        return Object.assign(Object.assign({}, state), {
          sessionsSearchValue: (_a = action.payload) !== null && _a !== void 0 ? _a : ""
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_SESSIONS:
      {
        const userSessions = action.payload.map(_utils_user_session__WEBPACK_IMPORTED_MODULE_1__.convertUserSessionFromServer);
        return Object.assign(Object.assign({}, state), {
          userSessions
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_USER_SESSION_STATUS:
      {
        const {
          sessionId,
          status
        } = action.payload;
        return Object.assign(Object.assign({}, state), {
          userSessions: state.userSessions.map(session => session.id === sessionId ? Object.assign(Object.assign({}, session), {
            is_active: status
          }) : session)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.DELETE_USER_SESSION:
      {
        const sessionId = action.payload;
        return Object.assign(Object.assign({}, state), {
          userSessions: state.userSessions.filter(session => session.id !== sessionId)
        });
      }
    default:
      {
        return state;
      }
  }
};


/***/ }),

/***/ "./src/reducers/user-tasks-reducer.ts":
/*!********************************************!*\
  !*** ./src/reducers/user-tasks-reducer.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _utils_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/task */ "./src/utils/task.ts");


const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_TASKS:
      {
        const payload = action.payload;
        const tasks = payload.map(_utils_task__WEBPACK_IMPORTED_MODULE_1__.convertTaskFromServer);
        return Object.assign(Object.assign({}, state), {
          tasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.REMOVE_USER_TASK:
      {
        const taskId = action.payload;
        return Object.assign(Object.assign({}, state), {
          tasks: state.tasks.filter(task => task.id !== taskId)
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.EDIT_USER_TASK:
      {
        const task = action.payload;
        const updatedTasks = state.tasks.map(t => {
          if (t.id === task.id) {
            return (0,_utils_task__WEBPACK_IMPORTED_MODULE_1__.convertTaskFromServer)(task);
          }
          return t;
        });
        return Object.assign(Object.assign({}, state), {
          tasks: updatedTasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_TASKS_SEARCH_VALUE:
      {
        const searchValue = action.payload;
        return Object.assign(Object.assign({}, state), {
          searchValue
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_TASKS_FILTERED_PIPELINE:
      {
        const filteredPipelineId = action.payload;
        return Object.assign(Object.assign({}, state), {
          filteredPipelineId
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.ADD_ASSIGNED_USER_TO_USER_TASK:
      {
        const {
          taskId,
          user
        } = action.payload;
        const updatedTasks = state.tasks.map(task => {
          if (task.id === taskId) {
            return Object.assign(Object.assign({}, task), {
              assigned_users: [user, ...task.assigned_users]
            });
          }
          return task;
        });
        return Object.assign(Object.assign({}, state), {
          tasks: updatedTasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.REMOVE_ASSIGNED_USER_FROM_USER_TASK:
      {
        const {
          taskId,
          user
        } = action.payload;
        const updatedTasks = state.tasks.map(task => {
          if (task.id === taskId) {
            return Object.assign(Object.assign({}, task), {
              assigned_users: task.assigned_users.filter(assignedUser => assignedUser.id !== user.id)
            });
          }
          return task;
        });
        return Object.assign(Object.assign({}, state), {
          tasks: updatedTasks
        });
      }
    case _constants__WEBPACK_IMPORTED_MODULE_0__.CHANGE_USER_TASK_DONE_STATUS:
      {
        const {
          taskId,
          done
        } = action.payload;
        const updatedTasks = state.tasks.map(task => {
          if (task.id === taskId) {
            return Object.assign(Object.assign({}, task), {
              is_done: done
            });
          }
          return task;
        });
        return Object.assign(Object.assign({}, state), {
          tasks: updatedTasks
        });
      }
    default:
      return state;
  }
};


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

/***/ "./src/types/enums.tsx":
/*!*****************************!*\
  !*** ./src/types/enums.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WPQTArchiveDoneFilter: () => (/* binding */ WPQTArchiveDoneFilter),
/* harmony export */   WPQTLogCreatedBy: () => (/* binding */ WPQTLogCreatedBy),
/* harmony export */   WPQTTypes: () => (/* binding */ WPQTTypes)
/* harmony export */ });
var WPQTTypes;
(function (WPQTTypes) {
  WPQTTypes["Task"] = "task";
  WPQTTypes["User"] = "user";
})(WPQTTypes || (WPQTTypes = {}));
var WPQTLogCreatedBy;
(function (WPQTLogCreatedBy) {
  WPQTLogCreatedBy["System"] = "system";
  WPQTLogCreatedBy["Admin"] = "admin";
  WPQTLogCreatedBy["WPQTUser"] = "quicktasker_user";
})(WPQTLogCreatedBy || (WPQTLogCreatedBy = {}));
var WPQTArchiveDoneFilter;
(function (WPQTArchiveDoneFilter) {
  WPQTArchiveDoneFilter["All"] = "all";
  WPQTArchiveDoneFilter["Completed"] = "completed";
  WPQTArchiveDoneFilter["NotCompleted"] = "not completed";
})(WPQTArchiveDoneFilter || (WPQTArchiveDoneFilter = {}));


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

/***/ "./src/utils/statistics.ts":
/*!*********************************!*\
  !*** ./src/utils/statistics.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasEnoughDataCheck: () => (/* binding */ hasEnoughDataCheck)
/* harmony export */ });
function hasEnoughDataCheck(stagesPieChartData) {
  const stages = stagesPieChartData.slice(1);
  const hasAtLeastOneStageWithTasks = stages.some(stage => stage[1] > 0);
  return stagesPieChartData.length > 1 && hasAtLeastOneStageWithTasks;
}

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
/* harmony export */   convertToTimezone: () => (/* binding */ convertToTimezone)
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

/***/ }),

/***/ "./src/utils/user-session.ts":
/*!***********************************!*\
  !*** ./src/utils/user-session.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertUserSessionFromServer: () => (/* binding */ convertUserSessionFromServer)
/* harmony export */ });
const convertUserSessionFromServer = user => Object.assign(Object.assign({}, user), {
  is_active: user.is_active === "1"
});


/***/ }),

/***/ "./src/utils/user.ts":
/*!***************************!*\
  !*** ./src/utils/user.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertExtendedUserFromServer: () => (/* binding */ convertExtendedUserFromServer),
/* harmony export */   convertUserFromServer: () => (/* binding */ convertUserFromServer)
/* harmony export */ });
const convertUserFromServer = user => Object.assign(Object.assign({}, user), {
  is_active: user.is_active === "1",
  has_password: user.has_password === "1"
});
const convertExtendedUserFromServer = user => Object.assign(Object.assign({}, user), {
  is_active: user.is_active === "1"
});


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
/******/ 			"app": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map