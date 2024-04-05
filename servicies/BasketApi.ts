import { APIRequestContext } from "@playwright/test";

import { SERVICE_URL } from "@@/data/urls";

export class BasketApi {
  constructor(readonly request: APIRequestContext) {}

  async clear(headerObj: { [key: string]: string }) {
    await this.request.post(SERVICE_URL.BASKET_CLEAN, {
      headers: headerObj,
    });
  }
}
