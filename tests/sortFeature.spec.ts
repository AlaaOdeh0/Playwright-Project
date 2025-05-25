import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Sort Feature', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
        await login.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
    });

    test('Sort products A to Z', async ({ page }) => {
        const products = new ProductsPage(page);
        await products.sortBy('Name (A to Z)');
    });

    test('Sort products by Price High to Low', async ({ page }) => {
        const products = new ProductsPage(page);
        await products.sortBy('Price (high to low)');
    });
});
