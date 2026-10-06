import { test, expect, type APIRequestContext, type Browser } from '@playwright/test';
import { navigateToBoardsPage, navigateToUserManagement } from './utils/navigation';
import {
  createBoardViaApi,
  createTaskViaApi,
  deleteBoardViaApi,
  generateUniqueName,
} from './utils/board-helpers';
import { getAdminNonce, loginToWordPressViaApi } from './utils/auth';
import {
  addWPUserToBoards,
  assignWPUserToTaskViaApi,
  createWPUser,
  grantWPUserCaps,
  navigateToWPUsersTab,
  uniqueLogin,
} from './utils/user-helpers';
import { TIMEOUTS } from './utils/timeouts';
import { runWpCli } from './utils/wp-cli';

/**
 * Logs in as the user and creates an API token and a webhook on the board.
 */
async function createIntegrationsAsUser(browser: Browser, userLogin: string, boardId: string): Promise<void> {
  const userContext = await loginToWordPressViaApi(browser, userLogin);
  try {
    const nonceResponse = await userContext.request.get('/wp-admin/admin-ajax.php?action=rest-nonce');
    const headers = { 'X-WP-Nonce': await nonceResponse.text() };
    const tokenResponse = await userContext.request.post(`/wp-json/wpqt/v1/pipelines/${boardId}/api-tokens`, {
      headers,
      data: {
        name: 'Integration token',
        get_pipeline: true,
        patch_pipeline: false,
        get_pipeline_stages: false,
        post_pipeline_stages: false,
        patch_pipeline_stages: false,
        delete_pipeline_stages: false,
        get_pipeline_tasks: false,
        post_pipeline_tasks: false,
        patch_pipeline_tasks: false,
        delete_pipeline_tasks: false,
      },
    });
    expect(tokenResponse.ok()).toBe(true);
    const webhookResponse = await userContext.request.post(`/wp-json/wpqt/v1/pipelines/${boardId}/webhooks`, {
      headers,
      data: {
        target_type: 'task',
        target_action: 'deleted',
        webhook_url: 'https://example.com/integration',
        webhook_confirm: false,
      },
    });
    expect(webhookResponse.ok()).toBe(true);
  } finally {
    await userContext.close();
  }
}

/**
 * Counts the board's API tokens and webhooks, as the admin.
 */
async function countIntegrations(request: APIRequestContext, boardId: string): Promise<{ tokens: number; webhooks: number }> {
  const headers = { 'X-WP-Nonce': await getAdminNonce(request) };
  const tokens = await (await request.get(`/wp-json/wpqt/v1/pipelines/${boardId}/api-tokens`, { headers })).json();
  const webhooks = await (await request.get(`/wp-json/wpqt/v1/pipelines/${boardId}/webhooks`, { headers })).json();

  return { tokens: tokens.data.length, webhooks: webhooks.data.webhooks.length };
}

// ── Test suites ───────────────────────────────────────────────────────────────

test.describe('WordPress Users Tab – Page Structure', () => {
  test('shows WordPress users tab and QuickTaskers tab', async ({ page }) => {
    await navigateToUserManagement(page);
    await expect(page.getByRole('tab', { name: 'WordPress users' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'QuickTaskers' })).toBeVisible();
  });

});

test.describe('WordPress Users Tab – User Card', () => {
  test('shows description text when users exist', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpuser');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    await expect(
      page.getByText('WordPress users without administrator privileges.'),
    ).toBeVisible();
  });

  test('shows user card with username and role', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpuser');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(card.getByText('Role')).toBeVisible();
    await expect(card.getByText('editor')).toBeVisible();
  });

  test('capability toggles are off by default for new user', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpuser');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    const toggles = card.getByRole('switch');
    await expect(toggles).toHaveCount(7);
    for (let i = 0; i < 7; i++) {
      await expect(toggles.nth(i)).toHaveAttribute('aria-checked', 'false');
    }
  });
});


