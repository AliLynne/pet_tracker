export function navigate() {
  cy.visit("/");
}

export function addPet(todoText) {
  cy.get('.pet-name-input').type(todoText)
}
export function addDate(date) {
  cy.get('.date-input').type(date)
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
  cy.get(form).submit()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Your form has been submitted!')
    })
}

export function toggleTodo(todoIndex) {
  cy.get(`.tog-list li:nth-child(${todoIndex + 1})`).click();
}

export function showOnlyCompletedTodos() {
  cy.contains("Completed").click();
}

export function showOnlyActiveTodos() {
  cy.contains("Active").click();
}

export function showAllTodos() {
  cy.contains("All").click();
}

export function clearCompleted() {
  cy.contains("Clear completed").click();
}

export function validateNumberOfTodosShown(expectedNumberOfTodos) {
  cy.get(".todo-list li").should("have.length", expectedNumberOfTodos);
}

export function validateToggleState(todoIndex, shouldBeToggled) {
  const label = cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`);
  label.should(`${shouldBeToggled ? "" : "not."}be.checked`);
}

export function validateTodoTxt(todoIndex, expectedText) {
  cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should(
    "have.text",
    expectedText
  );
}

export function validateTodoCompletedState(todoIndex, shouldBeCompleted) {
  const l = cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`);
  l.should(
    `${shouldBeCompleted ? "" : "not."}have.css`,
    "text-decoration-line",
    "line-through"
  );
}
