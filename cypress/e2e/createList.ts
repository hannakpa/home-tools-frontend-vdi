
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-mochawesome-reporter/cucumberSupport';

Given("the user is in the 'Einkaufsliste anlegen' page", () => {
  cy.visit('/shoppingLists/create');
  cy.screenshot()
  }
)

Given("'Fälligkeits Datum' is filled in", () => {
    cy.get('#dueDate').should('have.attr', 'ng-reflect-model').and('not.be.empty');
  cy.screenshot()
  }
)

Given("the user writes the name {string}", (name: string) => {
  cy.get('#name').type(name)
  cy.screenshot()
})

Given("the user selects a Zugewiesene Nutzer {string}", (name: string) => {
  cy.get('#title').click()
  cy.get(name).click()
  cy.get('#title').click()
  cy.screenshot()
})

When("the user saves the list",() => {
  cy.get('button[type="submit"]').first().should('be.enabled')
  cy.get('button[type="submit"]').first().click()
  cy.screenshot()
})

Then("is listed in the 'Einkaufsliste ändern' page with the name {string}",(name: string) => {
  cy.visit('/shoppingLists/view');
  cy.get('.shopping-entry-row').first().contains(name)
  cy.screenshot()
})

Then("the list {string} can be accessed",(name: string) => {
  cy.get('.shopping-entry-row').first().contains(name).click()
  cy.screenshot()
})
