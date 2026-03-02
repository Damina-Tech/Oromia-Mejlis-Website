"use client";

import { ReactNode } from "react";

interface TopInfoBarProps {
  languageSelector?: ReactNode;
}

export default function TopInfoBar({ languageSelector }: TopInfoBarProps) {
  return (
    <div className="hidden md:block bg-blue-900 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
          {/* Left Side - Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-red-500">📞</span>
              <span>Call on: +251911111111</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">🕐</span>
              <span>Open Hours: Mon - Sat 8.00 am - 6.00 pm</span>
            </div>
          </div>

          {/* Right Side - Language Switcher */}
          <div className="flex items-center">
            {languageSelector}
          </div>
        </div>
      </div>
    </div>
  );
}

