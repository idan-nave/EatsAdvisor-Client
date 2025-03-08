import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import './user-profile.css'

interface Allergy {
  allergy: string
}

interface FlavorRating {
  flavor: string
  rating: string
}

interface FormValues {
  allergies: Allergy[]
  restrictions: string[]
  flavorRatings: FlavorRating[]
  dishes: { name: string }[]
  personalPreference: string
}

const allergyOptions = [
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
const restrictionOptions = ['Kosher', 'Vegetarian', 'Vegan', 'Gluten-Free']
const flavorList = ['Sweet', 'Sour', 'Salty', 'Bitter', 'Umami', 'Spicy']
const ratingOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString())

const UserProfile: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
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

  // Steps:
  // 0: Introduction, 1: Allergies, 2: Restrictions, 3: Flavor Ratings,
  // 4: Specific Dishes, 5: Personal Preference
  const [step, setStep] = useState(0)
  const [allergyQuery, setAllergyQuery] = useState('')

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('Form Data:', data)
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  // Filter allergy suggestions based on user input
  const filteredAllergyOptions = allergyOptions.filter(option =>
    option.toLowerCase().includes(allergyQuery.toLowerCase()),
  )

  useEffect(() => {}, [])

  return (
    <form className="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Step 0: Introduction */}
      {step === 0 && (
        <div className="user-profile-form-step-container step-0">
          <h2 className="user-profile-step-headers">
            Welcome to <span style={{ color: 'lightgreen' }}>M</span>enu
          </h2>
          <h3 className="user-profile-step-headers">
            World first <span style={{ color: 'lightgreen' }}>AI</span> based Culinary Adviser
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

      {/* Step 1: Allergies */}
      {step === 1 && (
        <div className="user-profile-form-step-container step-1">
          <h2 className="user-profile-step-headers">Allergies</h2>
          <p className="user-profile-step-headers">
            Search for common allergies below or enter your own free text. You can add multiple allergies.
          </p>
          <label htmlFor="allergy-input">Search for an Allergy:</label>
          <input
            type="text"
            id="allergy-input"
            value={allergyQuery}
            onChange={e => setAllergyQuery(e.target.value)}
          />
          {allergyQuery && (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {filteredAllergyOptions.map((option, index) => (
                <li
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setAllergyQuery(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => {
              if (allergyQuery.trim() !== '') {
                appendAllergy({ allergy: allergyQuery.trim() })
                setAllergyQuery('')
              }
            }}
          >
            Add Allergy
          </button>
          {allergyFields.length > 0 && (
            <div>
              <h3 className="user-profile-step-headers">Added Allergies:</h3>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {allergyFields.map((field, index) => (
                  <li key={field.id}>
                    {field.allergy}{' '}
                    <button type="button" onClick={() => removeAllergy(index)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='allergy-buttons-container'>
            <button className="form-step-btn" type="button" onClick={prevStep}>
              Back
            </button>
            <button className="form-step-btn" type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Restrictions */}
      {step === 2 && (
        <div className="user-profile-form-step-container step-2">
          <h2 className="user-profile-step-headers">Restrictions</h2>
          <p className="user-profile-step-headers">Select applicable restrictions:</p>
          {restrictionOptions.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`restriction-${option}`}
                value={option}
                {...register('restrictions')}
              />
              <label htmlFor={`restriction-${option}`}>{option}</label>
            </div>
          ))}
          <div>
            <button className="form-step-btn" type="button" onClick={prevStep}>
              Back
            </button>
            <button className="form-step-btn" type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Flavor Ratings */}
      {step === 3 && (
        <div className="user-profile-form-step-container step-3">
          <h2 className="user-profile-step-headers">Flavor Ratings</h2>
          {flavorList.map((flavor, index) => (
            <div key={flavor}>
              <label htmlFor={`flavorRatings-${index}`}>{flavor}:</label>
              <select
                id={`flavorRatings-${index}`}
                {...register(`flavorRatings.${index}.rating` as const, {
                  required: true,
                })}
              >
                <option value="">Select rating</option>
                {ratingOptions.map((rating, i) => (
                  <option key={i} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
              {errors.flavorRatings && errors.flavorRatings[index]?.rating && (
                <span>This field is required</span>
              )}
            </div>
          ))}
          <div>
            <button className="form-step-btn" type="button" onClick={prevStep}>
              Back
            </button>
            <button className="form-step-btn" type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Specific Dishes */}
      {step === 4 && (
        <div className="user-profile-form-step-container step-4">
          <h2 className="user-profile-step-headers">Specific Dishes</h2>
          {fields.map((field, index) => (
            <div key={field.id}>
              <label htmlFor={`dishes-${index}`}>Dish {index + 1}:</label>
              <input
                type="text"
                id={`dishes-${index}`}
                {...register(`dishes.${index}.name` as const, { required: true })}
              />
              <button
                className="form-step-btn"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ name: '' })}>
            Add Dish
          </button>
          <div>
            <button className="form-step-btn" type="button" onClick={prevStep}>
              Back
            </button>
            <button className="form-step-btn" type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Personal Preference */}
      {step === 5 && (
        <div className="user-profile-form-step-container step-5">
          <h2 className="user-profile-step-headers">Personal Preference</h2>
          <label htmlFor="personalPreference">Your Personal Preference:</label>
          <textarea
            id="personalPreference"
            {...register('personalPreference')}
          ></textarea>
          <div>
            <button className="form-step-btn" type="button" onClick={prevStep}>
              Back
            </button>
            <button className="form-step-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default UserProfile
