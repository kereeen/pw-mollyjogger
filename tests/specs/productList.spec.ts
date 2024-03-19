import { test, expect } from '@playwright/test';
import { time } from 'console';
const timeout = 10000;
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
      await page.locator('#page')
      .getByRole('navigation')
      .getByRole('link', { name: 'Shop', exact:true }).hover();
      await page.getByRole('link', { name: 'Apparel', exact: true }).click();
      await page.getByText('Inventory').isVisible();
      const unsortedItems: string[] = await page.$$eval('.product-title', (elements: Element[]) => 
        elements.map((element: Element) => (element.textContent || '').trim()));
      await page.getByLabel('Sort by').selectOption('title-ascending');
      await page.getByText('Inventory').isVisible();
      await page.waitForTimeout(timeout); 
      const sortedItems: string[] = await page.$$eval('.product-title', (elements: Element[]) =>
        elements.map((element: Element) => (element.textContent || '').trim()));
      const expectedSortedItems = unsortedItems.slice().sort();
      
      await expect(sortedItems).toEqual(expectedSortedItems);
    });

    test('Pricing Sort: Low to High', async ({ page }) => {
      await page.locator('#page')
      .getByRole('navigation')
      .getByRole('link', { name: 'Shop', exact:true }).hover();
      await page.getByRole('link', { name: 'Apparel', exact: true }).click();
      await page.getByText('Inventory').isVisible();
      const unsortedPrices = await page.$$eval('.money:not(.original-price)', elements => {
          return elements.map(element => {
              const text = element.textContent?.trim() || '';
              let value = parseFloat(text.replace(/[^0-9.]/g, ''));
              return value;
          });
      });
      const expectedSortedPrices = [...unsortedPrices].sort((a, b) => a - b);
      await page.getByLabel('Sort by').selectOption('price-ascending');
      await page.getByText('Inventory').isVisible();
      await page.waitForTimeout(timeout); 
      const sortedPrices = await page.$$eval('.money:not(.original-price)', elements => {
          return elements.map(element => {
            const text = element.textContent?.trim() || '';
            const value = parseFloat(text.replace(/[^0-9.]/g, ''));
              return value;
          });
      });
      await expect(sortedPrices).toEqual(expectedSortedPrices);
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
