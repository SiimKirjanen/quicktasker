import { Page, expect } from '@playwright/test';
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
