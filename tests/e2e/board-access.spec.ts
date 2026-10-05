import { test, expect, type Page } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  createBoardViaApi,
  createTask,
  deleteBoardViaApi,
  generateUniqueName,
  getTaskCard,
  selectBoard,
} from './utils/board-helpers';
import { loginToWordPressViaApi } from './utils/auth';
import {
  addWPUserToBoards,
  assignWordPressUserToTask,
  createWPUser,
  grantWPUserCaps,
  openUserAssignmentDropdown,
  uniqueLogin,
} from './utils/user-helpers';
import { TIMEOUTS } from './utils/timeouts';

/**
 * WordPress users who are not administrators can only be assigned to tasks on
 * boards they have been added to, and only see those boards.
 */

async function openBoard(page: Page, boardName: string) {
  await navigateToBoardsPage(page);
  await selectBoard(page, boardName);
  await expect(page.getByTestId('active-pipeline-name')).toHaveText(boardName);
}

test.describe('Board access', () => {
  test('only WordPress users added to the board can be assigned to its tasks', async ({ page, request }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const boardName = generateUniqueName('BA-Board');
    const stageName = generateUniqueName('BA-Stage');
    const taskName = generateUniqueName('BA-Task');
    await createBoardViaApi(request, boardName, stageName);
    const userLogin = uniqueLogin('wpaccess');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);

    try {
      await openBoard(page, boardName);
      await createTask(page, stageName, taskName);

      await openUserAssignmentDropdown(page, taskName);
      await expect(
        page
          .getByTestId('user-assignment-list')
          .getByTestId('user-assignment-row-no-board-access')
          .filter({ hasText: userLogin }),
      ).toContainText('Not added to this board');

      await addWPUserToBoards(request, userId, [boardName]);
      await openBoard(page, boardName);
      await assignWordPressUserToTask(page, taskName, userLogin);
      await expect(getTaskCard(page, taskName).getByTestId('no-board-access-warning')).toHaveCount(0);

      // Removing the user from the board keeps them assigned, but marks them.
      await addWPUserToBoards(request, userId, []);
      await openBoard(page, boardName);
      await expect(getTaskCard(page, taskName).getByTestId('no-board-access-warning')).toBeVisible();
    } finally {
      await deleteBoardViaApi(request, boardName);
    }
  });

  test('a user without boards is asked to contact an administrator', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpnoboards');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const context = await loginToWordPressViaApi(browser, userLogin);

    try {
      const userPage = await context.newPage();
      await userPage.goto('/wp-admin/admin.php?page=wp-quicktasker');
      await expect(
        userPage.getByText(
          'You have not been added to any boards yet. Ask a WordPress administrator to add you to a board.',
        ),
      ).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
      await expect(userPage.getByText('Create a new board')).toHaveCount(0);
    } finally {
      await context.close();
    }
  });
});
