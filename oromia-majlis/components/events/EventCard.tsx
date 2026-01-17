"use client";

import Link from "next/link";

interface EventCardProps {
  id: string;
  day: number;
  month: string;
  dayOfWeek: string;
  image: string;
  category: string;
  title: string;
  time: string;
  location: string;
  href: string;
}

const categoryColors: Record<string, string> = {
  Conference: "bg-blue-600",
  Religious: "bg-purple-600",
  Workshop: "bg-orange-600",
  "Community Service": "bg-green-600",
  Education: "bg-indigo-600",
  Culture: "bg-pink-600",
};

export default function EventCard({
  id,
  day,
  month,
  dayOfWeek,
  image,
  category,
  title,
  time,
  location,
  href,
}: EventCardProps) {
  const categoryColor = categoryColors[category] || "bg-gray-600";

  return (
    <div className="px-6 md:px-8 py-8 hover:bg-gray-50 transition-all duration-300 hover:shadow-lg rounded-lg group cursor-pointer">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
        {/* Date Section */}
        <div className="flex-shrink-0 text-center md:text-left w-20 md:w-24 group-hover:scale-105 transition-transform duration-300">
          <div className="text-5xl md:text-6xl font-bold text-gray-900 leading-none group-hover:text-red-600 transition-colors duration-300">
            {day}
          </div>
          <div className="text-xs md:text-sm font-semibold text-gray-600 uppercase mt-2">
            {month}
          </div>
          <div className="text-xs text-gray-500 uppercase mt-1">
            {dayOfWeek}
          </div>
        </div>

        {/* Image */}
        <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-red-100 group-hover:to-red-200 flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
            <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">{image}</div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex-1 min-w-0">
              {/* Category Badge */}
              <span
                className={`inline-block ${categoryColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3`}
              >
                {category}
              </span>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors duration-300">
                {title}
              </h3>

              {/* Time and Location */}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-gray-600">
                  <span className="text-base mt-0.5">🕐</span>
                  <span className="text-sm md:text-base">{time}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <span className="text-base mt-0.5">📍</span>
                  <span className="text-sm md:text-base">{location}</span>
                </div>
              </div>
            </div>

            {/* More Details Button */}
            <div className="flex-shrink-0 pt-2 lg:pt-0">
              <Link
                href={href}
                className="inline-block bg-gray-200 hover:bg-red-600 hover:text-white text-gray-800 font-semibold px-6 py-2.5 rounded-md transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-lg hover:-translate-y-1 transform"
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

