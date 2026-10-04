import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import {
  createQuickTaskerUser,
  createWPUser,
  getQuickTaskerCard,
  grantWPUserCaps,
  navigateToQuickTaskersTab,
  navigateToUserDetailPage,
  uniqueLogin,
} from './utils/user-helpers';
import {
  completeQuickTaskerSetup,
  getQuickTaskerUserPageUrl,
  openAnonymousPage,
} from './utils/tasks-app-helpers';
import { generateUniqueName } from './utils/board-helpers';
import { navigateToUserManagement } from './utils/navigation';
import { loginToWordPress } from './utils/auth';
import { TIMEOUTS } from './utils/timeouts';

/**
 * Tests verifying that WordPress user capabilities control access to QuickTasker plugin features.
 *
 * Each test creates a fresh WP user via the WP REST API, grants specific capabilities, then opens a
 * separate browser context to log in as that user and check what's accessible.
 */

async function loginAsWPUser(
  browser: Browser,
  login: string,
): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext();
  const page = await context.newPage();
  await loginToWordPress(page, login, 'password123');
  return { context, page };
}

// ── Test suites ───────────────────────────────────────────────────────────────

test.describe('WP User Capabilities – No Capabilities', () => {
  test('QuickTasker admin menu is not visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpnone');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/');
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'QuickTasker', exact: true }),
    ).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await context.close();
  });

  test('accessing boards page directly shows insufficient permissions error', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpnone');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });
});

test.describe('WP User Capabilities – Plugin Admin Role', () => {
  test('QuickTasker admin menu is visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/');
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'QuickTasker', exact: true }),
    ).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await context.close();
  });

  test('can access the boards page', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });

  test('User management submenu is not visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    // Navigate to boards page so the QuickTasker menu is expanded in the sidebar
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'User management' }),
    ).not.toBeVisible();
    await context.close();
  });

  test('Archive submenu is not visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'Archive' }),
    ).not.toBeVisible();
    await context.close();
  });

  test('Tasks app submenu is not visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'Tasks app' }),
    ).not.toBeVisible();
    await context.close();
  });

  test('Add new board button is not visible in pipeline dropdown', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByTestId('add-new-board-button')).not.toBeVisible();
    await context.close();
  });

  test('Board settings options are not visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Automations', { exact: true })).not.toBeVisible();
    await context.close();
  });

  test('Add stage button is not visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText(/^Add (first )?stage$/)).not.toBeVisible();
    await context.close();
  });
});

test.describe('WP User Capabilities – Manage Users', () => {
  test('User management submenu is visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpusermgmt');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'User management' }),
    ).toBeVisible();
    await context.close();
  });

  test('can navigate to and access user management page', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpusermgmt');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/');
    const quickTaskerLink = page.locator('#adminmenu').getByRole('link', {
      name: 'QuickTasker',
      exact: true,
    });
    await quickTaskerLink.hover();
    await page.getByRole('link', { name: 'User management' }).click();
    await expect(page.getByRole('heading', { name: 'User management' })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });

  test('sees only the QuickTaskers tab, not the WordPress users tab', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpusermgmt');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await navigateToUserManagement(page);
    await expect(page.getByRole('tab', { name: 'QuickTaskers' })).toBeVisible();
    await expect(page.getByText('Add QuickTasker')).toBeVisible();
    await expect(page.getByRole('tab', { name: 'WordPress users' })).not.toBeVisible();
    await context.close();
  });

  test('can create a QuickTasker', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpusermgmt');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    const quickTaskerName = generateUniqueName('UM-Manager-QuickTasker');
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, quickTaskerName);
    await expect(getQuickTaskerCard(page, quickTaskerName)).toBeVisible();
    await context.close();
  });

  test('can edit a QuickTasker', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpusermgmt');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    const quickTaskerName = generateUniqueName('UM-Manager-Edit');
    const newName = generateUniqueName('UM-Manager-Renamed');
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, quickTaskerName);
    await getQuickTaskerCard(page, quickTaskerName).getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem', { name: 'Edit user' }).click();
    const modal = page.getByTestId('user-modal');
    await expect(modal).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await modal.locator('input[type="text"]').first().fill(newName);
    // Wait for the auto-save to reach the card before closing; closing cancels a pending save.
    await expect(getQuickTaskerCard(page, newName)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await page.getByTestId('wpqt-modal-close-button').click();
    await expect(modal).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(getQuickTaskerCard(page, newName)).toBeVisible();
    await context.close();
  });

  test('can disable a QuickTasker', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpusermgmt');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    const quickTaskerName = generateUniqueName('UM-Manager-Disable');
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, quickTaskerName);
    await getQuickTaskerCard(page, quickTaskerName).getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem', { name: 'Disable user' }).click();
    await expect(getQuickTaskerCard(page, quickTaskerName).getByText('Disabled')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });

  test('Delete user is disabled without the delete permission', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpusermgmt');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    const quickTaskerName = generateUniqueName('UM-Manager-NoDelete');
    const confirmMessage = 'Are you sure you want to delete this user?';
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, quickTaskerName);

    // Card dropdown: the item is shown struck through and clicking it does nothing.
    await getQuickTaskerCard(page, quickTaskerName).getByTestId('dropdown-icon').click();
    const dropdownDelete = page.getByRole('menuitem', { name: 'Delete user' });
    await expect(dropdownDelete).toBeVisible();
    await expect(dropdownDelete).toHaveClass(/wpqt-cursor-not-allowed/);
    await dropdownDelete.click();
    await expect(page.getByText(confirmMessage)).not.toBeVisible();
    await page.keyboard.press('Escape');

    // Edit modal
    await getQuickTaskerCard(page, quickTaskerName).getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem', { name: 'Edit user' }).click();
    const modal = page.getByTestId('user-modal');
    await expect(modal).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    const modalDelete = modal.locator('[aria-disabled="true"]', { hasText: 'Delete user' });
    await expect(modalDelete).toBeVisible();
    await modalDelete.click();
    await expect(page.getByText(confirmMessage)).not.toBeVisible();
    await page.getByTestId('wpqt-modal-close-button').click();
    await expect(modal).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

    // Detail page
    await navigateToUserDetailPage(page, quickTaskerName);
    const detailDelete = page.locator('[aria-disabled="true"]', { hasText: 'Delete user' });
    await expect(detailDelete).toBeVisible();
    await detailDelete.hover();
    await expect(page.getByText("You don't have permission to delete users")).toBeVisible();
    await detailDelete.click();
    await expect(page.getByRole('heading', { name: quickTaskerName })).toBeVisible();
    await context.close();
  });

  test("can reset a QuickTasker's password", async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpusermgmt');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_users']);
    const quickTaskerName = generateUniqueName('UM-Manager-Reset');
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, quickTaskerName);
    await navigateToUserDetailPage(page, quickTaskerName);
    const userPageUrl = await getQuickTaskerUserPageUrl(page);

    // The QuickTasker sets a password, so the manager gets a "Reset password" control.
    const quickTasker = await openAnonymousPage(browser);
    await completeQuickTaskerSetup(quickTasker.page, userPageUrl, 'quicktasker-pass-1');
    await quickTasker.context.close();

    await page.reload();
    await expect(page.getByRole('heading', { name: quickTaskerName })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await page.getByText('Reset password').click();
    await expect(page.getByText('User password reset successfully')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Reset password')).not.toBeVisible();
    await context.close();
  });
});

