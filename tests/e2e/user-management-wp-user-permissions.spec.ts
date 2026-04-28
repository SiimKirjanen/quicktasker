import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { createWPUser, addWPUserCap } from './utils/user-helpers';
import { loginToWordPress } from './utils/auth';
import { TIMEOUTS } from './utils/timeouts';

/**
 * Tests verifying that WordPress user capabilities control access to QuickTasker plugin features.
 *
 * Each suite creates a fresh WP user via WP-CLI, grants specific capabilities, then opens a
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
  let userLogin: string;

  test.beforeEach(() => {
    userLogin = `wpnone${Date.now()}`;
    createWPUser(userLogin, `${userLogin}@example.com`, 'editor');
  });

  test('QuickTasker admin menu is not visible', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/');
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'QuickTasker', exact: true }),
    ).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await context.close();
  });

  test('accessing boards page directly shows insufficient permissions error', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByText('Sorry, you are not allowed to access this page.')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });
});

test.describe('WP User Capabilities – Plugin Admin Role', () => {
  let userLogin: string;

  test.beforeEach(() => {
    userLogin = `wpadmin${Date.now()}`;
    createWPUser(userLogin, `${userLogin}@example.com`, 'editor');
    addWPUserCap(userLogin, 'quicktasker_admin_role');
  });

  test('QuickTasker admin menu is visible', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/');
    await expect(
      page.locator('#adminmenu').getByRole('link', { name: 'QuickTasker', exact: true }),
    ).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await context.close();
  });

  test('can access the boards page', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });

  test('User management submenu is not visible', async ({ browser }) => {
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

  test('Archive submenu is not visible', async ({ browser }) => {
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

  test('Tasks app submenu is not visible', async ({ browser }) => {
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

  test('Add new board button is not visible in pipeline dropdown', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByTestId('add-new-board-button')).not.toBeVisible();
    await context.close();
  });

  test('Board settings options are not visible', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Automations', { exact: true })).not.toBeVisible();
    await context.close();
  });

  test('Add stage button is not visible', async ({ browser }) => {
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
  let userLogin: string;

  test.beforeEach(() => {
    userLogin = `wpusermgmt${Date.now()}`;
    createWPUser(userLogin, `${userLogin}@example.com`, 'editor');
    addWPUserCap(userLogin, 'quicktasker_admin_role');
    addWPUserCap(userLogin, 'quicktasker_admin_role_manage_users');
  });

  test('User management submenu is visible', async ({ browser }) => {
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

  test('can navigate to and access user management page', async ({ browser }) => {
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
});

test.describe('WP User Capabilities – Manage Archive', () => {
  let userLogin: string;

  test.beforeEach(() => {
    userLogin = `wparch${Date.now()}`;
    createWPUser(userLogin, `${userLogin}@example.com`, 'editor');
    addWPUserCap(userLogin, 'quicktasker_admin_role');
    addWPUserCap(userLogin, 'quicktasker_admin_role_manage_archive');
  });

  test('Archive submenu is visible', async ({ browser }) => {
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

  test('can navigate to and access archive page', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/');
    const quickTaskerLink = page.locator('#adminmenu').getByRole('link', {
      name: 'QuickTasker',
      exact: true,
    });
    await quickTaskerLink.hover();
    await page.getByRole('link', { name: 'Archive' }).click();
    await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await context.close();
  });
});

test.describe('WP User Capabilities – Tasks App', () => {
  let userLogin: string;

  test.beforeEach(() => {
    userLogin = `wptasks${Date.now()}`;
    createWPUser(userLogin, `${userLogin}@example.com`, 'editor');
    addWPUserCap(userLogin, 'quicktasker_admin_role');
    addWPUserCap(userLogin, 'quicktasker_access_user_page_app');
  });

  test('Tasks app submenu is visible', async ({ browser }) => {
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
  let userLogin: string;

  test.beforeEach(() => {
    userLogin = `wpsettings${Date.now()}`;
    createWPUser(userLogin, `${userLogin}@example.com`, 'editor');
    addWPUserCap(userLogin, 'quicktasker_admin_role');
    addWPUserCap(userLogin, 'quicktasker_admin_role_manage_settings');
  });

  test('Add new board button is visible in pipeline dropdown', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await page.getByTestId('pipeline-selection-dropdown').click();
    await expect(page.getByTestId('add-new-board-button')).toBeVisible();
    await context.close();
  });

  test('Board settings options are visible', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText('Automations', { exact: true })).toBeVisible();
    await context.close();
  });

  test('Add stage button is visible', async ({ browser }) => {
    const { context, page } = await loginAsWPUser(browser, userLogin);
    await page.goto('/wp-admin/admin.php?page=wp-quicktasker');
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expect(page.getByText(/^Add (first )?stage$/)).toBeVisible();
    await context.close();
  });

  test('Delete stage option is not visible in stage controls dropdown', async ({ browser }) => {
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

test.describe('WP User Capabilities – Allow Delete', () => {
  let userLogin: string;

  test.beforeEach(() => {
    userLogin = `wpdelete${Date.now()}`;
    createWPUser(userLogin, `${userLogin}@example.com`, 'editor');
    addWPUserCap(userLogin, 'quicktasker_admin_role');
    addWPUserCap(userLogin, 'quicktasker_admin_role_manage_settings');
    addWPUserCap(userLogin, 'quicktasker_admin_role_allow_delete');
  });

  test('Delete stage option is visible in stage controls dropdown', async ({ browser }) => {
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
