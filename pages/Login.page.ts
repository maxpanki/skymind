import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly emailAddressInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailAddressInput = this.page.getByRole('textbox', { name: 'Email Address' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        await this.page.goto('./');
        await expect(this.page).toHaveTitle('Sign in to SkyMind');
    }

    async login(username: string, password: string) {
        await this.emailAddressInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForURL('./');
    }
}