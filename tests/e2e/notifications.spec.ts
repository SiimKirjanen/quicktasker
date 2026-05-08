import { test, expect, Page } from '@playwright/test';
import { ADMIN_USERNAME } from './constants';
import { createBoard, createStage, generateUniqueName } from './utils/board-helpers';
import { navigateToBoardsPage } from './utils/navigation';
import { assignWordPressUserToTask } from './utils/user-helpers';

test.describe('Notifications', () => {
  async function createTaskAndAssignAdmin(page: Page, taskName: string) {
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText(taskName)).toBeVisible();
    await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME);
  }

  test('shows a notification after assignment and marks it read', async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(
      page,
      generateUniqueName('NotifMarkReadBoard'),
      'Board for notifications mark-as-read test',
    );
    await createStage(
      page,
      generateUniqueName('NotifMarkReadStage'),
      'Stage for notifications mark-as-read test',
    );

    const taskName = generateUniqueName('NotifMarkReadTask');
    await createTaskAndAssignAdmin(page, taskName);

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

  test('filter and max-age selectors update the visible list', async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(
      page,
      generateUniqueName('NotifFilterBoard'),
      'Board for notifications filter test',
    );
    await createStage(
      page,
      generateUniqueName('NotifFilterStage'),
      'Stage for notifications filter test',
    );

    const taskName = generateUniqueName('NotifFilterTask');
    await createTaskAndAssignAdmin(page, taskName);

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
