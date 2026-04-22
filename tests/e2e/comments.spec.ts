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

			await page.getByText('Private comments').click();
			const privatePanel = page.getByRole('tabpanel', { name: 'Private comments' });
			await addComment(privatePanel, 'Test private comment');

			await expect(privatePanel.getByText('Test private comment')).toBeVisible();
		});

		test('private comment shows author name', async ({ page }) => {
			const taskCard = getTaskCard(page, taskName);
			await taskCard.click();

			await page.getByText('Private comments').click();
			const privatePanel = page.getByRole('tabpanel', { name: 'Private comments' });
			await addComment(privatePanel, 'Author test comment');

			await expect(privatePanel.getByText('admin')).toBeVisible();
			await expect(privatePanel.getByText('(WP User)')).toBeVisible();
		});
	});

	test.describe('Public comments', () => {
		test('can add a public comment', async ({ page }) => {
			const taskCard = getTaskCard(page, taskName);
			await taskCard.click();

			await page.getByText('Public comments').click();
			const publicPanel = page.getByRole('tabpanel', { name: 'Public comments' });
			await addComment(publicPanel, 'Test public comment');

			await expect(publicPanel.getByText('Test public comment')).toBeVisible();
		});

		test('public comment shows author name', async ({ page }) => {
			const taskCard = getTaskCard(page, taskName);
			await taskCard.click();

			await page.getByText('Public comments').click();
			const publicPanel = page.getByRole('tabpanel', { name: 'Public comments' });
			await addComment(publicPanel, 'Public author test');

			await expect(publicPanel.getByText('admin')).toBeVisible();
			await expect(publicPanel.getByText('(WP User)')).toBeVisible();
		});
	});
});
