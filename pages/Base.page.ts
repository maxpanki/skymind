import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
    private readonly page: Page;
    private readonly table: Locator;
    private readonly rows: Locator;
    private readonly columnHeaders: Locator;
    private readonly tableLoader: Locator;
    private readonly url: string;
    private readonly filterType: Locator;
    private readonly openFilterButton: Locator;
    private readonly headerOnFilterDrawer: Locator;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;

        this.table = this.page.getByRole('grid');
        this.rows = this.table.getByRole('row');
        this.columnHeaders = this.table.getByRole('columnheader');
        this.tableLoader = this.table.getByRole('progressbar');
        this.filterType = page.locator('[data-id="airportOptions"]');
        this.openFilterButton = page.getByTitle('Filters');
        this.headerOnFilterDrawer = page.getByText('Filters', { exact: true });
    }

    async openTableView() {
        await this.page.goto(`${this.url}?view=table`);
    }

    async openFilterDrawer() {
        await this.openFilterButton.click();
        await expect(this.headerOnFilterDrawer).toBeVisible();
    }

    async getFilterType(filterType: string): Promise<Locator> {
        return this.filterType.filter({ hasText: filterType });
    }

    async getFilterCheckbox(filterType: string, filterName: string): Promise<Locator> {
        const filterTypeLocator = await this.getFilterType(filterType);
        const filterCheckbox = filterTypeLocator
            .getByRole('listitem')
            .filter({ has: this.page.getByText(filterName) })
            .getByRole('checkbox');

        return filterCheckbox;
    }

    async checkFilter(filterType: string, filterName: string) {
        const filterCheckbox = await this.getFilterCheckbox(filterType, filterName);
        await filterCheckbox.check();
    }

    async uncheckFilter(filterType: string, filterName: string) {
        const filterCheckbox = await this.getFilterCheckbox(filterType, filterName);
        await filterCheckbox.uncheck();
    }

    async getCellsByColumnHeader(headerName: string): Promise<string[]> {
        const headers = await this.columnHeaders.allTextContents();
        // Ensure header is not selected
        const rows = (await this.rows.all()).slice(1);
        const columnIndex = headers.indexOf(headerName);

        const cells = rows.map(async row => {
            const cells = await row.getByRole('gridcell').allTextContents();
            
            return cells[columnIndex];
        });

        return Promise.all(cells);
    }

    async verifyCellValuesByColumnHeader(headerName: string, expectedValues: string[]): Promise<void> {
        await this.tableLoader.waitFor({ state: 'detached' });
        const actualValues = await this.getCellsByColumnHeader(headerName);
        expect(actualValues).toEqual(expectedValues);
    }

    async waitForTableToLoad(): Promise<void> {
        await this.tableLoader.waitFor({ state: 'attached' });
        await this.tableLoader.waitFor({ state: 'detached' });
    }

    async seeMessageInTableState(message: string): Promise<void> {
        const tableState = this.table.getByText(message);
        await expect(tableState).toBeVisible();
    }

}
