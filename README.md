# Playwright Test Automation Project

This project uses Playwright to perform automated testing on the [SauceDemo website](https://www.saucedemo.com/). The tests validate various functionality such as login, product selection, and checkout processes.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [Playwright](https://playwright.dev/)

## Project Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>


Install Dependencies:
Run the following command to install the required dependencies:
npm install


Setup Environment Variables:
Create a .env file in the root of the project and add the following environment variables:
USERNAME=your_username
PASSWORD=your_password

Global Setup
The globalSetup.ts file will log into the SauceDemo website and save the session state to a storageState.json file. This ensures that the session is preserved across multiple tests.

Make sure to configure your globalSetup correctly by updating the username and password in the .env file.

import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', process.env.USERNAME!);
  await page.fill('#password', process.env.PASSWORD!);
  await page.click('#login-button');
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;


Running Tests
To run the tests, use the following command:
npx playwright test



Configuration
The test configuration is defined in playwright.config.ts, where you can specify settings like:

Browser configuration (e.g., Chromium, Firefox)

Test timeout and other Playwright settings

Global setup file for storing login state

import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  globalSetup: require.resolve('./globalSetup'),
  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storageState.json',
    headless: true,
    timeout: 60000, // Set global timeout for tests
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
});
