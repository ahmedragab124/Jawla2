import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../supabase';
import gsap from 'gsap';
import '../styles/DestinationsPage.css';

function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const scrollAmount = 340;

  useEffect(() => {
    const loadDestinations = async () => {
      const { data, error } = await supabase.from('destinations').select('*');

      if (error) {
        console.error(error);
        setError('Could not load destinations.');
        return;
      }

      setDestinations(data || []);
    };

    loadDestinations();
  }, []);

  useEffect(() => {
    if (!destinations || destinations.length === 0) return;

    const ctx = gsap.context(() => {
      if (carouselRef.current) {
        const cards = carouselRef.current.querySelectorAll('.dest-card-wrapper');
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
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [destinations]);

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#f9efdf] to-[#fffaf0] px-6 py-20">
      <div className="dest-page-container max-w-7xl mx-auto">
        {/* Header section with navigation buttons above the carousel */}
        <div className="dest-header-flex flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-[0.3em] text-[#b57a2d] uppercase">Explore Egypt</p>
            <h1 className="mt-2 text-4xl font-black text-[#3f2b1a] md:text-5xl tracking-tight">Choose Your Destination</h1>
            <p className="mt-3 max-w-xl text-[#5b4423] text-sm md:text-base font-medium">
              Discover Egypt's most unforgettable cities, then build your experience with a local guide.
            </p>
          </div>

          {/* Navigation buttons */}
          {destinations.length > 0 && (
            <div className="dest-nav-buttons flex items-center gap-3">
              <button
                onClick={() => handleScroll(-1)}
                className="dest-nav-btn flex h-12 w-12 items-center justify-center rounded-full border border-amber-900/10 bg-white text-[#3f2b1a] shadow-md hover:bg-[#b57a2d] hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous Destination"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => handleScroll(1)}
                className="dest-nav-btn flex h-12 w-12 items-center justify-center rounded-full border border-amber-900/10 bg-white text-[#3f2b1a] shadow-md hover:bg-[#b57a2d] hover:text-white transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next Destination"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-14 text-center text-lg font-bold text-red-700">{error}</p>
        ) : destinations.length === 0 ? (
          <div className="flex justify-center items-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#b57a2d] border-t-transparent" />
          </div>
        ) : (
          <div className="dest-carousel-wrapper mt-10">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {destinations.map((destination) => (
                <div key={destination.id} className="dest-card-wrapper snap-center shrink-0 w-[290px] sm:w-[340px]">
                  <article className="dest-page-card h-[490px] rounded-3xl border border-[#f0e2d0] bg-white shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
                    <div className="dest-page-img-wrapper h-60 relative overflow-hidden">
                      <img src={destination.image} alt={destination.name} className="dest-page-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                    </div>
                    <div className="dest-page-body p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h2 className="dest-page-title text-2xl font-black text-[#3f2b1a] group-hover:text-[#b57a2d] transition-colors">{destination.name}</h2>
                        <p className="dest-page-desc mt-3 text-xs leading-6 text-[#655340] line-clamp-3 font-medium">{destination.description}</p>
                      </div>
                      <Link
                        to={`/destination/${destination.id}`}
                        className="dest-page-link mt-6 inline-flex items-center justify-center rounded-2xl bg-[#7a5540] px-6 py-3 font-bold text-xs text-white shadow-md transition-all hover:bg-[#5c4033] hover:scale-105 active:scale-95 w-max self-start"
                      >
                        Explore {destination.name} →
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default DestinationsPage;
