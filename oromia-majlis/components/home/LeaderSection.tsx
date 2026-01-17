"use client";

import Link from "next/link";

export default function LeaderSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Meet the Visionary Leader of Oromia Majlis 
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 relative">
            {/* Decorative accent */}
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-red-500 to-blue-600 rounded-full opacity-20"></div>
            
            {/* Name and Title Section */}
            <div className="space-y-3">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                  Sheikh Gali Muktar
                </h3>
                <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold rounded-full shadow-md">
                  President, Oromia Regional Islamic Affairs Supreme Council
                </div>
              </div>
              
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                A respected Islamic scholar committed to strengthening Islamic values, unity, and responsible religious governance across the Oromia Region.
              </p>
            </div>

            {/* Key Focus Areas */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-gray-900 uppercase tracking-wide">Key Focus Areas</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm text-gray-800">Promoting authentic Islamic teachings</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm text-gray-800">Strengthening unity among Muslims</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm text-gray-800">Supporting mosques and institutions</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm text-gray-800">Enhancing religious education</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quote Box */}
            <div className="relative border-l-4 border-red-600 pl-4 py-4 bg-gradient-to-r from-red-50 via-red-50/50 to-transparent rounded-r-xl shadow-sm">
              <div className="absolute top-3 left-1 text-red-600 text-3xl opacity-20">"</div>
              <p className="text-base md:text-lg font-semibold text-gray-900 italic mb-2 leading-relaxed relative z-10">
                Our responsibility is to serve the Ummah with wisdom, justice, and sincerity.
              </p>
              <p className="text-sm text-gray-600 font-medium">— Sheikh Gali Muktar</p>
            </div>

            {/* Video Intro */}
            <div className="pt-2">
              <Link
                href="/about/video"
                className="group flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <span className="text-xl ml-1">▶</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-base">Video Introduction</p>
                  <p className="text-xs text-red-100 group-hover:text-white transition-colors">Learn more about Oromia Majlis</p>
                </div>
                <div className="text-lg group-hover:translate-x-1 transition-transform">→</div>
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative order-first lg:order-last">
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-9xl opacity-30">👤</div>
              </div>
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

