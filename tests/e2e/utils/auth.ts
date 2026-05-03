import { Page, expect } from '@playwright/test';
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
