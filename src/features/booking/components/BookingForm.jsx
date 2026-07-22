import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { FaCompass, FaSpinner } from 'react-icons/fa';
import BookingUnauthNotice from './BookingUnauthNotice';
import BookingFormFields from './BookingFormFields';
import { supabase } from '../../../supabase';

// BookingForm Component
function BookingForm() {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);
  const [guidesLoading, setGuidesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    email: user?.email || '',
    people: '',
    date: '',
    tourType: 'Historical Tour',
    requests: '',
    guideId: '',
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const loadGuides = async () => {
      const { data, error } = await supabase.from('tourGuides').select('*').eq('status', 'Approved');
      if (error) console.error('Failed to fetch guides:', error);
      else setGuides(data || []);
      setGuidesLoading(false);
    };

    loadGuides();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.date) return alert('Please fill in all required fields.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return alert('Please enter a valid email address.');
    if (!/^\d{11}$/.test(formData.phone)) return alert('Phone number must contain 11 digits.');
    if (formData.people && Number(formData.people) <= 0) return alert('Number of people must be greater than 0.');
    if (formData.date < today) return alert('Please select today or a future date.');

    setLoading(true);
    const bookingPayload = {
      ...formData,
      touristId: user.id || 'unknown',
      touristName: user.name,
      touristEmail: user.email,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from('bookings').insert([bookingPayload]);
      if (error) throw error;
      setSuccessMessage('✅ Your booking request has been submitted successfully!');
      setFormData({ fullName: user.name || '', phone: '', email: user.email || '', people: '', date: '', tourType: 'Historical Tour', requests: '', guideId: '' });
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <BookingUnauthNotice />;

  const guideOptions = [{ value: '', label: 'No guide (General Request)' }, ...guides.map((g) => ({ value: g.id, label: g.name }))];

  return (
    <div className="relative w-full max-w-150 overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/30 bg-white/10 p-3 sm:p-5 lg:p-7 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-fadeUp">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md shadow-lg">
            <FaCompass className="text-xl text-[#B8860B]" />
          </div>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#8B5E3C] leading-tight">Find Your Perfect Guide</h2>
        <p className="mt-2 mb-4 text-center text-xs sm:text-sm text-[#5C4B3B]">Customize your trip with ease & local experts</p>

        <BookingFormFields formData={formData} onChange={handleChange} today={today} guidesLoading={guidesLoading} guideOptions={guideOptions} />

        <button type="submit" disabled={loading || !!successMessage} className={`mt-5 w-full rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${successMessage ? 'bg-green-600' : 'bg-gradient-to-r from-[#C79A2D] to-[#8B5E3C] hover:shadow-xl'}`}>
          {loading && <FaSpinner className="animate-spin" size={16} />}
          <span>{loading ? 'Sending...' : successMessage ? 'Submitted ✓' : 'Submit Request →'}</span>
        </button>

        {successMessage && <p className="mt-3 rounded-lg bg-green-100 py-2 text-center text-xs font-medium text-green-700">{successMessage}</p>}
      </form>
    </div>
  );
}

export default BookingForm;
