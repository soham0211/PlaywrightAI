import { expect, test } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';
import { CheckoutInformationPage } from '../../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('4. Complete checkout', () => {
  test('Review totals and complete a purchase', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: sign in as standard_user in a fresh session, add Sauce Labs Backpack to the cart, and proceed to Checkout: Your Information.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    const checkoutInformationPage = new CheckoutInformationPage(page);
    await expect(checkoutInformationPage.heading).toBeVisible();

    // Enter Alex as First Name, Tester as Last Name, and 12345 as Zip/Postal Code, then select Continue.
    await checkoutInformationPage.fillCustomerInformation('Alex', 'Tester', '12345');
    await checkoutInformationPage.continue();
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await expect(checkoutOverviewPage.heading).toBeVisible();
    await expect(checkoutOverviewPage.itemNamed('Sauce Labs Backpack')).toBeVisible();
    await expect(checkoutOverviewPage.paymentInformation).toBeVisible();
    await expect(checkoutOverviewPage.shippingInformation).toBeVisible();
    await expect(checkoutOverviewPage.subtotal).toHaveText('Item total: $29.99');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $2.40');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $32.39');

    // Select Finish.
    await checkoutOverviewPage.finish();
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(checkoutCompletePage.heading).toBeVisible();
    await expect(checkoutCompletePage.confirmation).toBeVisible();
    await expect(checkoutCompletePage.cartBadge).toHaveCount(0);

    // Select Back Home.
    await checkoutCompletePage.backHome();
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
