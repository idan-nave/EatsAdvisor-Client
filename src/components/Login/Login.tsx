import { useAuth } from '@context'
import { UserProfile } from '@pages'
import { FcGoogle } from 'react-icons/fc'
import './login.css'

export default function Login() {
  const { login, user } = useAuth()

  return user ? (
    <UserProfile />
  ) : (
    <div className="login-container">
      <h1 className="welcome-title">Welcome to EatsAdvisor</h1>
      <p className="welcome-text">
        Your personal menu advisor for dietary preferences and restrictions.
        Upload a menu photo and get personalized recommendations!
      </p>
      
      <div className="sign-in-container">
        <FcGoogle className="sign-in-icon" />
        <button className="sign-in-btn" onClick={login}>
          Sign in with Google
        </button>
      </div>
      
      <div className="disclaimer">
        <h3>Authentication Information</h3>
        <p>
          By signing in, you agree to our terms of service and privacy policy.
        </p>
        <ul>
          <li>Access tokens expire according to Google's standard terms (typically 1 hour)</li>
          <li>Refresh tokens expire after 1 week</li>
          <li>Your data is securely stored and only used to provide personalized recommendations</li>
        </ul>
      </div>
    </div>
  )
}
