import { useEffect, useState } from 'react';
import { supabase } from '../../../supabase';
import AdminStatsGrid from '../components/AdminStatsGrid';
import GuideRegistrationsTable from '../components/GuideRegistrationsTable';
import BookingsTable from '../components/BookingsTable';
import TouristsTable from '../components/TouristsTable';

// AdminDashboard Component
function AdminDashboard() {
  const [tourists, setTourists] = useState([]);
  const [tourGuides, setTourGuides] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Loads initial dashboard data (tourists, tour guides, and bookings) from Supabase
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [
          { data: users, error: usersError },
          { data: guides, error: guidesError },
          { data: bookingsData, error: bookingsError },
        ] = await Promise.all([
          supabase.from('users').select('*').eq('role', 'Tourist'),
          supabase.from('tourGuides').select('*'),
          supabase.from('bookings').select('*'),
        ]);

        if (usersError) throw usersError;
        if (guidesError) throw guidesError;
        if (bookingsError) throw bookingsError;

        setTourists(users || []);
        setTourGuides(guides || []);
        setBookings(bookingsData || []);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Approves a pending tour guide registration application
  const handleApproveGuide = async (guideId) => {
    const { error } = await supabase.from('tourGuides').update({ status: 'Approved' }).eq('id', guideId);
    if (error) return console.error('Failed to approve guide:', error);
    setTourGuides((prev) => prev.map((g) => (g.id === guideId ? { ...g, status: 'Approved' } : g)));
  };

  // Rejects a pending tour guide registration application
  const handleRejectGuide = async (guideId) => {
    if (!window.confirm('Are you sure you want to reject this guide application?')) return;
    const { error } = await supabase.from('tourGuides').update({ status: 'Rejected' }).eq('id', guideId);
    if (error) return console.error('Failed to reject guide:', error);
    setTourGuides((prev) => prev.map((g) => (g.id === guideId ? { ...g, status: 'Rejected' } : g)));
  };

  // Deletes a booking from the system
  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking request?')) return;
    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);
    if (error) return console.error('Failed to delete booking:', error);
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen bg-[#fffaf0]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#B8860B] border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold tracking-[0.25em] text-[#b57a2d] uppercase">System Controller</p>
        <h1 className="mt-3 text-4xl font-black text-[#3f2b1a]">Admin Dashboard</h1>
        <p className="mt-2 text-[#695744]">Manage tourists, verify tour guide applications, and oversee booking requests.</p>

        {/* Stats Grid Sub-component */}
        <AdminStatsGrid touristsCount={tourists.length} guidesCount={tourGuides.length} bookingsCount={bookings.length} />

        {/* Tour Guide Registrations Sub-component */}
        <GuideRegistrationsTable tourGuides={tourGuides} onApprove={handleApproveGuide} onReject={handleRejectGuide} />

        {/* System Bookings Sub-component */}
        <BookingsTable bookings={bookings} tourGuides={tourGuides} onDelete={handleDeleteBooking} />

        {/* Registered Tourists Sub-component */}
        <TouristsTable tourists={tourists} />
      </div>
    </main>
  );
}

export default AdminDashboard;
