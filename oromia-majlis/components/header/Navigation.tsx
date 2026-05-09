"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n";

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
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    const cookieValue =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
        ?.split("=")[1] ?? "";
    setLocale(normalizeLocale(decodeURIComponent(cookieValue || DEFAULT_LOCALE)));
  }, []);

  const labels: Record<
    string,
    {
      home: string;
      about: string;
      services: string;
      departments: string;
      programs: string;
      news: string;
      contact: string;
      projects: string;
      events: string;
      gallery: string;
    }
  > = {
    en: {
      home: "Home",
      about: "About",
      services: "Services",
      departments: "Departments",
      programs: "Programs",
      news: "News",
      contact: "Contact",
      projects: "Projects",
      events: "Events",
      gallery: "Gallery",
    },
    om: {
      home: "Mana",
      about: "Waa'ee keenya",
      services: "Tajaajila",
      departments: "Kutaa hojii",
      programs: "Sagantaa",
      news: "Oduu",
      contact: "Nu qunnamaa",
      projects: "Pirojektoota",
      events: "Taateewwan",
      gallery: "Suuraa",
    },
    am: {
      home: "መነሻ",
      about: "ስለ እኛ",
      services: "አገልግሎቶች",
      departments: "መምሪያዎች",
      programs: "ፕሮግራሞች",
      news: "ዜና",
      contact: "አግኙን",
      projects: "ፕሮጀክቶች",
      events: "ክስተቶች",
      gallery: "ጋለሪ",
    },
    ar: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      departments: "الإدارات",
      programs: "البرامج",
      news: "الأخبار",
      contact: "اتصل بنا",
      projects: "المشاريع",
      events: "الفعاليات",
      gallery: "المعرض",
    },
  };

  const t = labels[locale] ?? labels.en;

  const navItemsLocalized = [
    { name: t.home, href: "/" },
    { name: t.about, href: "/about" },
    { name: t.services, href: "/services" },
    { name: t.departments, href: "/offices" },
    { name: t.news, href: "/news" },
    { name: t.contact, href: "/contact" },
  ];

  const programsDropdownLocalized = [
    { name: t.projects, href: "/projects" },
    { name: t.events, href: "/event" },
    { name: t.gallery, href: "/gallery" },
  ];

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
  const isProgramsActive = programsDropdownLocalized.some(
    (item) => pathname === item.href || pathname.startsWith(item.href)
  );

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {navItemsLocalized.slice(0, 4).map((item) => (
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
          {t.programs}
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
            {programsDropdownLocalized.map((item) => (
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

      {navItemsLocalized.slice(4).map((item) => (
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

