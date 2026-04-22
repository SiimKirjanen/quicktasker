import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, generateUniqueName, generateUniqueDescription, getStageContainer } from './utils/board-helpers';
import { waitForModalToClose } from './utils/modal-helpers';

test.describe('Stage Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    // Create a board for stage tests
    await createBoard(page, generateUniqueName('StageTestBoard'), generateUniqueDescription('Board for verification'));
  });

  test('should create a new stage and verify it was created', async ({ page }) => {
    const stageName = generateUniqueName('DevPhase');
    const stageDescription = generateUniqueDescription('Active tasks');
    
    await createStage(page, stageName, stageDescription);
    
    // Verify the stage name is visible
    await expect(page.getByText(stageName)).toBeVisible();
    
    // Verify the stage description is visible
    await expect(page.getByText(stageDescription)).toBeVisible();
  });

  test('should delete an empty stage', async ({ page }) => {
    const stageName = generateUniqueName('EmptyStage');
    const stageDescription = generateUniqueDescription('Stage to delete');
    
    await createStage(page, stageName, stageDescription);
    
    // Verify the stage was created
    await expect(page.getByText(stageName)).toBeVisible();
    
    // Find the stage container and click the settings/menu button
    const stageContainer = getStageContainer(page, stageName);
    await stageContainer.getByTestId('dropdown-icon').click();
    
    // Click delete stage button
    await page.getByText('Delete stage').click();
    
    // Confirm deletion
    await page.getByRole('button', { name: 'Yes' }).click();
    
    // Verify the stage is no longer visible
    await expect(page.getByText(stageName)).not.toBeVisible();
  });

  test('should not allow deleting a stage with tasks', async ({ page }) => {
    const stageName = generateUniqueName('StageWithTask');
    const stageDescription = generateUniqueDescription('Has tasks');
    
    await createStage(page, stageName, stageDescription);
    
    // Verify the stage was created
    await expect(page.getByText(stageName)).toBeVisible();
    
    // Add a task to the stage
    const stageContainer = getStageContainer(page, stageName);
    await stageContainer.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill('Test Task');
    await page.getByPlaceholder('Task name').press('Enter');
    
    // Verify task was created
    await expect(page.getByText('Test Task')).toBeVisible();
    
    // Try to delete the stage - use .first() to get the stage dropdown (not the task dropdown)
    await stageContainer.getByTestId('dropdown-icon').first().click();
    
    // Get the delete stage menu item
    const deleteItem = page.getByRole('menuitem').filter({ hasText: 'Delete stage' });
    
    // Verify the button is visible but disabled (has line-through and cursor not-allowed)
    await expect(deleteItem).toBeVisible();
    await expect(deleteItem).toHaveCSS('text-decoration-line', 'line-through');
    await expect(deleteItem).toHaveCSS('cursor', 'not-allowed');
    
    // Hover over the disabled button to show tooltip
    await deleteItem.hover();
    
    // Verify the tooltip message appears
    await expect(page.getByText('Stage can be deleted when there are no tasks on it')).toBeVisible();
    
    // Verify the stage and task still exist (deletion was prevented)
    await expect(page.getByText(stageName)).toBeVisible();
    await expect(page.getByText('Test Task')).toBeVisible();
  });

  test('should edit stage name and description', async ({ page }) => {
    const originalStageName = generateUniqueName('OriginalStage');
    const originalDescription = generateUniqueDescription('Original description');
    
    await createStage(page, originalStageName, originalDescription);
    
    // Verify the stage was created
    await expect(page.getByText(originalStageName)).toBeVisible();
    await expect(page.getByText(originalDescription)).toBeVisible();
    
    // Find the stage container and open the dropdown
    const stageContainer = getStageContainer(page, originalStageName);
    await stageContainer.getByTestId('dropdown-icon').click();
    
    // Click "Edit stage"
    await page.getByText('Edit stage').click();
    
    // Update the name and description
    const updatedStageName = generateUniqueName('UpdatedStage');
    const updatedDescription = generateUniqueDescription('Updated description');
    
    await page.getByRole('textbox', { name: 'Name' }).fill(updatedStageName);
    await page.getByRole('textbox', { name: 'Description' }).fill(updatedDescription);
    
    // Save the changes
    await page.getByRole('button', { name: 'Save' }).click();
    await waitForModalToClose(page, 'stage-modal');
    
    // Verify the updated name and description are visible
    await expect(page.getByText(updatedStageName)).toBeVisible();
    await expect(page.getByText(updatedDescription)).toBeVisible();
    
    // Verify the original name and description are no longer visible
    await expect(page.getByText(originalStageName)).not.toBeVisible();
    await expect(page.getByText(originalDescription)).not.toBeVisible();
  });

  test('should not allow archiving tasks when stage is empty', async ({ page }) => {
    const stageName = generateUniqueName('EmptyStageArchive');
    const stageDescription = generateUniqueDescription('No tasks here');
    
    await createStage(page, stageName, stageDescription);
    
    // Verify the stage was created
    await expect(page.getByText(stageName)).toBeVisible();
    
    // Open the stage dropdown
    const stageContainer = getStageContainer(page, stageName);
    await stageContainer.getByTestId('dropdown-icon').click();
    
    // Get the archive menu item
    const archiveItem = page.getByRole('menuitem').filter({ hasText: 'Archive all stage tasks' });
    
    // Verify the button is visible but disabled (has line-through and cursor not-allowed)
    await expect(archiveItem).toBeVisible();
    await expect(archiveItem).toHaveCSS('text-decoration-line', 'line-through');
    await expect(archiveItem).toHaveCSS('cursor', 'not-allowed');
    
    // Hover over the disabled button to show tooltip
    await archiveItem.hover();
    
    // Verify the tooltip message appears
    await expect(page.getByText('No tasks to archive on the stage')).toBeVisible();
  });

  test('should archive all tasks on a stage', async ({ page }) => {
    const stageName = generateUniqueName('StageWithTasks');
    const stageDescription = generateUniqueDescription('Has tasks to archive');
    
    await createStage(page, stageName, stageDescription);
    
    // Verify the stage was created
    await expect(page.getByText(stageName)).toBeVisible();
    
    // Add multiple tasks to the stage
    const stageContainer = getStageContainer(page, stageName);
    
    // Add first task
    await stageContainer.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill('Task 1');
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText('Task 1')).toBeVisible();
    
    // Add second task
    await stageContainer.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill('Task 2');
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText('Task 2')).toBeVisible();
    
    // Open the stage dropdown
    await stageContainer.getByTestId('dropdown-icon').first().click();
    
    // Click archive all tasks
    await page.getByRole('menuitem').filter({ hasText: 'Archive all stage tasks' }).click();
    
    // Confirm archiving
    await page.getByRole('button', { name: 'Yes' }).click();
    
    // Wait for the archive operation to complete
    await page.waitForTimeout(500);
    
    // Verify the tasks are no longer visible (archived)
    await expect(page.getByText('Task 1')).not.toBeVisible();
    await expect(page.getByText('Task 2')).not.toBeVisible();
  });
});

