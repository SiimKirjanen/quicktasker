import { test, expect } from '@playwright/test';
import { navigateToBoardsPage, createBoard } from './utils';

test.describe('Board Management', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
  });

  test('should create a new board', async ({ page }) => {
    await page.getByTestId('pipeline-selection-dropdown').click();
    
    await page.getByText('Add new board').click();
    
    await page.getByRole('textbox', { name: 'Name' }).fill('e2e_test_board');
    await page.getByRole('textbox', { name: 'Description' }).fill('Board for e2e tests');
    
    await page.getByRole('button', { name: 'Add board' }).click();
    
    await expect(page.getByText('e2e_test_board').first()).toBeVisible();
    await expect(page.getByText('Board for e2e tests')).toBeVisible();
  });

  test('should delete a board', async ({ page }) => {
    const boardName = `Board to Delete ${Date.now()}`;
    await createBoard(page, boardName, 'This board will be deleted');
    
    await expect(page.getByText(boardName).first()).toBeVisible();
    
    await page.locator('#wpqt-app').getByText('Settings').click();
    await page.getByText('Delete board').click();
    
    await page.getByRole('button', { name: 'Yes' }).click();
    
    await expect(page.getByTestId('pipeline-selection-dropdown').getByText(boardName)).not.toBeVisible();
  });
});

test.describe('Board Operations', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    await createBoard(page, `Test Board ${Date.now()}`, 'Board for testing operations');
  });

  test('should display the newly created board', async ({ page }) => {
    await expect(page.getByText('Board for testing operations')).toBeVisible();
  });

  test('should allow switching between boards', async ({ page }) => {
    const secondBoardName = `Second Board ${Date.now()}`;
    await createBoard(page, secondBoardName, 'Another test board');
    
    await expect(page.getByText(secondBoardName).first()).toBeVisible();
    
    await page.getByTestId('pipeline-selection-dropdown').click();
    await page.getByText('Demo board').click();
    
    await expect(page.getByText('Demo board').first()).toBeVisible();
  });
});
