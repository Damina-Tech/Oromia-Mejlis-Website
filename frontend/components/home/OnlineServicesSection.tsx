"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n";

export default function OnlineServicesSection() {
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
      title: string;
      subtitle: string;
      left: string[];
      right: string[];
    }
  > = {
    en: {
      title: "Explore Online Services & Resources",
      subtitle:
        "Oromia Majlis provides a wide range of online services to support the Muslim community and manage Islamic affairs efficiently.",
      left: [
        "Mosque Registration",
        "Marriage Certificate",
        "Religious Education Programs",
        "Zakat & Charity Services",
        "Islamic Guidance & Counseling",
        "Hajj & Umrah Services",
      ],
      right: [
        "Quranic Studies Registration",
        "Islamic Event Permits",
        "Religious Scholar Certification",
        "Community Support Programs",
        "Interfaith Dialogue Services",
        "Islamic Publications Request",
      ],
    },
    om: {
      title: "Tajaajila Toora Interneetii fi Qabeenya Qoradhu",
      subtitle:
        "Oromia Majlis tajaajila toora interneetii bal'aa dhiyeessuudhaan hawaasa Muslimootaa deeggaruu fi dhimma Islaamaa haala salphaa ta’een bulcha.",
      left: [
        "Galmii Masjiidaa",
        "Ragaa Fuudhaafi Heerumaa",
        "Sagantaalee Barnoota Amantii",
        "Tajaajila Zakaat fi Sadaqaa",
        "Qajeelfama fi Gorsa Islaamaa",
        "Tajaajila Hajjii fi Umraa",
      ],
      right: [
        "Galmii Barnoota Qur'aanaa",
        "Eeyyama Taatee Islaamaa",
        "Ragaa Hayyuu Amantii",
        "Sagantaalee Deeggarsa Hawaasaa",
        "Tajaajila Waliigalte (Interfaith)",
        "Gaaffii Maxxansa Islaamaa",
      ],
    },
    am: {
      title: "የመስመር ላይ አገልግሎቶችን እና ሀብቶችን ያስሱ",
      subtitle:
        "ኦሮሚያ መጅሊስ ሙስሊም ማህበረሰብን ለመደገፍ እና የኢስላማዊ ጉዳዮችን በብቃት ለማስተዳደር በርካታ የመስመር ላይ አገልግሎቶችን ይሰጣል።",
      left: [
        "የመስጊድ ምዝገባ",
        "የጋብቻ ማረጋገጫ",
        "የሀይማኖት ትምህርት ፕሮግራሞች",
        "የዘካት እና ርዳታ አገልግሎት",
        "የኢስላማዊ ምክር እና መመሪያ",
        "የሐጅ እና ኡምራ አገልግሎት",
      ],
      right: [
        "የቁርአን ትምህርት ምዝገባ",
        "የኢስላማዊ ክስተት ፈቃድ",
        "የሀይማኖት ባለሞያ ማረጋገጫ",
        "የማህበረሰብ ድጋፍ ፕሮግራሞች",
        "የሀይማኖት መካከል ውይይት አገልግሎት",
        "የኢስላማዊ ህትመት ጥያቄ",
      ],
    },
    ar: {
      title: "استكشف الخدمات والموارد عبر الإنترنت",
      subtitle:
        "يوفّر مجلس أوروميا مجموعة واسعة من الخدمات الإلكترونية لدعم المجتمع المسلم وإدارة الشؤون الإسلامية بكفاءة.",
      left: [
        "تسجيل المساجد",
        "شهادة الزواج",
        "برامج التعليم الديني",
        "خدمات الزكاة والصدقات",
        "الإرشاد والاستشارة الإسلامية",
        "خدمات الحج والعمرة",
      ],
      right: [
        "تسجيل دراسات القرآن",
        "تصاريح الفعاليات الإسلامية",
        "اعتماد العلماء والدعاة",
        "برامج دعم المجتمع",
        "خدمات الحوار بين الأديان",
        "طلب المنشورات الإسلامية",
      ],
    },
  };

  const t = dict[locale] ?? dict.en;

  return (
    <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-white/90">
              {t.subtitle}
            </p>
          </div>

          {/* Right Column - Two Sub-columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {t.left.map((service, index) => (
                <a
                  key={index}
                  href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <span className="text-white/90 group-hover:text-white">
                    {service}
                  </span>
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              ))}
            </div>
            <div className="space-y-3">
              {t.right.map((service, index) => (
                <a
                  key={index}
                  href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <span className="text-white/90 group-hover:text-white">
                    {service}
                  </span>
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

