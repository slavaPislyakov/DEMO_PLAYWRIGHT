import { Page } from "@playwright/test";

import { NavBar } from "../components/NavBar";

import { BasketModal } from "../components/BasketModal";

export class BasketPage {
  readonly navBar: NavBar;
  readonly basketModal: BasketModal;

  constructor(readonly page: Page) {
    this.navBar = new NavBar(page);
    this.basketModal = new BasketModal(page);
    this.page = page;
  }

  async checkBasketPageURL() {
    await this.page.waitForURL(/\/basket/);
  }
}
