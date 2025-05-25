import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  globalSetup: require.resolve('./globalSetup'),
  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'storageState.json',
    headless: true,
  },
  timeout: 60000,
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    }
  ],
});
