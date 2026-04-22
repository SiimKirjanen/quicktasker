import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, generateUniqueName, generateUniqueDescription, createTask } from './utils/board-helpers';

test.describe('Export Management (lightweight)', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should export tasks as JSON', async ({ page }) => {
    const boardName = generateUniqueName('ExportBoard');
    const stageName = generateUniqueName('ExportStage');
    const taskName = generateUniqueName('ExportTask');

    await createBoard(page, boardName, generateUniqueDescription('Board for export'));
    await createStage(page, stageName, generateUniqueDescription('Stage for export'));
    await createTask(page, stageName, taskName);

    await page.getByTestId('task-export-pdf-json-icon').click();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Export as JSON' }).click(),
    ]);

    expect(download.suggestedFilename()).toContain('.json');
    expect(await download.failure()).toBeNull();
  });

  test('should export tasks as PDF', async ({ page }) => {
    const boardName = generateUniqueName('ExportBoardPDF');
    const stageName = generateUniqueName('ExportStagePDF');
    const taskName = generateUniqueName('ExportTaskPDF');

    await createBoard(page, boardName, generateUniqueDescription('Board for export PDF'));
    await createStage(page, stageName, generateUniqueDescription('Stage for export PDF'));
    await createTask(page, stageName, taskName);

    await page.getByTestId('task-export-pdf-icon').click();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Export as PDF' }).click(),
    ]);

    expect(download.suggestedFilename()).toContain('.pdf');
    expect(await download.failure()).toBeNull();
  });
});
