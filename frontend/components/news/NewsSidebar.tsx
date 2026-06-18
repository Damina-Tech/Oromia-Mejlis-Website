"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getArticles, Article } from "@/lib/strapi";

interface RecentPost {
  id: string;
  slug: string;
  title: string;
  date: string;
}

export default function NewsSidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getArticles();
        
        // Get recent posts (limit to 4)
        const recent = articles.slice(0, 4).map((article) => ({
          id: article.id.toString(),
          slug: article.slug || article.id.toString(),
          title: article.title,
          date: new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        setRecentPosts(recent);

        // Get unique categories
        const uniqueCategories = Array.from(
          new Set(articles.map((a) => a.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories.length > 0 ? uniqueCategories : ["General"]);
      } catch (error) {
        console.error("Error fetching articles for sidebar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    if (searchQuery.trim()) {
      window.location.href = `/news?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Search</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h3>
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : recentPosts.length > 0 ? (
          <ul className="space-y-3">
            {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/news/${post.slug}`}
                className="text-blue-700 hover:text-red-600 transition-colors block"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-600 mt-1">{post.date}</p>
            </li>
          ))}
        </ul>
        ) : (
          <p className="text-gray-600">No recent posts available.</p>
        )}
      </div>

      {/* Recent Comments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Recent Comments
        </h3>
        <p className="text-gray-600">No comments to show.</p>
      </div>

      {/* Archives */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Archives</h3>
        <ul className="space-y-2">
          <li>
            <Link
              href="/news?archive=2025-08"
              className="text-blue-700 hover:text-red-600 transition-colors"
            >
              August 2025
            </Link>
          </li>
          <li>
            <Link
              href="/news?archive=2025-07"
              className="text-blue-700 hover:text-red-600 transition-colors"
            >
              July 2025
            </Link>
          </li>
        </ul>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                href={`/news?category=${category.toLowerCase()}`}
                className="text-blue-700 hover:text-red-600 transition-colors"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Photo Gallery */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Photo Gallery</h3>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center"
            >
              <span className="text-2xl opacity-50">📷</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

