"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getHeroSection, HeroSection as HeroSectionType } from "@/lib/strapi";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroData, setHeroData] = useState<HeroSectionType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  const t = (key: "topBarText" | "exploreMore" | "loading" | "noContent") => {
    const dict: Record<string, Record<typeof key, string>> = {
      en: {
        topBarText:
          "Serving the Muslim community by promoting Islamic values, strengthening unity, and managing Islamic affairs across the Oromia Region.",
        exploreMore: "Let's explore more →",
        loading: "Loading...",
        noContent:
          "No content available. Please configure Hero Section in Strapi.",
      },
      om: {
        topBarText:
          "Hawaasa Muslimootaa tajaajiluudhaan qajeelfama Islaamaa cimsuu, tokkummaa jabeessuu fi dhimma Islaamaa naannoo Oromiyaa keessatti sirnaan gaggeessuu.",
        exploreMore: "Dabalataan haa ilaallu →",
        loading: "Fe'amaa jira...",
        noContent:
          "Qabiyyeen hin jiru. Hero Section Strapi keessatti qopheessi.",
      },
      am: {
        topBarText:
          "በኦሮሚያ ክልል የኢስላማዊ ጉዳዮችን በታማኝነት በማስተዳደር፣ እሴቶችን በማበረታታት እና አንድነትን በማጠናከር ሙስሊም ማህበረሰብን እንገለግላለን።",
        exploreMore: "ተጨማሪ ይመልከቱ →",
        loading: "በመጫን ላይ...",
        noContent:
          "ይዘት አልተገኘም። እባክዎ Hero Section በStrapi ውስጥ ያቀናብሩ።",
      },
      ar: {
        topBarText:
          "نخدم المجتمع المسلم عبر تعزيز القيم الإسلامية وتقوية الوحدة وإدارة الشؤون الإسلامية في إقليم أوروميا.",
        exploreMore: "اكتشف المزيد ←",
        loading: "جارٍ التحميل...",
        noContent:
          "لا يوجد محتوى متاح. يرجى إعداد قسم البطل في Strapi.",
      },
    };
    return (dict[locale] ?? dict.en)[key];
  };

  useEffect(() => {
    const cookieValue =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
        ?.split("=")[1] ?? "";
    setLocale(normalizeLocale(decodeURIComponent(cookieValue || DEFAULT_LOCALE)));
  }, []);

  // Fetch hero section data from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getHeroSection();
        setHeroData(data);
      } catch (err) {
        console.error("Error fetching hero section:", err);
        setError("Failed to load content. Using default content.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  // Use Strapi data only
  const localizedField = <T extends Record<string, any>>(
    item: T,
    base: string,
    fallback: string
  ) => {
    if (locale === "om") return item[`${base}Om`] || item[base] || fallback;
    if (locale === "am") return item[`${base}Am`] || item[base] || fallback;
    if (locale === "ar") return item[`${base}Ar`] || item[base] || fallback;
    return item[base] || fallback;
  };

  const slides =
    heroData?.slides?.map((slide: any) => ({
      title: localizedField(slide, "title", ""),
      subtitle: localizedField(slide, "subtitle", ""),
      image: slide.image || "",
      ctaText: localizedField(slide, "ctaText", "Learn More"),
      ctaLink: localizedField(slide, "ctaLink", "#"),
    })) || [];

  const services =
    heroData?.services?.map((service: any) => ({
      ...service,
      title: localizedField(service, "title", service.title || ""),
      description: localizedField(
        service,
        "description",
        service.description || ""
      ),
    })) || [];
  const activeSlide = slides[currentSlide];

  const goToSlide = (direction: "next" | "prev") => {
    setCurrentSlide((prev) => {
      if (direction === "next") {
        return prev === slides.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? slides.length - 1 : prev - 1;
    });
  };

  // Auto-slide functionality
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Show empty state if no data
  if (!isLoading && slides.length === 0 && services.length === 0) {
    return (
      <section className="relative">
        <div className="hidden lg:block bg-red-600 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-2 text-sm">
              <p>{t("topBarText")}</p>
              <Link href="/explore" className="hover:underline font-semibold">
                {t("exploreMore")}
              </Link>
            </div>
          </div>
        </div>
        <div className="relative h-[520px] md:h-[620px] lg:h-[700px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white text-lg">{t("noContent")}</p>
            <p className="text-white/70 text-sm mt-2">
              Debug: slides={slides.length}, services={services.length}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="relative">
        <div className="hidden lg:block bg-red-600 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-2 text-sm">
                <p>{t("topBarText")}</p>
                <Link href="/explore" className="hover:underline font-semibold">
                {t("exploreMore")}
              </Link>
            </div>
          </div>
        </div>
        <div className="relative h-[520px] md:h-[620px] lg:h-[700px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">{t("loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      {/* Top Info Bar - Only visible on desktop to avoid duplication with header */}
      <div className="hidden lg:block bg-red-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2 text-sm">
            <p>{t("topBarText")}</p>
            <Link href="/explore" className="hover:underline font-semibold">
              {t("exploreMore")}
            </Link>
          </div>
        </div>
      </div>

      {/* Error message (non-blocking) */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 text-sm text-yellow-700">
          <div className="container mx-auto px-4">
            {error}
          </div>
        </div>
      )}

      {/* Hero Slider */}
      {activeSlide && (
        <div
          className="relative h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(6,11,25,0.75), rgba(8,47,73,0.55)), url(${activeSlide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-xl max-w-4xl">
              {activeSlide.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-3xl">
              {activeSlide.subtitle}
            </p>
            {activeSlide.ctaText && (
              <Link
                href={activeSlide.ctaLink}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-md text-lg transition-colors shadow-lg"
                >
                  {activeSlide.ctaText}
                </Link>
            )}
          </div>

        {/* Manual Controls */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-20">
          <button
            aria-label="Previous slide"
            onClick={() => goToSlide("prev")}
            type="button"
            className="w-12 h-12 rounded-full bg-white/80 text-gray-800 flex items-center justify-center shadow-md hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            ←
          </button>
          <button
            aria-label="Next slide"
            onClick={() => goToSlide("next")}
            type="button"
            className="w-12 h-12 rounded-full bg-white/80 text-gray-800 flex items-center justify-center shadow-md hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            →
          </button>
        </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentSlide ? "w-8 bg-white" : "w-3 bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Service Navigation Bar */}
      {services.length > 0 && (
        <div className="bg-white shadow-xl -mt-12 relative z-20">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className={`grid grid-cols-2 md:grid-cols-3 ${services.length === 6 ? 'lg:grid-cols-6' : services.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4 md:gap-6`}>
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="group flex flex-col items-center text-center p-4 md:p-5 rounded-2xl border-2 border-red-100 hover:border-red-500 hover:-translate-y-3 transition-all duration-300 hover:shadow-2xl bg-white cursor-pointer"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-red-500 text-red-500 flex items-center justify-center text-2xl md:text-3xl mb-3 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

