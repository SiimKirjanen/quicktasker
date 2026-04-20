import path from 'path';
import { test, expect } from '@playwright/test';
import { generateUniqueName, navigateToBoardsPage, getTaskCard, getStageContainer } from './utils';
import { waitForModalToClose } from './utils/modal-helpers';

test.describe('Import Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should import a Trello board', async ({ page }) => {
    const boardName = generateUniqueName('BM-CR-Trello-Import-Board');
    const boardDescription = generateUniqueName('description');

    await page.getByTestId('pipeline-selection-dropdown').click();
    await page.getByRole('menuitem', { name: 'Import existing' }).click();
    await page.getByTestId('trello-icon').click();

    await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, 'fixtures/trello-export.json'));

    const modal = page.getByTestId('import-pipeline-modal');
    await modal.getByRole('textbox').first().fill(boardName);
    await modal.locator('textarea').fill(boardDescription);

    await page.getByText('Start import').click();
    await waitForModalToClose(page, 'import-pipeline-modal');

    await expect(page.getByText(boardName).first()).toBeVisible();
    await expect(page.getByText(boardDescription)).toBeVisible();

    const list1 = getStageContainer(page, 'List1');
    await expect(list1).toBeVisible();
    await expect(list1.getByText('Test1')).toBeVisible();
    await expect(list1.getByText('kana')).toBeVisible();
  });

  test('should import a QuickTasker board', async ({ page }) => {
    const boardName = generateUniqueName('BM-CR-QT-Import-Board');
    const boardDescription = generateUniqueName('description');

    await page.getByTestId('pipeline-selection-dropdown').click();
    await page.getByRole('menuitem', { name: 'Import existing' }).click();
    await page.getByTestId('quicktasker-icon').click();

    await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, 'fixtures/quicktasker-export.json'));

    const modal = page.getByTestId('import-pipeline-modal');
    await modal.getByRole('textbox').first().fill(boardName);
    await modal.locator('textarea').fill(boardDescription);

    await page.getByText('Start import').click();
    await waitForModalToClose(page, 'import-pipeline-modal');

    await expect(page.getByText(boardName).first()).toBeVisible();
    await expect(page.getByText(boardDescription)).toBeVisible();

    const orderReceived = getStageContainer(page, 'Order Received');
    const preparingOrder = getStageContainer(page, 'Preparing Order');
    const outForDelivery = getStageContainer(page, 'Out for Delivery');
    const delivered = getStageContainer(page, 'Delivered');

    await expect(orderReceived).toBeVisible();
    await expect(preparingOrder).toBeVisible();
    await expect(outForDelivery).toBeVisible();
    await expect(delivered).toBeVisible();

    await expect(orderReceived.getByText('Order #1001')).toBeVisible();
    await expect(orderReceived.getByText('Large pizza and a soda.')).toBeVisible();
    await expect(getTaskCard(page, 'Order #1001').getByText('Important')).toBeVisible();
    await expect(orderReceived.getByText('Order #1002')).toBeVisible();
    await expect(orderReceived.getByText('Burger and fries.')).toBeVisible();

    await expect(preparingOrder.getByText('Order #1003')).toBeVisible();
    await expect(preparingOrder.getByText('Tacos and nachos.')).toBeVisible();

    await expect(outForDelivery.getByText('Order #1004')).toBeVisible();
    await expect(outForDelivery.getByText('Steak dinner with mashed potatoes.')).toBeVisible();
    await expect(getTaskCard(page, 'Order #1004').getByText('VIP Customer')).toBeVisible();
  });

  test('should import an Asana board', async ({ page }) => {
    const boardName = generateUniqueName('BM-CR-Asana-Import-Board');
    const boardDescription = generateUniqueName('description');

    await page.getByTestId('pipeline-selection-dropdown').click();
    await page.getByRole('menuitem', { name: 'Import existing' }).click();
    await page.getByTestId('asana-icon').click();

    await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, 'fixtures/asana-export.json'));

    const modal = page.getByTestId('import-pipeline-modal');
    await modal.getByRole('textbox').first().fill(boardName);
    await modal.locator('textarea').fill(boardDescription);

    await page.getByText('Start import').click();
    await waitForModalToClose(page, 'import-pipeline-modal');

    await expect(page.getByText(boardName).first()).toBeVisible();
    await expect(page.getByText(boardDescription)).toBeVisible();

    const stage1 = getStageContainer(page, 'stage1');
    const stage2 = getStageContainer(page, 'stage2');

    await expect(stage1).toBeVisible();
    await expect(stage2).toBeVisible();

    await expect(stage1.getByText('task1')).toBeVisible();
    await expect(stage1.getByText('task2')).toBeVisible();
    await expect(stage2.getByText('task3')).toBeVisible();
  });

  test('should import a Pipedrive board', async ({ page }) => {
    const boardName = generateUniqueName('BM-CR-Pipedrive-Import-Board');
    const boardDescription = generateUniqueName('description');

    await page.getByTestId('pipeline-selection-dropdown').click();
    await page.getByRole('menuitem', { name: 'Import existing' }).click();
    await page.getByTestId('pipedrive-icon').click();

    await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, 'fixtures/pipedrive-export.csv'));

    const modal = page.getByTestId('import-pipeline-modal');
    await modal.getByRole('textbox').first().fill(boardName);
    await modal.locator('textarea').fill(boardDescription);

    await page.getByText('Start import').click();
    await waitForModalToClose(page, 'import-pipeline-modal');

    await expect(page.getByText(boardName).first()).toBeVisible();
    await expect(page.getByText(boardDescription)).toBeVisible();

    const qualified = getStageContainer(page, 'Qualified');
    await expect(qualified).toBeVisible();
    await expect(qualified.getByText('my deal')).toBeVisible();
    await expect(qualified.getByText('Magoo deal')).toBeVisible();
  });
});
