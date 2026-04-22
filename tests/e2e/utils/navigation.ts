import { Page, expect } from '@playwright/test';
import { TIMEOUTS } from './timeouts';

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
  await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

/**
 * Navigate to User management page
 */
export async function navigateToUserManagement(page: Page) {
  await navigateToAdminPage(page, '');
  const quickTaskerLink = page.getByRole('link', { name: 'QuickTasker', exact: true });
  await quickTaskerLink.hover();
  await page.getByRole('link', { name: 'User management' }).click();
  await expect(page.getByRole('heading', { name: 'User management' })).toBeVisible({timeout: TIMEOUTS.NAVIGATION});
}

/**
 * Navigate to Archive page
 */
export async function navigateToArchivePage(page: Page) {
  await navigateToAdminPage(page, '');
  const quickTaskerLink = page.getByRole('link', { name: 'QuickTasker', exact: true });
  await quickTaskerLink.hover();
  await page.getByRole('link', { name: 'Archive' }).click();
  await expect(page.getByRole('heading', { name: 'Archive' })).toBeVisible({timeout: TIMEOUTS.NAVIGATION});
}
