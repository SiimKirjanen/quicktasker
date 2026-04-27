import { test, expect } from '@playwright/test';
import { navigateToArchivePage, navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, createTask, generateUniqueName, getTaskCard, selectBoard } from './utils/board-helpers';
import { TIMEOUTS } from './utils/timeouts';

/**
 * Archive a task from the boards page. The task must already be visible.
 */
async function archiveTask(page: any, taskName: string): Promise<void> {
  const taskCard = getTaskCard(page, taskName);
  await taskCard.getByTestId('dropdown-icon').click();
  await page.getByText('Archive task', { exact: true }).click();
  await expect(page.getByText('Are you sure you want to archive this task?')).toBeVisible();
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.getByText(taskName)).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

// ── Test suites ───────────────────────────────────────────────────────────────

test.describe('Archive – Page Structure', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToArchivePage(page);
  });

  test('shows Archive heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible();
  });

  test('shows Archive filtering section title', async ({ page }) => {
    await expect(page.getByText('Archive filtering')).toBeVisible();
  });

  test('shows Settings gear icon link', async ({ page }) => {
    await expect(page.getByTestId('archive-settings-button')).toBeVisible();
  });
});

test.describe('Archive – Filter Controls', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToArchivePage(page);
  });

  test('shows search input', async ({ page }) => {
    await expect(page.locator('#archive-search')).toBeVisible();
  });

  test('shows Task board filter', async ({ page }) => {
    await expect(page.getByText('Task board')).toBeVisible();
  });

  test('shows Task status filter', async ({ page }) => {
    await expect(page.getByText('Task status')).toBeVisible();
  });

  test('shows Number of tasks filter', async ({ page }) => {
    await expect(page.getByText('Number of tasks')).toBeVisible();
  });

  test('shows Task order filter', async ({ page }) => {
    await expect(page.getByText('Task order')).toBeVisible();
  });

  test('shows Apply filter button', async ({ page }) => {
    await expect(page.getByText('Apply filter')).toBeVisible();
  });
});

test.describe('Archive – Archived Task Card', () => {
  let boardName: string;
  let stageName: string;
  let taskName: string;

  test.beforeEach(async ({ page }) => {
    boardName = generateUniqueName('AR-TC-Board');
    stageName = generateUniqueName('AR-TC-Stage');
    taskName = generateUniqueName('AR-TC-Task');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);
    await createTask(page, stageName, taskName);
    await archiveTask(page, taskName);
    await navigateToArchivePage(page);
    // Wait for archive items to load
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
  });

  test('shows task card with task name', async ({ page }) => {
    await expect(page.getByTestId('wpqt-card').filter({ hasText: taskName })).toBeVisible();
  });

  test('shows Board label with board name on task card', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await expect(card.getByText('Board:', { exact: true })).toBeVisible();
    await expect(card.getByText(boardName, { exact: true })).toBeVisible();
  });

  test('task dropdown shows View task item', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await expect(page.getByText('View task')).toBeVisible();
  });

  test('task dropdown shows Restore task item', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await expect(page.getByText('Restore task')).toBeVisible();
  });


});

test.describe('Archive – Settings Modal', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToArchivePage(page);
  });

  test('clicking Settings opens archive settings modal', async ({ page }) => {
    await page.getByTestId('archive-settings-button').click();
    await expect(page.getByTestId('archive-settings-modal')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
  });

  test('archive settings modal shows Archive cleanup section', async ({ page }) => {
    await page.getByTestId('archive-settings-button').click();
    await expect(page.getByTestId('archive-settings-modal')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Archive cleanup')).toBeVisible();
  });

  test('archive settings modal shows cleanup description', async ({ page }) => {
    await page.getByTestId('archive-settings-button').click();
    await expect(page.getByTestId('archive-settings-modal')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(
      page.getByText('Remove tasks from archive that have no parent board.'),
    ).toBeVisible();
  });

  test('archive settings modal shows Clean button', async ({ page }) => {
    await page.getByTestId('archive-settings-button').click();
    await expect(page.getByTestId('archive-settings-modal')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Clean', { exact: true })).toBeVisible();
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

  test('clicking task card opens task edit modal', async ({ page }) => {
    await page.getByTestId('wpqt-card').filter({ hasText: taskName }).click();
    await expect(page.getByTestId('task-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('View task in dropdown opens task edit modal', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('View task').click();
    await expect(page.getByTestId('task-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('Restore task in dropdown opens task restore modal', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('Restore task').click();
    await expect(page.getByTestId('task-restore-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('task restore modal shows Restore heading with task name', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('Restore task').click();
    await expect(page.getByTestId('task-restore-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText(`Restore ${taskName}`)).toBeVisible();
  });

  test('task restore modal shows board selector', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('Restore task').click();
    await expect(page.getByTestId('task-restore-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.locator('#task-restore-pipeline-select')).toBeVisible();
  });

  test('task restore modal has Restore button', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('Restore task').click();
    const modal = page.getByTestId('task-restore-modal');
    await expect(modal).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(modal.getByText('Restore', { exact: true })).toBeVisible();
  });

  test('restoring a task removes it from the archive list', async ({ page }) => {
    const card = page.getByTestId('wpqt-card').filter({ hasText: taskName });
    await card.getByTestId('dropdown-icon').click();
    await page.getByText('Restore task').click();
    const modal = page.getByTestId('task-restore-modal');
    await expect(modal).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
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
