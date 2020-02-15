/// <reference types="Cypress" />

import {
  navigate,
  addPetName,
  addDate,
  addReading,
  submitForm,
  validateSubmit
} from '../page-objects/glucose-page'

describe('App Basics', () => {
  it('Visits the app, checks the title', () => {
    navigate('/')
    cy.title().should('eq', 'Pet Tracker')
  })
})

describe('Glucose Reading', () => {
  beforeEach(() => {
    navigate('/')
  })
  it('can enter and save a glucose reading', () => {
    cy.get('#add-glucose-r9j7nL6fvsyoDNjJ3APW').click()
    cy.get('#glucose-form-r9j7nL6fvsyoDNjJ3APW-pet').type('Sammy')
    cy.get('#glucose-form-r9j7nL6fvsyoDNjJ3APW-date').type('12/12/2020')
    cy.get('#glucose-form-r9j7nL6fvsyoDNjJ3APW-reading').type(510)
    cy.get('#glucose-form-r9j7nL6fvsyoDNjJ3APW__submit').click()
  })
})
