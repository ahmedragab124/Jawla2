import { useEffect, useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../supabase';
import AttractionCategoryTabs from '../components/AttractionCategoryTabs';
import useSEO from '../../../hooks/useSEO';
import gsap from 'gsap';

/**
 * AttractionsPage Component
 * Gallery page listing Egypt's tourist attractions with live search, category tabs, and GSAP card staggers.
 */
function AttractionsPage() {
  const [attractions, setAttractions] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useSEO({
    title: 'Egypt Attractions & Monuments',
    description: 'Browse the ultimate guide to Egypt\'s temples, Giza pyramids, historical museums, and cultural heritage landmarks.'
  });

  /**
   * Fetches attractions from Supabase
   */
  useEffect(() => {
    async function loadAttractions() {
      try {
        const { data, error } = await supabase.from('attractions').select('*');
        if (error) throw error;
        setAttractions(data || []);
      } catch (error) {
        console.error('Failed to load attractions:', error);
      }
    }

    loadAttractions();
  }, []);

  /**
   * Filters attractions by search query and category
   */
  const filtered = attractions.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(query.toLowerCase()) ||
                          (a.description && a.description.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || 
                            (a.category && a.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
                            (a.name && a.name.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  /**
   * Triggers GSAP staggered entrance animations for filtered attraction cards
   */
  useEffect(() => {
    if (!filtered || filtered.length === 0) return;
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.attraction-grid-card');
        gsap.fromTo(cards, { opacity: 0, y: 40, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [query, selectedCategory, attractions]);

  return (
    <main ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#f7ebe0] to-[#fffaf0] px-5 py-20">
      <section className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <span className="text-xs font-black tracking-[0.25em] text-[#b57a2d] uppercase">Discover Landmarks</span>
          <h1 className="mt-2 text-4xl font-black text-[#3f2b1a] md:text-6xl tracking-tight">All Attractions</h1>
          <p className="mt-3 text-base text-[#685743] max-w-xl mx-auto font-medium">
            Explore ancient wonders, temples, and historical landmarks across Egypt.
          </p>
        </div>

        <AttractionCategoryTabs
          query={query}
          onQueryChange={setQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <Link
              key={a.id}
              to={`/attractions/${a.id}`}
              className="attraction-grid-card overflow-hidden rounded-[28px] bg-white shadow-lg border border-[#f3e6d3] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={a.image || '/attractions/pyramids.png'}
                  alt={a.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => { e.target.src = '/attractions/pyramids.png'; }}
                />
                <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-black text-[#a9681b] shadow-md">
                  <Star size={14} fill="currentColor" className="text-amber-500" /> {a.star}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-2xl font-black text-[#3f2b1a] group-hover:text-[#b57a2d] transition-colors">{a.name}</h2>
                  <p className="mt-3 text-xs leading-6 text-[#685743] line-clamp-3 font-medium">{a.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-100">
                  <span className="text-xs font-bold text-[#b57a2d]">Explore Attraction →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-stone-500">
            <p className="text-lg font-bold text-[#3f2b1a]">No attractions found</p>
            <button onClick={() => { setQuery(''); setSelectedCategory('All'); }} className="mt-4 rounded-full bg-[#b57a2d] px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-[#8f5d1e] transition cursor-pointer">
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default AttractionsPage;
