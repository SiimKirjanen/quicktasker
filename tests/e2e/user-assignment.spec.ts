import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, generateUniqueName, generateUniqueDescription, getTaskCard } from './utils/board-helpers';
import { createQuickTasker, assignWordPressUserToTask, closeUserAssignmentDropdown, openUserAssignmentDropdown } from './utils/user-helpers';
import { ADMIN_USERNAME } from './constants';

test.describe('WordPress User Assignment', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('UserTestBoard'), generateUniqueDescription('Board for user assignment testing'));
    await createStage(page, generateUniqueName('UserStage'), generateUniqueDescription('Stage for user tests'));
  });

  test('should assign a WordPress user to a task', async ({ page }) => {
    const taskName = generateUniqueName('WPUserTask');

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME, false);

    const list = page.getByTestId('user-assignment-list');
    await expect(
      list.locator('[data-testid="user-assignment-row-assigned"]').filter({ hasText: ADMIN_USERNAME })
    ).toBeVisible();

    await closeUserAssignmentDropdown(page, taskName);

    await expect(taskCard.getByText(ADMIN_USERNAME, { exact: true })).toBeVisible();
  });

  test('should unassign a WordPress user from a task', async ({ page }) => {
    const taskName = generateUniqueName('UnassignWPTask');

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME, false);

    const list = page.getByTestId('user-assignment-list');
    const assignedRow = list.locator('[data-testid="user-assignment-row-assigned"]').filter({ hasText: ADMIN_USERNAME });
    await expect(assignedRow).toBeVisible();

    await assignedRow.click();

    await expect(
      list.locator('[data-testid="user-assignment-row-assigned"]').filter({ hasText: ADMIN_USERNAME })
    ).not.toBeVisible();
  });
});

test.describe('QuickTasker User Assignment', () => {
  test('should assign a QuickTasker user to a task', async ({ page }) => {
    const taskName = generateUniqueName('QTUserTask');
    const qtUserName = generateUniqueName('QTUser');
    await createQuickTasker(page, qtUserName, 'Test QuickTasker user');
    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('QTUserTestBoard'), generateUniqueDescription('Board for QuickTasker user assignment testing'));
    await createStage(page, generateUniqueName('QTUserStage'), generateUniqueDescription('Stage for QuickTasker user tests'));
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText(taskName)).toBeVisible();
    const taskCard = getTaskCard(page, taskName);
    await openUserAssignmentDropdown(page, taskName);
    const list = page.getByTestId('user-assignment-list');
    await list.getByText(qtUserName, { exact: true }).click();
    await expect(
      list.locator('[data-testid="user-assignment-row-assigned"]').filter({ hasText: qtUserName })
    ).toBeVisible();

    await closeUserAssignmentDropdown(page, taskName);
    await expect(taskCard.getByText(qtUserName, { exact: true })).toBeVisible();
  });

  test('should unassign a QuickTasker user from a task', async ({ page }) => {
    const taskName = generateUniqueName('UnassignQTTask');
    const qtUserName = generateUniqueName('QTUser');
    await createQuickTasker(page, qtUserName, 'Test QuickTasker user');
    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('QTUserTestBoard'), generateUniqueDescription('Board for QuickTasker user assignment testing'));
    await createStage(page, generateUniqueName('QTUserStage'), generateUniqueDescription('Stage for QuickTasker user tests'));
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText(taskName)).toBeVisible();

    await openUserAssignmentDropdown(page, taskName);
    const list = page.getByTestId('user-assignment-list');
    await list.getByText(qtUserName, { exact: true }).click();
    const assignedRow = list.locator('[data-testid="user-assignment-row-assigned"]').filter({ hasText: qtUserName });
    await expect(assignedRow).toBeVisible();
    await assignedRow.click();
    await expect(
      list.locator('[data-testid="user-assignment-row-assigned"]').filter({ hasText: qtUserName })
    ).not.toBeVisible();
  });
});
