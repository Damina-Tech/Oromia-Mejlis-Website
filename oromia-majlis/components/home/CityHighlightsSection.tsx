"use client";

import Link from "next/link";

const highlights = [
  {
    title: "Oromia Town",
    image: "🏘️",
  },
  {
    title: "Spring Conference",
    image: "🏢",
  },
  {
    title: "Classic Buildings",
    image: "🏛️",
  },
  {
    title: "Modern Buildings",
    image: "🏗️",
  },
];

export default function CityHighlightsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Explore Oromia Majlis Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Link
              key={index}
              href={`/highlights/${index + 1}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-8xl opacity-50 group-hover:opacity-70 transition-opacity">
                  {highlight.image}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white">
                  {highlight.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

