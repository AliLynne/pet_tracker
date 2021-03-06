import React, { useState, useEffect } from 'react'
import { db } from '../Firebase/firebase'

const GlucoseReading = () => {
  const initialValues = {
    petname: '',
    date: '',
    time: '',
    reading: ''
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
    db.collection('glucoseReadings').add({
      petname: values.petname,
      date: timestamp,
      reading: values.reading
    })
    setValues({ ...initialValues })
  }

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form id="glucose-form" onSubmit={e => submitForm(e)}>
        <label>
          Pet:
          <select id="petname">
            {pets &&
              pets.map(pet => {
                return <option value={pet.name}>{pet.name}</option>
              })}
          </select>
          {/* <input
            className="pet-name-input"
            type="text"
            name="petname"
            id="petname"
            value={values.petname}
            onChange={handleChange}
            placeholder="Fluffy"
            //required
          /> */}
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
          Glucose Reading:
          <input
            className="glucose-input"
            type="number"
            name="reading"
            id="reading"
            value={values.reading}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default GlucoseReading
