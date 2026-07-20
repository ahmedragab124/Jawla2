import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'
import '../styles/DestinationsPage.css'

function DestinationsPage() {
  const [destinations, setDestinations] = useState([])
  const [error, setError] = useState('')
  const carouselRef = useRef(null)
  const scrollAmount = 340

  useEffect(() => {
    axios.get('http://localhost:3000/destinations')
      .then((response) => setDestinations(response.data))
      .catch(() => setError('Could not load destinations. Start the API server and try again.'))
  }, [])

  const handleScroll = (direction) => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-6 py-20">
      <div className="dest-page-container">
        
        {/* Header section with navigation buttons above the carousel */}
        <div className="dest-header-flex">
          <div>
            <p className="text-sm font-bold tracking-[0.3em] text-[#b57a2d] uppercase">JAWLA</p>
            <h1 className="mt-2 text-4xl font-extrabold text-[#3f2b1a] md:text-5xl">Choose Your Destination</h1>
            <p className="mt-3 max-w-xl text-[#5b4423] text-sm md:text-base">
              Discover Egypt's most unforgettable cities, then build your experience with a local guide.
            </p>
          </div>

          {/* Navigation buttons above carousel */}
          {destinations.length > 0 && (
            <div className="dest-nav-buttons">
              <button 
                onClick={() => handleScroll(-1)} 
                className="dest-nav-btn"
                aria-label="Previous Destination"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => handleScroll(1)} 
                className="dest-nav-btn"
                aria-label="Next Destination"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-14 text-center text-lg text-red-700">{error}</p>
        ) : destinations.length === 0 ? (
          <p className="mt-14 text-center text-lg text-[#7a5540]">Loading destinations…</p>
        ) : (
          <div className="dest-carousel-wrapper">
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Hide Webkit Scrollbar */}
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {destinations.map((destination) => (
                <div key={destination.id} className="snap-center shrink-0 w-[290px] sm:w-[340px]">
                  <article className="dest-page-card h-[480px]">
                    <div className="dest-page-img-wrapper h-56">
                      <img src={destination.image} alt={destination.name} className="dest-page-img w-full h-full object-cover" />
                      <span className="dest-page-rating">★ {destination.star}</span>
                    </div>
                    <div className="dest-page-body p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h2 className="dest-page-title text-2xl font-bold">{destination.name}</h2>
                        <p className="dest-page-desc mt-3 text-sm text-[#655340] line-clamp-3">{destination.description}</p>
                      </div>
                      <Link 
                        to={`/destination/${destination.id}`} 
                        className="dest-page-link mt-4 inline-flex items-center justify-center rounded-full bg-[#7a5540] px-5 py-2.5 font-semibold text-white transition hover:bg-[#5c4033] w-max self-start"
                      >
                        Explore {destination.name}
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default DestinationsPage
