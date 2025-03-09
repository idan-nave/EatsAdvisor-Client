import { ROUTES } from '@constants'
import { UserPreferences } from '@interfaces'
import axios from 'axios'



export interface UserPreferencesServer {
  allergies: string[];
  specificDishes: string[]; 
  flavorPreferences: {
    Sweet: number;
    Sour: number;
    Salty: number;
    Bitter: number;
    Spicy: number;
    [key: string]: number;
  };
  specialPreferences: string[];
  dietaryConstraints: string[];
  dishHistory: Record<string, any>; 
}


const api = axios.create({
  baseURL: ROUTES.BASE_URL, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(request => {
  console.log('API Request:', request)
  return request
})

export const uploadMenu = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/api/menu/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}


export const createTestUser = async () => {
  try {
    const response = await api.get('/public/test-user/create')
    console.log('Test user created/retrieved:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating test user:', error)
    throw error
  }
}

export const saveUserPreferences = async (preferences: UserPreferences) => {
  const response = await api.post("/profile/preferences", preferences);
  return response.data;
};

export const checkUserProfile = async (email: string) => {
  try {
    const response = await api.post('/profile/get', { email });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null; 
    }
    console.error('Error checking user profile:', error);
    throw error;
  }
};

export const getUserPreferences = async (): Promise<UserPreferencesServer> => {
  try {
    const response = await api.get<UserPreferencesServer>('/profile/preferences');
    return response.data;
  } catch (error: any) {
    console.error('Error retrieving user preferences:', error);
    throw error;
  }
};


export default api
