"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface OfficeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: ReactNode;
  href: string;
}

function isOfficeImageUrl(image: string) {
  return (
    image.startsWith("/") ||
    image.startsWith("http://") ||
    image.startsWith("https://")
  );
}

export default function OfficeCard({
  id,
  title,
  description,
  image,
  icon,
  href,
}: OfficeCardProps) {
  const hasCoverImage = isOfficeImageUrl(image);

  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200/80 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:ring-teal-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
      aria-labelledby={`office-card-title-${id}`}
    >
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-950 md:h-56">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-teal-400/20 blur-2xl transition-all duration-500 group-hover:bg-teal-300/30" />

        {hasCoverImage ? (
          <>
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-950/80 via-teal-900/35 to-teal-800/20" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
            <span className="select-none text-7xl opacity-90 drop-shadow-lg md:text-8xl">
              {image}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2">
          <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-teal-500 to-emerald-700 text-3xl shadow-xl ring-2 ring-teal-200/50 transition-transform duration-300 group-hover:scale-110 group-hover:ring-teal-100 md:h-20 md:w-20 md:text-4xl">
            <span className="drop-shadow-sm">{icon}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-14 md:px-6 md:pt-16">
        <h3
          id={`office-card-title-${id}`}
          className="mb-2 text-center text-lg font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-teal-900 md:text-xl"
        >
          {title}
        </h3>
        <p className="mb-6 line-clamp-3 min-h-[3.75rem] flex-1 text-center text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        <div className="mt-auto flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-xl border-2 border-teal-600 bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 transition-all duration-300 group-hover:border-teal-500 group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-md">
            <span>View department</span>
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
