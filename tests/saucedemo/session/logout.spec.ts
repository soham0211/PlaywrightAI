import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { NavigationMenu } from '../../pages/NavigationMenu';

test.describe('5. End the session', () => {
  test('Log out and verify protected-page access', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: sign in as standard_user in a fresh session and confirm that the Products catalog is visible.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.productsHeading).toBeVisible();

    // Open the navigation menu and select Logout.
    const navigationMenu = new NavigationMenu(page);
    await navigationMenu.open();
    await navigationMenu.logout();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(inventoryPage.productsHeading).toHaveCount(0);

    // Navigate directly to https://www.saucedemo.com/inventory.html.
    await inventoryPage.gotoDirectly();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
