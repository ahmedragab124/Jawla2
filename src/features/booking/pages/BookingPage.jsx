import { useEffect, useRef } from 'react';
import hero from '../../../assets/guide-booking-hero.jpg';
import BookingForm from '../components/BookingForm';
import { Link } from 'react-router-dom';
import useSEO from '../../../hooks/useSEO';
import gsap from 'gsap';

// BookingPage Component
// Renders the guide booking banner layout with split GSAP entrance transitions and the booking form.
function BookingPage() {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const formRef = useRef(null);

  useSEO({
    title: 'Book a Tour Guide',
    description: 'Hire local certified tour guides and Egyptologists for historical tours, desert safari, and Nile cruises in Cairo, Luxor, and Aswan.'
  });

  // Initializes entry animations for text content and form container
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(leftContentRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.2 })
        .fromTo(formRef.current, { opacity: 0, x: 50, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 0.9 }, '-=0.6');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#271b12]/85 via-[#3b2a1c]/60 to-[#271b12]/40 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto flex flex-col lg:flex-row min-h-screen max-w-7xl items-center justify-center lg:justify-between gap-12 lg:gap-16 px-6 py-24 lg:py-10 lg:px-10">
        <div ref={leftContentRef} className="max-w-lg text-center lg:text-left">
          <p className="mb-3 text-xs font-black uppercase tracking-[4px] text-[#F4D58D]">
            Your Journey Starts Here • Find Your Perfect Guide
          </p>

          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl tracking-tight drop-shadow-md">
            Explore the
            <br />
            Beauty of
            <span className="text-[#F4D58D]"> Egypt</span>
          </h1>

          <p className="mt-6 text-base leading-8 text-stone-200 sm:text-lg">
            Book a trusted local guide and discover the beauty of Egypt through its temples, the Nile, and authentic Nubian culture.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3.5 lg:justify-start">
            <Link to="/" className="rounded-2xl border border-white/40 px-6 py-3.5 font-bold text-white transition-all hover:bg-white/20 hover:scale-105 active:scale-95">
              ← Explore with Jawla
            </Link>
            <Link to="/profile" className="rounded-2xl bg-[#b57a2d] px-6 py-3.5 font-bold text-white shadow-lg transition-all hover:bg-[#8B5E3C] hover:scale-105 active:scale-95">
              View Bookings →
            </Link>
          </div>
        </div>

        <div ref={formRef} className="w-full max-w-150 lg:ml-16">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
