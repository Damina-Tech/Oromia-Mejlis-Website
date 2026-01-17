"use client";

import Link from "next/link";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  iconSvg?: React.ReactNode;
}

export default function ServiceCard({
  icon,
  title,
  description,
  href,
  iconSvg,
}: ServiceCardProps) {
  return (
    <Link
      href={href.startsWith('/services/') ? href : `/services/${href}`}
      className="group relative bg-white rounded-lg border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 hover:shadow-lg overflow-hidden min-h-[280px]"
    >
      {/* Default State - Icon and Title */}
      <div className="flex flex-col items-center justify-center flex-1 transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
        <div className="text-6xl mb-4">
          {iconSvg || (
            <span className="text-6xl inline-block">
              {icon}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-blue-900 text-center">
          {title}
        </h3>
      </div>

      {/* Hover State - Full Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center text-blue-600 font-semibold mt-4 group-hover:text-blue-700">
          <span>Read More</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </div>
      </div>

      {/* Background Icon - Bottom Right Corner (Always visible, more prominent on hover) */}
      <div className="absolute bottom-0 right-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none">
        <div className="text-9xl transform rotate-12 translate-x-6 translate-y-6">
          {iconSvg || icon}
        </div>
      </div>
    </Link>
  );
}

