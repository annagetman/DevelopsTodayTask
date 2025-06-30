This repository contains UI tests for the Develops Today application using [Playwright] https://github.com/annagetman/DevelopsTodayTask with JavaScript.

## Setup the Testing Environment

1. **Clone the repository**

   ```bash
   git clone https://github.com/annagetman/DevelopsTodayTask.git
   cd DevelopsTodayTask
Install Node.js dependencies

npm install
Requires Node.js v14+ and npm.

Install Playwright browsers

npx playwright install
This command downloads Chromium, Firefox, and WebKit browser binaries.

Verify installation

npx playwright --version
Configuring Playwright
Open playwright.config.js to adjust global settings:

baseURL – the root URL for tests (e.g. https://vite-react-alpha-lemon.vercel.app).
headless – run tests without UI.
timeout and retry policies.
Projects – choose which browsers to test against (Chromium, Firefox, WebKit).

Example snippet:

module.exports = {
  use: {
    baseURL: 'https://vite-react-alpha-lemon.vercel.app',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    navigationTimeout: 10000,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
};
Running Tests
Run all tests (headless mode):


npm test
# or
npx playwright test
Run in headed mode (see browser UI):

npm run test:headed
# or
npx playwright test --headed
Run a single test file:

npx playwright test tests/your-test-file.spec.js
Debug tests (Playwright Inspector):

npx playwright test --debug
Generate and view HTML report:

npm run report
# then open the local report in your browser
npx playwright show-report
Scripts defined in package.json:

{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "report": "playwright show-report"
  }
}
Writing New Tests
Place your test files under the tests/ directory.
File names should end with .spec.js or .test.js.
Use the test and expect APIs from Playwright.

Example:
import { test, expect } from '@playwright/test';

test('basic example', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Develops Today/i);
});
