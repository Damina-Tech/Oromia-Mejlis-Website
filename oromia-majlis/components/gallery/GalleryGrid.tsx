"use client";

import { useState, useMemo } from "react";
import GalleryImageCard from "./GalleryImageCard";
import GalleryFilter from "./GalleryFilter";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
}

const allImages: GalleryImage[] = [
  // Row 1
  {
    id: "1",
    title: "Construction Site",
    category: "business",
    image: "🏗️",
  },
  {
    id: "2",
    title: "City Street View",
    category: "city-culture",
    image: "🏙️",
  },
  {
    id: "3",
    title: "Government Building Entrance",
    category: "government",
    image: "🏛️",
  },
  // Row 2
  {
    id: "4",
    title: "Aerial View of Town",
    category: "city-culture",
    image: "🌆",
  },
  {
    id: "5",
    title: "City Landscape",
    category: "city-culture",
    image: "🏘️",
  },
  {
    id: "6",
    title: "Commercial District",
    category: "business",
    image: "🏪",
  },
  // Row 3
  {
    id: "7",
    title: "City Skyline",
    category: "city-culture",
    image: "🌇",
  },
  {
    id: "8",
    title: "Community Leader",
    category: "government",
    image: "👤",
  },
  {
    id: "9",
    title: "Welcome Sign",
    category: "public-places",
    image: "🚏",
  },
  // Additional images for Load More
  {
    id: "10",
    title: "Public Transportation",
    category: "public-places",
    image: "🚌",
  },
  {
    id: "11",
    title: "City Road",
    category: "public-places",
    image: "🛣️",
  },
  {
    id: "12",
    title: "Community Event",
    category: "events",
    image: "🎉",
  },
  {
    id: "13",
    title: "Business District",
    category: "business",
    image: "🏢",
  },
  {
    id: "14",
    title: "Cultural Festival",
    category: "events",
    image: "🎊",
  },
  {
    id: "15",
    title: "Government Office",
    category: "government",
    image: "🏛️",
  },
  {
    id: "16",
    title: "Public Park",
    category: "public-places",
    image: "🌳",
  },
  {
    id: "17",
    title: "City Market",
    category: "business",
    image: "🛒",
  },
  {
    id: "18",
    title: "Cultural Center",
    category: "city-culture",
    image: "🎭",
  },
];

const ITEMS_PER_PAGE = 9;

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filter images based on active filter
  const filteredImages = useMemo(() => {
    if (activeFilter === "all") {
      return allImages;
    }
    return allImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  // Get visible images
  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(ITEMS_PER_PAGE); // Reset visible count when filter changes
  };

  return (
    <div>
      {/* Filter Buttons */}
      <GalleryFilter
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {visibleImages.map((image) => (
          <GalleryImageCard
            key={image.id}
            id={image.id}
            title={image.title}
            category={image.category}
            image={image.image}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300 shadow-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

