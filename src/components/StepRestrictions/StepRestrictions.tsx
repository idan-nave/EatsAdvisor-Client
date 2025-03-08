import './step-restrictions.css'

interface StepRestrictionsProps {
  register: any;
  errors: any;
  nextStep: () => void;
  prevStep: () => void;
}

const restrictionOptions = ['Kosher', 'Vegetarian', 'Vegan', 'Gluten-Free'];

const StepRestrictions: React.FC<StepRestrictionsProps> = ({
  register,
  errors,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="user-profile-form-step-container step-2">
      <h2 className="user-profile-step-headers u-p-h-1">Restrictions</h2>
      <p className="user-profile-step-headers u-p-h-2">Select applicable restrictions:</p>
      {restrictionOptions.map((option, index) => (
        <div className='restrictions-container' key={index}>
          <input    
            type="checkbox"
            id={`restriction-${option}`}
            value={option}
            {...register('restrictions')}
          />
          <label htmlFor={`restriction-${option}`}>{option}</label>
        </div>
      ))}
      {errors.restrictions && (
        <div className="error-message">{errors.restrictions.message}</div>
      )}
      <div className='restrictions-nav-btns'>
        <button className="restriction-btn" type="button" onClick={prevStep}>
          Back
        </button>
        <button className="restriction-btn" type="button" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepRestrictions;
