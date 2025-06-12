import { Page } from '@playwright/test';
import { BasePage } from './Base.page';

export class ShipmentsPage extends BasePage {

    constructor(page: Page) {
        super(page, './track-and-trace/shipments');
    }

    async verifyShipmentNumberColumnValues(expectedValues: string[]) {
        await this.verifyCellValuesByColumnHeader('Reference / PO Number', expectedValues);
    }

}