import { test, expect } from '@playwright/test';
import { generateUniqueName } from './utils/board-helpers';
import {
  navigateToQuickTaskersTab,
  createQuickTaskerUser,
  getQuickTaskerCard,
  navigateToUserDetailPage,
} from './utils/user-helpers';
import { TIMEOUTS } from './utils/timeouts';

test.describe('User Detail – Page Structure', () => {
  let userName: string;

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UD-PS-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
    await navigateToUserDetailPage(page, userName);
  });

  test('shows user name as heading and User details subtitle', async ({ page }) => {
    await expect(page.getByRole('heading', { name: userName })).toBeVisible();
    await expect(page.getByText('User details')).toBeVisible();
  });

  test('shows Name field with user name', async ({ page }) => {
    await expect(page.getByText('Name:')).toBeVisible();
    // Use first() because the heading also contains the user name
    await expect(page.getByText(userName).first()).toBeVisible();
  });

  test('shows Created at field', async ({ page }) => {
    await expect(page.getByText('Created at:')).toBeVisible();
  });

  test('shows Assigned tasks count field', async ({ page }) => {
    await expect(page.getByText('Assigned tasks count:')).toBeVisible();
  });

  test('shows Setup completed as No for new user', async ({ page }) => {
    await expect(page.getByText('Setup completed:')).toBeVisible();
    // exact: true to avoid matching "Notifications" in a hidden WP accessibility element
    await expect(page.getByText('No', { exact: true })).toBeVisible();
  });

  test('shows Is active as Yes for new user', async ({ page }) => {
    await expect(page.getByText('Is active:')).toBeVisible();
    await expect(page.getByText('Yes', { exact: true })).toBeVisible();
  });

  test('shows User Page link', async ({ page }) => {
    await expect(page.getByText('User Page:')).toBeVisible();
    await expect(page.getByRole('link', { name: /code=/ })).toBeVisible();
  });
});

test.describe('User Detail – User Page Link', () => {
  let userName: string;

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UD-UPL-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
    await navigateToUserDetailPage(page, userName);
  });

  test('User Page link opens the public tasks app in a new tab', async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.getByRole('link', { name: /code=/ }).click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toContain('code=');
    await newPage.close();
  });
});

test.describe('User Detail – Controls Visibility', () => {
  let userName: string;

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UD-CV-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
    await navigateToUserDetailPage(page, userName);
  });

  test('shows User tasks, Disable user and Delete user for active user', async ({ page }) => {
    await expect(page.getByText('User tasks')).toBeVisible();
    await expect(page.getByText('Disable user')).toBeVisible();
    await expect(page.getByText('Delete user')).toBeVisible();
  });

  test('does not show Activate user for active user', async ({ page }) => {
    await expect(page.getByText('Activate user')).not.toBeVisible();
  });

  test('does not show Reset password for user without a password', async ({ page }) => {
    await expect(page.getByText('Reset password')).not.toBeVisible();
  });
});

test.describe('User Detail – Actions', () => {
  let userName: string;

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UD-AC-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
    await navigateToUserDetailPage(page, userName);
  });

  test('User tasks navigates to user tasks page', async ({ page }) => {
    await page.getByText('User tasks').click();
    await expect(page).toHaveURL(/#\/user-management\/\d+\/tasks/, { timeout: TIMEOUTS.NAVIGATION });
  });

  test('Disable user replaces Disable button with Activate user', async ({ page }) => {
    await page.getByText('Disable user').click();
    await expect(page.getByText('Activate user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('Disable user')).not.toBeVisible();
  });

  test('Disable user changes Is active to No', async ({ page }) => {
    await page.getByText('Disable user').click();
    await expect(page.getByText('Activate user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    // Both "Setup completed: No" and "Is active: No" now show "No" — use first()
    await expect(page.getByText('No', { exact: true }).first()).toBeVisible();
  });

  test('Activate user after disabling restores Disable user button', async ({ page }) => {
    await page.getByText('Disable user').click();
    await expect(page.getByText('Activate user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await page.getByText('Activate user').click();
    await expect(page.getByText('Disable user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('Activate user')).not.toBeVisible();
  });

  test('Activate user after disabling changes Is active back to Yes', async ({ page }) => {
    await page.getByText('Disable user').click();
    await expect(page.getByText('Activate user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await page.getByText('Activate user').click();
    await expect(page.getByText('Disable user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('Yes')).toBeVisible();
  });

  test('Delete user navigates back to users list', async ({ page }) => {
    await page.getByText('Delete user').click();
    await expect(page).toHaveURL(/#\/user-management$/, { timeout: TIMEOUTS.NAVIGATION });
  });

  test('Delete user removes user from the QuickTaskers list', async ({ page }) => {
    await page.getByText('Delete user').click();
    await expect(page).toHaveURL(/#\/user-management$/, { timeout: TIMEOUTS.NAVIGATION });
    await page.getByTestId('quicktasker-icon').click();
    await expect(getQuickTaskerCard(page, userName)).not.toBeVisible();
  });
});
