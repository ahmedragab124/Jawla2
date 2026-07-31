import { useRef } from "react";
import { Search } from "lucide-react";

const CATEGORIES = ["All", "Historical", "Temples", "Pyramids", "Museums", "Culture"];

function AttractionCategoryTabs({
  query,
  onQueryChange,
  selectedCategory,
  onCategorySelect,
}) {
  const scrollContainerRef = useRef(null);

  return (
    <div className="flex flex-col items-center gap-5 mb-10 w-full">
      {/* Search Input Bar */}
      <label className="relative w-full max-w-lg shadow-sm rounded-full">
        <Search className="absolute left-4.5 top-3.5 h-5 w-5 text-[#a57e55]" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search attractions by name or keyword..."
          className="w-full rounded-full border border-[#e6d8c5] bg-white py-3.5 pl-12 pr-6 outline-none focus:border-[#b57a2d] focus:ring-2 focus:ring-[#b57a2d]/20 transition-all font-medium text-sm"
        />
      </label>

      {/* Responsive Horizontal Scrollable Category Bar */}
      <div className="w-full max-w-2xl px-2">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto py-1 px-1.5 rounded-full bg-[#f4e8d8] border border-[#e6d8c5]/80 shadow-xs no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategorySelect(cat)}
                className={`shrink-0 rounded-full px-5 py-2 text-xs font-black transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? "bg-[#b57a2d] text-white shadow-md scale-105"
                    : "text-[#685743] hover:text-[#3f2b1a] hover:bg-white/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AttractionCategoryTabs;
