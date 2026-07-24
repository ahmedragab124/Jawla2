import { Compass, CheckCircle2, Mail, MapPin } from 'lucide-react';

// TourGuideProfileCard Component
function TourGuideProfileCard({ user }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 sticky top-24">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6eedc] text-[#4d5c3d]">
        <Compass size={32} />
      </div>
      <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">{user.role} Dashboard</p>
      <h2 className="mt-2 text-3xl font-black text-[#3f2b1a]">{user.name}</h2>

      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
        <CheckCircle2 size={12} />
        Approved Guide
      </div>

      <p className="mt-4 text-sm text-[#6d5c4a] leading-relaxed">
        Accept bookings, decline conflict dates, and leave helpful greeting messages for tourists.
      </p>

      <div className="mt-6 space-y-4 border-t border-stone-100 pt-6 text-sm text-[#594735]">
        <div className="flex items-center gap-3">
          <Mail className="text-[#b57a2d]" size={18} />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-[#b57a2d]" size={18} />
          <span>Certified Egyptologist</span>
        </div>
      </div>
    </section>
  );
}

export default TourGuideProfileCard;
