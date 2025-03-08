import { ROUTES } from '@constants'
import { useRouteError, useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError() as { message?: string }
  const navigate = useNavigate()

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error?.message || 'An unexpected error occurred.'}</p>
      <button onClick={() => navigate(ROUTES.BASE)}>Go Home</button>
    </div>
  )
}

export default ErrorPage

