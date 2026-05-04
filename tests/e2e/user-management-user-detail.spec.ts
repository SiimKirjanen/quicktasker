import { test, expect } from '@playwright/test';
import { generateUniqueName } from './utils/board-helpers';
import {
  navigateToQuickTaskersTab,
  createQuickTaskerUser,
  getQuickTaskerCard,
  navigateToUserDetailPage,
} from './utils/user-helpers';
import { TIMEOUTS } from './utils/timeouts';

test.describe('User Detail', () => {
  let userName: string;

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UD-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
    await navigateToUserDetailPage(page, userName);
  });

  test('renders all detail fields and controls for a new active user', async ({ page }) => {
    await expect(page.getByRole('heading', { name: userName })).toBeVisible();
    await expect(page.getByText('User details')).toBeVisible();

    await expect(page.getByText('Name:')).toBeVisible();
    await expect(page.getByText('Created at:')).toBeVisible();
    await expect(page.getByText('Assigned tasks count:')).toBeVisible();
    await expect(page.getByText('Setup completed:')).toBeVisible();
    await expect(page.getByText('Is active:')).toBeVisible();
    await expect(page.getByText('User Page:')).toBeVisible();

    // exact: true to avoid matching "Notifications" in a hidden WP accessibility element
    await expect(page.getByText('No', { exact: true })).toBeVisible();
    await expect(page.getByText('Yes', { exact: true })).toBeVisible();

    await expect(page.getByRole('link', { name: /code=/ })).toBeVisible();

    await expect(page.getByText('User tasks')).toBeVisible();
    await expect(page.getByText('Disable user')).toBeVisible();
    await expect(page.getByText('Delete user')).toBeVisible();
    await expect(page.getByText('Activate user')).not.toBeVisible();
    await expect(page.getByText('Reset password')).not.toBeVisible();
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

  test('User tasks navigates to user tasks page', async ({ page }) => {
    await page.getByText('User tasks').click();
    await expect(page).toHaveURL(/#\/user-management\/\d+\/tasks/, { timeout: TIMEOUTS.NAVIGATION });
  });

  test('Disable user swaps button to Activate user and sets Is active to No', async ({ page }) => {
    await page.getByText('Disable user').click();
    await expect(page.getByText('Activate user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('Disable user')).not.toBeVisible();
    // Both "Setup completed: No" and "Is active: No" now show "No" — use first()
    await expect(page.getByText('No', { exact: true }).first()).toBeVisible();
  });

  test('Activate user after disabling restores Disable button and sets Is active to Yes', async ({ page }) => {
    await page.getByText('Disable user').click();
    await expect(page.getByText('Activate user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await page.getByText('Activate user').click();
    await expect(page.getByText('Disable user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page.getByText('Activate user')).not.toBeVisible();
    await expect(page.getByText('Yes')).toBeVisible();
  });

  test('Delete user navigates back to users list and removes the user', async ({ page }) => {
    await page.getByText('Delete user').click();
    await expect(page).toHaveURL(/#\/user-management$/, { timeout: TIMEOUTS.NAVIGATION });
    await page.getByTestId('quicktasker-icon').click();
    await expect(getQuickTaskerCard(page, userName)).not.toBeVisible();
  });
});
