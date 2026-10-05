import { test, expect, type Page } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  createBoard,
  createStage,
  deleteBoardViaApi,
  generateUniqueName,
  generateUniqueDescription,
  setPrimaryBoard,
} from './utils/board-helpers';
import { waitForModalToClose } from './utils/modal-helpers';
import { loginToWordPressViaApi } from './utils/auth';
import { createWPUser, grantWPUserCaps, uniqueLogin } from './utils/user-helpers';

test.describe('Board Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should create a new board', async ({ page }) => {
    const boardName = generateUniqueName('BM-CR-Board');
    const boardDescription = generateUniqueDescription('Board for e2e tests');

    await page.getByTestId('pipeline-selection-dropdown').click();

    await page.getByText('Add new board').click();

    await page.getByRole('textbox', { name: 'Name' }).fill(boardName);
    await page.getByRole('textbox', { name: 'Description' }).fill(boardDescription);
    await page.getByRole('button', { name: 'Add board' }).click();
    await waitForModalToClose(page, 'add-pipeline-modal');

    await expect(page.getByText(boardName).first()).toBeVisible();
    await expect(page.getByText(boardDescription)).toBeVisible();
  });

  test('should delete a board', async ({ page }) => {
    const boardName = generateUniqueName('BM-DEL-Board');
    const boardDescription = generateUniqueDescription('This board will be deleted');
    await createBoard(page, boardName, boardDescription);

    await expect(page.getByText(boardName).first()).toBeVisible();

    await page.locator('#wpqt-app').getByText('Settings').click();
    await page.getByText('Delete board').click();

    await page.getByRole('button', { name: 'Yes' }).click();
    await waitForModalToClose(page, 'edit-pipeline-modal');

    await expect(page.getByTestId('pipeline-selection-dropdown').getByText(boardName)).not.toBeVisible();
  });
});

test.describe('Board Operations', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(page, `Test Board ${Date.now()}`, 'Board for testing operations');
  });

  test('should allow switching between boards', async ({ page }) => {
    const firstBoardName = generateUniqueName('BO-SW-First');
    const secondBoardName = generateUniqueName('BO-SW-Second');

    await createBoard(page, firstBoardName, 'First test board');
    await createBoard(page, secondBoardName, 'Another test board');

    await expect(page.getByText(secondBoardName).first()).toBeVisible();

    await page.getByTestId('pipeline-selection-dropdown').click();
    await page.getByText(firstBoardName).click();

    await expect(page.getByText(firstBoardName).first()).toBeVisible();
  });

  test('should update board name and description', async ({ page }) => {
    const originalDescription = 'Original description for update test';
    const originalName = `Board to Update ${Date.now()}`;
    await createBoard(page, originalName, originalDescription);

    await expect(page.getByText(originalDescription)).toBeVisible();

    await page.locator('#wpqt-app').getByText('Settings').click();

    const updatedName = `Updated Board ${Date.now()}`;
    const updatedDescription = 'This board has been updated via e2e test';

    await page.getByRole('textbox', { name: 'Name' }).fill(updatedName);
    await page.getByRole('textbox', { name: 'Description' }).fill(updatedDescription);

    await page.waitForTimeout(1000);

    await page.getByTestId('wpqt-modal-close-button').click();

    await expect(page.getByText(updatedName).first()).toBeVisible();
    await expect(page.getByText(updatedDescription)).toBeVisible();
  });

  test('should control mark as done toggle based on last stage setting', async ({ page }) => {
    const boardName = `Task Completion Board ${Date.now()}`;
    await createBoard(page, boardName, 'Testing mark as done control');

    await createStage(page, 'In Progress', 'Tasks in progress');
    await createStage(page, 'Completed', 'Completed tasks');

    await page.getByText('Add task').first().click();
    await page.getByPlaceholder('Task name').first().fill('Task in Progress Stage');
    await page.getByPlaceholder('Task name').first().press('Enter');

    await expect(page.getByText('Task in Progress Stage')).toBeVisible();

    await page.getByText('Add task').nth(1).click();
    await page.getByPlaceholder('Task name').fill('Task in Completed Stage');
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText('Task in Completed Stage')).toBeVisible();

    const progressTaskCard = page.locator('[data-rfd-draggable-id]').filter({ hasText: 'Task in Progress Stage' });
    const completedTaskCard = page.locator('[data-rfd-draggable-id]').filter({ hasText: 'Task in Completed Stage' });

    await expect(progressTaskCard.getByTestId('task-done-icon-uncompleted')).toBeVisible();
    await expect(completedTaskCard.getByTestId('task-done-icon-uncompleted')).toBeVisible();

    await page.locator('#wpqt-app').getByText('Settings').click();
    await page.getByTestId('task-completion-restriction-toggle').click({ force: true });

    await page.waitForTimeout(1000);

    await page.getByTestId('wpqt-modal-close-button').click();

    await expect(progressTaskCard.getByTestId('task-done-icon-uncompleted')).not.toBeVisible();
    await expect(completedTaskCard.getByTestId('task-done-icon-uncompleted')).toBeVisible();
  });
});

