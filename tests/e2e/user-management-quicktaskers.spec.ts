import { test, expect, Page } from '@playwright/test';
import { generateUniqueName } from './utils/board-helpers';
import {
  navigateToQuickTaskersTab,
  createQuickTaskerUser,
  getQuickTaskerCard,
} from './utils/user-helpers';
import { TIMEOUTS } from './utils/timeouts';

// ── Shared helpers ────────────────────────────────────────────────────────────

async function openDropdown(page: Page, userName: string): Promise<void> {
  const card = getQuickTaskerCard(page, userName);
  await card.getByTestId('dropdown-icon').click();
}

async function openEditModal(page: Page, userName: string): Promise<void> {
  await openDropdown(page, userName);
  await page.getByRole('menuitem', { name: 'Edit user' }).click();
  await expect(page.getByTestId('user-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

// ── Test suites ───────────────────────────────────────────────────────────────

test.describe('User Management – Page Structure', () => {
  test('shows heading, both tabs, Add button and filter', async ({ page }) => {
    await navigateToQuickTaskersTab(page);
    await expect(page.getByRole('heading', { name: 'User management' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'WordPress users' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'QuickTaskers' })).toBeVisible();
    await expect(page.getByText('Add QuickTasker')).toBeVisible();
    await expect(page.getByPlaceholder('Search by name')).toBeVisible();
  });
});

test.describe('User Management – Add QuickTasker', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToQuickTaskersTab(page);
  });

  test('Add QuickTasker button reveals form, Cancel hides it', async ({ page }) => {
    await page.getByText('Add QuickTasker').click();
    await expect(page.getByText('User name')).toBeVisible();
    await expect(page.getByText('User description')).toBeVisible();
    await expect(page.getByText('Cancel')).toBeVisible();
    await expect(page.getByText('Add', { exact: true })).toBeVisible();

    await page.getByText('Cancel').click();
    await expect(page.getByText('User name')).not.toBeVisible();
    await expect(page.getByText('Add QuickTasker')).toBeVisible();
  });

  test('shows error toast when submitting with empty name', async ({ page }) => {
    await page.getByText('Add QuickTasker').click();
    await page.getByText('Add', { exact: true }).click();
    await expect(page.getByText('User name is required')).toBeVisible();
  });

  test('creates user with name and description, card shows Active and form resets', async ({ page }) => {
    const userName = generateUniqueName('UM-AU-User');
    const description = `Desc-${Date.now()}`;
    await createQuickTaskerUser(page, userName, description);

    const card = getQuickTaskerCard(page, userName);
    await expect(card).toBeVisible();
    await expect(card.getByText(description)).toBeVisible();
    await expect(card.getByText('Active')).toBeVisible();
    await expect(page.getByText('User name')).not.toBeVisible();
    await expect(page.getByText('Add QuickTasker')).toBeVisible();
  });
});

test.describe('User Management – User Filtering', () => {
  let userName: string;

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UM-UF-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
  });

  test('filter by name shows matching user', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search' }).fill(userName.slice(0, 12));
    await expect(getQuickTaskerCard(page, userName)).toBeVisible();
  });

  test('filter with no match shows no users found', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Search' }).fill('XXXTHISSHOULDNOTMATCHXXX');
    await expect(page.getByText('No results found')).toBeVisible();
    await expect(getQuickTaskerCard(page, userName)).not.toBeVisible();
  });
});

test.describe('User Management – User Card', () => {
  let userName: string;
  const description = 'Card test description';

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UM-UC-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName, description);
  });

  test('shows username, description, Open tasks app, View user details and status', async ({ page }) => {
    const card = getQuickTaskerCard(page, userName);
    await expect(card.getByText(userName)).toBeVisible();
    await expect(card.getByText(description)).toBeVisible();
    await expect(card.getByText('Open tasks app')).toBeVisible();
    await expect(card.getByText('View user details')).toBeVisible();
    await expect(card.getByText('Active')).toBeVisible();
  });

  test('clicking card opens the edit modal', async ({ page }) => {
    await getQuickTaskerCard(page, userName).click();
    await expect(page.getByTestId('user-modal')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('View user details navigates to user detail page', async ({ page }) => {
    await getQuickTaskerCard(page, userName).getByText('View user details').click();
    await expect(page.getByRole('heading', { name: userName })).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).toContain('#/user-management/');
  });

  test('Open tasks app opens the public tasks app in a new tab', async ({ page }) => {
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      getQuickTaskerCard(page, userName).getByText('Open tasks app').click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toContain('code=');
    await newPage.close();
  });
});

