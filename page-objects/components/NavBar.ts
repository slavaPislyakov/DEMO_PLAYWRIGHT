import { expect, Locator, Page } from "@playwright/test";

export class NavBar {
  private readonly loginButton: Locator;
  private readonly avatar: Locator;
  private readonly userName: Locator;
  private readonly basketButton: Locator;
  private readonly basketIcon: Locator;
  private readonly basketCount: Locator;

  constructor(readonly page: Page) {
    this.loginButton = page.locator("//*[@href='/login']");
    this.avatar = page.locator("//*[@class='user-avatar mr-2']");
    this.userName = page.locator("//*[@id='dropdownUser']/div[@class='text-uppercase']");
    this.basketButton = page.locator("//*[@id='dropdownBasket']");
    this.basketIcon = page.locator("//*[contains(@class, 'basket_icon')]");
    this.basketCount = page.locator("//*[contains(@class, 'basket-count-items')]");
  }

  async selectLoginButton() {
    await this.loginButton.click();
  }

  async checkAvatarIsVisible() {
    await expect(this.avatar).toBeVisible();
  }

  async checkUserName(userName: string) {
    await expect(this.userName).toHaveText(userName);
  }

  async checkBasketIsEmpty() {
    await expect(this.basketCount).toHaveText("0");
  }

  async checkBasketCountShouldBeEqualTo(count: string) {
    await expect(this.basketCount).toHaveText(count);
  }

  async selectBasketIcon() {
    await this.basketIcon.click();
  }

  async selectBasketButton() {
    await this.basketButton.click();
  }
}
