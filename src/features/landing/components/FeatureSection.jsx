import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/FeatureSection.css';

gsap.registerPlugin(ScrollTrigger);

function FeatureSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const [destinations, setDestinations] = useState([]);
  const currentIndexRef = useRef(0);
  const scrollAmount = 340;

  useEffect(() => {
    const loadDestinations = async () => {
      const { data, error } = await supabase.from('destinations').select('*');
      if (error) {
        console.error('Failed to load destinations:', error);
        return;
      }
      setDestinations(data || []);
    };

    loadDestinations();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      if (carouselRef.current && destinations.length > 0) {
        const cards = carouselRef.current.querySelectorAll('.feature-card-wrapper');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [destinations]);

  // Auto scroll effect
  useEffect(() => {
    if (destinations.length === 0) return;

    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      currentIndexRef.current = (currentIndexRef.current + 1) % destinations.length;

      if (currentIndexRef.current === 0) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [destinations]);

  return (
    <section ref={sectionRef} className="fesecte-section bg-gradient-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-24 overflow-hidden">
      <div ref={titleRef} className="mx-auto max-w-4xl px-4 text-center">
        <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">Tailored Heritage Trails</span>
        <h2 className="mt-2 text-4xl md:text-5xl font-black text-[#3f2b1a]">Our Key Features</h2>
        <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-[#b57a2d]" />
        <p className="mt-6 text-base md:text-lg leading-8 text-[#5b4423] max-w-2xl mx-auto">
          Discover what makes our travel service special with heritage-focused routes and expert guides, delivered with authentic local insight.
        </p>
      </div>

      <div className="relative mt-12 px-4 max-w-6xl mx-auto">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {destinations.map((D) => (
            <div
              key={D.id}
              className="feature-card-wrapper snap-center shrink-0 w-[290px] sm:w-[320px] relative overflow-hidden rounded-3xl shadow-lg h-105 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(63,43,26,0.22)] group"
            >
              <img src={D.image} alt={D.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-colors duration-500" />
              <span className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-[#a9681b] px-3.5 py-1 rounded-full text-xs font-black shadow-md z-20">
                ★ {D.star}
              </span>
              <div className="relative z-10 h-full p-7 flex flex-col justify-end text-white text-left">
                <h1 className="text-2xl font-black drop-shadow-md group-hover:text-amber-300 transition-colors duration-300">{D.name}</h1>
                <p className="mt-3 text-xs leading-6 text-stone-200 line-clamp-3">{D.description}</p>
                <Link
                  to={`/destination/${D.id}`}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#b57a2d] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#9a581b] transition-all hover:scale-105 active:scale-95 w-max"
                >
                  Explore City →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
