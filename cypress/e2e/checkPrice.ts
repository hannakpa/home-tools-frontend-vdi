
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { ShoppingItemPage } from '../pages/shoppingItemPage';
import 'cypress-mochawesome-reporter/cucumberSupport';
import '../support/commands';

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

When("the user checks the {string} of {string}",(field: string, productName: string) => {
  cy.testMocking(productName,"products",field);
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

