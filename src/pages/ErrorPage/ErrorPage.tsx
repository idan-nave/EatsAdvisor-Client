import { ROUTES } from '@constants'
import { useRouteError, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { NavBar } from '@components'
import './errorpage.css'

const ErrorPage = () => {
  const error = useRouteError() as { message?: string }
  const navigate = useNavigate()

  useEffect(() => {
    //Uncomment the following lines if you want to auto-redirect after 5 seconds:
    const timer = setTimeout(() => {
      navigate(ROUTES.BASE)
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="error-page-container">
      <div className="error-content">
        <h3 className="error-title">Oops! Something went wrong.</h3>
        <p className="error-redirect">
          You will be redirected to the homepage in a few seconds...
        </p>
        <button className="btn-error" onClick={() => navigate(ROUTES.BASE)}>
          Go Home Now
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
