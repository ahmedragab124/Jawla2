import { Link, useNavigate } from 'react-router-dom'
import { homeForRole } from '../services/authStorage'
import { useAuth } from '../context/AuthContext'

function AuthNavAction({ mobile = false }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const buttonClass = mobile
    ? 'block w-full rounded bg-[#b57a2d] px-4 py-2 text-center font-medium text-white transition hover:bg-[#a66c28]'
    : 'rounded-full border border-white/40 px-4 py-2 font-medium text-white transition hover:bg-white/10'

  if (!user) return <Link to="/auth" className={buttonClass}>Login</Link>

  return (
    <div className={mobile ? 'space-y-2' : 'flex items-center gap-3'}>
      <Link to={homeForRole(user.role)} className={buttonClass}>{user.name || user.role}</Link>
      <button
        type="button"
        onClick={() => {
          logout()
          navigate('/')
        }}
        className="text-sm text-amber-100 hover:text-white"
      >
        Logout
      </button>
    </div>
  )
}

export default AuthNavAction
