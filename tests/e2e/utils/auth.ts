import { Page } from '@playwright/test';

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
  await page.fill('#user_login', username);
  await page.fill('#user_pass', password);
  await page.click('#wp-submit');
  
  // Wait for successful login - admin bar should be visible
  await page.waitForURL(/wp-admin/, { timeout: 10000 });
  await page.waitForSelector('#wpadminbar', { timeout: 10000 });
  
  // Additional wait for page to stabilize
  await page.waitForLoadState('networkidle');
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
