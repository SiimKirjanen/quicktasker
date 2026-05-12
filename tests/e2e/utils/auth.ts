import { Browser, BrowserContext, Page, expect } from '@playwright/test';
import { TIMEOUTS } from './timeouts';

/**
 * WordPress authentication utilities for e2e testing
 */

export const WP_ADMIN_USER = {
  username: 'admin',
  password: 'password',
};

/**
 * Login to WordPress admin
 */
export async function loginToWordPress(page: Page, username = WP_ADMIN_USER.username, password = WP_ADMIN_USER.password) {
  await page.goto('/wp-login.php');

  const usernameField = page.getByLabel('Username or Email Address');
  const passwordField = page.getByLabel('Password', { exact: true });

  await expect(usernameField).toBeEditable();
  await usernameField.fill(username);
  await expect(usernameField).toHaveValue(username);

  // Wait for WP's login script to render the show-password toggle. Until this
  // button exists the password input is still being re-initialized, and any
  // keystrokes typed in the meantime get dropped.
  await expect(page.locator('button.wp-hide-pw')).toBeVisible();

  await expect(passwordField).toBeEditable();
  await passwordField.fill(password);
  await expect(passwordField).toHaveValue(password);

  await page.click('#wp-submit');

  await expect(page.locator('#wpadminbar')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

/**
 * Programmatically log in to WordPress by POSTing the login form via the
 * context's request API, avoiding the flaky `wp-login.php` UI flow under
 * parallel load. Returns a new BrowserContext that already has the WP auth
 * cookies set; create pages from it as usual.
 */
export async function loginToWordPressViaApi(
  browser: Browser,
  username: string,
  password = 'password123',
): Promise<BrowserContext> {
  const context = await browser.newContext();
  // WP refuses to process the login form unless the test cookie was set by a
  // prior request. Seed it directly on the context.
  await context.addCookies([
    {
      name: 'wordpress_test_cookie',
      value: 'WP%20Cookie%20check',
      url: 'http://localhost:8889',
    },
  ]);

  const response = await context.request.post('/wp-login.php', {
    form: {
      log: username,
      pwd: password,
      'wp-submit': 'Log In',
      testcookie: '1',
      redirect_to: '/wp-admin/',
    },
    maxRedirects: 0,
  });

  // WP returns 302 on success. A 200 means the login form was re-rendered
  // with an error (bad credentials, missing test cookie, etc).
  if (response.status() !== 302) {
    await context.close();
    throw new Error(`WP login failed for "${username}": status ${response.status()}`);
  }

  return context;
}

/**
 * Logout from WordPress
 */
export async function logoutFromWordPress(page: Page) {
  await page.goto('/wp-login.php?action=logout');
  await page.click('text=log out');
}

/**
 * Check if user is logged in
 */
export async function isLoggedIn(page: Page): Promise<boolean> {
  await page.goto('/wp-admin');
  const url = page.url();
  return url.includes('/wp-admin/') && !url.includes('wp-login.php');
}
