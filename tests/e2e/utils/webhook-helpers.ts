import { Page, expect } from '@playwright/test';
import { createBoard, createStage, generateUniqueName } from './board-helpers';
import { TIMEOUTS } from './timeouts';

export const TEST_WEBHOOK_URL = 'https://example.com/webhook';

export async function navigateToWebhooksPage(page: Page): Promise<void> {
  await page.getByText('Webhooks').click();
  await expect(page.getByRole('heading', { name: 'Create a new webhook' })).toBeVisible({
    timeout: TIMEOUTS.NAVIGATION,
  });
}

export async function setupBoardForWebhooks(
  page: Page,
  prefix: string,
): Promise<{ boardName: string }> {
  const boardName = generateUniqueName(`${prefix}-Board`);
  await createBoard(page, boardName, '');
  await createStage(page, generateUniqueName(`${prefix}-Stage`), '');
  await navigateToWebhooksPage(page);
  return { boardName };
}

type CreateWebhookOptions = {
  action?: string;
  waitForResponse?: boolean;
  url?: string;
};

export async function createWebhook(
  page: Page,
  options: CreateWebhookOptions = {},
): Promise<void> {
  const { action, waitForResponse = false, url = TEST_WEBHOOK_URL } = options;

  if (action) {
    await page.locator('#webhook-target-action').selectOption(action);
  }

  if (waitForResponse) {
    await page.getByRole('switch', { name: 'Wait for response' }).click({ force: true });
  }

  await page.locator('#webhook-url').fill(url);
  await page.getByText('Create Webhook').click();
  await expect(page.getByText('Webhook created successfully')).toBeVisible();
}

export async function deleteFirstWebhook(page: Page): Promise<void> {
  const webhookRow = page.getByTestId('pipeline-webhook').first();
  await webhookRow.getByText('Delete', { exact: true }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
}

export async function openFirstWebhookLogs(page: Page): Promise<void> {
  const webhookRow = page.getByTestId('pipeline-webhook').first();
  await webhookRow.getByText('Logs', { exact: true }).click();
  await expect(page.getByTestId('webhook-logs-modal')).toBeVisible();
}
