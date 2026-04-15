import { Page, expect } from '@playwright/test';

/**
 * Board-related utilities for e2e testing
 * Helpers for working with boards, stages, and tasks
 */

/**
 * Create a new board through the UI
 * @param page - Playwright page object
 * @param name - Board name
 * @param description - Board description (optional)
 */
export async function createBoard(page: Page, name: string, description = ''): Promise<void> {
  // Open board dropdown
  await page.getByTestId('pipeline-selection-dropdown').click();
  
  // Click "Add new board"
  await page.getByText('Add new board').click();
  
  // Fill in board details
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  if (description) {
    await page.getByRole('textbox', { name: 'Description' }).fill(description);
  }
  
  // Submit form
  await page.getByRole('button', { name: 'Add board' }).click();
  
  // Wait for board to be created
  await expect(page.getByText(name).first()).toBeVisible();
}

/**
 * Get all task titles within a specific stage
 * @param page - Playwright page object
 * @param stageName - Name of the stage to get tasks from (e.g., "Order Received")
 * @returns Array of task titles within the stage
 */
export async function getTasksInStage(page: Page, stageName: string): Promise<string[]> {
  // Find the stage container by its title
  const stageContainer = page.locator('div[data-stage-id]').filter({ hasText: stageName }).first();
  
  // Get all task titles within task cards (draggable elements) only
  const taskTitles = await stageContainer.locator('div[data-rfd-draggable-id] div.wpqt-text-base').allTextContents();
  
  return taskTitles;
}

/**
 * Create a new stage through the UI
 * @param page - Playwright page object
 * @param name - Stage name
 * @param description - Stage description (optional)
 */
export async function createStage(page: Page, name: string, description = ''): Promise<void> {
  // Click whichever "Add stage" button is visible (first stage or subsequent)
  await page.getByText(/^Add (first )?stage$/).click();
  
  // Fill in stage details
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  if (description) {
    await page.getByRole('textbox', { name: 'Description' }).fill(description);
  }
  
  // Submit form
  await page.getByRole('button', { name: 'Add stage' }).click();
  
  // Wait for modal to close (stage created)
  await expect(page.getByRole('textbox', { name: 'Name' })).not.toBeVisible();
}
