"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n";

export default function LocalServicesSection() {
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
    {
      heading: string;
      cta: string;
      cards: { title: string; image: string; href: string }[];
    }
  > = {
    en: {
      heading: "Explore Our Services, Programs & Initiatives",
      cta: "Explore Services",
      cards: [
        { title: "Religious Affairs Departments", image: "🕌", href: "/offices" },
        { title: "Community Programs", image: "🤝", href: "/programs" },
        { title: "Islamic Education Centers", image: "📚", href: "/education" },
      ],
    },
    om: {
      heading: "Tajaajila, Sagantaa fi Hojiiwwan keenya qoradhu",
      cta: "Tajaajila Ilaali",
      cards: [
        { title: "Kutaa Dhimma Amantii", image: "🕌", href: "/offices" },
        { title: "Sagantaa Hawaasaa", image: "🤝", href: "/programs" },
        { title: "Wiirtuu Barnoota Islaamaa", image: "📚", href: "/education" },
      ],
    },
    am: {
      heading: "አገልግሎቶቻችንን፣ ፕሮግራሞችን እና ተነሳሽነቶችን ያስሱ",
      cta: "አገልግሎቶችን ያስሱ",
      cards: [
        { title: "የሀይማኖት ጉዳይ መምሪያዎች", image: "🕌", href: "/offices" },
        { title: "የማህበረሰብ ፕሮግራሞች", image: "🤝", href: "/programs" },
        { title: "የኢስላማዊ ትምህርት ማዕከላት", image: "📚", href: "/education" },
      ],
    },
    ar: {
      heading: "استكشف خدماتنا وبرامجنا ومبادراتنا",
      cta: "استكشف الخدمات",
      cards: [
        { title: "إدارات الشؤون الدينية", image: "🕌", href: "/offices" },
        { title: "برامج المجتمع", image: "🤝", href: "/programs" },
        { title: "مراكز التعليم الإسلامي", image: "📚", href: "/education" },
      ],
    },
  };

  const t = dict[locale] ?? dict.en;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
            {t.heading}
          </h2>
          <Link
            href="/services"
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition-colors whitespace-nowrap"
          >
            {t.cta}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.cards.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-8xl opacity-50 group-hover:opacity-70 transition-opacity">
                  {service.image}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

