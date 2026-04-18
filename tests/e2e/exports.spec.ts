import { test, expect } from '@playwright/test';
import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import { navigateToBoardsPage, createBoard, createStage, generateUniqueName, generateUniqueDescription, getStageContainer, getTaskCard, createLabel, selectFirstLabel, createTask, assignWordPressUserToTask } from './utils';
import { ADMIN_USERNAME } from './constants';

test.describe('Export Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should export tasks as JSON', async ({ page }) => {
    // Create a board, stage and a task to export
    const boardName = generateUniqueName('ExportBoard');
    const stageName = generateUniqueName('ExportStage');
    const taskName = generateUniqueName('ExportTask');
    const labelName = generateUniqueName('ExportLabel');

    await createBoard(page, boardName, generateUniqueDescription('Board for export'));
    await createStage(page, stageName, generateUniqueDescription('Stage for export'));
    await createTask(page, stageName, taskName);

    // Create and assign a label to the task
    const taskCard = getTaskCard(page, taskName);
    await createLabel(page, taskCard, labelName);
    await selectFirstLabel(page, taskCard);
    await expect(taskCard.getByText(labelName)).toBeVisible();

    // Open export menu and perform export
    await page.getByTestId('task-export-pdf-json-icon').click();

    const downloadPromiseMain = page.waitForEvent('download');
    const [page1] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'Export as JSON' }).click(),
    ]);

    const download = await Promise.race([
      downloadPromiseMain,
      page1.waitForEvent('download'),
    ]);

    expect(page1).toBeTruthy();
    expect(download.suggestedFilename()).toContain('.json');

    // Read and validate exported JSON content
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    const content = await fs.promises.readFile(downloadPath!, 'utf-8');
    const data = JSON.parse(content);

    // Basic structure and content checks
    expect(data.pipelineName).toBe(boardName);
    expect(Array.isArray(data.stages)).toBeTruthy();
    expect(data.stages.some((s: any) => s.stageName === stageName)).toBeTruthy();
    expect(Array.isArray(data.tasks)).toBeTruthy();
    expect(data.tasks.some((t: any) => t.taskName === taskName)).toBeTruthy();

    // Label checks: label listed and assigned to the task
    expect(Array.isArray(data.labels)).toBeTruthy();
    expect(data.labels.some((l: any) => l.labelName === labelName)).toBeTruthy();
    expect(data.tasks.some((t: any) => t.taskName === taskName && Array.isArray(t.assignedLabels) && t.assignedLabels.some((al: any) => al.labelName === labelName))).toBeTruthy();

    await page1.close();
  });

  test('should export tasks as PDF', async ({ page }) => {
    // Create a board, stage and a task to export
    const boardName = generateUniqueName('ExportBoardPDF');
    const stageName = generateUniqueName('ExportStagePDF');
    const taskName = generateUniqueName('ExportTaskPDF');
    const labelName = generateUniqueName('ExportLabelPDF');

    await createBoard(page, boardName, generateUniqueDescription('Board for export PDF'));
    await createStage(page, stageName, generateUniqueDescription('Stage for export PDF'));
    await createTask(page, stageName, taskName);

    // Create and assign a label to the task
    const taskCard = getTaskCard(page, taskName);
    await createLabel(page, taskCard, labelName);
    await selectFirstLabel(page, taskCard);
    await expect(taskCard.getByText(labelName)).toBeVisible();
    await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME);

    // Open PDF export menu and perform export
    await page.getByTestId('task-export-pdf-icon').click();
    await page.getByRole('button', { name: 'Export as PDF' }).click();
    const download = await page.waitForEvent('download');

    expect(download.suggestedFilename()).toContain('.pdf');

    const pdfPath = await download.path();
    expect(pdfPath).toBeTruthy();
    const pdfBuffer = await fs.promises.readFile(pdfPath!);
    const parser = new PDFParse({ data: pdfBuffer });
    const pdfData = await parser.getText(); 

    expect(pdfData.text).toContain(boardName);
    expect(pdfData.text).toContain(stageName);
    expect(pdfData.text).toContain(taskName);
    expect(pdfData.text).toContain(labelName);
    expect(pdfData.text).toContain(ADMIN_USERNAME);
  });
});
