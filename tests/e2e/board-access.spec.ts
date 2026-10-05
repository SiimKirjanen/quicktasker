import { test, expect, type Page } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  createBoard,
  createBoardViaApi,
  createStage,
  createTask,
  createTaskViaApi,
  deleteBoardViaApi,
  generateUniqueName,
  getTaskCard,
  selectBoard,
} from './utils/board-helpers';
import { loginToWordPressViaApi } from './utils/auth';
import {
  addWPUserToBoards,
  assignQuickTaskerToTaskViaApi,
  assignWordPressUserToTask,
  assignWPUserToTaskViaApi,
  createQuickTaskerUserViaApi,
  createWPUser,
  grantWPUserCaps,
  openUserAssignmentDropdown,
  uniqueLogin,
} from './utils/user-helpers';
import {
  getTasksAppTaskCard,
  navigateToAssignableTasks,
  navigateToAssignedTasks,
} from './utils/tasks-app-helpers';
import { TIMEOUTS } from './utils/timeouts';
import { runWpCli } from './utils/wp-cli';

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

  test('a WordPress user only sees tasks of their boards in the tasks app', async ({ browser, request }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const boardAName = generateUniqueName('BA-App-BoardA');
    const boardBName = generateUniqueName('BA-App-BoardB');
    const boardA = await createBoardViaApi(request, boardAName, generateUniqueName('BA-App-StageA'));
    const boardB = await createBoardViaApi(request, boardBName, generateUniqueName('BA-App-StageB'));
    const assignedAName = generateUniqueName('BA-App-AssignedA');
    const assignedBName = generateUniqueName('BA-App-AssignedB');
    const freeAName = generateUniqueName('BA-App-FreeA');
    const freeBName = generateUniqueName('BA-App-FreeB');
    const assignedA = await createTaskViaApi(request, boardA.boardId, boardA.stageId!, assignedAName);
    const assignedB = await createTaskViaApi(request, boardB.boardId, boardB.stageId!, assignedBName);
    await createTaskViaApi(request, boardA.boardId, boardA.stageId!, freeAName, { freeForAll: true });
    await createTaskViaApi(request, boardB.boardId, boardB.stageId!, freeBName, { freeForAll: true });

    const userLogin = uniqueLogin('wpapp');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_access_user_page_app']);
    // Assigned while on both boards, then removed from board B.
    await addWPUserToBoards(request, userId, [boardAName, boardBName]);
    await assignWPUserToTaskViaApi(request, userId, assignedA.id);
    await assignWPUserToTaskViaApi(request, userId, assignedB.id);
    await addWPUserToBoards(request, userId, [boardAName]);
    const context = await loginToWordPressViaApi(browser, userLogin);

    try {
      const userPage = await context.newPage();

      await navigateToAssignedTasks(userPage);
      await expect(getTasksAppTaskCard(userPage, assignedAName)).toBeVisible();
      await expect(getTasksAppTaskCard(userPage, assignedBName)).toHaveCount(0);

      await navigateToAssignableTasks(userPage);
      await expect(getTasksAppTaskCard(userPage, freeAName)).toBeVisible();
      await expect(getTasksAppTaskCard(userPage, freeBName)).toHaveCount(0);

      // Opening the board B task directly is refused too.
      const openTask = (taskHash: string) =>
        userPage.evaluate(async (hash) => {
          const { wp, wpqt_user } = window as unknown as {
            wp: { apiFetch: (options: object) => Promise<{ success: boolean }> };
            wpqt_user: { userApiNonce: string };
          };
          try {
            return await wp.apiFetch({
              path: `/wpqt/v1/user-page/tasks/${hash}`,
              headers: { 'X-WPQT-USER-API-Nonce': wpqt_user.userApiNonce },
            });
          } catch (error) {
            return error as { success: boolean };
          }
        }, taskHash);
      expect((await openTask(assignedA.taskHash)).success).toBe(true);
      expect((await openTask(assignedB.taskHash)).success).toBe(false);
    } finally {
      await context.close();
      await deleteBoardViaApi(request, boardAName);
      await deleteBoardViaApi(request, boardBName);
    }
  });

  test('the board dropdown only lists the boards a user has been added to or created', async ({ browser, request }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const addedBoardName = generateUniqueName('BA-Added');
    const otherBoardName = generateUniqueName('BA-Other');
    const createdBoardName = generateUniqueName('BA-Created');
    await createBoardViaApi(request, addedBoardName);
    await createBoardViaApi(request, otherBoardName);
    const userLogin = uniqueLogin('wpdropdown');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    await addWPUserToBoards(request, userId, [addedBoardName]);
    const context = await loginToWordPressViaApi(browser, userLogin);

    try {
      const userPage = await context.newPage();
      const boardItems = userPage.getByTestId('pipeline-selection-item');
      await navigateToBoardsPage(userPage);
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveText(addedBoardName);

      await createBoard(userPage, createdBoardName);
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveText(createdBoardName);

      // The created board is still listed after a reload, so the user was added to it.
      await navigateToBoardsPage(userPage);
      await userPage.getByTestId('pipeline-selection-dropdown').click();
      await expect(boardItems.filter({ hasText: addedBoardName })).toBeVisible();
      await expect(boardItems.filter({ hasText: createdBoardName })).toBeVisible();
      await expect(boardItems.filter({ hasText: otherBoardName })).toHaveCount(0);
    } finally {
      await context.close();
      await deleteBoardViaApi(request, addedBoardName);
      await deleteBoardViaApi(request, otherBoardName);
      await deleteBoardViaApi(request, createdBoardName);
    }
  });

  test('a user can assign themselves to tasks on a board they created', async ({ browser, request }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const startBoardName = generateUniqueName('BA-Own-Start');
    const ownBoardName = generateUniqueName('BA-Own');
    const stageName = generateUniqueName('BA-Own-Stage');
    const taskName = generateUniqueName('BA-Own-Task');
    await createBoardViaApi(request, startBoardName);
    const userLogin = uniqueLogin('wpcreator');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    await addWPUserToBoards(request, userId, [startBoardName]);
    const context = await loginToWordPressViaApi(browser, userLogin);

    try {
      const userPage = await context.newPage();
      await navigateToBoardsPage(userPage);
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveText(startBoardName);
      await createBoard(userPage, ownBoardName);
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveText(ownBoardName);
      await createStage(userPage, stageName);
      await createTask(userPage, stageName, taskName);

      // Without reloading, the creator is known to be on the new board.
      await openUserAssignmentDropdown(userPage, taskName);
      const assignmentList = userPage.getByTestId('user-assignment-list');
      await expect(assignmentList.getByTestId('user-assignment-row').filter({ hasText: userLogin })).toBeVisible();
      await expect(
        assignmentList.getByTestId('user-assignment-row-no-board-access').filter({ hasText: userLogin }),
      ).toHaveCount(0);
    } finally {
      await context.close();
      await deleteBoardViaApi(request, startBoardName);
      await deleteBoardViaApi(request, ownBoardName);
    }
  });

  test("a QuickTasker's assigned task count only includes the viewer's boards", async ({ page, browser, request }) => {
    const addedBoardName = generateUniqueName('BA-Count-Added');
    const otherBoardName = generateUniqueName('BA-Count-Other');
    const addedBoard = await createBoardViaApi(request, addedBoardName, generateUniqueName('BA-Count-StageA'));
    const otherBoard = await createBoardViaApi(request, otherBoardName, generateUniqueName('BA-Count-StageB'));
    const addedTask = await createTaskViaApi(request, addedBoard.boardId, addedBoard.stageId!, generateUniqueName('BA-Count-TaskA'));
    const otherTask = await createTaskViaApi(request, otherBoard.boardId, otherBoard.stageId!, generateUniqueName('BA-Count-TaskB'));
    const quickTaskerId = await createQuickTaskerUserViaApi(request, generateUniqueName('BA-Count-QT'));
    await assignQuickTaskerToTaskViaApi(request, quickTaskerId, addedTask.id);
    await assignQuickTaskerToTaskViaApi(request, quickTaskerId, otherTask.id);
    const userLogin = uniqueLogin('wpcount');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    await addWPUserToBoards(request, userId, [addedBoardName]);
    const context = await loginToWordPressViaApi(browser, userLogin);
    const countOf = (viewerPage: Page) => viewerPage.getByText('Assigned tasks count:').locator('xpath=..');
    const userDetailsUrl = `/wp-admin/admin.php?page=wp-quicktasker#/user-management/${quickTaskerId}`;

    try {
      const userPage = await context.newPage();
      await userPage.goto(userDetailsUrl);
      await expect(countOf(userPage)).toHaveText(/Assigned tasks count:\s*1$/, { timeout: TIMEOUTS.NAVIGATION });

      // Administrators can access every board, so they see both tasks.
      await page.goto(userDetailsUrl);
      await expect(countOf(page)).toHaveText(/Assigned tasks count:\s*2$/, { timeout: TIMEOUTS.NAVIGATION });
    } finally {
      await context.close();
      await deleteBoardViaApi(request, addedBoardName);
      await deleteBoardViaApi(request, otherBoardName);
    }
  });

  test('a WordPress user can only export the boards they have been added to', async ({ browser, request }) => {
    const addedBoardName = generateUniqueName('BA-Export-Added');
    const otherBoardName = generateUniqueName('BA-Export-Other');
    const addedBoard = await createBoardViaApi(request, addedBoardName, generateUniqueName('BA-Export-StageA'));
    const otherBoard = await createBoardViaApi(request, otherBoardName, generateUniqueName('BA-Export-StageB'));
    const addedTaskName = generateUniqueName('BA-Export-TaskA');
    const otherTaskName = generateUniqueName('BA-Export-TaskB');
    await createTaskViaApi(request, addedBoard.boardId, addedBoard.stageId!, addedTaskName);
    await createTaskViaApi(request, otherBoard.boardId, otherBoard.stageId!, otherTaskName);
    const userLogin = uniqueLogin('wpexport');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    await addWPUserToBoards(request, userId, [addedBoardName]);
    const context = await loginToWordPressViaApi(browser, userLogin);

    try {
      const exportTasks = (query: string) => context.request.get(`/?wpqt-page=json-export${query}`);

      const ownBoard = await exportTasks(`&pipeline_id=${addedBoard.boardId}`);
      expect(ownBoard.status()).toBe(200);
      expect(await ownBoard.text()).toContain(addedTaskName);

      // Changing the board in the address does not get around board access.
      const otherBoardExport = await exportTasks(`&pipeline_id=${otherBoard.boardId}`);
      expect(otherBoardExport.status()).toBe(403);
      expect(await otherBoardExport.text()).not.toContain(otherTaskName);

      // Without a board every board would be exported.
      const everyBoard = await exportTasks('');
      expect(everyBoard.status()).toBe(403);
      expect(await everyBoard.text()).not.toContain(otherTaskName);
      expect((await context.request.get('/?wpqt-page=pdf-export')).status()).toBe(403);

      // Administrators can still export any board.
      const adminExport = await request.get(`/?wpqt-page=json-export&pipeline_id=${otherBoard.boardId}`);
      expect(adminExport.status()).toBe(200);
      expect(await adminExport.text()).toContain(otherTaskName);
    } finally {
      await context.close();
      await deleteBoardViaApi(request, addedBoardName);
      await deleteBoardViaApi(request, otherBoardName);
    }
  });

  test('a link to a board the user has not been added to says so', async ({ browser, request }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const addedBoardName = generateUniqueName('BA-Link-Added');
    const otherBoardName = generateUniqueName('BA-Link-Other');
    await createBoardViaApi(request, addedBoardName);
    const otherBoard = await createBoardViaApi(request, otherBoardName);
    const userLogin = uniqueLogin('wplink');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    await addWPUserToBoards(request, userId, [addedBoardName]);
    const context = await loginToWordPressViaApi(browser, userLogin);
    const noAccessText = 'You have not been added to this board. Ask a WordPress administrator to add you to it.';

    try {
      const userPage = await context.newPage();
      await userPage.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${otherBoard.boardId}`);
      await expect(userPage.getByText(noAccessText)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
      await expect(userPage.getByText('Unable to load the board', { exact: false })).toHaveCount(0);
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveCount(0);

      await userPage.getByTestId('open-primary-board').click();
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveText(addedBoardName);

      // The board's other pages say the same, in place of an error.
      for (const subPage of ['overview', 'automations', 'webhooks', 'api-tokens']) {
        const subPageTab = await context.newPage();
        await subPageTab.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${otherBoard.boardId}/${subPage}`);
        await expect(subPageTab.getByText(noAccessText), subPage).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
        await expect(subPageTab.locator('.Toastify__toast'), subPage).toHaveCount(0);

        await subPageTab.getByTestId('open-primary-board').click();
        await expect(subPageTab.getByTestId('active-pipeline-name'), subPage).toHaveText(addedBoardName);
        await subPageTab.close();
      }
    } finally {
      await context.close();
      await deleteBoardViaApi(request, addedBoardName);
      await deleteBoardViaApi(request, otherBoardName);
    }
  });

  test('a user removed from the board they are viewing is told so', async ({ browser, request }) => {
    const viewedBoardName = generateUniqueName('BA-Viewed');
    const otherBoardName = generateUniqueName('BA-Viewed-Other');
    const viewedBoard = await createBoardViaApi(request, viewedBoardName);
    await createBoardViaApi(request, otherBoardName);
    const userLogin = uniqueLogin('wpviewing');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    await addWPUserToBoards(request, userId, [viewedBoardName, otherBoardName]);
    const context = await loginToWordPressViaApi(browser, userLogin);

    try {
      const userPage = await context.newPage();
      await userPage.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${viewedBoard.boardId}`);
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveText(viewedBoardName, {
        timeout: TIMEOUTS.NAVIGATION,
      });

      // An administrator removes the user while the board is open. The board
      // refreshes itself every 30 seconds; the refresh button does the same now.
      await addWPUserToBoards(request, userId, [otherBoardName]);
      await userPage.getByTestId('refresh-icon').click();

      await expect(
        userPage.getByText('You have not been added to this board. Ask a WordPress administrator to add you to it.'),
      ).toBeVisible();
      await expect(userPage.getByText('Unable to load the board', { exact: false })).toHaveCount(0);

      await userPage.getByTestId('open-primary-board').click();
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveText(otherBoardName);
    } finally {
      await context.close();
      await deleteBoardViaApi(request, viewedBoardName);
      await deleteBoardViaApi(request, otherBoardName);
    }
  });

  test('a board page the user lacks the permission for is not mistaken for missing board access', async ({ browser, request }) => {
    const boardName = generateUniqueName('BA-NoPerm');
    const board = await createBoardViaApi(request, boardName);
    const userLogin = uniqueLogin('wpnoperm');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    // On the board, but without the permission to manage automations.
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    await addWPUserToBoards(request, userId, [boardName]);
    const context = await loginToWordPressViaApi(browser, userLogin);

    try {
      const userPage = await context.newPage();
      await userPage.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${board.boardId}/automations`);
      await expect(userPage.getByText('Failed to load board automations').first()).toBeVisible({
        timeout: TIMEOUTS.NAVIGATION,
      });
      await expect(userPage.getByText('You have not been added to this board', { exact: false })).toHaveCount(0);
    } finally {
      await context.close();
      await deleteBoardViaApi(request, boardName);
    }
  });

  test('automations can only assign WordPress users added to the board', async ({ page, request }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const boardName = generateUniqueName('BA-Auto-Board');
    const board = await createBoardViaApi(request, boardName, generateUniqueName('BA-Auto-Stage'));
    const memberLogin = uniqueLogin('wpautomember');
    const outsiderLogin = uniqueLogin('wpautooutsider');
    const memberId = await createWPUser(request, memberLogin, `${memberLogin}@example.com`, 'editor');
    const outsiderId = await createWPUser(request, outsiderLogin, `${outsiderLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, memberId, ['quicktasker_admin_role']);
    await grantWPUserCaps(request, outsiderId, ['quicktasker_admin_role']);
    await addWPUserToBoards(request, memberId, [boardName]);

    try {
      await page.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${board.boardId}/automations`);
      await expect(page.getByRole('heading', { name: 'Create a new automation' })).toBeVisible({
        timeout: TIMEOUTS.NAVIGATION,
      });
      const wizard = page.getByTestId('automation-creation-steps');
      await wizard.getByText('Task', { exact: true }).click();
      await wizard.getByText('Task created', { exact: true }).click();
      await wizard.getByText('Assign user', { exact: true }).click();
      await page.getByTestId('automation-action-target-btn').click();

      const menu = page.getByRole('menu');
      const outsiderRow = menu.getByTestId('automation-target-row-no-board-access').filter({ hasText: outsiderLogin });
      await expect(outsiderRow).toContainText('Not added to this board');
      await expect(outsiderRow).toHaveAttribute('aria-disabled', 'true');
      await outsiderRow.click();
      await expect(menu).toBeVisible();

      await menu.getByTestId('automation-target-row').filter({ hasText: memberLogin }).click();
      await page.getByText('Create automation').click();
      await expect(page.getByText('Step 1. Select a target', { exact: true })).toBeVisible();

      // Removing the user from the board marks the automation.
      const automation = page.getByTestId('pipeline-automation').filter({ hasText: memberLogin });
      await expect(automation.getByTestId('automation-target-no-board-access')).toHaveCount(0);
      await addWPUserToBoards(request, memberId, []);
      await page.reload();
      await expect(automation.getByTestId('automation-target-no-board-access')).toBeVisible({
        timeout: TIMEOUTS.NAVIGATION,
      });
    } finally {
      await deleteBoardViaApi(request, boardName);
    }
  });
});

