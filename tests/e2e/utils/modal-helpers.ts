import { Page, expect } from '@playwright/test';

/**
 * Modal-related utilities for e2e testing
 * Helpers for waiting for modals to close after actions like creating boards, stages, tasks, etc.
 */
export async function waitForModalToClose(page: Page, testId: string): Promise<void> {
    await expect(page.getByTestId(testId)).not.toBeVisible();
}