test.describe('User Management – User Dropdown', () => {
  let userName: string;

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UM-UD-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);
  });

  test('shows User details, User tasks, Edit user, Disable user for active user', async ({ page }) => {
    await openDropdown(page, userName);
    await expect(page.getByRole('menuitem', { name: 'User details' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'User tasks' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Edit user' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Disable user' })).toBeVisible();
  });

  test('User tasks navigates to user tasks page', async ({ page }) => {
    await openDropdown(page, userName);
    await page.getByRole('menuitem', { name: 'User tasks' }).click();
    await expect(page).toHaveURL(/#\/user-management\/\d+\/tasks/, { timeout: TIMEOUTS.NAVIGATION });
  });

  test('Edit user opens the edit modal', async ({ page }) => {
    await openEditModal(page, userName);
    await expect(page.getByTestId('user-modal')).toBeVisible();
  });

  test('Disable user changes card status to Disabled', async ({ page }) => {
    await openDropdown(page, userName);
    await page.getByRole('menuitem', { name: 'Disable user' }).click();
    await expect(getQuickTaskerCard(page, userName).getByText('Disabled')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('disabled user dropdown shows Activate user and Delete user', async ({ page }) => {
    await openDropdown(page, userName);
    await page.getByRole('menuitem', { name: 'Disable user' }).click();
    await expect(getQuickTaskerCard(page, userName).getByText('Disabled')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await openDropdown(page, userName);
    await expect(page.getByRole('menuitem', { name: 'Activate user' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Delete user' })).toBeVisible();
  });

  test('Activate user restores Active status after disabling', async ({ page }) => {
    await openDropdown(page, userName);
    await page.getByRole('menuitem', { name: 'Disable user' }).click();
    await expect(getQuickTaskerCard(page, userName).getByText('Disabled')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await openDropdown(page, userName);
    await page.getByRole('menuitem', { name: 'Activate user' }).click();
    await expect(getQuickTaskerCard(page, userName).getByText('Active')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('Delete user removes the user card', async ({ page }) => {
    await openDropdown(page, userName);
    await page.getByRole('menuitem', { name: 'Disable user' }).click();
    await expect(getQuickTaskerCard(page, userName).getByText('Disabled')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await openDropdown(page, userName);
    await page.getByRole('menuitem', { name: 'Delete user' }).click();
    await expect(page.getByText('Are you sure you want to delete this user?')).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(getQuickTaskerCard(page, userName)).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });
});

test.describe('User Management – Edit User Modal', () => {
  let userName: string;
  const modalDescription = 'Modal test description';

  test.beforeEach(async ({ page }) => {
    userName = generateUniqueName('UM-EM-User');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName, modalDescription);
    await openEditModal(page, userName);
  });

  test('renders modal with pre-filled fields, custom fields section, tabs and action buttons', async ({ page }) => {
    const modal = page.getByTestId('user-modal');
    await expect(modal.locator('input[type="text"]').first()).toHaveValue(userName);
    await expect(modal.locator('textarea').first()).toHaveValue(modalDescription);
    await expect(modal.getByText('User custom fields')).toBeVisible();
    await expect(modal.getByText('No related custom fields created')).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Logs' })).not.toBeVisible();
    await expect(page.getByRole('tab', { name: 'Private comments' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Public comments' })).toBeVisible();
    await expect(modal.getByText('User details')).toBeVisible();
    await expect(modal.getByText('User tasks')).toBeVisible();
    await expect(modal.getByText('View logs')).toBeVisible();
  });

  test('View logs button opens user logs modal with creation log entry', async ({ page }) => {
    await page.getByTestId('user-modal').getByText('View logs').click();
    const logsModal = page.getByTestId('user-logs-modal');
    await expect(logsModal).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(logsModal.getByText(/Quicktasker .*created/)).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('User details button closes modal and navigates to detail page', async ({ page }) => {
    await page.getByTestId('user-modal').getByText('User details').click();
    await expect(page.getByTestId('user-modal')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    expect(page.url()).toContain('#/user-management/');
  });

  test('User tasks button closes modal and navigates to tasks page', async ({ page }) => {
    await page.getByTestId('user-modal').getByText('User tasks').click();
    await expect(page.getByTestId('user-modal')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(page).toHaveURL(/#\/user-management\/\d+\/tasks/, { timeout: TIMEOUTS.NAVIGATION });
  });

  test('close button dismisses the modal', async ({ page }) => {
    await page.getByTestId('wpqt-modal-close-button').click();
    await expect(page.getByTestId('user-modal')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('Disable user changes the modal action to Activate user', async ({ page }) => {
    const modal = page.getByTestId('user-modal');
    await modal.getByText('Disable user').click();
    await expect(modal.getByText('Activate user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
  });

  test('Delete user with confirmation removes user and closes modal', async ({ page }) => {
    const modal = page.getByTestId('user-modal');
    // Must disable the user first — Delete user only appears for inactive users
    await modal.getByText('Disable user').click();
    await expect(modal.getByText('Activate user')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await modal.getByText('Delete user').click();
    await expect(page.getByText('Are you sure you want to delete this user?')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.getByTestId('user-modal')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(getQuickTaskerCard(page, userName)).not.toBeVisible();
  });

  test('editing name updates the user card', async ({ page }) => {
    const modal = page.getByTestId('user-modal');
    const newName = generateUniqueName('UM-EM-Renamed');
    await modal.locator('input[type="text"]').first().fill(newName);
    // AutoSaveInput debounces at 700ms — wait for debounce + API round-trip
    await page.waitForTimeout(1500);
    await page.getByTestId('wpqt-modal-close-button').click();
    await expect(page.getByTestId('user-modal')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(getQuickTaskerCard(page, newName)).toBeVisible();
  });

  test('editing description updates the user card', async ({ page }) => {
    const modal = page.getByTestId('user-modal');
    const newDescription = `Updated-Desc-${Date.now()}`;
    await modal.locator('textarea').first().fill(newDescription);
    // AutoSaveTextarea debounces at 700ms — wait for debounce + API round-trip
    await page.waitForTimeout(1500);
    await page.getByTestId('wpqt-modal-close-button').click();
    await expect(page.getByTestId('user-modal')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(getQuickTaskerCard(page, userName).getByText(newDescription)).toBeVisible();
  });
});
