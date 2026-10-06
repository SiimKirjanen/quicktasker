/* global module */
/**
 * Every admin API route (php/api/admin-api.php) with the permission level its
 * permission_callback requires. build-collection.js fails if a route is added,
 * removed or changes permission without this table being updated, so every
 * admin route stays covered by the permission matrix tests.
 *
 * `params` are dummy values that satisfy the route's required-argument
 * validation. WordPress validates arguments before running the
 * permission_callback, so without them a request would get a 400 instead of
 * the 401/403 being tested. Path placeholders are filled with a dummy ID.
 *
 * `board` says how the route is limited to the boards a WordPress user can
 * access (see PipelineAccessService):
 * - an object: the route acts on something on a board. The "Board access"
 *   folder calls it with the IDs of board E's entities, as a user who has every
 *   QuickTasker capability but has not been added to board E, and expects a
 *   403. `path` maps path placeholders to collection variables, and `params`
 *   overrides `params` with real values.
 * - "filtered": the route lists things from every board and leaves out the
 *   boards the user cannot access. Covered by dedicated requests.
 * - "none": the route is not about anything on a board.
 *
 * Permission levels (see php/services/PermissionService.php):
 * - base: quicktasker_admin_role
 * - settings / delete / users / archive / sessions: base + the matching capability
 * - usersDelete: base + manage users + delete
 * - wpAdmin: base + manage_options (WordPress administrators)
 * - archiveCleanup: archive + manage_options
 * - myTasks: quicktasker_view_my_tasks
 */
