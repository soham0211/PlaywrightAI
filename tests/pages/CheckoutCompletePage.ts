import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  readonly heading = this.page.getByText('Checkout: Complete!', { exact: true });

  readonly confirmation = this.page.getByRole('heading', { name: 'Thank you for your order!' });

  async backHome(): Promise<void> {
    await this.page.getByRole('button', { name: 'Back Home' }).click();
  }
}
