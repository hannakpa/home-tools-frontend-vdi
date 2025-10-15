
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { ShoppingItemPage } from '../pages/shoppingItemPage';
import 'cypress-mochawesome-reporter/cucumberSupport';

const shoppingItemPage = new ShoppingItemPage();

Given("the user is in the 'Einkaufsliste ändern' page of the list {string}", (name: string) => {
  cy.visit('/shoppingLists/view');
  cy.get('.shopping-entry-row').first().contains(name).click()
  cy.screenshot()
  }
)

Given("the product {string} exists", (name: string) => {
  shoppingItemPage.getCreateField().click();
  shoppingItemPage.getProductNameField().type(name);
  shoppingItemPage.getProductQuantityField().type("Drei")
  shoppingItemPage.getAddButton().click()
  cy.screenshot()
  }
)

When("the user checks the product {string} price",(productName: string) => {
  cy.fixture('products.json').then((products) => {
    const product = products.find((item: { title: string; }) => item.title === productName);

    if (product.price === undefined) {
      cy.log(`Product "${productName}" exists but has no price.`);
    }

      cy.intercept(
        'GET',
        `http://localhost:9090/api/products/search/${productName}`,
        {
          statusCode: 200,
          body: product
        }
      ).as('getProduct');

//click will always be executed independently from existance of product in the database
    shoppingItemPage.getPriceIcon().click()
    cy.wait('@getProduct');
    cy.screenshot()
  });

})

Then("the price {string} appears in the right side of the icon",(price: string) => {
  shoppingItemPage.getPriceSpan()
    .should('be.visible',{ timeout: 5000 })
    .and('contain.text', price);
  cy.screenshot()
  }
)

//NO PRICE AVAILABLE
Then("the message {string} should appear", (message: string) => {
  shoppingItemPage.getErrorSpan()
    .should('be.visible',{ timeout: 5000 })
    .and("contain.text", message);
  cy.screenshot()
});

//give al alias to the stub.
  //https://stackoverflow.com/questions/51795306/how-can-we-test-the-alert-and-the-text-it-is-displaying-using-cypress-io-js-auto
  //const alertShown = cy.stub().as("alertShown")
  //cy.on ('window:alert', alertShown)
  //cy.get("@alertShown").should("have.been.calledOnceWith", "The price of Apple is 1.99")

