import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

test('Complete checkout process', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await products.addToCart('Sauce Labs Backpack');
    await cart.goto();
    await cart.checkout();
    await checkout.fillDetails('John', 'Doe', '12345');

    await expect(page.locator('.complete-header')).toContainText(/thank you/i);
});
