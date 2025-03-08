import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@context'
import { JSX } from 'react'
import { useEffect, useState } from 'react'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!loading) {
      setIsChecking(false)
    }
  }, [loading])

  if (isChecking) {
    return <div>Loading...</div>
  }

  if (location.pathname === '/scan' && location.state?.allowed !== true) {
    return <Navigate to="/" replace />
  }

  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
