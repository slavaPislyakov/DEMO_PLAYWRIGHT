import { Page } from "@playwright/test";

let headersObj: { [key: string]: string };

export async function handleHeaderObjectForUrl(page: Page, url: string) {
  await page.route(`**${url}`, (route) => {
    if (route.request().url().includes(url)) {
      headersObj = route.request().headers();
    }
    return route.continue();
  });
}

export function getHeaderObject() {
  return headersObj;
}
