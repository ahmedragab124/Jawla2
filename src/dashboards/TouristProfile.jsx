import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';
import TouristDashboard from './tourist/TouristDashboard';
import TourGuideDashboard from './tourguide/TourGuideDashboard';

function TouristProfile() {
  const { user, updateUser } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 pt-24 pb-12 md:px-8 md:pb-16">
      <div className="mx-auto max-w-7xl animate-fadeUp">
        {user.role === 'Tour Guide' ? (
          <TourGuideDashboard user={user} />
        ) : (
          <TouristDashboard user={user} onUserUpdated={updateUser} />
        )}
      </div>
    </main>
  );
}

export default TouristProfile;
