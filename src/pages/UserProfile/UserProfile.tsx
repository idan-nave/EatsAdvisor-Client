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
import { UserPreferences } from '@interfaces'
import { saveUserPreferences } from '../../api'
import { RiseLoader } from 'react-spinners'

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
  'Milk',
  'Eggs',
  'Fish',
  'Shellfish',
  'Crustacean',
  'Nuts',
  'Peanuts',
  'Wheat',
  'Soy',
  'Sesame',
  'Gluten',
  'Mustard',
  'Celery',
  'Lupin',
  'Sulfites',
  'Corn',
  'Legumes',
  'Coconut',
  'Mollusks',
  'Beef',
  'Pork',
  'Chicken',
  'Lamb',
  'Fruits',
  'Vegetables',
  'Spices',
  'Additives',
  'Alcohol',
]

const defaultValues: FormValues = {
  allergies: [],
  restrictions: [],
  flavorRatings: flavorList.map(flavor => ({ flavor, rating: '5' })),
  dishes: [{ name: '' }],
  personalPreference: '',
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate()
  const { profile, loading, refetchProfile } = useUserProfileContext()

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    // If profile exists, convert the flavor ratings to strings; otherwise, use the default values.
    defaultValues: profile
      ? {
          ...profile,
          flavorRatings: profile.flavorRatings.map(fr => ({
            flavor: fr.flavor,
            rating: String(fr.rating),
          })),
        }
      : defaultValues,
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
  const [step, setStep] = useState(profile ? 1 : 0)
  const [allergyQuery, setAllergyQuery] = useState('')
  const [allergyError, setAllergyError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // When profile changes, update the form with the converted profile values and skip the intro step.
  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
        flavorRatings: profile.flavorRatings.map(fr => ({
          flavor: fr.flavor,
          rating: String(fr.rating),
        })),
      })
      setStep(1)
    }
  }, [profile, reset])

  const onSubmit: SubmitHandler<FormValues> = async data => {
    setIsSubmitting(true)
    console.log('Form Data:', data)

    const formattedData: UserPreferences = {
      allergies: data.allergies.map(item => item.allergy),
      dietaryConstraints: data.restrictions,
      flavorPreferences: data.flavorRatings.reduce(
        (acc, item) => {
          acc[item.flavor] = parseInt(item.rating)
          return acc
        },
        {} as Record<string, number>,
      ),
      specificDishes: data.dishes.map(dish => dish.name),
      specialPreferences: data.personalPreference
        ? [data.personalPreference]
        : [],
    }

    console.log('formattedData', formattedData)

    try {
      const result = await saveUserPreferences(formattedData)
      console.log('form save result', result)

      if (result) {
        refetchProfile()
        navigate(ROUTES.HOME)
      }
    } catch (error) {
      console.error('Error saving preferences:', error)
      // navigate('/error', { state: { errorMessage: error } })
    } finally {
      setIsSubmitting(false)
    }
  }

  // const nextStep = () => setStep(prev => prev + 1)
  // const prevStep = () => setStep(prev => prev - 1)

  //skip step 4
  const nextStep = () => setStep(prev => (prev === 3 ? 5 : prev + 1))
  const prevStep = () => setStep(prev => (prev === 5 ? 3 : prev - 1))

  const filteredAllergyOptions = allergyOptions.filter(option =>
    option.toLowerCase().includes(allergyQuery.toLowerCase()),
  )

  if (loading || isSubmitting) {
    return <RiseLoader color="#2e7d32" size={15} />
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
            World first <span style={{ color: '#2e7d32' }}>AI</span> based
            Culinary Adviser
          </h3>
          <h3 className="user-profile-step-headers">
            Please provide us with some information about your culinary
            preferences.
          </h3>
          <div>
            <button className="form-step-btn" type="button" onClick={nextStep}>
              <span>Start</span>
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
