import React from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll';
import axios from 'axios';
import './css-layout/Featuresection.css';

function Featuresection() {
  const revealRef = useRevealOnScroll()
  const [Distinations, setDistinations] = React.useState([])

  React.useEffect(() => {
    axios.get('http://localhost:3000/destinations')
      .then((response) => {
        setDistinations(response.data)
      })
      .catch((error) => {
        console.error('Failed to load destinations:', error)
      })
  }, [])


  return (
    <section ref={revealRef} className="reveal fesecte-section bg-linear-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3f2b1a]">Our Features</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
        <p className="mt-6 text-base md:text-lg leading-8 text-[#5b4423] max-w-2xl mx-auto">
          Discover what makes our travel service special with heritage-focused routes and expert guides, delivered with authentic local insight.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4">
        {Distinations.map((D) => (
          <div key={D.id ?? D.name} className="feature-card relative overflow-hidden rounded-3xl shadow-sm h-105 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
            <img src={D.image} alt={D.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-500 hover:bg-black/50" />
            <div className="relative z-10 h-full p-6 flex flex-col justify-end text-white">
              <h1 className="text-2xl font-bold drop-shadow-lg">{D.name}</h1>
              <p className="mt-3 text-sm leading-6 drop-shadow-sm">{D.description}</p>
            </div>
          </div>
        ))}
      </div>




    </section>
  )
}

export default Featuresection
