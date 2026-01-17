"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Departments", href: "/offices" },
  // Programs will be inserted here as a dropdown
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const programsDropdown = [
  { name: "Projects", href: "/projects" },
  { name: "Events", href: "/event" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProgramsOpen(false);
      }
    };

    if (isProgramsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProgramsOpen]);

  // Check if current path is in programs dropdown
  const isProgramsActive = programsDropdown.some(
    (item) => pathname === item.href || pathname.startsWith(item.href)
  );

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {navItems.slice(0, 4).map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`font-medium transition-colors ${
            pathname === item.href
              ? "text-red-600"
              : "text-blue-700 hover:text-red-600"
          }`}
        >
          {item.name}
        </Link>
      ))}

      {/* Programs Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsProgramsOpen(!isProgramsOpen)}
          className={`font-medium transition-colors flex items-center gap-1 ${
            isProgramsActive
              ? "text-red-600"
              : "text-blue-700 hover:text-red-600"
          }`}
        >
          Programs
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isProgramsOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isProgramsOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            {programsDropdown.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsProgramsOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors ${
                  pathname === item.href
                    ? "text-red-600 bg-red-50 font-semibold"
                    : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {navItems.slice(4).map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`font-medium transition-colors ${
            pathname === item.href
              ? "text-red-600"
              : "text-blue-700 hover:text-red-600"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

