import { useEffect, useRef } from 'react'
import { Compass, Heart, Landmark, MapPin, Sparkles, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useSEO from '../../../hooks/useSEO'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: Landmark, title: 'Egyptian Heritage', text: 'We help visitors discover Egypt\'s history, culture, and unforgettable landmarks.' },
  { icon: Compass, title: 'Easy Exploration', text: 'Browse destinations, attractions, and guides in one simple place.' },
  { icon: Heart, title: 'Made for Travelers', text: 'Our platform is designed to make every trip feel personal and well planned.' },
]

const stats = [
  { number: '50+', label: 'Destinations' },
  { number: '200+', label: 'Attractions' },
  { number: '100+', label: 'Local Guides' },
]

function AboutPage() {
  useSEO({
    title: 'About Jawla',
    description: 'Learn about Jawla — your gateway to discovering Egypt\'s heritage with certified local guides and AI-powered trip planning.'
  })

  const heroRef = useRef(null)
  const missionRef = useRef(null)
  const cardsRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 85%' },
        }
      )

      // Mission section
      gsap.fromTo(
        missionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: missionRef.current, start: 'top 85%' },
        }
      )

      // Stats counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.children
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          }
        )
      }

      // Value cards stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
          }
        )
      }

      // CTA section
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-[#fffaf0]">

      {/* Hero Banner */}
      <section ref={heroRef} className="px-5 pt-28 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl bg-[#3f2b1a] px-7 py-14 text-white md:px-14 md:py-20">
            <p className="text-xs font-black tracking-[0.25em] text-[#e4c58d] uppercase">About Jawla</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
              Your journey through Egypt starts here.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#f7e7d7] md:text-lg">
              Jawla brings destinations, attractions, and local tour guides together to make planning your next adventure simple.
            </p>
            <Link to="/destinations" className="mt-8 inline-flex rounded-full bg-[#b57a2d] px-7 py-3 text-sm font-semibold transition hover:bg-[#d39743] hover:scale-105 active:scale-95">
              Explore destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionRef} className="py-16 px-5 text-center">
        <p className="text-xs font-black tracking-[0.22em] text-[#b57a2d] uppercase">Our Mission</p>
        <h2 className="mt-3 text-3xl font-black text-[#3f2b1a] md:text-4xl">
          Discover Egypt with confidence.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#695744] text-sm md:text-base">
          From Cairo and Luxor to Aswan and the Red Sea, we want visitors to discover the places that make Egypt special and connect with guides who know them best.
        </p>
      </section>

      {/* Stats */}
      <div ref={statsRef} className="mx-auto max-w-4xl px-5 grid grid-cols-3 gap-4">
        {stats.map(({ number, label }) => (
          <div key={label} className="rounded-2xl border border-[#ecdfc9] bg-white py-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-black text-[#b57a2d]">{number}</p>
            <p className="mt-1 text-xs font-bold text-[#695744] tracking-wider uppercase">{label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <section className="py-16 px-5">
        <div ref={cardsRef} className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl bg-white p-7 text-left border border-[#ecdfc9] shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3e3ce] text-[#b57a2d]">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-[#3f2b1a]">{title}</h3>
              <p className="mt-2.5 leading-7 text-[#695744] text-sm">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="px-5 pb-20">
        <div className="mx-auto max-w-6xl flex flex-col gap-6 rounded-2xl border border-[#ecdfc9] bg-[#f9f3e9] p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <MapPin className="mt-1 shrink-0 text-[#b57a2d]" size={28} />
            <div>
              <h2 className="text-xl font-bold text-[#3f2b1a]">Plan your Egyptian adventure</h2>
              <p className="mt-1.5 text-sm text-[#695744]">Find a destination, choose what to visit, then book a local guide.</p>
            </div>
          </div>
          <Link to="/booking" className="shrink-0 rounded-full bg-[#3f2b1a] px-7 py-3 text-center font-semibold text-white transition hover:bg-[#5a3e28] hover:scale-105 active:scale-95 text-sm">
            Book a guide
          </Link>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
