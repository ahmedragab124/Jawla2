import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useRevealOnScroll from '../../../hooks/useRevealOnScroll'
import '../styles/FeatureSection.css'

function FeatureSection() {
  const revealRef = useRevealOnScroll()
  const [destinations, setDestinations] = useState([])
  const carouselRef = useRef(null)
  const currentIndexRef = useRef(0)
  const scrollAmount = 340

  useEffect(() => {
    axios.get('http://localhost:3000/destinations')
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error('Failed to load destinations:', err))
  }, [])

  // Auto scroll effect
  useEffect(() => {
    if (destinations.length === 0) return

    const interval = setInterval(() => {
      const carousel = carouselRef.current
      if (!carousel) return

      currentIndexRef.current = (currentIndexRef.current + 1) % destinations.length
      
      // If we wrap around to start, scroll all the way left
      if (currentIndexRef.current === 0) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [destinations])

  return (
    <section ref={revealRef} className="reveal fesecte-section bg-linear-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3f2b1a]">Our Features</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
        <p className="mt-6 text-base md:text-lg leading-8 text-[#5b4423] max-w-2xl mx-auto">
          Discover what makes our travel service special with heritage-focused routes and expert guides, delivered with authentic local insight.
        </p>
      </div>

      {/* Modern Horizontal Scroll List */}
      <div className="relative mt-12 px-4 max-w-6xl mx-auto">
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

          {destinations.map((D) => (
            <div 
              key={D.id} 
              className="snap-center shrink-0 w-[290px] sm:w-[320px] feature-card relative overflow-hidden rounded-3xl shadow-sm h-105 transition-all duration-500 ease-out hover:translate-y-3 hover:shadow-[0_15px_30px_rgba(63,43,26,0.12)]"
            >
              <img src={D.image} alt={D.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 transition-colors duration-500 hover:bg-black/50" />
              <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-[#a9681b] px-3 py-1 rounded-full text-sm font-bold shadow-md z-20">
                ★ {D.star}
              </span>
              <div className="relative z-10 h-full p-6 flex flex-col justify-end text-white text-left">
                <h1 className="text-2xl font-bold drop-shadow-lg">{D.name}</h1>
                <p className="mt-3 text-sm leading-6 drop-shadow-sm line-clamp-3">{D.description}</p>
                <Link 
                  to={`/destination/${D.id}`} 
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#b57a2d] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#9a581b] w-max self-start"
                >
                  Explore City
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
