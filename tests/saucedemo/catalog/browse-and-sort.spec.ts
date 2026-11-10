import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';

test.describe('2. Discover products', () => {
  test('Browse product details and sort the catalog', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: sign in as standard_user in a fresh session and open the Products catalog.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.productCards).toHaveCount(6);
    await expect(inventoryPage.productNames).toHaveCount(6);
    await expect(inventoryPage.productDescriptions).toHaveCount(6);
    await expect(inventoryPage.productPrices).toHaveCount(6);
    await expect(inventoryPage.addToCartButtons).toHaveCount(6);
    await expect(inventoryPage.sortControl).toHaveValue('az');

    // Open the Sauce Labs Backpack product details.
    await inventoryPage.openProduct('Sauce Labs Backpack');
    const productDetailsPage = new ProductDetailsPage(page);
    await expect(productDetailsPage.productName).toHaveText('Sauce Labs Backpack');
    await expect(productDetailsPage.productDescription).toContainText('Sly Pack');
    await expect(productDetailsPage.productPrice).toHaveText('$29.99');
    await expect(productDetailsPage.addToCartButton).toBeVisible();

    // Return to the catalog and select Price (low to high) from Sort products.
    await productDetailsPage.backToProducts();
    await inventoryPage.sortBy('Price (low to high)');
    await expect(inventoryPage.productNameAt(0)).toHaveText('Sauce Labs Onesie');
    await expect(inventoryPage.productPriceAt(0)).toHaveText('$7.99');
    await expect(inventoryPage.productNameAt(5)).toHaveText('Sauce Labs Fleece Jacket');
    await expect(inventoryPage.productPriceAt(5)).toHaveText('$49.99');

    // Select Price (high to low) from Sort products.
    await inventoryPage.sortBy('Price (high to low)');
    await expect(inventoryPage.productNameAt(0)).toHaveText('Sauce Labs Fleece Jacket');
    await expect(inventoryPage.productPriceAt(0)).toHaveText('$49.99');
    await expect(inventoryPage.productNameAt(5)).toHaveText('Sauce Labs Onesie');
    await expect(inventoryPage.productPriceAt(5)).toHaveText('$7.99');
  });
});
