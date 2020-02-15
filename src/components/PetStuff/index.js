import React, { useState, useEffect } from 'react'
import { db } from '../Firebase/firebase'
import moment from 'moment'
import {
  useDisclosureState,
  Disclosure,
  DisclosureRegion,
  Checkbox
} from 'reakit'

import GlucoseForm from '../GlucoseForm'
import LogInjection from '../LogInjection'

import './petStuff.scss'

const Index = ({ pet }) => {
  const [readings, setReadings] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { id, name } = pet
  const addGlucoseDisclosure = useDisclosureState({ visible: false })
  const addInjectionDisclosure = useDisclosureState({ visible: false })

  useEffect(() => {
    setLoading(true)
    console.log('effect', id)
    const unsub = db
      .collection('glucoseReadings')
      .where('petId', '==', id)
      .get()
      .then(snapshot => {
        const allReadings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log(allReadings)
        setReadings(allReadings)
        setLoading(false)
      })
    return () => {
      console.log('cleanup')
      unsub()
    }
  }, [id])

  return (
    <div className="pet-stuff">
      <Disclosure
        {...addGlucoseDisclosure}
        id={`add-glucose-${pet.id}`}
        className="add-glucose-button"
      >
        {addGlucoseDisclosure.visible ? 'Close' : 'Add Glucose Reading'}
      </Disclosure>
      <DisclosureRegion {...addGlucoseDisclosure}>
        <GlucoseForm pet={pet} />
      </DisclosureRegion>

      <Disclosure
        {...addInjectionDisclosure}
        id={`add-injection-${pet.id}`}
        className="add-injection-button"
      >
        {addInjectionDisclosure.visible ? 'Close' : 'Add New Injection'}
      </Disclosure>
      <DisclosureRegion {...addInjectionDisclosure}>
        <LogInjection pet={pet} />
      </DisclosureRegion>

      {/* <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading...</span>}
      </p>
      <ul>
        {readings &&
          readings.map(reading => {
            return (
              <li key={reading.id}>
                <p>
                  Date:{' '}
                  {moment(reading.date.toDate().toString()).format(
                    'MMM DD, YYYY HH:mm A'
                  )}
                </p>
                <p>Blood Glucose: {reading.reading}</p>
              </li>
            )
          })}
      </ul> */}
    </div>
  )
}

export default Index
