import { expect, Locator, Page } from "@playwright/test";

import { NavBar } from "../components/NavBar";

import { ENDPOINT_URLS } from "@@/data/endpoint_urls";

export class LoginPage {
  readonly navBar: NavBar;

  private readonly loginInput: Locator;
  private readonly warningMessageLoginInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(readonly page: Page) {
    this.navBar = new NavBar(page);

    this.loginInput = page.locator('[name="LoginForm[username]"]');
    this.warningMessageLoginInput = page.locator(".field-loginform-username .invalid-feedback");
    this.passwordInput = page.locator('[name="LoginForm[password]"]');
    this.loginButton = page.locator('[name="login-button"]');
  }

  async typeTextToLoginInput(login: string) {
    await expect(this.warningMessageLoginInput).toBeHidden();
    await this.loginInput.pressSequentially(login);
  }

  async typeTextToPasswordInput(password: string) {
    await this.passwordInput.pressSequentially(password);
  }

  async selectLoginButton() {
    const basketGetEndpoint = this.page.waitForResponse(ENDPOINT_URLS.BASKET.GET);
    const productGetEndpoint = this.page.waitForResponse(ENDPOINT_URLS.PRODUCTS.GET);

    await Promise.all([basketGetEndpoint, productGetEndpoint, this.loginButton.click()]);
  }
}
