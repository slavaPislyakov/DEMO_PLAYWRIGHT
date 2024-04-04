import { test } from "@@/page-objects/fixtures/pageFixtures";

import { CREDENTIALS } from "@@/data/credentials";
import { PRODUCTS } from "@@/data/products";

test.describe("LoginPage", () => {
  test.beforeEach(async ({ homePage, loginPage }) => {
    await homePage.visitPage();
    await homePage.navBar.selectLoginButton();
    await loginPage.typeTextToLoginInput(CREDENTIALS.TEST_USER.LOGIN);
    await loginPage.typeTextToPasswordInput(CREDENTIALS.TEST_USER.PASSWORD);
    await loginPage.selectLoginButton();
    await homePage.navBar.checkAvatarIsVisible();
    await homePage.navBar.checkUserName(CREDENTIALS.TEST_USER.LOGIN);
  });

  test.afterEach(async ({ basketApi }) => {
    await basketApi.clear();
  });

  // TODO: error `ReferenceError: showToast is not defined` is displayed when click on empty basket
  test("Check empty basket", async ({ homePage, basketPage }) => {
    await homePage.navBar.checkBasketIsEmpty();
    await homePage.navBar.selectBasketIcon();
    await homePage.basketModal.basketModalIsVisible();
    await homePage.basketModal.selectMoveToBasketButton();
    await basketPage.checkBasketPageURL();
    await basketPage.navBar.checkAvatarIsVisible();
    await basketPage.navBar.checkUserName(CREDENTIALS.TEST_USER.LOGIN);
  });

  test("Check basket with one not promotional product", async ({ homePage, basketPage }) => {
    await homePage.navBar.checkBasketIsEmpty();
    await homePage.selectBuyButtonForProduct(PRODUCTS.NOTEPAD_TO_THE_POINT.name);
    await homePage.navBar.checkBasketCountShouldBeEqualTo("1");
    await homePage.navBar.selectBasketIcon();
    await homePage.basketModal.basketModalIsVisible();
    await homePage.basketModal.checkBasketModal(PRODUCTS.NOTEPAD_TO_THE_POINT);
    await homePage.basketModal.selectMoveToBasketButton();
    await basketPage.checkBasketPageURL();
    await basketPage.navBar.checkAvatarIsVisible();
    await basketPage.navBar.checkUserName(CREDENTIALS.TEST_USER.LOGIN);
  });

  test("Check basket with one promotional product", async ({ homePage, basketPage }) => {
    await homePage.navBar.checkBasketIsEmpty();
    await homePage.selectBuyButtonForProduct(PRODUCTS.GAME_OF_THRONES.name);
    await homePage.navBar.checkBasketCountShouldBeEqualTo("1");
    await homePage.navBar.selectBasketButton();
    await homePage.basketModal.basketModalIsVisible();
    await homePage.basketModal.checkBasketModal(PRODUCTS.GAME_OF_THRONES);
    await homePage.basketModal.selectMoveToBasketButton();
    await basketPage.checkBasketPageURL();
    await basketPage.navBar.checkAvatarIsVisible();
    await basketPage.navBar.checkUserName(CREDENTIALS.TEST_USER.LOGIN);
  });

  // TODO: after select 9 different product items and click on basket button we immediately move to basket page and basket modal not visible
  test("Check basket with nine different products", async ({ homePage, basketPage }) => {
    await homePage.selectBuyButtonForProduct(PRODUCTS.CREATIVE_MESS.name);
    await homePage.navBar.checkBasketCountShouldBeEqualTo("1");
    await homePage.selectBuyButtonForProduct([
      PRODUCTS.NOTEPAD_TO_THE_POINT.name,
      PRODUCTS.GAME_OF_THRONES.name,
      PRODUCTS.KITTY_MARIE.name,
      PRODUCTS.MUSIC_BOOK.name,
      PRODUCTS.BLACK_AND_RED.name,
      PRODUCTS.GOOSE_DEADLINE.name,
      PRODUCTS.ARTIST.name,
    ]);
    await homePage.navBar.checkBasketCountShouldBeEqualTo("8");
    await homePage.selectPaginationPage("2");
    await homePage.selectBuyButtonForProduct(PRODUCTS.LITTLE_RED_RIDING_HOOD.name);
    await homePage.navBar.checkBasketCountShouldBeEqualTo("9");
    await homePage.navBar.selectBasketButton();
    await homePage.basketModal.basketModalIsVisible();
    await homePage.basketModal.checkBasketModal([
      PRODUCTS.CREATIVE_MESS,
      PRODUCTS.NOTEPAD_TO_THE_POINT,
      PRODUCTS.GAME_OF_THRONES,
      PRODUCTS.KITTY_MARIE,
      PRODUCTS.MUSIC_BOOK,
      PRODUCTS.BLACK_AND_RED,
      PRODUCTS.GOOSE_DEADLINE,
      PRODUCTS.ARTIST,
      PRODUCTS.LITTLE_RED_RIDING_HOOD,
    ]);
    await homePage.basketModal.selectMoveToBasketButton();
    await basketPage.checkBasketPageURL();
    await basketPage.navBar.checkAvatarIsVisible();
    await basketPage.navBar.checkUserName(CREDENTIALS.TEST_USER.LOGIN);
  });

  // TODO: after select 9 the same promotional product items and click on basket button we immediately move to basket page and basket modal not visible
  test("Check basket with the same nine promotional products", async ({ homePage, basketPage }) => {
    await homePage.navBar.checkBasketIsEmpty();
    await homePage.typeItemCountForProduct(PRODUCTS.CREATIVE_MESS.name, 9);
    await homePage.selectBuyButtonForProduct(PRODUCTS.CREATIVE_MESS.name);
    await homePage.navBar.checkBasketCountShouldBeEqualTo("9");
    await homePage.navBar.selectBasketButton();
    await homePage.basketModal.basketModalIsVisible();
    await homePage.basketModal.checkBasketModal({ ...PRODUCTS.CREATIVE_MESS, count: 9 });
    await homePage.basketModal.selectMoveToBasketButton();
    await basketPage.checkBasketPageURL();
    await basketPage.navBar.checkAvatarIsVisible();
    await basketPage.navBar.checkUserName(CREDENTIALS.TEST_USER.LOGIN);
  });
});
