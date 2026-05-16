import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, createTask, generateUniqueName, generateUniqueDescription } from './utils/board-helpers';
import { assignWordPressUserToTask, closeUserAssignmentDropdown } from './utils/user-helpers';
import { ADMIN_USERNAME } from './constants';
import { TIMEOUTS } from './utils/timeouts';

test.describe('My Tasks page', () => {
  test('shows tasks created by and assigned to the current user', async ({ page }) => {
    const stageName = generateUniqueName('MT-Stage');
    const createdTaskName = generateUniqueName('MT-Created');
    const assignedTaskName = generateUniqueName('MT-Assigned');

    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('MT-Board'), generateUniqueDescription('Board for My Tasks e2e'));
    await createStage(page, stageName);

    await createTask(page, stageName, createdTaskName);

    await createTask(page, stageName, assignedTaskName);
    await assignWordPressUserToTask(page, assignedTaskName, ADMIN_USERNAME, false);
    await closeUserAssignmentDropdown(page, assignedTaskName);

    await page.goto('/wp-admin/admin.php?page=wp-quicktasker-my-tasks');
    await expect(page.getByRole('heading', { name: 'My Tasks' })).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

    const createdSection = page
      .locator('div.wpqt-mt-6')
      .filter({ has: page.getByRole('heading', { name: 'Tasks I created' }) });
    const assignedSection = page
      .locator('div.wpqt-mt-6')
      .filter({ has: page.getByRole('heading', { name: 'Tasks assigned to me' }) });

    await expect(createdSection.getByText(createdTaskName)).toBeVisible();
    await expect(createdSection.getByText(assignedTaskName)).toBeVisible();
    await expect(assignedSection.getByText(assignedTaskName)).toBeVisible();
  });
});
