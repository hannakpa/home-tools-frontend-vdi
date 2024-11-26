import { test, expect } from '@playwright/test';
import {ShoppingListViewPage} from "./page-objects/shopping-list-view.page";

// -------------------------------------------- //
// ------- Should test the whole system ------- //
// -------------------------------------------- //

// ----------------------------------------------- //
// ------- Should only test the happy path ------- //
// ----------------------------------------------- //
test('only test the good case (happy path)', async ({ page }) => {
  await page.goto('http://localhost:4200');

  await expect(page).toHaveTitle(/HomeToolsFrontend/);
});

// --------------------------------------------------------- //
// -------------- Identify what to test and... ------------- //
// ------- ...skip unnecessary steps like navigation ------- //
// --------------------------------------------------------- //
test('test if navigation to the shopping list view works correctly', async ({ page }) => {
  await page.goto('http://localhost:4200');

  // navigate to shopping list view
  await page.getByRole('button', { name: 'Einkaufsliste ändern' }).click()

  // check that the page is shown correctly
  await expect(page.getByRole("heading", { name: "Einkaufslisten Übersicht" })).toBeVisible();
});

test('test if the correct number of shopping list entries is shown', async ({ page }) => {
  await page.goto('http://localhost:4200/shoppingLists/view');

  const rowCount = await page.locator('.shopping-entry-row').count()

  expect(rowCount).toBe(25);
});

// ----------------------------------------------------------------- //
// ------- Prevent Flakieness of tests with waiting...BUT... ------- //
// ----------------------------------------------------------------- //

test('prevent flakiness by waiting 5 seconds and hope that all requests are finished', async ({ page }) => {
  await page.goto('http://localhost:4200/shoppingLists/view');

  await page.waitForTimeout(5000)
  const rowCount = await page.locator('.shopping-entry-row').count()

  expect(rowCount).toBe(25);
});

// ----------------------------------------------------------------- //
// ----------- !!!...Use explicit waiting not implicit!!! ---------- //
// ----------------------------------------------------------------- //

test('prevent flakiness by explicitly waiting for the request to finish', async ({ page }) => {
  const responsePromise = page.waitForResponse('http://localhost:9090/api/shoppingList?username=andre123');
  await page.goto('http://localhost:4200/shoppingLists/view');
  await responsePromise;

  const rowCount = await page.locator('.shopping-entry-row').count()

  expect(rowCount).toBe(25);
});

// ------------------------------------------------- //
// ------- Should mock other system calls... ------- //
// ----------- ...to create a system test ---------- //
// ------------------------------------------------- //
test('mock the request to create a system test', async ({ page }) => {
  await page.route('*/**/api/shoppingList**', async route => {
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

  const responsePromise = page.waitForResponse('http://localhost:9090/api/shoppingList?username=andre123');
  await page.goto('http://localhost:4200/shoppingLists/view');
  await responsePromise;

  const rowCount = await page.locator('.shopping-entry-row').count()

  expect(rowCount).toBe(2);
});

// ----------------------------------------------------------------- //
// ------------- Should not mock other system calls... ------------- //
// ----------- ...to create a system integration test -------------- //
// ----------------------------------------------------------------- //

test('do not mock the request to create a system test', async ({ page }) => {
  const responsePromise = page.waitForResponse('http://localhost:9090/api/shoppingList?username=andre123');
  await page.goto('http://localhost:4200/shoppingLists/view');
  await responsePromise;

  const rowCount = await page.locator('.shopping-entry-row').count()

  expect(rowCount).toBe(25);
});

// --------------------------------------------------------------- //
// ------- Make your tests more readable with page objects ------- //
// --------------------------------------------------------------- //
test('mocked system test with page objects', async ({ page }) => {
  const shoppingListViewPage: ShoppingListViewPage = new ShoppingListViewPage(page);

  await shoppingListViewPage.navigateAndMockRequest();

  const rowCount = await shoppingListViewPage.rowShoppingEntry().count()

  expect(rowCount).toBe(2);
});

test('mocked system integration test with page objects', async ({ page }) => {
  const shoppingListViewPage: ShoppingListViewPage = new ShoppingListViewPage(page);

  await shoppingListViewPage.navigateAndWaitForRequests();

  const rowCount = await shoppingListViewPage.rowShoppingEntry().count()

  expect(rowCount).toBe(25);
});
