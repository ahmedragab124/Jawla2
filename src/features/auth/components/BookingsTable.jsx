import { Trash2 } from 'lucide-react';

// BookingsTable Component
function BookingsTable({ bookings, tourGuides, onDelete }) {
  // Resolves guide name by guideId
  const getGuideName = (guideId) => {
    if (!guideId) return 'General Request';
    const guide = tourGuides.find((g) => g.id === guideId);
    return guide ? guide.name : 'Unknown Guide';
  };

  return (
    <section className="mt-10 overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
      <div className="border-b border-stone-100 p-6">
        <h2 className="text-2xl font-bold text-[#3f2b1a]">System Bookings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-220 text-left text-sm">
          <thead className="bg-[#f9f3e9] text-[#725a40]">
            <tr>
              <th className="p-4">Tourist Name</th>
              <th className="p-4">Tour type</th>
              <th className="p-4">Preferred Date</th>
              <th className="p-4">Assigned Guide</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-stone-100 hover:bg-stone-50/50">
                <td className="p-4">
                  <p className="font-bold text-[#3f2b1a]">{booking.fullName}</p>
                  <p className="text-xs text-stone-400">{booking.email}</p>
                </td>
                <td className="p-4 font-semibold text-[#3f2b1a]">{booking.tourType}</td>
                <td className="p-4 text-[#695744] font-medium">{booking.date}</td>
                <td className="p-4 text-[#695744] font-medium">{getGuideName(booking.guideId)}</td>
                <td className="p-4">
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
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => onDelete(booking.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition cursor-pointer"
                    title="Delete Request"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-stone-400 font-medium bg-stone-50/50">
                  No bookings available in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BookingsTable;
