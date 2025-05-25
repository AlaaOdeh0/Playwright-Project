import { Page } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.click('.shopping_cart_link');
    }

    async checkout() {
        await this.page.click('#checkout');
    }

    async removeFromCart(productName: string) {
        const productId = productName.toLowerCase().replace(/\s+/g, '-');
        const removeButton = this.page.locator(`[data-test="remove-${productId}"]`);
        await removeButton.click();
    }

}