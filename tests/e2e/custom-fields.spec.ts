import { test, expect, Page, Locator } from '@playwright/test';
import { navigateToBoardsPage, navigateToUserManagement } from './utils/navigation';
import {
  createBoard,
  createStage,
  createTask,
  generateUniqueName,
  generateUniqueDescription,
  getTaskCard,
} from './utils/board-helpers';
import { waitForModalToClose } from './utils/modal-helpers';

const CREATOR_MODAL = 'custom-field-creator-modal';

async function openBoardSettings(page: Page): Promise<void> {
  await page.locator('#wpqt-app').getByText('Settings').first().click();
  await expect(page.getByTestId('edit-pipeline-modal')).toBeVisible();
}

async function openUsersSettings(page: Page): Promise<void> {
  await page.locator('#wpqt-app').getByText('Settings', { exact: true }).click();
  await expect(page.getByTestId('users-settings-modal')).toBeVisible();
}

async function createCustomField(
  page: Page,
  name: string,
  type: 'Text' | 'Checkbox' = 'Text',
  description = '',
): Promise<void> {
  await page.locator('[data-tooltip-id="custom-field-create"]').click();
  const modal = page.getByTestId(CREATOR_MODAL);
  await expect(modal).toBeVisible();

  const textboxes = modal.getByRole('textbox');
  await textboxes.nth(0).fill(name);
  if (description) {
    await textboxes.nth(1).fill(description);
  }
  if (type !== 'Text') {
    await modal.getByRole('combobox').selectOption(type);
  }

  await modal.getByText('Add', { exact: true }).click();
  await waitForModalToClose(page, CREATOR_MODAL);
}

function customFieldRow(scope: Locator, name: string): Locator {
  // Each rendered custom field row uses the wpqt-py-4 vertical padding class.
  return scope.locator('.wpqt-py-4').filter({ hasText: name }).first();
}

async function deleteCustomField(scope: Locator, name: string): Promise<void> {
  const row = customFieldRow(scope, name);
  await row.locator('.wpqt-icon-red').first().click();
}

