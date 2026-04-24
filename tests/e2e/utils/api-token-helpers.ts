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

const PERMISSION_LABELS: Record<string, string> = {
  get_pipeline: 'GET board',
  patch_pipeline: 'PATCH board',
  get_pipeline_stages: 'GET stages',
  post_pipeline_stages: 'POST stages',
  patch_pipeline_stages: 'PATCH stages',
  delete_pipeline_stages: 'DELETE stages',
  get_pipeline_tasks: 'GET tasks',
  post_pipeline_tasks: 'POST tasks',
  patch_pipeline_tasks: 'PATCH tasks',
  delete_pipeline_tasks: 'DELETE tasks',
};

type CreateApiTokenOptions = {
  name?: string;
  description?: string;
  extraPermissions?: string[];
};

export async function createApiToken(
  page: Page,
  options: CreateApiTokenOptions = {},
): Promise<void> {
  const { name = 'Test Token', description, extraPermissions = [] } = options;

  await page.locator('#api-token-name').fill(name);

  if (description) {
    await page.locator('#api-token-description').fill(description);
  }

  for (const permissionKey of extraPermissions) {
    const label = PERMISSION_LABELS[permissionKey];
    await page.getByRole('switch', { name: label }).click({ force: true });
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
