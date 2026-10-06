/* global __dirname, process, require */
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Generates the QuickTasker Postman collection (v2.1) used by Newman.
 *
 * Edit the request definitions below, then run `npm run test:api:build`
 * and commit both this file and the generated JSON.
 */
const fs = require("fs");
const path = require("path");

const adminRoutes = require("./admin-routes");

const OUTPUT = path.join(__dirname, "quicktasker.postman_collection.json");
const ADMIN_API_FILE = path.join(
  __dirname,
  "..",
  "..",
  "php",
  "api",
  "admin-api.php",
);
const API = "{{baseUrl}}/wp-json/wpqt/v1";

/* ------------------------------------------------------------------ */
/* Auth presets                                                         */
/* ------------------------------------------------------------------ */

const adminAuth = {
  type: "basic",
  basic: [
    { key: "username", value: "{{adminUser}}", type: "string" },
    { key: "password", value: "{{adminAppPassword}}", type: "string" },
  ],
};
const noAuth = { type: "noauth" };
const bearer = (variable) => ({
  type: "bearer",
  bearer: [{ key: "token", value: `{{${variable}}}`, type: "string" }],
});

/* ------------------------------------------------------------------ */
/* Test script snippets                                                 */
/* ------------------------------------------------------------------ */

const status = (code) =>
  `pm.test('status is ${code}', () => pm.response.to.have.status(${code}));`;

const success = (expected) =>
  `pm.test('success is ${expected}', () => pm.expect(pm.response.json().success).to.eql(${expected}));`;

const wpErrorCode = (code) =>
  `pm.test('error code is ${code}', () => pm.expect(pm.response.json().code).to.eql('${code}'));`;

const save = (variable, expression) =>
  `pm.collectionVariables.set('${variable}', String(${expression}));`;

const messageContains = (text) =>
  `pm.test('message mentions "${text}"', () => pm.expect(JSON.stringify(pm.response.json())).to.include('${text}'));`;

/* ------------------------------------------------------------------ */
/* Request builder                                                      */
/* ------------------------------------------------------------------ */

function request({
  name,
  method = "GET",
  url,
  rawUrl,
  auth = adminAuth,
  body,
  formData,
  headers = [],
  tests = [],
}) {
  const header = [...headers];
  const req = { method, header, url: rawUrl ?? `${API}${url}`, auth };

  if (formData) {
    // File paths are relative to the plugin root (Newman's --working-dir).
    req.body = {
      mode: "formdata",
      formdata: formData.map(({ key, value, src }) =>
        src ? { key, type: "file", src } : { key, type: "text", value },
      ),
    };
  } else if (body !== undefined) {
    header.push({ key: "Content-Type", value: "application/json" });
    req.body = {
      mode: "raw",
      raw: typeof body === "string" ? body : JSON.stringify(body, null, 2),
      options: { raw: { language: "json" } },
    };
  }

  return {
    name,
    request: req,
    event: [
      {
        listen: "test",
        script: { type: "text/javascript", exec: tests.flat() },
      },
    ],
  };
}

const folder = (name, item, description) => ({ name, description, item });

const tokenPermissions = (overrides = {}) => ({
  get_pipeline: false,
  patch_pipeline: false,
  get_pipeline_stages: false,
  post_pipeline_stages: false,
  patch_pipeline_stages: false,
  delete_pipeline_stages: false,
  get_pipeline_tasks: false,
  post_pipeline_tasks: false,
  patch_pipeline_tasks: false,
  delete_pipeline_tasks: false,
  ...overrides,
});

const allTokenPermissions = Object.fromEntries(
  Object.keys(tokenPermissions()).map((key) => [key, true]),
);

/* ------------------------------------------------------------------ */
/* 00 Setup                                                             */
/* ------------------------------------------------------------------ */

const setup = folder(
  "00 Setup",
  [
    request({
      name: "Admin API rejects anonymous requests",
      url: "/pipelines",
      auth: noAuth,
      tests: [status(401)],
    }),
    request({
      name: "Admin API accepts application password",
      url: "/pipelines",
      tests: [status(200), success(true)],
    }),
    request({
      name: "Create board A",
      method: "POST",
      url: "/pipelines",
      body: { name: "API Board A {{runId}}", description: "Newman board A" },
      tests: [
        status(200),
        success(true),
        save("boardAId", "pm.response.json().data.id"),
      ],
    }),
    request({
      name: "Create board B",
      method: "POST",
      url: "/pipelines",
      body: { name: "API Board B {{runId}}", description: "Newman board B" },
      tests: [
        status(200),
        success(true),
        save("boardBId", "pm.response.json().data.id"),
      ],
    }),
    request({
      name: "Create stage A1",
      method: "POST",
      url: "/pipelines/{{boardAId}}/stages",
      body: { name: "Stage A1", description: "" },
      tests: [status(200), save("stageA1Id", "pm.response.json().data.id")],
    }),
    request({
      name: "Create stage A2",
      method: "POST",
      url: "/pipelines/{{boardAId}}/stages",
      body: { name: "Stage A2", description: "" },
      tests: [status(200), save("stageA2Id", "pm.response.json().data.id")],
    }),
    request({
      name: "Create stage B1",
      method: "POST",
      url: "/pipelines/{{boardBId}}/stages",
      body: { name: "Stage B1", description: "" },
      tests: [status(200), save("stageB1Id", "pm.response.json().data.id")],
    }),
    request({
      name: "Create task on board B",
      method: "POST",
      url: "/tasks",
      body: {
        name: "Board B task",
        stageId: "{{stageB1Id}}",
        pipelineId: "{{boardBId}}",
      },
      tests: [
        status(200),
        save("taskBId", "pm.response.json().data.newTask.id"),
        save("taskBHash", "pm.response.json().data.newTask.task_hash"),
      ],
    }),
    request({
      name: "Create full-access token for board A",
      method: "POST",
      url: "/pipelines/{{boardAId}}/api-tokens",
      body: { name: "Full {{runId}}", ...allTokenPermissions },
      tests: [
        status(200),
        success(true),
        `pm.test('plain token is returned once', () => pm.expect(pm.response.json().data.token).to.match(/^\\d+-[a-f0-9]{64}$/));`,
        `pm.test('the creator is saved', () => pm.expect(pm.response.json().data.created_by).to.not.be.null);`,
        save("tokenFull", "pm.response.json().data.token"),
      ],
    }),
    request({
      name: "Create read-only token for board A",
      method: "POST",
      url: "/pipelines/{{boardAId}}/api-tokens",
      body: {
        name: "Read only {{runId}}",
        ...tokenPermissions({
          get_pipeline: true,
          get_pipeline_stages: true,
          get_pipeline_tasks: true,
        }),
      },
      tests: [
        status(200),
        save("tokenReadOnly", "pm.response.json().data.token"),
        save("tokenReadOnlyId", "pm.response.json().data.id"),
      ],
    }),
    request({
      name: "Create no-permission token for board A",
      method: "POST",
      url: "/pipelines/{{boardAId}}/api-tokens",
      body: { name: "No perms {{runId}}", ...tokenPermissions() },
      tests: [status(200), save("tokenNone", "pm.response.json().data.token")],
    }),
    request({
      name: "Create full-access token for board B",
      method: "POST",
      url: "/pipelines/{{boardBId}}/api-tokens",
      body: { name: "Board B {{runId}}", ...allTokenPermissions },
      tests: [status(200), save("tokenB", "pm.response.json().data.token")],
    }),
  ],
  "Creates two boards, stages, a task on board B and API tokens. IDs are stored as collection variables.",
);

/* ------------------------------------------------------------------ */
/* 01 Token API                                                         */
/* ------------------------------------------------------------------ */

const tokenAuthTests = folder("Authentication", [
  request({
    name: "Missing token is rejected",
    url: "/token/board",
    auth: noAuth,
    tests: [status(401), wpErrorCode("missing_token")],
  }),
  request({
    name: "Unknown token is rejected",
    url: "/token/board",
    auth: noAuth,
    headers: [{ key: "Authorization", value: "Bearer 1-deadbeef" }],
    tests: [status(401), wpErrorCode("invalid_token")],
  }),
  request({
    name: "Token without Bearer prefix is accepted",
    url: "/token/board",
    auth: noAuth,
    headers: [{ key: "Authorization", value: "{{tokenFull}}" }],
    tests: [status(200), success(true)],
  }),
  request({
    name: "Lowercase bearer prefix is accepted",
    url: "/token/board",
    auth: noAuth,
    headers: [{ key: "Authorization", value: "bearer {{tokenFull}}" }],
    tests: [status(200), success(true)],
  }),
  request({
    name: "Token without get_pipeline permission is forbidden",
    url: "/token/board",
    auth: bearer("tokenNone"),
    tests: [status(403), wpErrorCode("insufficient_permissions")],
  }),
]);

const tokenBoardTests = folder("Board", [
  request({
    name: "Get board",
    url: "/token/board",
    auth: bearer("tokenFull"),
    tests: [
      status(200),
      success(true),
      `pm.test('returns board A', () => pm.expect(String(pm.response.json().data.board.id)).to.eql(pm.collectionVariables.get('boardAId')));`,
    ],
  }),
  request({
    name: "Token is scoped to its own board",
    url: "/token/board",
    auth: bearer("tokenB"),
    tests: [
      status(200),
      `pm.test('returns board B', () => pm.expect(String(pm.response.json().data.board.id)).to.eql(pm.collectionVariables.get('boardBId')));`,
    ],
  }),
  request({
    name: "Update board",
    method: "PATCH",
    url: "/token/board",
    auth: bearer("tokenFull"),
    body: {
      name: "API Board A {{runId}} renamed",
      description: "Updated via token",
    },
    tests: [
      status(200),
      success(true),
      `pm.test('name updated', () => pm.expect(pm.response.json().data.board.name).to.eql('API Board A ' + pm.collectionVariables.get('runId') + ' renamed'));`,
    ],
  }),
  request({
    name: "Read-only token cannot update board",
    method: "PATCH",
    url: "/token/board",
    auth: bearer("tokenReadOnly"),
    body: { name: "Should not change" },
    tests: [status(403), wpErrorCode("insufficient_permissions")],
  }),
]);

const tokenStageTests = folder("Stages", [
  request({
    name: "List stages",
    url: "/token/board/stages",
    auth: bearer("tokenFull"),
    tests: [
      status(200),
      `pm.test('contains stage A1 and A2', () => {
  const ids = pm.response.json().data.stages.map((s) => String(s.id));
  pm.expect(ids).to.include(pm.collectionVariables.get('stageA1Id'));
  pm.expect(ids).to.include(pm.collectionVariables.get('stageA2Id'));
});`,
      `pm.test('does not leak board B stages', () => {
  const ids = pm.response.json().data.stages.map((s) => String(s.id));
  pm.expect(ids).to.not.include(pm.collectionVariables.get('stageB1Id'));
});`,
    ],
  }),
  request({
    name: "Create stage",
    method: "POST",
    url: "/token/board/stages",
    auth: bearer("tokenFull"),
    body: { name: "Token stage", description: "Created via token" },
    tests: [
      status(201),
      success(true),
      `pm.test('stage belongs to board A', () => pm.expect(String(pm.response.json().data.stage.pipeline_id)).to.eql(pm.collectionVariables.get('boardAId')));`,
      save("tokenStageId", "pm.response.json().data.stage.id"),
    ],
  }),
  request({
    name: "Create stage requires name",
    method: "POST",
    url: "/token/board/stages",
    auth: bearer("tokenFull"),
    body: { description: "No name" },
    tests: [status(400), wpErrorCode("rest_missing_callback_param")],
  }),
  request({
    name: "Read-only token cannot create stage",
    method: "POST",
    url: "/token/board/stages",
    auth: bearer("tokenReadOnly"),
    body: { name: "Nope" },
    tests: [status(403)],
  }),
  request({
    name: "Update stage",
    method: "PATCH",
    url: "/token/board/stages/{{tokenStageId}}",
    auth: bearer("tokenFull"),
    body: { name: "Token stage renamed" },
    tests: [
      status(200),
      `pm.test('name updated', () => pm.expect(pm.response.json().data.stage.name).to.eql('Token stage renamed'));`,
    ],
  }),
  request({
    name: "Update stage description only keeps name",
    method: "PATCH",
    url: "/token/board/stages/{{tokenStageId}}",
    auth: bearer("tokenFull"),
    body: { description: "Only description" },
    tests: [
      status(200),
      `pm.test('description updated, name kept', () => {
  const stage = pm.response.json().data.stage;
  pm.expect(stage.description).to.eql('Only description');
  pm.expect(stage.name).to.eql('Token stage renamed');
});`,
    ],
  }),
  request({
    name: "Update stage requires at least one field",
    method: "PATCH",
    url: "/token/board/stages/{{tokenStageId}}",
    auth: bearer("tokenFull"),
    body: {},
    tests: [status(400), success(false)],
  }),
  request({
    name: "Cannot update a stage on another board",
    method: "PATCH",
    url: "/token/board/stages/{{stageB1Id}}",
    auth: bearer("tokenFull"),
    body: { name: "Hijacked" },
    tests: [status(404), success(false)],
  }),
  request({
    name: "Cannot delete a stage on another board",
    method: "DELETE",
    url: "/token/board/stages/{{stageB1Id}}",
    auth: bearer("tokenFull"),
    tests: [status(404), success(false)],
  }),
]);

