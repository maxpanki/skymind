import { test } from '../fixtures/Pom.fixture';
import { LOGGERS_TABLE_FILTERED_DATA } from '../test-data/loggers-table-data';
import { SHIPMENTS_TABLE_FILTERED_DATA } from '../test-data/shipments-table-data';

test.describe('Table Filters', () => {

  test('Filtering on Loggers table page', async ({
    loggersPage,
    page
  }) => {
    await test.step('Navigate to Loggers page apply filter and check filtered values', async () => {
      await loggersPage.openTableView();
      await loggersPage.checkFilter('Pairing Status', 'Not Paired');
      await loggersPage.waitForTableToLoad();
      await loggersPage.verifyLoggerNumberColumnValues(LOGGERS_TABLE_FILTERED_DATA);
    });
  });

  test('Filtering on Assets table page', async ({
    assetsPage,
    page
  }) => {
    await test.step('Navigate to Assets page apply filter and check filtered values', async () => {
      await assetsPage.openTableView();
      await assetsPage.checkFilter('Asset Type', 'Container');
      await assetsPage.seeEmptyTableState();
    });
  });

  test('Filtering on Shipments table page', async ({
    shipmentsPage,
    page
  }) => {
    await test.step('Navigate to Shipments page and open filters', async () => {
      await shipmentsPage.openTableView();
      await shipmentsPage.openFilterDrawer();
    });

    await test.step('Apply filters and check filtered values', async () => {
      await shipmentsPage.uncheckFilter('Status', 'Not Started');
      await shipmentsPage.uncheckFilter('Status', 'In Transit');
      await shipmentsPage.checkFilter('Status', 'Closed');
      await shipmentsPage.waitForTableToLoad();
      await shipmentsPage.verifyShipmentNumberColumnValues(SHIPMENTS_TABLE_FILTERED_DATA);
    });
  });

});
