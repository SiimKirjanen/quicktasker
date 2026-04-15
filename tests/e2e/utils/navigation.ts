import { Page } from '@playwright/test';

/**
 * WordPress navigation utilities for e2e testing
 */

/**
 * Navigate to a WordPress admin page
 */
export async function navigateToAdminPage(page: Page, path: string) {
  await page.goto(`/wp-admin/${path}`);
}

/**
 * Navigate to QuickTasker boards page
 */
export async function navigateToBoardsPage(page: Page) {
  await page.goto('/wp-admin/admin.php?page=wp-quick-tasks');
  await page.waitForLoadState('networkidle');
}
