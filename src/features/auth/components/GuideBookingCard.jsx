import { Calendar, Users, Mail, Check, X, FileText } from 'lucide-react';

// GuideBookingCard Component
function GuideBookingCard({
  booking,
  isAccepting,
  guideNote,
  setGuideNote,
  onDecline,
  onStartAccept,
  onCancelAccept,
  onAcceptSubmit,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 flex flex-col gap-4 transition duration-300 hover:shadow-[0_20px_50px_rgba(76,48,24,0.12)]">
      <div className="flex justify-between items-start border-b pb-3 border-stone-100">
        <div>
          <span className="rounded-full bg-[#B8860B]/10 px-3 py-1 text-xs font-bold text-[#B8860B]">
            {booking.tourType}
          </span>
          <h4 className="mt-2 text-xl font-bold text-[#3f2b1a]">{booking.touristName}</h4>
          <p className="text-xs text-stone-400">{booking.touristEmail}</p>
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
        <div className="flex items-center gap-2">
          <Mail className="text-stone-400 shrink-0" size={16} />
          <div>
            <span className="block text-[10px] text-stone-400 uppercase font-semibold">Contact Phone</span>
            <span className="font-semibold text-stone-700">{booking.phone}</span>
          </div>
        </div>
      </div>

      {booking.requests && (
        <div className="bg-stone-50/70 p-3 rounded-2xl text-xs text-[#594735] border border-stone-100">
          <span className="font-bold text-[#3f2b1a] block mb-1">Tourist Special Requests:</span>
          <p className="italic text-stone-600">"{booking.requests}"</p>
        </div>
      )}

      {booking.guideNote && (
        <div className="bg-green-50/70 p-3 rounded-2xl text-xs text-green-900 border border-green-100/50">
          <span className="font-bold text-green-800 block mb-1">Your message to tourist:</span>
          <p className="italic text-green-900/90 font-medium">"{booking.guideNote}"</p>
        </div>
      )}

      {booking.status === 'Pending' && !isAccepting && (
        <div className="mt-2 pt-4 border-t border-stone-100 flex gap-3 justify-end">
          <button
            onClick={() => onDecline(booking.id)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition border border-red-200 cursor-pointer"
          >
            <X size={14} /> Decline Request
          </button>
          <button
            onClick={() => onStartAccept(booking.id)}
            className="flex items-center gap-1 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#B8860B] hover:bg-[#8B5E3C] transition shadow-md cursor-pointer"
          >
            <Check size={14} /> Accept Request
          </button>
        </div>
      )}

      {isAccepting && (
        <form
          onSubmit={(e) => onAcceptSubmit(e, booking.id)}
          className="mt-2 pt-4 border-t border-stone-100 bg-[#fffaf0]/50 p-4 rounded-2xl border border-amber-100 flex flex-col gap-3"
        >
          <label className="text-xs font-bold text-[#3f2b1a] flex items-center gap-1.5">
            <FileText size={14} /> Welcome message for tourist (Optional):
          </label>
          <textarea
            rows="2"
            value={guideNote}
            onChange={(e) => setGuideNote(e.target.value)}
            placeholder="Add instructions, meeting spot, or general greeting..."
            className="w-full text-xs p-3 rounded-xl border border-[#D8C3A5] bg-white outline-none focus:border-[#B8860B] transition resize-none"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onCancelAccept}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-500 hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              Confirm & Accept
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default GuideBookingCard;
