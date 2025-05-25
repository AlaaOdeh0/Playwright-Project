import { Page } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) { }

    async fillDetails(first: string, last: string, zip: string) {
        await this.page.fill('#first-name', first);
        await this.page.fill('#last-name', last);
        await this.page.fill('#postal-code', zip);
        await this.page.click('#continue');
        await this.page.click('#finish');
    }
}