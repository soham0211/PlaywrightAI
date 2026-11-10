import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  readonly heading = this.page.getByText('Checkout: Overview', { exact: true });

  readonly paymentInformation = this.page.getByText('Payment Information:', { exact: true });

  readonly shippingInformation = this.page.getByText('Shipping Information:', { exact: true });

  readonly subtotal = this.page.getByText(/^Item total:/);

  readonly tax = this.page.getByText(/^Tax:/);

  readonly total = this.page.getByText(/^Total:/);

  itemNamed(name: string): Locator {
    return this.page.getByRole('button', { name: `View details for ${name}` });
  }

  async finish(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async cancel(): Promise<void> {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }
}
