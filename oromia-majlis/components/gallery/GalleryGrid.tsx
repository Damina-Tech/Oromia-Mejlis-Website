"use client";

import { useState, useMemo, useEffect } from "react";
import { getGalleryItems, GalleryItem } from "@/lib/strapi";
import GalleryImageCard from "./GalleryImageCard";
import GalleryFilter from "./GalleryFilter";

const ITEMS_PER_PAGE = 9;

export default function GalleryGrid() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const data = await getGalleryItems();
        setGalleryItems(data);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(galleryItems.map((item) => item.category).filter(Boolean))
    ) as string[];
    return uniqueCategories.sort();
  }, [galleryItems]);

  // Filter images based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [galleryItems, activeFilter]);

  // Get visible items
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(ITEMS_PER_PAGE); // Reset visible count when filter changes
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p className="mt-4 text-gray-600">Loading gallery...</p>
      </div>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No gallery items available at this time.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Buttons */}
      <GalleryFilter
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        categories={categories}
      />

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {visibleItems.map((item) => (
          <GalleryImageCard
            key={item.id}
            id={item.id}
            title={item.title}
            category={item.category}
            image={item.image}
            description={item.description}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
          >
            Load More
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No items found in category "{activeFilter}".
          </p>
        </div>
      )}
    </div>
  );
}
