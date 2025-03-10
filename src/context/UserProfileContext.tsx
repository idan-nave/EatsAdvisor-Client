import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useAuth } from './AuthContext'
import { checkUserProfile, getUserPreferences } from '@/api'
import { convertToFormValues } from '@/utils'

const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0
}

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

/**
 * Provider that fetches profile data when a user is present.
 * If user is not logged in, profile is null.
 */
export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<FormValues | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchProfile = async () => {
    // If there is no user, do not fetch
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    console.log('Fetching profile for user:', user.email)
    setLoading(true)

    try {
      // Call your API to get the user's preferences

      const userPreferences = await getUserPreferences()

      if (!isEmpty(userPreferences)) {
        // Transform the data into your FormValues format

        console.log('userPreferences: ', userPreferences)

        const formValues = convertToFormValues(userPreferences)

        // Set the profile
        setProfile(formValues)
        console.log('Profile fetched successfully:', formValues)
      } else {
        setProfile(null)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  // This effect will run when the component mounts AND whenever the user changes
  useEffect(() => {
    fetchProfile()
  }, [user]) // <- The key change: re-run when user changes

  const refetchProfile = () => {
    console.log('Manually refetching profile')
    fetchProfile()
  }

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
