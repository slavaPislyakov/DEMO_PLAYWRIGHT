import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { BasketPage } from "../pages/BasketPage";
import { LoginPage } from "../pages/LoginPage";
import { BasketApi } from "@@/servicies/BasketApi";

type TPageFixtures = {
  homePage: HomePage;
  basketPage: BasketPage;
  loginPage: LoginPage;
};

type TServiceFixtures = {
  basketApi: BasketApi;
};

type TFixture = TPageFixtures & TServiceFixtures;

export const test = base.extend<TFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  basketPage: async ({ page }, use) => {
    await use(new BasketPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  basketApi: async ({ request }, use) => {
    await use(new BasketApi(request));
  },
});
