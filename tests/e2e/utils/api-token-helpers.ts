import { Page, expect } from '@playwright/test';
import { createBoard, createStage, generateUniqueName } from './board-helpers';
import { TIMEOUTS } from './timeouts';

export async function navigateToApiTokensPage(page: Page): Promise<void> {
  await page.getByText('API tokens').click();
  await expect(page.getByRole('heading', { name: 'Create a new API token' })).toBeVisible({
    timeout: TIMEOUTS.NAVIGATION,
  });
}

export async function setupBoardForApiTokens(
  page: Page,
  prefix: string,
): Promise<{ boardName: string }> {
  const boardName = generateUniqueName(`${prefix}-Board`);
  await createBoard(page, boardName, '');
  await createStage(page, generateUniqueName(`${prefix}-Stage`), '');
  await navigateToApiTokensPage(page);
  return { boardName };
}

type CreateApiTokenOptions = {
  name?: string;
  description?: string;
};

export async function createApiToken(
  page: Page,
  options: CreateApiTokenOptions = {},
): Promise<void> {
  const { name = 'Test Token', description } = options;

  await page.locator('#api-token-name').fill(name);

  if (description) {
    await page.locator('#api-token-description').fill(description);
  }

  await page.getByRole('button', { name: 'Create API Token' }).click();
  await expect(page.getByTestId('pipeline-api-token').first()).toBeVisible({
    timeout: TIMEOUTS.NAVIGATION,
  });
}

export async function deleteFirstApiToken(page: Page): Promise<void> {
  const tokenCard = page.getByTestId('pipeline-api-token').first();
  await tokenCard.getByTestId('dropdown-icon').click();
  await page.getByText('Delete token', { exact: true }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
}

export async function openFirstApiTokenLogs(page: Page): Promise<void> {
  const tokenCard = page.getByTestId('pipeline-api-token').first();
  await tokenCard.getByTestId('dropdown-icon').click();
  await page.getByText('View logs', { exact: true }).click();
  await expect(page.getByTestId('api-token-logs-modal')).toBeVisible();
}
