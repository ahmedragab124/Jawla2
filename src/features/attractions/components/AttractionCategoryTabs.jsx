import { useRef } from 'react';
import { Search } from 'lucide-react';
import gsap from 'gsap';

const CATEGORIES = ['All', 'Historical', 'Temples', 'Pyramids', 'Museums', 'Culture'];

// AttractionCategoryTabs Component
function AttractionCategoryTabs({ query, onQueryChange, selectedCategory, onCategorySelect }) {
  const indicatorRef = useRef(null);
  const tabRefs = useRef([]);

  // Animates sliding indicator when user selects a category pill
  const handleSelect = (category, index) => {
    onCategorySelect(category);
    const activeTab = tabRefs.current[index];
    if (activeTab && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        duration: 0.35,
        ease: 'power3.out',
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mb-12">
      <label className="relative w-full max-w-lg shadow-md rounded-full">
        <Search className="absolute left-4.5 top-3.5 h-5 w-5 text-[#a57e55]" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search attractions by name or keyword..."
          className="w-full rounded-full border border-[#e6d8c5] bg-white py-3.5 pl-12 pr-6 outline-none focus:border-[#b57a2d] transition-all font-medium text-sm"
        />
      </label>

      <div className="relative flex flex-wrap items-center justify-center gap-2 rounded-full bg-[#f4e8d8] p-1.5 border border-[#e6d8c5]/80 shadow-xs max-w-2xl">
        <div
          ref={indicatorRef}
          className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-[#b57a2d] shadow-md pointer-events-none transition-all duration-300"
          style={{ width: '60px', transform: 'translateX(6px)' }}
        />
        {CATEGORIES.map((cat, idx) => (
          <button
            key={cat}
            ref={(el) => (tabRefs.current[idx] = el)}
            onClick={() => handleSelect(cat, idx)}
            className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-black transition-colors duration-200 cursor-pointer ${
              selectedCategory === cat ? 'text-white' : 'text-[#685743] hover:text-[#3f2b1a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AttractionCategoryTabs;
