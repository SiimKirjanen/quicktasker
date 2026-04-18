import { Page, expect } from '@playwright/test';
import { navigateToUserManagement } from './navigation';
import { getTaskCard } from './board-helpers';

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

export async function openUserAssignmentDropdown(page: Page, taskName: string): Promise<void> {
  const taskCard = getTaskCard(page, taskName);
  await taskCard.getByTestId('user-assignment-icon').click();
  await expect(page.getByText('Assigned quicktaskers')).toBeVisible();
  await expect(page.getByText('Assigned WordPress users')).toBeVisible();
}

export async function closeUserAssignmentDropdown(page: Page, taskName: string): Promise<void> {
  const taskCard = getTaskCard(page, taskName);
  await taskCard.getByTestId('user-assignment-icon').click();
  await expect(page.getByText('Assigned quicktaskers')).not.toBeVisible();
  await expect(page.getByText('Assigned WordPress users')).not.toBeVisible();
}

/**
 * Assign a WordPress user to a task via the task's user-assignment dropdown.
 * @param page - Playwright page
 * @param taskName - Name of the task
 * @param username - Exact username to assign
 * @param closeDropdown - Whether to close the dropdown after assignment (default: true)
 */
export async function assignWordPressUserToTask(page: Page, taskName: string, username: string, closeDropdown: boolean = true): Promise<void> {  
  await openUserAssignmentDropdown(page, taskName);

  const wpAssignSection = page.locator('div').filter({ hasText: 'Assign a WordPress user' }).first();
  await wpAssignSection.getByText(username, { exact: true }).click();

  const assignedSection = page.locator('div').filter({ hasText: 'Assigned WordPress users' }).first();
  await expect(assignedSection.getByText(username, { exact: true })).toBeVisible();

  if (closeDropdown) {
    await closeUserAssignmentDropdown(page, taskName);
  }
}
