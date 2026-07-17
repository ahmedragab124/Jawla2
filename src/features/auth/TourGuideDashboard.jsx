import { useState, useEffect } from 'react'
import axios from 'axios'
import { Mail, MapPin, Calendar, Users, Compass, CheckCircle2, XCircle, Clock, Check, X, FileText } from 'lucide-react'

function TourGuideDashboard({ user }) {
  const [guide, setGuide] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Note writing state
  const [acceptingBookingId, setAcceptingBookingId] = useState(null)
  const [guideNote, setGuideNote] = useState('')

  useEffect(() => {
    // 1. Fetch guide details
    axios.get(`http://localhost:3000/tourGuides?email=${user.email}`)
      .then(res => {
        if (res.data.length > 0) {
          const guideData = res.data[0]
          setGuide(guideData)

          // 2. Fetch bookings assigned to this guide
          return axios.get(`http://localhost:3000/bookings?guideId=${guideData.id}`)
        } else {
          throw new Error('Guide record not found in system.')
        }
      })
      .then(bookingsRes => {
        setBookings(bookingsRes.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load guide dashboard:', err)
        setLoading(false)
      })
  }, [user.email])

  const handleDecline = (bookingId) => {
    if (window.confirm('Are you sure you want to decline this booking request?')) {
      axios.patch(`http://localhost:3000/bookings/${bookingId}`, { status: 'Rejected' })
        .then(() => {
          setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Rejected' } : b))
        })
        .catch(err => {
          console.error('Failed to decline booking:', err)
          alert('Something went wrong.')
        })
    }
  }

  const handleAcceptSubmit = (e, bookingId) => {
    e.preventDefault()

    axios.patch(`http://localhost:3000/bookings/${bookingId}`, {
      status: 'Approved',
      guideNote: guideNote.trim() || undefined
    })
      .then(() => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Approved', guideNote: guideNote } : b))
        setAcceptingBookingId(null)
        setGuideNote('')
      })
      .catch(err => {
        console.error('Failed to accept booking:', err)
        alert('Something went wrong.')
      })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 min-h-screen bg-[#fffaf0]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#B8860B] border-t-transparent"></div>
      </div>
    )
  }

  // Render pending approval screen
  if (guide && guide.status === 'Pending approval') {
    return (
      <main className="min-h-screen bg-[#fffaf0] px-5 py-16 flex items-center justify-center">
        <section className="mx-auto max-w-xl rounded-4xl bg-white p-8 shadow-[0_24px_80px_rgba(76,48,24,0.1)] border border-stone-100 text-center flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 animate-pulse">
            <Clock size={32} />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[#3f2b1a]">Application Under Review</h2>
          <p className="mt-3 text-stone-600 leading-relaxed max-w-sm">
            Hi <strong>{guide.name}</strong>, your Tour Guide registration is currently under review by our admin team.
          </p>

          <div className="mt-8 w-full max-w-xs bg-stone-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full animate-progress" style={{ width: '60%' }}></div>
          </div>
          <span className="mt-2 text-xs font-semibold text-stone-400 uppercase">Verification Progress (60%)</span>

          <p className="mt-8 text-xs text-stone-400">You will be notified via email ({guide.email}) as soon as your account is approved and verified.</p>
        </section>
      </main>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Profile Sidebar */}
      <div className="lg:col-span-1">
        <section className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 sticky top-24">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6eedc] text-[#4d5c3d]"><Compass size={32} /></div>
          <p className="mt-5 text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">{user.role} Dashboard</p>
          <h2 className="mt-2 text-3xl font-black text-[#3f2b1a]">{user.name}</h2>
          
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
            <CheckCircle2 size={12} />
            Approved Guide
          </div>

          <p className="mt-4 text-sm text-[#6d5c4a] leading-relaxed">Accept bookings, decline conflict dates, and leave helpful greeting messages for tourists.</p>

          <div className="mt-6 space-y-4 border-t border-stone-100 pt-6 text-sm text-[#594735]">
            <div className="flex items-center gap-3"><Mail className="text-[#b57a2d]" size={18} /><span>{user.email}</span></div>
            <div className="flex items-center gap-3"><MapPin className="text-[#b57a2d]" size={18} /><span>Certified Egyptologist</span></div>
          </div>
        </section>
      </div>

      {/* Bookings Area */}
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-extrabold text-[#3f2b1a] mb-6">Assigned Bookings ({bookings.length})</h3>

        {bookings.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50">
            <p className="text-lg font-semibold text-stone-400">No trips assigned to you yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                className="rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(76,48,24,0.08)] border border-stone-100/50 flex flex-col gap-4 transition duration-300 hover:shadow-[0_20px_50px_rgba(76,48,24,0.12)]"
              >
                <div className="flex justify-between items-start border-b pb-3 border-stone-100">
                  <div>
                    <span className="rounded-full bg-[#B8860B]/10 px-3 py-1 text-xs font-bold text-[#B8860B]">
                      {booking.tourType}
                    </span>
                    <h4 className="mt-2 text-xl font-bold text-[#3f2b1a]">{booking.touristName}</h4>
                    <p className="text-xs text-stone-400">{booking.touristEmail}</p>
                  </div>

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
                  <div className="flex items-center gap-2">
                    <Mail className="text-stone-400 shrink-0" size={16} />
                    <div>
                      <span className="block text-[10px] text-stone-400 uppercase font-semibold">Contact Phone</span>
                      <span className="font-semibold text-stone-700">{booking.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Special requests block */}
                {booking.requests && (
                  <div className="bg-stone-50/70 p-3 rounded-2xl text-xs text-[#594735] border border-stone-100">
                    <span className="font-bold text-[#3f2b1a] block mb-1">Tourist Special Requests:</span>
                    <p className="italic text-stone-600">"{booking.requests}"</p>
                  </div>
                )}

                {/* Guide note display if already accepted */}
                {booking.guideNote && (
                  <div className="bg-green-50/70 p-3 rounded-2xl text-xs text-green-900 border border-green-100/50">
                    <span className="font-bold text-green-800 block mb-1">Your message to tourist:</span>
                    <p className="italic text-green-900/90 font-medium">"{booking.guideNote}"</p>
                  </div>
                )}

                {/* Action buttons if Pending */}
                {booking.status === 'Pending' && acceptingBookingId !== booking.id && (
                  <div className="mt-2 pt-4 border-t border-stone-100 flex gap-3 justify-end">
                    <button
                      onClick={() => handleDecline(booking.id)}
                      className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition border border-red-200"
                    >
                      <X size={14} />
                      Decline Request
                    </button>
                    <button
                      onClick={() => setAcceptingBookingId(booking.id)}
                      className="flex items-center gap-1 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#B8860B] hover:bg-[#8B5E3C] transition shadow-md"
                    >
                      <Check size={14} />
                      Accept Request
                    </button>
                  </div>
                )}

                {/* Accept note form if selected */}
                {acceptingBookingId === booking.id && (
                  <form 
                    onSubmit={(e) => handleAcceptSubmit(e, booking.id)}
                    className="mt-2 pt-4 border-t border-stone-100 bg-[#fffaf0]/50 p-4 rounded-2xl border border-amber-100 animate-fadeIn flex flex-col gap-3"
                  >
                    <label className="text-xs font-bold text-[#3f2b1a] flex items-center gap-1.5">
                      <FileText size={14} />
                      Welcome message for tourist (Optional):
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
                        onClick={() => {
                          setAcceptingBookingId(null)
                          setGuideNote('')
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-500 hover:bg-stone-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-green-600 hover:bg-green-700"
                      >
                        Confirm & Accept
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TourGuideDashboard
