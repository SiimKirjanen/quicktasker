import { test, expect, Page } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { createBoard, generateUniqueName, getTaskCard, selectBoard } from './utils/board-helpers';
import {
  createTaskAutomation,
  enableAutomation,
  navigateToAutomationsPage,
  openFirstAutomationLogs,
  setupBoardForAutomations,
} from './utils/automation-helpers';
import { TIMEOUTS } from './utils/timeouts';

async function openBoardSettings(page: Page): Promise<void> {
  await page.locator('#wpqt-app').getByText('Settings').first().click();
  await expect(page.getByTestId('edit-pipeline-modal')).toBeVisible();
}

async function ensureAutomationLogsOff(page: Page): Promise<void> {
  const input = page.getByTestId('enable-automation-logs-toggle');
  await expect(input).toBeChecked();
  await input.scrollIntoViewIfNeeded();
  const bg = input.locator('xpath=..').locator('.react-switch-bg').first();
  await bg.waitFor({ state: 'visible' });
  await bg.click();
  await expect(input).not.toBeChecked();
  await page.waitForTimeout(1500);
}

test.describe('Board log generation settings', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('shows three log generation toggles with on defaults inside board settings', async ({ page }) => {
    await createBoard(page, generateUniqueName('LG-Defaults-Board'));
    await openBoardSettings(page);

    await expect(page.getByText('Log generation')).toBeVisible();
    await expect(page.getByTestId('enable-automation-logs-toggle')).toBeChecked();
    await expect(page.getByTestId('enable-webhook-logs-toggle')).toBeChecked();
    await expect(page.getByTestId('enable-api-token-logs-toggle')).toBeChecked();
  });

  test('persists the API token logs toggle across reloads', async ({ page }) => {
    const boardName = generateUniqueName('LG-Persist-Board');
    await createBoard(page, boardName);

    await openBoardSettings(page);
    const apiTokenInput = page.getByTestId('enable-api-token-logs-toggle');
    await apiTokenInput.locator('xpath=..').locator('.react-switch-bg').first().click();
    await expect(apiTokenInput).not.toBeChecked();
    await page.waitForTimeout(1500);

    await page.reload();

    await page.getByTestId('pipeline-selection-dropdown').click();
    const boardMenuItem = page.locator('.wpqt-mb-3').filter({ hasText: boardName });
    await boardMenuItem.getByText(boardName).click();
    await expect(page.getByTestId('active-pipeline-name')).toHaveText(boardName);

    await openBoardSettings(page);

    await expect(page.getByTestId('enable-api-token-logs-toggle')).not.toBeChecked();
    await expect(page.getByTestId('enable-automation-logs-toggle')).toBeChecked();
    await expect(page.getByTestId('enable-webhook-logs-toggle')).toBeChecked();
  });

  test('writes an automation log when automation logs are enabled', async ({ page }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const { boardName, taskName } = await setupBoardForAutomations(page, 'LG-AutoOn');

    await createTaskAutomation(page, 'Task marked as done', 'Archive task');
    await enableAutomation(page);

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await getTaskCard(page, taskName).getByTestId('task-done-icon-uncompleted').click();
    await page.waitForTimeout(1000);

    await navigateToAutomationsPage(page);
    await openFirstAutomationLogs(page);

    await expect(page.getByTestId('automation-logs-modal')).toContainText('Automation executed');
    await expect(page.getByTestId('automation-logs-modal')).not.toContainText('No logs found');
  });

  test('does not write an automation log when automation logs are disabled', async ({ page }) => {
    test.setTimeout(TIMEOUTS.LONG_TEST);
    const { boardName, taskName } = await setupBoardForAutomations(page, 'LG-AutoOff');

    await createTaskAutomation(page, 'Task marked as done', 'Archive task');
    await enableAutomation(page);

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await expect(page.getByTestId('active-pipeline-name')).toHaveText(boardName);
    await openBoardSettings(page);
    await ensureAutomationLogsOff(page);
    await page.keyboard.press('Escape');

    await getTaskCard(page, taskName).getByTestId('task-done-icon-uncompleted').click();
    await page.waitForTimeout(1000);

    await navigateToAutomationsPage(page);
    await openFirstAutomationLogs(page);

    await expect(page.getByTestId('automation-logs-modal')).toContainText('No logs found');
  });
});
