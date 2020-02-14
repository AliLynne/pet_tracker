import React, { useState, useEffect } from 'react'
import { db } from '../Firebase/firebase'

const LogInjection = () => {
  const initialValues = {
    petname: '',
    date: '',
    time: '',
    units: ''
  }

  const [values, setValues] = useState({ ...initialValues })
  const [pets, setPets] = useState([])

  useEffect(() => {
    console.log('effect')
    const unsub = db.collection('pets').onSnapshot(snapshot => {
      const allPets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPets(allPets)
    })
    return () => {
      console.log('cleanup')
      unsub()
    }
  }, [])

  const submitForm = e => {
    e.preventDefault()
    const { date, time } = values

    const timestamp = new Date(`${date} ${time}`)
    db.collection('injections').add({
      petname: values.petname,
      date: timestamp,
      units: values.units
    })
    setValues({ ...initialValues })
  }

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form id="injection-form" onSubmit={e => submitForm(e)}>
        <label>
          Pet:
          <select id="petname" name="petname" onChange={handleChange}>
            {pets &&
              pets.map(pet => {
                return (
                  <option key={pet.id} value={pet.name}>
                    {pet.name}
                  </option>
                )
              })}
          </select>
        </label>
        <label>
          Date:
          <input
            className="date-input"
            type="date"
            name="date"
            id="date"
            value={values.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            className="time-input"
            type="time"
            name="time"
            id="time"
            value={values.time}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            className="glucose-input"
            type="number"
            name="units"
            id="units"
            value={values.units}
            onChange={handleChange}
          />
          units
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LogInjection
