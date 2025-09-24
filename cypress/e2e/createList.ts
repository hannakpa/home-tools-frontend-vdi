
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is in the 'Einkaufsliste anlegen' page", () => {
  cy.visit('/shoppingLists/create');
  }
)

Given("'Fälligkeits Datum' is filled in", () => {
    cy.get('#dueDate').should('have.attr', 'ng-reflect-model').and('not.be.empty');
  }
)

Given("the user writes the name {string}", (name: string) => {
  cy.get('#name').type(name)
})

Given("the user selects a Zugewiesene Nutzer {string}", (name: string) => {
  cy.get('#title').click()
  cy.get(name).click()
  cy.get('#title').click()
})

When("the user saves the list",() => {
  cy.get('button[type="submit"]').first().should('be.enabled')
  cy.get('button[type="submit"]').first().click()
})

Then("is listed in the 'Einkaufsliste ändern' page with the name {string}",(name: string) => {
  cy.visit('/shoppingLists/view');
  cy.get('.shopping-entry-row').first().contains(name)
})

Then("the list {string} can be accessed",(name: string) => {
  cy.get('.shopping-entry-row').first().contains(name).click()
})