const tokenTaskTests = folder("Tasks", [
  request({
    name: "Read-only token can list tasks",
    url: "/token/board/tasks",
    auth: bearer("tokenReadOnly"),
    tests: [
      status(200),
      `pm.test('tasks is an array', () => pm.expect(pm.response.json().data.tasks).to.be.an('array'));`,
    ],
  }),
  request({
    name: "Create task",
    method: "POST",
    url: "/token/board/tasks",
    auth: bearer("tokenFull"),
    body: {
      name: "Token task",
      description: "Created via token",
      task_focus_color: "#ff0000",
      stage_id: "{{stageA1Id}}",
    },
    tests: [
      status(200),
      success(true),
      `pm.test('task is placed on board A, stage A1', () => {
  const task = pm.response.json().data.task;
  pm.expect(String(task.pipeline_id)).to.eql(pm.collectionVariables.get('boardAId'));
  pm.expect(String(task.stage_id)).to.eql(pm.collectionVariables.get('stageA1Id'));
});`,
      save("tokenTaskId", "pm.response.json().data.task.id"),
    ],
  }),
  request({
    name: "Create task rejects invalid colour",
    method: "POST",
    url: "/token/board/tasks",
    auth: bearer("tokenFull"),
    body: {
      name: "Bad colour",
      task_focus_color: "red",
      stage_id: "{{stageA1Id}}",
    },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "Cannot create a task in a stage on another board",
    method: "POST",
    url: "/token/board/tasks",
    auth: bearer("tokenFull"),
    body: { name: "Cross-board task", stage_id: "{{stageB1Id}}" },
    tests: [status(404), success(false)],
  }),
  request({
    name: "Read-only token cannot create task",
    method: "POST",
    url: "/token/board/tasks",
    auth: bearer("tokenReadOnly"),
    body: { name: "Nope", stage_id: "{{stageA1Id}}" },
    tests: [status(403)],
  }),
  request({
    name: "Update task",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}",
    auth: bearer("tokenFull"),
    body: { name: "Token task renamed", due_date: "2030-01-15 12:00:00" },
    tests: [
      status(200),
      `pm.test('task updated', () => {
  const task = pm.response.json().data.task;
  pm.expect(task.name).to.eql('Token task renamed');
  pm.expect(task.due_date).to.include('2030-01-15');
});`,
    ],
  }),
  request({
    name: "Update task rejects invalid due_date",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}",
    auth: bearer("tokenFull"),
    body: { due_date: "15.01.2030" },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "Cannot update a task on another board",
    method: "PATCH",
    url: "/token/board/tasks/{{taskBId}}",
    auth: bearer("tokenFull"),
    body: { name: "Hijacked" },
    tests: [status(404), success(false)],
  }),
  request({
    name: "Move task to stage A2",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}/order",
    auth: bearer("tokenFull"),
    body: { task_order: 0, stage_id: "{{stageA2Id}}" },
    tests: [
      status(200),
      `pm.test('task is in stage A2', () => pm.expect(String(pm.response.json().data.task.stage_id)).to.eql(pm.collectionVariables.get('stageA2Id')));`,
    ],
  }),
  request({
    name: "Move task rejects out-of-range order",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}/order",
    auth: bearer("tokenFull"),
    body: { task_order: 999 },
    tests: [status(400), messageContains("Invalid task_order")],
  }),
  request({
    name: "Cannot move task to a stage on another board",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}/order",
    auth: bearer("tokenFull"),
    body: { task_order: 0, stage_id: "{{stageB1Id}}" },
    tests: [status(404), messageContains("Stage not found")],
  }),
  request({
    name: 'Enable "only last stage can be done" setting',
    method: "PATCH",
    url: "/pipelines/{{boardAId}}/settings",
    body: { allow_only_last_stage_task_done: true },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Cannot mark done outside last stage when restricted",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}/done",
    auth: bearer("tokenFull"),
    body: { is_done: true },
    tests: [status(403), messageContains("last stage")],
  }),
  request({
    name: 'Disable "only last stage can be done" setting',
    method: "PATCH",
    url: "/pipelines/{{boardAId}}/settings",
    body: { allow_only_last_stage_task_done: false },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Mark task done",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}/done",
    auth: bearer("tokenFull"),
    body: { is_done: true },
    tests: [
      status(200),
      `pm.test('task is done', () => pm.expect(Number(pm.response.json().data.task.is_done)).to.eql(1));`,
    ],
  }),
  request({
    name: "Mark task not done",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}/done",
    auth: bearer("tokenFull"),
    body: { is_done: false },
    tests: [
      status(200),
      `pm.test('task is not done', () => pm.expect(Number(pm.response.json().data.task.is_done)).to.eql(0));`,
    ],
  }),
  request({
    name: "Mark done rejects non-boolean",
    method: "PATCH",
    url: "/token/board/tasks/{{tokenTaskId}}/done",
    auth: bearer("tokenFull"),
    body: { is_done: "maybe" },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "Cannot mark done a task on another board",
    method: "PATCH",
    url: "/token/board/tasks/{{taskBId}}/done",
    auth: bearer("tokenFull"),
    body: { is_done: true },
    tests: [status(404)],
  }),
  request({
    name: "Cannot delete stage that has tasks",
    method: "DELETE",
    url: "/token/board/stages/{{stageA2Id}}",
    auth: bearer("tokenFull"),
    tests: [status(409), success(false)],
  }),
  request({
    name: "Read-only token cannot delete task",
    method: "DELETE",
    url: "/token/board/tasks/{{tokenTaskId}}",
    auth: bearer("tokenReadOnly"),
    tests: [status(403)],
  }),
  request({
    name: "Cannot delete a task on another board",
    method: "DELETE",
    url: "/token/board/tasks/{{taskBId}}",
    auth: bearer("tokenFull"),
    tests: [status(404)],
  }),
  request({
    name: "Delete task",
    method: "DELETE",
    url: "/token/board/tasks/{{tokenTaskId}}",
    auth: bearer("tokenFull"),
    tests: [status(200), success(true)],
  }),
  request({
    name: "Deleted task is gone",
    method: "DELETE",
    url: "/token/board/tasks/{{tokenTaskId}}",
    auth: bearer("tokenFull"),
    tests: [status(404)],
  }),
  request({
    name: "Delete empty stage",
    method: "DELETE",
    url: "/token/board/stages/{{tokenStageId}}",
    auth: bearer("tokenFull"),
    tests: [status(200), success(true)],
  }),
]);

const tokenRevocationTests = folder("Revocation", [
  request({
    name: "Revoke read-only token",
    method: "DELETE",
    url: "/pipelines/{{boardAId}}/api-tokens/{{tokenReadOnlyId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Revoked token is rejected",
    url: "/token/board",
    auth: bearer("tokenReadOnly"),
    tests: [status(401), wpErrorCode("invalid_token")],
  }),
  request({
    name: "Revoking again returns 404",
    method: "DELETE",
    url: "/pipelines/{{boardAId}}/api-tokens/{{tokenReadOnlyId}}",
    tests: [status(404)],
  }),
]);

const tokenApi = folder(
  "01 Token API",
  [
    tokenAuthTests,
    tokenBoardTests,
    tokenStageTests,
    tokenTaskTests,
    tokenRevocationTests,
  ],
  "Bearer-token API under /token/board. Every token is scoped to one board and a set of permission flags.",
);

/* ------------------------------------------------------------------ */
/* 02 Public API                                                        */
/* ------------------------------------------------------------------ */

const publicTask = (name, extra = {}) => ({
  pipeline_id: "{{boardAId}}",
  name,
  description: "Submitted by Newman",
  ...extra,
});

const publicApi = folder(
  "02 Public API",
  [
    request({
      name: "Submissions are disabled by default",
      url: "/public/pipelines/{{boardAId}}/status",
      auth: noAuth,
      tests: [
        status(200),
        `pm.test('enabled is false', () => pm.expect(pm.response.json().data.enabled).to.eql(false));`,
      ],
    }),
    request({
      name: "Submitting to a disabled board fails",
      method: "POST",
      url: "/public/tasks",
      auth: noAuth,
      body: publicTask("Should fail"),
      tests: [status(400), success(false), messageContains("disabled")],
    }),
    request({
      name: "Enable public submissions (limit 2)",
      method: "PATCH",
      url: "/pipelines/{{boardAId}}/settings",
      body: {
        allow_public_task_creation: true,
        public_task_creation_limit: 2,
        public_task_creation_count: 0,
        require_logged_in_user: false,
      },
      tests: [status(200), success(true)],
    }),
    request({
      name: "Status shows submissions enabled",
      url: "/public/pipelines/{{boardAId}}/status",
      auth: noAuth,
      tests: [
        status(200),
        `pm.test('enabled, limit not reached, no login needed', () => {
  const data = pm.response.json().data;
  pm.expect(data.enabled).to.eql(true);
  pm.expect(data.limit_reached).to.eql(false);
  pm.expect(data.login_required).to.eql(false);
});`,
      ],
    }),
    request({
      name: "Submission requires name",
      method: "POST",
      url: "/public/tasks",
      auth: noAuth,
      body: { pipeline_id: "{{boardAId}}" },
      tests: [status(400), wpErrorCode("rest_missing_callback_param")],
    }),
    request({
      name: "Submission rejects blank name",
      method: "POST",
      url: "/public/tasks",
      auth: noAuth,
      body: publicTask("   "),
      tests: [status(400), wpErrorCode("rest_invalid_param")],
    }),
    request({
      name: "Submission rejects non-numeric pipeline_id",
      method: "POST",
      url: "/public/tasks",
      auth: noAuth,
      body: publicTask("Bad board", { pipeline_id: "abc" }),
      tests: [status(400), wpErrorCode("rest_invalid_param")],
    }),
    request({
      name: "Anonymous submission succeeds",
      method: "POST",
      url: "/public/tasks",
      auth: noAuth,
      body: publicTask("Public task {{runId}}"),
      tests: [
        status(200),
        success(true),
        `pm.test('returns a task hash', () => pm.expect(pm.response.json().data.task_hash).to.match(/^[a-zA-Z0-9]+$/));`,
        save("publicTaskHash", "pm.response.json().data.task_hash"),
      ],
    }),
    request({
      name: "Status lookup returns the submitted task",
      method: "POST",
      url: "/public/tasks/statuses",
      auth: noAuth,
      body: '{ "hashes": ["{{publicTaskHash}}"] }',
      tests: [
        status(200),
        `pm.test('task details are returned', () => {
  const entry = pm.response.json().data[pm.collectionVariables.get('publicTaskHash')];
  pm.expect(entry.name).to.eql('Public task ' + pm.collectionVariables.get('runId'));
  pm.expect(entry.is_done).to.eql(false);
  pm.expect(entry.stage_name).to.eql('Stage A1');
});`,
      ],
    }),
    request({
      name: "Status lookup does not expose non-public tasks",
      method: "POST",
      url: "/public/tasks/statuses",
      auth: noAuth,
      body: '{ "hashes": ["{{taskBHash}}"] }',
      tests: [
        status(200),
        `pm.test('non-public task resolves to null', () => pm.expect(pm.response.json().data[pm.collectionVariables.get('taskBHash')]).to.eql(null));`,
      ],
    }),
    request({
      name: "Status lookup rejects malformed hashes",
      method: "POST",
      url: "/public/tasks/statuses",
      auth: noAuth,
      body: { hashes: ["abc-123!"] },
      tests: [status(400), wpErrorCode("rest_invalid_param")],
    }),
    request({
      name: "Status lookup rejects non-array hashes",
      method: "POST",
      url: "/public/tasks/statuses",
      auth: noAuth,
      body: { hashes: "abc123" },
      tests: [status(400), wpErrorCode("rest_invalid_param")],
    }),
    request({
      name: "Second submission reaches the limit",
      method: "POST",
      url: "/public/tasks",
      auth: noAuth,
      body: publicTask("Public task 2 {{runId}}"),
      tests: [status(200), success(true)],
    }),
    request({
      name: "Submission over the limit fails",
      method: "POST",
      url: "/public/tasks",
      auth: noAuth,
      body: publicTask("Over the limit"),
      tests: [status(400), messageContains("limit reached")],
    }),
    request({
      name: "Status shows limit reached",
      url: "/public/pipelines/{{boardAId}}/status",
      auth: noAuth,
      tests: [
        status(200),
        `pm.test('limit_reached is true', () => pm.expect(pm.response.json().data.limit_reached).to.eql(true));`,
      ],
    }),
    request({
      name: "Require logged-in users and reset count",
      method: "PATCH",
      url: "/pipelines/{{boardAId}}/settings",
      body: { require_logged_in_user: true, public_task_creation_count: 0 },
      tests: [status(200), success(true)],
    }),
    request({
      name: "Status shows login required for anonymous visitor",
      url: "/public/pipelines/{{boardAId}}/status",
      auth: noAuth,
      tests: [
        status(200),
        `pm.test('login_required is true', () => pm.expect(pm.response.json().data.login_required).to.eql(true));`,
      ],
    }),
    request({
      name: "Anonymous submission fails when login is required",
      method: "POST",
      url: "/public/tasks",
      auth: noAuth,
      body: publicTask("Anonymous"),
      tests: [status(400), messageContains("Login required")],
    }),
    request({
      name: "Logged-in submission succeeds when login is required",
      method: "POST",
      url: "/public/tasks",
      body: publicTask("Logged in {{runId}}"),
      tests: [status(200), success(true)],
    }),
  ],
  "Unauthenticated public task submission form API. Uses board A.",
);

/* ------------------------------------------------------------------ */
/* 03 User page API                                                     */
/* ------------------------------------------------------------------ */

/**
 * Headers the user page app sends. Pass null to omit one, or override values
 * to send a forged/mismatched nonce, page code or session cookie.
 */
const userPageHeaders = ({
  nonce = "{{userApiNonce}}",
  code = "{{qtPageHash}}",
  session = "{{qtSession}}",
  cookieHash = code,
} = {}) => {
  const headers = [];
  if (nonce !== null) {
    headers.push({ key: "X-WPQT-USER-API-Nonce", value: nonce });
  }
  if (code !== null) {
    headers.push({ key: "X-WPQT-USER-PAGE-CODE", value: code });
  }
  if (session !== null) {
    headers.push({
      key: "Cookie",
      value: `wpqt-session-token-${cookieHash}=${session}`,
    });
  }
  return headers;
};

const userPageRequest = ({ headerOptions, ...options }) =>
  request({
    ...options,
    auth: noAuth,
    headers: userPageHeaders(headerOptions),
  });

const failsWith = (text) => [
  status(400),
  success(false),
  messageContains(text),
];

const hashesIn = (expression) => `${expression}.map((t) => t.task_hash)`;

