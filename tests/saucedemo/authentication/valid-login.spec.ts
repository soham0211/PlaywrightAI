import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('1. Sign in', () => {
  test('Sign in with a standard demo account', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: open a fresh session at https://www.saucedemo.com with no existing authenticated session.
    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // Enter standard_user as the username and secret_sauce as the password, then select Login.
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productCards).toHaveCount(6);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
