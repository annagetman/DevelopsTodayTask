import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Test the search input field for filtering the available tracks.', async ({ page }) => {
    const searchInput = page.locator('#\\:r0\\:');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();

    const trackRows = page.locator('#tracklist .MuiGrid-root.MuiGrid-container');

    await expect(trackRows).toHaveCount(5);

    await searchInput.fill('Winter');
    await expect(trackRows).toHaveCount(1);
    await expect(trackRows.first().getByText('Winter Winds')).toBeVisible();

    await searchInput.fill('');
    await expect(trackRows).toHaveCount(5);

    await searchInput.fill('foobar');
    await expect(trackRows).toHaveCount(0);
  });

  test('Ensure only matching tracks are displayed after search input', async ({ page }) => {
    const searchInput = page.locator('#\\:r0\\:');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();

    const trackRows = page.locator('#tracklist .MuiGrid-root.MuiGrid-container');
    await expect(trackRows).toHaveCount(5);

    await searchInput.fill('Summer Breeze');
    await expect(trackRows).toHaveCount(1);
    await expect(trackRows.first()).toContainText('Summer Breeze');

    await searchInput.fill('');
    await expect(trackRows).toHaveCount(5);

    await searchInput.fill('foobar');
    await expect(trackRows).toHaveCount(0);
  });
});
