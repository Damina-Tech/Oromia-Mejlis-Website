"use client";

import { useState } from "react";

interface GalleryImageCardProps {
  id: string | number;
  title: string;
  category: string;
  image?: string;
  description?: string;
}

export default function GalleryImageCard({
  id,
  title,
  category,
  image,
  description,
}: GalleryImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-red-100 to-red-200">
        {image ? (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
              📷
            </div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 text-white transition-all duration-300 ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="mb-2">
          <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-1 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-200 line-clamp-2">{description}</p>
        )}
      </div>

      {/* Hover Indicator */}
      <div
        className={`absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <svg
          className="w-5 h-5 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      </div>
    </div>
  );
}
