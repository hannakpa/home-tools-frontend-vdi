
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";


Given("the user is in the 'Einkaufsliste ändern' page of the list {string}", (name: string) => {
  cy.visit('/shoppingLists/view');
  cy.get('.shopping-entry-row').first().contains(name).click()
  }
)

Given("the product {string} exists", (name: string) => {
  cy.get('button').contains('Eintrag hinzufügen').click()
  cy.get('#articleName').type(name)
  cy.get('#quantity').type("Drei")
  cy.get('button').contains('Hinzufügen').click()
  }
)

When("the user clicks on the price icon",() => {
  cy.get('#showPriceShoppingItem_light, #showPriceShoppingItem_dark').click()
})

Then("the message {string} will be shown in an alert message",(message: string) => {
   cy.on('window:alert', (message) => {
     expect(message).to.equal("The price of Apple is 1.99€")})
  }
)

//give al alias to the stub.
  //https://stackoverflow.com/questions/51795306/how-can-we-test-the-alert-and-the-text-it-is-displaying-using-cypress-io-js-auto
  //const alertShown = cy.stub().as("alertShown")
  //cy.on ('window:alert', alertShown)
  //cy.get("@alertShown").should("have.been.calledOnceWith", "The price of Apple is 1.99")

