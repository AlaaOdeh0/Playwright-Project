const username = process.env.USERNAME;
const password = process.env.PASSWORD;

import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';


test('Add item to cart', async ({ page }) => {
  const products = new ProductsPage(page);
  await products.addToCart('Sauce Labs Backpack');
  const cart = new CartPage(page);
  await cart.goto();
  await expect(page.locator('.cart_item')).toContainText('Backpack');
});