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

test('Cart should persist after page reload', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addToCart('Sauce Labs Backpack');

    // Reload the page
    await page.reload();

    // Go to cart
    await cart.goto();

    // Verify that the item is still in the cart
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toContainText('Sauce Labs Backpack');
});
