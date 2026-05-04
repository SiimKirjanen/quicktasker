import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, generateUniqueName, generateUniqueDescription, getStageContainer } from './utils/board-helpers';
import { waitForModalToClose } from './utils/modal-helpers';

test.describe('Stage Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('StageTestBoard'), generateUniqueDescription('Board for verification'));
  });

  test('should create a new stage and verify it was created', async ({ page }) => {
    const stageName = generateUniqueName('DevPhase');
    const stageDescription = generateUniqueDescription('Active tasks');

    await createStage(page, stageName, stageDescription);

    await expect(page.getByText(stageName)).toBeVisible();
    await expect(page.getByText(stageDescription)).toBeVisible();
  });

  test('should delete an empty stage', async ({ page }) => {
    const stageName = generateUniqueName('EmptyStage');
    const stageDescription = generateUniqueDescription('Stage to delete');

    await createStage(page, stageName, stageDescription);

    await expect(page.getByText(stageName)).toBeVisible();

    const stageContainer = getStageContainer(page, stageName);
    await stageContainer.getByTestId('dropdown-icon').click();

    await page.getByText('Delete stage').click();

    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByText(stageName)).not.toBeVisible();
  });

  test('should not allow deleting a stage with tasks', async ({ page }) => {
    const stageName = generateUniqueName('StageWithTask');
    const stageDescription = generateUniqueDescription('Has tasks');

    await createStage(page, stageName, stageDescription);

    await expect(page.getByText(stageName)).toBeVisible();

    const stageContainer = getStageContainer(page, stageName);
    await stageContainer.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill('Test Task');
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText('Test Task')).toBeVisible();

    await stageContainer.getByTestId('dropdown-icon').first().click();

    const deleteItem = page.getByRole('menuitem').filter({ hasText: 'Delete stage' });

    await expect(deleteItem).toBeVisible();
    await expect(deleteItem).toHaveCSS('text-decoration-line', 'line-through');
    await expect(deleteItem).toHaveCSS('cursor', 'not-allowed');

    await deleteItem.hover();

    await expect(page.getByText('Stage can be deleted when there are no tasks on it')).toBeVisible();

    await expect(page.getByText(stageName)).toBeVisible();
    await expect(page.getByText('Test Task')).toBeVisible();
  });

  test('should edit stage name and description', async ({ page }) => {
    const originalStageName = generateUniqueName('OriginalStage');
    const originalDescription = generateUniqueDescription('Original description');

    await createStage(page, originalStageName, originalDescription);

    await expect(page.getByText(originalStageName)).toBeVisible();
    await expect(page.getByText(originalDescription)).toBeVisible();

    const stageContainer = getStageContainer(page, originalStageName);
    await stageContainer.getByTestId('dropdown-icon').click();

    await page.getByText('Edit stage').click();

    const updatedStageName = generateUniqueName('UpdatedStage');
    const updatedDescription = generateUniqueDescription('Updated description');

    await page.getByRole('textbox', { name: 'Name' }).fill(updatedStageName);
    await page.getByRole('textbox', { name: 'Description' }).fill(updatedDescription);

    await page.getByRole('button', { name: 'Save' }).click();
    await waitForModalToClose(page, 'stage-modal');

    await expect(page.getByText(updatedStageName)).toBeVisible();
    await expect(page.getByText(updatedDescription)).toBeVisible();

    await expect(page.getByText(originalStageName)).not.toBeVisible();
    await expect(page.getByText(originalDescription)).not.toBeVisible();
  });

  test('should not allow archiving tasks when stage is empty', async ({ page }) => {
    const stageName = generateUniqueName('EmptyStageArchive');
    const stageDescription = generateUniqueDescription('No tasks here');

    await createStage(page, stageName, stageDescription);

    await expect(page.getByText(stageName)).toBeVisible();

    const stageContainer = getStageContainer(page, stageName);
    await stageContainer.getByTestId('dropdown-icon').click();

    const archiveItem = page.getByRole('menuitem').filter({ hasText: 'Archive all stage tasks' });

    await expect(archiveItem).toBeVisible();
    await expect(archiveItem).toHaveCSS('text-decoration-line', 'line-through');
    await expect(archiveItem).toHaveCSS('cursor', 'not-allowed');

    await archiveItem.hover();

    await expect(page.getByText('No tasks to archive on the stage')).toBeVisible();
  });

  test('should archive all tasks on a stage', async ({ page }) => {
    const stageName = generateUniqueName('StageWithTasks');
    const stageDescription = generateUniqueDescription('Has tasks to archive');

    await createStage(page, stageName, stageDescription);

    await expect(page.getByText(stageName)).toBeVisible();

    const stageContainer = getStageContainer(page, stageName);

    await stageContainer.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill('Task 1');
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText('Task 1')).toBeVisible();

    await stageContainer.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill('Task 2');
    await page.getByPlaceholder('Task name').press('Enter');
    await expect(page.getByText('Task 2')).toBeVisible();

    await stageContainer.getByTestId('dropdown-icon').first().click();

    await page.getByRole('menuitem').filter({ hasText: 'Archive all stage tasks' }).click();

    await page.getByRole('button', { name: 'Yes' }).click();

    await page.waitForTimeout(500);

    await expect(page.getByText('Task 1')).not.toBeVisible();
    await expect(page.getByText('Task 2')).not.toBeVisible();
  });
});

