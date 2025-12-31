"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 2,
  basePath = "/offices",
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`w-10 h-10 flex items-center justify-center rounded font-semibold transition-colors ${
            page === currentPage
              ? "bg-red-600 text-white"
              : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 font-semibold transition-colors"
        >
          &gt;
        </Link>
      )}
    </div>
  );
}

