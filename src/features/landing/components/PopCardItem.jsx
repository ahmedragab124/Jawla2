import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

function PopCardItem({ attraction }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        boxShadow: '0 25px 50px rgba(181, 122, 45, 0.22)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/attractions/${attraction.id}`}
      className="popcartitem relative block w-[280px] sm:w-[320px] overflow-hidden rounded-[28px] border border-[#f3e6d3] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 group"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-black text-[#b57a2d] shadow-md">
          {attraction.star}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-amber-500">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        </span>
      </div>

      <div className="p-5 space-y-3.5">
        <h2 className="text-xl font-black text-[#3f2b1a] group-hover:text-[#b57a2d] transition-colors duration-300 line-clamp-1">{attraction.name}</h2>

        <p className="text-xs leading-6 text-[#695540] font-medium line-clamp-2 min-h-[48px]">
          {attraction.description}
        </p>

        {/* Redesigned Attraction Card Button */}
        <span className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#b57a2d] px-5 py-3 text-center text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:bg-[#966321] group-hover:shadow-lg">
          View Details
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export default PopCardItem;
