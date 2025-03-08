import React, { useState } from 'react'
import './step-specific-dishes.css'

interface StepSpecificDishesProps {
  register: any
  errors: any
  fields: any
  append: (data: { name: string }) => void
  remove: (index: number) => void
  nextStep: () => void
  prevStep: () => void
}

const StepSpecificDishes: React.FC<StepSpecificDishesProps> = ({
  register,
  errors,
  fields,
  append,
  remove,
  nextStep,
  prevStep,
}) => {
  const [newDish, setNewDish] = useState('')
  const [localError, setLocalError] = useState('')

  const handleAddDish = () => {
    const dishName = newDish.trim()
    if (!dishName) {
      setLocalError('Dish name is required')
      return
    }
    // Check for duplicate dish (case-insensitive)
    const duplicate = fields.some(
      (field: { name: string }) =>
        field.name.toLowerCase() === dishName.toLowerCase(),
    )
    if (duplicate) {
      setLocalError('This dish has already been added.')
      return
    }
    // If valid, add the dish and clear the input and error.
    append({ name: dishName })
    setNewDish('')
    setLocalError('')
  }

  return (
    <div className="user-profile-form-step-container step-4">
      <h2 className="user-profile-step-headers">Specific Dishes</h2>

      <div className="add-dish-container">
        <input
        className='add-dish-input'
          type="text"
          value={newDish}
          placeholder="Enter dish name"
          onChange={e => {
            setNewDish(e.target.value)
            if (localError) setLocalError('')
          }}
        />
        <button className='add-dish-btn' type="button" onClick={handleAddDish}>
          Add
        </button>
      </div>

      <div className="dishes-list">
        {fields.map((field: any, index: number) =>
          field.name ? (
            <div key={field.id} className="dish-item">
              <div className='dish-name'>{field.name}</div>
              <button
                className="dish-item-btn"
                type="button"
                onClick={() => remove(index)}
              >
                Delete
              </button>
            </div>
          ) : null,
        )}
      </div>

      {localError && <span className="error-message">{localError}</span>}

      <div className="specific-dishes-nav-btns-container">
        <button
          className="specific-dishes-btn"
          type="button"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className="specific-dishes-btn"
          type="button"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default StepSpecificDishes
