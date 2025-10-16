/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import { ShoppingItemPage } from '../pages/shoppingItemPage';
import 'cypress-mochawesome-reporter/cucumberSupport';

const shoppingItemPage = new ShoppingItemPage();



// @ts-ignore
export function activateTrigger(field: string): void{
  switch (field) {
    case "price":
      shoppingItemPage.getPriceIcon().click();
      break;
}}

// @ts-ignore
Cypress.Commands.add("mockGetField", (productName: string, fixture: string, field: string) => {
  let alias = "";
  // @ts-ignore
  //cy.mockProduct(productName, "products", field);
  cy.fixture('products.json').then((products) => {
    const product = products.find((item: { title: string; }) => item.title === productName);

    //when product does not exist in the DB, return
    //when product exist but not the
    if (product.field === undefined) {
      cy.log(`Product "${productName}" exists but has no ${field}.`);
    }
    alias = "getProduct";
    cy.intercept(
      'GET',
      `http://localhost:9090/api/products/search/${productName}`,
      {
        statusCode: 200,
        body: product
      }
    ).as(alias);

//click will always be executed independently from existance of product in the database
  }).then(() => {
    activateTrigger(field);
    cy.wait(`@${alias}`, {timeout: 8000});
  });
})



