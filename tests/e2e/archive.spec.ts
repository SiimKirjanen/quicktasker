import { test, expect } from '@playwright/test';
import { navigateToArchivePage, navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, createTask, generateUniqueName, getTaskCard, selectBoard } from './utils/board-helpers';
import { TIMEOUTS } from './utils/timeouts';

async function archiveTask(page: any, taskName: string): Promise<void> {
  const taskCard = getTaskCard(page, taskName);
  await taskCard.getByTestId('dropdown-icon').click();
  await page.getByText('Archive task', { exact: true }).click();
  await expect(page.getByText('Are you sure you want to archive this task?')).toBeVisible();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.getByText(taskName)).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

test.describe('Archive – Page Structure', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToArchivePage(page);
  });

  test('renders archive page with heading, filter controls and settings button', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
    await expect(page.getByText('Archive filtering')).toBeVisible();
    await expect(page.getByTestId('archive-settings-button')).toBeVisible();

    await expect(page.locator('#archive-search')).toBeVisible();
    await expect(page.getByText('Task board')).toBeVisible();
    await expect(page.getByText('Task status')).toBeVisible();
    await expect(page.getByText('Number of tasks')).toBeVisible();
    await expect(page.getByText('Task order')).toBeVisible();
    await expect(page.getByText('Apply filter')).toBeVisible();
  });

  test('opens settings modal with cleanup section, description and Clean button', async ({ page }) => {
    await page.getByTestId('archive-settings-button').click();
    await expect(page.getByTestId('archive-settings-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('Archive cleanup')).toBeVisible();
    await expect(page.getByText('Remove tasks from archive that have no parent board.')).toBeVisible();
    await expect(page.getByText('Clean', { exact: true })).toBeVisible();
  });
});

test.describe('Archive – Archived Task Card', () => {
  let boardName: string;
  let taskName: string;

  test.beforeEach(async ({ page }) => {
    boardName = generateUniqueName('AR-TC-Board');
    const stageName = generateUniqueName('AR-TC-Stage');
    taskName = generateUniqueName('AR-TC-Task');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);
    await createTask(page, stageName, taskName);
    await archiveTask(page, taskName);
    await navigateToArchivePage(page);
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
  });

  test('renders archived task card with name, board label and View/Restore dropdown items', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await expect(card).toBeVisible();
    await expect(card.getByText('Board:', { exact: true })).toBeVisible();
    await expect(card.getByText(boardName, { exact: true })).toBeVisible();

    await card.getByTestId('dropdown-icon').click();
    await expect(page.getByText('View task')).toBeVisible();
    await expect(page.getByText('Restore task')).toBeVisible();
  });
});

test.describe('Archive – Task Actions', () => {
  let taskName: string;
  let boardName: string;

  test.beforeEach(async ({ page }) => {
    boardName = generateUniqueName('AR-TA-Board');
    const stageName = generateUniqueName('AR-TA-Stage');
    taskName = generateUniqueName('AR-TA-Task');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);
    await createTask(page, stageName, taskName);
    await archiveTask(page, taskName);
    await navigateToArchivePage(page);
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
  });

  test('opens task edit modal via card click and via View task dropdown', async ({ page }) => {
    await page.getByTestId('wpqt-card').filter({ hasText: taskName }).click();
    await expect(page.getByTestId('task-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await page.getByTestId('wpqt-modal-close-button').click();
    await expect(page.getByTestId('task-modal')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('View task').click();
    await expect(page.getByTestId('task-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('restore modal shows heading, board selector and Restore button, and restoring removes task from archive', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('Restore task').click();

    const modal = page.getByTestId('task-restore-modal');
    await expect(modal).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText(`Restore ${taskName}`)).toBeVisible();
    await expect(page.locator('#task-restore-pipeline-select')).toBeVisible();
    await expect(modal.getByText('Restore', { exact: true })).toBeVisible();

    await modal.getByText('Restore', { exact: true }).click();
    await expect(modal).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).not.toBeVisible();
  });

  test('restoring a task adds it back to the board', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('Restore task').click();
    const modal = page.getByTestId('task-restore-modal');
    await expect(modal).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await modal.getByText('Restore', { exact: true }).click();
    await expect(modal).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await expect(getTaskCard(page, taskName)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });
});

test.describe('Archive – Search Filter', () => {
  let taskName: string;

  test.beforeEach(async ({ page }) => {
    const boardName = generateUniqueName('AR-SF-Board');
    const stageName = generateUniqueName('AR-SF-Stage');
    taskName = generateUniqueName('AR-SF-Task');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);
    await createTask(page, stageName, taskName);
    await archiveTask(page, taskName);
    await navigateToArchivePage(page);
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
  });

  test('searching by task name shows the matching task', async ({ page }) => {
    await page.locator('#archive-search').fill(taskName);
    await page.getByText('Apply filter').click();
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
  });

  test('searching for non-existent text shows No match', async ({ page }) => {
    await page.locator('#archive-search').fill('zzzNonExistentTaskXXX');
    await page.getByText('Apply filter').click();
    await expect(page.getByText('No match')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });
});
