"use client";

interface GalleryFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "All" },
  { id: "business", label: "Business" },
  { id: "city-culture", label: "City and Culture" },
  { id: "events", label: "Events" },
  { id: "government", label: "Government" },
  { id: "public-places", label: "Public Places" },
];

export default function GalleryFilter({
  activeFilter,
  onFilterChange,
}: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-2.5 rounded-md font-semibold transition-all duration-300 ${
            activeFilter === filter.id
              ? "bg-red-600 text-white shadow-lg scale-105"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

