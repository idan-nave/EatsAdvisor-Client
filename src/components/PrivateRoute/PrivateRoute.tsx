import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@context'
import { JSX } from 'react'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (location.pathname === '/scan' && location.state?.allowed !== true) {
    return <Navigate to="/" replace />
  }

  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
