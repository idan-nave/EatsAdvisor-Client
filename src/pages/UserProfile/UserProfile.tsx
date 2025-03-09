import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import './user-profile.css'
import {
  StepAllergies,
  StepFlavorRatings,
  StepPersonalPreference,
  StepRestrictions,
  StepSpecificDishes,
} from '@components'
import { ROUTES } from '@constants'
import { useUserProfileContext } from '@context'

interface Allergy {
  allergy: string
}

interface FlavorRating {
  flavor: string
  rating: number
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
  const navigate = useNavigate()
  const { profile, loading } = useUserProfileContext()

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      allergies: [],
      restrictions: [],
      flavorRatings: flavorList.map(flavor => ({ flavor, rating: 5 })), // default rating set to 5
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
  // If profile exists, we skip step 0 by setting the step to 1.
  const [step, setStep] = useState(0)
  const [allergyQuery, setAllergyQuery] = useState('')
  const [allergyError, setAllergyError] = useState('')

  useEffect(() => {
    if (profile) {
      // Populate form with the profile data and skip the introduction step.
      reset(profile)
      setStep(1)
    }
  }, [profile, reset])

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('Form Data:', data)
    navigate(ROUTES.HOME)
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const filteredAllergyOptions = allergyOptions.filter(option =>
    option.toLowerCase().includes(allergyQuery.toLowerCase()),
  )

  if (loading) {
    return <div>Loading user profile...</div>
  }

  return (
    <form className="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
      {step === 0 && !profile && (
        <div className="user-profile-form-step-container step-0">
          <h2 className="user-profile-step-headers">
            Welcome to <span style={{ color: '#2e7d32' }}>E</span>ats
            <span style={{ color: '#2e7d32' }}>A</span>dvisor
          </h2>
          <h3 className="user-profile-step-headers">
            World first <span style={{ color: '#2e7d32' }}>AI</span> based Culinary Adviser
          </h3>
          <h3 className="user-profile-step-headers">
            Please provide us with some information about your culinary preferences.
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