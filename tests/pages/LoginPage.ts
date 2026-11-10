import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });

  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });

  readonly loginButton = this.page.getByRole('button', { name: 'Login' });

  readonly errorMessage = this.page.getByRole('alert');

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async dismissError(): Promise<void> {
    await this.page.getByRole('button', { name: 'Dismiss error' }).click();
  }
}
