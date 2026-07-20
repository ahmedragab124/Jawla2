import { useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowLeft, Clock, MapPin, Star, Tag } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const API_URL = 'http://localhost:3000'

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} minutes`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours} ${hours === 1 ? 'hour' : 'hours'}${remainingMinutes ? ` ${remainingMinutes} min` : ''}`
}

function AttractionDetailsPage() {
  const { id } = useParams()
  const [attraction, setAttraction] = useState(null)
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadAttraction() {
      try {
        const { data } = await axios.get(`${API_URL}/attractions/${id}`)
        setAttraction(data)

        if (data.destinationId) {
          const destinationResponse = await axios.get(`${API_URL}/destinations/${data.destinationId}`)
          setDestination(destinationResponse.data)
        }
      } catch {
        setError('This attraction could not be found.')
      } finally {
        setLoading(false)
      }
    }

    loadAttraction()
  }, [id])

  if (loading) {
    return <main className="min-h-screen bg-[#fffaf0] px-5 py-24 text-center text-[#5b4423]">Loading attraction...</main>
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#fffaf0] px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#3f2b1a]">{error}</h1>
        <Link to="/attractions" className="mt-5 inline-block font-semibold text-[#b57a2d] hover:underline">Back to attractions</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-10 md:py-16">
      <article className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-xl">
        <div className="grid lg:grid-cols-2">
          <div className="min-h-80 bg-[#ead8bd]">
            <img
              src={attraction.image || '/attractions/pyramids.png'}
              alt={attraction.name}
              className="h-full min-h-80 w-full object-cover"
              onError={event => { event.currentTarget.src = '/attractions/pyramids.png' }}
            />
          </div>

          <div className="p-7 md:p-10">
            <Link to="/attractions" className="inline-flex items-center gap-2 text-sm font-semibold text-[#a9681b] hover:underline">
              <ArrowLeft size={17} /> Back to attractions
            </Link>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fff2d9] px-3 py-1.5 text-sm font-bold text-[#a9681b]">
                <Tag size={15} /> {attraction.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fff2d9] px-3 py-1.5 text-sm font-bold text-[#a9681b]">
                <Star size={15} fill="currentColor" /> {attraction.star}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[#3f2b1a] md:text-5xl">{attraction.name}</h1>
            <p className="mt-5 text-base leading-8 text-[#685743]">{attraction.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#fffaf0] p-4 text-[#5b4423]">
                <Clock className="mb-2 text-[#b57a2d]" size={21} />
                <p className="text-xs font-bold uppercase tracking-wide text-[#a57e55]">Suggested duration</p>
                <p className="mt-1 font-bold">{formatDuration(attraction.duration)}</p>
              </div>
              <div className="rounded-2xl bg-[#fffaf0] p-4 text-[#5b4423]">
                <MapPin className="mb-2 text-[#b57a2d]" size={21} />
                <p className="text-xs font-bold uppercase tracking-wide text-[#a57e55]">Best time to visit</p>
                <p className="mt-1 font-bold">{attraction.bestTime}</p>
              </div>
            </div>

            {destination && (
              <Link to={`/destination/${destination.id}`} className="mt-7 inline-flex rounded-full bg-[#b57a2d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f5d1e]">
                Explore {destination.name}
              </Link>
            )}
          </div>
        </div>
      </article>
    </main>
  )
}

export default AttractionDetailsPage
