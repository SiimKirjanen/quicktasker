import { test, expect } from '@playwright/test';
import { navigateToBoardsPage } from './utils/navigation';
import { createBoard, createStage, createTask, getTaskCard, generateUniqueName, generateUniqueDescription } from './utils/board-helpers';
import { addComment } from './utils/comment-helpers';

test.describe('Task Comments', () => {
	let taskName: string;
	let stageName: string;

	test.beforeEach(async ({ page }) => {
		await navigateToBoardsPage(page);
		await createBoard(page, generateUniqueName('CommentsBoard'), generateUniqueDescription('For comment tests'));
		stageName = generateUniqueName('CommentsStage');
		await createStage(page, stageName, '');
		taskName = generateUniqueName('CommentsTask');
		await createTask(page, stageName, taskName);
	});

	test.describe('Private comments', () => {
		test('can add a private comment', async ({ page }) => {
			const taskCard = getTaskCard(page, taskName);
			await taskCard.click();

			await page.getByRole('tab', { name: 'Comments', exact: true }).click();
			await page.getByRole('button', { name: 'Private' }).click();
			const modal = page.getByTestId('task-modal');
			await addComment(modal, 'Test private comment');

			await expect(modal.getByText('Test private comment')).toBeVisible();
		});

		test('private comment shows author name', async ({ page }) => {
			const taskCard = getTaskCard(page, taskName);
			await taskCard.click();

			await page.getByRole('tab', { name: 'Comments', exact: true }).click();
			await page.getByRole('button', { name: 'Private' }).click();
			const modal = page.getByTestId('task-modal');
			await addComment(modal, 'Author test comment');

			await expect(modal.getByText('admin')).toBeVisible();
			await expect(modal.getByText('(WP User)')).toBeVisible();
		});
	});

	test.describe('Public comments', () => {
		test('can add a public comment', async ({ page }) => {
			const taskCard = getTaskCard(page, taskName);
			await taskCard.click();

			await page.getByRole('tab', { name: 'Comments', exact: true }).click();
			await page.getByRole('button', { name: 'Public' }).click();
			const modal = page.getByTestId('task-modal');
			await addComment(modal, 'Test public comment');

			await expect(modal.getByText('Test public comment')).toBeVisible();
		});

		test('public comment shows author name', async ({ page }) => {
			const taskCard = getTaskCard(page, taskName);
			await taskCard.click();

			await page.getByRole('tab', { name: 'Comments', exact: true }).click();
			await page.getByRole('button', { name: 'Public' }).click();
			const modal = page.getByTestId('task-modal');
			await addComment(modal, 'Public author test');

			await expect(modal.getByText('admin')).toBeVisible();
			await expect(modal.getByText('(WP User)')).toBeVisible();
		});
	});
});
