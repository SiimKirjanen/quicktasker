import { Page, expect } from '@playwright/test';

export async function openBoardSettingsModal(page: Page): Promise<void> {
  await page.locator('#wpqt-app').getByText('Settings').click();
  await expect(page.getByText('Public task submissions')).toBeVisible();
}

export async function enablePublicSubmissions(
  page: Page,
  options: { limit?: number; requireLogin?: boolean } = {},
): Promise<void> {
  const toggleSection = page.getByText('Public task submissions').locator('..');
  await toggleSection.locator('.react-switch-bg').first().click();
  await expect(page.getByRole('heading', { name: 'Max submissions' })).toBeVisible();

  if (options.requireLogin === false) {
    const requireLoginToggle = page
      .getByRole('heading', { name: 'Require logged-in WordPress user' })
      .locator('..')
      .locator('.react-switch-bg')
      .first();
    await requireLoginToggle.click();
    await page.waitForTimeout(1500);
  }

  if (options.limit !== undefined && options.limit !== 50) {
    const limitInput = page
      .getByRole('heading', { name: 'Max submissions' })
      .locator('..')
      .locator('input')
      .first();
    await limitInput.fill(String(options.limit));
    await limitInput.press('Tab');
    await page.waitForTimeout(1500);
  }
}

export async function closeModal(page: Page): Promise<void> {
  await page.getByTestId('wpqt-modal-close-button').first().click();
}

async function dismissWelcomeGuides(page: Page): Promise<void> {
  await page
    .waitForFunction(() => Boolean((window as any).wp?.data?.dispatch('core/preferences')), null, {
      timeout: 10000,
    })
    .catch(() => undefined);
  await page
    .evaluate(() => {
      const prefs = (window as any).wp?.data?.dispatch('core/preferences');
      if (!prefs) return;
      prefs.set('core/edit-post', 'welcomeGuide', false);
      prefs.set('core/edit-post', 'welcomeGuideTemplate', false);
      prefs.set('core/edit-site', 'welcomeGuide', false);
      prefs.set('core/edit-site', 'welcomeGuideStyles', false);
      prefs.set('core/edit-site', 'welcomeGuidePage', false);
      prefs.set('core/edit-site', 'welcomeGuideTemplate', false);
    })
    .catch(() => undefined);
}

async function dismissPatternDialog(page: Page): Promise<void> {
  const dialog = page.locator('[role="dialog"]').filter({ hasText: 'Choose a pattern' });
  try {
    await dialog.waitFor({ state: 'visible', timeout: 5000 });
    await dialog.locator('button[aria-label="Close"]').first().click();
    await dialog.waitFor({ state: 'hidden', timeout: 5000 });
  } catch {
    // Dialog did not appear; continue.
  }
}

export async function createPageWithBlock(
  page: Page,
  options: { boardName: string; title: string },
): Promise<{ link: string }> {
  const { boardName, title } = options;

  await page.goto('/wp-admin/post-new.php?post_type=page');
  await dismissWelcomeGuides(page);
  await dismissPatternDialog(page);

  const editorFrame = page.frameLocator('iframe[name="editor-canvas"]');
  await editorFrame.getByLabel('Add title').fill(title);

  await page.getByLabel('Block Inserter').click();
  await page.locator('input[placeholder="Search"]').fill('QuickTasker');
  await page.getByRole('option', { name: 'QuickTasker: Public Task Form' }).click();

  const boardSelect = page
    .locator('select')
    .filter({ has: page.locator(`option`, { hasText: boardName }) })
    .first();
  await expect(boardSelect).toBeVisible();
  await boardSelect.selectOption({ label: boardName });

  await page.locator('button.editor-post-publish-panel__toggle').click();
  await page
    .locator('button.editor-post-publish-button:not(.editor-post-publish-panel__toggle)')
    .click();

  await expect(page.getByRole('button', { name: 'Publishing…' })).toHaveCount(0);

  const viewLink = page
    .locator('.post-publish-panel__postpublish, .editor-post-publish-panel')
    .getByRole('link', { name: /^View Page/i })
    .first();
  await expect(viewLink).toBeVisible();
  const link = await viewLink.getAttribute('href');
  if (!link) throw new Error('No permalink found after publish');
  return { link };
}
