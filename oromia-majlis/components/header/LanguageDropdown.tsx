"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n";

export default function LanguageDropdown() {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    const cookieValue =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
        ?.split("=")[1] ?? "";
    setLocale(normalizeLocale(decodeURIComponent(cookieValue || DEFAULT_LOCALE)));
  }, []);

  const label =
    locale === "om"
      ? "Afaan"
      : locale === "am"
        ? "ቋንቋ"
        : locale === "ar"
          ? "اللغة"
          : "Language";

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="locale" className="sr-only">
        Select language
      </label>
      <div className="group inline-flex items-center rounded-full border border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm transition hover:border-gray-300 hover:shadow-md focus-within:ring-2 focus-within:ring-red-200">
        <span className="pl-3 pr-2 text-gray-500" aria-hidden>
          🌐
        </span>
        <select
          id="locale"
          value={locale}
          onChange={(e) => {
            const next = normalizeLocale(e.target.value);
            document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(next)}; path=/; max-age=31536000; samesite=lax`;
            setLocale(next);
            window.location.reload();
          }}
          className="appearance-none bg-transparent py-2 pl-0 pr-10 text-sm font-semibold text-gray-800 outline-none"
          aria-label="Select language"
          title="Select language"
        >
          <option value="en">English</option>
          <option value="om">Afaan Oromoo</option>
          <option value="am">አማርኛ</option>
          <option value="ar">العربية</option>
        </select>
        <svg
          className="pointer-events-none absolute right-3 h-4 w-4 text-gray-500 transition group-hover:text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