test.describe('WP User Capabilities – Manage Archive', () => {
  test('Archive submenu is visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wparch');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_archive']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'Archive' }),
    ).toBeVisible();
    await context.close();
  });

  test('can navigate to and access archive page', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wparch');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_archive']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/');
    const quickTaskerLink = page.locator('#adminmenu').getByRole('link', {
      name: 'QuickTasker',
      exact: true,
    });
    await quickTaskerLink.hover();
    await page.getByRole('link', { name: 'Archive' }).click();
    await expect(page.getByRole('heading', { name: 'Archive', exact: true })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });
});

test.describe('WP User Capabilities – Tasks App', () => {
  test('Tasks app submenu is visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wptasks');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_access_user_page_app']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'Tasks app' }),
    ).toBeVisible();
    await context.close();
  });
});

test.describe('WP User Capabilities – Manage Settings', () => {
  test('Add new board button is visible in pipeline dropdown', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpsettings');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await page.getByTestId('pipeline-selection-dropdown').click();
    await expect(page.getByTestId('add-new-board-button')).toBeVisible();
    await context.close();
  });

  test('Board settings options are visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpsettings');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Automations', { exact: true })).toBeVisible();
    await context.close();
  });

  test('Add stage button is visible', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpsettings');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText(/^Add (first )?stage$/)).toBeVisible();
    await context.close();
  });

  test('Delete stage option is not visible in stage controls dropdown', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpsettings');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    // First dropdown-icon on the board is the stage gear icon (stage header precedes task cards in DOM)
    await page.getByTestId('dropdown-icon').first().click();
    await expect(page.getByText('Delete stage')).not.toBeVisible();
    await context.close();
  });
});

test.describe('WP User Capabilities – View My Tasks', () => {
  test('My Tasks submenu is not visible without the capability', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpnomytasks');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'My Tasks' }),
    ).not.toBeVisible();
    await context.close();
  });

  test('accessing My Tasks page directly shows insufficient permissions error', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpnomytasks');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker-my-tasks');
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });

  test('user with only view-my-tasks cap sees QuickTasker menu and My Tasks submenu', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpmytasks');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_view_my_tasks']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/');
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'QuickTasker', exact: true }),
    ).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'My Tasks' }),
    ).toBeVisible();
    await context.close();
  });

  test('user with only view-my-tasks cap can load the My Tasks page but no Boards', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpmytasks');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_view_my_tasks']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker-my-tasks');
    await expect(page.getByRole('heading', { name: 'My Tasks' })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Tasks I created')).toBeVisible();
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'Boards' }),
    ).not.toBeVisible();
    await context.close();
  });

  test('non-admin user does not see the "Tasks assigned to me" section', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpmytasks');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_view_my_tasks']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker-my-tasks');
    await expect(page.getByText('Tasks I created')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Tasks assigned to me')).not.toBeVisible();
    await context.close();
  });

  test('admin user sees the "Tasks assigned to me" section', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpmytasksadmin');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_view_my_tasks']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker-my-tasks');
    await expect(page.getByText('Tasks I created')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Tasks assigned to me')).toBeVisible();
    await context.close();
  });
});

test.describe('WP User Capabilities – Allow Delete', () => {
  test('Delete stage option is visible in stage controls dropdown', async ({ browser, request }) => {
    const userLogin = uniqueLogin('wpdelete');
    const userId = await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await grantWPUserCaps(request, userId, ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings', 'quicktasker_admin_role_allow_delete']);
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    // First dropdown-icon on the board is the stage gear icon (stage header precedes task cards in DOM)
    await page.getByTestId('dropdown-icon').first().click();
    await expect(page.getByText('Delete stage')).toBeVisible();
    await context.close();
  });
});
