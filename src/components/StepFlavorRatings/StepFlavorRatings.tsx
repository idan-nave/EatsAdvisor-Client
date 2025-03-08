import React, { useState } from 'react'
import './step-flavor-ratings.css'

interface StepFlavorRatingsProps {
  register: any
  errors: any
  watch: any
  nextStep: () => void
  prevStep: () => void
}

const flavorList = ['Sweet', 'Sour', 'Salty', 'Bitter', 'Spicy']
const ratingOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString())

const StepFlavorRatings: React.FC<StepFlavorRatingsProps> = ({
  register,
  errors,
  watch,
  nextStep,
  prevStep,
}) => {
  const [showError, setShowError] = useState(false)

  const flavorRatings = watch('flavorRatings') || []
  const isComplete =
    flavorRatings.length === flavorList.length &&
    flavorRatings.every((field: { rating?: string }) => field && field.rating)

  const handleNext = () => {
    if (isComplete) {
      setShowError(false)
      nextStep()
    } else {
      setShowError(true)
    }
  }

  return (
    <div className="user-profile-form-step-container step-3">
      <h2 className="user-profile-step-headers">Flavor Ratings</h2>
      <div className="flavor-ratings-selects-container">
        {flavorList.map((flavor, index) => (
          <div className="flavor-ratings-select-container" key={flavor}>
            <label htmlFor={`flavorRatings-${index}`}>{flavor}:</label>
            <select
              className="flavor-rating-select"
              id={`flavorRatings-${index}`}
              {...register(`flavorRatings.${index}.rating` as const, {
                required: 'This field is required',
              })}
            >
              <option value="">Select rating</option>
              {ratingOptions.map((rating, i) => (
                <option key={i} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {showError && !isComplete && (
        <span className="error-message">All fields must be selected.</span>
      )}

      <div className="flavor-ratings-nav-btn-container">
        <button className="flavor-rating-btn" type="button" onClick={prevStep}>
          Back
        </button>
        <button
          className="flavor-rating-btn"
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default StepFlavorRatings
