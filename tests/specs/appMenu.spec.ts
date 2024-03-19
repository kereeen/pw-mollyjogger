import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
});
test.describe('App Menu', () => {
    test('Verify that the App Menu is visible', async ({ page }) => {
        await page.goto('https://www.mollyjogger.com/');
        await expect(page.getByRole('link', { name: 'Menu' })).toBeVisible();
    });
    test('Verify Hamburger Menu Opens App', async ({ page }) => {
        await page.goto('https://www.mollyjogger.com/');
        await page.getByRole('link', { name: 'Menu' }).click();
        const menuLocator = page.locator('#menu');
        await expect(menuLocator).toBeVisible();
    });
    test('Verify that the Shop Accordion is shown when shop is clicked', async ({ page }) => {
        await page.goto('https://www.mollyjogger.com/');
        await page.getByRole('link', { name: 'Menu' }).click();
        await page.locator('#menu').getByRole('link', { name: 'Shop' }).click();
        await expect(page.locator('#menu > ul > li.has-dropdown.expanded > ul')).toBeVisible();
        await page.locator('#menu').getByRole('link', { name: 'Shop' }).click();
        await expect(page.locator('#menu > ul > li.has-dropdown.expanded > ul')).toBeHidden();
    });
    test('Verify accordion menu redirect ', async ({ page }) => {
        await page.goto('https://www.mollyjogger.com/');
        await page.getByRole('link', { name: 'Menu' }).click();
        await page.locator('#menu').getByRole('link', { name: 'Shop' }).click();
        await page.locator('#menu').getByText('Classic Jones Hats').click();
        await expect(page.getByRole('heading', { name: 'Jones Cap Hats' })).toBeVisible();
        await expect(page.locator('h1')).toHaveText('Jones Cap Hats');
    });
});