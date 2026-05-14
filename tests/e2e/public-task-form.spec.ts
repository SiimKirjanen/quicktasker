import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import {
  createBoard,
  createStage,
  generateUniqueName,
  getTasksInStage,
  selectBoard,
} from './utils/board-helpers';
import {
  closeModal,
  createPageWithBlock,
  enablePublicSubmissions,
  openBoardSettingsModal,
} from './utils/public-task-form-helpers';

test.describe('Public Task Form block', () => {
  test('anonymous visitor can submit a task and see tracking view', async ({ page, browser }) => {
    const boardName = generateUniqueName('PTF-HP-Board');
    const stageName = generateUniqueName('PTF-HP-Stage');
    const pageTitle = generateUniqueName('PTF-HP-Page');
    const taskName = generateUniqueName('PTF-HP-Task');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);

    await openBoardSettingsModal(page);
    await enablePublicSubmissions(page, { limit: 5 });
    await closeModal(page);

    const { link } = await createPageWithBlock(page, { boardName, title: pageTitle });

    const anonContext = await browser.newContext();
    const anonPage = await anonContext.newPage();
    try {
      await anonPage.goto(link);

      await expect(anonPage.getByLabel('Task title')).toBeVisible();
      await anonPage.getByLabel('Task title').fill(taskName);
      await anonPage.getByRole('button', { name: 'Submit task' }).click();

      await expect(
        anonPage.getByText('Thanks! Your task has been submitted.'),
      ).toBeVisible();
      await expect(
        anonPage.getByRole('heading', { name: 'Your submissions' }),
      ).toBeVisible();
      await expect(anonPage.getByText(taskName)).toBeVisible();
      await expect(anonPage.getByText(stageName)).toBeVisible();

      await anonPage.reload();
      await expect(
        anonPage.getByRole('heading', { name: 'Your submissions' }),
      ).toBeVisible();
      await expect(anonPage.getByText(taskName)).toBeVisible();
      await expect(anonPage.getByText(stageName)).toBeVisible();
    } finally {
      await anonContext.close();
    }

    await navigateToBoardsPage(page);
    await selectBoard(page, boardName);
    await expect(page.getByText(stageName)).toBeVisible();
    const tasks = await getTasksInStage(page, stageName);
    expect(tasks).toContain(taskName);
  });

  test('shows closed message when board has submissions disabled', async ({ page, browser }) => {
    const boardName = generateUniqueName('PTF-OFF-Board');
    const stageName = generateUniqueName('PTF-OFF-Stage');
    const pageTitle = generateUniqueName('PTF-OFF-Page');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);

    const { link } = await createPageWithBlock(page, { boardName, title: pageTitle });

    const anonContext = await browser.newContext();
    const anonPage = await anonContext.newPage();
    try {
      await anonPage.goto(link);
      await expect(
        anonPage.getByText('This board is not currently accepting task submissions.'),
      ).toBeVisible();
      await expect(anonPage.getByLabel('Task title')).not.toBeVisible();
    } finally {
      await anonContext.close();
    }
  });

  test('shows limit-reached message after submissions cap is hit', async ({ page, browser }) => {
    const boardName = generateUniqueName('PTF-LIM-Board');
    const stageName = generateUniqueName('PTF-LIM-Stage');
    const pageTitle = generateUniqueName('PTF-LIM-Page');
    const taskName = generateUniqueName('PTF-LIM-Task');

    await navigateToBoardsPage(page);
    await createBoard(page, boardName);
    await createStage(page, stageName);

    await openBoardSettingsModal(page);
    await enablePublicSubmissions(page, { limit: 1 });
    await closeModal(page);

    const { link } = await createPageWithBlock(page, { boardName, title: pageTitle });

    const firstVisitor = await browser.newContext();
    const firstPage = await firstVisitor.newPage();
    try {
      await firstPage.goto(link);
      await expect(firstPage.getByLabel('Task title')).toBeVisible();
      await firstPage.getByLabel('Task title').fill(taskName);
      await firstPage.getByRole('button', { name: 'Submit task' }).click();
      await expect(
        firstPage.getByText('Thanks! Your task has been submitted.'),
      ).toBeVisible();
    } finally {
      await firstVisitor.close();
    }

    const secondVisitor = await browser.newContext();
    const secondPage = await secondVisitor.newPage();
    try {
      await secondPage.goto(link);
      await expect(
        secondPage.getByText('This board has reached its submission limit.'),
      ).toBeVisible();
      await expect(secondPage.getByLabel('Task title')).not.toBeVisible();
    } finally {
      await secondVisitor.close();
    }
  });
});
