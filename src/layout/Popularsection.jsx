import React from 'react'
import useRevealOnScroll from './../hooks/useRevealOnScroll';
import axios from 'axios';
import Popcard from './Popcard';

function Popularsection() {
  const revealRef = useRevealOnScroll()
  const [Attractions, setAttractions] = React.useState([])
  React.useEffect(() => {
    axios.get('http://localhost:3000/attractions')
      .then((response) => {
        setAttractions(response.data)
      })
      .catch((error) => {
        console.error('Failed to load attractions:', error)
      })
    }, [])
    
  return (
     <section ref={revealRef} className="reveal fesecte-section bg-linear-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3f2b1a]">Our Popular Attractions</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
        <p className="mt-6 text-base md:text-lg leading-8 text-[#5b4423] max-w-2xl mx-auto">
          Explore our most sought-after travel experiences, featuring iconic landmarks and hidden gems across the region. 
        </p>
      </div>
      
      <Popcard Attractions={Attractions} />


    </section>
  )
}

export default Popularsection
