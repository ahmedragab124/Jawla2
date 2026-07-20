// Maps each user role to its home route after login.
export function homeForRole(role) {
  return role === 'Admin' ? '/admin/dashboard' : '/profile'
}
