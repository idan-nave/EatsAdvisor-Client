import { useEffect } from 'react'
import { ROUTES } from '@constants'
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
      <div className="sign-in-container">
        <FcGoogle className="sign-in-icon" />
        <button className="sign-in-btn" onClick={login}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
