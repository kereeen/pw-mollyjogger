import { test, expect } from '@playwright/test';
import { time } from 'console';
const timeoutAmt = 15000;
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.mollyjogger.com/');
});
test.describe('Products List Page', () => {
  test('Verify Product Category Display', async ({ page}) => {
    await page.locator('#page')
    .getByRole('navigation')
    .getByRole('link', { name: 'Shop', exact:true }).hover();
    await page.getByRole('link', { name: 'Apparel', exact: true }).click();
    await expect(page).toHaveURL(/.*clothing-accessories/);
    await page.getByRole('link', { name: 'Arrowhead Canoe T-Shirt', exact: true }).click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    
    await expect(page.getByRole('link', { name: 'Arrowhead Canoe T-Shirt', exact: true })).toBeVisible();
  });

  test.describe('Sorting Products',() => {
    test('Alphabetical Sort: A-Z', async ({ page }) => {
      test.slow();
      await page.locator('#page')
      .getByRole('navigation')
      .getByRole('link', { name: 'Shop', exact:true }).hover();
      await page.getByRole('link', { name: 'Apparel', exact: true }).click();
      // wait for elements to load
      await page.waitForURL('**/inventory/clothing-accessories');
      await page.getByRole('link', { name: 'All Products' }).isVisible();
      // get the initial list of elements
      const unsortedItems: string[] = await page.$$eval('.product-title', (elements: Element[]) => 
        elements.map((element: Element) => (element.textContent || '').trim()));
      // sort the list of elements
      const expectedSortedItems = unsortedItems.slice().sort();
      // select sort
      await page.waitForURL('**/inventory/clothing-accessories');
      await page.getByRole('link', { name: 'All Products' }).isVisible();
      await page.locator('select[id="SortBy"]').selectOption('title-ascending');
      // wait for elements to load
      await page.waitForURL('**/inventory/clothing-accessories?sort_by=title-ascending');
      await expect(await page.locator('.product-title')).toHaveCount(unsortedItems.length, {
      timeout: timeoutAmt
      });
      // get sorted list of elements
      const sortedItems: string[] = await page.$$eval('.product-title', (elements: Element[]) =>
        elements.map((element: Element) => (element.textContent || '').trim()));
      await expect(sortedItems).toStrictEqual(expectedSortedItems);
    });

    test('Pricing Sort: Low to High', async ({ page }) => {
      test.slow();
      await page.locator('#page')
      .getByRole('navigation')
      .getByRole('link', { name: 'Shop', exact:true }).hover();
      await page.getByRole('link', { name: 'Apparel', exact: true }).click();
      // wait for elements to load
      await page.waitForURL('**/inventory/clothing-accessories');
      await page.getByRole('link', { name: 'All Products' }).isVisible();
      // get the initial list of elements
      const unsortedPrices = await page.$$eval('.money:not(.original-price)', elements => {
          return elements.map(element => {
              const text = element.textContent?.trim() || '';
              let value: number | null = parseFloat(text.replace(/[^0-9.]/g, ''));
              if (isNaN(value)) {
                value = null; // Replace NaN with null
              }
              return value;
          });
      });
      // sort the list of elements
      const expectedSortedPrices = [...unsortedPrices].sort((a, b) => a - b);
      // select sort
      await page.getByLabel('Sort by').click();
      await page.locator('select[id="SortBy"]').selectOption('price-ascending');
      // wait for elements to load
      await page.waitForURL('**/inventory/clothing-accessories?sort_by=price-ascending');
      await expect(await page.locator('.money:not(.original-price)')).toHaveCount(expectedSortedPrices.length, {
        timeout: timeoutAmt
        });
      // get sorted list of elements
      const sortedPrices = await page.$$eval('.money:not(.original-price)', elements => {
        return elements.map(element => {
          const text = element.textContent?.trim() || '';
          let value: number | null = parseFloat(text.replace(/[^0-9.]/g, ''));
          if (isNaN(value)) {
            value = null; // Replace NaN with null
          }
          return value;
        });
      });
      await expect(sortedPrices).toStrictEqual(expectedSortedPrices);
    });
  });
  test.describe('Viewing Products', () => {
    test('Verify Icon View', async ({ page }) => {
      await page.locator('#page')
      .getByRole('navigation')
      .getByRole('link', { name: 'Shop', exact:true }).hover();
      await page.getByRole('link', { name: 'Apparel', exact: true }).click();
      await page.getByRole('button', { name: 'Grid view' });
      let locator = page.locator('.collection-container > .products.products-grid');
      
      await expect(locator).toHaveClass(/products-grid/);
    });
    test('Verify List View', async ({ page }) => {
      await page.locator('#page')
      .getByRole('navigation')
      .getByRole('link', { name: 'Shop', exact:true }).hover();
      await page.getByRole('link', { name: 'Apparel', exact: true }).click();
      await page.getByRole('button', { name: 'Grid view' });
      const locator = page.locator('.collection-container > .products.products-grid');
      
      await expect(locator).toHaveClass(/products-grid/);
    });
  });
});
