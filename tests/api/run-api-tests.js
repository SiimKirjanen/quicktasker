/* global __dirname, process, require */
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Runs the QuickTasker Postman collection with Newman against wp-env.
 *
 * Creates a fresh WordPress application password for the admin user via
 * wp-cli unless ADMIN_APP_PASSWORD is already set (e.g. to target another site
 * together with API_BASE_URL / ADMIN_USER).
 */
const { execSync, spawnSync } = require("child_process");
const path = require("path");

const NEWMAN_VERSION = "6.2.2";
const APP_PASSWORD_NAME = "newman";
const isWindows = process.platform === "win32";
const adminUser = process.env.ADMIN_USER || "admin";

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

function createAppPassword() {
  // Remove passwords left over from previous runs so they don't pile up.
  const oldUuids = wpCli(
    `user application-password list ${adminUser} --name=${APP_PASSWORD_NAME} --field=uuid`,
  );
  oldUuids.forEach((uuid) =>
    wpCli(`user application-password delete ${adminUser} ${uuid}`),
  );

  const lines = wpCli(
    `user application-password create ${adminUser} ${APP_PASSWORD_NAME} --porcelain`,
  );
  return lines[lines.length - 1];
}

const adminAppPassword = process.env.ADMIN_APP_PASSWORD || createAppPassword();

const envVar = [
  { key: "adminUser", value: adminUser },
  { key: "adminAppPassword", value: adminAppPassword },
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
    "--reporters",
    "cli,junit",
    "--reporter-junit-export",
    path.join(__dirname, "..", "..", "api-test-results", "junit.xml"),
  ].map((arg) => (isWindows ? `"${arg}"` : arg)), // shell: true on Windows does not quote args
  { stdio: "inherit", shell: isWindows },
);

process.exit(result.status ?? 1);
