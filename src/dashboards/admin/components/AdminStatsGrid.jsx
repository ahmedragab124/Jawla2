import { UsersRound, UserRoundCheck, ClipboardList } from 'lucide-react';

// AdminStatsGrid Component
function AdminStatsGrid({ touristsCount, guidesCount, bookingsCount }) {
  return (
    <div className="mt-9 grid gap-5 sm:grid-cols-3">
      <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100 flex flex-col justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#b57a2d]">
          <UsersRound className="h-6 w-6" />
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-[#76624d]">Total Tourists</p>
          <p className="mt-1 text-4xl font-extrabold text-[#3f2b1a]">{touristsCount}</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100 flex flex-col justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
          <UserRoundCheck className="h-6 w-6" />
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-[#76624d]">Total Tour Guides</p>
          <p className="mt-1 text-4xl font-extrabold text-[#3f2b1a]">{guidesCount}</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100 flex flex-col justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <ClipboardList className="h-6 w-6" />
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-[#76624d]">Total Bookings</p>
          <p className="mt-1 text-4xl font-extrabold text-[#3f2b1a]">{bookingsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminStatsGrid;
