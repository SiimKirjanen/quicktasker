import { test, expect } from '@playwright/test';

test.describe('QuickTasker Plugin', () => {
  test('WordPress admin login', async ({ page }) => {
    // Navigate to WordPress admin
    await page.goto('/wp-admin');
    
    // Fill in login credentials (wp-env default credentials)
    await page.fill('#user_login', 'admin');
    await page.fill('#user_pass', 'password');
    
    // Submit the form
    await page.click('#wp-submit');
    
    // Verify successful login
    await expect(page).toHaveURL(/wp-admin/);
    await expect(page.locator('#wpadminbar')).toBeVisible();
  });

  test('QuickTasker plugin is active', async ({ page }) => {
    // Login first
    await page.goto('/wp-admin');
    await page.fill('#user_login', 'admin');
    await page.fill('#user_pass', 'password');
    await page.click('#wp-submit');
    
    // Navigate to plugins page
    await page.goto('/wp-admin/plugins.php');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Verify QuickTasker appears in the plugins table
    const quicktaskerRow = page.locator('#the-list tr').filter({ hasText: /quicktasker/i });
    await expect(quicktaskerRow).toBeVisible();
  });
});