test.describe('Board access notice after updating', () => {
  test('administrators see the notice until one of them dismisses it', async ({ page, browser, request }) => {
    const userLogin = uniqueLogin('wpnotice');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    // Set by the update from a version without board access.
    runWpCli('option update quicktasker_show_board_access_notice 1');
    const context = await loginToWordPressViaApi(browser, userLogin);

    try {
      const notice = page.getByTestId('wpqt-board-access-notice');
      await page.goto('/wp-admin/');
      await expect(notice).toBeVisible();
      await expect(notice.getByRole('link', { name: 'Add users to boards' })).toHaveAttribute(
        'href',
        /page=wp-quicktasker#\/user-management$/,
      );

      const userPage = await context.newPage();
      await userPage.goto('/wp-admin/');
      await expect(userPage.locator('#wpbody')).toBeVisible();
      await expect(userPage.getByTestId('wpqt-board-access-notice')).toHaveCount(0);

      await notice.getByRole('link', { name: 'Dismiss' }).click();
      await expect(notice).toHaveCount(0);
      await expect(page).not.toHaveURL(/wpqt_dismiss_board_access_notice/);
      await page.reload();
      await expect(page.locator('#wpbody')).toBeVisible();
      await expect(notice).toHaveCount(0);
    } finally {
      await context.close();
      runWpCli('option delete quicktasker_show_board_access_notice');
    }
  });
});
