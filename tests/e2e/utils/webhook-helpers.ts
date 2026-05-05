import { Page, APIRequestContext, expect, request } from '@playwright/test';
import { createBoard, createStage, generateUniqueName } from './board-helpers';
import { TIMEOUTS } from './timeouts';

export const TEST_WEBHOOK_URL = 'https://example.com/webhook';
export const RECEIVER_BASE_URL = 'http://localhost:8889';

export type CapturedRequest = {
  method: string;
  headers: Record<string, string[]>;
  body: Record<string, unknown> | null;
  received_at: number;
};

export function uniqueWebhookUrl(): { id: string; url: string } {
  const id = `wh-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return { id, url: `${RECEIVER_BASE_URL}/wp-json/qt-test/v1/capture/${id}` };
}

export async function waitForCapturedRequest(
  id: string,
  opts: { timeoutMs?: number } = {},
): Promise<CapturedRequest> {
  const timeoutMs = opts.timeoutMs ?? 5000;
  const deadline = Date.now() + timeoutMs;
  const ctx: APIRequestContext = await request.newContext();
  try {
    while (Date.now() < deadline) {
      const res = await ctx.get(`${RECEIVER_BASE_URL}/wp-json/qt-test/v1/captured/${id}`);
      if (res.ok()) {
        const list = (await res.json()) as CapturedRequest[];
        if (Array.isArray(list) && list.length > 0) {
          return list[0];
        }
      }
      await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error(`No captured request for id ${id} within ${timeoutMs}ms`);
  } finally {
    await ctx.dispose();
  }
}

export async function getCapturedRequests(id: string): Promise<CapturedRequest[]> {
  const ctx: APIRequestContext = await request.newContext();
  try {
    const res = await ctx.get(`${RECEIVER_BASE_URL}/wp-json/qt-test/v1/captured/${id}`);
    if (!res.ok()) return [];
    const list = (await res.json()) as CapturedRequest[];
    return Array.isArray(list) ? list : [];
  } finally {
    await ctx.dispose();
  }
}

export async function expectNoCapturedRequest(
  id: string,
  windowMs = 2000,
): Promise<void> {
  const deadline = Date.now() + windowMs;
  while (Date.now() < deadline) {
    const list = await getCapturedRequests(id);
    if (list.length > 0) {
      throw new Error(`Expected no captured request for id ${id}, but got ${list.length}`);
    }
    await new Promise((r) => setTimeout(r, 200));
  }
}

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

export async function openFirstWebhookLogs(page: Page): Promise<void> {
  const webhookRow = page.getByTestId('pipeline-webhook').first();
  await webhookRow.getByTestId('dropdown-icon').click();
  await page.getByText('View logs', { exact: true }).click();
  await expect(page.getByTestId('webhook-logs-modal')).toBeVisible();
}