const userPageSetup = folder("Setup", [
  request({
    name: "Fetch user app nonce",
    rawUrl: "{{baseUrl}}/?page=wp-quicktasker-user",
    auth: noAuth,
    tests: [
      status(200),
      `const match = pm.response.text().match(/"userApiNonce":"([^"]+)"/);
pm.test('page contains the user API nonce', () => pm.expect(match).to.not.eql(null));
pm.collectionVariables.set('userApiNonce', match ? match[1] : '');`,
    ],
  }),
  request({
    name: "Create QuickTasker user",
    method: "POST",
    url: "/users",
    body: { name: "API user {{runId}}", description: "Newman" },
    tests: [
      status(200),
      success(true),
      save("qtUserId", "pm.response.json().data.id"),
      save("qtPageHash", "pm.response.json().data.page_hash"),
    ],
  }),
  request({
    name: "Create second QuickTasker user",
    method: "POST",
    url: "/users",
    body: { name: "API user 2 {{runId}}", description: "Newman" },
    tests: [
      status(200),
      save("qtUser2Id", "pm.response.json().data.id"),
      save("qtUser2PageHash", "pm.response.json().data.page_hash"),
    ],
  }),
  ...[
    ["Assigned", "upAssigned"],
    ["Free", "upFree"],
    ["Other user's", "upOther"],
    ["Private", "upPrivate"],
  ].map(([label, prefix]) =>
    request({
      name: `Create "${label}" task`,
      method: "POST",
      url: "/tasks",
      body: {
        name: `${label} task {{runId}}`,
        stageId: "{{stageA1Id}}",
        pipelineId: "{{boardAId}}",
      },
      tests: [
        status(200),
        save(`${prefix}TaskId`, "pm.response.json().data.newTask.id"),
        save(`${prefix}TaskHash`, "pm.response.json().data.newTask.task_hash"),
      ],
    }),
  ),
  request({
    name: 'Make "Free" task assignable',
    method: "PATCH",
    url: "/tasks/{{upFreeTaskId}}",
    body: { free_for_all: true },
    tests: [status(200), success(true)],
  }),
  request({
    name: 'Assign user to "Assigned" task',
    method: "POST",
    url: "/users/{{qtUserId}}/tasks/{{upAssignedTaskId}}",
    body: { user_type: "quicktasker" },
    tests: [status(200), success(true)],
  }),
  request({
    name: 'Assign second user to "Other user\'s" task',
    method: "POST",
    url: "/users/{{qtUser2Id}}/tasks/{{upOtherTaskId}}",
    body: { user_type: "quicktasker" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Create custom field for the user",
    method: "POST",
    url: "/custom-fields",
    body: {
      entityType: "quicktasker",
      entityId: "{{qtUserId}}",
      name: "Phone {{runId}}",
      description: "",
      type: "text",
    },
    tests: [status(200), save("qtCustomFieldId", "pm.response.json().data.id")],
  }),
]);

const userPageAuth = folder("Account setup and login", [
  userPageRequest({
    name: "Status reports setup not completed",
    url: "/user-page/status",
    headerOptions: { session: null },
    tests: [
      status(200),
      `pm.test('quicktasker user without setup', () => {
  const data = pm.response.json().data;
  pm.expect(data.isQuicktaskerUser).to.eql(true);
  pm.expect(data.setupCompleted).to.eql(false);
});`,
    ],
  }),
  userPageRequest({
    name: "Status rejects unknown page code",
    url: "/user-page/status",
    headerOptions: { session: null, code: "doesnotexist123" },
    tests: failsWith("User page does not exist"),
  }),
  userPageRequest({
    name: "Setup requires nonce",
    method: "POST",
    url: "/user-page/setup",
    headerOptions: { nonce: null, session: null },
    body: { password: "Newman-pass-1" },
    tests: failsWith("Nonce not provided"),
  }),
  userPageRequest({
    name: "Setup rejects invalid nonce",
    method: "POST",
    url: "/user-page/setup",
    headerOptions: { nonce: "invalid0", session: null },
    body: { password: "Newman-pass-1" },
    tests: failsWith("Nonce verification failed"),
  }),
  userPageRequest({
    name: "Complete setup",
    method: "POST",
    url: "/user-page/setup",
    headerOptions: { session: null },
    body: { password: "Newman-pass-1" },
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Setup cannot be repeated",
    method: "POST",
    url: "/user-page/setup",
    headerOptions: { session: null },
    body: { password: "Takeover-pass-2" },
    tests: failsWith("already been completed"),
  }),
  userPageRequest({
    name: "Status reports setup completed",
    url: "/user-page/status",
    headerOptions: { session: null },
    tests: [
      status(200),
      `pm.test('setupCompleted is true', () => pm.expect(pm.response.json().data.setupCompleted).to.eql(true));`,
    ],
  }),
  userPageRequest({
    name: "Login rejects wrong password",
    method: "POST",
    url: "/user-page/login",
    headerOptions: { session: null },
    body: { password: "wrong-password" },
    tests: failsWith("Invalid password"),
  }),
  userPageRequest({
    name: "Login",
    method: "POST",
    url: "/user-page/login",
    headerOptions: { session: null },
    body: { password: "Newman-pass-1" },
    tests: [
      status(200),
      success(true),
      `pm.test('returns session token and expiry', () => {
  const data = pm.response.json().data;
  pm.expect(data.sessionToken).to.be.a('string').and.not.empty;
  pm.expect(data.expiresAtUTC).to.be.a('string');
});`,
      save("qtSession", "pm.response.json().data.sessionToken"),
    ],
  }),
  userPageRequest({
    name: "Requests without session cookie are rejected",
    url: "/user-page/overview",
    headerOptions: { session: null },
    tests: [status(400), success(false)],
  }),
  userPageRequest({
    name: "Forged session token is rejected",
    url: "/user-page/overview",
    headerOptions: { session: "forged-session-token" },
    tests: [status(400), success(false)],
  }),
  userPageRequest({
    name: "Session cannot be used on another user's page",
    url: "/user-page/overview",
    headerOptions: { code: "{{qtUser2PageHash}}" },
    tests: failsWith("does not match the page hash"),
  }),
  userPageRequest({
    name: "Requests without nonce are rejected",
    url: "/user-page/overview",
    headerOptions: { nonce: null },
    tests: failsWith("Nonce not provided"),
  }),
]);

const userPageTasks = folder("Tasks", [
  userPageRequest({
    name: "Overview",
    url: "/user-page/overview",
    tests: [
      status(200),
      `pm.test('counts assigned and assignable tasks', () => {
  const data = pm.response.json().data;
  pm.expect(data.assignedTasksCount).to.eql(1);
  pm.expect(data.assignableTaskCount).to.be.at.least(1);
});`,
    ],
  }),
  userPageRequest({
    name: "Assigned tasks list only the user's tasks",
    url: "/user-page/assigned-tasks",
    tests: [
      status(200),
      `pm.test('contains only the assigned task', () => {
  const hashes = ${hashesIn("pm.response.json().data")};
  pm.expect(hashes).to.eql([pm.collectionVariables.get('upAssignedTaskHash')]);
});`,
    ],
  }),
  userPageRequest({
    name: "Assignable tasks list free unassigned tasks",
    url: "/user-page/assignable-tasks",
    tests: [
      status(200),
      `pm.test('contains the free task but not assigned or private ones', () => {
  const hashes = ${hashesIn("pm.response.json().data")};
  pm.expect(hashes).to.include(pm.collectionVariables.get('upFreeTaskHash'));
  pm.expect(hashes).to.not.include(pm.collectionVariables.get('upAssignedTaskHash'));
  pm.expect(hashes).to.not.include(pm.collectionVariables.get('upPrivateTaskHash'));
});`,
    ],
  }),
  userPageRequest({
    name: "View assigned task",
    url: "/user-page/tasks/{{upAssignedTaskHash}}",
    tests: [
      status(200),
      `pm.test('returns the task with its board stages', () => {
  const data = pm.response.json().data;
  pm.expect(data.task.task_hash).to.eql(pm.collectionVariables.get('upAssignedTaskHash'));
  pm.expect(data.stages.map((s) => String(s.id))).to.include(pm.collectionVariables.get('stageA2Id'));
});`,
    ],
  }),
  userPageRequest({
    name: "View assignable task",
    url: "/user-page/tasks/{{upFreeTaskHash}}",
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Cannot view another user's task",
    url: "/user-page/tasks/{{upOtherTaskHash}}",
    tests: failsWith("Not allowed to view"),
  }),
  userPageRequest({
    name: "Cannot view an unassigned private task",
    url: "/user-page/tasks/{{upPrivateTaskHash}}",
    tests: failsWith("Not allowed to view"),
  }),
  userPageRequest({
    name: "Unknown task hash fails",
    url: "/user-page/tasks/doesnotexist123",
    tests: [status(400), success(false)],
  }),
  userPageRequest({
    name: "Add comment to assigned task",
    method: "POST",
    url: "/user-page/tasks/{{upAssignedTaskHash}}/comments",
    body: { comment: "Task comment {{runId}}" },
    tests: [
      status(200),
      `pm.test('returns comments including the new one', () => pm.expect(pm.response.json().data.map((c) => c.text)).to.include('Task comment ' + pm.collectionVariables.get('runId')));`,
    ],
  }),
  userPageRequest({
    name: "List comments of assigned task",
    url: "/user-page/tasks/{{upAssignedTaskHash}}/comments",
    tests: [
      status(200),
      `pm.test('contains the comment', () => pm.expect(pm.response.json().data.map((c) => c.text)).to.include('Task comment ' + pm.collectionVariables.get('runId')));`,
    ],
  }),
  userPageRequest({
    name: "Comment requires text",
    method: "POST",
    url: "/user-page/tasks/{{upAssignedTaskHash}}/comments",
    body: {},
    tests: [status(400), wpErrorCode("rest_missing_callback_param")],
  }),
  userPageRequest({
    name: "Cannot comment on another user's task",
    method: "POST",
    url: "/user-page/tasks/{{upOtherTaskHash}}/comments",
    body: { comment: "Intruder" },
    tests: failsWith("Not allowed to edit"),
  }),
  userPageRequest({
    name: "Cannot read comments of a task the user is not assigned to",
    url: "/user-page/tasks/{{upFreeTaskHash}}/comments",
    tests: failsWith("Not allowed to view the comments"),
  }),
  userPageRequest({
    name: "Move assigned task to stage A2",
    method: "PATCH",
    url: "/user-page/tasks/{{upAssignedTaskHash}}/stage",
    body: { stageId: "{{stageA2Id}}" },
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Task is in stage A2",
    url: "/user-page/tasks/{{upAssignedTaskHash}}",
    tests: [
      status(200),
      `pm.test('stage_id is A2', () => pm.expect(String(pm.response.json().data.task.stage_id)).to.eql(pm.collectionVariables.get('stageA2Id')));`,
    ],
  }),
  userPageRequest({
    name: "Cannot move task to a stage on another board",
    method: "PATCH",
    url: "/user-page/tasks/{{upAssignedTaskHash}}/stage",
    body: { stageId: "{{stageB1Id}}" },
    tests: failsWith("Stage not found"),
  }),
  userPageRequest({
    name: "Cannot move another user's task",
    method: "PATCH",
    url: "/user-page/tasks/{{upOtherTaskHash}}/stage",
    body: { stageId: "{{stageA2Id}}" },
    tests: failsWith("Not allowed to edit"),
  }),
  userPageRequest({
    name: "Mark assigned task done",
    method: "PATCH",
    url: "/user-page/tasks/{{upAssignedTaskHash}}/done",
    body: { done: true },
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Task is done",
    url: "/user-page/tasks/{{upAssignedTaskHash}}",
    tests: [
      status(200),
      `pm.test('is_done is 1', () => pm.expect(Number(pm.response.json().data.task.is_done)).to.eql(1));`,
    ],
  }),
  userPageRequest({
    name: "Mark done rejects non-boolean",
    method: "PATCH",
    url: "/user-page/tasks/{{upAssignedTaskHash}}/done",
    body: { done: "maybe" },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  userPageRequest({
    name: "Cannot mark another user's task done",
    method: "PATCH",
    url: "/user-page/tasks/{{upOtherTaskHash}}/done",
    body: { done: true },
    tests: failsWith("Not allowed to edit"),
  }),
  userPageRequest({
    name: "Self-assign to assignable task",
    method: "POST",
    url: "/user-page/tasks/{{upFreeTaskHash}}/users",
    tests: [
      status(200),
      `pm.test('user is among assignees', () => {
  const users = pm.response.json().data.task.assigned_users.map((u) => String(u.id));
  pm.expect(users).to.include(pm.collectionVariables.get('qtUserId'));
});`,
    ],
  }),
  userPageRequest({
    name: "Assigned task is no longer assignable",
    url: "/user-page/assignable-tasks",
    tests: [
      status(200),
      `pm.test('free task left the assignable list', () => pm.expect(${hashesIn("pm.response.json().data")}).to.not.include(pm.collectionVariables.get('upFreeTaskHash')));`,
    ],
  }),
  userPageRequest({
    name: "Cannot self-assign to a task that already has an assignee",
    method: "POST",
    url: "/user-page/tasks/{{upOtherTaskHash}}/users",
    tests: failsWith("Not allowed to assign"),
  }),
  userPageRequest({
    name: "Cannot self-assign to a non-assignable task",
    method: "POST",
    url: "/user-page/tasks/{{upPrivateTaskHash}}/users",
    tests: failsWith("Not allowed to assign"),
  }),
  userPageRequest({
    name: "Self-unassign",
    method: "DELETE",
    url: "/user-page/tasks/{{upFreeTaskHash}}/users",
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Unassigned task is assignable again",
    url: "/user-page/assignable-tasks",
    tests: [
      status(200),
      `pm.test('free task is back in the assignable list', () => pm.expect(${hashesIn("pm.response.json().data")}).to.include(pm.collectionVariables.get('upFreeTaskHash')));`,
    ],
  }),
]);

const userPageProfile = folder("Profile, comments and notifications", [
  userPageRequest({
    name: "Get own user",
    url: "/user-page/user",
    tests: [
      status(200),
      `pm.test('returns the logged-in user', () => pm.expect(String(pm.response.json().data.user.id)).to.eql(pm.collectionVariables.get('qtUserId')));`,
    ],
  }),
  userPageRequest({
    name: "Add profile comment",
    method: "POST",
    url: "/user-page/user/comments",
    body: { comment: "Profile comment {{runId}}" },
    tests: [
      status(200),
      `pm.test('returns comments including the new one', () => pm.expect(pm.response.json().data.map((c) => c.text)).to.include('Profile comment ' + pm.collectionVariables.get('runId')));`,
    ],
  }),
  userPageRequest({
    name: "List profile comments",
    url: "/user-page/user/comments",
    tests: [
      status(200),
      `pm.test('contains the profile comment', () => pm.expect(pm.response.json().data.map((c) => c.text)).to.include('Profile comment ' + pm.collectionVariables.get('runId')));`,
    ],
  }),
  userPageRequest({
    name: "Update own custom field",
    method: "PATCH",
    url: "/user-page/custom-fields/{{qtCustomFieldId}}",
    body: {
      customFieldId: "{{qtCustomFieldId}}",
      entityId: "{{qtUserId}}",
      entityType: "quicktasker",
      value: "555-0100",
    },
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Custom field value is saved",
    url: "/user-page/user",
    tests: [
      status(200),
      `pm.test('custom field has the new value', () => pm.expect(JSON.stringify(pm.response.json().data.customFields)).to.include('555-0100'));`,
    ],
  }),
  userPageRequest({
    name: "Cannot update another user's custom field",
    method: "PATCH",
    url: "/user-page/custom-fields/{{qtCustomFieldId}}",
    body: {
      customFieldId: "{{qtCustomFieldId}}",
      entityId: "{{qtUser2Id}}",
      entityType: "quicktasker",
      value: "hijacked",
    },
    tests: failsWith("Not allowed to edit custom fields for this user"),
  }),
  userPageRequest({
    name: "Cannot update custom fields of another user's task",
    method: "PATCH",
    url: "/user-page/custom-fields/{{qtCustomFieldId}}",
    body: {
      customFieldId: "{{qtCustomFieldId}}",
      entityId: "{{upOtherTaskId}}",
      entityType: "task",
      value: "hijacked",
    },
    tests: failsWith("Not allowed to edit task custom fields"),
  }),
  userPageRequest({
    name: "Custom field rejects unknown entity type",
    method: "PATCH",
    url: "/user-page/custom-fields/{{qtCustomFieldId}}",
    body: {
      customFieldId: "{{qtCustomFieldId}}",
      entityId: "{{boardAId}}",
      entityType: "pipeline",
      value: "hijacked",
    },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  userPageRequest({
    name: "Notifications include the assignment",
    url: "/user-page/notifications",
    tests: [
      status(200),
      `const notifications = pm.response.json().data;
pm.test('has at least one notification', () => pm.expect(notifications).to.be.an('array').that.is.not.empty);
pm.collectionVariables.set('qtNotificationId', notifications.length ? String(notifications[0].id) : '0');`,
    ],
  }),
  userPageRequest({
    name: "Mark notification read",
    method: "POST",
    url: "/user-page/notifications/{{qtNotificationId}}/read",
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Cannot mark a non-existent notification read",
    method: "POST",
    url: "/user-page/notifications/999999999/read",
    tests: [status(400), success(false)],
  }),
  userPageRequest({
    name: "Mark all notifications read",
    method: "POST",
    url: "/user-page/notifications/read-all",
    body: '{ "notification_ids": [{{qtNotificationId}}] }',
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Mark all read requires an array",
    method: "POST",
    url: "/user-page/notifications/read-all",
    body: { notification_ids: "1" },
    tests: failsWith("must be an array"),
  }),
  userPageRequest({
    name: "Get notification preferences",
    url: "/user-page/notifications/preferences",
    tests: [
      status(200),
      `pm.test('has a filter', () => pm.expect(['all', 'unread', 'read']).to.include(pm.response.json().data.filter));`,
    ],
  }),
  userPageRequest({
    name: "Save notification preferences",
    method: "POST",
    url: "/user-page/notifications/preferences",
    body: { filter: "unread", max_age_hours: 48 },
    tests: [
      status(200),
      `pm.test('preferences are saved', () => {
  const data = pm.response.json().data;
  pm.expect(data.filter).to.eql('unread');
  pm.expect(Number(data.max_age_hours)).to.eql(48);
});`,
    ],
  }),
]);

const userPageAccountState = folder("Account state", [
  request({
    name: "Archive the assigned task",
    method: "PATCH",
    url: "/pipelines/{{boardAId}}/tasks/{{upAssignedTaskId}}/archive",
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Archived task cannot be viewed",
    url: "/user-page/tasks/{{upAssignedTaskHash}}",
    tests: failsWith("Not allowed to view"),
  }),
  request({
    name: "Deactivate user",
    method: "PATCH",
    url: "/users/{{qtUserId}}/status",
    body: { status: false },
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Inactive user is rejected",
    url: "/user-page/overview",
    tests: failsWith("User is not active"),
  }),
  request({
    name: "Reactivate user",
    method: "PATCH",
    url: "/users/{{qtUserId}}/status",
    body: { status: true },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Seed rate limit to the edge of a ban",
    method: "POST",
    rawUrl: "{{baseUrl}}/wp-json/qt-test/v1/seed-rate-limit",
    auth: noAuth,
    body: { user_id: "{{qtUserId}}", count: 30, offenses: 2 },
    tests: [status(200)],
  }),
  userPageRequest({
    name: "Write over the rate limit is throttled",
    method: "POST",
    url: "/user-page/user/comments",
    body: { comment: "One too many" },
    tests: failsWith("Too many requests"),
  }),
  userPageRequest({
    name: "Third offense bans the user",
    url: "/user-page/overview",
    tests: failsWith("User is banned"),
  }),
  request({
    name: "Unban user",
    method: "PATCH",
    url: "/users/{{qtUserId}}/unban",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Clear rate limit state",
    method: "POST",
    rawUrl: "{{baseUrl}}/wp-json/qt-test/v1/clear-rate-limit",
    auth: noAuth,
    body: { user_id: "{{qtUserId}}" },
    tests: [status(200)],
  }),
  userPageRequest({
    name: "Unbanned user has access again",
    url: "/user-page/overview",
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Logout",
    method: "POST",
    url: "/user-page/logout",
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Session is unusable after logout",
    url: "/user-page/overview",
    tests: failsWith("Session is not active"),
  }),
]);

const userPageApi = folder(
  "03 User page API",
  [
    userPageSetup,
    userPageAuth,
    userPageTasks,
    userPageProfile,
    userPageAccountState,
  ],
  "Public QuickTasker user page app API, authenticated with X-WPQT-USER-PAGE-CODE, X-WPQT-USER-API-Nonce and the wpqt-session-token-{hash} cookie. Rate-limit requests use the qt-rate-limit-helper test plugin (wp-env only).",
);

/* ------------------------------------------------------------------ */
/* 04 Admin API                                                         */
/* ------------------------------------------------------------------ */

const PERMISSION_CALLBACKS = {
  hasRequiredPermissionsForPrivateAPI: "base",
  hasRequiredPermissionsForPrivateAPISettingsEndpoints: "settings",
  hasRequiredPermissionsForPrivateAPIDeleteEndpoints: "delete",
  hasRequiredPermissionsForPrivateAPIArchiveEndpoints: "archive",
  hasRequiredParmissionsForPrivateAPIUsersEndpoints: "users",
  hasRequiredPermissionsForDeletingQuickTaskerUsers: "usersDelete",
  hasRequiredPermissionsForManagingWPUserCapabilities: "wpAdmin",
  hasRequiredPermissionsForArchiveCleanup: "archiveCleanup",
  hasRequiredPermissionsForManagingQuickTaskerSessions: "sessions",
  hasRequiredPermissionsForMyTasks: "myTasks",
};

const routeKey = ({ method, path: routePath }) => `${method} ${routePath}`;

/**
 * Fails the build when admin-routes.js no longer matches the routes and
 * permission callbacks registered in admin-api.php.
 */
function assertAdminRoutesMatchSource() {
  const source = fs.readFileSync(ADMIN_API_FILE, "utf8");
  const registered = source
    .split("register_rest_route(")
    .slice(1)
    .map((block) => {
      const phpPath = block.match(/'wpqt\/v1',\s*'([^']+)'/)[1];
      const callback = block.match(
        /permission_callback'\s*=>\s*function\s*\([^)]*\)\s*\{[\s\S]*?return\s+(?:PermissionService::|ServiceLocator::get\('PermissionService'\)->)(\w+)/,
      );
      return {
        method: block.match(/'methods'\s*=>\s*'(\w+)'/)[1],
        path: "/" + phpPath.replace(/\(\?P<(\w+)>[^)]+\)/g, "{$1}"),
        permission: callback ? PERMISSION_CALLBACKS[callback[1]] : undefined,
      };
    });

  const expected = new Map(adminRoutes.map((r) => [routeKey(r), r.permission]));
  const problems = [];
  registered.forEach((route) => {
    const key = routeKey(route);
    if (!expected.has(key)) {
      problems.push(`${key} is missing from admin-routes.js`);
    } else if (expected.get(key) !== route.permission) {
      problems.push(
        `${key} requires "${route.permission}" in admin-api.php but admin-routes.js expects "${expected.get(key)}"`,
      );
    }
    expected.delete(key);
  });
  expected.forEach((_, key) =>
    problems.push(
      `${key} is in admin-routes.js but not registered in admin-api.php`,
    ),
  );

  adminRoutes.forEach((route) => {
    const { board } = route;
    if (board === "none" || board === "filtered") {
      return;
    }
    if (typeof board !== "object" || board === null) {
      problems.push(
        `${routeKey(route)} needs a board scope: an object, "filtered" or "none"`,
      );
      return;
    }
    Object.keys(board.path ?? {}).forEach((placeholder) => {
      if (!route.path.includes(`{${placeholder}}`)) {
        problems.push(
          `${routeKey(route)} has no {${placeholder}} placeholder for its board scope`,
        );
      }
    });
  });

  if (problems.length) {
    throw new Error(
      "admin-routes.js is out of date:\n  " + problems.join("\n  "),
    );
  }
}

assertAdminRoutesMatchSource();

const DUMMY_ID = "999999";

/**
 * Builds a request that hits an admin route with dummy IDs and params, or with
 * the real IDs of its board scope when `useBoardScope` is set.
 */
function routeRequest(route, { name, auth, tests, useBoardScope = false }) {
  const scope = useBoardScope ? route.board : {};
  const routePath = route.path.replace(/\{(\w+)\}/g, (_, placeholder) =>
    scope.path?.[placeholder] ? `{{${scope.path[placeholder]}}}` : DUMMY_ID,
  );
  const params = { ...(route.params ?? {}), ...(scope.params ?? {}) };
  const options = { name, method: route.method, auth, tests };

  if (route.method === "GET") {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)]),
    ).toString();
    // Keep {{variables}} unencoded so Postman substitutes them.
    const url = query ? `${routePath}?${query}` : routePath;
    options.url = url.replace(/%7B%7B(\w+)%7D%7D/g, "{{$1}}");
  } else {
    options.url = routePath;
    if (Object.keys(params).length) {
      options.body = params;
    }
  }
  return request(options);
}

