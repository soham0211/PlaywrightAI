import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('1. Sign in', () => {
  test('Show the locked-out account error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: open the sign-in page in a fresh session. Enter locked_out_user and secret_sauce, then select Login.
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('user has been locked out');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
