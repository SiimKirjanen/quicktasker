import { test, expect } from '@playwright/test';
import { navigateToBoardsPage, createBoard, createStage, generateUniqueName, generateUniqueDescription, getTaskCard, createQuickTasker, navigateToUserManagement, assignWordPressUserToTask, closeUserAssignmentDropdown, openUserAssignmentDropdown } from './utils';
import { ADMIN_USERNAME } from './constants';

test.describe('WordPress User Assignment', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToBoardsPage(page);
    // Create a board and stage for user assignment tests
    await createBoard(page, generateUniqueName('UserTestBoard'), generateUniqueDescription('Board for user assignment testing'));
    await createStage(page, generateUniqueName('UserStage'), generateUniqueDescription('Stage for user tests'));
  });

  test('should assign a WordPress user to a task', async ({ page }) => {
    const taskName = generateUniqueName('WPUserTask');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();
    
    const taskCard = getTaskCard(page, taskName);
        
    // Assign the admin WordPress user using helper
    await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME, false);
        
    // Verify admin is in the assigned section
    const assignedSection = page.locator('div').filter({ hasText: 'Assigned WordPress users' }).first();
    await expect(assignedSection.getByText(ADMIN_USERNAME, { exact: true })).toBeVisible();
    
    // Close the dropdown by clicking the icon again
    await closeUserAssignmentDropdown(page, taskName);
    
    // Verify the assigned user appears on the task card
    await expect(taskCard.getByText(ADMIN_USERNAME, { exact: true })).toBeVisible();
  });

  test('should unassign a WordPress user from a task', async ({ page }) => {
    const taskName = generateUniqueName('UnassignWPTask');
    
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    
    await expect(page.getByText(taskName)).toBeVisible();
            
    // Assign the admin user using helper
    await assignWordPressUserToTask(page, taskName, ADMIN_USERNAME, false);
    
    // Verify user is in assigned section
    await expect(page.getByText('No WordPress users assigned')).not.toBeVisible();
    const assignedSection = page.locator('div').filter({ hasText: 'Assigned WordPress users' }).first();
    await expect(assignedSection.getByText(ADMIN_USERNAME, { exact: true })).toBeVisible();
    
    // Now unassign the user by clicking on them in the assigned section
    await assignedSection.getByText(ADMIN_USERNAME, { exact: true }).click();
    
    // Wait for unassignment
    await page.waitForTimeout(500);
    
    // Verify the user is no longer assigned
    await expect(page.getByText('No WordPress users assigned')).toBeVisible();
  });
});

test.describe('QuickTasker User Assignment', () => {
  test('should assign a QuickTasker user to a task', async ({ page }) => {
    const taskName = generateUniqueName('QTUserTask');
    const qtUserName = generateUniqueName('QTUser');
    await createQuickTasker(page, qtUserName, 'Test QuickTasker user');
    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('QTUserTestBoard'), generateUniqueDescription('Board for QuickTasker user assignment testing'));
    await createStage(page, generateUniqueName('QTUserStage'), generateUniqueDescription('Stage for QuickTasker user tests'));
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();
    const taskCard = getTaskCard(page, taskName);
    // Open user assignment dropdown
    await openUserAssignmentDropdown(page, taskName);
    // Verify user assignment dropdown opened
    await expect(page.getByText('Assigned quicktaskers')).toBeVisible();
    await expect(page.getByText('No quicktaskers assigned')).toBeVisible();
    // Verify QuickTasker user assignment section exists
    await expect(page.getByText('Assign a quicktasker')).toBeVisible();
    // Find and click the QuickTasker user to assign
    const qtAssignSection = page.locator('div').filter({ hasText: 'Assign a quicktasker' }).first();
    // Click the QuickTasker user
    await qtAssignSection.getByText(qtUserName, { exact: true }).click();
    // Wait for assignment
    await page.waitForTimeout(500);
    // Verify the QuickTasker user is now in the assigned section
    await expect(page.getByText('No quicktaskers assigned')).not.toBeVisible();
    // Verify QuickTasker user is in the assigned section
    const assignedSection = page.locator('div').filter({ hasText: 'Assigned quicktaskers' }).first();
    await expect(assignedSection.getByText(qtUserName, { exact: true })).toBeVisible();

    await closeUserAssignmentDropdown(page, taskName);
    // Verify the assigned user appears on the task card
    await expect(taskCard.getByText(qtUserName, { exact: true })).toBeVisible();
  });

  test('should unassign a QuickTasker user from a task', async ({ page }) => {
    const taskName = generateUniqueName('UnassignQTTask');
    const qtUserName = generateUniqueName('QTUser');
    await createQuickTasker(page, qtUserName, 'Test QuickTasker user');
    await navigateToBoardsPage(page);
    await createBoard(page, generateUniqueName('QTUserTestBoard'), generateUniqueDescription('Board for QuickTasker user assignment testing'));
    await createStage(page, generateUniqueName('QTUserStage'), generateUniqueDescription('Stage for QuickTasker user tests'));
    // Add a task
    await page.getByText('Add task').click();
    await page.getByPlaceholder('Task name').fill(taskName);
    await page.getByPlaceholder('Task name').press('Enter');
    // Verify task was created
    await expect(page.getByText(taskName)).toBeVisible();
    
    await openUserAssignmentDropdown(page, taskName);
    // Verify user assignment dropdown opened
    await expect(page.getByText('Assigned quicktaskers')).toBeVisible();
    await expect(page.getByText('No quicktaskers assigned')).toBeVisible();
    // Verify quicktasker user assignment section exists
    await expect(page.getByText('Assign a quicktasker')).toBeVisible();
    // Assign the quicktasker user
    const qtAssignSection = page.locator('div').filter({ hasText: 'Assign a quicktasker' }).first();
    await qtAssignSection.getByText(qtUserName, { exact: true }).click();
    await page.waitForTimeout(500);
    // Verify user is in assigned section
    await expect(page.getByText('No quicktaskers assigned')).not.toBeVisible();
    const assignedSection = page.locator('div').filter({ hasText: 'Assigned quicktaskers' }).first();
    await expect(assignedSection.getByText(qtUserName, { exact: true })).toBeVisible();
    // Now unassign the user by clicking on them in the assigned section
    await assignedSection.getByText(qtUserName, { exact: true }).click();
    // Wait for unassignment
    await page.waitForTimeout(500);
    // Verify the user is no longer assigned
    await expect(page.getByText('No quicktaskers assigned')).toBeVisible();
  });
});
