import path from 'path';
import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, generateUniqueName, generateUniqueDescription, getTaskCard, getStageContainer, createTask } from './utils/board-helpers';
import { uploadFileInTaskModal } from './utils/upload-helpers';

test.describe('Task Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('TaskTestBoard'), generateUniqueDescription('Board for task testing'));
    await createStage(page, generateUniqueName('TaskStage'), generateUniqueDescription('Stage for tasks'));
  });

  test('should add a task and delete it', async ({ page }) => {
    const taskName = generateUniqueName('TestTask');

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);
    await taskCard.getByTestId('dropdown-icon').click();

    await page.getByText('Delete task').click();

    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(page.getByText(taskName)).not.toBeVisible();
  });

  test('should move a task to another stage', async ({ page }) => {
    const stage1Name = generateUniqueName('Stage1');
    const stage2Name = generateUniqueName('Stage2');

    await createStage(page, stage1Name, 'First stage');
    await createStage(page, stage2Name, 'Second stage');

    const taskName = generateUniqueName('MoveTask');
    const stage1Container = getStageContainer(page, stage1Name);
    await stage1Container.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(stage1Container.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);
    await taskCard.getByTestId('dropdown-icon').click();

    await page.getByText('Move task').click();

    await page.locator('#move-task-stage-selection').selectOption({ label: stage2Name });

    await page.locator('#move-task-order-selection').selectOption({ label: '1' });

    await page.getByRole('button', { name: 'Apply' }).click();

    await page.waitForTimeout(500);

    await expect(stage1Container.getByText(taskName)).not.toBeVisible();

    const stage2Container = getStageContainer(page, stage2Name);
    await expect(stage2Container.getByText(taskName)).toBeVisible();
  });

  test('should open task color modal and apply color', async ({ page }) => {
    const taskName = generateUniqueName('ColorTask');

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    await taskCard.getByTestId('dropdown-icon').click();

    await page.getByRole('menuitem').filter({ hasText: 'Color' }).click();

    await expect(page.getByText('Task focus color')).toBeVisible();

    await expect(page.locator('.w-color-colorful').first()).toBeVisible();

    await expect(page.getByRole('button', { name: 'Reset color' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Apply changes' })).toBeVisible();

    await page.getByRole('button', { name: 'Apply changes' }).click();

    await page.waitForTimeout(500);

    await expect(page.getByText(taskName)).toBeVisible();

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

    expect(borderTopWidth).toBe('6px');
    expect(borderTopStyle).toBe('solid');
    expect(borderTopColor).toBe('rgb(29, 78, 216)');
  });

  test('should archive a task', async ({ page }) => {
    const taskName = generateUniqueName('ArchiveTask');

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);
    await taskCard.getByTestId('dropdown-icon').click();

    await page.getByText('Archive task', { exact: true }).click();

    await expect(page.getByText('Are you sure you want to archive this task?')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByText(taskName)).not.toBeVisible();
  });

  test('should open task modal and edit name and description', async ({ page }) => {
    const taskName = generateUniqueName('EditableTask');
    const newName = `${taskName} edited`;
    const newDescription = 'Large pizza and a soda. edited';

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    await taskCard.click();

    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
    await page.getByRole('textbox', { name: 'Description' }).fill(newDescription);

    await page.waitForTimeout(1000);

    await page.getByTestId('wpqt-modal-close-button').click();

    await expect(page.getByText(newName)).toBeVisible();
    await expect(page.getByText(newDescription)).toBeVisible();
  });

  test('should archive a task via task modal', async ({ page }) => {
    const taskName = generateUniqueName('ModalArchiveTask');

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    await taskCard.click();

    await page.getByText('Archive task', { exact: true }).click();

    await expect(page.getByText('Are you sure you want to archive this task?')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();

    await page.waitForTimeout(500);

    await expect(page.getByText(taskName)).not.toBeVisible();
  });

  test('should delete a task via task modal', async ({ page }) => {
    const taskName = generateUniqueName('ModalDeleteTask');

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    await taskCard.click();

    await page.getByText('Delete task', { exact: true }).click();

    await page.getByRole('button', { name: 'Yes' }).click();

    await page.waitForTimeout(500);

    await expect(page.getByText(taskName)).not.toBeVisible();
  });

  test('should set a due date via task modal', async ({ page }) => {
    const taskName = generateUniqueName('DueDateTask');

    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    await taskCard.click();

    // Robust steps to set due date using the visible calendar day (works across months)
    await page.locator('.react-datetime-picker__calendar-button').first().click();
    await page.locator('.react-calendar__tile--now').click();

    await page.waitForTimeout(500);

    await page.getByTestId('wpqt-modal-close-button').click();

    await expect(page.getByTestId('due-date-info')).toBeVisible();
  });

  test('should upload and delete a file attachment', async ({ page }) => {
    const stageName = generateUniqueName('AttachmentStage');
    const taskName = generateUniqueName('AttachmentTask');
    const fixturePath = path.join(__dirname, 'fixtures', 'test-attachment.txt');

    await createStage(page, stageName, '');
    await createTask(page, stageName, taskName);

    const taskCard = getTaskCard(page, taskName);
    await taskCard.click();

    await uploadFileInTaskModal(page, fixturePath);

    await expect(page.getByText('test-attachment.txt')).toBeVisible();

    await page.getByTestId('delete-upload-icon').click();

    await expect(page.getByText('test-attachment.txt')).not.toBeVisible();
  });

  test('should show file info when clicking the info button on an upload', async ({ page }) => {
    const stageName = generateUniqueName('AttachmentStage');
    const taskName = generateUniqueName('AttachmentTask');
    const fixturePath = path.join(__dirname, 'fixtures', 'test-attachment.txt');

    await createStage(page, stageName, '');
    await createTask(page, stageName, taskName);

    const taskCard = getTaskCard(page, taskName);
    await taskCard.click();

    await uploadFileInTaskModal(page, fixturePath);

    await expect(page.getByText('test-attachment.txt')).toBeVisible();

    await page.getByTestId('upload-info-button').click();

    await expect(page.getByText('File name', { exact: true })).toBeVisible();
    await expect(page.getByText('File link')).toBeVisible();
    await expect(page.getByText('Created at')).toBeVisible();
  });
});
