import { test, expect } from '@playwright/test';
import { navigateToBoardsPage, navigateToUserManagement } from './utils/navigation';
import { createBoardViaApi, deleteBoardViaApi, generateUniqueName } from './utils/board-helpers';
import { loginToWordPressViaApi } from './utils/auth';
import {
  createWPUser,
  grantWPUserCaps,
  navigateToWPUsersTab,
  uniqueLogin,
} from './utils/user-helpers';
import { TIMEOUTS } from './utils/timeouts';

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
});
