import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Mail, MapPin, Calendar, Users, Compass, Trash2, CheckCircle2, AlertCircle, Clock, MessageSquare } from 'lucide-react'

function TouristDashboard({ user }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [guides, setGuides] = useState([])

  useEffect(() => {
    // Fetch bookings and guides in parallel
    Promise.all([
      axios.get(`http://localhost:3000/bookings?touristEmail=${user.email}`),
      axios.get('http://localhost:3000/tourGuides')
    ])
      .then(([bookingsRes, guidesRes]) => {
        setBookings(bookingsRes.data)
        setGuides(guidesRes.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load tourist data:', err)
        setLoading(false)
      })
  }, [user.email])

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking request?')) {
      axios.delete(`http://localhost:3000/bookings/${bookingId}`)
        .then(() => {
          setBookings(prev => prev.filter(b => b.id !== bookingId))
        })
        .catch(err => {
          console.error('Failed to cancel booking:', err)
          alert('Failed to cancel the booking.')
        })
    }
  }

  // Find guide name by ID
  const getGuideDetails = (guideId) => {
    if (!guideId) return null
    return guides.find(g => g.id === guideId)
  }

  // Helper to render stepper status
  const renderStepper = (status) => {
    const steps = [
      { key: 'Pending', label: 'Request Sent', desc: 'Awaiting guide confirmation' },
      { key: 'Approved', label: 'Confirmed', desc: 'Guide accepted your trip' },
      { key: 'Rejected', label: 'Declined/Cancelled', desc: 'Trip cannot proceed' }
    ]

    let activeIndex = 0
    if (status === 'Approved') activeIndex = 1
    if (status === 'Rejected') activeIndex = 2

    return (
      <div className="mt-4 border-t border-stone-100 pt-4">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Booking Status Progress</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
          {steps.map((step, idx) => {
            const isCompleted = idx <= activeIndex && status !== 'Rejected'
            const isRejectedStep = status === 'Rejected' && step.key === 'Rejected'
            const isCurrent = idx === activeIndex

            return (
              <div key={step.key} className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center sm:flex-1">
                {/* Circle step badge */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isRejectedStep 
                    ? 'border-red-600 bg-red-50 text-red-600'
                    : isCompleted
                    ? 'border-[#B8860B] bg-[#B8860B] text-white'
                    : isCurrent
                    ? 'border-[#B8860B] bg-[#fffaf0] text-[#B8860B] animate-pulse'
                    : 'border-stone-200 bg-white text-stone-400'
                }`}>
                  {isRejectedStep ? (
                    <AlertCircle size={16} />
                  ) : isCompleted && idx < activeIndex ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <span className="text-xs font-bold">{idx + 1}</span>
                  )}
                </div>

                {/* Step labels */}
                <div className="sm:mt-2">
                  <p className={`text-sm font-bold ${
                    isRejectedStep 
                      ? 'text-red-700' 
                      : isCompleted || isCurrent
                      ? 'text-[#3f2b1a]'
                      : 'text-stone-400'
                  }`}>{step.label}</p>
                  <p className="text-xs text-stone-500 hidden sm:block mt-0.5">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Profile Sidebar */}
      <div className="lg:col-span-1">
        <section className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 sticky top-24">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f9ecd8] text-[#7a5540]"><Compass size={32} /></div>
          <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">{user.role} Account</p>
          <h2 className="mt-2 text-3xl font-black text-[#3f2b1a]">{user.name}</h2>
          <p className="mt-3 text-sm text-[#6d5c4a] leading-relaxed">Welcome back to Jawla. Check your booked trips, guide updates, and cancellation status here.</p>

          <div className="mt-6 space-y-4 border-t border-stone-100 pt-6 text-sm text-[#594735]">
            <div className="flex items-center gap-3"><Mail className="text-[#b57a2d]" size={18} /><span>{user.email}</span></div>
            <div className="flex items-center gap-3"><MapPin className="text-[#b57a2d]" size={18} /><span>Tourist Member</span></div>
          </div>
        </section>
      </div>

      {/* Bookings Area */}
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-extrabold text-[#3f2b1a] mb-6">My Bookings ({bookings.length})</h3>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#B8860B] border-t-transparent"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50">
            <p className="text-lg font-semibold text-stone-400">No bookings requested yet.</p>
            <Link to="/booking" className="mt-4 inline-flex rounded-xl bg-[#B8860B] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#8B5E3C]">
              Book a Guide Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const guide = getGuideDetails(booking.guideId)
              return (
                <div 
                  key={booking.id}
                  className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 flex flex-col gap-4 transition duration-300 hover:shadow-[0_20px_50px_rgba(76,48,24,0.12)]"
                >
                  <div className="flex justify-between items-start border-b pb-3 border-stone-100">
                    <div>
                      <span className="rounded-full bg-[#B8860B]/10 px-3 py-1 text-xs font-bold text-[#B8860B]">
                        {booking.tourType}
                      </span>
                      <h4 className="mt-2 text-xl font-bold text-[#3f2b1a]">Trip to {booking.tourType} Details</h4>
                    </div>

                    {/* Booking state badge */}
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      booking.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Booking details grid */}
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

                  {/* Special requests block */}
                  {booking.requests && (
                    <div className="bg-stone-50/70 p-3 rounded-2xl text-xs text-[#594735] border border-stone-100">
                      <span className="font-bold text-[#3f2b1a] block mb-1">Special Requests:</span>
                      <p className="italic text-stone-600">"{booking.requests}"</p>
                    </div>
                  )}

                  {/* Guide note / Message */}
                  {booking.guideNote && (
                    <div className="bg-green-50/70 p-4 rounded-2xl text-xs text-green-900 border border-green-100/50 flex gap-3 items-start">
                      <MessageSquare className="text-green-600 shrink-0 mt-0.5" size={18} />
                      <div>
                        <span className="font-bold text-green-800 block mb-1">Message from Guide:</span>
                        <p className="italic text-green-900/90 font-medium">"{booking.guideNote}"</p>
                      </div>
                    </div>
                  )}

                  {/* Stepper Status tracker */}
                  {renderStepper(booking.status)}

                  {/* Cancel Action */}
                  {booking.status === 'Pending' && (
                    <div className="mt-2 pt-4 border-t border-stone-100 flex justify-end">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition"
                      >
                        <Trash2 size={14} />
                        Cancel Booking Request
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TouristDashboard
