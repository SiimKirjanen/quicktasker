import { Browser, BrowserContext, Page, expect } from '@playwright/test';
import { TIMEOUTS } from './timeouts';

export const TASKS_APP_BASE_URL = '/wpqt?page=wp-quicktasker-user&page_id=wpqt';

export async function navigateToTasksApp(page: Page): Promise<void> {
  await page.goto(TASKS_APP_BASE_URL);
  await expect(page.getByText(/Assigned tasks:/)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

export async function navigateToAssignedTasks(page: Page): Promise<void> {
  await page.goto(`${TASKS_APP_BASE_URL}#/user-tasks`);
  await expect(page.getByText('Assigned tasks')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

export async function navigateToAssignableTasks(page: Page): Promise<void> {
  await page.goto(`${TASKS_APP_BASE_URL}#/assignable-tasks`);
  await expect(page.getByText('Assignable tasks')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

export async function navigateToUserProfile(page: Page): Promise<void> {
  await page.goto(`${TASKS_APP_BASE_URL}#/user/profile`);
  await expect(page.getByText('User details')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

export async function navigateToUserComments(page: Page): Promise<void> {
  await page.goto(`${TASKS_APP_BASE_URL}#/user/comments`);
  await expect(page.getByText('User comments')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

export async function navigateToNotifications(page: Page): Promise<void> {
  await page.goto(`${TASKS_APP_BASE_URL}#/notifications`);
  await expect(page.getByText(/You have/)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

export function getTasksAppTaskCard(page: Page, taskName: string) {
  return page.getByTestId('wpqt-card').filter({ hasText: taskName });
}

export async function addTasksAppComment(page: Page, comment: string): Promise<void> {
  await page.getByPlaceholder('Write a comment...').fill(comment);
  await page.getByText('Add comment').click();
}

/**
 * Read the public QuickTasker user-page URL from the User Detail page.
 * Must already be on the user detail page (the "User Page:" link is rendered).
 */
export async function getQuickTaskerUserPageUrl(page: Page): Promise<string> {
  const link = page.locator('a[href*="page_id=wpqt"]');
  await expect(link).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  const href = await link.getAttribute('href');
  if (!href) throw new Error('User page link is missing href');
  return href;
}

/**
 * Open a fresh browser context with no stored authentication. Use for testing
 * the public QuickTasker user page as an anonymous visitor.
 */
export async function openAnonymousPage(
  browser: Browser,
): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();
  return { context, page };
}

/**
 * Log in as a QuickTasker user through the tasks app UI.
 * Must already be on the LoginPage. Leaves the page on the homepage.
 */
export async function loginAsQuickTasker(page: Page, password: string): Promise<void> {
  await page.getByTestId('password-input').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText(/Assigned tasks:/)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

/**
 * Call a QuickTasker user-page endpoint directly, bypassing the UI. Use when the
 * UI hides a form but the backend must still be shown to reject the request.
 * Must already be on the tasks app page (it provides the API nonce). Sends the
 * page's cookies, so a QuickTasker session cookie goes along if one is set.
 */
export async function callQuickTaskerUserPageApi(
  page: Page,
  userPageUrl: string,
  method: 'GET' | 'POST',
  endpoint: string,
  data?: Record<string, unknown>,
): Promise<{ success: boolean; messages: string[] }> {
  const pageHash = new URL(userPageUrl).searchParams.get('code');
  if (!pageHash) throw new Error('User page URL is missing the code param');
  const nonce = await page.evaluate(
    () => (window as unknown as { wpqt_user: { userApiNonce: string } }).wpqt_user.userApiNonce,
  );
  const response = await page.request.fetch(`/wp-json/wpqt/v1/user-page/${endpoint}`, {
    method,
    headers: {
      'X-WPQT-USER-PAGE-CODE': pageHash,
      'X-WPQT-USER-API-Nonce': nonce,
    },
    data,
  });
  const body = await response.json();
  return { success: body.success === true, messages: body.messages ?? [] };
}

/**
 * Walk through the QuickTasker user setup form (set + repeat password, submit).
 * Leaves the page on the LoginPage.
 */
export async function completeQuickTaskerSetup(
  page: Page,
  userPageUrl: string,
  password: string,
): Promise<void> {
  await page.goto(userPageUrl);
  await expect(page.getByText('Please complete the setup')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  await page.locator('input[type="password"]').nth(0).fill(password);
  await page.locator('input[type="password"]').nth(1).fill(password);
  await page.getByRole('button', { name: 'Setup' }).click();
  await expect(page.getByText('Please log in to continue')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}
