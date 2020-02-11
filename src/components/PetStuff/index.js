import React, { useState, useEffect } from 'react'

import firebase from '../Firebase/firebase'
const db = firebase.firestore()

const Index = ({ pet }) => {
  const [readings, setReadings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const glucoseReadingsDB = db.collection('glucoseReadings')
  const petRef = db.collection('pets').doc(pet)

  useEffect(() => {
    setLoading(true)
    glucoseReadingsDB
      .get()
      .then(docs => {
        const glucoseReadings = []
        docs.forEach(doc => {
          glucoseReadings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setLoading(false)
        setReadings(glucoseReadings)
      })
      .catch(err => setError(err))
  }, [])

  return (
    <div>
      <p>Glucose Readings</p>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
      </p>
      <ul>
        {readings &&
          readings.map(reading => (
            <li key={reading.id}>
              <p>Pet: {reading.data.pet.get().then(res => console.log(res))}</p>
              <p>Date: {reading.data.date.toDate().toString()}</p>
              <p>Blood Glucose: {reading.data.reading}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Index
