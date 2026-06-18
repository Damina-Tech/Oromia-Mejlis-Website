"use client";

interface GalleryFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  categories: string[];
}

export default function GalleryFilter({
  activeFilter,
  onFilterChange,
  categories,
}: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-6 py-2.5 rounded-md font-semibold transition-all duration-300 ${
          activeFilter === "all"
            ? "bg-red-600 text-white shadow-lg"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-6 py-2.5 rounded-md font-semibold transition-all duration-300 ${
            activeFilter === category
              ? "bg-red-600 text-white shadow-lg"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
