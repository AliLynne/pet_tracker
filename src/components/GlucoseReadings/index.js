import React from 'react'

const GlucoseReading = () => {
  const submitForm = (e) => {
    e.preventDefault()
    alert('Your form has been submitted!')
  }
  return (
    <form id="glucose-form" onSubmit={(e) => submitForm(e)}>
      <label>
        Pet: {' '}
        <input className="pet-name-input" type="text" />
      </label>
      <label>
        Date: {' '}
        <input className="date-input" type="date" />
      </label>
      <label>
        Glucose Reading: {' '}
        <input className="glucose-input" type="number" />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default GlucoseReading
