import { Calendar, Users, Compass, MessageSquare, Phone, Mail } from 'lucide-react';
import BookingStatusStepper from './BookingStatusStepper';

// BookingCard Component
function BookingCard({ booking, guide }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 flex flex-col gap-4 transition duration-300 hover:shadow-[0_20px_50px_rgba(76,48,24,0.12)]">
      <div className="flex justify-between items-start border-b pb-3 border-stone-100">
        <div>
          <span className="rounded-full bg-[#B8860B]/10 px-3 py-1 text-xs font-bold text-[#B8860B]">
            {booking.tourType}
          </span>
          <h4 className="mt-2 text-xl font-bold text-[#3f2b1a]">Trip to {booking.tourType} Details</h4>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            booking.status === 'Approved'
              ? 'bg-green-100 text-green-800'
              : booking.status === 'Rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[#594735]">
        <div className="flex items-center gap-2">
          <Calendar className="text-stone-400 shrink-0" size={16} />
          <div>
            <span className="block text-[10px] text-stone-400 uppercase font-semibold">Date</span>
            <span className="font-semibold text-stone-700">{booking.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="text-stone-400 shrink-0" size={16} />
          <div>
            <span className="block text-[10px] text-stone-400 uppercase font-semibold">Guests Count</span>
            <span className="font-semibold text-stone-700">{booking.people || 1} Person(s)</span>
          </div>
        </div>
        {guide && (
          <div className="flex items-center gap-2">
            <Compass className="text-stone-400 shrink-0" size={16} />
            <div>
              <span className="block text-[10px] text-stone-400 uppercase font-semibold">Selected Guide</span>
              <span className="font-semibold text-stone-700">{guide.name}</span>
            </div>
          </div>
        )}
      </div>

      {booking.requests && (
        <div className="bg-stone-50/70 p-3 rounded-2xl text-xs text-[#594735] border border-stone-100">
          <span className="font-bold text-[#3f2b1a] block mb-1">Special Requests:</span>
          <p className="italic text-stone-600">"{booking.requests}"</p>
        </div>
      )}

      {booking.guideNote && (
        <div className="bg-green-50/70 p-4 rounded-2xl text-xs text-green-900 border border-green-100/50 flex gap-3 items-start">
          <MessageSquare className="text-green-600 shrink-0 mt-0.5" size={18} />
          <div>
            <span className="font-bold text-green-800 block mb-1">Message from Guide:</span>
            <p className="italic text-green-900/90 font-medium">"{booking.guideNote}"</p>
          </div>
        </div>
      )}

      {/* Guide Contact Info - shown only when Approved */}
      {booking.status === 'Approved' && guide && (guide.phone || guide.email) && (
        <div className="rounded-2xl border border-[#B8860B]/25 bg-[#fffaf0] p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-3">📞 Contact Your Guide</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guide.phone && (
              <a
                href={`tel:${guide.phone}`}
                className="flex items-center gap-2 rounded-xl bg-white border border-stone-200 px-4 py-2.5 text-sm font-semibold text-[#3f2b1a] shadow-sm transition hover:border-[#B8860B]"
              >
                <Phone size={15} className="text-[#B8860B] shrink-0" />
                {guide.phone}
              </a>
            )}
            {guide.whatsapp && (
              <a
                href={`https://wa.me/2${guide.whatsapp.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600"
              >
                WhatsApp
              </a>
            )}
            {guide.email && (
              <a
                href={`mailto:${guide.email}`}
                className="flex items-center gap-2 rounded-xl bg-white border border-stone-200 px-4 py-2.5 text-sm font-semibold text-[#3f2b1a] shadow-sm transition hover:border-[#B8860B] sm:col-span-2"
              >
                <Mail size={15} className="text-[#B8860B] shrink-0" />
                {guide.email}
              </a>
            )}
          </div>
        </div>
      )}

      <BookingStatusStepper status={booking.status} />
    </div>
  );
}

export default BookingCard;
