/// <reference types="Cypress" />

describe('The injection form', () => {
  it('Adds a New Injection', () => {
    cy.visit('/')
    cy.get('#add-injection-r9j7nL6fvsyoDNjJ3APW').click()
    cy.get('#injection-form-r9j7nL6fvsyoDNjJ3APW-pet').type('Sammy')
    cy.get('#injection-form-r9j7nL6fvsyoDNjJ3APW-date').type('12/12/2020')
    cy.get('#injection-form-r9j7nL6fvsyoDNjJ3APW-units').type(2)
    cy.get('#injection-form-r9j7nL6fvsyoDNjJ3APW__submit').click()
  })
})