test.describe('Stage Ordering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('OrderTestBoard'), generateUniqueDescription('Board for ordering tests'));
  });

  test('should show correct move options for first, middle, and last stages', async ({ page }) => {
    const firstStageName = generateUniqueName('FirstStage');
    const middleStageName = generateUniqueName('MiddleStage');
    const lastStageName = generateUniqueName('LastStage');

    await createStage(page, firstStageName, 'First stage description');
    await createStage(page, middleStageName, 'Middle stage description');
    await createStage(page, lastStageName, 'Last stage description');

    await expect(page.getByText(firstStageName)).toBeVisible();
    await expect(page.getByText(middleStageName)).toBeVisible();
    await expect(page.getByText(lastStageName)).toBeVisible();

    const firstStageContainer = getStageContainer(page, firstStageName);
    await firstStageContainer.getByTestId('dropdown-icon').click();

    await expect(page.getByRole('menuitem').filter({ hasText: 'Move right' }).first()).toBeVisible();
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move left' })).toHaveCount(0);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    const middleStageContainer = getStageContainer(page, middleStageName);
    await middleStageContainer.getByTestId('dropdown-icon').click();

    await expect(page.getByRole('menuitem').filter({ hasText: 'Move left' }).first()).toBeVisible();
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move right' }).first()).toBeVisible();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    const lastStageContainer = getStageContainer(page, lastStageName);
    await lastStageContainer.getByTestId('dropdown-icon').click();

    await expect(page.getByRole('menuitem').filter({ hasText: 'Move left' }).first()).toBeVisible();
    await expect(page.getByRole('menuitem').filter({ hasText: 'Move right' })).toHaveCount(0);
  });

  test('should move stage right and back left', async ({ page }) => {
    const stage1Name = generateUniqueName('Stage1');
    const stage2Name = generateUniqueName('Stage2');

    await createStage(page, stage1Name, 'Stage 1 description');
    await createStage(page, stage2Name, 'Stage 2 description');

    const stages = page.locator('div[data-stage-id]');

    await expect(stages.first().getByText(stage1Name)).toBeVisible();

    await stages.first().getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem').filter({ hasText: 'Move right' }).click();

    await page.waitForTimeout(500);

    await expect(stages.first().getByText(stage2Name)).toBeVisible();
    await expect(stages.nth(1).getByText(stage1Name)).toBeVisible();

    await stages.nth(1).getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem').filter({ hasText: 'Move left' }).click();

    await page.waitForTimeout(500);

    await expect(stages.first().getByText(stage1Name)).toBeVisible();
    await expect(stages.nth(1).getByText(stage2Name)).toBeVisible();
  });
});
