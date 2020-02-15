import React from 'react'
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from 'reakit/Form'

import './logInjection.scss'
import { db } from '../Firebase/firebase'

const LogInjection = ({ pet }) => {
  const form = useFormState({
    values: { pet: null, date: null, units: null },
    onValidate: values => {
      if (!values.pet) {
        const errors = {
          pet: 'Please name your pet.'
        }
        throw errors
      }
      if (!values.date) {
        const errors = {
          pet: 'Please include the date.'
        }
        throw errors
      }
      if (!values.units) {
        const errors = {
          pet: 'Please include the units injected.'
        }
        throw errors
      }
    },
    onSubmit: values => {
      handleSubmitForm(values)
    },
    resetOnSubmitSucceed: true,
    baseId: `injection-form-${pet.id}`
  })

  const handleSubmitForm = ({ date, pet, units }) => {
    const newInjection = {
      date,
      pet,
      units
    }
    db.collection('injections')
      .add(newInjection)
      .then(ref => console.log('Added doc with ID: ', ref.id))
      .catch(err => console.log(err))
  }
  return (
    <Form {...form} className="injection-form">
      <header className="injection-form__header">
        <h2>Add New Injection</h2>
      </header>
      <FormLabel {...form} name="pet" className="injection-form__label">
        Pet
      </FormLabel>
      <FormInput
        {...form}
        name="pet"
        placeholder="Fluffy"
        className="injection-form__input"
      />
      <FormLabel {...form} name="date" className="injection-form__label">
        Date
      </FormLabel>
      <FormInput
        {...form}
        name="date"
        placeholder="01/01/2020"
        className="injection-form__input"
      />
      <FormLabel {...form} name="units" className="injection-form__label">
        Units
      </FormLabel>
      <FormInput
        {...form}
        name="units"
        placeholder="2"
        className="injection-form__input"
      />
      <FormMessage {...form} name="pet" className="injection-form__message" />
      <FormMessage {...form} name="units" className="injection-form__message" />
      <FormMessage {...form} name="date" className="injection-form__message" />
      <FormSubmitButton
        {...form}
        id={`injection-form-${pet.id}__submit`}
        className="injection-form__submit"
      >
        Submit
      </FormSubmitButton>
    </Form>
  )
}

export default LogInjection