module.exports = [
  {
    method: "GET",
    path: "/pipelines/{id}",
    permission: "base",
    board: { path: { id: "boardEId" } },
  },
  { method: "GET", path: "/pipelines", permission: "base", board: "filtered" },
  {
    method: "POST",
    path: "/pipelines",
    permission: "settings",
    params: { name: "x", description: "x" },
    board: "none",
  },
  {
    method: "PATCH",
    path: "/pipelines/{id}",
    permission: "settings",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "PATCH",
    path: "/pipelines/{id}/set-primary",
    permission: "base",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}",
    permission: "delete",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "GET",
    path: "/pipelines/{id}/api-tokens",
    permission: "settings",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "POST",
    path: "/pipelines/{id}/api-tokens",
    permission: "settings",
    params: {
      name: "x",
      get_pipeline: true,
      patch_pipeline: true,
      get_pipeline_stages: true,
      post_pipeline_stages: true,
      patch_pipeline_stages: true,
      delete_pipeline_stages: true,
      get_pipeline_tasks: true,
      post_pipeline_tasks: true,
      patch_pipeline_tasks: true,
      delete_pipeline_tasks: true,
    },
    board: { path: { id: "boardEId" } },
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}/api-tokens/{token_id}",
    permission: "settings",
    board: { path: { id: "boardEId", token_id: "tokenE1Id" } },
  },
  {
    method: "GET",
    path: "/tasks/archived",
    permission: "archive",
    params: { order: "DESC" },
    board: "filtered",
  },
  {
    method: "GET",
    path: "/tasks/{id}/logs",
    permission: "base",
    board: { path: { id: "taskE1Id" } },
  },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/tasks/{id}/move",
    permission: "base",
    params: { stageId: 999999, order: 999999 },
    board: {
      path: { pipelineId: "boardEId", id: "taskE1Id" },
      params: { stageId: "{{stageE1Id}}" },
    },
  },
  {
    method: "POST",
    path: "/tasks",
    permission: "base",
    params: { stageId: 999999, name: "x", pipelineId: 999999 },
    board: { params: { stageId: "{{stageE1Id}}", pipelineId: "{{boardEId}}" } },
  },
  {
    method: "PATCH",
    path: "/tasks/{id}",
    permission: "base",
    board: { path: { id: "taskE1Id" } },
  },
  {
    method: "DELETE",
    path: "/tasks/{id}",
    permission: "delete",
    board: { path: { id: "taskE1Id" } },
  },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/tasks/{id}/archive",
    permission: "base",
    board: { path: { pipelineId: "boardEId", id: "taskE1Id" } },
  },
  {
    method: "PATCH",
    path: "/tasks/{id}/archive-restore",
    permission: "archive",
    params: { boardId: 999999 },
    board: { path: { id: "taskE1Id" }, params: { boardId: "{{boardEId}}" } },
  },
  {
    method: "PATCH",
    path: "/tasks/{id}/done",
    permission: "base",
    params: { done: true },
    board: { path: { id: "taskE1Id" } },
  },
  {
    method: "PATCH",
    path: "/tasks/{id}/focus-color",
    permission: "base",
    params: { color: "#000000" },
    board: { path: { id: "taskE1Id" } },
  },
  {
    method: "POST",
    path: "/pipelines/{pipelineId}/stages",
    permission: "settings",
    params: { name: "x", description: "x" },
    board: { path: { pipelineId: "boardEId" } },
  },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/stages/{id}",
    permission: "settings",
    params: { name: "x" },
    board: { path: { pipelineId: "boardEId", id: "stageE1Id" } },
  },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/stages/{id}/move",
    permission: "settings",
    params: { direction: "left" },
    board: { path: { pipelineId: "boardEId", id: "stageE1Id" } },
  },
  {
    method: "DELETE",
    path: "/pipelines/{pipelineId}/stages/{id}",
    permission: "delete",
    board: { path: { pipelineId: "boardEId", id: "stageE1Id" } },
  },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/stages/{id}/archive-tasks",
    permission: "settings",
    board: { path: { pipelineId: "boardEId", id: "stageE1Id" } },
  },
  { method: "GET", path: "/users", permission: "base", board: "none" },
  {
    method: "GET",
    path: "/users/{id}/extended",
    permission: "users",
    board: "none",
  },
  {
    method: "POST",
    path: "/users",
    permission: "users",
    params: { name: "x", description: "x" },
    board: "none",
  },
  {
    method: "GET",
    path: "/users/{id}/tasks",
    permission: "base",
    board: "filtered",
  },
  {
    method: "GET",
    path: "/my-tasks",
    permission: "myTasks",
    board: "filtered",
  },
  {
    method: "POST",
    path: "/users/{id}/tasks/{task_id}",
    permission: "base",
    params: { user_type: "quicktasker" },
    board: { path: { task_id: "taskE1Id" } },
  },
  {
    method: "DELETE",
    path: "/users/{id}/tasks/{task_id}",
    permission: "base",
    params: { user_type: "quicktasker" },
    board: { path: { task_id: "taskE1Id" } },
  },
  { method: "PATCH", path: "/users/{id}", permission: "users", board: "none" },
  {
    method: "PATCH",
    path: "/users/{id}/password-reset",
    permission: "users",
    board: "none",
  },
  {
    method: "PATCH",
    path: "/users/{id}/status",
    permission: "users",
    params: { status: true },
    board: "none",
  },
  {
    method: "PATCH",
    path: "/users/{id}/unban",
    permission: "users",
    board: "none",
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    permission: "usersDelete",
    board: "none",
  },
  {
    method: "GET",
    path: "/users/sessions",
    permission: "sessions",
    board: "none",
  },
  {
    method: "GET",
    path: "/wp-users",
    permission: "wpAdmin",
    params: { type: "x" },
    board: "none",
  },
  {
    method: "PATCH",
    path: "/wp-users/{id}/capabilities",
    permission: "wpAdmin",
    params: {
      quicktasker_admin_role: false,
      quicktasker_admin_role_allow_delete: false,
      quicktasker_admin_role_manage_users: false,
      quicktasker_admin_role_manage_settings: false,
      quicktasker_admin_role_manage_archive: false,
      quicktasker_access_user_page_app: false,
      quicktasker_view_my_tasks: false,
    },
    board: "none",
  },
  {
    method: "PATCH",
    path: "/wp-users/{id}/pipelines",
    permission: "wpAdmin",
    params: { pipeline_ids: [] },
    board: "none",
  },
  {
    method: "GET",
    path: "/logs",
    permission: "base",
    params: { type: "x", typeId: 999999 },
    board: "filtered",
  },
  {
    method: "GET",
    path: "/global-logs",
    permission: "base",
    params: { order: "DESC" },
    board: "filtered",
  },
  {
    method: "GET",
    path: "/comments",
    permission: "base",
    params: { typeId: 999999, type: "task", isPrivate: true },
    board: { params: { typeId: "{{taskE1Id}}" } },
  },
  {
    method: "POST",
    path: "/comments",
    permission: "base",
    params: { comment: "x", typeId: 999999, type: "task", isPrivate: true },
    board: { params: { typeId: "{{taskE1Id}}" } },
  },
  {
    method: "GET",
    path: "/my-tasks/comments",
    permission: "myTasks",
    params: { taskId: 999999 },
    board: { params: { taskId: "{{taskE1Id}}" } },
  },
  {
    method: "POST",
    path: "/my-tasks/comments",
    permission: "myTasks",
    params: { comment: "x", taskId: 999999 },
    board: { params: { taskId: "{{taskE1Id}}" } },
  },
  {
    method: "GET",
    path: "/custom-fields",
    permission: "base",
    params: { entityType: "task", active: true },
    board: { params: { entityId: "{{taskE1Id}}" } },
  },
  {
    method: "POST",
    path: "/custom-fields",
    permission: "base",
    params: { entityType: "task", entityId: 0, name: "x", type: "text" },
    board: { params: { entityId: "{{taskE1Id}}" } },
  },
  {
    method: "DELETE",
    path: "/custom-fields/{custom_field_id}",
    permission: "delete",
    board: { path: { custom_field_id: "customFieldE1Id" } },
  },
  {
    method: "PATCH",
    path: "/custom-fields/{custom_field_id}/value",
    permission: "base",
    params: { entityId: 999999, entityType: "task", value: "x" },
    board: {
      path: { custom_field_id: "customFieldE1Id" },
      params: { entityId: "{{taskE1Id}}" },
    },
  },
  {
    method: "PATCH",
    path: "/custom-fields/{custom_field_id}/default-value",
    permission: "base",
    params: { value: "x" },
    board: { path: { custom_field_id: "customFieldE1Id" } },
  },
  {
    method: "PATCH",
    path: "/custom-fields/{custom_field_id}/restore",
    permission: "base",
    board: { path: { custom_field_id: "customFieldE1Id" } },
  },
  {
    method: "PATCH",
    path: "/settings/user-page-custom-styles",
    permission: "settings",
    params: { styles: "x" },
    board: "none",
  },
  {
    method: "GET",
    path: "/pipelines/{id}/settings",
    permission: "settings",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "PATCH",
    path: "/pipelines/{id}/settings",
    permission: "settings",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "PATCH",
    path: "/archive/settings/task-cleanup",
    permission: "archiveCleanup",
    board: "none",
  },
  {
    method: "GET",
    path: "/pipelines/{id}/overview",
    permission: "base",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "GET",
    path: "/pipelines/{id}/automations",
    permission: "settings",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "POST",
    path: "/pipelines/{id}/automations",
    permission: "settings",
    params: {
      automationTarget: "task",
      automationTrigger: "task-created",
      automationAction: "archive-task",
    },
    board: { path: { id: "boardEId" } },
  },
  {
    method: "PATCH",
    path: "/pipelines/{id}/automations/{automation_id}/active",
    permission: "settings",
    params: { active: true },
    board: { path: { id: "boardEId", automation_id: "automationE1Id" } },
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}/automations/{automation_id}",
    permission: "settings",
    board: { path: { id: "boardEId", automation_id: "automationE1Id" } },
  },
  {
    method: "GET",
    path: "/automations/{id}/logs",
    permission: "base",
    board: { path: { id: "automationE1Id" } },
  },
  {
    method: "GET",
    path: "/pipelines/{id}/webhooks",
    permission: "settings",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "POST",
    path: "/pipelines/{id}/webhooks",
    permission: "settings",
    params: {
      target_type: "task",
      target_action: "created",
      webhook_url: "x",
      webhook_confirm: true,
    },
    board: { path: { id: "boardEId" } },
  },
  {
    method: "PATCH",
    path: "/webhooks/{id}",
    permission: "settings",
    board: { path: { id: "webhookE1Id" } },
  },
  {
    method: "DELETE",
    path: "/webhooks/{id}",
    permission: "settings",
    board: { path: { id: "webhookE1Id" } },
  },
  {
    method: "GET",
    path: "/pipelines/{id}/labels",
    permission: "base",
    board: { path: { id: "boardEId" } },
  },
  {
    method: "POST",
    path: "/pipelines/{id}/labels",
    permission: "base",
    params: { name: "x", color: "#000000" },
    board: { path: { id: "boardEId" } },
  },
  {
    method: "POST",
    path: "/pipelines/{id}/tasks/{task_id}/labels",
    permission: "base",
    params: { labelId: 999999 },
    board: {
      path: { id: "boardEId", task_id: "taskE1Id" },
      params: { labelId: "{{labelE1Id}}" },
    },
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}/tasks/{task_id}/labels/{label_id}",
    permission: "base",
    board: {
      path: { id: "boardEId", task_id: "taskE1Id", label_id: "labelE1Id" },
    },
  },
  {
    method: "PATCH",
    path: "/pipelines/{id}/labels/{label_id}",
    permission: "base",
    board: { path: { id: "boardEId", label_id: "labelE1Id" } },
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}/labels/{label_id}",
    permission: "delete",
    board: { path: { id: "boardEId", label_id: "labelE1Id" } },
  },
  {
    method: "GET",
    path: "/uploads",
    permission: "base",
    params: { entity_id: 999999, entity_type: "task" },
    board: { params: { entity_id: "{{taskE1Id}}" } },
  },
  {
    method: "POST",
    path: "/uploads",
    permission: "base",
    params: { entity_id: 999999, entity_type: "task" },
    board: { params: { entity_id: "{{taskE1Id}}" } },
  },
  {
    method: "DELETE",
    path: "/uploads/{upload_id}",
    permission: "delete",
    board: { path: { upload_id: "uploadE1Id" } },
  },
  {
    method: "POST",
    path: "/import",
    permission: "settings",
    params: {
      source: "QUICKTASKER-IMPORT",
      // Smallest payload that passes PipelineImportService::validateWPQTImport.
      data: {
        pipelineName: "x",
        pipelineDescription: "",
        stages: [],
        tasks: [],
        labels: [],
        taskComments: [],
      },
    },
    board: "none",
  },
  {
    method: "GET",
    path: "/notifications",
    permission: "base",
    board: "filtered",
  },
  {
    method: "POST",
    path: "/notifications/{id}/read",
    permission: "base",
    board: "none",
  },
  {
    method: "POST",
    path: "/notifications/read-all",
    permission: "base",
    params: { notification_ids: [] },
    board: "none",
  },
  {
    method: "POST",
    path: "/notifications/preferences",
    permission: "base",
    params: { filter: "all", max_age_hours: 999999 },
    board: "none",
  },
];
