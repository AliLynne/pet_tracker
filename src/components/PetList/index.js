import React, { useState, useEffect } from 'react'
import { useTabState, Tab, TabList, TabPanel } from 'reakit/Tab'

import PetStuff from '../PetStuff'
import { db } from '../Firebase/firebase'

import './petList.scss'

const Index = () => {
  const [pets, setPets] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const tab = useTabState()
  const { move } = tab

  useEffect(() => {
    async function fetchData() {
      setError(null)
      setLoading(true)
      try {
        const snapshot = await db
          .collection('pets')
          .orderBy('name', 'desc')
          .get()
        const allPets = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPets(allPets)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    pets && move(pets[0].id)
  }, [pets, move])

  return (
    <>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
      </p>
      <TabList {...tab} className="pet-nav" aria-label="My Pets">
        {pets &&
          pets.map(pet => {
            return (
              <Tab
                {...tab}
                className="pet-nav-tab"
                key={pet.id}
                stopId={pet.id}
              >
                {pet.name}
              </Tab>
            )
          })}
      </TabList>
      {pets &&
        pets.map(pet => {
          return (
            <TabPanel className="panel" {...tab} key={pet.id} stopId={pet.id}>
              <PetStuff pet={pet} />
            </TabPanel>
          )
        })}
      {/* <ul>
        {pets &&
          pets.map(pet => {
            return (
              <li key={pet.id}>
                <Link to={`/pets/${pet.name}`}>{pet.name}</Link>
              </li>
            )
          })}
      </ul> */}
    </>
  )
}

export default Index
