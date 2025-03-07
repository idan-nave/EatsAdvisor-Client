import { Profile } from '@components'
import { useAuth } from '@context'

export default function Login() {
  const { login, user } = useAuth()

  return user ? (
    <Profile />
  ) : (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Sign in with Google</button>
    </div>
  )
}
