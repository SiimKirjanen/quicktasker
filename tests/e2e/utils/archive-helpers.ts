import { Page } from "@playwright/test";

/**
 * Archive-related utilities for e2e testing
 * Helpers for navigating to the archive page and interacting with archived tasks
 */
export function getArchiveTaskCard(page: Page, taskName: string) {
    return page.getByTestId('wpqt-card').filter({ hasText: taskName });
}