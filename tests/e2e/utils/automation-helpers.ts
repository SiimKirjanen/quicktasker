import { Page, expect } from '@playwright/test';
import { createBoard, createStage, createTask, generateUniqueName } from './board-helpers';

export async function setupBoardForAutomations(
  page: Page,
  prefix: string,
): Promise<{ boardName: string; stageName: string; taskName: string }> {
  const boardName = generateUniqueName(`${prefix}-Board`);
  const stageName = generateUniqueName(`${prefix}-Stage`);
  const taskName = generateUniqueName(`${prefix}-Task`);
  await createBoard(page, boardName, '');
  await createStage(page, stageName, '');
  await createTask(page, stageName, taskName);
  await navigateToAutomationsPage(page);
  return { boardName, stageName, taskName };
}

export async function navigateToAutomationsPage(page: Page): Promise<void> {
  await page.getByText('Automations').click();
  await expect(page.getByRole('heading', { name: 'Create a new automation' })).toBeVisible();
}

type CreateTaskAutomationOptions = {
  email?: string;
  slackWebhook?: string;
  wpUser?: string;
};

/**
 * Creates a Task-target automation by clicking through the 3-step wizard.
 * Waits for the wizard to reset to step 1, indicating successful creation.
 */
export async function createTaskAutomation(
  page: Page,
  triggerText: string,
  actionText: string,
  options?: CreateTaskAutomationOptions,
): Promise<void> {
  const wizard = page.getByTestId('automation-creation-steps');

  // Step 1: Select "Task" target
  await expect(page.getByText('Step 1. Select a target', { exact: true })).toBeVisible();
  await wizard.getByText('Task', { exact: true }).click();

  // Step 2: Select trigger
  await expect(page.getByText('Step 2. Select a trigger', { exact: true })).toBeVisible();
  await wizard.getByText(triggerText, { exact: true }).click();

  // Step 3: Select action
  await expect(page.getByText('Step 3. Select action', { exact: true })).toBeVisible();
  await wizard.getByText(actionText, { exact: true }).click();

  // Step 4 (optional): Fill email metadata
  if (options?.email) {
    await expect(page.getByText('Email will be sent to', { exact: true })).toBeVisible();
    await page.locator('#automation-meta-email-input').fill(options.email);
    await page.getByRole('button', { name: 'Set email' }).click();
  }

  // Step 4 (optional): Fill Slack webhook metadata
  if (options?.slackWebhook) {
    await expect(page.getByLabel('Slack webhook URL')).toBeVisible();
    await page.locator('#automation-meta-slack-webhook-input').fill(options.slackWebhook);
    await page.getByRole('button', { name: 'Set webhook URL' }).click();
  }

  // Step 4 (optional): Select a WordPress user for "Assign user" action
  if (options?.wpUser) {
    await page.getByTestId('automation-action-target-btn').click();
    await page.getByRole('menu').getByText(options.wpUser, { exact: true }).click();
  }

  // Submit
  await page.getByText('Create automation').click();

  // Wait for wizard to reset (step 1 reappears), indicating successful creation
  await expect(page.getByText('Step 1. Select a target', { exact: true })).toBeVisible();
}

/**
 * Ensures the first (and typically only) automation on the page is active.
 */
export async function enableAutomation(page: Page): Promise<void> {
  const automationRow = page.getByTestId('pipeline-automation').first();
  const isInactive = await automationRow
    .getByText('Inactive', { exact: true })
    .isVisible();
  if (isInactive) {
    await automationRow.getByTestId('dropdown-icon').click();
    await page.getByText('Activate', { exact: true }).click();
    await expect(automationRow.getByText('Active', { exact: true })).toBeVisible();
  }
}

export async function openFirstAutomationLogs(page: Page): Promise<void> {
  const automationRow = page.getByTestId('pipeline-automation').first();
  await automationRow.getByTestId('dropdown-icon').click();
  await page.getByText('View logs', { exact: true }).click();
  await expect(page.getByTestId('automation-logs-modal')).toBeVisible();
}

export async function deleteFirstAutomation(page: Page): Promise<void> {
  const automationRow = page.getByTestId('pipeline-automation').first();
  await automationRow.getByTestId('dropdown-icon').click();
  await page.getByText('Delete automation', { exact: true }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
}
