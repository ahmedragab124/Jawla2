import { useEffect, useState } from 'react'
import axios from 'axios'
import { UsersRound, UserRoundCheck, ClipboardList, Check, X, Trash2, Calendar, MapPin, Compass } from 'lucide-react'

function AdminDashboard() {
  const [tourists, setTourists] = useState([])
  const [tourGuides, setTourGuides] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3000/users'),
      axios.get('http://localhost:3000/tourGuides'),
      axios.get('http://localhost:3000/bookings'),
    ])
      .then(([usersRes, guidesRes, bookingsRes]) => {
        setTourists(usersRes.data.filter(user => user.role === 'Tourist'))
        setTourGuides(guidesRes.data)
        setBookings(bookingsRes.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load dashboard data:', error)
        setLoading(false)
      })
  }, [])

  const handleApproveGuide = (guideId) => {
    axios.patch(`http://localhost:3000/tourGuides/${guideId}`, { status: 'Approved' })
      .then(() => {
        setTourGuides(prev => prev.map(g => g.id === guideId ? { ...g, status: 'Approved' } : g))
      })
      .catch(err => console.error('Failed to approve guide:', err))
  }

  const handleRejectGuide = (guideId) => {
    if (window.confirm('Are you sure you want to reject this guide application?')) {
      axios.patch(`http://localhost:3000/tourGuides/${guideId}`, { status: 'Rejected' })
        .then(() => {
          setTourGuides(prev => prev.map(g => g.id === guideId ? { ...g, status: 'Rejected' } : g))
        })
        .catch(err => console.error('Failed to reject guide:', err))
    }
  }

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking request from the system?')) {
      axios.delete(`http://localhost:3000/bookings/${bookingId}`)
        .then(() => {
          setBookings(prev => prev.filter(b => b.id !== bookingId))
        })
        .catch(err => console.error('Failed to delete booking:', err))
    }
  }

  const getGuideName = (guideId) => {
    if (!guideId) return 'General Request'
    const guide = tourGuides.find(g => g.id === guideId)
    return guide ? guide.name : 'Unknown Guide'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen bg-[#fffaf0]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#B8860B] border-t-transparent"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold tracking-[0.25em] text-[#b57a2d] uppercase">System Controller</p>
        <h1 className="mt-3 text-4xl font-black text-[#3f2b1a]">Admin Dashboard</h1>
        <p className="mt-2 text-[#695744]">Manage tourists, verify tour guide applications, and oversee booking requests.</p>

        {/* Stats Grid */}
        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100 flex flex-col justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#b57a2d]">
              <UsersRound className="h-6 w-6" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#76624d]">Total Tourists</p>
              <p className="mt-1 text-4xl font-extrabold text-[#3f2b1a]">{tourists.length}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100 flex flex-col justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
              <UserRoundCheck className="h-6 w-6" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#76624d]">Total Tour Guides</p>
              <p className="mt-1 text-4xl font-extrabold text-[#3f2b1a]">{tourGuides.length}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100 flex flex-col justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#76624d]">Total Bookings</p>
              <p className="mt-1 text-4xl font-extrabold text-[#3f2b1a]">{bookings.length}</p>
            </div>
          </div>
        </div>

        {/* Tour Guide Approval section */}
        <section className="mt-10 overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
          <div className="border-b border-stone-100 p-6">
            <h2 className="text-2xl font-bold text-[#3f2b1a]">Tour Guide Registrations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm">
              <thead className="bg-[#f9f3e9] text-[#725a40]">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tourGuides.map((guide) => (
                  <tr key={guide.id} className="border-t border-stone-100 hover:bg-stone-50/50">
                    <td className="p-4 font-bold text-[#3f2b1a]">{guide.name}</td>
                    <td className="p-4 text-[#695744]">{guide.email}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        guide.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : guide.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {guide.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {guide.status === 'Pending approval' && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleRejectGuide(guide.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition"
                            title="Reject Application"
                          >
                            <X size={16} />
                          </button>
                          <button
                            onClick={() => handleApproveGuide(guide.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-md"
                            title="Approve Application"
                          >
                            <Check size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Manage Bookings section */}
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
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        booking.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition"
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

        {/* Registered Tourists section */}
        <section className="mt-10 overflow-hidden rounded-3xl bg-white shadow-[0_15px_40px_rgba(76,48,24,0.06)] border border-stone-100">
          <div className="border-b border-stone-100 p-6">
            <h2 className="text-2xl font-bold text-[#3f2b1a]">Registered Tourists</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-180 text-left text-sm">
              <thead className="bg-[#f9f3e9] text-[#725a40]">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {tourists.map((tourist) => (
                  <tr key={tourist.id} className="border-t border-stone-100 hover:bg-stone-50/50">
                    <td className="p-4 font-bold text-[#3f2b1a]">{tourist.name}</td>
                    <td className="p-4 text-[#695744]">{tourist.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AdminDashboard
