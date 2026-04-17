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

/**
 * Navigate to User management page
 */
export async function navigateToUserManagement(page: Page) {
  await navigateToAdminPage(page, '');
  const quickTaskerLink = page.getByRole('link', { name: 'QuickTasker', exact: true });
  await quickTaskerLink.hover();
  await page.getByRole('link', { name: 'User management' }).click();
  await page.waitForLoadState('networkidle');
}
