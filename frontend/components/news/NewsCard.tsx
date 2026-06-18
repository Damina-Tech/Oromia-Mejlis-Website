"use client";

import Link from "next/link";

interface NewsCardProps {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  image: string;
  comments?: number;
}

export default function NewsCard({
  id,
  title,
  date,
  category,
  author,
  excerpt,
  image,
  comments = 0,
}: NewsCardProps) {
  const isImageUrl =
    image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/");

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <Link href={`/news/${id}`}>
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
          {isImageUrl ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-6xl opacity-50">{image}</div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
          <span>{date}</span>
          <span>•</span>
          <span className="text-blue-700">In {category}</span>
          <span>•</span>
          <span>By {author}</span>
          {comments > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>💬</span>
                <span>{comments}</span>
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <Link href={`/news/${id}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-700 transition-colors">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        {/* Read More */}
        <Link
          href={`/news/${id}`}
          className="text-blue-700 hover:text-red-600 font-semibold transition-colors inline-flex items-center gap-2"
        >
          Continue Reading →
        </Link>
      </div>
    </article>
  );
}

