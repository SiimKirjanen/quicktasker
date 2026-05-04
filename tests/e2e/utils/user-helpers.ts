import { APIRequestContext, Locator, Page, expect } from '@playwright/test';
import { navigateToUserManagement } from './navigation';
import { getTaskCard } from './board-helpers';
import { TIMEOUTS } from './timeouts';

export function uniqueLogin(prefix: string): string {
  return `${prefix}${Date.now()}${Math.random().toString(36).slice(2, 5)}`;
}

const ALL_CAPS = [
  'quicktasker_admin_role',
  'quicktasker_admin_role_allow_delete',
  'quicktasker_admin_role_manage_users',
  'quicktasker_admin_role_manage_settings',
  'quicktasker_admin_role_manage_archive',
  'quicktasker_access_user_page_app',
] as const;

async function getAdminNonce(request: APIRequestContext): Promise<string> {
  const response = await request.get('/wp-admin/');
  const html = await response.text();
  const match = html.match(/"nonce":"([^"]+)"/);
  if (!match) throw new Error('Could not find WP REST nonce in admin page response');
  return match[1];
}

/**
 * Create a WordPress user via the WP REST API.
 * Returns the new user's ID.
 */
export async function createWPUser(
  request: APIRequestContext,
  login: string,
  email: string,
  role = 'editor',
): Promise<number> {
  const nonce = await getAdminNonce(request);
  const response = await request.post('/wp-json/wp/v2/users', {
    headers: { 'X-WP-Nonce': nonce },
    data: { username: login, email, password: 'password123', roles: [role] },
  });
  if (!response.ok()) throw new Error(`Failed to create WP user: ${await response.text()}`);
  const user = await response.json();
  return user.id;
}

/**
 * Grant QuickTasker capabilities to a WordPress user via the plugin REST API.
 * Caps not listed in `caps` are set to false.
 */
export async function grantWPUserCaps(
  request: APIRequestContext,
  userId: number,
  caps: string[],
): Promise<void> {
  const nonce = await getAdminNonce(request);
  const capabilities: Record<string, boolean> = {};
  for (const cap of ALL_CAPS) {
    capabilities[cap] = caps.includes(cap);
  }
  const response = await request.patch(`/wp-json/wpqt/v1/wp-users/${userId}/capabilities`, {
    headers: { 'X-WP-Nonce': nonce },
    data: capabilities,
  });
  if (!response.ok()) throw new Error(`Failed to grant WP user caps: ${await response.text()}`);
}


/**
 * Navigate to the WordPress users tab in User Management (the default tab).
 * Waits for the tab content to finish loading.
 */
export async function navigateToWPUsersTab(page: Page): Promise<void> {
  // Register listener before navigation — WordPress users is the default tab,
  // so the API call fires during page load, not on tab click.
  const responsePromise = page.waitForResponse(
    (r) => r.url().includes('/wpqt/v1/wp-users') && r.status() === 200,
    { timeout: TIMEOUTS.NAVIGATION },
  );
  await navigateToUserManagement(page);
  await responsePromise;
}

/**
 * Create a new QuickTasker user through the UI
 * @param page - Playwright page object
 * @param name - QuickTasker name
 * @param description - QuickTasker description (optional)
 */
export async function createQuickTasker(page: Page, name: string, description = ''): Promise<void> {
  await navigateToUserManagement(page);
  await page.getByTestId('quicktasker-icon').click();
  
  // Click "Add QuickTasker"
  await page.getByText('Add QuickTasker').click();
  
  // Find the input field - using placeholder or label approach instead of dynamic ID
  const nameInput = page.locator('input[type="text"]').first();
  await nameInput.click();
  await nameInput.fill(name);
  
  // Fill in description textarea if provided
  if (description) {
    await page.locator('textarea').click();
    await page.locator('textarea').fill(description);
  }
  
  // Click Add button
  await page.getByText('Add', { exact: true }).click();
  
  // Wait for QuickTasker to be created
  await page.waitForTimeout(500);
}

export async function openUserAssignmentDropdown(page: Page, taskName: string): Promise<void> {
  const taskCard = getTaskCard(page, taskName);
  await taskCard.getByTestId('user-assignment-icon').click();
  await expect(page.getByText('Assigned quicktaskers')).toBeVisible();
  await expect(page.getByText('Assigned WordPress users')).toBeVisible();
}

