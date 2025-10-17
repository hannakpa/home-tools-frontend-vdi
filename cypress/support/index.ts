export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      testMocking(productName: string, fixture: string, field: string): Chainable<JQuery<HTMLElement>>
    }
  }
}
