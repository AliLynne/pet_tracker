import React, { useState, useEffect } from 'react'

import PetStuff from '../PetStuff'

import firebase from '../Firebase/firebase'
const db = firebase.firestore()
const petsDB = db.collection('pets')

const Index = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    petsDB
      .get()
      .then(docs => {
        const petList = []
        docs.forEach(doc => {
          petList.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setLoading(false)
        setPets(petList)
      })
      .catch(err => setError(err))
  }, [])

  return (
    <>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
      </p>
      <ul>
        {pets &&
          pets.map(pet => {
            return (
              <li key={pet.id}>
                {pet.data.name}
                <PetStuff pet={pet.id} />
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default Index
