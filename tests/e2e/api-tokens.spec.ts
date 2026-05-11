import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  setupBoardForApiTokens,
  createApiToken,
  deleteFirstApiToken,
  openFirstApiTokenLogs,
} from './utils/api-token-helpers';

test.describe('Board API Tokens', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should show permission toggles with correct defaults in create form', async ({ page }) => {
    await setupBoardForApiTokens(page, 'AT-Permissions');

    await expect(page.getByText('Board permissions')).toBeVisible();
    await expect(page.getByText('Board stage permissions')).toBeVisible();
    await expect(page.getByText('Board task permissions')).toBeVisible();

    await expect(page.getByRole('switch', { name: 'GET board' })).toBeChecked();

    const uncheckedPermissions = [
      'PATCH board',
      'GET stages', 'POST stages', 'PATCH stages', 'DELETE stages',
      'GET tasks', 'POST tasks', 'PATCH tasks', 'DELETE tasks',
    ];
    for (const label of uncheckedPermissions) {
      await expect(page.getByRole('switch', { name: label })).not.toBeChecked();
    }
  });

  test('should create a token, show one-time value, and reset the form', async ({ page }) => {
    await setupBoardForApiTokens(page, 'AT-Create');

    await createApiToken(page, { name: 'Secret Token' });

    await expect(page.getByTestId('pipeline-api-token').first()).toBeVisible();
    await expect(page.getByText('Secret Token')).toBeVisible();

    await expect(page.getByText("Make sure to copy the token now. You won't be able to see it again.")).toBeVisible();
    await expect(page.getByText('Token:', { exact: true })).toBeVisible();

    await expect(page.locator('#api-token-name')).toHaveValue('');
    await expect(page.locator('#api-token-description')).toHaveValue('');
    await expect(page.getByRole('switch', { name: 'GET board' })).toBeChecked();
    await expect(page.getByRole('switch', { name: 'GET tasks' })).not.toBeChecked();
  });

  test('should create a token with a description', async ({ page }) => {
    await setupBoardForApiTokens(page, 'AT-Create-Desc');

    await createApiToken(page, { name: 'Token With Desc', description: 'Used for testing' });

    await expect(page.getByText('Used for testing')).toBeVisible();
  });

test('should create multiple tokens for the same board', async ({ page }) => {
    await setupBoardForApiTokens(page, 'AT-Create-Multiple');

    await createApiToken(page, { name: 'Token Alpha' });
    await createApiToken(page, { name: 'Token Beta' });

    await expect(page.getByText('Token Alpha')).toBeVisible();
    await expect(page.getByText('Token Beta')).toBeVisible();
    await expect(page.getByTestId('pipeline-api-token')).toHaveCount(2);
  });

  test('should delete a token', async ({ page }) => {
    await setupBoardForApiTokens(page, 'AT-Delete');

    await createApiToken(page, { name: 'Token To Delete' });
    await expect(page.getByText('Token To Delete')).toBeVisible();

    await deleteFirstApiToken(page);

    await expect(page.getByText('Token To Delete')).not.toBeVisible();
    await expect(page.getByTestId('pipeline-api-token')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Created API tokens' })).not.toBeVisible();
  });

  test('should open the logs modal for a token', async ({ page }) => {
    await setupBoardForApiTokens(page, 'AT-Logs');

    await createApiToken(page, { name: 'Logged Token' });
    await openFirstApiTokenLogs(page);

    await expect(page.getByTestId('api-token-logs-modal')).toBeVisible();
  });

  test('should show correct tokens when switching boards', async ({ page }) => {
    await setupBoardForApiTokens(page, 'AT-Switch-A');
    await createApiToken(page, { name: 'Board A Token' });

    await navigateToBoardsPage(page);
    await setupBoardForApiTokens(page, 'AT-Switch-B');

    await expect(page.getByTestId('pipeline-api-token')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Created API tokens' })).not.toBeVisible();
    await expect(page.getByText('Board A Token')).not.toBeVisible();
  });
});
