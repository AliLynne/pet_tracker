import React from 'react'

import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from 'reakit/Form'

import './glucoseForm.scss'
import { db } from '../Firebase/firebase'

const GlucoseForm = ({ pet }) => {
  const form = useFormState({
    values: { pet: null, reading: null, date: null },
    onValidate: values => {
      if (!values.pet) {
        const errors = {
          pet: 'Please name your pet.'
        }
        throw errors
      }
      if (!values.reading) {
        const errors = {
          pet: 'Please include the reading.'
        }
        throw errors
      }
      if (!values.date) {
        const errors = {
          pet: 'Please include the date.'
        }
        throw errors
      }
    },
    onSubmit: values => {
      handleSubmitForm(values)
      console.log(JSON.stringify(values, null, 2))
    },
    resetOnSubmitSucceed: true,
    baseId: `glucose-form-${pet.id}`
  })

  const handleSubmitForm = ({ date, pet, reading }) => {
    const newReading = {
      date,
      pet,
      reading
    }
    db.collection('glucoseReadings')
      .add(newReading)
      .then(ref => console.log('Added doc with ID: ', ref.id))
      .catch(err => console.log(err))
  }

  return (
    <Form {...form} className="glucose-form">
      <header className="glucose-form__header">
        <h2>Add New Glucose Reading</h2>
      </header>
      <FormLabel {...form} name="pet" className="glucose-form__label">
        Pet:
      </FormLabel>
      <FormInput {...form} name="pet" className="glucose-form__input" />
      <FormLabel {...form} name="date" className="glucose-form__label">
        Date:
      </FormLabel>
      <FormInput
        {...form}
        name="date"
        placeholder="date"
        className="glucose-form__input"
      />
      <FormLabel {...form} name="reading" className="glucose-form__label">
        Reading:
      </FormLabel>
      <FormInput
        {...form}
        name="reading"
        placeholder="120"
        className="glucose-form__input"
      />
      <FormMessage {...form} name="pet" className="glucose-form__message" />
      <FormSubmitButton
        {...form}
        id={`glucose-form-${pet.id}__submit`}
        className="glucose-form__submit"
      >
        Submit
      </FormSubmitButton>
    </Form>
  )
}

export default GlucoseForm
