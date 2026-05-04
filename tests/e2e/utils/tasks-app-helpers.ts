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
