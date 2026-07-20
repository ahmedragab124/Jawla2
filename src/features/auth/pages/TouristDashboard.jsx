import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Mail, Calendar, Users, Compass, CheckCircle2, AlertCircle, MessageSquare, Phone, Pencil, Save, X, ImagePlus, Sparkles, ChevronDown, ChevronUp, Globe2 } from 'lucide-react'
import { getAITrips } from '../../ai-planner/services/aiTripsStorage'

function TouristDashboard({ user, onUserUpdated }) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [guides, setGuides] = useState([])
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user.name || '',
    email: user.email || '',
    location: user.location || '',
    bio: user.bio || '',
    avatar: user.avatar || '',
  })
  const [profileError, setProfileError] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [aiTrips] = useState(() => getAITrips(user.id))
  const [expandedTripId, setExpandedTripId] = useState(null)

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

  const handleProfileChange = (event) => {
    const { name, value } = event.target
    setProfileForm(current => ({ ...current, [name]: value }))
  }

  const handlePhotoChange = (event) => {
    const photo = event.target.files?.[0]
    if (!photo) return

    if (!photo.type.startsWith('image/') || photo.size > 2 * 1024 * 1024) {
      setProfileError('Please choose an image smaller than 2 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => setProfileForm(current => ({ ...current, avatar: reader.result }))
    reader.readAsDataURL(photo)
    setProfileError('')
  }

  const handleProfileSave = async (event) => {
    event.preventDefault()
    const name = profileForm.name.trim()
    const email = profileForm.email.trim().toLowerCase()
    const phone = profileForm.phone.trim()
    const location = profileForm.location.trim()
    const bio = profileForm.bio.trim()
    const avatar = profileForm.avatar

    if (!name || !email) {
      setProfileError('Name and email are required.')
      return
    }

    if (phone && !/^\+\d[\d\s()-]{6,}$/.test(phone)) {
      setProfileError('Use an international phone number, for example +20 10 0000 0000.')
      return
    }

    setSavingProfile(true)
    setProfileError('')
    try {
      const { data: updatedUser } = await axios.patch(`http://localhost:3000/users/${user.id}`, { name, email, phone, location, bio, avatar })
      const affectedBookings = bookings.filter(booking => booking.touristId === user.id || booking.touristEmail === user.email)

      await Promise.all(affectedBookings.map(booking => (
        axios.patch(`http://localhost:3000/bookings/${booking.id}`, { touristName: name, touristEmail: email, email, phone })
      )))

      setBookings(current => current.map(booking => (
        booking.touristId === user.id || booking.touristEmail === user.email
          ? { ...booking, touristName: name, touristEmail: email, email, phone }
          : booking
      )))
      onUserUpdated(updatedUser)
      setProfileForm({ name, email, phone, location, bio, avatar })
      setIsEditingProfile(false)
    } catch {
      setProfileError('Could not update your profile. Please make sure json-server is running and try again.')
    } finally {
      setSavingProfile(false)
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
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-[#f9ecd8] text-2xl font-black text-[#7a5540] ring-4 ring-white shadow-lg">
            {user.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : user.name?.trim().charAt(0).toUpperCase() || 'T'}
          </div>
          <div className="mt-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#b57a2d] uppercase">{user.role} Account</p>
              <h2 className="mt-2 text-3xl font-black text-[#3f2b1a]">{user.name}</h2>
            </div>
            {!isEditingProfile && (
              <button onClick={() => { setProfileForm({ name: user.name || '', email: user.email || '', phone: user.phone || '', location: user.location || '', bio: user.bio || '', avatar: user.avatar || '' }); setProfileError(''); setIsEditingProfile(true) }} className="rounded-xl border border-[#e6d8c5] p-2 text-[#b57a2d] transition hover:bg-[#fff7ea]" aria-label="Edit profile">
                <Pencil size={17} />
              </button>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#6d5c4a]">Welcome back to Jawla. Check your booked trips, guide updates, and cancellation status here.</p>

          {isEditingProfile ? (
            <form onSubmit={handleProfileSave} className="mt-6 space-y-4 border-t border-stone-100 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#f9ecd8] font-black text-[#7a5540]">
                  {profileForm.avatar ? <img src={profileForm.avatar} alt="Profile preview" className="h-full w-full object-cover" /> : profileForm.name.trim().charAt(0).toUpperCase() || 'T'}
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#e6d8c5] px-3 py-2 text-sm font-bold text-[#b57a2d] transition hover:bg-[#fff7ea]">
                  <ImagePlus size={16} /> Upload photo
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
                </label>
              </div>
              <label className="block text-sm font-semibold text-[#594735]">Full name
                <input name="name" value={profileForm.name} onChange={handleProfileChange} className="mt-1.5 w-full rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]" />
              </label>
              <label className="block text-sm font-semibold text-[#594735]">Email address
                <input name="email" type="email" value={profileForm.email} onChange={handleProfileChange} className="mt-1.5 w-full rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]" />
              </label>
              
              <label className="block text-sm font-semibold text-[#594735]">City / country
                <input name="location" value={profileForm.location} onChange={handleProfileChange} placeholder="Cairo, Egypt" className="mt-1.5 w-full rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]" />
              </label>
              <label className="block text-sm font-semibold text-[#594735]">About me
                <textarea name="bio" value={profileForm.bio} onChange={handleProfileChange} maxLength={180} rows={3} placeholder="Tell us a little about your travel style..." className="mt-1.5 w-full resize-none rounded-xl border border-[#e6d8c5] px-3 py-2.5 outline-none focus:border-[#b57a2d]" />
              </label>
              {profileError && <p className="text-xs font-medium text-red-600">{profileError}</p>}
              <div className="flex gap-2">
                <button type="submit" disabled={savingProfile} className="inline-flex items-center gap-1.5 rounded-xl bg-[#b57a2d] px-3 py-2 text-sm font-bold text-white disabled:opacity-60"><Save size={15} />{savingProfile ? 'Saving...' : 'Save changes'}</button>
                <button type="button" onClick={() => { setIsEditingProfile(false); setProfileError('') }} className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm font-bold text-stone-600"><X size={15} />Cancel</button>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-4 border-t border-stone-100 pt-6 text-sm text-[#594735]">
              <div className="flex items-center gap-3"><Mail className="text-[#b57a2d]" size={18} /><span>{user.email}</span></div>
              {user.phone && <div className="flex items-center gap-3"><Phone className="text-[#b57a2d]" size={18} /><span>{user.phone}</span></div>}
              <div className="flex items-center gap-3"><Globe2 className="text-[#b57a2d]" size={18} /><span>{user.location || 'Tourist Member'}</span></div>
              {user.bio && <p className="rounded-2xl bg-[#fffaf0] p-3 text-xs leading-5 text-[#6d5c4a]">{user.bio}</p>}
            </div>
          )}
        </section>
      </div>

      {/* Bookings Area */}
      <div className="lg:col-span-2">
        <section className="mb-8 overflow-hidden rounded-3xl bg-linear-to-br from-[#3f2b1a] to-[#80541e] p-6 text-white shadow-xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-amber-200"><Sparkles size={17} /> AI TRAVEL PLANS</p>
              <h3 className="mt-2 text-2xl font-black">Your personalized Egypt itineraries</h3>
              <p className="mt-2 text-sm text-white/75">Every plan you generate with AI is kept here for you.</p>
            </div>
            <Link to="/ai-planner" className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#80541e] transition hover:bg-amber-50">Create a plan</Link>
          </div>

          {aiTrips.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/80">You have not created an AI itinerary yet. Start planning your next adventure.</p>
          ) : (
            <div className="mt-6 space-y-3">
              {aiTrips.map(aiTrip => {
                const isExpanded = expandedTripId === aiTrip.id
                const stops = Object.values(aiTrip.trip).flat()
                return (
                  <div key={aiTrip.id} className="rounded-2xl bg-white p-4 text-[#3f2b1a]">
                    <button onClick={() => setExpandedTripId(isExpanded ? null : aiTrip.id)} className="flex w-full items-center gap-3 text-left">
                      <img src={aiTrip.destination.image || '/attractions/pyramids.png'} alt="" className="h-12 w-12 rounded-xl object-cover" />
                      <span className="min-w-0 flex-1"><span className="block truncate font-extrabold">{aiTrip.destination.name} · {aiTrip.days} days</span><span className="mt-1 block text-xs text-stone-500">{stops.length} stops · {new Date(aiTrip.createdAt).toLocaleDateString()}</span></span>
                      {isExpanded ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
                    </button>
                    {isExpanded && (
                      <div className="mt-4 grid gap-3 border-t border-stone-100 pt-4 sm:grid-cols-2">
                        {Object.entries(aiTrip.trip).map(([day, dayStops]) => (
                          <div key={day} className="rounded-xl bg-[#fffaf0] p-3"><p className="text-xs font-black uppercase tracking-wider text-[#b57a2d]">{day}</p>{dayStops.map(stop => <p key={`${day}-${stop.attractionId}`} className="mt-1.5 text-sm font-medium"><span className="mr-2 text-xs text-stone-400">{stop.time}</span>{aiTrip.attractions.find(attraction => attraction.id === stop.attractionId)?.name || 'Attraction'}</p>)}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
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

                  {/* ✅ Guide Contact Info - shown only when Approved */}
                  {booking.status === 'Approved' && guide && (guide.phone || guide.email) && (
                    <div className="rounded-2xl border border-[#B8860B]/25 bg-[#fffaf0] p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-3">📞 Contact Your Guide</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {guide.phone && (
                          <a
                            href={`tel:${guide.phone}`}
                            className="flex items-center gap-2 rounded-xl bg-white border border-stone-200 px-4 py-2.5 text-sm font-semibold text-[#3f2b1a] shadow-sm transition hover:border-[#B8860B] hover:bg-[#B8860B]/5"
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
                            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            WhatsApp
                          </a>
                        )}
                        {guide.email && (
                          <a
                            href={`mailto:${guide.email}`}
                            className="flex items-center gap-2 rounded-xl bg-white border border-stone-200 px-4 py-2.5 text-sm font-semibold text-[#3f2b1a] shadow-sm transition hover:border-[#B8860B] hover:bg-[#B8860B]/5 sm:col-span-2"
                          >
                            <Mail size={15} className="text-[#B8860B] shrink-0" />
                            {guide.email}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stepper Status tracker */}
                  {renderStepper(booking.status)}

            
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
