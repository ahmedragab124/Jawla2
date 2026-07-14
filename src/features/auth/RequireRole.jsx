import { Navigate } from 'react-router-dom'
import { getCurrentUser, homeForRole } from './authStorage'

function RequireRole({ allowedRoles, children }) {
  const user = getCurrentUser()

  if (!user) return <Navigate to="/auth" replace />

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={homeForRole(user.role)} replace />
  }

  return children
}

export default RequireRole
