import { test, expect, Page, Browser, APIRequestContext } from '@playwright/test';
import { ADMIN_USERNAME } from './constants';
import { createBoard, createStage, generateUniqueName } from './utils/board-helpers';
import { navigateToBoardsPage } from './utils/navigation';
import { assignWordPressUserToTask, createWPUser, uniqueLogin } from './utils/user-helpers';
import { loginToWordPress } from './utils/auth';

test.describe('Notifications', () => {
  async function setupBoardAndAssignerAssignsTask(
    adminPage: Page,
    browser: Browser,
    request: APIRequestContext,
    boardName: string,
    stageName: string,
    taskName: string,
  ) {
    await navigateToBoardsPage(adminPage);
    await createBoard(adminPage, boardName, '');
    await createStage(adminPage, stageName, '');

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
    await assignWordPressUserToTask(assignerPage, taskName, ADMIN_USERNAME);

    await assignerContext.close();
  }

  test('shows a notification after assignment and marks it read', async ({ page, browser, request }) => {
    const taskName = generateUniqueName('NotifMarkReadTask');
    await setupBoardAndAssignerAssignsTask(
      page,
      browser,
      request,
      generateUniqueName('NotifMarkReadBoard'),
      generateUniqueName('NotifMarkReadStage'),
      taskName,
    );

    await page.getByTestId('refresh-icon').click();

    await expect(page.getByTestId('notifications-unread-badge').first()).toBeVisible();

    await page.getByTestId('notifications-nav-link').first().click();
    const modal = page.getByTestId('notifications-modal');
    await expect(modal).toBeVisible();

    await expect(modal.getByText(taskName, { exact: false })).toBeVisible();

    await modal.getByRole('button', { name: 'Mark as read' }).first().click();

    await expect(modal.getByRole('button', { name: 'Mark as read' })).toHaveCount(0);
    await expect(page.getByTestId('notifications-unread-badge')).toHaveCount(0);
  });

  test('filter and max-age selectors update the visible list', async ({ page, browser, request }) => {
    const taskName = generateUniqueName('NotifFilterTask');
    await setupBoardAndAssignerAssignsTask(
      page,
      browser,
      request,
      generateUniqueName('NotifFilterBoard'),
      generateUniqueName('NotifFilterStage'),
      taskName,
    );

    await page.getByTestId('refresh-icon').click();

    await page.getByTestId('notifications-nav-link').first().click();
    const modal = page.getByTestId('notifications-modal');
    await expect(modal).toBeVisible();

    await expect(modal.getByText(taskName, { exact: false })).toBeVisible();

    await modal.locator('#notifications-filter').selectOption({ label: 'Read' });
    await expect(modal.getByTestId('notifications-empty')).toBeVisible();

    await modal.locator('#notifications-filter').selectOption({ label: 'Unread' });
    await expect(modal.getByText(taskName, { exact: false })).toBeVisible();

    await modal.locator('#notifications-max-age').selectOption({ label: 'Last 7 days' });
    await expect(modal.getByText(taskName, { exact: false })).toBeVisible();
  });
});
