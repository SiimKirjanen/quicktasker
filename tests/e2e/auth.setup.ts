import { test as setup } from '@playwright/test';
import { loginToWordPress } from './utils';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Login to WordPress
  await loginToWordPress(page);
  
  // Save authentication state
  await page.context().storageState({ path: authFile });
});
