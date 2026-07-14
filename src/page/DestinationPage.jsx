import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Background from '../components/cairo/Background'
import HeroContent from '../components/cairo/HeroContent'
import ExperienceSection from '../components/cairo/ExperienceSection'
import GuideSection from '../components/cairo/GuideSection'


function DestinationPage() {
  const [destination, setDestination] = useState(null)
  const params = useParams();
  // console.log(destination);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/destinations/${params.id}`)
      .then((response) => {
        setDestination(response.data)
      })
      .catch((error) => {
        console.error('Failed to load destinations:', error)
      })
  }, [params.id])

    // console.log(destination);


  if (!destination?.heroImage) {
    return <main className="grid min-h-[70vh] place-items-center text-xl text-[#7a5540]">Loading...</main>
  }

  return (
    <>
      <Background image={destination.heroImage}>
        <HeroContent destination={destination} />
      </Background>
      <ExperienceSection destination={destination} />
      <GuideSection destination={destination} />
    </>
  )
}

export default DestinationPage
