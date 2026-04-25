import { test, expect } from '@playwright/test';
import { navigateToBoardsPage, navigateToOverviewPage } from './utils/navigation';
import { createBoard, createStage, createTask, generateUniqueName } from './utils/board-helpers';
import { setupBoardForOverview } from './utils/overview-helpers';

test.describe('Board Overview', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  // --- Page structure ---

  test('should display the overview heading and board selector', async ({ page }) => {
    await setupBoardForOverview(page, 'OV-Page');
    await navigateToOverviewPage(page);

    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
    await expect(page.getByTestId('pipeline-selection-dropdown')).toBeVisible();
  });

  test('should display all four stat cards', async ({ page }) => {
    await setupBoardForOverview(page, 'OV-Cards');
    await navigateToOverviewPage(page);

    await expect(page.getByText('Total tasks')).toBeVisible();
    await expect(page.getByText('Completed tasks')).toBeVisible();
    await expect(page.getByText('Incomplete tasks')).toBeVisible();
    await expect(page.getByText('Overdue tasks')).toBeVisible();
  });

  test('should show not enough data messages when there are no tasks', async ({ page }) => {
    await setupBoardForOverview(page, 'OV-Charts');
    await navigateToOverviewPage(page);

    await expect(page.getByText('Not enough data to display task distribution by stages chart')).toBeVisible();
    await expect(page.getByText('Not enough data to display task status chart')).toBeVisible();
    await expect(page.getByText('Not enough data to display archived tasks chart')).toBeVisible();
  });

  // --- Stat cards ---

  test('should show zero counts on a board with no tasks', async ({ page }) => {
    await setupBoardForOverview(page, 'OV-Zero');
    await navigateToOverviewPage(page);

    const zeros = page.getByTestId('stat-card-value').filter({ hasText: '0' });
    await expect(zeros).toHaveCount(4);
  });

  test('should reflect task count after adding a task', async ({ page }) => {
    const { stageName } = await setupBoardForOverview(page, 'OV-Count');
    await createTask(page, stageName, generateUniqueName('OV-Task'));
    await navigateToOverviewPage(page);

    const totalCard = page.getByTestId('stat-card-value').first();
    await expect(totalCard).not.toHaveText('0');
  });

  // --- Chart type selector ---

  test('should show chart type selector buttons for each chart when data exists', async ({ page }) => {
    const { stageName } = await setupBoardForOverview(page, 'OV-Selector');
    await createTask(page, stageName, generateUniqueName('OV-Selector-Task'));
    await navigateToOverviewPage(page);

    await expect(page.getByRole('button', { name: /Pie/i })).toHaveCount(3);
    await expect(page.getByRole('button', { name: /Bar/i })).toHaveCount(3);
    await expect(page.getByRole('button', { name: /Column/i })).toHaveCount(3);
  });

  test('should highlight the Pie button as active by default', async ({ page }) => {
    const { stageName } = await setupBoardForOverview(page, 'OV-Active');
    await createTask(page, stageName, generateUniqueName('OV-Active-Task'));
    await navigateToOverviewPage(page);

    const firstPieButton = page.getByRole('button', { name: /Pie/i }).first();
    await expect(firstPieButton).toHaveClass(/wpqt-bg-blue-500/);

    const firstBarButton = page.getByRole('button', { name: /Bar/i }).first();
    await expect(firstBarButton).not.toHaveClass(/wpqt-bg-blue-500/);
  });

  test('should switch active button when a different chart type is selected', async ({ page }) => {
    const { stageName } = await setupBoardForOverview(page, 'OV-Switch');
    await createTask(page, stageName, generateUniqueName('OV-Switch-Task'));
    await navigateToOverviewPage(page);

    const firstBarButton = page.getByRole('button', { name: /Bar/i }).first();
    await firstBarButton.click();

    await expect(firstBarButton).toHaveClass(/wpqt-bg-blue-500/);

    const firstPieButton = page.getByRole('button', { name: /Pie/i }).first();
    await expect(firstPieButton).not.toHaveClass(/wpqt-bg-blue-500/);
  });

  // --- Board switching ---

  test('should update overview when switching to a different board', async ({ page }) => {
    const { boardName: boardAName } = await setupBoardForOverview(page, 'OV-SW-A');

    await createBoard(page, generateUniqueName('OV-SW-B-Board'), '');
    await createStage(page, generateUniqueName('OV-SW-B-Stage'), '');
    await navigateToOverviewPage(page);

    // Switch to board A — it's not the active board so its name only appears in the dropdown list
    await page.getByTestId('pipeline-selection-dropdown').click();
    await page.getByText(boardAName, { exact: true }).click();

    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
    await expect(page.getByText('Total tasks')).toBeVisible();
  });
});
