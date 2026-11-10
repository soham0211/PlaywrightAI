import type { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  readonly cartBadge: Locator = this.page.locator('.shopping_cart_badge');
}
