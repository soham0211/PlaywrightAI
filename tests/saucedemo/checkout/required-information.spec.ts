import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInformationPage } from '../../pages/CheckoutInformationPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('4. Complete checkout', () => {
  test('Require customer information before checkout can continue', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: sign in as standard_user in a fresh session, add one product, open the cart, and select Checkout.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    const checkoutInformationPage = new CheckoutInformationPage(page);
    await expect(checkoutInformationPage.heading).toBeVisible();
    await expect(checkoutInformationPage.firstNameInput).toBeVisible();
    await expect(checkoutInformationPage.lastNameInput).toBeVisible();
    await expect(checkoutInformationPage.postalCodeInput).toBeVisible();

    // Leave all fields blank and select Continue.
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('First Name is required');
    await expect(checkoutInformationPage.heading).toBeVisible();

    // Enter a first name only and select Continue.
    await checkoutInformationPage.enterFirstName('Alex');
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('Last Name is required');
    await expect(checkoutInformationPage.heading).toBeVisible();

    // Enter a last name but leave Zip/Postal Code blank, then select Continue.
    await checkoutInformationPage.enterLastName('Tester');
    await checkoutInformationPage.continue();
    await expect(checkoutInformationPage.errorMessage).toContainText('Postal Code is required');
    await expect(checkoutInformationPage.heading).toBeVisible();
  });
});
