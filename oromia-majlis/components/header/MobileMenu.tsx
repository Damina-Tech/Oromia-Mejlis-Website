"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  if (!isOpen) return null;

  const isProgramsActive = programsDropdown.some(
    (item) => pathname === item.href || pathname.startsWith(item.href)
  );

  return (
    <div
      className={`lg:hidden bg-white border-t shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col gap-2">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`py-3 px-4 rounded-md font-medium transition-colors ${
                pathname === item.href
                  ? "text-red-600 bg-red-50"
                  : "text-blue-700 hover:bg-blue-50"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Programs Dropdown for Mobile */}
          <div>
            <button
              onClick={() => setIsProgramsOpen(!isProgramsOpen)}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-between ${
                isProgramsActive
                  ? "text-red-600 bg-red-50"
                  : "text-blue-700 hover:bg-blue-50"
              }`}
            >
              <span>Programs</span>
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
            {isProgramsOpen && (
              <div className="pl-4 mt-2 space-y-1">
                {programsDropdown.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`block py-2 px-4 rounded-md text-sm transition-colors ${
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
              onClick={onClose}
              className={`py-3 px-4 rounded-md font-medium transition-colors ${
                pathname === item.href
                  ? "text-red-600 bg-red-50"
                  : "text-blue-700 hover:bg-blue-50"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={onClose}
            className="mt-2 py-3 px-4 rounded-md border-2 border-blue-700 text-blue-700 font-semibold text-center hover:bg-blue-50 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/donate"
            onClick={onClose}
            className="py-3 px-4 rounded-md bg-red-600 text-white font-semibold text-center hover:bg-red-700 transition-colors shadow-md"
          >
            Donate
          </Link>
        </nav>
      </div>
    </div>
  );
}

