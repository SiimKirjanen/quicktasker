import { test, expect } from '@playwright/test';
import { navigateToBoardsPage, createBoard, createStage } from './utils';

test.describe('Board Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should create a new board', async ({ page }) => {
    const boardName = `e2e_test_board ${Date.now()}`;
    
    await page.getByTestId('pipeline-selection-dropdown').click();
    
    await page.getByText('Add new board').click();
    
    await page.getByRole('textbox', { name: 'Name' }).fill(boardName);
    await page.getByRole('textbox', { name: 'Description' }).fill('Board for e2e tests');
    
    await page.getByRole('button', { name: 'Add board' }).click();
    
    await expect(page.getByText(boardName).first()).toBeVisible();
    await expect(page.getByText('Board for e2e tests')).toBeVisible();
  });

  test('should delete a board', async ({ page }) => {
    const boardName = `Board to Delete ${Date.now()}`;
    await createBoard(page, boardName, 'This board will be deleted');
    
    await expect(page.getByText(boardName).first()).toBeVisible();
    
    await page.locator('#wpqt-app').getByText('Settings').click();
    await page.getByText('Delete board').click();
    
    await page.getByRole('button', { name: 'Yes' }).click();
    
    await expect(page.getByTestId('pipeline-selection-dropdown').getByText(boardName)).not.toBeVisible();
  });
});

test.describe('Board Operations', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(page, `Test Board ${Date.now()}`, 'Board for testing operations');
  });

  test('should display the newly created board', async ({ page }) => {
    await expect(page.getByText('Board for testing operations')).toBeVisible();
  });

  test('should allow switching between boards', async ({ page }) => {
    const secondBoardName = `Second Board ${Date.now()}`;
    await createBoard(page, secondBoardName, 'Another test board');
    
    await expect(page.getByText(secondBoardName).first()).toBeVisible();
    
    await page.getByTestId('pipeline-selection-dropdown').click();
    await page.getByText('Demo board').click();
    
    await expect(page.getByText('Demo board').first()).toBeVisible();
  });

  test('should update board name and description', async ({ page }) => {
    const originalDescription = 'Original description for update test';
    const originalName = `Board to Update ${Date.now()}`;
    await createBoard(page, originalName, originalDescription);
    
    await expect(page.getByText(originalDescription)).toBeVisible();
    
    await page.locator('#wpqt-app').getByText('Settings').click();
    
    const updatedName = `Updated Board ${Date.now()}`;
    const updatedDescription = 'This board has been updated via e2e test';
    
    await page.getByRole('textbox', { name: 'Name' }).fill(updatedName);
    await page.getByRole('textbox', { name: 'Description' }).fill(updatedDescription);
    
    // Wait for auto-save to complete (debounce is 700ms)
    await page.waitForTimeout(1000);
    
    // Close the settings modal
    await page.getByTestId('wpqt-modal-close-button').click();
    
    await expect(page.getByText(updatedName).first()).toBeVisible();
    await expect(page.getByText(updatedDescription)).toBeVisible();
  });

  test('should control mark as done toggle based on last stage setting', async ({ page }) => {
    // Create a new board
    const boardName = `Task Completion Board ${Date.now()}`;
    await createBoard(page, boardName, 'Testing mark as done control');

    // Create first stage
    await createStage(page, 'In Progress', 'Tasks in progress');

    // Create second stage
    await createStage(page, 'Completed', 'Completed tasks');

    // Add task to first stage
    await page.getByText('Add task').first().click();
    await page.getByPlaceholder('Task name').first().fill('Task in Progress Stage');
    await page.getByPlaceholder('Task name').first().press('Enter');

    // Wait for first task to be created
    await expect(page.getByText('Task in Progress Stage')).toBeVisible();

    // Add task to second stage
    await page.getByText('Add task').nth(1).click();
    await page.getByPlaceholder('Task name').fill('Task in Completed Stage');
    await page.getByPlaceholder('Task name').press('Enter');

    // Wait for second task to be created
    await expect(page.getByText('Task in Completed Stage')).toBeVisible();

    // Verify both tasks have the check icon (mark as done) by default
    const progressTaskCard = page.locator('[data-rfd-draggable-id]').filter({ hasText: 'Task in Progress Stage' });
    const completedTaskCard = page.locator('[data-rfd-draggable-id]').filter({ hasText: 'Task in Completed Stage' });
    
    await expect(progressTaskCard.getByTestId('task-done-icon-uncompleted')).toBeVisible();
    await expect(completedTaskCard.getByTestId('task-done-icon-uncompleted')).toBeVisible();

    // Open board settings and enable "mark as done only in last stage"
    await page.locator('#wpqt-app').getByText('Settings').click();
    await page.locator('.react-switch-bg').click();

    // Wait for auto-save
    await page.waitForTimeout(1000);

    // Close settings modal
    await page.getByTestId('wpqt-modal-close-button').click();

    // Verify first stage task does NOT have the check icon
    await expect(progressTaskCard.getByTestId('task-done-icon-uncompleted')).not.toBeVisible();
    
    // Verify last stage task still HAS the check icon
    await expect(completedTaskCard.getByTestId('task-done-icon-uncompleted')).toBeVisible();
  });
});
