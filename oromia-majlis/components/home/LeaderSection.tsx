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
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Mayor Mohammed Umar is a dedicated public servant committed to
              transforming Oromia Majlis into a model city of progress,
              innovation, and inclusive development. With a vision for sustainable
              growth and community empowerment, he leads initiatives that create
              lasting positive impact.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span>Creating jobs for youth</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span>Expanding healthcare and education access</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span>Promoting inclusive urban development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span>Enhancing digital governance</span>
              </li>
            </ul>

            {/* Quote Box */}
            <div className="border-l-4 border-red-600 pl-6 py-4 bg-red-50 rounded-r-lg">
              <p className="text-lg font-semibold text-gray-900 italic mb-2">
                &quot;We don&apos;t just build roads. We build hope, dignity, and
                opportunity for the people of Oromia.&quot;
              </p>
              <p className="text-gray-600">— Mayor Mohammed Umar</p>
            </div>

            {/* Video Intro */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="/about/video"
                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                <span className="text-2xl">▶</span>
                <div className="text-left">
                  <p className="font-semibold">Video Intro</p>
                  <p className="text-sm text-red-100">About Our Municipal</p>
                </div>
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

