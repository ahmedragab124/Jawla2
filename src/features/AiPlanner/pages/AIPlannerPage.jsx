import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AIPlannerForm from '../components/AIPlannerForm'
import LoadingState from '../components/LoadingState'
import Timeline from '../components/Timeline'
import TripSummary from '../components/TripSummary'
import '../../../layout/css-layout/AiPlanner.css'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${API_KEY}`

function AIPlannerPage() {
  const [destinations, setDestinations] = React.useState([])
  const [destinationId, setDestinationId] = React.useState('')
  const [days, setDays] = React.useState(3)
  const [selectedInterests, setSelectedInterests] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [trip, setTrip] = React.useState(null)
  const [destination, setDestination] = React.useState(null)

  React.useEffect(() => {
    axios.get('http://localhost:3000/destinations')
      .then(response => setDestinations(response.data))
      .catch(() => setError('Could not load destinations. Make sure json-server is running on port 3000.'))
  }, [])

  function toggleInterest(interest) {
    setSelectedInterests(current =>
      current.includes(interest) ? current.filter(item => item !== interest) : [...current, interest]
    )
  }

  async function handleGenerate(event) {
    event.preventDefault()
    if (!destinationId) { setError('Please select a destination.'); return }
    if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
      setError('Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.')
      return
    }

    setLoading(true)
    setError('')
    setTrip(null)

    try {
      const [destRes, attRes] = await Promise.all([
        axios.get(`http://localhost:3000/destinations/${destinationId}`),
        axios.get('http://localhost:3000/attractions', { params: { destinationId } })
      ])
      const dest = destRes.data
      const attractions = attRes.data
      if (!attractions || attractions.length === 0) throw new Error(`No attractions found for ${dest.name}.`)

      setDestination({ ...dest, attractions })
      const list = attractions.map((attraction, index) =>
        `${index + 1}. ID:"${attraction.id}" | Name:"${attraction.name}" | Category:${attraction.category} | Duration:${attraction.duration}min | BestTime:${attraction.bestTime}`
      ).join('\n')
      const interests = selectedInterests.length > 0 ? selectedInterests.join(', ') : 'General sightseeing'
      const prompt = `You are a travel planner for Egypt. Create a ${days}-day itinerary for ${dest.name}.
Traveler interests: ${interests}

Available attractions â€” use ONLY these exact IDs:
${list}

Rules:
- 2 to 3 attractions per day maximum
- No attraction repeated across days
- Schedule each attraction at the time matching its BestTime (Morning=09:00, Afternoon=13:00, Evening=18:00)

Return ONLY a JSON object in this exact format, nothing else:
{"day1":[{"time":"09:00","attractionId":"exact-id-here"},{"time":"13:00","attractionId":"exact-id-here"}],"day2":[...]}`

      const response = await axios.post(GEMINI_URL, {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1000 }
      })
      const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (!raw) throw new Error('Empty response from AI. Please try again.')

      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim()
      setTrip(JSON.parse(cleaned))
    } catch (err) {
      if (err.response) {
        const status = err.response.status
        const message = err.response.data?.error?.message || ''
        if (status === 400) setError(`API Error 400: ${message || 'Bad request. Check your API key format.'}`)
        else if (status === 401 || status === 403) setError('Invalid API key. Please get a valid key from aistudio.google.com/app/apikey')
        else if (status === 429) setError('API quota exceeded. Please wait a moment and try again.')
        else setError(`API Error ${status}: ${message}`)
      } else if (err instanceof SyntaxError) setError('AI returned invalid JSON. Please try again.')
      else setError(err.message || 'Something went wrong. Please try again.')
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
        <p className="ai-hero-subtitle">Choose your destination and interests â€” AI builds your daily schedule.</p>
      </section>

      <div className="ai-section">
        <AIPlannerForm
          destinations={destinations} destinationId={destinationId} days={days} selectedInterests={selectedInterests}
          error={error} loading={loading} onDestinationChange={value => { setDestinationId(value); setError('') }}
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
              <h2 className="text-2xl font-extrabold text-[#3f2b1a]">{days}-Day Itinerary â€” {destination.name}</h2>
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
