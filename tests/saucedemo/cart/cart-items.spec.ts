import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('3. Manage the shopping cart', () => {
  test('Review and remove cart items', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: sign in as standard_user in a fresh session and add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Open the cart.
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.cartHeading).toBeVisible();
    await expect(cartPage.itemNamed('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.itemNamed('Sauce Labs Bike Light')).toBeVisible();
    await expect(cartPage.itemPrice('Sauce Labs Backpack')).toHaveText('$29.99');
    await expect(cartPage.itemPrice('Sauce Labs Bike Light')).toHaveText('$9.99');
    await expect(cartPage.itemQuantity('Sauce Labs Backpack')).toHaveText('1');
    await expect(cartPage.itemQuantity('Sauce Labs Bike Light')).toHaveText('1');
    await expect(cartPage.itemRemoveButton('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.itemRemoveButton('Sauce Labs Bike Light')).toBeVisible();
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();

    // Remove Sauce Labs Backpack from the cart.
    await cartPage.removeItem('Sauce Labs Backpack');
    await expect(cartPage.itemNamed('Sauce Labs Backpack')).toHaveCount(0);
    await expect(cartPage.itemNamed('Sauce Labs Bike Light')).toBeVisible();
    await expect(cartPage.cartBadge).toHaveText('1');

    // Remove the remaining item.
    await cartPage.removeItem('Sauce Labs Bike Light');
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });
});
