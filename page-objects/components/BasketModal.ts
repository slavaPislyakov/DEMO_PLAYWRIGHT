import { expect, Page, Locator } from "@playwright/test";
import { basket_modal } from "@@/data/modals/basket_modal";
import * as stringUtils from "@@/utils/stringUtils";

export class BasketModal {
  private readonly basketModal: Locator;
  private readonly productLine: (product: string) => Locator;
  private readonly itemName: Locator;
  private readonly itemPrice: Locator;
  private readonly totalPrice: Locator;
  private readonly moveToBasketButton: Locator;

  constructor(readonly page: Page) {
    this.basketModal = page.locator('//*[@class="dropdown-menu dropdown-menu-right show"]');
    this.productLine = (product: string) =>
      page.locator(`//*[contains(@class, "list-group-item") and descendant::span[contains(text(), "${product}")]]`);
    this.itemName = page.locator('//*[@class="basket-item-title"]');
    this.itemPrice = page.locator('//*[@class="basket-item-price"]');
    this.totalPrice = page.locator('//*[@class="basket_price"]');
    this.moveToBasketButton = page.locator('//*[@href="/basket"]');
  }

  async basketModalIsVisible() {
    await expect(this.basketModal).toBeVisible();
  }

  async checkBasketModal(
    product: { name: string; price: number; count?: number } | { name: string; price: number; count?: number }[],
  ) {
    let totalPrice = 0;
    const productsArr = Array.isArray(product) ? product : [product];

    for (const product of productsArr) {
      const { name, price, count = 1 } = product;
      const normalizeProductPrice = stringUtils.stringFormat(basket_modal.productItemPrice, (price * count).toString());
      const productLineItem = this.productLine(name);
      totalPrice += price * count;

      await expect(productLineItem.locator(this.itemName)).toHaveText(name);
      await expect(productLineItem.locator(this.itemPrice)).toHaveText(normalizeProductPrice);
    }

    await expect(this.totalPrice).toHaveText(totalPrice.toString());
  }

  async selectMoveToBasketButton() {
    await this.basketModal.locator(this.moveToBasketButton).click();
  }
}
