
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('eg-tour-user'))
  } catch {
    return null
  }
}

export function saveCurrentUser(user) {
  localStorage.setItem('eg-tour-user', JSON.stringify(user))
}

export function clearCurrentUser() {
  localStorage.removeItem('eg-tour-user')
}

export function homeForRole(role) {
  return role === 'Admin' ? '/admin/dashboard' : '/profile'
}
