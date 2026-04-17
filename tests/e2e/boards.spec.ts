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

  test.skip('should set board as primary and persist after page refresh', async ({ page }) => {
    const boardName = `Primary Board ${Date.now()}`;
    const boardDescription = 'Testing primary board functionality';
    await createBoard(page, boardName, boardDescription);
    
    // Open the pipeline selection dropdown
    await page.getByTestId('pipeline-selection-dropdown').click();
    
    // Find the newly created board and click the star icon to set it as primary
    const boardMenuItem = page.locator('.wpqt-mb-3').filter({ hasText: boardName });
    await boardMenuItem.getByTestId('set-primary-pipeline-icon').click();
    
    // Wait for the toast notification and API call to complete
    await expect(page.getByText('Primary board has been set successfully.')).toBeVisible();
    await page.waitForTimeout(500);
    
    // Refresh the page
    await page.reload();
    
    // Wait for the page to load
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible();
    
    // Verify the board name and description are still visible
    await expect(page.getByText(boardName).first()).toBeVisible();
    await expect(page.getByText(boardDescription)).toBeVisible();
    
    // Open the dropdown again to verify the board is still primary
    await page.getByTestId('pipeline-selection-dropdown').click();
    
    // Verify the board has the primary icon (filled star)
    const primaryBoardItem = page.locator('.wpqt-mb-3').filter({ hasText: boardName });
    await expect(primaryBoardItem.getByTestId('primary-pipeline-icon')).toBeVisible();
  });
});

test.describe('Board Task View', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should switch to task view, search tasks, and filter by stage', async ({ page }) => {
    // Create a new board
    const boardName = `Task View Test ${Date.now()}`;
    await createBoard(page, boardName, 'Testing task view functionality');

    // Create two stages
    await createStage(page, 'To Do', 'Tasks to do');
    await createStage(page, 'In Progress', 'Tasks in progress');

    // Create tasks in first stage (To Do)
    await page.getByText('Add task').first().click();
    await page.getByPlaceholder('Task name').first().fill('Task Alpha');
    await page.getByPlaceholder('Task name').first().press('Enter');
    await expect(page.getByText('Task Alpha')).toBeVisible();

    await page.getByText('Add task').first().click();
    await page.getByPlaceholder('Task name').first().fill('Task Beta');
    await page.getByPlaceholder('Task name').first().press('Enter');
    await expect(page.getByText('Task Beta')).toBeVisible();

    // Create task in second stage (In Progress)
    await page.getByText('Add task').nth(1).click();
    await page.getByPlaceholder('Task name').fill('Task Gamma');
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText('Task Gamma')).toBeVisible();

    // Switch to Task view
    await page.getByText('Switch to Task view').click();

    // Verify all tasks are visible in task view
    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).toBeVisible();

    // Test search functionality
    await page.getByRole('textbox', { name: 'Search' }).fill('Alpha');

    // Only Task Alpha should be visible
    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).not.toBeVisible();
    await expect(page.getByText('Task Gamma')).not.toBeVisible();

    // Clear search
    await page.getByRole('textbox', { name: 'Search' }).clear();

    // All tasks should be visible again
    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).toBeVisible();

    // Test search with different term
    await page.getByRole('textbox', { name: 'Search' }).fill('Beta');
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Alpha')).not.toBeVisible();
    await expect(page.getByText('Task Gamma')).not.toBeVisible();

    // Clear search for stage filter test
    await page.getByRole('textbox', { name: 'Search' }).clear();

    // Test stage filter - filter by "To Do" stage
    const stageFilter = page.locator('#task-view-stage-filter');
    await stageFilter.selectOption({ label: 'To Do' });

    // Only tasks from "To Do" stage should be visible
    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).not.toBeVisible();

    // Filter by "In Progress" stage
    await stageFilter.selectOption({ label: 'In Progress' });

    // Only tasks from "In Progress" stage should be visible
    await expect(page.getByText('Task Gamma')).toBeVisible();
    await expect(page.getByText('Task Alpha')).not.toBeVisible();
    await expect(page.getByText('Task Beta')).not.toBeVisible();

    // Reset filter to show all stages
    await stageFilter.selectOption({ label: 'All stages' });

    // All tasks should be visible again
    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).toBeVisible();

    // Test combining search and stage filter
    await page.getByRole('textbox', { name: 'Search' }).fill('Task');
    await stageFilter.selectOption({ label: 'To Do' });

    // Only tasks from "To Do" stage matching "Task" should be visible
    await expect(page.getByText('Task Alpha')).toBeVisible();
    await expect(page.getByText('Task Beta')).toBeVisible();
    await expect(page.getByText('Task Gamma')).not.toBeVisible();
  });

  test('should switch back to board view from task view', async ({ page }) => {
    const boardName = `View Switch Test ${Date.now()}`;
    await createBoard(page, boardName, 'Testing view switching');

    // Switch to Task view
    await page.getByText('Switch to Task view').click();
    await expect(page.getByText('Switch to Board view')).toBeVisible();

    // Switch back to Board view
    await page.getByText('Switch to Board view').click();
    await expect(page.getByText('Switch to Task view')).toBeVisible();
  });

  test('should handle empty search results in task view', async ({ page }) => {
    const boardName = `Empty Search Test ${Date.now()}`;
    await createBoard(page, boardName, 'Testing empty search');

    // Create a stage and task
    await createStage(page, 'To Do', 'Tasks to do');
    await page.getByText('Add task').first().click();
    await page.getByPlaceholder('Task name').first().fill('Sample Task');
    await page.getByPlaceholder('Task name').first().press('Enter');
    await expect(page.getByText('Sample Task')).toBeVisible();

    // Switch to Task view
    await page.getByText('Switch to Task view').click();

    // Search for non-existent task
    await page.getByRole('textbox', { name: 'Search' }).fill('NonExistentTask');

    // Verify "No tasks" message appears
    await expect(page.getByText('No tasks')).toBeVisible();
    await expect(page.getByText('Sample Task')).not.toBeVisible();

    // Clear search to show task again
    await page.getByRole('textbox', { name: 'Search' }).clear();
    await expect(page.getByText('Sample Task')).toBeVisible();
  });
});
