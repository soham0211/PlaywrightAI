import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInformationPage } from '../../pages/CheckoutInformationPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('4. Complete checkout', () => {
  test('Cancel checkout without placing an order', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: sign in as standard_user in a fresh session, add one product, and proceed to the checkout information step.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    const checkoutInformationPage = new CheckoutInformationPage(page);
    await expect(checkoutInformationPage.heading).toBeVisible();

    // Select Cancel.
    await checkoutInformationPage.cancel();
    await expect(cartPage.cartHeading).toBeVisible();
    await expect(cartPage.itemNamed('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.cartBadge).toHaveText('1');
    await expect(checkoutInformationPage.heading).toHaveCount(0);
  });
});
