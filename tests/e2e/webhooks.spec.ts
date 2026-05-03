import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  setupBoardForWebhooks,
  createWebhook,
  openFirstWebhookLogs,
  TEST_WEBHOOK_URL,
} from './utils/webhook-helpers';

test.describe('Board Webhooks', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should validate URL input and toggle the Create button accordingly', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Validate');

    const createButton = page.locator('div[aria-disabled]').filter({ hasText: 'Create Webhook' });
    await expect(createButton).toHaveAttribute('aria-disabled', 'true');

    await page.locator('#webhook-url').fill('not-a-url');
    await expect(page.getByText('Please enter a valid URL')).toBeVisible();
    await expect(createButton).toHaveAttribute('aria-disabled', 'true');

    await page.locator('#webhook-url').fill(TEST_WEBHOOK_URL);
    await expect(createButton).toHaveAttribute('aria-disabled', 'false');
  });

  test('should create a webhook and reset the form', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Create-Default');

    await createWebhook(page);

    await expect(page.getByText('task').first()).toBeVisible();
    await expect(page.getByText('created').first()).toBeVisible();
    await expect(page.getByText(TEST_WEBHOOK_URL).first()).toBeVisible();

    await expect(page.locator('#webhook-url')).toHaveValue('');
    await expect(page.locator('#webhook-target-action')).toHaveValue('created');
    await expect(page.locator('div[aria-disabled]').filter({ hasText: 'Create Webhook' })).toHaveAttribute('aria-disabled', 'true');
  });

  test('should create multiple webhooks for the same board', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Create-Multiple');

    await createWebhook(page, { action: 'created' });
    await createWebhook(page, { action: 'deleted' });

    await expect(page.getByText('created').first()).toBeVisible();
    await expect(page.getByText('deleted').first()).toBeVisible();
  });

  test('should delete a webhook after confirmation', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Delete');

    await createWebhook(page);
    await expect(page.getByText(TEST_WEBHOOK_URL).first()).toBeVisible();

    await page.getByTestId('pipeline-webhook').first().getByText('Delete', { exact: true }).click();
    await expect(page.getByText('Are you sure you want to delete this webhook?')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByText(TEST_WEBHOOK_URL)).not.toBeVisible();
    await expect(page.getByText('There are no webhooks configured for this board.')).toBeVisible();
  });

  test('should open webhook logs modal', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Logs');

    await createWebhook(page);
    await openFirstWebhookLogs(page);

    await expect(page.getByTestId('webhook-logs-modal')).toBeVisible();
  });

  test('should show correct webhooks when switching boards', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Switch-A');
    await createWebhook(page, { action: 'created', url: 'https://board-one.example.com/wh' });

    await navigateToBoardsPage(page);
    await setupBoardForWebhooks(page, 'WH-Switch-B');

    await expect(page.getByText('There are no webhooks configured for this board.')).toBeVisible();
    await expect(page.getByText('https://board-one.example.com/wh')).not.toBeVisible();
  });
});
