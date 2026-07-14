import { useRef } from 'react'
import Popcartitem from './Popcartitem'
import './css-layout/Popcard.css'

function Popcard({ Attractions }) {
  const carouselRef = useRef(null)
  const scrollByValue = 280

  const handleScroll = (direction) => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({
      left: direction * scrollByValue,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative mt-12">
      <button
        type="button"
        onClick={() => handleScroll(-1)}
        className="carousel-button left-2"
        aria-label="Scroll previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 18.75 9 12l6.75-6.75" />
        </svg>
      </button>

      <div ref={carouselRef} className="carousel-list overflow-x-auto pb-4 pl-4 pr-2">
        <div className="flex gap-6 snap-x snap-mandatory">
          {Attractions.map((A) => (
            <div key={A.id ?? A.name} className="snap-center">
              <Popcartitem attraction={A} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleScroll(1)}
        className="carousel-button right-2"
        aria-label="Scroll next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 5.25 15 12l-6.75 6.75" />
        </svg>
      </button>
    </div>
  )
}

export default Popcard
