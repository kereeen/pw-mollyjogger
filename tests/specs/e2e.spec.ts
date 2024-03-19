import { test, expect, type Page } from '@playwright/test';
const knifePrice = 49.95;
const stickersPrice = 8.00;

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.mollyjogger.com/');
});

test.describe('E2E Checkout', () => {
    test('Verify Product Added to Cart and Successful Navigation to Checkout', async ({ page }) => {
        await page.locator('#page')
            .getByRole('navigation')
            .getByRole('link', { name: 'Shop', exact:true }).hover();
        await page.getByRole('link', { name: 'SHOP ALL', exact: true}).click();
        await page.getByRole('link', { name: 'Scrimshaw Knife Kit', exact: true }).click();
        await page.getByRole('button', { name: 'Add to Cart' }).click();
       
        await expect(page.getByRole('link', { name: 'Scrimshaw Knife Kit', exact: true })).toBeVisible();
        await expect(page.locator('.variant').getByText('Lockback Knife')).toBeVisible();
        
        await page.getByRole('button', { name: '+' }).click();
        await page.getByRole('button', { name: 'Check Out' }).click();
       
        await expect(page).toHaveURL(/.*checkouts/);
        await expect(page.getByText('Order summaryShopping').getByText('Scrimshaw Knife Kit')).toBeVisible();
        await expect(page.getByLabel('Cost summary').getByRole('cell', { name: `$${(knifePrice*2).toFixed(2)}`, exact: true }).locator('span')).toBeVisible();
    });

    test('Verify Successful Multiple Products to Checkout', async ({ page }) => {
        await page.locator('#page')
            .getByRole('navigation')
            .getByRole('link', { name: 'Shop', exact:true }).hover();
        await page.getByRole('link', { name: 'SHOP ALL', exact: true}).click();
        await page.getByRole('link', { name: 'Scrimshaw Knife Kit', exact: true }).click();
        await page.getByRole('button', { name: 'Add to Cart' }).click();
        await page.locator('#page').getByRole('navigation').getByRole('link', { name: 'Shop', exact: true }).click();
        await page.getByRole('link', { name: 'Civilian Conservation Corps Stickers' }).click();
        await page.getByRole('button', { name: 'Add to Cart' }).click();
        
        await expect(page.locator('.cart-item-title > .title').getByText('Civilian Conservation Corps Stickers')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Scrimshaw Knife Kit', exact: true })).toBeVisible();
        await expect(page.locator('.cart-item-title > .variant').getByText('Lockback Knife')).toBeVisible();
        await expect(page.getByText(`Subtotal $${(knifePrice+stickersPrice).toFixed(2)}`)).toBeVisible();
    });
 });
