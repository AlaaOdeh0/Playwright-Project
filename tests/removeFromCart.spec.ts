import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

test('Remove item from cart', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addToCart('Sauce Labs Backpack');
    await cart.goto();

    await cart.removeFromCart('Sauce Labs Backpack');

    await expect(page.locator('.cart_item')).toHaveCount(0);
});
