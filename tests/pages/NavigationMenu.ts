import { BasePage } from './BasePage';

export class NavigationMenu extends BasePage {
  readonly openMenuButton = this.page.getByRole('button', { name: 'Open Menu' });
  readonly logoutLink = this.page.getByText('Logout', { exact: true });

  async open(): Promise<void> {
    await this.openMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
