import { Page, expect } from '@playwright/test';

/**
 * Click near the top-left of the document body to simulate an outside click.
 */
export async function clickBodyOutside(page: Page, x = 10, y = 10) {
  await page.locator('body').click({ position: { x, y } });
}

/**
 * Wait until every toast has closed on its own. Toasts sit in the bottom-right
 * corner and can cover a control that lands underneath them. They cannot be
 * clicked away while a menu or modal is open (the app marks them inert), so
 * this waits out their auto-close instead.
 */
export async function waitForToastsToClose(page: Page) {
  await expect(page.locator('.Toastify__toast')).toHaveCount(0, { timeout: 10_000 });
}