export async function closeUserAssignmentDropdown(page: Page, taskName: string): Promise<void> {
  const taskCard = getTaskCard(page, taskName);
  await taskCard.getByTestId('user-assignment-icon').click();
  await expect(page.getByText('Assigned quicktaskers')).not.toBeVisible();
  await expect(page.getByText('Assigned WordPress users')).not.toBeVisible();
}

/**
 * Assign a WordPress user to a task via the task's user-assignment dropdown.
 * @param page - Playwright page
 * @param taskName - Name of the task
 * @param username - Exact username to assign
 * @param closeDropdown - Whether to close the dropdown after assignment (default: true)
 */
export async function assignWordPressUserToTask(page: Page, taskName: string, username: string, closeDropdown: boolean = true): Promise<void> {
  await openUserAssignmentDropdown(page, taskName);

  const wpAssignSection = page.locator('div').filter({ hasText: 'Assign a WordPress user' }).first();
  await wpAssignSection.getByText(username, { exact: true }).click();

  const assignedSection = page.locator('div').filter({ hasText: 'Assigned WordPress users' }).first();
  await expect(assignedSection.getByText(username, { exact: true })).toBeVisible();

  if (closeDropdown) {
    await closeUserAssignmentDropdown(page, taskName);
  }
}

/**
 * Navigate to User management and click the QuickTaskers tab.
 */
export async function navigateToQuickTaskersTab(page: Page): Promise<void> {
  await navigateToUserManagement(page);
  await page.getByTestId('quicktasker-icon').click();
  await expect(page.getByText('Add QuickTasker')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

/**
 * Create a QuickTasker user. Must already be on the QuickTaskers tab.
 * Waits for the "User created successfully" toast.
 */
export async function createQuickTaskerUser(page: Page, name: string, description = ''): Promise<void> {
  await page.getByText('Add QuickTasker').click();
  await page.locator('input[type="text"]').first().fill(name);
  if (description) {
    await page.locator('textarea').fill(description);
  }
  await page.getByText('Add', { exact: true }).click();
  await expect(page.getByText('User created successfully')).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

/**
 * Get a QuickTasker user card locator by username.
 */
export function getQuickTaskerCard(page: Page, userName: string): Locator {
  return page.getByTestId('wpqt-card').filter({ hasText: userName });
}

/**
 * Navigate to a QuickTasker's detail page. Must already be on the QuickTaskers tab.
 */
export async function navigateToUserDetailPage(page: Page, userName: string): Promise<void> {
  await getQuickTaskerCard(page, userName).getByText('View user details').click();
  await expect(page.getByRole('heading', { name: userName })).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
}

/**
 * Navigate to a QuickTasker's tasks page via the card dropdown. Must already be on the QuickTaskers tab.
 */
export async function navigateToUserTasksPage(page: Page, userName: string): Promise<void> {
  await getQuickTaskerCard(page, userName).getByTestId('dropdown-icon').click();
  await page.getByRole('menuitem', { name: 'User tasks' }).click();
  await expect(page).toHaveURL(/#\/user-management\/\d+\/tasks/, { timeout: TIMEOUTS.NAVIGATION });
}

/**
 * Disable a QuickTasker user via the card dropdown. Must already be on the QuickTaskers tab.
 */
export async function disableQuickTaskerUser(page: Page, userName: string): Promise<void> {
  await getQuickTaskerCard(page, userName).getByTestId('dropdown-icon').click();
  await page.getByRole('menuitem', { name: 'Disable user' }).click();
  await expect(getQuickTaskerCard(page, userName).getByText('Disabled')).toBeVisible({
    timeout: TIMEOUTS.NAVIGATION,
  });
}

/**
 * Assign a QuickTasker user to a task via the task's user-assignment dropdown.
 * Must already be on a board page with the task visible.
 */
export async function assignQuickTaskerToTask(page: Page, taskName: string, quicktaskerName: string, closeDropdown = true): Promise<void> {
  await openUserAssignmentDropdown(page, taskName);
  const assignSection = page.locator('div').filter({ hasText: 'Assign a quicktasker' }).first();
  await assignSection.getByText(quicktaskerName, { exact: true }).click();
  const assignedSection = page.locator('div').filter({ hasText: 'Assigned quicktaskers' }).first();
  await expect(assignedSection.getByText(quicktaskerName, { exact: true })).toBeVisible();
  if (closeDropdown) {
    await closeUserAssignmentDropdown(page, taskName);
  }
}
