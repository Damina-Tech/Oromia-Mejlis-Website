"use client";

import Link from "next/link";

interface OfficeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  href: string;
}

export default function OfficeCard({
  id,
  title,
  description,
  image,
  icon,
  href,
}: OfficeCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
        {/* Placeholder for actual image - using gradient background */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-7xl opacity-40">{image}</div>
        </div>
        
        {/* Red Circular Icon Overlapping Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <div className="text-white text-3xl">{icon}</div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-12 pb-6 px-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center min-h-[3rem]">
          {description}
        </p>
        
        {/* Read More Button */}
        <div className="flex justify-center">
          <div className="inline-flex items-center px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-md font-semibold bg-white group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 pointer-events-none">
            <span>Read More</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

