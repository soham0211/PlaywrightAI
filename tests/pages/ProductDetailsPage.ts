import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {
  readonly productName = this.page.locator('.inventory_details_name');

  readonly productDescription = this.page.locator('.inventory_details_desc');

  readonly productPrice = this.page.locator('.inventory_details_price');

  readonly addToCartButton = this.page.getByRole('button', { name: 'Add to cart', exact: true });

  async backToProducts(): Promise<void> {
    await this.page.getByRole('button', { name: 'Back to products' }).click();
  }
}
