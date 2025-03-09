import './step-personal-preference.css';

interface StepPersonalPreferenceProps {
  register: any;
  errors: any;
  prevStep: () => void;
}

const StepPersonalPreference: React.FC<StepPersonalPreferenceProps> = ({
  register,
  errors,
  prevStep,
}) => {
  return (
    <div className="user-profile-form-step-container step-5">
      <h2 className="user-profile-step-headers">Personal Preference</h2>
      <label htmlFor="personalPreference">Your Personal Preference:</label>
      <textarea id="personalPreference" {...register('personalPreference')}></textarea>
      {errors.personalPreference && (
        <div className="error-message">
          {errors.personalPreference.message}
        </div>
      )}
      <div className='personal-preference-nav-btns-container'>
        <button className="personal-preference-nav-btn" type="button" onClick={prevStep}>
          Back
        </button>
        <button className="personal-preference-nav-btn" type="submit">
          Save
        </button>
      </div>
    </div>
  );
};

export default StepPersonalPreference;
