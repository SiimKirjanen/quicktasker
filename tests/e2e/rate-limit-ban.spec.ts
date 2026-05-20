import { test, expect } from '@playwright/test';
import { generateUniqueName } from './utils/board-helpers';
import {
  createQuickTaskerUser,
  getQuickTaskerCard,
  navigateToQuickTaskersTab,
} from './utils/user-helpers';
import {
  clearRateLimitState,
  expectBannedBadge,
  expectNoBannedBadge,
  forceBanQuicktaskerUser,
  getQuicktaskerUserIdByName,
  seedRateLimitState,
  triggerRateLimitOffense,
} from './utils/ban-helpers';
import { TIMEOUTS } from './utils/timeouts';

test.describe('Rate limit + spam ban', () => {
  test('force-banned user shows "Banned (spam)" badge on card', async ({ page, request }) => {
    const userName = generateUniqueName('Ban-Badge');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);

    const userId = await getQuicktaskerUserIdByName(request, userName);
    await forceBanQuicktaskerUser(request, userId);

    await navigateToQuickTaskersTab(page);
    await expectBannedBadge(page, userName);
  });

  test('Unban dropdown item clears the ban and removes the badge', async ({ page, request }) => {
    const userName = generateUniqueName('Ban-Unban');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);

    const userId = await getQuicktaskerUserIdByName(request, userName);
    await forceBanQuicktaskerUser(request, userId);
    await navigateToQuickTaskersTab(page);
    await expectBannedBadge(page, userName);

    const card = getQuickTaskerCard(page, userName);
    await card.getByTestId('dropdown-icon').click();
    await page.getByRole('menuitem', { name: 'Unban user' }).click();

    await expect(page.getByText('User unbanned successfully')).toBeVisible({
      timeout: TIMEOUTS.NAVIGATION,
    });
    await expectNoBannedBadge(page, userName);
  });

  test('Unban dropdown item is hidden when user is not banned', async ({ page }) => {
    const userName = generateUniqueName('Ban-Hidden');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);

    await getQuickTaskerCard(page, userName).getByTestId('dropdown-icon').click();
    await expect(page.getByRole('menuitem', { name: 'Unban user' })).not.toBeVisible();
  });

  test('Rate limit offenses crossing threshold auto-ban the user', async ({ page, request }) => {
    const userName = generateUniqueName('Ban-AutoBan');
    await navigateToQuickTaskersTab(page);
    await createQuickTaskerUser(page, userName);

    const userId = await getQuicktaskerUserIdByName(request, userName);
    await clearRateLimitState(request, userId);

    // Pre-seed offenses to threshold − 1 so the next throttled request triggers the ban.
    await seedRateLimitState(request, userId, { offenses: 2 });

    // Simulate one throttled write — recordRateLimitOffense pushes offenses to 3 → auto-ban.
    await triggerRateLimitOffense(request, userId);

    await navigateToQuickTaskersTab(page);
    await expectBannedBadge(page, userName);
  });
});
