import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('3. Manage the shopping cart', () => {
  test('Continue shopping without losing cart contents', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: sign in as standard_user in a fresh session and add Sauce Labs Onesie to the cart.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Open the cart and select Continue Shopping.
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.itemNamed('Sauce Labs Onesie')).toBeVisible();
    await cartPage.continueShopping();
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.productAction('Sauce Labs Onesie', 'Remove')).toBeVisible();
  });
});
