import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables from the .env file

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');

    // Fill in the username and password from the environment variables
    await page.fill('#user-name', process.env.USERNAME!);
    await page.fill('#password', process.env.PASSWORD!);

    // Click the login button
    await page.click('#login-button');

    // Save the browser's storage state (cookies, localStorage, etc.) to a file
    await page.context().storageState({ path: 'storageState.json' });

    // Close the browser
    await browser.close();
}

export default globalSetup;
