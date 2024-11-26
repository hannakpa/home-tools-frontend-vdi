import {Locator, Page} from "@playwright/test";

export class ShoppingListViewPage {
  readonly page: Page;
  readonly url: string = 'http://localhost:4200/shoppingLists/view'
  readonly getAllShoppingListsRequestUrl: string = 'http://localhost:9090/api/shoppingList?username=andre123'

  constructor(page: Page) {
    this.page = page;
  }

  public async navigateAndWaitForRequests() {
    const responsePromise = this.page.waitForResponse(this.getAllShoppingListsRequestUrl);
    await this.page.goto(this.url);
    await responsePromise;
  }

  public async navigateAndMockRequest() {
    await this.page.route('*/**/api/shoppingList**', async route => {
      const json = [
        {
          "id": 100,
          "name": "test1",
          "dueDate": "2023-08-01T12:11:06.187+00:00",
          "creationDate": "2023-08-01T12:11:06.187+00:00",
          "finishedFlag": false,
          "entitledUsernames": [
            "andre123",
            "test1"
          ],
          "shoppingItems": [
            {
              "articleName": "testArticle",
              "quantity": "testQuantiy",
              "comment": "testComment"
            },
            {
              "articleName": "testArticle1",
              "quantity": "testQuantiy3",
              "comment": "testComment2"
            }
          ]
        },
        {
          "id": 101,
          "name": "test2",
          "dueDate": "2023-08-01T12:11:06.187+00:00",
          "creationDate": "2023-08-01T12:11:06.187+00:00",
          "finishedFlag": false,
          "entitledUsernames": [
            "andre123"
          ],
          "shoppingItems": []
        },
      ]

      await route.fulfill({json})
    })

    await this.navigateAndWaitForRequests();
  }

  public rowShoppingEntry = (): Locator => this.page.locator('.shopping-entry-row')
}
