/* global __dirname, process, require */
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Runs the QuickTasker Postman collection with Newman against wp-env.
 *
 * Creates fresh WordPress application passwords via wp-cli for the admin user
 * and for two low-privilege users used by the admin API permission tests:
 * a subscriber and a "limited" user that only has the base QuickTasker admin
 * capability. To target another site, set API_BASE_URL plus ADMIN_USER /
 * ADMIN_APP_PASSWORD, SUBSCRIBER_USER / SUBSCRIBER_APP_PASSWORD and
 * LIMITED_USER / LIMITED_APP_PASSWORD instead.
 */
const { execSync, spawnSync } = require("child_process");
const path = require("path");

const NEWMAN_VERSION = "6.2.2";
const APP_PASSWORD_NAME = "newman";
const isWindows = process.platform === "win32";
const adminUser = process.env.ADMIN_USER || "admin";
const subscriberUser = process.env.SUBSCRIBER_USER || "qt-api-subscriber";
const limitedUser = process.env.LIMITED_USER || "qt-api-limited";

function wpCli(command) {
  const output = execSync(`npx wp-env run cli wp ${command}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function createAppPassword(user) {
  // Remove passwords left over from previous runs so they don't pile up.
  const oldUuids = wpCli(
    `user application-password list ${user} --name=${APP_PASSWORD_NAME} --field=uuid`,
  );
  oldUuids.forEach((uuid) =>
    wpCli(`user application-password delete ${user} ${uuid}`),
  );

  const lines = wpCli(
    `user application-password create ${user} ${APP_PASSWORD_NAME} --porcelain`,
  );
  return lines[lines.length - 1];
}

function ensureSubscriber(user, capabilities = []) {
  try {
    wpCli(`user get ${user} --field=ID`);
  } catch {
    wpCli(
      `user create ${user} ${user}@example.com --role=subscriber --porcelain`,
    );
  }
  capabilities.forEach((cap) => wpCli(`user add-cap ${user} ${cap}`));
}

function credentialsFromWpCli() {
  ensureSubscriber(subscriberUser);
  ensureSubscriber(limitedUser, ["quicktasker_admin_role"]);

  return {
    adminAppPassword: createAppPassword(adminUser),
    subscriberAppPassword: createAppPassword(subscriberUser),
    limitedAppPassword: createAppPassword(limitedUser),
  };
}

const credentials = process.env.ADMIN_APP_PASSWORD
  ? {
      adminAppPassword: process.env.ADMIN_APP_PASSWORD,
      subscriberAppPassword: process.env.SUBSCRIBER_APP_PASSWORD,
      limitedAppPassword: process.env.LIMITED_APP_PASSWORD,
    }
  : credentialsFromWpCli();

const envVar = [
  { key: "adminUser", value: adminUser },
  { key: "subscriberUser", value: subscriberUser },
  { key: "limitedUser", value: limitedUser },
  ...Object.entries(credentials).map(([key, value]) => ({ key, value })),
];
if (process.env.API_BASE_URL) {
  envVar.push({ key: "baseUrl", value: process.env.API_BASE_URL });
}

// Newman is run through npx rather than being a devDependency, to keep its
// dependency tree out of package-lock.json.
const result = spawnSync(
  "npx",
  [
    "--yes",
    `newman@${NEWMAN_VERSION}`,
    "run",
    path.join(__dirname, "quicktasker.postman_collection.json"),
    "--environment",
    path.join(__dirname, "wp-env.postman_environment.json"),
    ...envVar.flatMap(({ key, value }) => ["--env-var", `${key}=${value}`]),
    "--working-dir",
    path.join(__dirname, "..", ".."),
    "--reporters",
    "cli,junit",
    "--reporter-junit-export",
    path.join(__dirname, "..", "..", "api-test-results", "junit.xml"),
  ].map((arg) => (isWindows ? `"${arg}"` : arg)), // shell: true on Windows does not quote args
  { stdio: "inherit", shell: isWindows },
);

process.exit(result.status ?? 1);
