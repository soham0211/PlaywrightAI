import { BasePage } from './BasePage';

export class CheckoutInformationPage extends BasePage {
  readonly heading = this.page.getByText('Checkout: Your Information', { exact: true });

  readonly firstNameInput = this.page.getByRole('textbox', { name: 'First Name' });

  readonly lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });

  readonly postalCodeInput = this.page.getByRole('textbox', { name: 'Zip/Postal Code' });

  readonly errorMessage = this.page.getByRole('alert');

  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async cancel(): Promise<void> {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }
}
