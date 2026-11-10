import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartHeading = this.page.getByText('Your Cart', { exact: true });

  readonly cartItems = this.page.locator('.cart_item');

  readonly continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });

  readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });

  itemNamed(name: string): Locator {
    return this.itemCard(name).getByRole('button', { name: `View details for ${name}` });
  }

  itemPrice(name: string): Locator {
    return this.itemCard(name).locator('.inventory_item_price');
  }

  itemQuantity(name: string): Locator {
    return this.itemCard(name).locator('.cart_quantity');
  }

  itemRemoveButton(name: string): Locator {
    return this.itemCard(name).getByRole('button', { name: 'Remove', exact: true });
  }

  async removeItem(name: string): Promise<void> {
    await this.itemRemoveButton(name).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  private itemCard(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }
}
