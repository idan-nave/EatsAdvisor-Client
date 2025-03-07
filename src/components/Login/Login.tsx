import { Profile } from '@components'
import { useAuth } from '@context'

export default function Login() {
  const { login, user } = useAuth()

  console.log(user)

  return user ? (
    <Profile />
  ) : (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Sign in with Google</button>
    </div>
  )
}