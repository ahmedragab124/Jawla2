import { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PopCardItem from './PopCardItem';
import gsap from 'gsap';
import '../styles/PopCard.css';

function PopCard({ attractions }) {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const scrollByValue = 310;

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction * scrollByValue,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!attractions || attractions.length === 0) return;

    const ctx = gsap.context(() => {
      if (carouselRef.current) {
        const cards = carouselRef.current.querySelectorAll('.popcard-wrapper');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      }
    }, containerRef);

    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      currentIndexRef.current = (currentIndexRef.current + 1) % attractions.length;
      carousel.scrollTo({
        left: currentIndexRef.current * scrollByValue,
        behavior: 'smooth',
      });
    }, 3200);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [attractions]);

  return (
    <div ref={containerRef} className="relative mt-8 max-w-7xl mx-auto px-4">
      {/* Navigation Arrow Buttons above the Carousel */}
      <div className="flex justify-end items-center gap-3 mb-4 pr-4">
        <button
          type="button"
          onClick={() => handleScroll(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#e6d8c5] bg-white text-[#3f2b1a] shadow-md hover:bg-[#b57a2d] hover:text-white hover:border-[#b57a2d] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Scroll previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => handleScroll(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#e6d8c5] bg-white text-[#3f2b1a] shadow-md hover:bg-[#b57a2d] hover:text-white hover:border-[#b57a2d] hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Scroll next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div ref={carouselRef} className="carousel-list overflow-x-auto pb-8 pt-2 pl-4 pr-2 scroll-smooth">
        <div className="flex gap-6 snap-x snap-mandatory">
          {attractions.map((A) => (
            <div key={A.id ?? A.name} className="snap-center popcard-wrapper">
              <PopCardItem attraction={A} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopCard;
