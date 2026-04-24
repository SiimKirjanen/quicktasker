import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  setupBoardForWebhooks,
  createWebhook,
  deleteFirstWebhook,
  openFirstWebhookLogs,
  TEST_WEBHOOK_URL,
} from './utils/webhook-helpers';

test.describe('Board Webhooks', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  // --- Page structure ---

  test('should display the webhooks page with create form', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Page');

    await expect(page.getByRole('heading', { name: 'Board webhooks' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Created webhooks' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Create a new webhook' })).toBeVisible();
    await expect(page.getByText('There are no webhooks configured for this board.')).toBeVisible();
    await expect(page.locator('#webhook-target-type')).toBeVisible();
    await expect(page.locator('#webhook-target-action')).toBeVisible();
    await expect(page.locator('#webhook-url')).toBeVisible();
    await expect(page.getByText('Create Webhook')).toBeVisible();
  });

  test('should show all task target actions in the action dropdown', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Actions');

    const actionSelect = page.locator('#webhook-target-action');
    await expect(actionSelect).toBeVisible();

    const expectedActions = [
      'created', 'updated', 'deleted', 'stage-changed',
      'completed', 'not-completed', 'restored-archived',
      'comment-added', 'file-added', 'file-removed',
      'label-added', 'label-removed', 'assigned', 'unassigned',
    ];

    for (const action of expectedActions) {
      await expect(actionSelect.locator(`option[value="${action}"]`)).toHaveCount(1);
    }
  });

  // --- URL validation ---

  test('should disable Create Webhook button when URL is empty', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Validate-Empty');

    await expect(page.locator('div[aria-disabled]').filter({ hasText: 'Create Webhook' })).toHaveAttribute('aria-disabled', 'true');
  });

  test('should show validation error and keep button disabled for invalid URL', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Validate-Invalid');

    await page.locator('#webhook-url').fill('not-a-url');
    await expect(page.getByText('Please enter a valid URL')).toBeVisible();
    await expect(page.locator('div[aria-disabled]').filter({ hasText: 'Create Webhook' })).toHaveAttribute('aria-disabled', 'true');
  });

  test('should enable Create Webhook button for valid URL', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Validate-Valid');

    await page.locator('#webhook-url').fill(TEST_WEBHOOK_URL);
    await expect(page.locator('div[aria-disabled]').filter({ hasText: 'Create Webhook' })).toHaveAttribute('aria-disabled', 'false');
  });

  // --- Create webhook ---

  test('should create a webhook with default settings (task created)', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Create-Default');

    await createWebhook(page);

    await expect(page.getByText('task').first()).toBeVisible();
    await expect(page.getByText('created').first()).toBeVisible();
    await expect(page.getByText(TEST_WEBHOOK_URL).first()).toBeVisible();
  });

  test('should reset form after successful webhook creation', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Create-Reset');

    await createWebhook(page);

    await expect(page.locator('#webhook-url')).toHaveValue('');
    await expect(page.locator('#webhook-target-action')).toHaveValue('created');
    await expect(page.locator('div[aria-disabled]').filter({ hasText: 'Create Webhook' })).toHaveAttribute('aria-disabled', 'true');
  });

  test('should create a webhook with stage-changed action', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Create-StageChanged');

    await createWebhook(page, { action: 'stage-changed' });

    await expect(page.getByText('stage-changed').first()).toBeVisible();
    await expect(page.getByText(TEST_WEBHOOK_URL).first()).toBeVisible();
  });

  test('should create a webhook with comment-added action', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Create-CommentAdded');

    await createWebhook(page, { action: 'comment-added' });

    await expect(page.getByText('comment-added').first()).toBeVisible();
    await expect(page.getByText(TEST_WEBHOOK_URL).first()).toBeVisible();
  });

  test('should create a webhook with wait-for-response enabled', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Create-WaitForResponse');

    await createWebhook(page, { waitForResponse: true });

    // The created webhook row has a "Wait for response" section with a checked toggle
    // There are two switches per webhook row: wait-for-response and active
    // wait-for-response is the first switch in the row
    await expect(page.getByRole('switch').first()).toBeChecked();
  });

  test('should create multiple webhooks for the same board', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Create-Multiple');

    await createWebhook(page, { action: 'created' });
    await createWebhook(page, { action: 'deleted' });

    await expect(page.getByText('created').first()).toBeVisible();
    await expect(page.getByText('deleted').first()).toBeVisible();
  });

  // --- Delete webhook ---

  test('should delete a webhook', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Delete');

    await createWebhook(page);
    await expect(page.getByText(TEST_WEBHOOK_URL).first()).toBeVisible();

    await deleteFirstWebhook(page);

    await expect(page.getByText(TEST_WEBHOOK_URL)).not.toBeVisible();
    await expect(page.getByText('There are no webhooks configured for this board.')).toBeVisible();
  });

  test('should show confirmation dialog before deleting', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Delete-Confirm');

    await createWebhook(page);

    await page.getByTestId('pipeline-webhook').first().getByText('Delete', { exact: true }).click();
    await expect(page.getByText('Are you sure you want to delete this webhook?')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
  });

  // --- Active/inactive toggle ---

  test('should toggle webhook active state', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Toggle');

    await createWebhook(page);

    // Webhook is created as active by default — toggle it off then back on
    // There are two switches in a webhook row: wait-for-response (1st) and active (2nd in Controls)
    const activeToggle = page.getByRole('switch').nth(1);

    await expect(activeToggle).toBeChecked();
    await activeToggle.click({ force: true });
    await expect(activeToggle).not.toBeChecked();

    await activeToggle.click({ force: true });
    await expect(activeToggle).toBeChecked();
  });

  // --- Logs modal ---

  test('should open webhook logs modal', async ({ page }) => {
    await setupBoardForWebhooks(page, 'WH-Logs');

    await createWebhook(page);
    await openFirstWebhookLogs(page);

    await expect(page.getByTestId('webhook-logs-modal')).toBeVisible();
  });

  // --- Board switching ---

  test('should show correct webhooks when switching boards', async ({ page }) => {
    // Create first board with a webhook
    await setupBoardForWebhooks(page, 'WH-Switch-A');
    await createWebhook(page, { action: 'created', url: 'https://board-one.example.com/wh' });

    // Navigate back and create second board (no webhooks)
    await navigateToBoardsPage(page);
    await setupBoardForWebhooks(page, 'WH-Switch-B');

    await expect(page.getByText('There are no webhooks configured for this board.')).toBeVisible();
    await expect(page.getByText('https://board-one.example.com/wh')).not.toBeVisible();
  });
});