test.describe('Stage Ordering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    // Create a board for stage ordering tests
    await createBoard(page, generateUniqueName('OrderTestBoard'), generateUniqueDescription('Board for ordering tests'));
  });

  test('should show correct move options for first, middle, and last stages', async ({ page }) => {
    // Create three stages
    const firstStageName = generateUniqueName('FirstStage');
    const middleStageName = generateUniqueName('MiddleStage');
    const lastStageName = generateUniqueName('LastStage');
    
    await createStage(page, firstStageName, 'First stage description');
    await createStage(page, middleStageName, 'Middle stage description');
    await createStage(page, lastStageName, 'Last stage description');
    
    // Verify all stages are created
    await expect(page.getByText(firstStageName)).toBeVisible();
    await expect(page.getByText(middleStageName)).toBeVisible();
    await expect(page.getByText(lastStageName)).toBeVisible();
    
    // Test first stage - should only have "Move right"
    const firstStageContainer = getStageContainer(page, firstStageName);
    await firstStageContainer.getByTestId('dropdown-icon').click();
    
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move right' }).first()).toBeVisible();
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move left' })).toHaveCount(0);
    
    // Close the dropdown by clicking elsewhere
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    
    // Test middle stage - should have both "Move left" and "Move right"
    const middleStageContainer = getStageContainer(page, middleStageName);
    await middleStageContainer.getByTestId('dropdown-icon').click();
    
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move left' }).first()).toBeVisible();
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move right' }).first()).toBeVisible();
    
    // Close the dropdown by clicking elsewhere
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    
    // Test last stage - should only have "Move left"
    const lastStageContainer = getStageContainer(page, lastStageName);
    await lastStageContainer.getByTestId('dropdown-icon').click();
    
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move left' }).first()).toBeVisible();
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move right' })).toHaveCount(0);
  });

  test('should move stage to the right', async ({ page }) => {
    // Create two stages
    const stage1Name = generateUniqueName('Stage1');
    const stage2Name = generateUniqueName('Stage2');
    
    await createStage(page, stage1Name, 'Stage 1 description');
    await createStage(page, stage2Name, 'Stage 2 description');
    
    // Get all stage containers in order
    const stages = page.locator('div[data-stage-id]');
    
    // Verify initial order: stage1 comes before stage2
    const initialFirstStage = stages.first();
    await expect(initialFirstStage.getByText(stage1Name)).toBeVisible();
    
    // Click the first stage dropdown and move it right
    await initialFirstStage.getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem').filter({ hasText: 'Move right' }).click();
    
    // Wait for the move operation to complete
    await page.waitForTimeout(500);
    
    // Verify new order: stage2 should now be first
    const newFirstStage = stages.first();
    await expect(newFirstStage.getByText(stage2Name)).toBeVisible();
    
    // Verify stage1 is now second
    const newSecondStage = stages.nth(1);
    await expect(newSecondStage.getByText(stage1Name)).toBeVisible();
  });

  test('should move stage to the left', async ({ page }) => {
    // Create two stages
    const stage1Name = generateUniqueName('Stage1');
    const stage2Name = generateUniqueName('Stage2');
    
    await createStage(page, stage1Name, 'Stage 1 description');
    await createStage(page, stage2Name, 'Stage 2 description');
    
    // Get all stage containers in order
    const stages = page.locator('div[data-stage-id]');
    
    // Verify initial order: stage2 is second
    const initialSecondStage = stages.nth(1);
    await expect(initialSecondStage.getByText(stage2Name)).toBeVisible();
    
    // Click the second stage dropdown and move it left
    await initialSecondStage.getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem').filter({ hasText: 'Move left' }).click();
    
    // Wait for the move operation to complete
    await page.waitForTimeout(500);
    
    // Verify new order: stage2 should now be first
    const newFirstStage = stages.first();
    await expect(newFirstStage.getByText(stage2Name)).toBeVisible();
    
    // Verify stage1 is now second
    const newSecondStage = stages.nth(1);
    await expect(newSecondStage.getByText(stage1Name)).toBeVisible();
  });
});
