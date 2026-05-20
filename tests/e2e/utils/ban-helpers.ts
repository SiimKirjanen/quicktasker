import { APIRequestContext, Page, expect } from '@playwright/test';
import { TIMEOUTS } from './timeouts';
import { getQuickTaskerCard } from './user-helpers';

async function getAdminNonce(request: APIRequestContext): Promise<string> {
  const response = await request.get('/wp-admin/');
  const html = await response.text();
  const match = html.match(/"nonce":"([^"]+)"/);
  if (!match) throw new Error('Could not find WP REST nonce in admin page response');
  return match[1];
}

/**
 * Look up a QuickTasker user's numeric ID by name via the admin REST API.
 */
export async function getQuicktaskerUserIdByName(
  request: APIRequestContext,
  name: string,
): Promise<number> {
  const nonce = await getAdminNonce(request);
  const response = await request.get('/wp-json/wpqt/v1/users', {
    headers: { 'X-WP-Nonce': nonce },
  });
  if (!response.ok()) throw new Error(`Failed to list users: ${await response.text()}`);
  const body = await response.json();
  const user = (body.data ?? []).find((u: { name: string }) => u.name === name);
  if (!user) throw new Error(`QuickTasker user "${name}" not found`);
  return Number(user.id);
}

/**
 * Pre-seed the rate-limit / ban offense transients for a QuickTasker user.
 * Lets tests jump straight to the boundary request without firing N real ones.
 */
export async function seedRateLimitState(
  request: APIRequestContext,
  userId: number,
  opts: { count?: number; offenses?: number; bucket?: string } = {},
): Promise<void> {
  const response = await request.post('/wp-json/qt-test/v1/seed-rate-limit', {
    data: {
      user_id: userId,
      count: opts.count ?? 0,
      offenses: opts.offenses ?? 0,
      bucket: opts.bucket ?? 'write_global',
    },
  });
  if (!response.ok()) throw new Error(`seed-rate-limit failed: ${await response.text()}`);
}

/**
 * Clear all rate-limit + ban transients for a user. Useful for test isolation.
 */
export async function clearRateLimitState(
  request: APIRequestContext,
  userId: number,
): Promise<void> {
  const response = await request.post('/wp-json/qt-test/v1/clear-rate-limit', {
    data: { user_id: userId },
  });
  if (!response.ok()) throw new Error(`clear-rate-limit failed: ${await response.text()}`);
}

/**
 * Simulate one throttled write request for a QuickTasker user. Pushes the
 * rate-limit counter up to the limit, then invokes the limiter so the offense
 * is recorded through the production path (including auto-ban on threshold).
 */
export async function triggerRateLimitOffense(
  request: APIRequestContext,
  userId: number,
): Promise<void> {
  const response = await request.post('/wp-json/qt-test/v1/trigger-throttle', {
    data: { user_id: userId },
  });
  if (!response.ok()) throw new Error(`trigger-throttle failed: ${await response.text()}`);
}

/**
 * Force-ban a QuickTasker user via the production code path
 * (UserService::banQuicktaskerUserForSpam). Writes the audit log row too.
 */
export async function forceBanQuicktaskerUser(
  request: APIRequestContext,
  userId: number,
): Promise<void> {
  const response = await request.post('/wp-json/qt-test/v1/ban-user', {
    data: { user_id: userId },
  });
  if (!response.ok()) throw new Error(`ban-user failed: ${await response.text()}`);
}

/**
 * Wait for the "Banned (spam)" badge on the QuickTasker card. Must already be
 * on the QuickTaskers tab.
 */
export async function expectBannedBadge(page: Page, userName: string): Promise<void> {
  await expect(getQuickTaskerCard(page, userName).getByText('Banned (spam)')).toBeVisible({
    timeout: TIMEOUTS.NAVIGATION,
  });
}

export async function expectNoBannedBadge(page: Page, userName: string): Promise<void> {
  await expect(getQuickTaskerCard(page, userName).getByText('Banned (spam)')).not.toBeVisible();
}
