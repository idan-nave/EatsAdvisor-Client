import React, { useState, useEffect } from 'react'
import { useAuth } from '@context'
import './preferences.css'

const Preferences: React.FC = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [preferences, setPreferences] = useState({
    allergies: [] as string[],
    dietaryConstraints: [] as string[],
    flavors: [] as string[],
    specialPreferences: [] as string[]
  })
  
  const availableOptions = {
    allergies: ['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat', 'Soy'],
    dietaryConstraints: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Kosher', 'Halal', 'Low-Carb', 'Keto', 'Paleo'],
    flavors: ['Spicy', 'Sweet', 'Sour', 'Bitter', 'Savory', 'Umami'],
    specialPreferences: ['Low-Sodium', 'Low-Sugar', 'High-Protein', 'Low-Fat', 'Organic', 'Locally Sourced']
  }
  
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    // Fetch user preferences from the backend
    const fetchPreferences = async () => {
      try {
        setLoading(true)
        // This would be replaced with an actual API call
        // const response = await api.get('/profile/preferences')
        // setPreferences(response.data)
        
        // Simulating API response for now
        setTimeout(() => {
          setPreferences({
            allergies: ['Dairy', 'Peanuts'],
            dietaryConstraints: ['Vegetarian'],
            flavors: ['Spicy', 'Savory'],
            specialPreferences: ['Low-Sodium']
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching preferences:', error)
        setLoading(false)
      }
    }

    if (user) {
      fetchPreferences()
    }
  }, [user])

  const handleTogglePreference = (category: string, item: string) => {
    setPreferences(prev => {
      const updatedCategory = prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
      
      return {
        ...prev,
        [category]: updatedCategory
      }
    })
  }

  const handleSavePreferences = async () => {
    try {
      setLoading(true)
      // This would be replaced with an actual API call
      // await api.post('/profile/preferences', preferences)
      
      // Simulating API response
      setTimeout(() => {
        setMessage({ text: 'Preferences saved successfully!', type: 'success' })
        setLoading(false)
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage({ text: '', type: '' })
        }, 3000)
      }, 1000)
    } catch (error) {
      console.error('Error saving preferences:', error)
      setMessage({ text: 'Failed to save preferences. Please try again.', type: 'error' })
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="preferences-container loading">Loading preferences...</div>
  }

  return (
    <div className="preferences-container">
      <h1>Your Dietary Preferences</h1>
      <p className="preferences-intro">
        Customize your dietary preferences to get personalized menu recommendations.
        These settings will be used to highlight dishes that match your preferences.
      </p>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="preferences-section">
        <h2>Allergies</h2>
        <div className="preferences-options">
          {availableOptions.allergies.map(allergy => (
            <div 
              key={allergy} 
              className={`preference-option ${preferences.allergies.includes(allergy) ? 'selected' : ''}`}
              onClick={() => handleTogglePreference('allergies', allergy)}
            >
              {allergy}
            </div>
          ))}
        </div>
      </div>

      <div className="preferences-section">
        <h2>Dietary Constraints</h2>
        <div className="preferences-options">
          {availableOptions.dietaryConstraints.map(constraint => (
            <div 
              key={constraint} 
              className={`preference-option ${preferences.dietaryConstraints.includes(constraint) ? 'selected' : ''}`}
              onClick={() => handleTogglePreference('dietaryConstraints', constraint)}
            >
              {constraint}
            </div>
          ))}
        </div>
      </div>

      <div className="preferences-section">
        <h2>Flavor Preferences</h2>
        <div className="preferences-options">
          {availableOptions.flavors.map(flavor => (
            <div 
              key={flavor} 
              className={`preference-option ${preferences.flavors.includes(flavor) ? 'selected' : ''}`}
              onClick={() => handleTogglePreference('flavors', flavor)}
            >
              {flavor}
            </div>
          ))}
        </div>
      </div>

      <div className="preferences-section">
        <h2>Special Preferences</h2>
        <div className="preferences-options">
          {availableOptions.specialPreferences.map(pref => (
            <div 
              key={pref} 
              className={`preference-option ${preferences.specialPreferences.includes(pref) ? 'selected' : ''}`}
              onClick={() => handleTogglePreference('specialPreferences', pref)}
            >
              {pref}
            </div>
          ))}
        </div>
      </div>

      <button className="save-preferences-button" onClick={handleSavePreferences} disabled={loading}>
        {loading ? 'Saving...' : 'Save Preferences'}
      </button>
    </div>
  )
}

export default Preferences
