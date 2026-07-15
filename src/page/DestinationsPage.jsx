import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function DestinationsPage() {
  const [destinations, setDestinations] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/destinations')
      .then((response) => setDestinations(response.data))
      .catch(() => setError('Could not load destinations. Start the API server and try again.'))
  }, [])

  return (
    <main className="min-h-screen bg-[#fffaf0] px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-bold tracking-[0.3em] text-[#b57a2d]">EXPLORE EGYPT</p>
        <h1 className="mt-4 text-4xl font-extrabold text-[#3f2b1a] md:text-6xl">Choose Your Destination</h1>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#5b4423]">Discover Egypt's most unforgettable cities, then build your experience with a local guide.</p>
      </div>

      {error ? (
        <p className="mt-14 text-center text-lg text-red-700">{error}</p>
      ) : destinations.length === 0 ? (
        <p className="mt-14 text-center text-lg text-[#7a5540]">Loading destinations…</p>
      ) : (
        <section className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
          {destinations.map((destination) => (
            <article key={destination.id} className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(76,48,24,0.14)] transition hover:-translate-y-2">
              <img src={destination.image} alt={destination.name} className="h-64 w-full object-cover" />
              <div className="p-7 text-left">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-3xl font-bold text-[#3f2b1a]">{destination.name}</h2>
                  <span className="rounded-full bg-[#fff3df] px-3 py-1 text-sm font-semibold text-[#a9681b]">★ {destination.star}</span>
                </div>
                <p className="mt-4 min-h-24 leading-7 text-[#655340]">{destination.description}</p>
                <Link to={`/destination/${destination.id}`} className="mt-6 inline-flex rounded-full bg-[#7a5540] px-5 py-3 font-semibold text-white transition hover:bg-[#5c4033]">
                  Explore {destination.name}
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default DestinationsPage