test.describe('Custom Fields', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(
      page,
      generateUniqueName('CF-Board'),
      generateUniqueDescription('Board for custom field tests'),
    );
    await createStage(page, generateUniqueName('CF-Stage'));
  });

  test('creates and deletes a board-level custom field', async ({ page }) => {
    const fieldName = generateUniqueName('CF-BoardField');

    await openBoardSettings(page);

    const settingsModal = page.getByTestId('edit-pipeline-modal');
    await expect(settingsModal.getByRole('heading', { name: 'Board custom fields' })).toBeVisible();
    await expect(settingsModal.getByText('No related custom fields created')).toBeVisible();

    await createCustomField(page, fieldName, 'Text', 'A board level field');

    await expect(settingsModal.getByText(fieldName)).toBeVisible();
    await expect(settingsModal.getByTestId('text-custom-field').first()).toBeVisible();

    await deleteCustomField(settingsModal, fieldName);
    await expect(settingsModal.getByText(fieldName)).not.toBeVisible();
    await expect(settingsModal.getByText('No related custom fields created')).toBeVisible();
  });

  test('board-level custom field is inherited by tasks and cannot be deleted from the task', async ({ page }) => {
    const stageName = generateUniqueName('CF-StageInherit');
    const taskName = generateUniqueName('CF-InheritTask');
    const fieldName = generateUniqueName('CF-InheritedField');

    await createStage(page, stageName);
    await createTask(page, stageName, taskName);

    await openBoardSettings(page);
    await createCustomField(page, fieldName, 'Text');
    await page.keyboard.press('Escape');
    await waitForModalToClose(page, 'edit-pipeline-modal');

    await getTaskCard(page, taskName).click();
    const taskModal = page.getByTestId('task-modal');
    await expect(taskModal).toBeVisible();

    await expect(taskModal.getByText(fieldName)).toBeVisible();

    const inheritedRow = customFieldRow(taskModal, fieldName);
    await inheritedRow.locator('[data-tooltip-id^="custom-field-"][data-tooltip-id$="-delete"]').first().hover();
    await expect(
      page.getByText(/inherited from .* settings and can't be deleted here/i),
    ).toBeVisible();
  });

  test('creates and deletes a task-specific custom field', async ({ page }) => {
    const stageName = generateUniqueName('CF-StageTask');
    const taskName = generateUniqueName('CF-Task');
    const fieldName = generateUniqueName('CF-TaskField');

    await createStage(page, stageName);
    await createTask(page, stageName, taskName);

    await getTaskCard(page, taskName).click();
    const taskModal = page.getByTestId('task-modal');
    await expect(taskModal).toBeVisible();
    await expect(taskModal.getByRole('heading', { name: 'Custom fields' })).toBeVisible();

    await createCustomField(page, fieldName, 'Checkbox', 'Task field');

    await expect(taskModal.getByText(fieldName)).toBeVisible();

    const checkbox = customFieldRow(taskModal, fieldName).locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await deleteCustomField(taskModal, fieldName);
    await expect(taskModal.getByText(fieldName)).not.toBeVisible();
  });

  test('persists task custom field value across reopening the task', async ({ page }) => {
    const stageName = generateUniqueName('CF-StagePersist');
    const taskName = generateUniqueName('CF-PersistTask');
    const fieldName = generateUniqueName('CF-PersistField');
    const fieldValue = `value-${Date.now()}`;

    await createStage(page, stageName);
    await createTask(page, stageName, taskName);

    await getTaskCard(page, taskName).click();
    const taskModal = page.getByTestId('task-modal');
    await expect(taskModal).toBeVisible();

    await createCustomField(page, fieldName, 'Text');

    const input = customFieldRow(taskModal, fieldName).getByTestId('text-custom-field');
    await input.fill(fieldValue);
    // wait for debounced save
    await page.waitForTimeout(1500);

    await page.keyboard.press('Escape');
    await waitForModalToClose(page, 'task-modal');

    await getTaskCard(page, taskName).click();
    await expect(taskModal).toBeVisible();
    await expect(customFieldRow(taskModal, fieldName).getByTestId('text-custom-field')).toHaveValue(fieldValue);
  });

  test('creates and deletes a global quicktasker custom field from User management', async ({ page }) => {
    const fieldName = generateUniqueName('CF-GlobalUserField');

    await navigateToUserManagement(page);
    await openUsersSettings(page);

    const settingsModal = page.getByTestId('users-settings-modal');
    await expect(
      settingsModal.getByRole('heading', { name: 'Global quicktasker custom fields' }),
    ).toBeVisible();

    await createCustomField(page, fieldName, 'Text', 'Global field for all quicktaskers');
    await expect(settingsModal.getByText(fieldName)).toBeVisible();

    await deleteCustomField(settingsModal, fieldName);
    await expect(settingsModal.getByText(fieldName)).not.toBeVisible();
  });

  test('board-level custom field default value persists and is inherited by tasks', async ({ page }) => {
    const stageName = generateUniqueName('CF-StageDefault');
    const taskName = generateUniqueName('CF-DefaultTask');
    const fieldName = generateUniqueName('CF-DefaultField');
    const defaultValue = `default-${Date.now()}`;

    await createStage(page, stageName);

    await openBoardSettings(page);
    await createCustomField(page, fieldName, 'Text');

    const settingsModal = page.getByTestId('edit-pipeline-modal');
    const defaultInput = customFieldRow(settingsModal, fieldName).getByTestId('text-custom-field');
    await defaultInput.fill(defaultValue);
    await page.waitForTimeout(1500);

    await page.keyboard.press('Escape');
    await waitForModalToClose(page, 'edit-pipeline-modal');

    await openBoardSettings(page);
    await expect(customFieldRow(settingsModal, fieldName).getByTestId('text-custom-field')).toHaveValue(defaultValue);
    await page.keyboard.press('Escape');
    await waitForModalToClose(page, 'edit-pipeline-modal');

    await createTask(page, stageName, taskName);
    await getTaskCard(page, taskName).click();
    const taskModal = page.getByTestId('task-modal');
    await expect(taskModal).toBeVisible();
    await expect(customFieldRow(taskModal, fieldName).getByTestId('text-custom-field')).toHaveValue(defaultValue);
  });

  test('global quicktasker custom field default value persists across reopening settings', async ({ page }) => {
    const fieldName = generateUniqueName('CF-GlobalDefaultField');
    const defaultValue = `global-default-${Date.now()}`;

    await navigateToUserManagement(page);
    await openUsersSettings(page);

    const settingsModal = page.getByTestId('users-settings-modal');
    await createCustomField(page, fieldName, 'Text');

    const defaultInput = customFieldRow(settingsModal, fieldName).getByTestId('text-custom-field');
    await defaultInput.fill(defaultValue);
    await page.waitForTimeout(1500);

    await page.keyboard.press('Escape');
    await waitForModalToClose(page, 'users-settings-modal');

    await openUsersSettings(page);
    await expect(customFieldRow(settingsModal, fieldName).getByTestId('text-custom-field')).toHaveValue(defaultValue);

    await deleteCustomField(settingsModal, fieldName);
    await expect(settingsModal.getByText(fieldName)).not.toBeVisible();
  });

  test('restores a deleted board-level custom field via the recovery modal', async ({ page }) => {
    const fieldName = generateUniqueName('CF-RestoreField');

    await openBoardSettings(page);
    await createCustomField(page, fieldName, 'Text');

    const settingsModal = page.getByTestId('edit-pipeline-modal');
    await expect(settingsModal.getByText(fieldName)).toBeVisible();

    await deleteCustomField(settingsModal, fieldName);
    await expect(settingsModal.getByText(fieldName)).not.toBeVisible();

    await page.locator('[data-tooltip-id="custom-field-restore"]').click();
    const recoveryModal = page.getByTestId('custom-field-recovery-modal');
    await expect(recoveryModal).toBeVisible();
    await expect(recoveryModal.getByText(fieldName)).toBeVisible();

    await recoveryModal.locator('.wpqt-icon-green').first().click();

    await expect(recoveryModal.getByText(fieldName)).not.toBeVisible();
    await page.keyboard.press('Escape');
    await waitForModalToClose(page, 'custom-field-recovery-modal');
    await expect(settingsModal.getByText(fieldName)).toBeVisible();
  });
});
