"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
            layout?: unknown;
          },
          elementId: string
        ) => void;
      };
    };
  }
}

export default function LanguageDropdown() {
  const translateElementId = `google_translate_element_${useId().replace(/:/g, "_")}`;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeTranslate = () => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,om,am,ar",
          autoDisplay: false,
        },
        translateElementId
      );
    };

    window.googleTranslateElementInit = initializeTranslate;

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );

    if (existingScript) {
      initializeTranslate();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      console.error("Failed to load Google Translate script.");
    };
    document.body.appendChild(script);
  }, [translateElementId]);

  const handleTriggerClick = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const select = wrapper.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.focus();
      if (typeof select.showPicker === "function") {
        select.showPicker();
      } else {
        select.click();
      }
    }
  };

  return (
    <div ref={wrapperRef} className="relative inline-flex items-center">
      {/* Compact trigger button */}
      <button
        type="button"
        onClick={handleTriggerClick}
        className="flex items-center justify-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-gray-800 shadow-sm border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        aria-label="Select language / Translate page"
        title="Translate page"
      >
        <span className="text-blue-600 font-bold text-sm">Language</span>
        <svg
          className="w-3.5 h-3.5 text-gray-500"
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

      {/* Hidden Google Translate widget - kept in DOM for functionality */}
      <div
        className="absolute left-0 top-0 w-px h-px overflow-hidden opacity-0 pointer-events-none"
        style={{ clip: "rect(0,0,0,0)" }}
        aria-hidden
      >
        <div id={translateElementId} />
      </div>
    </div>
  );
}