const basicAuth = (user, password) => ({
  type: "basic",
  basic: [
    { key: "username", value: `{{${user}}}`, type: "string" },
    { key: "password", value: `{{${password}}}`, type: "string" },
  ],
});
const subscriberAuth = basicAuth("subscriberUser", "subscriberAppPassword");
const limitedAuth = basicAuth("limitedUser", "limitedAppPassword");

const adminPermissions = folder(
  "Permissions",
  [
    folder(
      "Anonymous visitor is rejected everywhere",
      adminRoutes.map((route) =>
        routeRequest(route, {
          name: routeKey(route),
          auth: noAuth,
          tests: [status(401), wpErrorCode("rest_forbidden")],
        }),
      ),
    ),
    folder(
      "Subscriber is rejected everywhere",
      adminRoutes.map((route) =>
        routeRequest(route, {
          name: routeKey(route),
          auth: subscriberAuth,
          tests: [status(403), wpErrorCode("rest_forbidden")],
        }),
      ),
    ),
    folder("Limited admin (base capability only)", [
      request({
        name: "Can read boards",
        url: "/pipelines",
        auth: limitedAuth,
        tests: [status(200), success(true)],
      }),
      ...adminRoutes
        .filter((route) => route.permission !== "base")
        .map((route) =>
          routeRequest(route, {
            name: `${routeKey(route)} needs "${route.permission}"`,
            auth: limitedAuth,
            tests: [status(403), wpErrorCode("rest_forbidden")],
          }),
        ),
    ]),
  ],
  "Calls every admin route as an anonymous visitor, a subscriber and a user with only the base QuickTasker capability. Routes and expected permission levels come from admin-routes.js.",
);

const includesId = (description, listExpression, variable) =>
  `pm.test('${description}', () => pm.expect(${listExpression}.map((x) => String(x.id))).to.include(pm.collectionVariables.get('${variable}')));`;

const excludesId = (description, listExpression, variable) =>
  `pm.test('${description}', () => pm.expect(${listExpression}.map((x) => String(x.id))).to.not.include(pm.collectionVariables.get('${variable}')));`;

const onlyPrimaryBoard = (listExpression, variable) =>
  `pm.test('only board ${variable} is primary', () => pm.expect(${listExpression}.filter((x) => x.is_primary === '1').map((x) => String(x.id))).to.eql([pm.collectionVariables.get('${variable}')]));`;

const findLimitedWpUser = request({
  name: "List WordPress users",
  url: "/wp-users?type=all",
  tests: [
    status(200),
    `const limited = pm.response.json().data.find((u) => u.name === pm.variables.get('limitedUser'));
pm.test('limited user is listed', () => pm.expect(limited).to.be.an('object'));
pm.collectionVariables.set('limitedWpUserId', limited ? String(limited.id) : '0');`,
  ],
});

const adminBoards = folder("Boards", [
  request({
    name: "Create board requires name",
    method: "POST",
    url: "/pipelines",
    body: { description: "No name" },
    tests: [status(400), wpErrorCode("rest_missing_callback_param")],
  }),
  request({
    name: "Create board C",
    method: "POST",
    url: "/pipelines",
    body: { name: "API Board C {{runId}}", description: "Admin API board" },
    tests: [
      status(200),
      success(true),
      save("boardCId", "pm.response.json().data.id"),
    ],
  }),
  request({
    name: "List boards includes board C",
    url: "/pipelines",
    tests: [
      status(200),
      includesId("board C is listed", "pm.response.json().data", "boardCId"),
    ],
  }),
  request({
    name: "Get board C",
    url: "/pipelines/{{boardCId}}",
    tests: [
      status(200),
      `pm.test('returns the board with its settings', () => {
  const data = pm.response.json().data;
  pm.expect(String(data.pipeline.id)).to.eql(pm.collectionVariables.get('boardCId'));
  pm.expect(data.pipeline.settings).to.be.an('object');
});`,
    ],
  }),
  request({
    name: "Get missing board fails",
    url: "/pipelines/999999999",
    tests: [status(400), success(false)],
  }),
  request({
    name: "Rename board C",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}",
    body: { name: "API Board C {{runId}} renamed", description: "Renamed" },
    tests: [
      status(200),
      `pm.test('name updated', () => pm.expect(pm.response.json().data.name).to.eql('API Board C ' + pm.collectionVariables.get('runId') + ' renamed'));`,
    ],
  }),
  request({
    name: "Board overview",
    url: "/pipelines/{{boardCId}}/overview",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Create board D",
    method: "POST",
    url: "/pipelines",
    body: { name: "API Board D {{runId}}", description: "Primary board" },
    tests: [
      status(200),
      success(true),
      `pm.test('new board is not the admin\\'s primary board', () => pm.expect(pm.response.json().data.is_primary).to.eql('0'));`,
      save("boardDId", "pm.response.json().data.id"),
    ],
  }),
  request({
    name: "Admin sets board C as primary",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/set-primary",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Limited admin cannot set a board they are not added to as primary",
    method: "PATCH",
    url: "/pipelines/{{boardDId}}/set-primary",
    auth: limitedAuth,
    tests: [status(403), wpErrorCode("rest_forbidden")],
  }),
  request({
    name: "Limited admin without boards has no primary board",
    url: "/pipelines",
    auth: limitedAuth,
    tests: [
      status(200),
      `pm.test('no board is primary', () => pm.expect(pm.response.json().data.filter((x) => x.is_primary === '1')).to.be.empty);`,
    ],
  }),
  findLimitedWpUser,
  request({
    name: "Add limited admin to board D",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/pipelines",
    body: { pipeline_ids: ["{{boardDId}}"] },
    tests: [
      status(200),
      success(true),
      `pm.test('limited admin is added to board D only', () => pm.expect(pm.response.json().data.pipeline_ids).to.eql([Number(pm.collectionVariables.get('boardDId'))]));`,
    ],
  }),
  request({
    name: "Limited admin's primary board falls back to their only board",
    url: "/pipelines",
    auth: limitedAuth,
    tests: [
      status(200),
      onlyPrimaryBoard("pm.response.json().data", "boardDId"),
    ],
  }),
  request({
    name: "Limited admin sets board D as primary",
    method: "PATCH",
    url: "/pipelines/{{boardDId}}/set-primary",
    auth: limitedAuth,
    tests: [status(200), success(true)],
  }),
  request({
    name: "Admin's primary board is still board C",
    url: "/pipelines",
    tests: [
      status(200),
      onlyPrimaryBoard("pm.response.json().data", "boardCId"),
    ],
  }),
  request({
    name: "Limited admin's primary board is board D",
    url: "/pipelines",
    auth: limitedAuth,
    tests: [
      status(200),
      onlyPrimaryBoard("pm.response.json().data", "boardDId"),
    ],
  }),
  request({
    name: "Getting a board marks the admin's primary board",
    url: "/pipelines/{{boardDId}}",
    tests: [
      status(200),
      `pm.test('board D is not primary for admin', () => pm.expect(pm.response.json().data.pipeline.is_primary).to.eql('0'));`,
      onlyPrimaryBoard("pm.response.json().data.pipelines", "boardCId"),
    ],
  }),
  request({
    name: "Setting a missing board as primary fails",
    method: "PATCH",
    url: "/pipelines/999999999/set-primary",
    tests: [status(400), success(false)],
  }),
  request({
    name: "Adding a user to a missing board fails",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/pipelines",
    body: { pipeline_ids: ["{{boardDId}}", 999999999] },
    tests: [status(400), success(false)],
  }),
  request({
    name: "Board IDs must be numeric",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/pipelines",
    body: { pipeline_ids: ["x"] },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "Adding a missing user to boards fails",
    method: "PATCH",
    url: "/wp-users/999999999/pipelines",
    body: { pipeline_ids: [] },
    tests: [status(400), success(false)],
  }),
  request({
    name: "Failed changes keep the limited admin's boards",
    url: "/pipelines",
    auth: limitedAuth,
    tests: [
      status(200),
      onlyPrimaryBoard("pm.response.json().data", "boardDId"),
    ],
  }),
]);

