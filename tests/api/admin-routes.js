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
 * Permission levels (see php/services/PermissionService.php):
 * - base: quicktasker_admin_role
 * - settings / delete / users / archive / sessions: base + the matching capability
 * - usersDelete: base + manage users + delete
 * - wpAdmin: base + manage_options (WordPress administrators)
 * - myTasks: quicktasker_view_my_tasks
 */
module.exports = [
  { method: "GET", path: "/pipelines/{id}", permission: "base" },
  { method: "GET", path: "/pipelines", permission: "base" },
  {
    method: "POST",
    path: "/pipelines",
    permission: "settings",
    params: { name: "x", description: "x" },
  },
  { method: "PATCH", path: "/pipelines/{id}", permission: "settings" },
  { method: "PATCH", path: "/pipelines/{id}/set-primary", permission: "base" },
  { method: "DELETE", path: "/pipelines/{id}", permission: "delete" },
  { method: "GET", path: "/pipelines/{id}/api-tokens", permission: "settings" },
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
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}/api-tokens/{token_id}",
    permission: "settings",
  },
  {
    method: "GET",
    path: "/tasks/archived",
    permission: "archive",
    params: { order: "DESC" },
  },
  { method: "GET", path: "/tasks/{id}/logs", permission: "base" },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/tasks/{id}/move",
    permission: "base",
    params: { stageId: 999999, order: 999999 },
  },
  {
    method: "POST",
    path: "/tasks",
    permission: "base",
    params: { stageId: 999999, name: "x", pipelineId: 999999 },
  },
  { method: "PATCH", path: "/tasks/{id}", permission: "base" },
  { method: "DELETE", path: "/tasks/{id}", permission: "delete" },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/tasks/{id}/archive",
    permission: "base",
  },
  {
    method: "PATCH",
    path: "/tasks/{id}/archive-restore",
    permission: "archive",
    params: { boardId: 999999 },
  },
  {
    method: "PATCH",
    path: "/tasks/{id}/done",
    permission: "base",
    params: { done: true },
  },
  {
    method: "PATCH",
    path: "/tasks/{id}/focus-color",
    permission: "base",
    params: { color: "#000000" },
  },
  {
    method: "POST",
    path: "/pipelines/{pipelineId}/stages",
    permission: "settings",
    params: { name: "x", description: "x" },
  },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/stages/{id}",
    permission: "settings",
    params: { name: "x" },
  },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/stages/{id}/move",
    permission: "settings",
    params: { direction: "left" },
  },
  {
    method: "DELETE",
    path: "/pipelines/{pipelineId}/stages/{id}",
    permission: "delete",
  },
  {
    method: "PATCH",
    path: "/pipelines/{pipelineId}/stages/{id}/archive-tasks",
    permission: "settings",
  },
  { method: "GET", path: "/users", permission: "base" },
  { method: "GET", path: "/users/{id}/extended", permission: "users" },
  {
    method: "POST",
    path: "/users",
    permission: "users",
    params: { name: "x", description: "x" },
  },
  { method: "GET", path: "/users/{id}/tasks", permission: "base" },
  { method: "GET", path: "/my-tasks", permission: "myTasks" },
  {
    method: "POST",
    path: "/users/{id}/tasks/{task_id}",
    permission: "base",
    params: { user_type: "quicktasker" },
  },
  {
    method: "DELETE",
    path: "/users/{id}/tasks/{task_id}",
    permission: "base",
    params: { user_type: "quicktasker" },
  },
  { method: "PATCH", path: "/users/{id}", permission: "users" },
  { method: "PATCH", path: "/users/{id}/password-reset", permission: "users" },
  {
    method: "PATCH",
    path: "/users/{id}/status",
    permission: "users",
    params: { status: true },
  },
  { method: "PATCH", path: "/users/{id}/unban", permission: "users" },
  { method: "DELETE", path: "/users/{id}", permission: "usersDelete" },
  { method: "GET", path: "/users/sessions", permission: "sessions" },
  {
    method: "GET",
    path: "/wp-users",
    permission: "wpAdmin",
    params: { type: "x" },
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
  },
  {
    method: "GET",
    path: "/logs",
    permission: "base",
    params: { type: "x", typeId: 999999 },
  },
  {
    method: "GET",
    path: "/global-logs",
    permission: "base",
    params: { order: "DESC" },
  },
  {
    method: "GET",
    path: "/comments",
    permission: "base",
    params: { typeId: 999999, type: "task", isPrivate: true },
  },
  {
    method: "POST",
    path: "/comments",
    permission: "base",
    params: { comment: "x", typeId: 999999, type: "task", isPrivate: true },
  },
  {
    method: "GET",
    path: "/my-tasks/comments",
    permission: "myTasks",
    params: { taskId: 999999 },
  },
  {
    method: "POST",
    path: "/my-tasks/comments",
    permission: "myTasks",
    params: { comment: "x", taskId: 999999 },
  },
  {
    method: "GET",
    path: "/custom-fields",
    permission: "base",
    params: { entityType: "task", active: true },
  },
  {
    method: "POST",
    path: "/custom-fields",
    permission: "base",
    params: { entityType: "task", entityId: 0, name: "x", type: "text" },
  },
  {
    method: "DELETE",
    path: "/custom-fields/{custom_field_id}",
    permission: "delete",
  },
  {
    method: "PATCH",
    path: "/custom-fields/{custom_field_id}/value",
    permission: "base",
    params: { entityId: 999999, entityType: "task", value: "x" },
  },
  {
    method: "PATCH",
    path: "/custom-fields/{custom_field_id}/default-value",
    permission: "base",
    params: { value: "x" },
  },
  {
    method: "PATCH",
    path: "/custom-fields/{custom_field_id}/restore",
    permission: "base",
  },
  {
    method: "PATCH",
    path: "/settings/user-page-custom-styles",
    permission: "settings",
    params: { styles: "x" },
  },
  { method: "GET", path: "/pipelines/{id}/settings", permission: "settings" },
  { method: "PATCH", path: "/pipelines/{id}/settings", permission: "settings" },
  {
    method: "PATCH",
    path: "/archive/settings/task-cleanup",
    permission: "archive",
  },
  { method: "GET", path: "/pipelines/{id}/overview", permission: "base" },
  {
    method: "GET",
    path: "/pipelines/{id}/automations",
    permission: "settings",
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
  },
  {
    method: "PATCH",
    path: "/pipelines/{id}/automations/{automation_id}/active",
    permission: "settings",
    params: { active: true },
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}/automations/{automation_id}",
    permission: "settings",
  },
  { method: "GET", path: "/automations/{id}/logs", permission: "base" },
  { method: "GET", path: "/pipelines/{id}/webhooks", permission: "settings" },
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
  },
  { method: "PATCH", path: "/webhooks/{id}", permission: "settings" },
  { method: "DELETE", path: "/webhooks/{id}", permission: "settings" },
  { method: "GET", path: "/pipelines/{id}/labels", permission: "base" },
  {
    method: "POST",
    path: "/pipelines/{id}/labels",
    permission: "base",
    params: { name: "x", color: "#000000" },
  },
  {
    method: "POST",
    path: "/pipelines/{id}/tasks/{task_id}/labels",
    permission: "base",
    params: { labelId: 999999 },
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}/tasks/{task_id}/labels/{label_id}",
    permission: "base",
  },
  {
    method: "PATCH",
    path: "/pipelines/{id}/labels/{label_id}",
    permission: "base",
  },
  {
    method: "DELETE",
    path: "/pipelines/{id}/labels/{label_id}",
    permission: "delete",
  },
  {
    method: "GET",
    path: "/uploads",
    permission: "base",
    params: { entity_id: 999999, entity_type: "task" },
  },
  {
    method: "POST",
    path: "/uploads",
    permission: "base",
    params: { entity_id: 999999, entity_type: "task" },
  },
  { method: "DELETE", path: "/uploads/{upload_id}", permission: "delete" },
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
  },
  { method: "GET", path: "/notifications", permission: "base" },
  { method: "POST", path: "/notifications/{id}/read", permission: "base" },
  {
    method: "POST",
    path: "/notifications/read-all",
    permission: "base",
    params: { notification_ids: [] },
  },
  {
    method: "POST",
    path: "/notifications/preferences",
    permission: "base",
    params: { filter: "all", max_age_hours: 999999 },
  },
];
