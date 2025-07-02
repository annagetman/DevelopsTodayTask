DevelopsTodayTask - UI Testing Suite
This repository contains UI tests for the Develops Today application using Playwright with JavaScript. The tests are focused on verifying functionality of a music playlist application.

Test Scope
The test suite covers the following functionality:

Adding tracks to a playlist using the "+" button
Search functionality to filter available tracks
Verification of total duration calculation for playlist tracks
Prerequisites
Node.js (v14 or newer)
npm (comes with Node.js)
Git
Setup Instructions
1. Clone the repository
git clone https://github.com/annagetman/DevelopsTodayTask.git
cd DevelopsTodayTask
2. Install Node.js dependencies
npm install
3. Install Playwright browsers
npx playwright install
This command downloads Chromium, Firefox, and WebKit browser binaries.

4. Verify installation
npx playwright --version
Configuration
The test configuration is located in playwright.config.js. Key settings include:

baseURL: The root URL for tests (currently set to 'https://vite-react-alpha-lemon.vercel.app/')
testDir: Directory containing the test files
fullyParallel: Determines if tests run in parallel
retries: Number of retry attempts on test failure
Browser configurations under projects section
Customizing configuration
To modify the configuration for your environment, open playwright.config.js and adjust as needed:

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'https://vite-react-alpha-lemon.vercel.app/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Other browser configurations...
  ],
});
Running Tests
Run all tests (headless mode)
npx playwright test
Run in headed mode (with browser UI)
npx playwright test --headed
Run a specific test file
npx playwright test tests/searchFunctionality.spec.js
Debug tests with Playwright Inspector
npx playwright test --debug
Generate and view HTML report
npx playwright test
npx playwright show-report
Adding Script Commands to package.json
For convenience, consider adding these scripts to your package.json:

{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "report": "playwright show-report"
  }
}
Then you can use shortcuts like:

npm test
npm run test:headed
npm run report
Writing New Tests
Place your test files under the tests/ directory with filenames ending in .spec.js or .test.js.

Example test structure:

import { test, expect } from '@playwright/test';

test.describe('Feature Description', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Test description', async ({ page }) => {
    // Test steps
    await expect(page.locator('#element')).toBeVisible();
  });
});