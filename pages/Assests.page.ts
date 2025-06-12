import { Page } from '@playwright/test';
import { BasePage } from './Base.page';

export class AssetsPage extends BasePage {

    constructor(page: Page) {
        super(page, './asset-management/assets');
    }

    async verifyAssetNumberColumnValues(expectedValues: string[]) {
        await this.verifyCellValuesByColumnHeader('Asset Number', expectedValues);
    }

    async seeEmptyTableState() {
        await this.seeMessageInTableState('No assets found for selected filters.');
    }

}