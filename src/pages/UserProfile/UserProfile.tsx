import React, { useState } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import './user-profile.css'
import {
  StepAllergies,
  StepFlavorRatings,
  StepPersonalPreference,
  StepRestrictions,
  StepSpecificDishes,
} from '@components'

interface Allergy {
  allergy: string
}

interface FlavorRating {
  flavor: string
  rating: string
}

export interface FormValues {
  allergies: Allergy[]
  restrictions: string[]
  flavorRatings: FlavorRating[]
  dishes: { name: string }[]
  personalPreference: string
}

const flavorList = ['Sweet', 'Sour', 'Salty', 'Bitter', 'Spicy']

const allergyOptions = [
  'Peanuts',
  'Peanuts',
  'Peanuts',
  'Peanuts',
  'Peanuts',
  'Peanuts',
  'Peanuts',
  'Shellfish',
  'Gluten',
  'Dairy',
  'Soy',
  'Eggs',
  'Strawberries',
  'Nuts',
  'Fish',
  'Pollen',
  'Dust',
]

const UserProfile: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      allergies: [],
      restrictions: [],
      flavorRatings: flavorList.map(flavor => ({ flavor, rating: '' })),
      dishes: [{ name: '' }],
      personalPreference: '',
    },
  })

  const {
    fields: allergyFields,
    append: appendAllergy,
    remove: removeAllergy,
  } = useFieldArray({
    control,
    name: 'allergies',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dishes',
  })

  // Steps: 0: Introduction, 1: Allergies, 2: Restrictions, 3: Flavor Ratings, 4: Specific Dishes, 5: Personal Preference
  const [step, setStep] = useState(0)
  const [allergyQuery, setAllergyQuery] = useState('')
  const [allergyError, setAllergyError] = useState('')

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('Form Data:', data)
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const filteredAllergyOptions = allergyOptions.filter(option =>
    option.toLowerCase().includes(allergyQuery.toLowerCase()),
  )

  return (
    <form className="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
      {step === 0 && (
        <div className="user-profile-form-step-container step-0">
          <h2 className="user-profile-step-headers">
            Welcome to <span style={{ color: 'lightgreen' }}>M</span>enu
          </h2>
          <h3 className="user-profile-step-headers">
            World first <span style={{ color: 'lightgreen' }}>AI</span> based
            Culinary Adviser
          </h3>
          <h3 className="user-profile-step-headers">
            Please provide us with some information about your culinary
            preferences.
          </h3>
          <div>
            <button className="form-step-btn" type="button" onClick={nextStep}>
              Start
            </button>
          </div>
        </div>
      )}
      {step === 1 && (
        <StepAllergies
          allergyQuery={allergyQuery}
          setAllergyQuery={setAllergyQuery}
          allergyError={allergyError}
          setAllergyError={setAllergyError}
          allergyFields={allergyFields}
          appendAllergy={appendAllergy}
          removeAllergy={removeAllergy}
          filteredAllergyOptions={filteredAllergyOptions}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 2 && (
        <StepRestrictions
          register={register}
          errors={errors}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <StepFlavorRatings
          register={register}
          errors={errors}
          nextStep={nextStep}
          prevStep={prevStep}
          watch={watch}
        />
      )}
      {step === 4 && (
        <StepSpecificDishes
          register={register}
          errors={errors}
          fields={fields}
          append={append}
          remove={remove}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <StepPersonalPreference
          register={register}
          errors={errors}
          prevStep={prevStep}
        />
      )}
    </form>
  )
}

export default UserProfile
