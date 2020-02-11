/// <reference types="cypress" />

import { navigate, addPet, addDate, addReading, submitForm, validateSubmit } from '../page-objects/glucose-page'

describe('App Basics', () => {
  it('Visits the app, checks the title', () => {
    navigate()
    cy.title().should('eq', 'Pet Tracker')
  })
})

describe('Glucose Reading', () => {
  it('can enter and save a glucose reading', () => {
    addPet('kitty')
    addDate('2020-01-01')
    addReading('.glucose-input', '230')
    validateSubmit('#glucose-form')
  })
})
