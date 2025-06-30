import { test, expect } from '@playwright/test';

test.describe('Verify Total Duration of the Playlist in Seconds', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Test that the total duration of all tracks in "Your Playlist" is accurately calculated and displayed in seconds.', async ({ page }) => {

    for (const name of ['Summer Breeze', 'Winter Winds']) {
      const row = page
        .locator('#tracklist .MuiGrid-root.MuiGrid-container')
        .filter({ hasText: name })
        .first();
      await row.getByRole('button', { name: '+' }).click();
    }

    const playlistRows = page.locator('#playlist .MuiGrid-root.MuiGrid-container');
    await expect(playlistRows).toHaveCount(2);

    const totalDuration = page.locator('#playlist-duration');
    await expect(totalDuration).toHaveText('455');
  });

  test('Calculate the expected total duration by summing the durations of added tracks in the UI', async ({ page }) => {
    const tracksToAdd = ['Summer Breeze', 'Autumn Leaves', 'Rainy Mood'];
    let expectedTotal = 0;

    for (const name of tracksToAdd) {
      const row = page
        .locator('#tracklist .MuiGrid-root.MuiGrid-container', { hasText: name })
        .first();
      await expect(row).toBeVisible();

      const durationLocator = row.locator('p:has-text(":")').first();
      await expect(durationLocator).toHaveCount(1);

      const raw = await durationLocator.textContent();
      const [m, s] = raw.trim().split(':').map(Number);
      expectedTotal += m * 60 + s;

      await row.getByRole('button', { name: '+' }).click();
    }

    const playlistRows = page.locator('#playlist .MuiGrid-root.MuiGrid-container');
    await expect(playlistRows).toHaveCount(tracksToAdd.length);

    const totalValueLocator = page.locator(
      'xpath=//*[contains(text(),"Total playlist tracks duration in seconds")]/following-sibling::*[1]'
    );
    await expect(totalValueLocator).toBeVisible();
    await expect(totalValueLocator).toHaveText(String(expectedTotal));
  });
});
