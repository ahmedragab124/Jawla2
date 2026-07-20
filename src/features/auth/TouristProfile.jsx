import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import TouristDashboard from './TouristDashboard'
import TourGuideDashboard from './TourGuideDashboard'

function TouristProfile() {
  const { user, updateUser } = useAuth()

  if (!user) return <Navigate to="/auth" replace />

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl animate-fadeUp">
        {user.role === 'Tour Guide' ? (
          <TourGuideDashboard user={user} />
        ) : (
          <TouristDashboard user={user} onUserUpdated={updateUser} />
        )}
      </div>
    </main>
  )
}

export default TouristProfile
