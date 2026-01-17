"use client";

import Link from "next/link";

const events = [
  {
    date: "15 JAN 2026",
    category: "Religious Conference",
    title: "Annual Islamic Affairs Summit 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Oromia Majlis Headquarters",
    image: "🕌",
  },
  {
    date: "28 FEB 2026",
    category: "Community Event",
    title: "Quranic Recitation Competition",
    time: "2:00 PM - 6:00 PM",
    location: "Central Mosque, Addis Ababa",
    image: "📖",
  },
];

const documents = [
  { name: "Islamic Affairs Management Guidelines", date: "2025-12-15" },
  { name: "Mosque Registration Application", date: "2025-11-20" },
  { name: "Annual Religious Education Report", date: "2025-10-10" },
  { name: "Zakat & Charity Distribution Policy", date: "2025-09-05" },
];

export default function EventsDocumentsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <Link
                href="/events"
                className="text-blue-700 hover:text-red-600 font-semibold transition-colors"
              >
                See All Events →
              </Link>
            </div>

            <div className="space-y-6">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8 min-h-[200px]">
                      <div className="text-6xl">{event.image}</div>
                    </div>
                    <div className="sm:w-2/3 p-6">
                      <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-3">
                        {event.date}
                      </div>
                      <div className="text-sm text-blue-700 font-semibold mb-2">
                        {event.category}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p>📅 {event.date}</p>
                        <p>🕐 {event.time}</p>
                        <p>📍 {event.location}</p>
                      </div>
                      <Link
                        href={`/events/${index + 1}`}
                        className="inline-block text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
                      >
                        More Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* City Documents */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Majlis Documents
              </h2>
              <Link
                href="/documents"
                className="text-blue-700 hover:text-red-600 font-semibold transition-colors"
              >
                More Documents →
              </Link>
            </div>

            <div className="space-y-4">
              {documents.map((doc, index) => (
                <Link
                  key={index}
                  href={`/documents/${index + 1}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="text-red-600 text-2xl">📄</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-600">{doc.date}</p>
                  </div>
                  <div className="text-blue-700 group-hover:text-red-600 transition-colors">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

