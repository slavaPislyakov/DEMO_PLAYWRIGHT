import { APIRequestContext } from "@playwright/test";

import { headersResponse } from "@@/data/services/header";
import { SERVICE_URL } from "@@/data/urls";

export class BasketApi {
  constructor(readonly request: APIRequestContext) {}

  async clear() {
    await this.request.post(SERVICE_URL.BASKET_CLEAN, {
      headers: headersResponse,
    });
  }
}
