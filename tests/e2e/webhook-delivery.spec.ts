import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  createBoard,
  createStage,
  createTask,
  generateUniqueName,
  getTaskCard,
  selectBoard,
} from './utils/board-helpers';
import {
  navigateToWebhooksPage,
  createWebhook,
  uniqueWebhookUrl,
  waitForCapturedRequest,
  expectNoCapturedRequest,
  getCapturedRequests,
} from './utils/webhook-helpers';

const numericString = expect.stringMatching(/^\d+$/);
const dateTimeString = expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

const taskShape = (name: string) => ({
  id: numericString,
  name,
  description: null,
  pipeline_id: numericString,
  is_archived: '0',
  is_done: '0',
  due_date: null,
  free_for_all: '0',
  created_at: dateTimeString,
  updated_at: dateTimeString,
  task_completed_at: null,
  task_focus_color: null,
});

const webhookShape = (action: string, url: string) => ({
  id: numericString,
  pipeline_id: numericString,
  target_type: 'task',
  target_action: action,
  webhook_url: url,
  created_at: dateTimeString,
});

test.describe('Webhook Delivery', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('task created fires POST with task payload', async ({ page }) => {
    const boardName = generateUniqueName('WHD-Created-Board');
    const stageName = generateUniqueName('WHD-Created-Stage');
    const taskName = generateUniqueName('WHD-Created-Task');
    const { id, url } = uniqueWebhookUrl();

    await createBoard(page, boardName, '');
    await createStage(page, stageName, '');
    await navigateToWebhooksPage(page);
    await createWebhook(page, { action: 'created', url });

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await createTask(page, stageName, taskName);

    const captured = await waitForCapturedRequest(id);
    expect(captured.method).toBe('POST');
    expect(captured.headers.content_type?.[0]).toContain('application/json');
    expect(captured.body).toEqual({
      task: taskShape(taskName),
      webhook: webhookShape('created', url),
      data: null,
    });
  });

  test('task updated fires PATCH with task payload', async ({ page }) => {
    const boardName = generateUniqueName('WHD-Updated-Board');
    const stageName = generateUniqueName('WHD-Updated-Stage');
    const taskName = generateUniqueName('WHD-Updated-Task');
    const newName = `${taskName} edited`;
    const { id, url } = uniqueWebhookUrl();

    await createBoard(page, boardName, '');
    await createStage(page, stageName, '');
    await navigateToWebhooksPage(page);
    await createWebhook(page, { action: 'updated', url });

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await createTask(page, stageName, taskName);

    const taskCard = getTaskCard(page, taskName);
    await taskCard.click();
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
    await page.waitForTimeout(1000);
    await page.getByTestId('wpqt-modal-close-button').click();
    await expect(page.getByText(newName)).toBeVisible();

    const captured = await waitForCapturedRequest(id);
    expect(captured.method).toBe('PATCH');
    expect(captured.body).toEqual({
      task: taskShape(newName),
      webhook: webhookShape('updated', url),
      data: null,
    });
  });

  test('inactive webhook does not fire', async ({ page }) => {
    const boardName = generateUniqueName('WHD-Inactive-Board');
    const stageName = generateUniqueName('WHD-Inactive-Stage');
    const taskName = generateUniqueName('WHD-Inactive-Task');
    const { id, url } = uniqueWebhookUrl();

    await createBoard(page, boardName, '');
    await createStage(page, stageName, '');
    await navigateToWebhooksPage(page);
    await createWebhook(page, { action: 'created', url });

    const webhookCard = page.getByTestId('pipeline-webhook').first();
    await expect(webhookCard.getByText('Active', { exact: true })).toBeVisible();
    await webhookCard.getByTestId('dropdown-icon').click();
    await page.getByText('Deactivate', { exact: true }).click();
    await expect(webhookCard.getByText('Inactive', { exact: true })).toBeVisible();

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await createTask(page, stageName, taskName);

    await expectNoCapturedRequest(id);
  });

  test('wait-for-response webhook still delivers payload', async ({ page }) => {
    const boardName = generateUniqueName('WHD-Wait-Board');
    const stageName = generateUniqueName('WHD-Wait-Stage');
    const taskName = generateUniqueName('WHD-Wait-Task');
    const { id, url } = uniqueWebhookUrl();

    await createBoard(page, boardName, '');
    await createStage(page, stageName, '');
    await navigateToWebhooksPage(page);
    await createWebhook(page, { action: 'created', url, waitForResponse: true });

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await createTask(page, stageName, taskName);

    const captured = await waitForCapturedRequest(id);
    expect(captured.method).toBe('POST');
    expect(captured.body).toMatchObject({
      task: { name: taskName },
      webhook: { target_action: 'created' },
    });
  });

  test('multiple webhooks for same event all fire', async ({ page }) => {
    const boardName = generateUniqueName('WHD-Multi-Board');
    const stageName = generateUniqueName('WHD-Multi-Stage');
    const taskName = generateUniqueName('WHD-Multi-Task');
    const a = uniqueWebhookUrl();
    const b = uniqueWebhookUrl();

    await createBoard(page, boardName, '');
    await createStage(page, stageName, '');
    await navigateToWebhooksPage(page);
    await createWebhook(page, { action: 'created', url: a.url });
    await createWebhook(page, { action: 'created', url: b.url });

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await createTask(page, stageName, taskName);

    const [capA, capB] = await Promise.all([
      waitForCapturedRequest(a.id),
      waitForCapturedRequest(b.id),
    ]);
    expect(capA.body).toMatchObject({ task: { name: taskName } });
    expect(capB.body).toMatchObject({ task: { name: taskName } });
    expect((await getCapturedRequests(a.id)).length).toBe(1);
    expect((await getCapturedRequests(b.id)).length).toBe(1);
  });

  test('moving task to another stage fires stage-changed webhook', async ({ page }) => {
    const boardName = generateUniqueName('WHD-Stage-Board');
    const stage1Name = generateUniqueName('WHD-Stage-1');
    const stage2Name = generateUniqueName('WHD-Stage-2');
    const taskName = generateUniqueName('WHD-Stage-Task');
    const { id, url } = uniqueWebhookUrl();

    await createBoard(page, boardName, '');
    await createStage(page, stage1Name, '');
    await createStage(page, stage2Name, '');
    await navigateToWebhooksPage(page);
    await createWebhook(page, { action: 'stage-changed', url });

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await createTask(page, stage1Name, taskName);

    const taskCard = getTaskCard(page, taskName);
    await taskCard.getByTestId('dropdown-icon').click();
    await page.getByText('Move task').click();
    await page.locator('#move-task-stage-selection').selectOption({ label: stage2Name });
    await page.locator('#move-task-order-selection').selectOption({ label: '1' });
    await page.getByRole('button', { name: 'Apply' }).click();

    const captured = await waitForCapturedRequest(id);
    expect(captured.method).toBe('PATCH');
    expect(captured.body).toMatchObject({
      task: { name: taskName },
      webhook: { target_action: 'stage-changed', target_type: 'task' },
    });
  });

  test('task deleted fires DELETE with task payload', async ({ page }) => {
    const boardName = generateUniqueName('WHD-Deleted-Board');
    const stageName = generateUniqueName('WHD-Deleted-Stage');
    const taskName = generateUniqueName('WHD-Deleted-Task');
    const { id, url } = uniqueWebhookUrl();

    await createBoard(page, boardName, '');
    await createStage(page, stageName, '');
    await navigateToWebhooksPage(page);
    await createWebhook(page, { action: 'deleted', url });

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await createTask(page, stageName, taskName);

    const taskCard = getTaskCard(page, taskName);
    await taskCard.click();
    await page.getByText('Delete task', { exact: true }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByText(taskName)).not.toBeVisible();

    const captured = await waitForCapturedRequest(id);
    expect(captured.method).toBe('DELETE');
    expect(captured.body).toEqual({
      task: taskShape(taskName),
      webhook: webhookShape('deleted', url),
      data: null,
    });
  });
});
