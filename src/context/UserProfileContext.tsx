import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

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
const UserProfileContext = createContext<UserProfileContextProps | undefined>(
  undefined,
)

// Custom hook that fetches the user profile data
export const useUserProfile = (): UserProfileContextProps => {
  const [profile, setProfile] = useState<FormValues | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchProfile = async () => {
    setLoading(true)
    try {
      // Removed unused API calls to checkUserProfile and getUserPreferences.
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
    console.log('Profile has been refetched')
    fetchProfile()
  }

  return { profile, loading, refetchProfile }
}

// Create a provider component that makes the data available via context
export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
    throw new Error(
      'useUserProfileContext must be used within a UserProfileProvider',
    )
  }
  return context
}
