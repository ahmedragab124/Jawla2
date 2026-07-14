import { Compass, Heart, Landmark, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  { icon: Landmark, title: 'Egyptian heritage', text: 'We help visitors discover Egypt’s history, culture, and unforgettable landmarks.' },
  { icon: Compass, title: 'Easy exploration', text: 'Browse destinations, attractions, and guides in one simple place.' },
  { icon: Heart, title: 'Made for travelers', text: 'Our platform is designed to make every trip feel personal and well planned.' },
]

function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] px-5 py-16">
      <section className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[36px] bg-[#3f2b1a] px-7 py-14 text-white md:px-14 md:py-20">
          <p className="text-sm font-bold tracking-[0.25em] text-[#e4c58d]">ABOUT EXPLORE EGYPT</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Your journey through Egypt starts here.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#f7e7d7] md:text-lg">
            Explore Egypt brings destinations, attractions, and local tour guides together to make planning your next adventure simple.
          </p>
          <Link to="/destinations" className="mt-9 inline-flex rounded-full bg-[#b57a2d] px-7 py-3 font-semibold transition hover:bg-[#d39743]">
            Explore destinations
          </Link>
        </div>

        <section className="py-16 text-center">
          <p className="text-sm font-bold tracking-[0.22em] text-[#b57a2d]">OUR MISSION</p>
          <h2 className="mt-4 text-3xl font-extrabold text-[#3f2b1a] md:text-5xl">Discover Egypt with confidence.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#695744]">From Cairo and Luxor to Aswan and the Red Sea, we want visitors to discover the places that make Egypt special and connect with guides who know them best.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl bg-white p-7 text-left shadow-[0_15px_40px_rgba(76,48,24,0.1)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f9ecd8] text-[#b57a2d]"><Icon size={25} /></span>
              <h3 className="mt-6 text-2xl font-bold text-[#3f2b1a]">{title}</h3>
              <p className="mt-3 leading-7 text-[#695744]">{text}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 flex flex-col gap-6 rounded-3xl border border-[#eadbc8] bg-[#f9f3e9] p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4"><MapPin className="mt-1 shrink-0 text-[#b57a2d]" size={28} /><div><h2 className="text-2xl font-bold text-[#3f2b1a]">Plan your Egyptian adventure</h2><p className="mt-2 text-[#695744]">Find a destination, choose what to visit, then book a local guide.</p></div></div>
          <Link to="/booking" className="shrink-0 rounded-full bg-[#3f2b1a] px-7 py-3 text-center font-semibold text-white transition hover:bg-[#5a3e28]">Book a guide</Link>
        </section>
      </section>
    </main>
  )
}

export default AboutPage
