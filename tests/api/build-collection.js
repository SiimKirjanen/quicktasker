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

const OUTPUT = path.join(__dirname, "quicktasker.postman_collection.json");
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
  auth = adminAuth,
  body,
  headers = [],
  tests = [],
}) {
  const header = [...headers];
  const req = { method, header, url: `${API}${url}`, auth };

  if (body !== undefined) {
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
/* 99 Teardown                                                          */
/* ------------------------------------------------------------------ */

const teardown = folder("99 Teardown", [
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
          "pm.test('responds with JSON', () => pm.response.to.be.json);",
        ],
      },
    },
  ],
  variable: runtimeVariables.map((key) => ({ key, value: "" })),
  item: [setup, tokenApi, publicApi, teardown],
};

fs.writeFileSync(OUTPUT, JSON.stringify(collection, null, 2) + "\n");
console.log(`Wrote ${path.relative(process.cwd(), OUTPUT)}`);
