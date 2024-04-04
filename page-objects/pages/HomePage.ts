import { Locator, Page } from "@playwright/test";

import { NavBar } from "../components/NavBar";
import { BasketModal } from "../components/BasketModal";

import { ENDPOINT_URLS } from "@@/data/endpoint_urls";
import { PAGE_URL } from "@@/data/urls";

export class HomePage {
  readonly navBar: NavBar;
  readonly basketModal: BasketModal;

  private readonly buyButton: Locator;
  private readonly productCountInput: Locator;
  private readonly productCard: (product: string) => Locator;
  private readonly paginatorPage: (pageNumber: string) => Locator;

  constructor(readonly page: Page) {
    this.navBar = new NavBar(page);
    this.basketModal = new BasketModal(page);

    this.productCard = (product: string) => page.locator(`.col-3.mb-5:has-text("${product}")`);
    this.buyButton = page.locator(".actionBuyProduct");
    this.productCountInput = page.locator('[name="product-enter-count"]');
    this.paginatorPage = (pageNumber: string) => page.locator(`[data-page-number='${pageNumber}']`);
  }

  async visitPage() {
    await this.page.goto(PAGE_URL.HOME);
  }

  async selectBuyButtonForProduct(products: string | string[]) {
    const productArray = Array.isArray(products) ? products : [products];

    for (const product of productArray) {
      const basketCreateEndpoint = this.page.waitForResponse(ENDPOINT_URLS.BASKET.CREATE);
      const basketGetEndpoint = this.page.waitForResponse(ENDPOINT_URLS.BASKET.GET);

      const productElement = this.productCard(product);
      const buyButtonForCurrentProduct = productElement.locator(this.buyButton);

      await Promise.all([basketCreateEndpoint, basketGetEndpoint, buyButtonForCurrentProduct.click()]);
    }
  }

  async typeItemCountForProduct(product: string, count: number) {
    const productElement = this.productCard(product);
    const productCountInput = productElement.locator(this.productCountInput);

    await productCountInput.fill(count.toString());
  }

  async selectPaginationPage(pageNumber: string) {
    const productGetEndpoint = this.page.waitForResponse(ENDPOINT_URLS.PRODUCTS.GET);

    await Promise.all([productGetEndpoint, this.paginatorPage(pageNumber).click()]);
  }
}
