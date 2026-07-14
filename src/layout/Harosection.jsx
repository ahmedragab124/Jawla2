import './css-layout/Harosection.css';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

function Harosection() {
  const revealRef = useRevealOnScroll()
  return (
    <section ref={revealRef} className="reveal hero-section">
      <div className="hero-content ">
        <h1 className="hero-title">Discover Egypt’s Ancient Wonders</h1>
        <p className="hero-text">Explore archaeological sites, heritage trails and historical journeys across the land of pharaohs.</p>
      </div>

      <div className="search-bar">
        <h2 className="search-title">Search for Destinations</h2>
        <input type="text" placeholder="Enter a monument, city, or landmark..." className="search-input" />
        <button className="search-button">
          Explore
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Harosection
