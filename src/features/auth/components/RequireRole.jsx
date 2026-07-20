import { Navigate } from 'react-router-dom'
import { homeForRole } from '../services/authStorage'
import { useAuth } from '../context/AuthContext'

function RequireRole({ allowedRoles, children }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/auth" replace />

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={homeForRole(user.role)} replace />
  }

  return children
}

export default RequireRole