test.describe('Primary board', () => {
  // The primary board is a per-user preference, so each test uses its own
  // WordPress users instead of the shared admin. Changing the admin's primary
  // board would change the board other parallel tests open on page load.
  async function expectPrimaryBoardOnLoad(page: Page, boardName: string) {
    await navigateToBoardsPage(page);
    await expect(page.getByTestId('active-pipeline-name')).toHaveText(boardName);

    await page.getByTestId('pipeline-selection-dropdown').click();
    const boardItem = page.getByTestId('pipeline-selection-item').filter({ hasText: boardName });
    await expect(boardItem.getByTestId('primary-pipeline-icon')).toBeVisible();
  }

  test('each user keeps their own primary board after a page refresh', async ({ page, browser, request }) => {
    const firstBoardName = generateUniqueName('PB-First');
    const secondBoardName = generateUniqueName('PB-Second');
    await navigateToBoardsPage(page);
    await createBoard(page, firstBoardName, generateUniqueDescription('First primary board'));
    await createBoard(page, secondBoardName, generateUniqueDescription('Second primary board'));

    const firstLogin = uniqueLogin('wpprimary');
    const secondLogin = uniqueLogin('wpprimary');
    for (const login of [firstLogin, secondLogin]) {
      const userId = await createWPUser(request, login, `${login}@example.com`);
      await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    }

    const firstContext = await loginToWordPressViaApi(browser, firstLogin);
    const secondContext = await loginToWordPressViaApi(browser, secondLogin);

    try {
      const firstPage = await firstContext.newPage();
      const secondPage = await secondContext.newPage();

      await navigateToBoardsPage(firstPage);
      await setPrimaryBoard(firstPage, firstBoardName);

      await navigateToBoardsPage(secondPage);
      await setPrimaryBoard(secondPage, secondBoardName);

      // The second user's choice must not replace the first user's.
      await expectPrimaryBoardOnLoad(firstPage, firstBoardName);
      await expectPrimaryBoardOnLoad(secondPage, secondBoardName);
    } finally {
      await firstContext.close();
      await secondContext.close();
      await deleteBoardViaApi(request, firstBoardName);
      await deleteBoardViaApi(request, secondBoardName);
    }
  });
});

test.describe('Board Task View', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should switch to task view, search tasks, filter by stage, and switch back', async ({ page }) => {
    const boardName = `Task View Test ${Date.now()}`;
    await createBoard(page, boardName, 'Testing task view functionality');

    await createStage(page, 'To Do', 'Tasks to do');
    await createStage(page, 'In Progress', 'Tasks in progress');

    await page.getByText('Add task').first().click();
    await page.getByPlaceholder('Task name').first().fill('Task Alpha');
    await page.getByPlaceholder('Task name').first().press('Enter');
    await expect(page.getByText('Task Alpha')).toBeVisible();

    await page.getByText('Add task').first().click();
    await page.getByPlaceholder('Task name').first().fill('Task Beta');
    await page.getByPlaceholder('Task name').first().press('Enter');
    await expect(page.getByText('Task Beta')).toBeVisible();

    await page.getByText('Add task').nth(1).click();
    await page.getByPlaceholder('Task name').fill('Task Gamma');
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText('Task Gamma')).toBeVisible();

    await page.getByText('Task view', { exact: true }).click();

    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).toBeVisible();

    await page.getByRole('textbox', { name: 'Search' }).fill('Alpha');

    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).not.toBeVisible();
    await expect(page.getByText('Task Gamma')).not.toBeVisible();

    await page.getByRole('textbox', { name: 'Search' }).clear();

    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).toBeVisible();

    await page.getByRole('textbox', { name: 'Search' }).fill('Beta');
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Alpha')).not.toBeVisible();
    await expect(page.getByText('Task Gamma')).not.toBeVisible();

    await page.getByRole('textbox', { name: 'Search' }).clear();

    const stageFilter = page.locator('#task-view-stage-filter');
    await stageFilter.selectOption({ label: 'To Do' });

    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).not.toBeVisible();

    await stageFilter.selectOption({ label: 'In Progress' });

    await expect(page.getByText('Task Gamma')).toBeVisible();
    await expect(page.getByText('Task Alpha')).not.toBeVisible();
    await expect(page.getByText('Task Beta')).not.toBeVisible();

    await stageFilter.selectOption({ label: 'All stages' });

    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).toBeVisible();

    await page.getByRole('textbox', { name: 'Search' }).fill('Task');
    await stageFilter.selectOption({ label: 'To Do' });

    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).not.toBeVisible();

    await page.getByText('Board view').click();
    await expect(page.getByText('Task view', { exact: true })).toBeVisible();
  });

  test('should handle empty search results in task view', async ({ page }) => {
    const boardName = `Empty Search Test ${Date.now()}`;
    await createBoard(page, boardName, 'Testing empty search');

    await createStage(page, 'To Do', 'Tasks to do');
    await page.getByText('Add task').first().click();
    await page.getByPlaceholder('Task name').first().fill('Sample Task');
    await page.getByPlaceholder('Task name').first().press('Enter');
    await expect(page.getByText('Sample Task')).toBeVisible();

    await page.getByText('Task view').click();

    await page.getByRole('textbox', { name: 'Search' }).fill('NonExistentTask');

    await expect(page.getByText('No tasks')).toBeVisible();
    await expect(page.getByText('Sample Task')).not.toBeVisible();

    await page.getByRole('textbox', { name: 'Search' }).clear();
    await expect(page.getByText('Sample Task')).toBeVisible();
  });
});
