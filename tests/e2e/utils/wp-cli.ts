import { execSync } from 'child_process';

/**
 * Run a wp-cli command in the wp-env cli container. For state the REST API
 * can't reach, such as plugin options. Takes a few seconds per call.
 */
export function runWpCli(command: string): string {
  return execSync(`npx wp-env run cli wp ${command}`, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
}
