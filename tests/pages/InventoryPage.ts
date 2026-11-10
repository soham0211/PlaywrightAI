import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

type SortOption = 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)';

const SORT_VALUES: Record<SortOption, string> = {
  'Name (A to Z)': 'az',
  'Name (Z to A)': 'za',
  'Price (low to high)': 'lohi',
  'Price (high to low)': 'hilo',
};

export class InventoryPage extends BasePage {
  readonly productsHeading = this.page.getByText('Products', { exact: true });

  readonly productCards = this.page.locator('.inventory_item');

  readonly productNames = this.page.locator('.inventory_item_name');

  readonly productDescriptions = this.page.locator('.inventory_item_desc');

  readonly productPrices = this.page.locator('.inventory_item_price');

  readonly addToCartButtons = this.page.getByRole('button', { name: 'Add to cart', exact: true });

  readonly sortControl = this.page.getByRole('combobox', { name: 'Sort products' });

  productNameAt(index: number): Locator {
    return this.productCards.nth(index).locator('.inventory_item_name');
  }
 
  productPriceAt(index: number): Locator {
    return this.productCards.nth(index).locator('.inventory_item_price');
  }

  private productCard(name: string): Locator {
    return this.productCards.filter({ hasText: name });
  }

  productAction(name: string, action: 'Add to cart' | 'Remove'): Locator {
    return this.productCard(name).getByRole('button', { name: action, exact: true });
  }



  async gotoDirectly(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortControl.selectOption(SORT_VALUES[option]);
  }

  async openProduct(name: string): Promise<void> {
    await this.page.getByRole('button', { name: `View details for ${name}` }).click();
  }

  async addProductToCart(name: string): Promise<void> {
    await this.productAction(name, 'Add to cart').click();
  }

  async openCart(): Promise<void> {
    await this.page.getByRole('button', { name: /^Cart/ }).click();
  }


}
