import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { LoggersPage } from '../pages/Loggers.page';
import { AssetsPage } from '../pages/Assests.page';
import { ShipmentsPage } from '../pages/Shipments.page';

type PageObjects = {
  loginPage: LoginPage;
  loggersPage: LoggersPage;
  assetsPage: AssetsPage;
  shipmentsPage: ShipmentsPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  loggersPage: async ({ page }, use) => {
    const loggersPage = new LoggersPage(page);
    await use(loggersPage);
  },
  assetsPage: async ({ page }, use) => {
    const assetsPage = new AssetsPage(page);
    await use(assetsPage);
  },
  shipmentsPage: async ({ page }, use) => {
    const shipmentsPage = new ShipmentsPage(page);
    await use(shipmentsPage);
  },
});

export { expect } from '@playwright/test';