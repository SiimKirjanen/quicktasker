import { expect, type Locator } from '@playwright/test';

export async function addComment(panel: Locator, text: string) {
	await panel.getByRole('textbox').fill(text);
	await panel.getByText('Add comment').click();
	await expect(panel.getByRole('textbox')).toHaveValue('');
}
