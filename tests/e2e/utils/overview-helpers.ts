import { Page } from '@playwright/test';
import { createBoard, createStage, generateUniqueName } from './board-helpers';

export async function setupBoardForOverview(
  page: Page,
  prefix: string,
): Promise<{ boardName: string; stageName: string }> {
  const boardName = generateUniqueName(`${prefix}-Board`);
  const stageName = generateUniqueName(`${prefix}-Stage`);
  await createBoard(page, boardName, '');
  await createStage(page, stageName, '');
  return { boardName, stageName };
}
