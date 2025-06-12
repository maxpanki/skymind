import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './pages/Login.page';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        baseURL: process.env.BASE_URL,
    });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    // Save the authentication state to a file
    await loginPage.goto();
    await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

    await context.storageState({ path: '.auth/user.json' });

    // Get the bearer token from the cookies
    const bearerToken = 
        (await context.storageState()).cookies.find(cookie => cookie.name === 'KEYCLOAK_IDENTITY')?.value;
        
    // Clear filters by making a POST request to the API
    try {
        await fetch(`${process.env.API_BASE_URL}/users/preferences/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            },
            body: JSON.stringify({ value: '' })
        });
    } catch (error) {
        console.error('Error while reseting filters:', error);
    }

    await browser.close();
}

export default globalSetup;