import useRevealOnScroll from '../../../hooks/useRevealOnScroll'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

function GuideSection() {
  const revealRef = useRevealOnScroll()
  return (
    <section ref={revealRef}  className="reveal fesecte-section bg-linear-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3f2b1a]">Plan Your Dream Trip</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
      </div>

      <div className="mx-auto mt-10 max-w-4xl  rounded-4xl bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.12)] sm:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold  text-[#0f172a] sm:text-5xl">
              Your dream trip is one click away
            </h1>
            <p className="max-w-xl text-base leading-8 text-[#475569] sm:text-lg">
              Discover Egypt with a smooth planning experience and book the perfect guide for your journey.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/booking" className="inline-flex min-w-42.5 items-center justify-center rounded-[18px] bg-[#9a581b] px-6 py-3 text-base font-semibold text-white shadow-[0_15px_40px_rgba(154,88,27,0.25)] transition hover:bg-[#7b4217]">
                Book Your Guide
              </Link>
              <Link to="/profile" className="inline-flex min-w-42.5 items-center justify-center rounded-[18px] border border-[#0f4a5e] bg-white px-6 py-3 text-base font-semibold text-[#0f4a5e] transition hover:bg-[#f8fafc]">
                View Bookings
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-[#e7eff3] shadow-inner shadow-[#d8e3e7]">
              <Search className="h-16 w-16 text-[#0f4a5e]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuideSection
