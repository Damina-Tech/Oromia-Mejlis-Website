"use client";

import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n";

interface TopInfoBarProps {
  languageSelector?: ReactNode;
}

export default function TopInfoBar({ languageSelector }: TopInfoBarProps) {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    const cookieValue =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
        ?.split("=")[1] ?? "";
    setLocale(normalizeLocale(decodeURIComponent(cookieValue || DEFAULT_LOCALE)));
  }, []);

  const dict: Record<
    string,
    { callOn: string; openHours: string; hoursValue: string }
  > = {
    en: {
      callOn: "Call on:",
      openHours: "Open Hours:",
      hoursValue: "Mon - Sat 8.00 am - 6.00 pm",
    },
    om: {
      callOn: "Bilbilaa:",
      openHours: "Sa'aatii hojii:",
      hoursValue: "Wiix - Sanb 8:00 ganama - 6:00 galgala",
    },
    am: {
      callOn: "ይደውሉ:",
      openHours: "የስራ ሰዓት:",
      hoursValue: "ሰኞ - ቅዳሜ 8:00 ጡዋት - 6:00 ማታ",
    },
    ar: {
      callOn: "اتصل على:",
      openHours: "ساعات العمل:",
      hoursValue: "الاثنين - السبت 8:00 صباحاً - 6:00 مساءً",
    },
  };

  const t = dict[locale] ?? dict.en;

  return (
    <div className="hidden md:block bg-blue-900 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
          {/* Left Side - Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-red-500">📞</span>
              <span>
                {t.callOn} +251911111111
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">🕐</span>
              <span>
                {t.openHours} {t.hoursValue}
              </span>
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

