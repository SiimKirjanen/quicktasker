import { test, expect } from '@playwright/test';
import { navigateToBoardsPage, createBoard, createStage, generateUniqueName, generateUniqueDescription, getTaskCard, createLabel, selectFirstLabel } from './utils';

test.describe('Task Labels', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    // Create a board and stage for label tests
    await createBoard(page, generateUniqueName('LabelTestBoard'), generateUniqueDescription('Board for label testing'));
    await createStage(page, generateUniqueName('LabelStage'), generateUniqueDescription('Stage for label tests'));
  });

  test('should create a new label and assign it to a task', async ({ page }) => {
    const taskName = generateUniqueName('LabelTask');
    const labelName = generateUniqueName('TestLabel');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();
    
    // Find the task card and open label dropdown
    const taskCard = getTaskCard(page, taskName);
    await taskCard.getByTestId('task-label-icon').click();
    
    // Verify label dropdown opened
    await expect(page.getByText('Board labels').first()).toBeVisible();
    await expect(page.getByText('There are no labels created for this board')).toBeVisible();
    
    // Click "Create new label" button
    await page.getByText('Create new label').click();
    
    // Verify label creation form is visible
    await expect(page.getByText('Create new label').first()).toBeVisible();
    await expect(page.getByText('Label will be added to the board')).toBeVisible();
    
    // Fill in label name
    await page.locator('#new-label-name').fill(labelName);
      
    // Click Create button
    await page.getByRole('button', { name: 'Create' }).click();
    
    // Wait for label to be created and return to selection view
    await page.waitForTimeout(500);
    await expect(page.getByText('Board labels').first()).toBeVisible();
    
    // Verify the label appears in the list
    await expect(page.getByText(labelName)).toBeVisible();
    
    // Assign the label to the task
    await selectFirstLabel(page, taskCard);
    
    // Verify the label tag appears on the task card
    await expect(taskCard.getByText(labelName)).toBeVisible();
  });

  test('should unassign a label from a task', async ({ page }) => {
    const taskName = generateUniqueName('UnassignTask');
    const labelName = generateUniqueName('UnassignLabel');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    await expect(page.getByText(taskName)).toBeVisible();
    
    const taskCard = getTaskCard(page, taskName);
    
    // Create a label
    await createLabel(page, taskCard, labelName);
    
    // Assign the label
    const labelCheckbox = page.locator(`input[type="checkbox"]`).first();
    await labelCheckbox.check();
    await page.waitForTimeout(500);
    
    // Click in the dropdown to refocus it, then close with Escape
    await page.getByText('Board labels').first().click();
    await page.keyboard.press('Escape');
    
    // Verify label is assigned
    await expect(taskCard.getByText(labelName)).toBeVisible();
    
    // Open label dropdown again to unassign
    await taskCard.getByTestId('task-label-icon').click();
    
    // Uncheck the checkbox to unassign
    await labelCheckbox.uncheck();
    await page.waitForTimeout(500);
    
    // Click in the dropdown to refocus it, then close with Escape
    await page.getByText('Board labels').first().click();
    await page.keyboard.press('Escape');
    
    // Verify the label tag is no longer visible on the task card
    await expect(taskCard.getByText(labelName)).not.toBeVisible();
  });

  test('should delete a label from the board', async ({ page }) => {
    const taskName = generateUniqueName('DeleteLabelTask');
    const labelName = generateUniqueName('DeleteLabel');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    await expect(page.getByText(taskName)).toBeVisible();
    
    const taskCard = getTaskCard(page, taskName);
    
    // Create a label
    await createLabel(page, taskCard, labelName);
    
    // Verify label appears
    await expect(page.getByText(labelName)).toBeVisible();
    
    // Click the delete (trash) icon for the label
    // The trash icon should be next to the label
    const deleteButton = page.locator('.wpqt-icon-red').first();
    await deleteButton.click();
    
    // Confirm deletion
    await expect(page.getByText('Are you sure you want to delete the label from this board?')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    
    // Wait for deletion
    await page.waitForTimeout(500);
    
    // Verify the label is no longer in the list
    await expect(page.getByText(labelName)).not.toBeVisible();
    await expect(page.getByText('There are no labels created for this board')).toBeVisible();
  });

  test('should assign multiple labels to a task', async ({ page }) => {
    const taskName = generateUniqueName('MultiLabelTask');
    const label1Name = generateUniqueName('Label1');
    const label2Name = generateUniqueName('Label2');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    await expect(page.getByText(taskName)).toBeVisible();
    
    const taskCard = getTaskCard(page, taskName);
    
    // Create first label
    await createLabel(page, taskCard, label1Name);
    
    // Create second label (dropdown is still open)
    await page.getByText('Create new label').click();
    await page.locator('#new-label-name').fill(label2Name);
    await page.getByRole('button', { name: 'Create' }).click();
    await page.waitForTimeout(500);
    
    // Assign both labels
    const checkboxes = page.locator(`input[type="checkbox"]`);
    await checkboxes.nth(0).check();
    await page.waitForTimeout(300);
    await checkboxes.nth(1).check();
    await page.waitForTimeout(500);
    
    // Click in the dropdown to refocus it, then close with Escape
    await page.getByText('Board labels').first().click();
    await page.keyboard.press('Escape');
    
    // Verify both labels appear on the task card
    await expect(taskCard.getByText(label1Name)).toBeVisible();
    await expect(taskCard.getByText(label2Name)).toBeVisible();
  });
});
