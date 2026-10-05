import { APIRequestContext, Page, expect } from '@playwright/test';
import { getAdminNonce } from './auth';
import { waitForModalToClose } from './modal-helpers';

/**
 * Board-related utilities for e2e testing
 * Helpers for working with boards, stages, and tasks
 */

/**
 * Generate a unique name with timestamp to avoid substring conflicts
 * @param prefix - Base name prefix (e.g., 'BM-CR-Board' where BM=describe group, CR=test action)
 * @returns Unique name with timestamp and a random suffix, so parallel tests
 *          sharing a prefix in the same millisecond still get different names
 */
export function generateUniqueName(prefix: string): string {
  const suffix = Math.random().toString(36).slice(2, 6).padEnd(4, '0');
  return `${prefix}_${Date.now()}${suffix}`;
}

/**
 * Delete a board and its tasks by name via the admin REST API. For test
 * cleanup: does nothing if no board has that name.
 */
export async function deleteBoardViaApi(request: APIRequestContext, boardName: string): Promise<void> {
  const headers = { 'X-WP-Nonce': await getAdminNonce(request) };
  const list = await request.get('/wp-json/wpqt/v1/pipelines', { headers });
  if (!list.ok()) throw new Error(`Failed to list boards: ${await list.text()}`);
  const board = (await list.json()).data.find((b: { name: string }) => b.name === boardName);
  if (!board) return;
  const response = await request.delete(`/wp-json/wpqt/v1/pipelines/${board.id}`, { headers });
  if (!response.ok()) throw new Error(`Failed to delete board: ${await response.text()}`);
}

/**
 * Generate a unique description with timestamp to avoid conflicts
 * @param text - Description text (e.g., 'BM-CR-Board for e2e tests')
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

  // Wait for modal to close
  await waitForModalToClose(page, 'add-pipeline-modal');
  
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
  await expect(page.getByTestId('stage-modal')).not.toBeVisible();
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
 * Select an existing board from the pipeline selection dropdown.
 */
export async function selectBoard(page: Page, boardName: string): Promise<void> {
  await page.getByTestId('pipeline-selection-dropdown').click();
  await page.getByText(boardName, { exact: true }).click();
  await expect(page.getByText(boardName).first()).toBeVisible();
}

/**
 * Mark a board as the current user's primary board from the pipeline selection dropdown.
 */
export async function setPrimaryBoard(page: Page, boardName: string): Promise<void> {
  await page.getByTestId('pipeline-selection-dropdown').click();
  await page
    .getByTestId('pipeline-selection-item')
    .filter({ hasText: boardName })
    .getByTestId('set-primary-pipeline-icon')
    .click();
  await expect(page.getByText('Primary board has been set successfully.')).toBeVisible();
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

/**
 * Select the first label checkbox in the label dropdown for a task.
 * Opens the label dropdown, checks the first checkbox, and then closes the dropdown.
 */
export async function selectFirstLabel(page: Page, taskCard: any): Promise<void> {
  await taskCard.getByTestId('task-label-icon').click();
  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.check();
  await page.waitForTimeout(300);
  await page.getByText('Board labels').first().click();
  await page.keyboard.press('Escape');
}

/**
 * Create a task inside a given stage.
 * @param page - Playwright page
 * @param stageName - Visible stage name to add the task into
 * @param taskName - Name of the task to create
 */
export async function createTask(page: Page, stageName: string, taskName: string): Promise<void> {
  const stageContainer = getStageContainer(page, stageName);
  await stageContainer.getByText('Add task').click();
  await page.getByPlaceholder('Task name').fill(taskName);
  await page.getByPlaceholder('Task name').press('Enter');
  await expect(stageContainer.getByText(taskName)).toBeVisible();
}
