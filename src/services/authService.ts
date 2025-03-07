import { api, setAccessToken } from '@api'
import { AxiosResponse } from 'axios'

interface LoginCredentials {
  username: string
  password: string
  // Add any additional properties as needed
}

interface AuthResponse {
  accessToken: string
  // Include any other fields returned by your API
  [key: string]: any
}

const AuthService = {
  // Login: sends credentials to the login endpoint. The server should respond with an access token
  // and set the refresh token as an HTTP‑only cookie.
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {

    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', credentials, {
      withCredentials: true,
    })
    
    // Save the new access token in memory
    setAccessToken(response.data.accessToken)
    return response.data
  },

  // Logout: optionally call a logout endpoint to clear the refresh token cookie,
  // clear the access token in memory, and redirect to login.
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Error during logout:', error)
    }
    setAccessToken(null)
    window.location.href = '/login'
  },

  // Optional: manual token refresh function (if you need to trigger a refresh aside from the interceptor)
  refreshToken: async (): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post(
      '/auth/refresh',
      {},
      { withCredentials: true },
    )
    setAccessToken(response.data.accessToken)
    return response.data
  },
}

export default AuthService
