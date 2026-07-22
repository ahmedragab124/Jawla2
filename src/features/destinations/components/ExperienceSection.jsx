import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ExperienceSection.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * ExperienceSection Component
 * Displays filtered tourist experiences in a horizontal interactive carousel with GSAP ScrollTrigger animations.
 * 
 * @param {Object} props
 * @param {Object} props.destination - Destination data including experiences list
 */
function ExperienceSection({ destination }) {
  const places = destination.experiences || [];
  const categories = ['All', ...new Set(places.map((place) => place.category))];

  const [filter, setFilter] = useState('All');
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  const filteredPlaces = filter === 'All' ? places : places.filter((p) => p.category === filter);

  /**
   * Triggers GSAP staggered entrance animations when filtered list changes
   */
  useEffect(() => {
    if (filteredPlaces.length === 0) return;
    const ctx = gsap.context(() => {
      if (carouselRef.current) {
        const cards = carouselRef.current.querySelectorAll('.experience-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filter, destination]);

  /**
   * Scrolls the carousel left or right
   */
  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction * 340,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={sectionRef} className="experience-section bg-gradient-to-b from-[#fffaf0] via-[#fff3e6] to-[#f7e7d7] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="text-left max-w-xl">
          <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">{destination.exploreLabel}</span>
          <h2 className="mt-2 text-3xl md:text-5xl font-black text-[#3f2b1a] tracking-tight">{destination.experienceTitle}</h2>
          <p className="mt-4 text-sm md:text-base leading-7 text-[#695540] font-medium">{destination.experienceDescription}</p>
        </div>

        {/* Top-right Navigation Arrows */}
        <div className="flex gap-3 justify-start md:justify-end shrink-0">
          <button
            onClick={() => handleScroll(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e6d8c5] bg-white text-[#3f2b1a] shadow-md hover:bg-[#b57a2d] hover:text-white hover:border-[#b57a2d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => handleScroll(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e6d8c5] bg-white text-[#3f2b1a] shadow-md hover:bg-[#b57a2d] hover:text-white hover:border-[#b57a2d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-8 flex flex-wrap gap-2.5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`rounded-full px-5 py-2 text-xs font-black transition-all cursor-pointer ${
              filter === category
                ? 'bg-[#b57a2d] text-white shadow-md'
                : 'bg-white/70 hover:bg-[#b57a2d] hover:text-white border border-[#e6d8c5]/60 text-[#695540]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Carousel List Container */}
      <div className="relative max-w-6xl mx-auto px-4">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredPlaces.map((place) => (
            <ExperienceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
