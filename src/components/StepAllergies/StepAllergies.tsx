import { useUserProfileContext } from '@context'
import './step-allergies.css'

interface Allergy {
  allergy: string
}

interface StepAllergiesProps {
  allergyQuery: string
  setAllergyQuery: React.Dispatch<React.SetStateAction<string>>
  allergyError: string
  setAllergyError: React.Dispatch<React.SetStateAction<string>>
  allergyFields: any
  appendAllergy: (data: Allergy) => void
  removeAllergy: (index: number) => void
  filteredAllergyOptions: string[]
  nextStep: () => void
  prevStep: () => void
}

const StepAllergies: React.FC<StepAllergiesProps> = ({
  allergyQuery,
  setAllergyQuery,
  allergyError,
  setAllergyError,
  allergyFields,
  appendAllergy,
  removeAllergy,
  filteredAllergyOptions,
  nextStep,
  prevStep,
}) => {
  const { profile, loading } = useUserProfileContext()
  return (
    <div className="user-profile-form-step-container step-1">
      <h2 className="user-profile-step-headers">Allergies</h2>
      <p className="user-profile-step-headers">
        Search for common allergies below or enter your own free text.
      </p>
      <div className="allergy-search-container">
        <input
          type="text"
          id="allergy-input"
          value={allergyQuery}
          onChange={e => {
            setAllergyQuery(e.target.value)
            if (allergyError) setAllergyError('')
          }}
          placeholder="Search for an Allergy:"
        />
        <button
          type="button"
          className="add-allergy-btn"
          onClick={() => {
            if (allergyQuery.trim() !== '') {
              const newAllergy = allergyQuery.trim()
              const duplicate = allergyFields.some(
                (field: any) =>
                  field.allergy.trim().toLowerCase() ===
                  newAllergy.toLowerCase(),
              )
              if (duplicate) {
                setAllergyError('This allergy has already been selected.')
              } else {
                appendAllergy({ allergy: newAllergy })
                setAllergyQuery('')
                setAllergyError('')
              }
            }
          }}
        >
          Add
        </button>
      </div>
      {allergyQuery && (
        <ul
          className="allergy-suggestion-container"
          style={{ listStyleType: 'none', padding: 0 }}
        >
          {filteredAllergyOptions.map((option, index) => (
            <li
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => setAllergyQuery(option)}
              className="allergy-suggestion"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {allergyFields.length > 0 && (
        <div className="allergys-fields-container">
          <ul
            className="allergys-fields-list"
            style={{ listStyleType: 'none', padding: 0 }}
          >
            {allergyFields.map((field: any, index: number) => (
              <div className="allergys-couple" key={field.id}>
                <li className="allergy-field">{field.allergy}</li>
                <button
                  className="allergy-field allergy-btn"
                  type="button"
                  onClick={() => removeAllergy(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
      {allergyError && <div className="error-message">{allergyError}</div>}
      {/* <div className="allergy-buttons-container">
        {profile && (
          <button
            className="allergy-btn"
            type="button"
            onClick={prevStep}
          >
            Back
          </button>
        )}
        <button
          disabled={!!allergyError}
          className="allergy-btn"
          type="button"
          onClick={nextStep}
        >
          Next
        </button>
      </div> */}
      <div className="allergy-buttons-container">
        {!profile && (
          <button className="allergy-btn" type="button" onClick={prevStep}>
            Back
          </button>
        )}
        <button
          disabled={!!allergyError}
          className={`allergy-btn ${profile ? 'full-width' : ''}`}
          type="button"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default StepAllergies
