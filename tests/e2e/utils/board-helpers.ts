import { Page } from '@playwright/test';

/**
 * Board-related utilities for e2e testing
 * Helpers for working with boards, stages, and tasks
 */

/**
 * Get all task titles within a specific stage
 * @param page - Playwright page object
 * @param stageName - Name of the stage to get tasks from (e.g., "Order Received")
 * @returns Array of task titles within the stage
 */
export async function getTasksInStage(page: Page, stageName: string): Promise<string[]> {
  // Find the stage container by its title
  const stageContainer = page.locator('div[data-stage-id]').filter({ hasText: stageName }).first();
  
  // Get all task titles within task cards (draggable elements) only
  const taskTitles = await stageContainer.locator('div[data-rfd-draggable-id] div.wpqt-text-base').allTextContents();
  
  return taskTitles;
}
