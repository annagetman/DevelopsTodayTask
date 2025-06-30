import { test, expect } from '@playwright/test';

test.describe('Add Track Using "+" Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Test the ability to add a single track using the "+" button for a given track.', async ({ page }) => {
    const trackName = 'Autumn Leaves';

    await expect(page.locator('#playlist .MuiGrid-root')).toHaveCount(0);

    const trackRow = page
      .locator('#tracklist .MuiGrid-root.MuiGrid-container')
      .filter({ hasText: trackName })
      .first();
    await expect(trackRow).toBeVisible();

    const addBtn = trackRow.getByRole('button', { name: '+' });
    await expect(addBtn).toBeVisible();
    await expect(addBtn).toBeEnabled();

    await addBtn.click();
    const playlistRow = page
      .locator('#playlist .MuiGrid-root.MuiGrid-container')
      .filter({ hasText: trackName });
    await expect(playlistRow).toHaveCount(1);

    await expect(playlistRow.getByRole('button', { name: '-' })).toBeVisible();
    await expect(playlistRow.getByText('03:00')).toBeVisible(); // якщо відома точна тривалість
  });

  test('Ensure that clicking the "+" button next to a track adds it to the “Your Playlist” list', async ({ page }) => {
    const playlist = page.locator('#playlist');

    await expect(playlist.locator('button:has-text("-")')).toHaveCount(0);

    const addButton = page.locator('button:has-text("+")').first();
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();

    await addButton.click();

    const addedTrack = playlist.getByText('Summer Breeze', { exact: true });
    await expect(addedTrack).toBeVisible();

    const removeButton = playlist.locator('button:has-text("-")');
    await expect(removeButton).toHaveCount(1);
    await expect(removeButton).toBeVisible();

    const checkbox = playlist.locator('input[type="checkbox"]');
    await expect(checkbox).toHaveCount(1);
    await expect(checkbox).not.toBeChecked();

    await expect(playlist.getByText('03:35')).toBeVisible();

    await expect(page.getByText('Total playlist tracks duration in seconds:')).toBeVisible();
    await expect(page.getByText('215')).toBeVisible();
  });
});