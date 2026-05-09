"use client";

import { useState, useEffect } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n";

export default function LeaderSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoId = "1fU0W4hkBmo";
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
      sectionTitle: string;
      presidentTitle: string;
      intro: string;
      focusTitle: string;
      focus: string[];
      quote: string;
      videoTitle: string;
      videoSubtitle: string;
    }
  > = {
    en: {
      sectionTitle: "Meet the Visionary Leader of Oromia Majlis",
      presidentTitle: "President, Oromia Regional Islamic Affairs Supreme Council",
      intro:
        "A respected Islamic scholar committed to strengthening Islamic values, unity, and responsible religious governance across the Oromia Region.",
      focusTitle: "Key Focus Areas",
      focus: [
        "Promoting authentic Islamic teachings",
        "Strengthening unity among Muslims",
        "Supporting mosques and institutions",
        "Enhancing religious education",
      ],
      quote: "Our responsibility is to serve the Ummah with wisdom, justice, and sincerity.",
      videoTitle: "Video Introduction",
      videoSubtitle: "Learn more about Oromia Majlis",
    },
    om: {
      sectionTitle: "Hogganaa Mul’ataa Oromia Majlis Waliin Baradhu",
      presidentTitle: "Pirezidaantii, Oromia Islamic Affairs Supreme Council",
      intro:
        "Barataa amantii Islaamaa kabajamaa; qajeelfama Islaamaa, tokkummaa fi bulchiinsa amantii itti gaafatamummaa qabu Oromiyaa keessatti cimsuuf kutannoo qaba.",
      focusTitle: "Dirqama Ijoo",
      focus: [
        "Barnoota Islaamaa dhugaa babal’isuu",
        "Tokkummaa Muslimootaa cimsuu",
        "Masjiidaa fi dhaabbilee deeggaruu",
        "Barnoota amantii guddisuu",
      ],
      quote: "Itti gaafatamummaan keenya ummata (Ummah) ogummaa, haqaa fi amanamummaan tajaajiluu dha.",
      videoTitle: "Seensa Viidiyoo",
      videoSubtitle: "Waa'ee Oromia Majlis dabalataan baradhu",
    },
    am: {
      sectionTitle: "የኦሮሚያ መጅሊስ ራዕይ ያለው መሪን ያግኙ",
      presidentTitle: "ፕሬዚዳንት፣ የኦሮሚያ ክልል ኢስላማዊ ጉዳዮች ላይኛው ምክር ቤት",
      intro:
        "የተከበረ የኢስላም ምሁር፤ የኢስላማዊ እሴቶችን ማጠናከር፣ አንድነትን ማበረታታት እና ተጠያቂ ሀይማኖታዊ አስተዳደርን በኦሮሚያ ክልል ላይ ለማሳደግ የተጠናከረ ቁርጠኛ ነው።",
      focusTitle: "ዋና ትኩረቶች",
      focus: [
        "እውነተኛ የኢስላማዊ ትምህርት ማበረታታት",
        "የሙስሊሞችን አንድነት ማጠናከር",
        "መስጊዶችን እና ተቋማትን መደገፍ",
        "ሀይማኖታዊ ትምህርትን ማሻሻል",
      ],
      quote: "ተጠያቂነታችን ኡማን በጥበብ፣ በፍትህ እና በታማኝነት ማገልገል ነው።",
      videoTitle: "የቪዲዮ መግቢያ",
      videoSubtitle: "ስለ ኦሮሚያ መጅሊስ ተጨማሪ ይወቁ",
    },
    ar: {
      sectionTitle: "تعرّف على القائد الملهم لمجلس أوروميا",
      presidentTitle: "رئيس مجلس الشؤون الإسلامية لإقليم أوروميا",
      intro:
        "عالمٌ إسلاميٌّ محترم ملتزم بتعزيز القيم الإسلامية والوحدة والإدارة الدينية المسؤولة في إقليم أوروميا.",
      focusTitle: "مجالات التركيز الرئيسية",
      focus: [
        "نشر التعاليم الإسلامية الصحيحة",
        "تعزيز وحدة المسلمين",
        "دعم المساجد والمؤسسات",
        "تطوير التعليم الديني",
      ],
      quote: "مسؤوليتنا هي خدمة الأمة بالحكمة والعدل والإخلاص.",
      videoTitle: "مقدمة فيديو",
      videoSubtitle: "اعرف المزيد عن مجلس أوروميا",
    },
  };

  const t = dict[locale] ?? dict.en;

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          {t.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 relative">
            {/* Decorative accent */}
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-red-500 to-blue-600 rounded-full opacity-20"></div>
            
            {/* Name and Title Section */}
            <div className="space-y-3">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                  Sheikh Gali Muktar
                </h3>
                <div className="inline-block px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold rounded-full shadow-md">
                  {t.presidentTitle}
                </div>
              </div>
              
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                {t.intro}
              </p>
            </div>

            {/* Key Focus Areas */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                {t.focusTitle}
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm text-gray-800">{t.focus[0]}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm text-gray-800">{t.focus[1]}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm text-gray-800">{t.focus[2]}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm text-gray-800">{t.focus[3]}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quote Box */}
            <div className="relative border-l-4 border-red-600 pl-4 py-4 bg-gradient-to-r from-red-50 via-red-50/50 to-transparent rounded-r-xl shadow-sm">
              <div className="absolute top-3 left-1 text-red-600 text-3xl opacity-20">"</div>
              <p className="text-base md:text-lg font-semibold text-gray-900 italic mb-2 leading-relaxed relative z-10">
                {t.quote}
              </p>
              <p className="text-sm text-gray-600 font-medium">— Sheikh Gali Muktar</p>
            </div>

            {/* Video Intro */}
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group w-full flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <span className="text-xl ml-1">▶</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-base">{t.videoTitle}</p>
                  <p className="text-xs text-red-100 group-hover:text-white transition-colors">
                    {t.videoSubtitle}
                  </p>
                </div>
                <div className="text-lg group-hover:translate-x-1 transition-transform">→</div>
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative order-first lg:order-last">
            <div className="aspect-[3/3] bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-9xl opacity-30">👤</div>
              </div>
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
                <img src="/img/InShot_2.jpg" alt="Sheikh Gali Muktar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <span className="text-2xl">×</span>
            </button>

            {/* YouTube Video Embed */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Video Introduction - Oromia Majlis"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

