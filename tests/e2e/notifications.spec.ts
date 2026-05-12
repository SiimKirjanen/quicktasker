import { test, expect, Browser, APIRequestContext } from '@playwright/test';
import { createBoard, createStage, generateUniqueName } from './utils/board-helpers';
import { navigateToBoardsPage } from './utils/navigation';
import { assignWordPressUserToTask, createWPUser, uniqueLogin } from './utils/user-helpers';
import { loginToWordPress } from './utils/auth';

test.describe('Notifications', () => {
  async function assignerCreatesAndAssignsTask(
    browser: Browser,
    request: APIRequestContext,
    boardName: string,
    stageName: string,
    taskName: string,
    assigneeLogin: string,
  ) {
    const assignerLogin = uniqueLogin('notifAssigner');
    await createWPUser(request, assignerLogin, `${assignerLogin}@example.com`, 'administrator');

    const assignerContext = await browser.newContext();
    const assignerPage = await assignerContext.newPage();
    await loginToWordPress(assignerPage, assignerLogin, 'password123');
    await navigateToBoardsPage(assignerPage);
    await assignerPage.getByTestId('pipeline-selection-dropdown').click();
    await assignerPage.getByText(boardName).click();
    await expect(assignerPage.getByText(stageName)).toBeVisible();

    await assignerPage.getByText('Add task').first().click();
    await assignerPage.getByPlaceholder('Task name').fill(taskName);
    await assignerPage.getByPlaceholder('Task name').press('Enter');
    await expect(assignerPage.getByText(taskName)).toBeVisible();
    await assignWordPressUserToTask(assignerPage, taskName, assigneeLogin);

    await assignerContext.close();
  }

  async function createReceiverPage(browser: Browser, request: APIRequestContext, prefix: string) {
    const login = uniqueLogin(prefix);
    await createWPUser(request, login, `${login}@example.com`, 'administrator');
    const context = await browser.newContext();
    const page = await context.newPage();
    await loginToWordPress(page, login, 'password123');
    return { login, context, page };
  }

  test('shows a notification after assignment and marks it read', async ({ browser, request }) => {
    const boardName = generateUniqueName('NotifMarkReadBoard');
    const stageName = generateUniqueName('NotifMarkReadStage');
    const taskName = generateUniqueName('NotifMarkReadTask');

    const { login, context, page } = await createReceiverPage(browser, request, 'notifReceiver');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName, '');
    await createStage(page, stageName, '');
    await assignerCreatesAndAssignsTask(browser, request, boardName, stageName, taskName, login);

    await page.getByTestId('notifications-nav-link').first().click();
    const modal = page.getByTestId('notifications-modal');
    await expect(modal).toBeVisible();

    await modal.getByTestId('notifications-refresh-icon').click();
    await expect(modal.getByText(taskName, { exact: false })).toBeVisible();

    await expect(page.getByTestId('notifications-unread-badge').first()).toBeVisible();

    const notificationRow = modal.locator(`li:has-text("${taskName}")`);
    await notificationRow.getByRole('button', { name: 'Mark as read' }).click();

    await expect(notificationRow.getByRole('button', { name: 'Mark as read' })).toHaveCount(0);

    await context.close();
  });

  test('filter and max-age selectors update the visible list', async ({ browser, request }) => {
    const boardName = generateUniqueName('NotifFilterBoard');
    const stageName = generateUniqueName('NotifFilterStage');
    const taskName = generateUniqueName('NotifFilterTask');

    const { login, context, page } = await createReceiverPage(browser, request, 'notifReceiver');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName, '');
    await createStage(page, stageName, '');
    await assignerCreatesAndAssignsTask(browser, request, boardName, stageName, taskName, login);

    await page.getByTestId('notifications-nav-link').first().click();
    const modal = page.getByTestId('notifications-modal');
    await expect(modal).toBeVisible();

    await modal.getByTestId('notifications-refresh-icon').click();
    await expect(modal.getByText(taskName, { exact: false })).toBeVisible();

    await modal.locator('#notifications-filter').selectOption({ label: 'Read' });
    await expect(modal.getByText(taskName, { exact: false })).toHaveCount(0);

    await modal.locator('#notifications-filter').selectOption({ label: 'Unread' });
    await expect(modal.getByText(taskName, { exact: false })).toBeVisible();

    await modal.locator('#notifications-max-age').selectOption({ label: 'Last 7 days' });
    await expect(modal.getByText(taskName, { exact: false })).toBeVisible();

    await context.close();
  });

  test('board filter limits notifications to the selected board', async ({ browser, request }) => {
    const boardAName = generateUniqueName('NotifBoardFilterA');
    const stageAName = generateUniqueName('NotifBoardFilterStageA');
    const taskAName = generateUniqueName('NotifBoardFilterTaskA');
    const boardBName = generateUniqueName('NotifBoardFilterB');
    const stageBName = generateUniqueName('NotifBoardFilterStageB');
    const taskBName = generateUniqueName('NotifBoardFilterTaskB');

    const { login, context, page } = await createReceiverPage(browser, request, 'notifReceiver');

    await navigateToBoardsPage(page);
    await createBoard(page, boardAName, '');
    await createStage(page, stageAName, '');
    await createBoard(page, boardBName, '');
    await createStage(page, stageBName, '');

    await assignerCreatesAndAssignsTask(browser, request, boardAName, stageAName, taskAName, login);
    await assignerCreatesAndAssignsTask(browser, request, boardBName, stageBName, taskBName, login);

    await page.getByTestId('notifications-nav-link').first().click();
    const modal = page.getByTestId('notifications-modal');
    await expect(modal).toBeVisible();

    await modal.getByTestId('notifications-refresh-icon').click();
    await expect(modal.getByText(taskAName, { exact: false })).toBeVisible();
    await expect(modal.getByText(taskBName, { exact: false })).toBeVisible();

    await modal.locator('#notifications-boards').click();
    await page.getByTestId('multi-select-deselect').click();
    await page.getByRole('option', { name: boardAName }).click();
    await page.keyboard.press('Escape');

    await expect(modal.getByText(taskAName, { exact: false })).toBeVisible();
    await expect(modal.getByText(taskBName, { exact: false })).toHaveCount(0);

    await context.close();
  });

  test('preferences (filter and max-age) persist across reloads', async ({ browser, request }) => {
    const { context, page } = await createReceiverPage(browser, request, 'notifPrefs');

    await navigateToBoardsPage(page);
    await page.getByTestId('notifications-nav-link').first().click();
    const modal = page.getByTestId('notifications-modal');
    await expect(modal).toBeVisible();

    await modal.locator('#notifications-filter').selectOption({ label: 'Unread' });
    await modal.locator('#notifications-max-age').selectOption({ label: 'Last 7 days' });

    await page.reload();

    await page.getByTestId('notifications-nav-link').first().click();
    const modalAfterReload = page.getByTestId('notifications-modal');
    await expect(modalAfterReload).toBeVisible();

    await expect(modalAfterReload.locator('#notifications-filter')).toHaveValue('unread');
    await expect(modalAfterReload.locator('#notifications-max-age')).toHaveValue('168');

    await context.close();
  });
});
