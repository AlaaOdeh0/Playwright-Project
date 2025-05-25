import { Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) { }

    async addToCart(itemName: string) {
        // Wait for inventory list to load
        await this.page.waitForSelector('.inventory_item', { timeout: 10000 });

        // Wait for the specific item to be available
        const itemButton = this.page.locator(`.inventory_item:has-text("${itemName}") button`);

        await itemButton.waitFor({ state: 'visible', timeout: 10000 });
        await itemButton.click();
    }

    async removeFromCart(itemName: string) {
        await this.page.click(`text=${itemName} >> xpath=.. >> button:text("Remove")`);
    }

    async sortBy(option: string) {
        await this.page.waitForSelector('.product_sort_container', { state: 'visible', timeout: 60000 });
        await this.page.selectOption('.product_sort_container', { label: option });
    }

}