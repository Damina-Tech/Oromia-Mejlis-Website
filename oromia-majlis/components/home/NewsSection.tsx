"use client";

import Link from "next/link";

const newsItems = [
  {
    date: "January 1, 2026",
    title: "Oromia Majlis Announces New Religious Education Initiatives",
    image: "📚",
  },
  {
    date: "December 28, 2025",
    title: "Annual Islamic Affairs Summit Scheduled for January 2026",
    image: "🕌",
  },
  {
    date: "December 20, 2025",
    title: "Community Zakat Distribution Program Launched",
    image: "🤝",
  },
];

export default function NewsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              News and Publications
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed about the latest news, announcements, and activities from Oromia Majlis.
            </p>
          </div>
          <Link
            href="/news"
            className="mt-4 md:mt-0 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition-colors whitespace-nowrap"
          >
            More News
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-6xl">{item.image}</div>
              </div>
              <div className="p-6">
                <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-3">
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <Link
                  href={`/news/${index + 1}`}
                  className="text-blue-700 hover:text-red-600 font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Continue Reading →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

