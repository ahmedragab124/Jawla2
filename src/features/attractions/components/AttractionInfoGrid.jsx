import { Clock, MapPin } from 'lucide-react';

// Formats duration in minutes into hours and minutes text
function formatDuration(minutes) {
  if (!minutes) return 'N/A';
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} ${hours === 1 ? 'hour' : 'hours'}${remainingMinutes ? ` ${remainingMinutes} min` : ''}`;
}

// AttractionInfoGrid Component
function AttractionInfoGrid({ duration, bestTime }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl bg-[#fffaf0] p-4 text-[#5b4423] border border-[#f3e6d3] shadow-xs">
        <Clock className="mb-2 text-[#b57a2d]" size={22} />
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#a57e55]">Suggested Duration</p>
        <p className="mt-1 font-extrabold text-sm">{formatDuration(duration)}</p>
      </div>
      <div className="rounded-2xl bg-[#fffaf0] p-4 text-[#5b4423] border border-[#f3e6d3] shadow-xs">
        <MapPin className="mb-2 text-[#b57a2d]" size={22} />
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#a57e55]">Best Time To Visit</p>
        <p className="mt-1 font-extrabold text-sm">{bestTime || 'Morning'}</p>
      </div>
    </div>
  );
}

export default AttractionInfoGrid;
