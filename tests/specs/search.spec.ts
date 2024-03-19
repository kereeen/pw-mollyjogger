import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.mollyjogger.com/');
});
test.describe('App Menu', () => {
    test('Verify search results are properly displaying', async ({ page }) => {
        await page.getByRole('link', { name: 'Search' }).click();
        const searchKey = "Knife";
        await page.	locator('div').filter({ hasText: 'Search Close menu Menu Search Log in Create account 0 Cart' }).getByPlaceholder('Search our store').fill(searchKey);
        await page.keyboard.press('Enter');
        const headerString = `Your search for "${searchKey}"`;
        await expect.soft(page.getByRole('heading', { name: headerString })).toBeVisible();
        
        const searchResults = await page.$$('.search-list > .box.product:not(.article)');
        for (const result of searchResults) {
            const textContent = await result.textContent();
            expect.soft(textContent).toContain(searchKey);
        }
    });
});