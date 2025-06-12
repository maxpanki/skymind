import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from "path";

dotenv.config({ path: path.join(__dirname, '.env') })

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  globalSetup: require.resolve('./global-setup.ts'),
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on',
    video: 'on',
    storageState: '.auth/user.json'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]

});
