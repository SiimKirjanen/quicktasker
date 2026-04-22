import { Page } from '@playwright/test';

async function uploadFileInTaskModal(page: Page, fixturePath: string) {
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(fixturePath);
  await page.getByRole('button', { name: 'Upload' }).click();
}

export { uploadFileInTaskModal };
