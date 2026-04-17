import { test, expect } from '@playwright/test';
import { navigateToBoardsPage, createBoard, createStage, generateUniqueName, generateUniqueDescription, getTaskCard, getStageContainer } from './utils';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    // Create a board and stage for task tests
    await createBoard(page, generateUniqueName('TaskTestBoard'), generateUniqueDescription('Board for task testing'));
    await createStage(page, generateUniqueName('TaskStage'), generateUniqueDescription('Stage for tasks'));
  });

  test('should add a task and delete it', async ({ page }) => {
    const taskName = generateUniqueName('TestTask');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();
    
    // Find the task card and open its dropdown
    const taskCard = getTaskCard(page, taskName);
    await taskCard.getByTestId('dropdown-icon').click();
    
    // Click "Delete task"
    await page.getByText('Delete task').click();
    
    // Confirm deletion
    await page.getByRole('button', { name: 'Delete' }).click();
    
    // Verify the task is no longer visible
    await expect(page.getByText(taskName)).not.toBeVisible();
  });

  test('should move a task to another stage', async ({ page }) => {
    // Create two stages
    const stage1Name = generateUniqueName('Stage1');
    const stage2Name = generateUniqueName('Stage2');
    
    await createStage(page, stage1Name, 'First stage');
    await createStage(page, stage2Name, 'Second stage');
    
    // Add a task to the first stage
    const taskName = generateUniqueName('MoveTask');
    const stage1Container = getStageContainer(page, stage1Name);
    await stage1Container.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    // Verify task was created in stage 1
    await expect(stage1Container.getByText(taskName)).toBeVisible();
    
    // Open the task dropdown
    const taskCard = getTaskCard(page, taskName);
    await taskCard.getByTestId('dropdown-icon').click();
    
    // Click "Move task"
    await page.getByText('Move task').click();
    
    // Select the second stage
    await page.locator('#move-task-stage-selection').selectOption({ label: stage2Name });
    
    // Select order (first position)
    await page.locator('#move-task-order-selection').selectOption({ label: '1' });
    
    // Click Apply
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Wait for the move operation to complete
    await page.waitForTimeout(500);
    
    // Verify task is no longer in stage 1
    await expect(stage1Container.getByText(taskName)).not.toBeVisible();
    
    // Verify task is now in stage 2
    const stage2Container = getStageContainer(page, stage2Name);
    await expect(stage2Container.getByText(taskName)).toBeVisible();
  });

  test('should open task color modal and apply color', async ({ page }) => {
    const taskName = generateUniqueName('ColorTask');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();
    
    // Get the task card before applying color
    const taskCard = getTaskCard(page, taskName);
    
    // Open the task dropdown
    await taskCard.getByTestId('dropdown-icon').click();
    
    // Click "Color" menu item
    await page.getByRole('menuitem').filter({ hasText: 'Color' }).click();
    
    // Verify the color modal opened
    await expect(page.getByText('Task focus color')).toBeVisible();
    
    // Verify color picker is visible
    await expect(page.locator('.w-color-colorful').first()).toBeVisible();
    
    // Verify the buttons are present
    await expect(page.getByRole('button', { name: 'Reset color' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apply changes' })).toBeVisible();
    
    // Click apply changes to set the default color
    await page.getByRole('button', { name: 'Apply changes' }).click();
    
    // Wait for the modal to close and color to be applied
    await page.waitForTimeout(500);
    
    // Verify the task is still visible
    await expect(page.getByText(taskName)).toBeVisible();
    
    // Verify the focus color was applied by checking the border-top style on the child div
    const taskCardInner = taskCard.locator('> div').first();
    
    const borderTopWidth = await taskCardInner.evaluate((el) => {
      return window.getComputedStyle(el).borderTopWidth;
    });
    
    const borderTopStyle = await taskCardInner.evaluate((el) => {
      return window.getComputedStyle(el).borderTopStyle;
    });
    
    const borderTopColor = await taskCardInner.evaluate((el) => {
      return window.getComputedStyle(el).borderTopColor;
    });
    
    // Verify border-top is set with 6px solid and the default blue color
    expect(borderTopWidth).toBe('6px');
    expect(borderTopStyle).toBe('solid');
    expect(borderTopColor).toBe('rgb(29, 78, 216)'); // Default blue color
  });

  test('should archive a task', async ({ page }) => {
    const taskName = generateUniqueName('ArchiveTask');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();
    
    // Find the task card and open its dropdown
    const taskCard = getTaskCard(page, taskName);
    await taskCard.getByTestId('dropdown-icon').click();
    
    // Click "Archive task"
    await page.getByText('Archive task', { exact: true }).click();
    
    // Confirm archiving (the confirmation tooltip appears)
    await expect(page.getByText('Are you sure you want to archive this task?')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    
    // Verify the task is no longer visible
    await expect(page.getByText(taskName)).not.toBeVisible();
  });

  test('should open task modal and edit name and description', async ({ page }) => {
    const taskName = generateUniqueName('EditableTask');
    const newName = `${taskName} edited`;
    const newDescription = 'Large pizza and a soda. edited';

    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    // Open the task modal by clicking the task card itself
    await taskCard.click();

    // Edit name and description in the modal
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
    await page.getByRole('textbox', { name: 'Description' }).fill(newDescription);

    // Wait for update
    await page.waitForTimeout(1000);

    await page.getByTestId('wpqt-modal-close-button').click();

    // Verify updated task appears on the board
    await expect(page.getByText(newName)).toBeVisible();
    await expect(page.getByText(newDescription)).toBeVisible();
  });

  test('should archive a task via task modal', async ({ page }) => {
    const taskName = generateUniqueName('ModalArchiveTask');

    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    // Open the task modal by clicking the task card itself
    await taskCard.click();

    // Click the Archive task element (it's rendered as a div)
    await page.getByText('Archive task', { exact: true }).click();

    // Confirm archiving
    await expect(page.getByText('Are you sure you want to archive this task?')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();

    // Wait for the operation to complete
    await page.waitForTimeout(500);

    // Verify the task is no longer visible on the board
    await expect(page.getByText(taskName)).not.toBeVisible();
  });

  test('should delete a task via task modal', async ({ page }) => {
    const taskName = generateUniqueName('ModalDeleteTask');

    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    // Open the task modal by clicking the task card itself
    await taskCard.click();

    // Click the Delete task element inside the modal (rendered as a div/button)
    await page.getByText('Delete task', { exact: true }).click();

    // Confirm deletion (confirm tooltip/button)
    await page.getByRole('button', { name: 'Yes' }).click();

    // Wait for the operation to complete
    await page.waitForTimeout(500);

    // Verify the task is no longer visible on the board
    await expect(page.getByText(taskName)).not.toBeVisible();
  });
});