const adminStages = folder("Stages", [
  ...["C1", "C2", "C3"].map((label) =>
    request({
      name: `Create stage ${label}`,
      method: "POST",
      url: "/pipelines/{{boardCId}}/stages",
      body: { name: `Stage ${label}`, description: "" },
      tests: [
        status(200),
        `pm.test('stage belongs to board C', () => pm.expect(String(pm.response.json().data.pipeline_id)).to.eql(pm.collectionVariables.get('boardCId')));`,
        save(`stage${label}Id`, "pm.response.json().data.id"),
      ],
    }),
  ),
  request({
    name: "Create stage on missing board fails",
    method: "POST",
    url: "/pipelines/999999999/stages",
    body: { name: "Orphan", description: "" },
    tests: [status(400), success(false)],
  }),
  request({
    name: "Rename stage C1",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/stages/{{stageC1Id}}",
    body: { name: "Stage C1 renamed", description: "First" },
    tests: [
      status(200),
      `pm.test('stage renamed', () => pm.expect(pm.response.json().data.name).to.eql('Stage C1 renamed'));`,
    ],
  }),
  request({
    name: "Move stage C2 left",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/stages/{{stageC2Id}}/move",
    body: { direction: "left" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Move stage C2 back right",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/stages/{{stageC2Id}}/move",
    body: { direction: "right" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Delete empty stage C3",
    method: "DELETE",
    url: "/pipelines/{{boardCId}}/stages/{{stageC3Id}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Deleted stage is gone from board",
    url: "/pipelines/{{boardCId}}",
    tests: [
      status(200),
      excludesId(
        "stage C3 is not listed",
        "pm.response.json().data.pipeline.stages",
        "stageC3Id",
      ),
    ],
  }),
]);

const adminTasks = folder("Tasks", [
  request({
    name: "Create task in stage C1",
    method: "POST",
    url: "/tasks",
    body: {
      name: "Admin task {{runId}}",
      stageId: "{{stageC1Id}}",
      pipelineId: "{{boardCId}}",
    },
    tests: [
      status(200),
      success(true),
      save("taskCId", "pm.response.json().data.newTask.id"),
    ],
  }),
  request({
    name: "Cannot create task with a stage from another board",
    method: "POST",
    url: "/tasks",
    body: {
      name: "Mismatched",
      stageId: "{{stageA1Id}}",
      pipelineId: "{{boardCId}}",
    },
    tests: [status(400), success(false)],
  }),
  request({
    name: "Edit task",
    method: "PATCH",
    url: "/tasks/{{taskCId}}",
    body: {
      name: "Admin task {{runId}} edited",
      description: "Edited description",
      due_date: "2030-02-01 09:00:00",
      free_for_all: true,
    },
    tests: [
      status(200),
      `pm.test('task fields updated', () => {
  const task = pm.response.json().data;
  pm.expect(task.name).to.eql('Admin task ' + pm.collectionVariables.get('runId') + ' edited');
  pm.expect(task.description).to.eql('Edited description');
  pm.expect(task.due_date).to.include('2030-02-01');
  pm.expect(Number(task.free_for_all)).to.eql(1);
});`,
    ],
  }),
  request({
    name: "Set focus colour",
    method: "PATCH",
    url: "/tasks/{{taskCId}}/focus-color",
    body: { color: "#00ff00" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Focus colour rejects non-hex value",
    method: "PATCH",
    url: "/tasks/{{taskCId}}/focus-color",
    body: { color: "green" },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "Mark task done",
    method: "PATCH",
    url: "/tasks/{{taskCId}}/done",
    body: { done: true },
    tests: [
      status(200),
      `pm.test('task is done', () => pm.expect(Number(pm.response.json().data.task.is_done)).to.eql(1));`,
    ],
  }),
  request({
    name: "Task logs record the changes",
    url: "/tasks/{{taskCId}}/logs",
    tests: [
      status(200),
      `pm.test('has log entries', () => pm.expect(pm.response.json().data).to.be.an('array').that.is.not.empty);`,
    ],
  }),
  request({
    name: "Archive task",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/tasks/{{taskCId}}/archive",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Archived task is listed in the archive",
    url: "/tasks/archived?order=DESC&pipelineId={{boardCId}}",
    tests: [
      status(200),
      includesId("task is archived", "pm.response.json().data", "taskCId"),
    ],
  }),
  request({
    name: "Restore task from archive",
    method: "PATCH",
    url: "/tasks/{{taskCId}}/archive-restore",
    body: { boardId: "{{boardCId}}" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Restored task leaves the archive",
    url: "/tasks/archived?order=DESC&pipelineId={{boardCId}}",
    tests: [
      status(200),
      excludesId("task is not archived", "pm.response.json().data", "taskCId"),
    ],
  }),
  request({
    name: "Move task to stage C2",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/tasks/{{taskCId}}/move",
    body: { stageId: "{{stageC2Id}}", order: 0 },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Task is in stage C2",
    url: "/pipelines/{{boardCId}}",
    tests: [
      status(200),
      `pm.test('stage C2 holds the task', () => {
  const stage = pm.response.json().data.pipeline.stages.find((s) => String(s.id) === pm.collectionVariables.get('stageC2Id'));
  pm.expect(stage.tasks.map((t) => String(t.id))).to.include(pm.collectionVariables.get('taskCId'));
});`,
    ],
  }),
  request({
    name: "Create task to archive with its stage",
    method: "POST",
    url: "/tasks",
    body: {
      name: "Stage archive task",
      stageId: "{{stageC1Id}}",
      pipelineId: "{{boardCId}}",
    },
    tests: [
      status(200),
      save("taskC2Id", "pm.response.json().data.newTask.id"),
    ],
  }),
  request({
    name: "Archive all tasks in stage C1",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/stages/{{stageC1Id}}/archive-tasks",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Stage tasks are archived",
    url: "/tasks/archived?order=DESC&pipelineId={{boardCId}}",
    tests: [
      status(200),
      includesId(
        "stage task is archived",
        "pm.response.json().data",
        "taskC2Id",
      ),
    ],
  }),
  request({
    name: "Delete archived task",
    method: "DELETE",
    url: "/tasks/{{taskC2Id}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Delete stage that has tasks fails",
    method: "DELETE",
    url: "/pipelines/{{boardCId}}/stages/{{stageC2Id}}",
    tests: [status(400), success(false)],
  }),
]);

const adminLabels = folder("Labels", [
  request({
    name: "Create label",
    method: "POST",
    url: "/pipelines/{{boardCId}}/labels",
    body: { name: "Urgent", color: "#ff0000" },
    tests: [status(200), save("labelCId", "pm.response.json().data.label.id")],
  }),
  request({
    name: "Create label rejects invalid colour",
    method: "POST",
    url: "/pipelines/{{boardCId}}/labels",
    body: { name: "Bad", color: "red" },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "List labels",
    url: "/pipelines/{{boardCId}}/labels",
    tests: [
      status(200),
      includesId(
        "label is listed",
        "pm.response.json().data.labels",
        "labelCId",
      ),
    ],
  }),
  request({
    name: "Edit label",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/labels/{{labelCId}}",
    body: { name: "Very urgent", color: "#aa0000" },
    tests: [
      status(200),
      `pm.test('label updated', () => {
  const label = pm.response.json().data.label;
  pm.expect(label.name).to.eql('Very urgent');
  pm.expect(label.color).to.eql('#aa0000');
});`,
    ],
  }),
  request({
    name: "Assign label to task",
    method: "POST",
    url: "/pipelines/{{boardCId}}/tasks/{{taskCId}}/labels",
    body: { labelId: "{{labelCId}}" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Task shows the label",
    url: "/pipelines/{{boardCId}}",
    tests: [
      status(200),
      `pm.test('task has the label', () => {
  const tasks = pm.response.json().data.pipeline.stages.flatMap((s) => s.tasks || []);
  const task = tasks.find((t) => String(t.id) === pm.collectionVariables.get('taskCId'));
  pm.expect(task.assigned_labels.map((l) => String(l.id))).to.include(pm.collectionVariables.get('labelCId'));
});`,
    ],
  }),
  request({
    name: "Unassign label from task",
    method: "DELETE",
    url: "/pipelines/{{boardCId}}/tasks/{{taskCId}}/labels/{{labelCId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Delete label",
    method: "DELETE",
    url: "/pipelines/{{boardCId}}/labels/{{labelCId}}",
    tests: [
      status(200),
      `pm.test('returns the deleted label', () => pm.expect(String(pm.response.json().data.deletedLabel.id)).to.eql(pm.collectionVariables.get('labelCId')));`,
    ],
  }),
]);

const adminComments = folder("Comments", [
  request({
    name: "Add private task comment",
    method: "POST",
    url: "/comments",
    body: {
      comment: "Private note {{runId}}",
      typeId: "{{taskCId}}",
      type: "task",
      isPrivate: true,
    },
    tests: [
      status(200),
      success(true),
      save("commentCId", "pm.response.json().data.newComment.id"),
    ],
  }),
  request({
    name: "Private comments include it",
    url: "/comments?typeId={{taskCId}}&type=task&isPrivate=true",
    tests: [
      status(200),
      includesId("comment is listed", "pm.response.json().data", "commentCId"),
    ],
  }),
  request({
    name: "Public comments do not include it",
    url: "/comments?typeId={{taskCId}}&type=task&isPrivate=false",
    tests: [
      status(200),
      excludesId(
        "private comment is not public",
        "pm.response.json().data",
        "commentCId",
      ),
    ],
  }),
  request({
    name: "Comment rejects unknown type",
    method: "POST",
    url: "/comments",
    body: {
      comment: "x",
      typeId: "{{taskCId}}",
      type: "pipeline",
      isPrivate: false,
    },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
]);

const adminMyTasks = folder("My tasks", [
  request({
    name: "My tasks lists tasks the admin created",
    url: "/my-tasks",
    tests: [
      status(200),
      includesId(
        "created task is listed",
        "pm.response.json().data.created",
        "taskCId",
      ),
    ],
  }),
  request({
    name: "Comment on own task",
    method: "POST",
    url: "/my-tasks/comments",
    body: { comment: "My task comment {{runId}}", taskId: "{{taskCId}}" },
    tests: [
      status(200),
      save("myTaskCommentId", "pm.response.json().data.newComment.id"),
    ],
  }),
  request({
    name: "Own task comments include it",
    url: "/my-tasks/comments?taskId={{taskCId}}",
    tests: [
      status(200),
      includesId(
        "comment is listed",
        "pm.response.json().data",
        "myTaskCommentId",
      ),
    ],
  }),
]);

const adminCustomFields = folder("Custom fields", [
  request({
    name: "Create task custom field",
    method: "POST",
    url: "/custom-fields",
    body: {
      entityType: "task",
      entityId: "{{taskCId}}",
      name: "Budget",
      description: "",
      type: "text",
    },
    tests: [status(200), save("customFieldCId", "pm.response.json().data.id")],
  }),
  request({
    name: "Create custom field rejects unknown type",
    method: "POST",
    url: "/custom-fields",
    body: {
      entityType: "task",
      entityId: "{{taskCId}}",
      name: "Bad",
      type: "script",
    },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "Set custom field value",
    method: "PATCH",
    url: "/custom-fields/{{customFieldCId}}/value",
    body: { entityId: "{{taskCId}}", entityType: "task", value: "1500" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Set custom field default value",
    method: "PATCH",
    url: "/custom-fields/{{customFieldCId}}/default-value",
    body: { value: "0" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Active custom fields include it with its value",
    url: "/custom-fields?entityType=task&entityId={{taskCId}}&active=true",
    tests: [
      status(200),
      `pm.test('field is listed with value', () => {
  const field = pm.response.json().data.find((f) => String(f.id) === pm.collectionVariables.get('customFieldCId'));
  pm.expect(field).to.be.an('object');
  pm.expect(JSON.stringify(field)).to.include('1500');
});`,
    ],
  }),
  request({
    name: "Delete custom field",
    method: "DELETE",
    url: "/custom-fields/{{customFieldCId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Deleted custom field is no longer active",
    url: "/custom-fields?entityType=task&entityId={{taskCId}}&active=true",
    tests: [
      status(200),
      excludesId(
        "field is not active",
        "pm.response.json().data",
        "customFieldCId",
      ),
    ],
  }),
  request({
    name: "Restore custom field",
    method: "PATCH",
    url: "/custom-fields/{{customFieldCId}}/restore",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Restored custom field is active again",
    url: "/custom-fields?entityType=task&entityId={{taskCId}}&active=true",
    tests: [
      status(200),
      includesId(
        "field is active",
        "pm.response.json().data",
        "customFieldCId",
      ),
    ],
  }),
]);

const adminUsers = folder("Users", [
  request({
    name: "Create QuickTasker user",
    method: "POST",
    url: "/users",
    body: {
      name: "Admin API user {{runId}}",
      description: "Managed by Newman",
    },
    tests: [
      status(200),
      save("admQtUserId", "pm.response.json().data.id"),
      save("admQtPageHash", "pm.response.json().data.page_hash"),
    ],
  }),
  request({
    name: "List users includes the new user",
    url: "/users",
    tests: [
      status(200),
      includesId("user is listed", "pm.response.json().data", "admQtUserId"),
    ],
  }),
  request({
    name: "Get extended user",
    url: "/users/{{admQtUserId}}/extended",
    tests: [
      status(200),
      `pm.test('returns the user', () => pm.expect(String(pm.response.json().data.id)).to.eql(pm.collectionVariables.get('admQtUserId')));`,
    ],
  }),
  request({
    name: "Edit user",
    method: "PATCH",
    url: "/users/{{admQtUserId}}",
    body: { name: "Admin API user {{runId}} edited", description: "Edited" },
    tests: [
      status(200),
      `pm.test('name updated', () => pm.expect(pm.response.json().data.name).to.eql('Admin API user ' + pm.collectionVariables.get('runId') + ' edited'));`,
    ],
  }),
  request({
    name: "Assign user to task",
    method: "POST",
    url: "/users/{{admQtUserId}}/tasks/{{taskCId}}",
    body: { user_type: "quicktasker" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "User tasks include the task",
    url: "/users/{{admQtUserId}}/tasks",
    tests: [
      status(200),
      includesId("task is assigned", "pm.response.json().data", "taskCId"),
    ],
  }),
  request({
    name: "Assign rejects unknown user type",
    method: "POST",
    url: "/users/{{admQtUserId}}/tasks/{{taskCId}}",
    body: { user_type: "robot" },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "Unassign user from task",
    method: "DELETE",
    url: "/users/{{admQtUserId}}/tasks/{{taskCId}}",
    body: { user_type: "quicktasker" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "User tasks no longer include the task",
    url: "/users/{{admQtUserId}}/tasks",
    tests: [
      status(200),
      excludesId("task is unassigned", "pm.response.json().data", "taskCId"),
    ],
  }),
  request({
    name: "Deactivate user",
    method: "PATCH",
    url: "/users/{{admQtUserId}}/status",
    body: { status: false },
    tests: [
      status(200),
      `pm.test('user is inactive', () => pm.expect(Number(pm.response.json().data.is_active)).to.eql(0));`,
    ],
  }),
  request({
    name: "Reactivate user",
    method: "PATCH",
    url: "/users/{{admQtUserId}}/status",
    body: { status: true },
    tests: [
      status(200),
      `pm.test('user is active', () => pm.expect(Number(pm.response.json().data.is_active)).to.eql(1));`,
    ],
  }),
  request({
    name: "Password reset fails before a password is set",
    method: "PATCH",
    url: "/users/{{admQtUserId}}/password-reset",
    tests: [status(400), success(false)],
  }),
  userPageRequest({
    name: "User completes setup",
    method: "POST",
    url: "/user-page/setup",
    headerOptions: { code: "{{admQtPageHash}}", session: null },
    body: { password: "Admin-flow-pass-1" },
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "User logs in",
    method: "POST",
    url: "/user-page/login",
    headerOptions: { code: "{{admQtPageHash}}", session: null },
    body: { password: "Admin-flow-pass-1" },
    tests: [
      status(200),
      save("admQtSession", "pm.response.json().data.sessionToken"),
    ],
  }),
  request({
    name: "Sessions list includes the user",
    url: "/users/sessions",
    tests: [
      status(200),
      `pm.test('user has a session', () => pm.expect(JSON.stringify(pm.response.json().data)).to.include('Admin API user ' + pm.collectionVariables.get('runId')));`,
    ],
  }),
  request({
    name: "Reset password",
    method: "PATCH",
    url: "/users/{{admQtUserId}}/password-reset",
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "Password reset ends existing sessions",
    url: "/user-page/overview",
    headerOptions: { code: "{{admQtPageHash}}", session: "{{admQtSession}}" },
    tests: [status(400), success(false)],
  }),
  userPageRequest({
    name: "User must complete setup again",
    url: "/user-page/status",
    headerOptions: { code: "{{admQtPageHash}}", session: null },
    tests: [
      status(200),
      `pm.test('setupCompleted is false', () => pm.expect(pm.response.json().data.setupCompleted).to.eql(false));`,
    ],
  }),
  userPageRequest({
    name: "User completes setup again",
    method: "POST",
    url: "/user-page/setup",
    headerOptions: { code: "{{admQtPageHash}}", session: null },
    body: { password: "Admin-flow-pass-2" },
    tests: [status(200), success(true)],
  }),
  userPageRequest({
    name: "User logs in again",
    method: "POST",
    url: "/user-page/login",
    headerOptions: { code: "{{admQtPageHash}}", session: null },
    body: { password: "Admin-flow-pass-2" },
    tests: [
      status(200),
      save("admQtSession", "pm.response.json().data.sessionToken"),
    ],
  }),
  request({
    name: "Assign user to task before deletion",
    method: "POST",
    url: "/users/{{admQtUserId}}/tasks/{{taskCId}}",
    body: { user_type: "quicktasker" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Count task unassign logs before deletion",
    url: "/tasks/{{taskCId}}/logs",
    tests: [
      status(200),
      save(
        "admQtUnassignLogs",
        "pm.response.json().data.filter((log) => log.text.includes(' unassigned from Admin API user ')).length",
      ),
    ],
  }),
  request({
    name: "Delete user",
    method: "DELETE",
    url: "/users/{{admQtUserId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Deleted user is not listed",
    url: "/users",
    tests: [
      status(200),
      excludesId("user is gone", "pm.response.json().data", "admQtUserId"),
    ],
  }),
  request({
    name: "Deleting the user logs the task unassignment",
    url: "/tasks/{{taskCId}}/logs",
    tests: [
      status(200),
      `pm.test('one more unassign log', () => {
  const count = pm.response.json().data.filter((log) => log.text.includes(' unassigned from Admin API user ')).length;
  pm.expect(count).to.eql(Number(pm.collectionVariables.get('admQtUnassignLogs')) + 1);
});`,
    ],
  }),
  userPageRequest({
    name: "Deleting the user ends their sessions",
    url: "/user-page/overview",
    headerOptions: { code: "{{admQtPageHash}}", session: "{{admQtSession}}" },
    tests: failsWith("Invalid session token"),
  }),
  userPageRequest({
    name: "Deleted user cannot log in",
    method: "POST",
    url: "/user-page/login",
    headerOptions: { code: "{{admQtPageHash}}", session: null },
    body: { password: "Admin-flow-pass-2" },
    tests: failsWith("User is not active"),
  }),
  userPageRequest({
    name: "Deleted user cannot set a new password",
    method: "POST",
    url: "/user-page/setup",
    headerOptions: { code: "{{admQtPageHash}}", session: null },
    body: { password: "Takeover-pass-3" },
    tests: failsWith("User is not active"),
  }),
  userPageRequest({
    name: "Status reports the deleted user as not active",
    url: "/user-page/status",
    headerOptions: { code: "{{admQtPageHash}}", session: null },
    tests: [
      status(200),
      `pm.test('isActiveUser is false', () => pm.expect(pm.response.json().data.isActiveUser).to.eql(false));`,
    ],
  }),
]);

const adminWpUsers = folder("WordPress user capabilities", [
  findLimitedWpUser,
  request({
    name: "Add limited user to boards C and D",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/pipelines",
    body: { pipeline_ids: ["{{boardDId}}", "{{boardCId}}"] },
    tests: [
      status(200),
      success(true),
      `pm.test('boards are saved in ID order', () => pm.expect(pm.response.json().data.pipeline_ids).to.eql([Number(pm.collectionVariables.get('boardCId')), Number(pm.collectionVariables.get('boardDId'))]));`,
      `pm.test('no tasks are reported without removed boards', () => pm.expect(pm.response.json().data.removed_pipelines_with_assigned_tasks).to.eql([]));`,
    ],
  }),
  request({
    name: "WordPress user list shows the limited user's boards",
    url: "/wp-users?type=all",
    tests: [
      status(200),
      `const limited = pm.response.json().data.find((u) => String(u.id) === pm.collectionVariables.get('limitedWpUserId'));
pm.test('limited user has boards C and D', () => pm.expect(limited.pipeline_ids).to.eql([Number(pm.collectionVariables.get('boardCId')), Number(pm.collectionVariables.get('boardDId'))]));`,
    ],
  }),
  request({
    name: "Create board access task in stage C1",
    method: "POST",
    url: "/tasks",
    body: {
      name: "Board access task {{runId}}",
      stageId: "{{stageC1Id}}",
      pipelineId: "{{boardCId}}",
    },
    tests: [
      status(200),
      success(true),
      save("boardAccessTaskId", "pm.response.json().data.newTask.id"),
    ],
  }),
  request({
    name: "Assign limited user to the board access task",
    method: "POST",
    url: "/users/{{limitedWpUserId}}/tasks/{{boardAccessTaskId}}",
    body: { user_type: "wp-user" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Removing limited user from board C reports their task there",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/pipelines",
    body: { pipeline_ids: ["{{boardDId}}"] },
    tests: [
      status(200),
      success(true),
      `pm.test('one assigned task on board C is reported', () => pm.expect(pm.response.json().data.removed_pipelines_with_assigned_tasks).to.eql([{ pipeline_id: Number(pm.collectionVariables.get('boardCId')), task_count: 1 }]));`,
    ],
  }),
  request({
    name: "Removing limited user from a board without their tasks reports nothing",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/pipelines",
    body: { pipeline_ids: [] },
    tests: [
      status(200),
      success(true),
      `pm.test('limited user has no boards', () => pm.expect(pm.response.json().data.pipeline_ids).to.eql([]));`,
      `pm.test('no tasks are reported', () => pm.expect(pm.response.json().data.removed_pipelines_with_assigned_tasks).to.eql([]));`,
    ],
  }),
  request({
    name: "Limited user cannot read board settings",
    url: "/pipelines/{{boardCId}}/settings",
    auth: limitedAuth,
    tests: [status(403)],
  }),
  request({
    name: "Limited user's QuickTasker list has no page hashes",
    url: "/users",
    auth: limitedAuth,
    tests: [
      status(200),
      success(true),
      `const users = pm.response.json().data;
pm.test('QuickTaskers are listed', () => pm.expect(users).to.not.be.empty);
pm.test('no page_hash is exposed', () => pm.expect(users.filter((u) => 'page_hash' in u)).to.be.empty);`,
    ],
  }),
  request({
    name: "Add limited user back to board C",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/pipelines",
    body: { pipeline_ids: ["{{boardCId}}"] },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Grant limited user the settings capability",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/capabilities",
    body: {
      quicktasker_admin_role: true,
      quicktasker_admin_role_allow_delete: false,
      quicktasker_admin_role_manage_users: false,
      quicktasker_admin_role_manage_settings: true,
      quicktasker_admin_role_manage_archive: false,
      quicktasker_access_user_page_app: false,
      quicktasker_view_my_tasks: false,
    },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Limited user can now read board settings",
    url: "/pipelines/{{boardCId}}/settings",
    auth: limitedAuth,
    tests: [status(200), success(true)],
  }),
  request({
    name: "Revoke the settings capability",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/capabilities",
    body: {
      quicktasker_admin_role: true,
      quicktasker_admin_role_allow_delete: false,
      quicktasker_admin_role_manage_users: false,
      quicktasker_admin_role_manage_settings: false,
      quicktasker_admin_role_manage_archive: false,
      quicktasker_access_user_page_app: false,
      quicktasker_view_my_tasks: false,
    },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Limited user is blocked again",
    url: "/pipelines/{{boardCId}}/settings",
    auth: limitedAuth,
    tests: [status(403)],
  }),
  request({
    name: "Grant limited user the manage users capability",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/capabilities",
    body: {
      quicktasker_admin_role: true,
      quicktasker_admin_role_allow_delete: false,
      quicktasker_admin_role_manage_users: true,
      quicktasker_admin_role_manage_settings: false,
      quicktasker_admin_role_manage_archive: false,
      quicktasker_access_user_page_app: false,
      quicktasker_view_my_tasks: false,
    },
    tests: [status(200), success(true)],
  }),
  request({
    name: "User manager can create a QuickTasker",
    method: "POST",
    url: "/users",
    auth: limitedAuth,
    body: {
      name: "API user manager QuickTasker {{runId}}",
      description: "Created by a non-admin user manager",
    },
    tests: [
      status(200),
      success(true),
      save("userManagerQuickTaskerId", "pm.response.json().data.id"),
    ],
  }),
  request({
    name: "User manager's QuickTasker list includes page hashes",
    url: "/users",
    auth: limitedAuth,
    tests: [
      status(200),
      `const created = pm.response.json().data.find((u) => String(u.id) === pm.collectionVariables.get('userManagerQuickTaskerId'));
pm.test('created QuickTasker has a page_hash', () => pm.expect(created && created.page_hash).to.be.a('string').and.not.be.empty);`,
    ],
  }),
  request({
    name: "User manager can edit a QuickTasker",
    method: "PATCH",
    url: "/users/{{userManagerQuickTaskerId}}",
    auth: limitedAuth,
    body: { name: "API user manager QuickTasker {{runId}} edited" },
    tests: [status(200), success(true)],
  }),
  request({
    name: "User manager without delete cannot delete a QuickTasker",
    method: "DELETE",
    url: "/users/{{userManagerQuickTaskerId}}",
    auth: limitedAuth,
    tests: [status(403)],
  }),
  request({
    name: "User manager cannot list WordPress users",
    url: "/wp-users?type=all",
    auth: limitedAuth,
    tests: [status(403)],
  }),
  request({
    name: "User manager cannot change their own WordPress user permissions",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/capabilities",
    auth: limitedAuth,
    body: {
      quicktasker_admin_role: true,
      quicktasker_admin_role_allow_delete: true,
      quicktasker_admin_role_manage_users: true,
      quicktasker_admin_role_manage_settings: true,
      quicktasker_admin_role_manage_archive: true,
      quicktasker_access_user_page_app: true,
      quicktasker_view_my_tasks: true,
    },
    tests: [status(403)],
  }),
  request({
    name: "User manager still cannot read board settings",
    url: "/pipelines/{{boardCId}}/settings",
    auth: limitedAuth,
    tests: [status(403)],
  }),
  request({
    name: "Delete the user manager's QuickTasker",
    method: "DELETE",
    url: "/users/{{userManagerQuickTaskerId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Get the admin's own WordPress user ID",
    rawUrl: "{{baseUrl}}/wp-json/wp/v2/users/me",
    tests: [status(200), save("adminWpUserId", "pm.response.json().id")],
  }),
  request({
    name: "Admin cannot change their own permissions",
    method: "PATCH",
    url: "/wp-users/{{adminWpUserId}}/capabilities",
    body: {
      quicktasker_admin_role: false,
      quicktasker_admin_role_allow_delete: false,
      quicktasker_admin_role_manage_users: false,
      quicktasker_admin_role_manage_settings: false,
      quicktasker_admin_role_manage_archive: false,
      quicktasker_access_user_page_app: false,
      quicktasker_view_my_tasks: false,
    },
    tests: [
      status(400),
      success(false),
      messageContains("You cannot change your own permissions"),
    ],
  }),
  request({
    name: "Revoke the manage users capability",
    method: "PATCH",
    url: "/wp-users/{{limitedWpUserId}}/capabilities",
    body: {
      quicktasker_admin_role: true,
      quicktasker_admin_role_allow_delete: false,
      quicktasker_admin_role_manage_users: false,
      quicktasker_admin_role_manage_settings: false,
      quicktasker_admin_role_manage_archive: false,
      quicktasker_access_user_page_app: false,
      quicktasker_view_my_tasks: false,
    },
    tests: [status(200), success(true)],
  }),
]);

const adminSettings = folder("Settings", [
  request({
    name: "Update board settings",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/settings",
    body: {
      pipeline_refresh_interval: 45,
      enable_automation_logs: true,
      enable_webhook_logs: true,
    },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Board settings are saved",
    url: "/pipelines/{{boardCId}}/settings",
    tests: [
      status(200),
      `pm.test('settings reflect the update', () => {
  const settings = pm.response.json().data.settings;
  pm.expect(Number(settings.pipeline_refresh_interval)).to.eql(45);
  pm.expect(Number(settings.enable_automation_logs)).to.eql(1);
});`,
    ],
  }),
  request({
    name: "User page custom styles strip markup",
    method: "PATCH",
    url: "/settings/user-page-custom-styles",
    body: { styles: "body { color: red; }</style><script>alert(1)</script>" },
    tests: [
      status(200),
      `pm.test('no tags survive', () => {
  const styles = JSON.stringify(pm.response.json().data);
  pm.expect(styles).to.not.include('<script');
  pm.expect(styles).to.not.include('</style');
});`,
    ],
  }),
  request({
    name: "Reset user page custom styles",
    method: "PATCH",
    url: "/settings/user-page-custom-styles",
    body: { styles: "" },
    tests: [status(200), success(true)],
  }),
]);

const adminAutomations = folder("Automations", [
  request({
    name: "Create automation: archive tasks when done",
    method: "POST",
    url: "/pipelines/{{boardCId}}/automations",
    body: {
      automationTarget: "task",
      automationTrigger: "task-done",
      automationAction: "archive-task",
    },
    tests: [status(200), save("automationCId", "pm.response.json().data.id")],
  }),
  request({
    name: "Automation rejects unknown trigger",
    method: "POST",
    url: "/pipelines/{{boardCId}}/automations",
    body: {
      automationTarget: "task",
      automationTrigger: "moon-phase",
      automationAction: "archive-task",
    },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "List automations",
    url: "/pipelines/{{boardCId}}/automations",
    tests: [
      status(200),
      includesId(
        "automation is listed",
        "pm.response.json().data.automations",
        "automationCId",
      ),
    ],
  }),
  request({
    name: "Create task for the automation",
    method: "POST",
    url: "/tasks",
    body: {
      name: "Auto-archived {{runId}}",
      stageId: "{{stageC1Id}}",
      pipelineId: "{{boardCId}}",
    },
    tests: [
      status(200),
      save("autoTaskId", "pm.response.json().data.newTask.id"),
    ],
  }),
  request({
    name: "Marking the task done runs the automation",
    method: "PATCH",
    url: "/tasks/{{autoTaskId}}/done",
    body: { done: true },
    tests: [
      status(200),
      `pm.test('automation executed', () => pm.expect(pm.response.json().data.executedAutomations).to.be.an('array').that.is.not.empty);`,
    ],
  }),
  request({
    name: "Automation archived the task",
    url: "/tasks/archived?order=DESC&pipelineId={{boardCId}}",
    tests: [
      status(200),
      includesId("task was archived", "pm.response.json().data", "autoTaskId"),
    ],
  }),
  request({
    name: "Disable automation",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/automations/{{automationCId}}/active",
    body: { active: false },
    tests: [
      status(200),
      `pm.test('automation is inactive', () => pm.expect(Number(pm.response.json().data.automation.active)).to.eql(0));`,
    ],
  }),
  request({
    name: "Create task for the disabled automation",
    method: "POST",
    url: "/tasks",
    body: {
      name: "Not archived {{runId}}",
      stageId: "{{stageC1Id}}",
      pipelineId: "{{boardCId}}",
    },
    tests: [
      status(200),
      save("autoTask2Id", "pm.response.json().data.newTask.id"),
    ],
  }),
  request({
    name: "Disabled automation does not run",
    method: "PATCH",
    url: "/tasks/{{autoTask2Id}}/done",
    body: { done: true },
    tests: [
      status(200),
      `pm.test('no automation executed', () => pm.expect(pm.response.json().data.executedAutomations).to.be.empty);`,
    ],
  }),
  request({
    name: "Delete automation",
    method: "DELETE",
    url: "/pipelines/{{boardCId}}/automations/{{automationCId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Deleted automation is not listed",
    url: "/pipelines/{{boardCId}}/automations",
    tests: [
      status(200),
      excludesId(
        "automation is gone",
        "pm.response.json().data.automations",
        "automationCId",
      ),
    ],
  }),
]);

const WEBHOOK_RECEIVER = "{{baseUrl}}/wp-json/qt-test/v1";

const adminWebhooks = folder("Webhooks", [
  request({
    name: "Create webhook for task creation",
    method: "POST",
    url: "/pipelines/{{boardCId}}/webhooks",
    body: {
      target_type: "task",
      target_action: "created",
      webhook_url: `${WEBHOOK_RECEIVER}/capture/qt-api-{{runId}}`,
      webhook_confirm: false,
    },
    tests: [
      status(200),
      save("webhookCId", "pm.response.json().data.webhook.id"),
    ],
  }),
  request({
    name: "Webhook rejects unknown action",
    method: "POST",
    url: "/pipelines/{{boardCId}}/webhooks",
    body: {
      target_type: "task",
      target_action: "exploded",
      webhook_url: "https://example.com",
      webhook_confirm: false,
    },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "List webhooks",
    url: "/pipelines/{{boardCId}}/webhooks",
    tests: [
      status(200),
      includesId(
        "webhook is listed",
        "pm.response.json().data.webhooks",
        "webhookCId",
      ),
    ],
  }),
  request({
    name: "Creating a task fires the webhook",
    method: "POST",
    url: "/tasks",
    body: {
      name: "Webhook task {{runId}}",
      stageId: "{{stageC1Id}}",
      pipelineId: "{{boardCId}}",
    },
    tests: [
      status(200),
      save("webhookTaskId", "pm.response.json().data.newTask.id"),
    ],
  }),
  request({
    name: "Receiver got the webhook",
    rawUrl: `${WEBHOOK_RECEIVER}/captured/qt-api-{{runId}}`,
    auth: noAuth,
    tests: [
      `// Delivery may be asynchronous: poll this request up to 20 times.
const captured = pm.response.json();
const attempts = Number(pm.collectionVariables.get('webhookPollAttempts') || 0);
if ((!Array.isArray(captured) || captured.length === 0) && attempts < 20) {
  pm.collectionVariables.set('webhookPollAttempts', String(attempts + 1));
  setTimeout(() => {}, 250);
  pm.execution.setNextRequest(pm.info.requestName);
} else {
  pm.collectionVariables.set('webhookPollAttempts', '0');
  pm.test('webhook payload describes the new task', () => {
    pm.expect(captured).to.be.an('array').that.is.not.empty;
    pm.expect(JSON.stringify(captured[0].body)).to.include('Webhook task ' + pm.collectionVariables.get('runId'));
  });
}`,
    ],
  }),
  request({
    name: "Deactivate webhook",
    method: "PATCH",
    url: "/webhooks/{{webhookCId}}",
    body: { active: false },
    tests: [
      status(200),
      `pm.test('webhook is inactive', () => pm.expect(Number(pm.response.json().data.webhook.active)).to.eql(0));`,
    ],
  }),
  request({
    name: "Delete webhook",
    method: "DELETE",
    url: "/webhooks/{{webhookCId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Clear captured webhooks",
    method: "DELETE",
    rawUrl: `${WEBHOOK_RECEIVER}/captured/qt-api-{{runId}}`,
    auth: noAuth,
    tests: [status(200)],
  }),
]);

const uploadTo = (name, src, tests) =>
  request({
    name,
    method: "POST",
    url: "/uploads",
    formData: [
      { key: "entity_id", value: "{{taskCId}}" },
      { key: "entity_type", value: "task" },
      { key: "file_to_upload", src },
    ],
    tests,
  });

const adminUploads = folder("Uploads", [
  uploadTo("Upload a text attachment", "tests/api/fixtures/attachment.txt", [
    status(200),
    success(true),
    save("uploadCId", "pm.response.json().data.upload.id"),
  ]),
  uploadTo("PHP files are rejected", "tests/api/fixtures/not-allowed.php", [
    status(400),
    success(false),
  ]),
  uploadTo(
    "Files whose content does not match the extension are rejected",
    "tests/api/fixtures/fake-image.png",
    [status(400), success(false)],
  ),
  request({
    name: "List task uploads",
    url: "/uploads?entity_id={{taskCId}}&entity_type=task",
    tests: [
      status(200),
      includesId(
        "upload is listed",
        "pm.response.json().data.uploads",
        "uploadCId",
      ),
    ],
  }),
  request({
    name: "Delete upload",
    method: "DELETE",
    url: "/uploads/{{uploadCId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Deleted upload is not listed",
    url: "/uploads?entity_id={{taskCId}}&entity_type=task",
    tests: [
      status(200),
      excludesId(
        "upload is gone",
        "pm.response.json().data.uploads",
        "uploadCId",
      ),
    ],
  }),
]);

const adminImport = folder("Import", [
  request({
    name: "Import a QuickTasker board",
    method: "POST",
    url: "/import",
    body: {
      source: "QUICKTASKER-IMPORT",
      data: {
        pipelineName: "Imported {{runId}}",
        pipelineDescription: "Imported by Newman",
        stages: [
          { stageId: "s1", stageName: "Imported stage", stageDescription: "" },
        ],
        tasks: [
          {
            taskId: "t1",
            taskName: "Imported task",
            taskDescription: "",
            stageId: "s1",
            archived: false,
            dueDate: null,
            taskCompletedAt: null,
            assignedLabels: [
              { labelId: "l1", labelName: "Imported label", color: "#123456" },
            ],
            customFields: [],
          },
        ],
        labels: [
          { labelId: "l1", labelName: "Imported label", color: "#123456" },
        ],
        taskComments: [],
      },
    },
    tests: [
      status(200),
      success(true),
      save("importedBoardId", "pm.response.json().data.pipeline.id"),
    ],
  }),
  request({
    name: "Imported board has its stage and task",
    url: "/pipelines/{{importedBoardId}}",
    tests: [
      status(200),
      `pm.test('stage and task were imported', () => {
  const stages = pm.response.json().data.pipeline.stages;
  pm.expect(stages.map((s) => s.name)).to.include('Imported stage');
  pm.expect(stages.flatMap((s) => s.tasks || []).map((t) => t.name)).to.include('Imported task');
});`,
    ],
  }),
  request({
    name: "Import rejects malformed data",
    method: "POST",
    url: "/import",
    body: { source: "QUICKTASKER-IMPORT", data: { pipelineName: "Broken" } },
    tests: [status(400), wpErrorCode("rest_invalid_param")],
  }),
  request({
    name: "Delete imported board",
    method: "DELETE",
    url: "/pipelines/{{importedBoardId}}",
    tests: [status(200), success(true)],
  }),
]);

const adminLogsAndNotifications = folder("Logs and notifications", [
  request({
    name: "Board logs",
    url: "/logs?type=pipeline&typeId={{boardCId}}",
    tests: [
      status(200),
      `pm.test('board has log entries', () => pm.expect(pm.response.json().data).to.be.an('array').that.is.not.empty);`,
    ],
  }),
  request({
    name: "Global logs",
    url: "/global-logs?order=DESC&numberOfLogs=5",
    tests: [
      status(200),
      `pm.test('returns at most 5 logs', () => pm.expect(pm.response.json().data.length).to.be.at.most(5));`,
    ],
  }),
  request({
    name: "Notifications",
    url: "/notifications",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Mark missing notification read fails",
    method: "POST",
    url: "/notifications/999999999/read",
    tests: [status(400), success(false)],
  }),
  request({
    name: "Mark all notifications read",
    method: "POST",
    url: "/notifications/read-all",
    body: { notification_ids: [] },
    tests: [status(200), success(true)],
  }),
  request({
    name: "Save notification preferences",
    method: "POST",
    url: "/notifications/preferences",
    body: { filter: "all", max_age_hours: 24 },
    tests: [
      status(200),
      `pm.test('preferences saved', () => pm.expect(pm.response.json().data.filter).to.eql('all'));`,
    ],
  }),
]);

const outsiderAuth = basicAuth("outsiderUser", "outsiderAppPassword");

const excludesBoardE = (description, listExpression) =>
  `pm.test('${description}', () => pm.expect(${listExpression}.filter((x) => String(x.pipeline_id) === pm.collectionVariables.get('boardEId'))).to.be.empty);`;

const adminBoardAccess = folder(
  "Board access",
  [
    folder("Set up board E", [
      request({
        name: "Create board E",
        method: "POST",
        url: "/pipelines",
        body: { name: "API Board E {{runId}}", description: "Board access" },
        tests: [status(200), save("boardEId", "pm.response.json().data.id")],
      }),
      request({
        name: "Create stage E1",
        method: "POST",
        url: "/pipelines/{{boardEId}}/stages",
        body: { name: "Stage E1", description: "" },
        tests: [status(200), save("stageE1Id", "pm.response.json().data.id")],
      }),
      ...["E1", "E2"].map((label) =>
        request({
          name: `Create task ${label}`,
          method: "POST",
          url: "/tasks",
          body: {
            name: `Board access task ${label} {{runId}}`,
            stageId: "{{stageE1Id}}",
            pipelineId: "{{boardEId}}",
          },
          tests: [
            status(200),
            save(`task${label}Id`, "pm.response.json().data.newTask.id"),
          ],
        }),
      ),
      request({
        name: "Archive task E2",
        method: "PATCH",
        url: "/pipelines/{{boardEId}}/tasks/{{taskE2Id}}/archive",
        tests: [status(200), success(true)],
      }),
      request({
        name: "Create label E1",
        method: "POST",
        url: "/pipelines/{{boardEId}}/labels",
        body: { name: "Board access", color: "#00ff00" },
        tests: [
          status(200),
          save("labelE1Id", "pm.response.json().data.label.id"),
        ],
      }),
      request({
        name: "Create automation E1",
        method: "POST",
        url: "/pipelines/{{boardEId}}/automations",
        body: {
          automationTarget: "task",
          automationTrigger: "task-done",
          automationAction: "archive-task",
        },
        tests: [
          status(200),
          save("automationE1Id", "pm.response.json().data.id"),
        ],
      }),
      request({
        name: "Create webhook E1",
        method: "POST",
        url: "/pipelines/{{boardEId}}/webhooks",
        body: {
          target_type: "task",
          target_action: "created",
          webhook_url: `${WEBHOOK_RECEIVER}/capture/qt-api-board-e-{{runId}}`,
          webhook_confirm: false,
        },
        tests: [
          status(200),
          save("webhookE1Id", "pm.response.json().data.webhook.id"),
        ],
      }),
      request({
        name: "Create API token E1",
        method: "POST",
        url: "/pipelines/{{boardEId}}/api-tokens",
        body: { name: "Board access {{runId}}", ...tokenPermissions() },
        tests: [status(200), save("tokenE1Id", "pm.response.json().data.id")],
      }),
      request({
        name: "Create custom field E1",
        method: "POST",
        url: "/custom-fields",
        body: {
          entityType: "task",
          entityId: "{{taskE1Id}}",
          name: "Board access",
          description: "",
          type: "text",
        },
        tests: [
          status(200),
          save("customFieldE1Id", "pm.response.json().data.id"),
        ],
      }),
      request({
        name: "Upload E1",
        method: "POST",
        url: "/uploads",
        formData: [
          { key: "entity_id", value: "{{taskE1Id}}" },
          { key: "entity_type", value: "task" },
          { key: "file_to_upload", src: "tests/api/fixtures/attachment.txt" },
        ],
        tests: [
          status(200),
          save("uploadE1Id", "pm.response.json().data.upload.id"),
        ],
      }),
      request({
        name: "Assign QuickTasker to task E1",
        method: "POST",
        url: "/users/{{qtUserId}}/tasks/{{taskE1Id}}",
        body: { user_type: "quicktasker" },
        tests: [status(200), success(true)],
      }),
      request({
        name: "Find the outsider WordPress user",
        url: "/wp-users?type=all",
        tests: [
          status(200),
          `const outsider = pm.response.json().data.find((u) => u.name === pm.variables.get('outsiderUser'));
pm.test('outsider is listed', () => pm.expect(outsider).to.be.an('object'));
pm.collectionVariables.set('outsiderWpUserId', outsider ? String(outsider.id) : '0');`,
        ],
      }),
    ]),
    folder("Assigning a WordPress user needs board access", [
      request({
        name: "Outsider cannot be assigned before being added to board E",
        method: "POST",
        url: "/users/{{outsiderWpUserId}}/tasks/{{taskE1Id}}",
        body: { user_type: "wp-user" },
        tests: [
          status(400),
          success(false),
          `pm.test('message explains why', () => pm.expect(pm.response.json().messages.join(' ')).to.include('not been added to the board'));`,
        ],
      }),
      request({
        name: "Outsider cannot be the target of an assign automation before being added to board E",
        method: "POST",
        url: "/pipelines/{{boardEId}}/automations",
        body: {
          automationTarget: "task",
          automationTrigger: "task-created",
          automationAction: "assign-user",
          automationActionTargetId: "{{outsiderWpUserId}}",
          automationActionTargetType: "wp-user",
        },
        tests: [
          status(400),
          success(false),
          `pm.test('message explains why', () => pm.expect(pm.response.json().messages.join(' ')).to.include('not been added to this board'));`,
        ],
      }),
      request({
        name: "Add outsider to board E",
        method: "PATCH",
        url: "/wp-users/{{outsiderWpUserId}}/pipelines",
        body: { pipeline_ids: ["{{boardEId}}"] },
        tests: [status(200), success(true)],
      }),
      request({
        name: "Outsider can be assigned after being added to board E",
        method: "POST",
        url: "/users/{{outsiderWpUserId}}/tasks/{{taskE1Id}}",
        body: { user_type: "wp-user" },
        tests: [status(200), success(true)],
      }),
      request({
        name: "Outsider can be the target of an assign automation after being added to board E",
        method: "POST",
        url: "/pipelines/{{boardEId}}/automations",
        body: {
          automationTarget: "task",
          automationTrigger: "task-created",
          automationAction: "assign-user",
          automationActionTargetId: "{{outsiderWpUserId}}",
          automationActionTargetType: "wp-user",
        },
        tests: [
          status(200),
          success(true),
          save("automationAssignOutsiderId", "pm.response.json().data.id"),
        ],
      }),
      request({
        name: "Delete the assign automation so later tasks on board E are not assigned",
        method: "DELETE",
        url: "/pipelines/{{boardEId}}/automations/{{automationAssignOutsiderId}}",
        tests: [status(200), success(true)],
      }),
    ]),
    folder("A user added to board E can use it", [
      request({
        name: "Outsider can open board E",
        url: "/pipelines/{{boardEId}}",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('board list has only board E', () => pm.expect(pm.response.json().data.pipelines.map((p) => String(p.id))).to.eql([pm.collectionVariables.get('boardEId')]));`,
        ],
      }),
      request({
        name: "Outsider sees the logs of task E1",
        url: "/logs?type=task&typeId={{taskE1Id}}",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('task logs are listed', () => pm.expect(pm.response.json().data).to.not.be.empty);`,
        ],
      }),
      request({
        name: "Outsider sees task E1 in My tasks",
        url: "/my-tasks",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('task E1 is assigned', () => pm.expect(pm.response.json().data.assigned.map((t) => String(t.id))).to.include(pm.collectionVariables.get('taskE1Id')));`,
        ],
      }),
      request({
        name: "Outsider is notified about the assignment on board E",
        url: "/notifications?max_age_hours=24",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('board E notification is listed', () => pm.expect(pm.response.json().data.filter((n) => String(n.pipeline_id) === pm.collectionVariables.get('boardEId'))).to.not.be.empty);`,
        ],
      }),
      request({
        name: "Outsider creates an API token on board E",
        method: "POST",
        url: "/pipelines/{{boardEId}}/api-tokens",
        body: { name: "Outsider {{runId}}", ...allTokenPermissions },
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('the outsider is saved as the creator', () => pm.expect(String(pm.response.json().data.created_by)).to.eql(pm.collectionVariables.get('outsiderWpUserId')));`,
          save("outsiderTokenId", "pm.response.json().data.id"),
          save("outsiderToken", "pm.response.json().data.token"),
        ],
      }),
      request({
        name: "Outsider creates a webhook on board E",
        method: "POST",
        url: "/pipelines/{{boardEId}}/webhooks",
        body: {
          target_type: "task",
          target_action: "deleted",
          webhook_url: `${WEBHOOK_RECEIVER}/capture/qt-outsider-{{runId}}`,
          webhook_confirm: false,
        },
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('the outsider is saved as the creator', () => pm.expect(String(pm.response.json().data.webhook.created_by)).to.eql(pm.collectionVariables.get('outsiderWpUserId')));`,
        ],
      }),
      request({
        name: "Board E API tokens show who created them",
        url: "/pipelines/{{boardEId}}/api-tokens",
        tests: [
          status(200),
          `const token = pm.response.json().data.find((t) => String(t.id) === pm.collectionVariables.get('outsiderTokenId'));
pm.test('the outsider is the creator', () => pm.expect(String(token && token.created_by)).to.eql(pm.collectionVariables.get('outsiderWpUserId')));
pm.test('the creator is named', () => pm.expect(token && token.created_by_name).to.be.a('string').and.not.be.empty);`,
        ],
      }),
      request({
        name: "Board E webhooks show who created them",
        url: "/pipelines/{{boardEId}}/webhooks",
        tests: [
          status(200),
          `const webhook = pm.response.json().data.webhooks.find((w) => String(w.created_by) === pm.collectionVariables.get('outsiderWpUserId'));
pm.test('the outsider created a webhook', () => pm.expect(webhook).to.be.an('object'));
pm.test('the creator is named', () => pm.expect(webhook && webhook.created_by_name).to.be.a('string').and.not.be.empty);`,
        ],
      }),
      request({
        name: "The outsider's API token works while they are on board E",
        url: "/token/board",
        auth: bearer("outsiderToken"),
        tests: [status(200)],
      }),
      request({
        name: "Removing the outsider from board E needs confirmation to delete their API token and webhook",
        method: "PATCH",
        url: "/wp-users/{{outsiderWpUserId}}/pipelines",
        body: { pipeline_ids: [] },
        tests: [
          status(409),
          success(false),
          `pm.test('confirmation is asked for', () => pm.expect(pm.response.json().messages).to.include('INTEGRATIONS_REMOVAL_NOT_CONFIRMED'));
pm.test('the API token and webhook are counted', () => pm.expect(pm.response.json().data.pipelines_with_integrations).to.eql([{ pipeline_id: Number(pm.collectionVariables.get('boardEId')), api_token_count: 1, webhook_count: 1 }]));`,
        ],
      }),
      request({
        name: "The outsider stays on board E without the confirmation",
        url: "/pipelines/{{boardEId}}",
        auth: outsiderAuth,
        tests: [status(200)],
      }),
      request({
        name: "Remove outsider from board E, deleting their API token and webhook",
        method: "PATCH",
        url: "/wp-users/{{outsiderWpUserId}}/pipelines",
        body: { pipeline_ids: [], remove_integrations: true },
        tests: [
          status(200),
          success(true),
          `pm.test('the deleted API token and webhook are reported', () => pm.expect(pm.response.json().data.deleted_integrations).to.eql([{ pipeline_id: Number(pm.collectionVariables.get('boardEId')), api_token_count: 1, webhook_count: 1 }]));`,
        ],
      }),
      request({
        name: "The outsider's API token no longer works",
        url: "/token/board",
        auth: bearer("outsiderToken"),
        tests: [status(401), wpErrorCode("invalid_token")],
      }),
      request({
        name: "Board E no longer has the outsider's webhook",
        url: "/pipelines/{{boardEId}}/webhooks",
        tests: [
          status(200),
          `pm.test('no webhook of the outsider is left', () => pm.expect(pm.response.json().data.webhooks.filter((w) => String(w.created_by) === pm.collectionVariables.get('outsiderWpUserId'))).to.be.empty);`,
        ],
      }),
      request({
        name: "The deleted API token and webhook are logged on board E",
        url: "/global-logs?order=DESC&numberOfLogs=200&search=was%20removed%20from%20the%20board",
        tests: [
          status(200),
          `const boardELogs = pm.response.json().data.filter((l) => String(l.pipeline_id) === pm.collectionVariables.get('boardEId'));
pm.test('the API token deletion is logged', () => pm.expect(boardELogs.some((l) => l.text.startsWith('API token Outsider ' + pm.collectionVariables.get('runId') + ' deleted because ') && l.text.endsWith(' was removed from the board'))).to.be.true);
pm.test('the webhook deletion is logged', () => pm.expect(boardELogs.some((l) => l.text.startsWith('Webhook ') && l.text.includes(' deleted because '))).to.be.true);`,
        ],
      }),
    ]),
    folder(
      "A user not added to board E is rejected",
      adminRoutes
        .filter((route) => typeof route.board === "object")
        .map((route) =>
          routeRequest(route, {
            name: routeKey(route),
            auth: outsiderAuth,
            useBoardScope: true,
            tests: [status(403), wpErrorCode("rest_forbidden")],
          }),
        ),
    ),
    folder("A missing board or task is reported as missing, not as refused", [
      request({
        name: "Missing board",
        url: "/pipelines/999999999",
        auth: outsiderAuth,
        tests: [
          status(400),
          success(false),
          `pm.test('reported as a missing board', () => pm.expect(pm.response.json().messages).to.include('PIPELINE_NOT_FOUND'));`,
        ],
      }),
      request({
        name: "Missing task",
        method: "PATCH",
        url: "/tasks/999999999/done",
        body: { done: true },
        auth: outsiderAuth,
        tests: [
          status(400),
          success(false),
          `pm.test('reported as a missing task', () => pm.expect(pm.response.json().messages).to.include('TASK_NOT_FOUND'));`,
        ],
      }),
    ]),
    folder("Lists leave out board E for a user not added to it", [
      request({
        name: "Board list",
        url: "/pipelines",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('board E is not listed', () => pm.expect(pm.response.json().data.map((p) => String(p.id))).to.not.include(pm.collectionVariables.get('boardEId')));`,
        ],
      }),
      request({
        name: "Admin sees archived task E2",
        url: "/tasks/archived?order=DESC",
        tests: [
          status(200),
          `pm.test('task E2 is listed', () => pm.expect(pm.response.json().data.map((t) => String(t.id))).to.include(pm.collectionVariables.get('taskE2Id')));`,
        ],
      }),
      request({
        name: "Archived tasks",
        url: "/tasks/archived?order=DESC",
        auth: outsiderAuth,
        tests: [
          status(200),
          excludesBoardE(
            "board E tasks are not listed",
            "pm.response.json().data",
          ),
        ],
      }),
      request({
        name: "Task logs",
        url: "/logs?type=task&typeId={{taskE1Id}}",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('task logs are not listed', () => pm.expect(pm.response.json().data).to.be.empty);`,
        ],
      }),
      request({
        name: "Logs about the outsider",
        url: "/logs?type=wp_user&typeId={{outsiderWpUserId}}",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('board E assignment log is not listed', () => pm.expect(pm.response.json().data.filter((l) => l.text.includes('Board access task E1'))).to.be.empty);`,
        ],
      }),
      request({
        name: "Admin sees board E in the global logs",
        url: "/global-logs?order=DESC&numberOfLogs=200",
        tests: [
          status(200),
          `pm.test('board E logs are listed', () => pm.expect(pm.response.json().data.filter((l) => String(l.pipeline_id) === pm.collectionVariables.get('boardEId'))).to.not.be.empty);`,
        ],
      }),
      request({
        name: "Global logs",
        url: "/global-logs?order=DESC&numberOfLogs=200",
        auth: outsiderAuth,
        tests: [
          status(200),
          excludesBoardE(
            "board E logs are not listed",
            "pm.response.json().data",
          ),
        ],
      }),
      request({
        name: "Admin sees the QuickTasker self-assign log with its board",
        url: "/global-logs?order=DESC&numberOfLogs=200&search=Self-assigned",
        tests: [
          status(200),
          `const selfAssignLog = pm.response.json().data.find((l) => l.text === 'Self-assigned to task Free task ' + pm.collectionVariables.get('runId'));
pm.test('self-assign log is listed', () => pm.expect(selfAssignLog).to.be.an('object'));
pm.test('self-assign log belongs to board A', () => pm.expect(String(selfAssignLog && selfAssignLog.pipeline_id)).to.eql(pm.collectionVariables.get('boardAId')));`,
        ],
      }),
      request({
        name: "Outsider does not see the self-assign log of a board A task",
        url: "/global-logs?order=DESC&numberOfLogs=200&search=Self-assigned",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('board A task name is not listed', () => pm.expect(pm.response.json().data.filter((l) => l.text.includes('Free task ' + pm.collectionVariables.get('runId')))).to.be.empty);`,
        ],
      }),
      request({
        name: "My tasks",
        url: "/my-tasks",
        auth: outsiderAuth,
        tests: [
          status(200),
          excludesBoardE(
            "board E tasks are not listed as assigned",
            "pm.response.json().data.assigned",
          ),
        ],
      }),
      request({
        name: "Tasks of a QuickTasker",
        url: "/users/{{qtUserId}}/tasks",
        auth: outsiderAuth,
        tests: [
          status(200),
          excludesBoardE(
            "board E tasks are not listed",
            "pm.response.json().data",
          ),
        ],
      }),
      request({
        name: "Admin sees board E tasks of the QuickTasker",
        url: "/users/{{qtUserId}}/tasks",
        tests: [
          status(200),
          `pm.test('task E1 is listed', () => pm.expect(pm.response.json().data.map((t) => String(t.id))).to.include(pm.collectionVariables.get('taskE1Id')));`,
        ],
      }),
      request({
        name: "Notifications",
        url: "/notifications?max_age_hours=24",
        auth: outsiderAuth,
        tests: [
          status(200),
          excludesBoardE(
            "board E notifications are not listed",
            "pm.response.json().data",
          ),
        ],
      }),
      request({
        name: "Notifications filtered to board E",
        url: "/notifications?max_age_hours=24&pipeline_ids[]={{boardEId}}",
        auth: outsiderAuth,
        tests: [
          status(200),
          `pm.test('nothing is listed', () => pm.expect(pm.response.json().data).to.be.empty);`,
        ],
      }),
    ]),
    request({
      name: "Delete board E",
      method: "DELETE",
      url: "/pipelines/{{boardEId}}",
      tests: [status(200), success(true)],
    }),
  ],
  "WordPress users who are not administrators can only use the boards they have been added to. Board E's entities are created for these requests, so that rejections are not caused by missing entities.",
);

const adminCleanup = folder("Cleanup", [
  request({
    name: "Create task to leave in the archive of board C",
    method: "POST",
    url: "/tasks",
    body: {
      name: "Orphaned archive task",
      stageId: "{{stageC1Id}}",
      pipelineId: "{{boardCId}}",
    },
    tests: [
      status(200),
      save("orphanTaskId", "pm.response.json().data.newTask.id"),
    ],
  }),
  request({
    name: "Archive the task on board C",
    method: "PATCH",
    url: "/pipelines/{{boardCId}}/tasks/{{orphanTaskId}}/archive",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Delete board C",
    method: "DELETE",
    url: "/pipelines/{{boardCId}}",
    tests: [
      status(200),
      success(true),
      `pm.test('does not load the deleted primary board', () => pm.expect(String(pm.response.json().data.pipelineIdToLoad)).to.not.eql(pm.collectionVariables.get('boardCId')));`,
    ],
  }),
  request({
    name: "Admin falls back to the site-wide primary board",
    url: "/pipelines",
    tests: [
      status(200),
      `pm.test('exactly one board is primary', () => pm.expect(pm.response.json().data.filter((x) => x.is_primary === '1')).to.have.lengthOf(1));`,
    ],
  }),
  request({
    name: "Delete board D",
    method: "DELETE",
    url: "/pipelines/{{boardDId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Deleted board is gone",
    url: "/pipelines/{{boardCId}}",
    tests: [status(400), success(false)],
  }),
  request({
    name: "Task of the deleted board is refused, not reported as missing, to a user who is not a WordPress administrator",
    url: "/tasks/{{orphanTaskId}}/logs",
    auth: outsiderAuth,
    tests: [status(403), wpErrorCode("rest_forbidden")],
  }),
  request({
    name: "Archive cleanup is refused to a user who is not a WordPress administrator",
    method: "PATCH",
    url: "/archive/settings/task-cleanup",
    auth: outsiderAuth,
    tests: [status(403), wpErrorCode("rest_forbidden")],
  }),
  request({
    name: "Refused archive cleanup leaves the task of the deleted board",
    url: "/tasks/archived?order=DESC&pipelineId={{boardCId}}",
    tests: [
      status(200),
      includesId(
        "task of the deleted board is archived",
        "pm.response.json().data",
        "orphanTaskId",
      ),
    ],
  }),
  request({
    name: "Admin removes archived tasks of deleted boards",
    method: "PATCH",
    url: "/archive/settings/task-cleanup",
    tests: [
      status(200),
      success(true),
      `pm.test('task of the deleted board is removed', () => pm.expect(pm.response.json().data.deletedTaskIds.map(String)).to.include(pm.collectionVariables.get('orphanTaskId')));`,
    ],
  }),
]);

const adminApi = folder(
  "04 Admin API",
  [
    adminPermissions,
    adminBoards,
    adminStages,
    adminTasks,
    adminLabels,
    adminComments,
    adminMyTasks,
    adminCustomFields,
    adminUsers,
    adminWpUsers,
    adminSettings,
    adminAutomations,
    adminWebhooks,
    adminUploads,
    adminImport,
    adminLogsAndNotifications,
    adminBoardAccess,
    adminCleanup,
  ],
  "Private admin API, authenticated with WordPress application passwords.",
);

/* ------------------------------------------------------------------ */
/* 99 Teardown                                                          */
/* ------------------------------------------------------------------ */

const teardown = folder("99 Teardown", [
  request({
    name: "Delete QuickTasker user",
    method: "DELETE",
    url: "/users/{{qtUserId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Delete second QuickTasker user",
    method: "DELETE",
    url: "/users/{{qtUser2Id}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Delete custom field",
    method: "DELETE",
    url: "/custom-fields/{{qtCustomFieldId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Delete board B",
    method: "DELETE",
    url: "/pipelines/{{boardBId}}",
    tests: [status(200), success(true)],
  }),
  request({
    name: "Token of a deleted board is rejected",
    url: "/token/board",
    auth: bearer("tokenB"),
    tests: [status(401), wpErrorCode("invalid_token")],
  }),
  request({
    name: "Delete board A",
    method: "DELETE",
    url: "/pipelines/{{boardAId}}",
    tests: [status(200), success(true)],
  }),
]);

/* ------------------------------------------------------------------ */
/* Collection                                                           */
/* ------------------------------------------------------------------ */

const runtimeVariables = [
  "runId",
  "boardAId",
  "boardBId",
  "stageA1Id",
  "stageA2Id",
  "stageB1Id",
  "taskBId",
  "taskBHash",
  "tokenFull",
  "tokenReadOnly",
  "tokenReadOnlyId",
  "tokenNone",
  "tokenB",
  "tokenStageId",
  "tokenTaskId",
  "publicTaskHash",
  "userApiNonce",
  "qtUserId",
  "qtPageHash",
  "qtUser2Id",
  "qtUser2PageHash",
  "qtSession",
  "qtCustomFieldId",
  "qtNotificationId",
  "upAssignedTaskId",
  "upAssignedTaskHash",
  "upFreeTaskId",
  "upFreeTaskHash",
  "upOtherTaskId",
  "upOtherTaskHash",
  "upPrivateTaskId",
  "upPrivateTaskHash",
];

const collection = {
  info: {
    name: "QuickTasker API",
    description:
      "Generated by tests/api/build-collection.js — do not edit by hand. Run with `npm run test:api`.",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  event: [
    {
      listen: "prerequest",
      script: {
        type: "text/javascript",
        exec: [
          "if (!pm.collectionVariables.get('runId')) {",
          "  pm.collectionVariables.set('runId', String(Date.now()));",
          "}",
        ],
      },
    },
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: [
          "pm.test('responds within 5s', () => pm.expect(pm.response.responseTime).to.be.below(5000));",
          "if (pm.request.url.toString().includes('/wp-json/')) {",
          "  pm.test('responds with JSON', () => pm.response.to.be.json);",
          "}",
        ],
      },
    },
  ],
  variable: runtimeVariables.map((key) => ({ key, value: "" })),
  item: [setup, tokenApi, publicApi, userPageApi, adminApi, teardown],
};

fs.writeFileSync(OUTPUT, JSON.stringify(collection, null, 2) + "\n");
console.log(`Wrote ${path.relative(process.cwd(), OUTPUT)}`);
