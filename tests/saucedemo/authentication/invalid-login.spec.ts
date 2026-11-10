import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('1. Sign in', () => {
  test('Reject invalid and missing sign-in credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Starting state: open the sign-in page in a fresh session. Enter standard_user and an incorrect password, then select Login.
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Dismiss or replace the error, leave the username blank, enter secret_sauce, and select Login.
    await loginPage.dismissError();
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
