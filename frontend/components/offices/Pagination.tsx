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

  const baseClass =
    "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 border";

  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`${baseClass} ${
            page === currentPage
              ? "border-teal-600 bg-teal-600 text-white shadow-md ring-2 ring-teal-200/60"
              : "border-gray-200 bg-white text-gray-800 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className={`${baseClass} border-gray-200 bg-white text-gray-800 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900`}
        >
          &gt;
        </Link>
      )}
    </div>
  );
}
