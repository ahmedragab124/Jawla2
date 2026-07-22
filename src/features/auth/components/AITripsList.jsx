import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

// AITripsList Component
// Renders saved AI itineraries for the user with expandable day schedules and delete buttons.
function AITripsList({ aiTrips, onDeleteTrip }) {
  const [expandedTripId, setExpandedTripId] = useState(null);

  // Toggles expansion of a specific trip card by ID
  const toggleExpand = (tripId) => {
    setExpandedTripId((prev) => (prev === tripId ? null : tripId));
  };

  return (
    <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#3f2b1a] to-[#80541e] p-6 text-white shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-amber-200">
            <Sparkles size={17} /> AI TRAVEL PLANS
          </p>
          <h3 className="mt-2 text-2xl font-black">Your personalized Egypt itineraries</h3>
          <p className="mt-2 text-sm text-white/75">Every plan you generate with AI is kept here for you.</p>
        </div>
        <Link to="/ai-planner" className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#80541e] transition hover:bg-amber-50 cursor-pointer">
          Create a plan
        </Link>
      </div>

      {aiTrips.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/80">
          You have not created an AI itinerary yet. Start planning your next adventure.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {aiTrips.map((aiTrip) => {
            const isExpanded = expandedTripId === aiTrip.id;
            const stops = Object.values(aiTrip.trip || {}).flat();

            return (
              <div key={aiTrip.id} className="rounded-2xl bg-white p-4 text-[#3f2b1a]">
                <div className="flex w-full items-center gap-3">
                  <button
                    onClick={() => toggleExpand(aiTrip.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left cursor-pointer"
                  >
                    <img src={aiTrip.destination?.image || '/attractions/pyramids.png'} alt="" className="h-12 w-12 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-extrabold">{aiTrip.destination?.name} · {aiTrip.days} days</span>
                      <span className="mt-1 block text-xs text-stone-500">{stops.length} stops · {new Date(aiTrip.createdAt).toLocaleDateString()}</span>
                    </span>
                    {isExpanded ? <ChevronUp size={19} className="shrink-0" /> : <ChevronDown size={19} className="shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTrip(aiTrip.id);
                    }}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition cursor-pointer shrink-0"
                    title="Delete Itinerary"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 grid gap-3 border-t border-stone-100 pt-4 sm:grid-cols-2">
                    {Object.entries(aiTrip.trip || {}).map(([day, dayStops]) => (
                      <div key={day} className="rounded-xl bg-[#fffaf0] p-3">
                        <p className="text-xs font-black uppercase tracking-wider text-[#b57a2d]">{day}</p>
                        {dayStops.map((stop) => (
                          <p key={`${day}-${stop.attractionId}`} className="mt-1.5 text-sm font-medium">
                            <span className="mr-2 text-xs text-stone-400">{stop.time}</span>
                            {aiTrip.attractions?.find((a) => a.id === stop.attractionId)?.name || 'Attraction'}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default AITripsList;
