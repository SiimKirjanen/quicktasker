import { Page, expect } from '@playwright/test';

/**
 * Board-related utilities for e2e testing
 * Helpers for working with boards, stages, and tasks
 */

/**
 * Generate a unique name with timestamp to avoid substring conflicts
 * @param prefix - Base name prefix (e.g., 'Board', 'Stage', 'Task')
 * @returns Unique name with timestamp
 */
export function generateUniqueName(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}

/**
 * Generate a unique description with timestamp to avoid conflicts
 * @param text - Description text
 * @returns Unique description with timestamp
 */
export function generateUniqueDescription(text: string): string {
  return `${text}_${Date.now()}`;
}

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

/**
 * Get a stage container element by stage name
 * @param page - Playwright page object
 * @param stageName - Name of the stage to find
 * @returns Locator for the stage container
 */
export function getStageContainer(page: Page, stageName: string) {
  return page.locator('div[data-stage-id]').filter({ hasText: stageName });
}

/**
 * Get a task card element by task name
 * @param page - Playwright page object
 * @param taskName - Name of the task to find
 * @returns Locator for the task card (draggable element)
 */
export function getTaskCard(page: Page, taskName: string) {
  return page.locator('[data-rfd-draggable-id]').filter({ hasText: taskName });
}

/**
 * Create a new label from within a task's label dropdown
 * @param page - Playwright page object
 * @param taskCard - Locator for the task card
 * @param labelName - Name of the label to create
 */
export async function createLabel(page: Page, taskCard: any, labelName: string): Promise<void> {
  // Open the label dropdown
  await taskCard.getByTestId('task-label-icon').click();
  
  // Click "Create new label"
  await page.getByText('Create new label').click();
  
  // Fill in label name
  await page.locator('#new-label-name').fill(labelName);
  
  // Click Create button
  await page.getByRole('button', { name: 'Create' }).click();
  
  // Wait for label to be created and return to selection view
  await page.waitForTimeout(500);
}
