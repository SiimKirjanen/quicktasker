import { Page } from '@playwright/test';
import { navigateToUserManagement } from './navigation';

/**
 * User management utilities for e2e testing
 * Helpers for working with QuickTasker users and WordPress users
 */

/**
 * Create a new QuickTasker user through the UI
 * @param page - Playwright page object
 * @param name - QuickTasker name
 * @param description - QuickTasker description (optional)
 */
export async function createQuickTasker(page: Page, name: string, description = ''): Promise<void> {
  await navigateToUserManagement(page);
  await page.getByTestId('quicktasker-icon').click();
  
  // Click "Add QuickTasker"
  await page.getByText('Add QuickTasker').click();
  
  // Find the input field - using placeholder or label approach instead of dynamic ID
  const nameInput = page.locator('input[type="text"]').first();
  await nameInput.click();
  await nameInput.fill(name);
  
  // Fill in description textarea if provided
  if (description) {
    await page.locator('textarea').click();
    await page.locator('textarea').fill(description);
  }
  
  // Click Add button
  await page.getByText('Add', { exact: true }).click();
  
  // Wait for QuickTasker to be created
  await page.waitForTimeout(500);
}
