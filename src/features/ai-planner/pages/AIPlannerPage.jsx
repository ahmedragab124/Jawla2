import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AIPlannerForm from '../components/AIPlannerForm'
import LoadingState from '../components/LoadingState'
import Timeline from '../components/Timeline'
import TripSummary from '../components/TripSummary'
import { generateTrip } from '../services/gemini'
import { saveAITrip } from '../services/aiTripsStorage'
import { useAuth } from '../../auth/context/AuthContext'
import '../styles/AIPlanner.css'

function AIPlannerPage() {
  const { user } = useAuth()
  const [destinations, setDestinations] = useState([])
  const [destinationId, setDestinationId] = useState('')
  const [days, setDays] = useState(3)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [trip, setTrip] = useState(null)
  const [destination, setDestination] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3000/destinations`)
      .then(({ data }) => setDestinations(data))
      .catch(() => setError('Could not load destinations. Make sure json-server is running on port 3000.'))
  }, [])

  function toggleInterest(interest) {
    setSelectedInterests(current => (
      current.includes(interest) ? current.filter(item => item !== interest) : [...current, interest]
    ))
  }

  async function handleGenerate(event) {
    event.preventDefault()
    if (!destinationId) {
      setError('Please select a destination.')
      return
    }

    setLoading(true)
    setError('')
    setTrip(null)

    try {
      const [destinationResponse, attractionsResponse] = await Promise.all([
        axios.get(`http://localhost:3000/destinations/${destinationId}`),
        axios.get(`http://localhost:3000/attractions`, { params: { destinationId } }),
      ])
      const attractions = attractionsResponse.data

      if (!attractions.length) throw new Error(`No attractions found for ${destinationResponse.data.name}.`)

      const generatedTrip = await generateTrip({
        destinationName: destinationResponse.data.name,
        days,
        interests: selectedInterests,
        attractions,
      })

      setDestination({ ...destinationResponse.data, attractions })
      setTrip(generatedTrip)
      saveAITrip({
        user,
        destination: destinationResponse.data,
        days,
        interests: selectedInterests,
        trip: generatedTrip,
        attractions,
      })
    } catch (requestError) {
      const status = requestError.response?.status
      const apiMessage = requestError.response?.data?.error?.message

      if (status === 401 || status === 403) setError('Invalid Gemini API key. Please check VITE_GEMINI_API_KEY.')
      else if (status === 429) setError('Gemini quota or rate limit was reached. Wait a minute and try again, or check your project billing and quota in Google AI Studio.')
      else if (status) setError(`API Error ${status}: ${apiMessage || 'Please try again.'}`)
      else if (requestError instanceof SyntaxError) setError('AI returned invalid JSON. Please try again.')
      else setError(requestError.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function findAttraction(id) {
    return destination?.attractions?.find(attraction => attraction.id === id) ?? null
  }

  return (
    <main className="min-h-screen bg-[#fffaf0]">
      <section className="ai-hero">
        <nav className="flex items-center justify-center gap-1 text-sm mb-5 text-white/60">
          <Link to="/" className="hover:text-white transition">Home</Link><span>/</span><span className="text-white/90">AI Planner</span>
        </nav>
        <h1 className="ai-hero-title">Your Personal Egypt Itinerary</h1>
        <p className="ai-hero-subtitle">Choose your destination and interests — AI builds your daily schedule.</p>
      </section>

      <div className="ai-section">
        <AIPlannerForm
          destinations={destinations} destinationId={destinationId} days={days} selectedInterests={selectedInterests}
          error={error} loading={loading}
          onDestinationChange={value => { setDestinationId(value); setError('') }}
          onDaysChange={setDays} onToggleInterest={toggleInterest} onSubmit={handleGenerate}
        />
        {loading && <LoadingState />}
        {!loading && !error && !trip && (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold text-[#3f2b1a] mb-2">Your journey starts here</h2>
            <p className="text-[#5b4423] text-sm max-w-sm mx-auto">Choose a destination, pick your interests, and let AI build your itinerary.</p>
          </div>
        )}
        {!loading && !error && trip && destination && (
          <div className="mt-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-[#3f2b1a]">{days}-Day Itinerary — {destination.name}</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#b57a2d]" />
              <button onClick={() => window.print()} className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-[#b57a2d] text-[#b57a2d] font-semibold text-sm hover:bg-[#b57a2d] hover:text-white transition no-print">Print / Save as PDF</button>
            </div>
            <Timeline trip={trip} findAttraction={findAttraction} />
            <TripSummary destination={destination} days={days} trip={trip} selectedInterests={selectedInterests} onPlanAnotherTrip={() => { setTrip(null); setDestination(null) }} />
          </div>
        )}
      </div>
    </main>
  )
}

export default AIPlannerPage
