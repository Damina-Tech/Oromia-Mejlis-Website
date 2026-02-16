"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GalleryItem, getGalleryItems } from "@/lib/strapi";

export default function CityHighlightsSection() {
  const [highlights, setHighlights] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTopHighlights = async () => {
      try {
        const items = await getGalleryItems();
        setHighlights(items.slice(0, 10));
      } catch (error) {
        console.error("Error fetching gallery highlights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopHighlights();
  }, []);

  useEffect(() => {
    if (!sliderRef.current || highlights.length === 0) return;

    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const card = slider.querySelector("[data-highlight-card]") as HTMLElement | null;
      if (!card) return;

      const gap = 24; // matches gap-6
      const scrollStep = card.offsetWidth + gap;
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      const next = slider.scrollLeft + scrollStep;

      if (next >= maxScrollLeft - 4) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollTo({ left: next, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [highlights]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Explore Oromia Majlis Highlights
        </h2>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading highlights...</p>
          </div>
        ) : highlights.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">No highlights available at this time.</p>
          </div>
        ) : (
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {highlights.map((highlight) => (
              <Link
                key={highlight.id}
                href="/gallery"
                data-highlight-card
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[85%] sm:w-[65%] md:w-[45%] lg:w-[30%] xl:w-[23%]"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
                  {highlight.image ? (
                    <img
                      src={highlight.image}
                      alt={highlight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-8xl opacity-50 group-hover:opacity-70 transition-opacity">
                      🖼️
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-lg md:text-xl font-bold text-white line-clamp-2">
                    {highlight.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

