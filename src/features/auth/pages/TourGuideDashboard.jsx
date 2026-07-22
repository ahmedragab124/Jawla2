import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { supabase } from '../../../supabase';
import TourGuideProfileCard from '../components/TourGuideProfileCard';
import GuideBookingCard from '../components/GuideBookingCard';

// TourGuideDashboard Component
function TourGuideDashboard({ user }) {
  const [guide, setGuide] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingBookingId, setAcceptingBookingId] = useState(null);
  const [guideNote, setGuideNote] = useState('');

  // Loads guide profile details and assigned bookings from Supabase
  useEffect(() => {
    const loadGuideDashboard = async () => {
      try {
        const { data: guides, error: guideError } = await supabase
          .from('tourGuides')
          .select('*')
          .eq('email', user.email);

        if (guideError) throw guideError;
        if (!guides || guides.length === 0) throw new Error('Guide record not found.');

        const guideData = guides[0];
        setGuide(guideData);

        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('guideId', guideData.id);

        if (bookingsError) throw bookingsError;

        setBookings(bookingsData || []);
      } catch (err) {
        console.error('Failed to load guide dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGuideDashboard();
  }, [user.email]);

  // Declines a pending booking request
  const handleDecline = async (bookingId) => {
    if (!window.confirm('Are you sure you want to decline this booking request?')) return;
    const { error } = await supabase.from('bookings').update({ status: 'Rejected' }).eq('id', bookingId);
    if (error) return alert('Something went wrong.');
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'Rejected' } : b)));
  };

  // Confirms accepting a booking with an optional welcome note for the tourist
  const handleAcceptSubmit = async (e, bookingId) => {
    e.preventDefault();
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'Approved', guideNote: guideNote.trim() || null })
      .eq('id', bookingId);

    if (error) return alert('Something went wrong.');
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'Approved', guideNote } : b)));
    setAcceptingBookingId(null);
    setGuideNote('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen bg-[#fffaf0]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#B8860B] border-t-transparent" />
      </div>
    );
  }

  // Pending verification screen
  if (guide && guide.status === 'Pending approval') {
    return (
      <main className="min-h-screen bg-[#fffaf0] px-5 py-16 flex items-center justify-center">
        <section className="mx-auto max-w-xl rounded-4xl bg-white p-8 shadow-[0_24px_80px_rgba(76,48,24,0.1)] border border-stone-100 text-center flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 animate-pulse">
            <Clock size={32} />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[#3f2b1a]">Application Under Review</h2>
          <p className="mt-3 text-stone-600 leading-relaxed max-w-sm">
            Hi <strong>{guide.name}</strong>, your Tour Guide registration is currently under review by our admin team.
          </p>
        </section>
      </main>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <TourGuideProfileCard user={user} />
      </div>

      <div className="lg:col-span-2">
        <h3 className="text-2xl font-extrabold text-[#3f2b1a] mb-6">Assigned Bookings ({bookings.length})</h3>

        {bookings.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50">
            <p className="text-lg font-semibold text-stone-400">No trips assigned to you yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <GuideBookingCard
                key={booking.id}
                booking={booking}
                isAccepting={acceptingBookingId === booking.id}
                guideNote={guideNote}
                setGuideNote={setGuideNote}
                onDecline={handleDecline}
                onStartAccept={(id) => { setAcceptingBookingId(id); setGuideNote(''); }}
                onCancelAccept={() => { setAcceptingBookingId(null); setGuideNote(''); }}
                onAcceptSubmit={handleAcceptSubmit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TourGuideDashboard;
