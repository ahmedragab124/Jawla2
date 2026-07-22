import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TouristProfileSidebar from '../components/TouristProfileSidebar';
import AITripsList from '../components/AITripsList';
import BookingCard from '../components/BookingCard';
import { getAITrips, deleteAITrip } from '../../ai-planner/services/aiTripsStorage';
import { supabase } from '../../../supabase';

// TouristDashboard Component
// Main dashboard view for tourist users displaying profile sidebar, AI trip history, and bookings.
function TouristDashboard({ user, onUserUpdated }) {
  const [bookings, setBookings] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiTrips, setAiTrips] = useState(() => getAITrips(user.id));

  // Fetches user's bookings and available tour guides from Supabase
  useEffect(() => {
    const loadTouristData = async () => {
      try {
        const [
          { data: bookingsData, error: bookingsError },
          { data: guidesData, error: guidesError },
        ] = await Promise.all([
          supabase.from('bookings').select('*').eq('touristEmail', user.email),
          supabase.from('tourGuides').select('*'),
        ]);

        if (bookingsError) throw bookingsError;
        if (guidesError) throw guidesError;

        setBookings(bookingsData || []);
        setGuides(guidesData || []);
      } catch (err) {
        console.error('Failed to load tourist data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTouristData();
  }, [user.email]);

  // Handle deleting a saved AI trip itinerary
  const handleDeleteTrip = (tripId) => {
    if (!window.confirm('Are you sure you want to delete this itinerary?')) return;
    deleteAITrip(tripId);
    setAiTrips((prev) => prev.filter((trip) => trip.id !== tripId));
  };

  // Helper function to match guide details by ID
  const getGuideDetails = (guideId) => {
    if (!guideId) return null;
    return guides.find((g) => g.id === guideId) || null;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Profile Sidebar Component */}
      <div className="lg:col-span-1">
        <TouristProfileSidebar user={user} bookings={bookings} onUserUpdated={onUserUpdated} />
      </div>

      {/* Bookings & AI Trips Area */}
      <div className="lg:col-span-2">
        {/* Saved AI Trips Accordion List */}
        <AITripsList aiTrips={aiTrips} onDeleteTrip={handleDeleteTrip} />

        <h3 className="text-2xl font-extrabold text-[#3f2b1a] mb-6">My Bookings ({bookings.length})</h3>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#B8860B] border-t-transparent" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50">
            <p className="text-lg font-semibold text-stone-400">No bookings requested yet.</p>
            <Link to="/booking" className="mt-4 inline-flex rounded-xl bg-[#B8860B] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#8B5E3C]">
              Book a Guide Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} guide={getGuideDetails(b.guideId)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TouristDashboard;
