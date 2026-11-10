import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('2. Discover products', () => {
  test('Add a product from the catalog', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: sign in as standard_user in a fresh session with an empty cart.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveCount(0);

    // Select Add to cart on the Sauce Labs Backpack product card.
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.productAction('Sauce Labs Backpack', 'Remove')).toBeVisible();
  });
});
