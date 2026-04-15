import { test as setup } from '@playwright/test';
import { mkdirSync } from 'fs';
import { dirname } from 'path';
import { loginToWordPress } from './utils';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Ensure the auth directory exists
  mkdirSync(dirname(authFile), { recursive: true });
  
  // Login to WordPress
  await loginToWordPress(page);
  
  // Save authentication state
  await page.context().storageState({ path: authFile });
});
