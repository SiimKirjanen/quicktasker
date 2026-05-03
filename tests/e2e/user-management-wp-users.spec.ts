import { test, expect } from '@playwright/test';
import { navigateToUserManagement } from './utils/navigation';
import {
  createWPUser,
  navigateToWPUsersTab,
  uniqueLogin,
} from './utils/user-helpers';
import { TIMEOUTS } from './utils/timeouts';

// ── Test suites ───────────────────────────────────────────────────────────────

test.describe('WordPress Users Tab – Page Structure', () => {
  test('shows WordPress users tab and QuickTaskers tab', async ({ page }) => {
    await navigateToUserManagement(page);
    await expect(page.getByRole('tab', { name: 'WordPress users' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'QuickTaskers' })).toBeVisible();
  });

});

test.describe('WordPress Users Tab – User Card', () => {
  test('shows description text when users exist', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpuser');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    await expect(
      page.getByText('WordPress users without administrator privileges.'),
    ).toBeVisible();
  });

  test('shows user card with username and role', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpuser');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(card.getByText('Role')).toBeVisible();
    await expect(card.getByText('editor')).toBeVisible();
  });

  test('capability toggles are off by default for new user', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpuser');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    const toggles = card.getByRole('switch');
    await expect(toggles).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(toggles.nth(i)).toHaveAttribute('aria-checked', 'false');
    }
  });
});

test.describe('WordPress Users Tab – Capability Toggles', () => {
  test('toggling a capability off after turning it on', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpcap');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(card.getByRole('switch')).toHaveCount(6);

    const toggle = card.getByRole('switch').nth(0);
    await toggle.click({ force: true });
    await expect(toggle).toHaveAttribute('aria-checked', 'true', { timeout: TIMEOUTS.NAVIGATION });
    // Wait for the API call to finish — component guards against concurrent toggles with `if (updating) return`
    await expect(card.getByTestId('loading-oval')).not.toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await toggle.click({ force: true });
    await expect(toggle).toHaveAttribute('aria-checked', 'false', { timeout: TIMEOUTS.NAVIGATION });
  });

  test('toggling one capability does not affect others', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpcap');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });

    const toggles = card.getByRole('switch');
    await toggles.nth(0).click({ force: true });
    await expect(toggles.nth(0)).toHaveAttribute('aria-checked', 'true', { timeout: TIMEOUTS.NAVIGATION });

    // All other toggles should remain off
    for (let i = 1; i < 6; i++) {
      await expect(toggles.nth(i)).toHaveAttribute('aria-checked', 'false');
    }
  });

  test('capability state persists after page reload', async ({ page, request }) => {
    const userLogin = uniqueLogin('wpcap');
    await createWPUser(request, userLogin, `${userLogin}@example.com`, 'editor');
    await navigateToWPUsersTab(page);
    const card = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    await expect(card).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(card.getByRole('switch')).toHaveCount(6);

    await card.getByRole('switch').nth(0).click({ force: true });
    await expect(card.getByRole('switch').nth(0)).toHaveAttribute('aria-checked', 'true', { timeout: TIMEOUTS.NAVIGATION });

    // Reload and verify the toggle state was saved
    await navigateToWPUsersTab(page);
    const reloadedCard = page.getByTestId('wpqt-card').filter({ hasText: userLogin });
    await expect(reloadedCard).toBeVisible({ timeout: TIMEOUTS.NAVIGATION });
    await expect(reloadedCard.getByRole('switch').nth(0)).toHaveAttribute('aria-checked', 'true');
  });
});
