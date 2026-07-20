import useRevealOnScroll from '../../../hooks/useRevealOnScroll'
import tourguideImage from '../../../assets/tourguide.png'
import { Link } from 'react-router-dom'

function PlannerSection() {
  const revealRef = useRevealOnScroll()

  return (
    <section ref={revealRef} className="reveal fesecte-section bg-linear-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-20">

      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#3f2b1a]">Book your guide</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
        <p className="mt-2 text-base md:text-lg leading-8 text-[#5b4423] max-w-2xl mx-auto">
              Explore Egypt with a local guide on Jawla
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[36px] shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
              <img
                src={tourguideImage}
                alt="Local guide"
                className="h-130 w-full object-cover"
              />
            </div>

           
          </div>

          <div className="text-center lg:text-left">
            <h2 className="mt-4 text-2xl text-[#3f2b1a] md:text-5xl">
              Explore through the eyes of a local
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d] lg:mx-0" />
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#5b4423] lg:mx-0 md:text-lg">
              Unlock the secrets of Egypt with our certified professional guides. From the hidden chambers of the pyramids to the best street food in Khan el-Khalili, our experts ensure your journey is safe, authentic, and unforgettable.
            </p>

            <div className="mt-8 grid gap-4 text-left">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#f4f1eb] text-[#b57a2d]">✓</span>
                <p className="text-sm text-[#3f2b1a]">History experts with PhD backgrounds</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#f4f1eb] text-[#b57a2d]">✓</span>
                <p className="text-sm text-[#3f2b1a]">Fluent in over 12 languages</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#f4f1eb] text-[#b57a2d]">✓</span>
                <p className="text-sm text-[#3f2b1a]">Private and small group tours available</p>
              </div>
            </div>

            <Link to="/booking" className="mt-10 inline-flex rounded-full bg-[#e4d688] px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(29,78,216,0.22)] transition hover:-translate-y-0.5 hover:bg-[#f0e1ad]">
              Book a Guide
            </Link>

          </div>
        </div>
      </div>




    </section>
  )
}

export default PlannerSection
