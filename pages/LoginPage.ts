import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

    async login(username: string, password: string) {
        await this.page.fill('#user-name', '');
        await this.page.fill('#user-name', username);

        await this.page.fill('#password', '');
        await this.page.fill('#password', password);

        await Promise.all([
            this.page.waitForSelector('.inventory_list', { timeout: 10000 }), 
            this.page.click('#login-button'),
        ]);
    }
}