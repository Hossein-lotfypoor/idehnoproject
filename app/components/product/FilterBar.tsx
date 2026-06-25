import { memo } from "react";

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function FilterBar({ categories, activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-2xl p-2 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 mb-16 flex flex-wrap items-center justify-center gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          aria-label={`Filter by ${cat}`}
          aria-pressed={activeCategory === cat}
          className={`px-10 py-3.5 rounded-2xl text-sm font-black transition-all duration-500 
            ${activeCategory === cat 
              ? "bg-gray-900 text-white shadow-xl scale-105" 
              : "bg-transparent text-gray-500 hover:bg-gray-100"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default memo(FilterBar);
