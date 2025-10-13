
export class ShoppingItemPage {

  getPriceIcon() {
    return cy.get('[data-cy="showPriceShoppingItem_dark"],[data-cy="showPriceShoppingItem_light"]')
  }

  getPriceSpan() {
    return cy.get('[data-cy="product-price"]')
  }

  getErrorSpan() {
    return cy.get('[data-cy="product-error"]')
  }

  getCreateField(){
    return cy.get('[data-cy="createField"]')
  }

  getProductNameField(){
    return  cy.get('[data-cy="articleName"]')
  }

  getProductQuantityField(){
    return cy.get('[data-cy="quantity"]')
  }

  getAddButton(){
    return cy.get('[data-cy="addButton"]')
  }


}
