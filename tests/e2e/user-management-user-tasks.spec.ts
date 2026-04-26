import { test, expect, Page } from '@playwright/test';
import { generateUniqueName, createBoard, createStage, createTask } from './utils/board-helpers';
import { navigateToBoardsPage } from './utils/navigation';
import {
  navigateToQuickTaskersTab,
  createQuickTaskerUser,
  navigateToUserTasksPage,
  assignQuickTaskerToTask,
} from './utils/user-helpers';
import { TIMEOUTS } from './utils/timeouts';

// ── Shared setup helpers ──────────────────────────────────────────────────────

async function setupUserWithTask(
  page: Page,
): Promise<{ userName: string; taskName: string }> {
  const userName = generateUniqueName('UT-User');
  const boardName = generateUniqueName('UT-Board');
  const stageName = generateUniqueName('UT-Stage');
  const taskName = generateUniqueName('UT-Task');

  // Create the QuickTasker user
  await navigateToQuickTaskersTab(page);
  await createQuickTaskerUser(page, userName);

  // Create board, stage, task and assign the user
  await navigateToBoardsPage(page);
  await createBoard(page, boardName);
  await createStage(page, stageName);
  await createTask(page, stageName, taskName);
  await assignQuickTaskerToTask(page, taskName, userName);

  // Navigate back to the QuickTaskers tab ready for the test
  await navigateToQuickTaskersTab(page);

  return { userName, taskName };
}

// ── Test suites ───────────────────────────────────────────────────────────────

test.describe('User Tasks – Page Structure', () => {
  test('shows heading, description, filter and search input', async ({ page }) => {
    const userName = generateUniqueName('UT-PS-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
    await navigateToUserTasksPage(page, userName);

    await expect(page.getByRole('heading', { name: 'User tasks' })).toBeVisible();
    await expect(page.getByText('Tasks assigned to user')).toBeVisible();
    await expect(page.getByText('Filter tasks')).toBeVisible();
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('shows empty state when user has no assigned tasks', async ({ page }) => {
    const userName = generateUniqueName('UT-PS-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
    await navigateToUserTasksPage(page, userName);

    await expect(page.getByText('User has no tasks')).toBeVisible();
  });
});

test.describe('User Tasks – Task List', () => {
  let userName: string;
  let taskName: string;

  test.beforeEach(async ({ page }) => {
    ({ userName, taskName } = await setupUserWithTask(page));
    await navigateToUserTasksPage(page, userName);
  });

  test('shows assigned task card with task name', async ({ page }) => {
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('filter by name shows matching task', async ({ page }) => {
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await page.getByRole('textbox').fill(taskName.slice(0, 8));
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible();
  });

  test('filter with no match shows no results message', async ({ page }) => {
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await page.getByRole('textbox').fill('XXXTHISSHOULDNOTMATCHXXX');
    await expect(page.getByText('No results found')).toBeVisible();
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).not.toBeVisible();
  });

  test('clicking task card opens the task modal', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    // Click the title text to avoid hitting child interactive elements (user assignment icon, etc.)
    await card.getByText(taskName).click();
    await expect(page.getByTestId('task-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });
});

test.describe('User Tasks – Unassign', () => {
  let userName: string;
  let taskName: string;

  test.beforeEach(async ({ page }) => {
    ({ userName, taskName } = await setupUserWithTask(page));
    await navigateToUserTasksPage(page, userName);
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('task card dropdown shows Unassign from task', async ({ page }) => {
    await page.getByTestId('wpqt-card').filter({ hasText: taskName }).getByTestId('dropdown-icon').click();
    await expect(page.getByRole('menuitem', { name: 'Unassign from task' })).toBeVisible();
  });

  test('Unassign from task removes the card from the list', async ({ page }) => {
    await page.getByTestId('wpqt-card').filter({ hasText: taskName }).getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem', { name: 'Unassign from task' }).click();
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('User has no tasks')).toBeVisible();
  });
});
