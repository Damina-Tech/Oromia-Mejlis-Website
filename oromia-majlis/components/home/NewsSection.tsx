"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Article, getArticles } from "@/lib/strapi";

const formatDate = (dateString: string) => {
  if (!dateString) {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const isImageUrl = (value?: string) => {
  if (!value) return false;
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
};

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const articles = await getArticles();
        setNewsItems(articles.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

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
          {isLoading && (
            <div className="md:col-span-3 bg-white rounded-lg p-6 text-gray-600 shadow-md">
              Loading news...
            </div>
          )}

          {!isLoading &&
            newsItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
                  {isImageUrl(item.image) ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">{item.image || "📰"}</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-3">
                    {formatDate(item.publishedAt)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <Link
                    href={`/news/${item.slug || item.id}`}
                    className="text-blue-700 hover:text-red-600 font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    Continue Reading →
                  </Link>
                </div>
              </article>
            ))}

          {!isLoading && newsItems.length === 0 && (
            <div className="md:col-span-3 bg-white rounded-lg p-6 text-gray-600 shadow-md">
              No news articles available at this time.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

