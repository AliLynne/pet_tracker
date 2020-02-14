/// <reference types="Cypress" />

export function navigate(location) {
  cy.visit(location)
}

export function addPetName(name) {
  cy.get('form input:first').type(name)
}
export function addDate(date) {
  cy.findByText('date').type(date)
}

export function addReading(input, data) {
  cy.get(input).type(data)
}

export function submitForm(form) {
  cy.get(form).submit()
}

export function validateSubmit(form) {
  const stub = cy.stub()
  cy.on('window:alert', stub)
  cy.get(form)
    .submit()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Your form has been submitted!')
    })
}

export function toggleTodo(todoIndex) {
  cy.get(`.tog-list li:nth-child(${todoIndex + 1})`).click()
}

export function showOnlyCompletedTodos() {
  cy.contains('Completed').click()
}

export function showOnlyActiveTodos() {
  cy.contains('Active').click()
}

export function showAllTodos() {
  cy.contains('All').click()
}

export function clearCompleted() {
  cy.contains('Clear completed').click()
}

export function validateNumberOfTodosShown(expectedNumberOfTodos) {
  cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
}

export function validateToggleState(todoIndex, shouldBeToggled) {
  cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should(
    `${shouldBeToggled ? '' : 'not.'}be.checked`
  )
}

export function validateTodoTxt(todoIndex, expectedText) {
  cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should(
    'have.text',
    expectedText
  )
}

export function validateTodoCompletedState(todoIndex, shouldBeCompleted) {
  cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should(
    `${shouldBeCompleted ? '' : 'not.'}have.css`,
    'text-decoration-line',
    'line-through'
  )
}