test.describe('WordPress Users Tab – Boards', () => {
  test('admin adds a user to a board and the user opens it', async ({ page, browser, request }) => {
    const boardName = generateUniqueName('WUB-Board');
    await createBoardViaApi(request, boardName);
    const userLogin = uniqueLogin('wpboards');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);

    await navigateToWPUsersTab(page);
    const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    const boardsSummary = card.getByTestId('wp-user-boards-summary');
    await expect(boardsSummary).toHaveText('No boards', { timeout: TIMEOUTS.NAVIGATION });

    await card.getByTestId('wp-user-boards-change').click();
    await page.getByRole('option', { name: boardName }).click();
    await page.keyboard.press('Escape');
    await expect(boardsSummary).toHaveText(boardName);
    await expect(card.getByTestId('wp-user-boards-change')).toBeFocused();
    await expect(page.getByText(`${userLogin} was added to ${boardName}.`)).toBeVisible();

    // The selection is saved in the background, so reload until it is shown.
    await expect(async () => {
      await navigateToWPUsersTab(page);
      await expect(boardsSummary).toHaveText(boardName, { timeout: 1000 });
    }).toPass({ timeout: TIMEOUTS.NAVIGATION });

    const userContext = await loginToWordPressViaApi(browser, userLogin);
    try {
      const userPage = await userContext.newPage();
      await navigateToBoardsPage(userPage);
      await expect(userPage.getByTestId('active-pipeline-name')).toHaveText(boardName);
    } finally {
      await userContext.close();
      await deleteBoardViaApi(request, boardName);
    }
  });

  test('boards ticked one after another are all saved', async ({ page, request }) => {
    const boardAName = generateUniqueName('WUB-Board-A');
    const boardBName = generateUniqueName('WUB-Board-B');
    await createBoardViaApi(request, boardAName);
    await createBoardViaApi(request, boardBName);
    const userLogin = uniqueLogin('wpboards');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');

    try {
      await navigateToWPUsersTab(page);
      const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
      const boardsSummary = card.getByTestId('wp-user-boards-summary');
      await expect(boardsSummary).toHaveText('No boards', { timeout: TIMEOUTS.NAVIGATION });

      await card.getByTestId('wp-user-boards-change').click();
      await page.getByRole('option', { name: boardAName }).click();
      await page.getByRole('option', { name: boardBName }).click();
      await page.keyboard.press('Escape');
      await expect(card.getByTestId('wp-user-boards-saving')).toHaveCount(0);

      await navigateToWPUsersTab(page);
      await expect(boardsSummary).toContainText(boardAName, { timeout: TIMEOUTS.NAVIGATION });
      await expect(boardsSummary).toContainText(boardBName);
    } finally {
      await deleteBoardViaApi(request, boardAName);
      await deleteBoardViaApi(request, boardBName);
    }
  });

  test('removing a user from a board warns about their tasks there', async ({ page, request }) => {
    const boardName = generateUniqueName('WUB-Tasks-Board');
    const board = await createBoardViaApi(request, boardName, generateUniqueName('WUB-Tasks-Stage'));
    const task = await createTaskViaApi(request, board.boardId, board.stageId!, generateUniqueName('WUB-Task'));
    const userLogin = uniqueLogin('wpboards');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await addWPUserToBoards(request, userId, [boardName]);
    await assignWPUserToTaskViaApi(request, userId, task.id);

    try {
      await navigateToWPUsersTab(page);
      const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
      await expect(card.getByTestId('wp-user-boards-summary')).toHaveText(boardName, {
        timeout: TIMEOUTS.NAVIGATION,
      });

      await card.getByTestId('wp-user-boards-change').click();
      await page.getByRole('option', { name: boardName }).click();
      await page.keyboard.press('Escape');

      await expect(
        page.getByText(
          `${userLogin} is still assigned to 1 task on ${boardName}, but can't see it until added back to the board.`,
        ),
      ).toBeVisible();
      await expect(card.getByTestId('wp-user-boards-summary')).toHaveText('No boards');
      await expect(page.getByText(`${userLogin} was removed from ${boardName}.`)).toBeVisible();
    } finally {
      await deleteBoardViaApi(request, boardName);
    }
  });

  test("a board another administrator added the user to is kept when changing the user's boards", async ({ page, request }) => {
    const knownBoardName = generateUniqueName('WUB-Known');
    await createBoardViaApi(request, knownBoardName);
    const userLogin = uniqueLogin('wpboards');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');

    // The app is loaded before another administrator creates a board and adds the user to it.
    await navigateToBoardsPage(page);
    const newBoardName = generateUniqueName('WUB-New');
    await createBoardViaApi(request, newBoardName);
    await addWPUserToBoards(request, userId, [newBoardName]);

    try {
      await page.evaluate(() => {
        window.location.hash = '#/user-management';
      });
      const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
      const boardsSummary = card.getByTestId('wp-user-boards-summary');
      await expect(boardsSummary).toHaveText(newBoardName, { timeout: TIMEOUTS.NAVIGATION });

      await card.getByTestId('wp-user-boards-change').click();
      await page.getByRole('option', { name: knownBoardName }).click();
      await page.keyboard.press('Escape');
      await expect(card.getByTestId('wp-user-boards-saving')).toHaveCount(0);

      await navigateToWPUsersTab(page);
      await expect(boardsSummary).toContainText(newBoardName, { timeout: TIMEOUTS.NAVIGATION });
      await expect(boardsSummary).toContainText(knownBoardName);
    } finally {
      await deleteBoardViaApi(request, knownBoardName);
      await deleteBoardViaApi(request, newBoardName);
    }
  });

  test("refreshing User management shows boards changed by another administrator", async ({ page, request }) => {
    const firstBoardName = generateUniqueName('WUB-First');
    const secondBoardName = generateUniqueName('WUB-Second');
    await createBoardViaApi(request, firstBoardName);
    await createBoardViaApi(request, secondBoardName);
    const userLogin = uniqueLogin('wpboards');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await addWPUserToBoards(request, userId, [firstBoardName]);

    try {
      await navigateToWPUsersTab(page);
      const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
      const boardsSummary = card.getByTestId('wp-user-boards-summary');
      await expect(boardsSummary).toHaveText(firstBoardName, { timeout: TIMEOUTS.NAVIGATION });

      await addWPUserToBoards(request, userId, [firstBoardName, secondBoardName]);
      await page.getByTestId('refresh-icon').click();

      await expect(boardsSummary).toContainText(secondBoardName);
      await expect(boardsSummary).toContainText(firstBoardName);
    } finally {
      await deleteBoardViaApi(request, firstBoardName);
      await deleteBoardViaApi(request, secondBoardName);
    }
  });

  test('removing a user from a board stops the API tokens and webhooks they created there until they are added back', async ({ page, browser, request }) => {
    const boardName = generateUniqueName('WUB-Integrations');
    const board = await createBoardViaApi(request, boardName);
    const userLogin = uniqueLogin('wpintegrations');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    await addWPUserToBoards(request, userId, [boardName]);
    await createIntegrationsAsUser(browser, userLogin, board.boardId);

    try {
      await navigateToWPUsersTab(page);
      const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
      const boardsSummary = card.getByTestId('wp-user-boards-summary');
      await expect(boardsSummary).toHaveText(boardName, { timeout: TIMEOUTS.NAVIGATION });

      await card.getByTestId('wp-user-boards-change').click();
      await page.getByRole('option', { name: boardName }).click();
      await page.keyboard.press('Escape');

      const warning = page.getByTestId('stopped-integrations-warning');
      await expect(warning).toContainText(
        `${userLogin} created 1 API token and 1 webhook on ${boardName}, which stopped working. They work again if ${userLogin} is added back to the board.`,
      );
      await expect(boardsSummary).toHaveText('No boards');
      expect(await countIntegrations(request, board.boardId)).toEqual({ tokens: 1, webhooks: 1 });

      await warning.getByRole('link', { name: 'Open API tokens' }).click();
      await expect(page.getByTestId('api-token-not-working')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
      await page.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${board.boardId}/webhooks`);
      await expect(page.getByTestId('webhook-not-sending')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

      // Adding the user back makes them work again.
      await addWPUserToBoards(request, userId, [boardName]);
      await page.reload();
      await expect(page.getByTestId('webhook-created-by')).toHaveText(userLogin, { timeout: TIMEOUTS.NAVIGATION });
      await expect(page.getByTestId('webhook-not-sending')).toHaveCount(0);
      await page.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${board.boardId}/api-tokens`);
      await expect(page.getByTestId('api-token-created-by')).toHaveText(userLogin, { timeout: TIMEOUTS.NAVIGATION });
      await expect(page.getByTestId('api-token-not-working')).toHaveCount(0);
    } finally {
      await deleteBoardViaApi(request, boardName);
    }
  });

  test("an automation shows when its creator has been removed from the board", async ({ page, browser, request }) => {
    const boardName = generateUniqueName('WUB-Automation-Creator');
    const board = await createBoardViaApi(request, boardName);
    const userLogin = uniqueLogin('wpautomation');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    await addWPUserToBoards(request, userId, [boardName]);

    const userContext = await loginToWordPressViaApi(browser, userLogin);
    try {
      const nonceResponse = await userContext.request.get('/wp-admin/admin-ajax.php?action=rest-nonce');
      const response = await userContext.request.post(`/wp-json/wpqt/v1/pipelines/${board.boardId}/automations`, {
        headers: { 'X-WP-Nonce': await nonceResponse.text() },
        data: { automationTarget: 'task', automationTrigger: 'task-done', automationAction: 'archive-task' },
      });
      expect(response.ok()).toBe(true);
    } finally {
      await userContext.close();
    }

    try {
      await page.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${board.boardId}/automations`);
      await expect(page.getByTestId('automation-created-by')).toHaveText(userLogin, { timeout: TIMEOUTS.NAVIGATION });
      await expect(page.getByTestId('automation-creator-no-board-access')).toHaveCount(0);

      await addWPUserToBoards(request, userId, []);
      await page.reload();

      await expect(page.getByTestId('automation-created-by')).toHaveText(userLogin, { timeout: TIMEOUTS.NAVIGATION });
      await expect(page.getByTestId('automation-creator-no-board-access')).toHaveText('No access to this board');
    } finally {
      await deleteBoardViaApi(request, boardName);
    }
  });

  test('a user who can manage options keeps their API tokens and webhooks when removed from a board', async ({ page, browser, request }) => {
    // A custom role with manage_options can access every board, but is listed with the users who are not administrators.
    try {
      runWpCli('role create qt_e2e_site_manager "Site Manager" --clone=editor');
    } catch {
      // The role was created by an earlier run.
    }
    runWpCli('cap add qt_e2e_site_manager manage_options');

    const boardName = generateUniqueName('WUB-Site-Manager');
    const board = await createBoardViaApi(request, boardName);
    const userLogin = uniqueLogin('wpsitemanager');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'qt_e2e_site_manager');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    await addWPUserToBoards(request, userId, [boardName]);
    await createIntegrationsAsUser(browser, userLogin, board.boardId);

    try {
      await navigateToWPUsersTab(page);
      const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
      const boardsSummary = card.getByTestId('wp-user-boards-summary');
      await expect(boardsSummary).toHaveText(boardName, { timeout: TIMEOUTS.NAVIGATION });

      await card.getByTestId('wp-user-boards-change').click();
      await page.getByRole('option', { name: boardName }).click();
      await page.keyboard.press('Escape');

      await expect(page.getByText(`${userLogin} was removed from ${boardName}.`)).toBeVisible();
      await expect(boardsSummary).toHaveText('No boards');
      await expect(page.getByTestId('stopped-integrations-warning')).toHaveCount(0);
      expect(await countIntegrations(request, board.boardId)).toEqual({ tokens: 1, webhooks: 1 });
    } finally {
      await deleteBoardViaApi(request, boardName);
    }
  });

  test('API tokens and webhooks show when their creator has lost QuickTasker access', async ({ page, browser, request }) => {
    const boardName = generateUniqueName('WUB-Revoked-Creator');
    const board = await createBoardViaApi(request, boardName);
    const userLogin = uniqueLogin('wprevoked');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    await addWPUserToBoards(request, userId, [boardName]);
    await createIntegrationsAsUser(browser, userLogin, board.boardId);

    try {
      await page.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${board.boardId}/api-tokens`);
      await expect(page.getByTestId('api-token-created-by')).toHaveText(userLogin, { timeout: TIMEOUTS.NAVIGATION });
      await expect(page.getByTestId('api-token-not-working')).toHaveCount(0);

      // The user stays on the board but can no longer use QuickTasker.
      await grantWPUserCaps(request, userId, []);

      await page.reload();
      await expect(page.getByTestId('api-token-not-working')).toHaveText(
        "This token doesn't work: its creator has no access to this board.",
        { timeout: TIMEOUTS.NAVIGATION },
      );
      await expect(page.getByTestId('api-token-creator-no-board-access')).toHaveText('No access to this board');

      await page.goto(`/wp-admin/admin.php?page=wp-quicktasker#/board/${board.boardId}/webhooks`);
      await expect(page.getByTestId('webhook-not-sending')).toHaveText(
        'Not sending: its creator has no access to this board',
        { timeout: TIMEOUTS.NAVIGATION },
      );
      await expect(page.getByTestId('webhook-creator-no-board-access')).toHaveText('No access to this board');
    } finally {
      await deleteBoardViaApi(request, boardName);
    }
  });

  test('deleting a WordPress user deletes the API tokens and webhooks they created', async ({ browser, request }) => {
    const boardName = generateUniqueName('WUB-Deleted-User');
    const board = await createBoardViaApi(request, boardName);
    const userLogin = uniqueLogin('wpdeleteduser');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    await addWPUserToBoards(request, userId, [boardName]);
    await createIntegrationsAsUser(browser, userLogin, board.boardId);

    try {
      expect(await countIntegrations(request, board.boardId)).toEqual({ tokens: 1, webhooks: 1 });

      const response = await request.delete(`/wp-json/wp/v2/users/${userId}?force=true&reassign=1`, {
        headers: { 'X-WP-Nonce': await getAdminNonce(request) },
      });
      expect(response.ok()).toBe(true);

      expect(await countIntegrations(request, board.boardId)).toEqual({ tokens: 0, webhooks: 0 });
    } finally {
      await deleteBoardViaApi(request, boardName);
    }
  });

  test("a board deleted elsewhere does not stop changing a user's boards", async ({ page, request }) => {
    const deletedBoardName = generateUniqueName('WUB-Deleted');
    const keptBoardName = generateUniqueName('WUB-Kept');
    await createBoardViaApi(request, deletedBoardName);
    await createBoardViaApi(request, keptBoardName);
    const userLogin = uniqueLogin('wpboards');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await addWPUserToBoards(request, userId, [deletedBoardName]);

    try {
      await navigateToWPUsersTab(page);
      const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
      const boardsSummary = card.getByTestId('wp-user-boards-summary');
      await expect(boardsSummary).toHaveText(deletedBoardName, { timeout: TIMEOUTS.NAVIGATION });

      // Another administrator deletes the board after this page loaded.
      await deleteBoardViaApi(request, deletedBoardName);
      await card.getByTestId('wp-user-boards-change').click();
      await page.getByRole('option', { name: keptBoardName }).click();
      await page.keyboard.press('Escape');
      await expect(boardsSummary).toHaveText(keptBoardName);
      await expect(page.getByText("Failed to update the user's boards")).toHaveCount(0);

      await navigateToWPUsersTab(page);
      await expect(boardsSummary).toHaveText(keptBoardName, { timeout: TIMEOUTS.NAVIGATION });
    } finally {
      await deleteBoardViaApi(request, keptBoardName);
    }
  });
});
