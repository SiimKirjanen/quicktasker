import { Page } from '@playwright/test';

/**
 * Click near the top-left of the document body to simulate an outside click.
 */
export async function clickBodyOutside(page: Page, x = 10, y = 10) {
  await page.locator('body').click({ position: { x, y } });
}
