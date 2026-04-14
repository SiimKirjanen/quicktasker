import { Page } from '@playwright/test';

/**
 * WordPress test utilities for e2e testing
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
  await page.fill('#user_login', username);
  await page.fill('#user_pass', password);
  await page.click('#wp-submit');
  await page.waitForURL(/wp-admin/);
}

/**
 * Logout from WordPress
 */
export async function logoutFromWordPress(page: Page) {
  await page.goto('/wp-login.php?action=logout');
  await page.click('text=log out');
}

/**
 * Navigate to a WordPress admin page
 */
export async function navigateToAdminPage(page: Page, path: string) {
  await page.goto(`/wp-admin/${path}`);
}

/**
 * Check if user is logged in
 */
export async function isLoggedIn(page: Page): Promise<boolean> {
  await page.goto('/wp-admin');
  const url = page.url();
  return url.includes('/wp-admin/') && !url.includes('wp-login.php');
}
