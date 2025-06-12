import { Page } from '@playwright/test';
import { BasePage } from './Base.page';

export class LoggersPage extends BasePage{

    constructor(page: Page) {
        super(page, './asset-management/loggers');
    }

    async verifyLoggerNumberColumnValues(expectedValues: string[]) {
        await this.verifyCellValuesByColumnHeader('Logger Number', expectedValues);
    }

}