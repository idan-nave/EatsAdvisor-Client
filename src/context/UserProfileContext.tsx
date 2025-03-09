import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Define your data types
export interface Allergy {
  allergy: string
}

export interface FlavorRating {
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

// Define the shape of the context
interface UserProfileContextProps {
  profile: FormValues | null
  loading: boolean
  refetchProfile: () => void
}

// Create the context
const UserProfileContext = createContext<UserProfileContextProps | undefined>(undefined)

// Custom hook that simulates fetching the user profile data
export const useUserProfile = (): {
  profile: FormValues | null
  loading: boolean
  refetchProfile: () => void
} => {
  const [profile, setProfile] = useState<FormValues | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchProfile = async () => {
    setLoading(true)
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Uncomment one of the lines below to simulate a valid profile or no profile:
      
      // To simulate a valid profile, uncomment this block:
      const data: FormValues | null = {
        allergies: [{ allergy: 'Peanuts' }, { allergy: 'Gluten' }],
        restrictions: ['Vegan'],
        flavorRatings: [
          { flavor: 'Sweet', rating: 7 },
          { flavor: 'Sour', rating: 5 },
          { flavor: 'Salty', rating: 6 },
          { flavor: 'Bitter', rating: 4 },
          { flavor: 'Spicy', rating: 8 },
        ],
        dishes: [{ name: 'Pizza' }, { name: 'Sushi' }],
        personalPreference: 'I like spicy food with a hint of sweetness.',
      }

      // To simulate no profile, uncomment this line:
      // const data: FormValues | null = null

      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const refetchProfile = () => {
    fetchProfile()
  }

  return { profile, loading, refetchProfile }
}

// Create a provider component that uses the custom hook and makes the data available via context
export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { profile, loading, refetchProfile } = useUserProfile()

  return (
    <UserProfileContext.Provider value={{ profile, loading, refetchProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}

// Custom hook for consuming the context in your components
export const useUserProfileContext = (): UserProfileContextProps => {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error('useUserProfileContext must be used within a UserProfileProvider')
  }
  return context
}
