import { test, expect } from '@playwright/test';
import { navigateToBoardsPage, navigateToArchivePage } from './utils/navigation';
import { createTask, generateUniqueName, getTaskCard, selectBoard } from './utils/board-helpers';
import {
  setupBoardForAutomations,
  createTaskAutomation,
  enableAutomation,
  deleteFirstAutomation,
  openFirstAutomationLogs,
} from './utils/automation-helpers';
import { getArchiveTaskCard } from './utils/archive-helpers';
import { TIMEOUTS } from './utils/timeouts';

const TEST_EMAIL = 'test@example.com';
const TEST_SLACK_WEBHOOK = 'https://hooks.slack.com/services/test/test/test';

test.describe('Task Automations', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  // --- Delete automation ---

  test('should delete an automation', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Delete');
    await createTaskAutomation(page, 'Task marked as done', 'Archive task');

    await deleteFirstAutomation(page);

    await expect(page.getByText('Task marked as done').first()).not.toBeVisible();
  });

  test('should open automation logs modal', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Logs');
    await createTaskAutomation(page, 'Task marked as done', 'Archive task');

    await openFirstAutomationLogs(page);
  });

  // --- Archive task automations: verify creation AND trigger end-to-end ---

  test('should create a task done automation and verify it archives the task when triggered', async ({ page }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const { boardName, taskName } = await setupBoardForAutomations(page, 'AT-Done');

    await createTaskAutomation(page, 'Task marked as done', 'Archive task');
    await enableAutomation(page);

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await expect(page.getByText(taskName)).toBeVisible();

    await getTaskCard(page, taskName).getByTestId('task-done-icon-uncompleted').click();
    await page.waitForTimeout(1000);

    await navigateToArchivePage(page);
    await expect(getArchiveTaskCard(page, taskName)).toBeVisible();
  });

  test('should create a task not done automation and verify it archives the task when triggered', async ({ page }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const { boardName, taskName } = await setupBoardForAutomations(page, 'AT-NotDone');

    await createTaskAutomation(page, 'Task marked as not done', 'Archive task');
    await enableAutomation(page);

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = getTaskCard(page, taskName);

    // Mark as done first so the task has a "done" state to unmark
    await taskCard.getByTestId('task-done-icon-uncompleted').click();
    await page.waitForTimeout(500);

    // Mark as not done — fires the trigger
    await taskCard.getByTestId('task-done-icon-completed').click();
    await page.waitForTimeout(1000);

    await navigateToArchivePage(page);
    await expect(getArchiveTaskCard(page, taskName)).toBeVisible();
  });

  // --- Assign user automations: verify creation AND trigger end-to-end ---

  test('should create an assign user automation and verify the user is assigned when a task is created', async ({ page }) => {
    const { boardName, stageName } = await setupBoardForAutomations(page, 'AT-Assign');

    await createTaskAutomation(page, 'Task created', 'Assign user', { wpUser: 'admin' });
    await enableAutomation(page);

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);

    const newTaskName = generateUniqueName('AT-Assign-New');
    await createTask(page, stageName, newTaskName);
    await page.waitForTimeout(1000);

    const newTaskCard = getTaskCard(page, newTaskName);
    await expect(newTaskCard.getByTestId('user-assignment-icon').locator('..').getByText('admin')).toBeVisible();
  });

  // --- Email notification automations: verify creation only ---

  test('should create an email notification automation when a task is created', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Email-Created');
    await createTaskAutomation(page, 'Task created', 'Send email notification', { email: TEST_EMAIL });
    await expect(page.getByText('Task created').first()).toBeVisible();
    await expect(page.getByText('Send email notification').first()).toBeVisible();
  });

  test('should create an email notification automation when a task is deleted', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Email-Deleted');
    await createTaskAutomation(page, 'Task deleted', 'Send email notification', { email: TEST_EMAIL });
    await expect(page.getByText('Task deleted').first()).toBeVisible();
    await expect(page.getByText('Send email notification').first()).toBeVisible();
  });

  test('should create an email notification automation when a task is assigned', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Email-Assigned');
    await createTaskAutomation(page, 'Task assigned', 'Send email notification', { email: TEST_EMAIL });
    await expect(page.getByText('Task assigned').first()).toBeVisible();
    await expect(page.getByText('Send email notification').first()).toBeVisible();
  });

  test('should create an email notification automation when a task is unassigned', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Email-Unassigned');
    await createTaskAutomation(page, 'Task unassigned', 'Send email notification', { email: TEST_EMAIL });
    await expect(page.getByText('Task unassigned').first()).toBeVisible();
    await expect(page.getByText('Send email notification').first()).toBeVisible();
  });

  test('should create an email notification automation when a public comment is added', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Email-PubComment');
    await createTaskAutomation(page, 'Public comment added', 'Send email notification', { email: TEST_EMAIL });
    await expect(page.getByText('Public comment added').first()).toBeVisible();
    await expect(page.getByText('Send email notification').first()).toBeVisible();
  });

  test('should create an email notification automation when a private comment is added', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Email-PrivComment');
    await createTaskAutomation(page, 'Private comment added', 'Send email notification', { email: TEST_EMAIL });
    await expect(page.getByText('Private comment added').first()).toBeVisible();
    await expect(page.getByText('Send email notification').first()).toBeVisible();
  });

  test('should create an email notification automation when a file is attached', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Email-FileAttached');
    await createTaskAutomation(page, 'File attached', 'Send email notification', { email: TEST_EMAIL });
    await expect(page.getByText('File attached').first()).toBeVisible();
    await expect(page.getByText('Send email notification').first()).toBeVisible();
  });

  test('should create an email notification automation when an attached file is deleted', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Email-FileDeleted');
    await createTaskAutomation(page, 'Attached file deleted', 'Send email notification', { email: TEST_EMAIL });
    await expect(page.getByText('Attached file deleted').first()).toBeVisible();
    await expect(page.getByText('Send email notification').first()).toBeVisible();
  });

  // --- Slack message automations: verify creation only ---

  test('should create a Slack message automation when a task is marked as done', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Slack-Done');
    await createTaskAutomation(page, 'Task marked as done', 'Send Slack message', { slackWebhook: TEST_SLACK_WEBHOOK });
    await expect(page.getByText('Task marked as done').first()).toBeVisible();
    await expect(page.getByText('Send Slack message').first()).toBeVisible();
  });

  test('should create a Slack message automation when a task is created', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Slack-Created');
    await createTaskAutomation(page, 'Task created', 'Send Slack message', { slackWebhook: TEST_SLACK_WEBHOOK });
    await expect(page.getByText('Task created').first()).toBeVisible();
    await expect(page.getByText('Send Slack message').first()).toBeVisible();
  });

  test('should create a Slack message automation when a task is deleted', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Slack-Deleted');
    await createTaskAutomation(page, 'Task deleted', 'Send Slack message', { slackWebhook: TEST_SLACK_WEBHOOK });
    await expect(page.getByText('Task deleted').first()).toBeVisible();
    await expect(page.getByText('Send Slack message').first()).toBeVisible();
  });

  test('should create a Slack message automation when a task is assigned', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Slack-Assigned');
    await createTaskAutomation(page, 'Task assigned', 'Send Slack message', { slackWebhook: TEST_SLACK_WEBHOOK });
    await expect(page.getByText('Task assigned').first()).toBeVisible();
    await expect(page.getByText('Send Slack message').first()).toBeVisible();
  });

  test('should create a Slack message automation when a task is unassigned', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Slack-Unassigned');
    await createTaskAutomation(page, 'Task unassigned', 'Send Slack message', { slackWebhook: TEST_SLACK_WEBHOOK });
    await expect(page.getByText('Task unassigned').first()).toBeVisible();
    await expect(page.getByText('Send Slack message').first()).toBeVisible();
  });

  test('should create a Slack message automation when a public comment is added', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Slack-PubComment');
    await createTaskAutomation(page, 'Public comment added', 'Send Slack message', { slackWebhook: TEST_SLACK_WEBHOOK });
    await expect(page.getByText('Public comment added').first()).toBeVisible();
    await expect(page.getByText('Send Slack message').first()).toBeVisible();
  });

  test('should create a Slack message automation when a private comment is added', async ({ page }) => {
    await setupBoardForAutomations(page, 'AT-Slack-PrivComment');
    await createTaskAutomation(page, 'Private comment added', 'Send Slack message', { slackWebhook: TEST_SLACK_WEBHOOK });
    await expect(page.getByText('Private comment added').first()).toBeVisible();
    await expect(page.getByText('Send Slack message').first()).toBeVisible();
  });
});
