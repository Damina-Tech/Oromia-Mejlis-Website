import {
  HeroSection,
  LocalServicesSection,
  LeaderSection,
  StatisticsSection,
  EventsDocumentsSection,
  NewsSection,
  OnlineServicesSection,
  CityHighlightsSection,
} from "@/components/home";
import Link from "next/link";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(
    cookieStore.get(LOCALE_COOKIE_NAME)?.value ?? DEFAULT_LOCALE
  );

  const homeText: Record<
    string,
    {
      halalBadge: string;
      title: string;
      subtitle: string;
      apply: string;
      signin: string;
    }
  > = {
    en: {
      halalBadge: "Halal Certification",
      title: "Apply for Halal Certification Online",
      subtitle:
        "Start your business Halal Certification process through Oromia Majlis HRMS. Register, sign in, and track your application digitally.",
      apply: "Apply for Halal Certification",
      signin: "Already Registered? Sign In",
    },
    om: {
      halalBadge: "Ragaa Halal",
      title: "Ragaa Halal Toora Interneetii irratti Iyyadhu",
      subtitle:
        "Adeemsa ragaa Halal daldalaa kee Oromia Majlis HRMS irratti jalqabi. Galmaa'i, seeni, fi iyyata kee dijitaalaan hordofi.",
      apply: "Ragaa Halal Iyyadhu",
      signin: "Dursee Galmaa'ee? Seeni",
    },
    am: {
      halalBadge: "ሀላል ማረጋገጫ",
      title: "ሀላል ማረጋገጫን በመስመር ላይ ያመልክቱ",
      subtitle:
        "የንግድዎን ሀላል ማረጋገጫ ሂደት በOromia Majlis HRMS ላይ ይጀምሩ። ይመዝገቡ፣ ይግቡ እና ማመልከቻዎን በዲጂታል ይከታተሉ።",
      apply: "ሀላል ማረጋገጫ ያመልክቱ",
      signin: "ቀድሞ ተመዝግበዋል? ይግቡ",
    },
    ar: {
      halalBadge: "شهادة حلال",
      title: "قدّم للحصول على شهادة حلال عبر الإنترنت",
      subtitle:
        "ابدأ عملية شهادة الحلال لنشاطك عبر نظام HRMS لمجلس أوروميا. سجّل، ثم سجّل الدخول وتابع طلبك رقمياً.",
      apply: "قدّم للحصول على شهادة حلال",
      signin: "مسجّل مسبقاً؟ سجّل الدخول",
    },
  };

  const t = homeText[locale] ?? homeText.en;

  return (
    <main className="min-h-screen">
      <HeroSection />
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs md:text-sm uppercase tracking-wider font-semibold text-red-100 mb-2">
                {t.halalBadge}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {t.title}
              </h2>
              <p className="text-white/90 text-sm md:text-base">
                {t.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl bg-white text-red-700 px-6 py-3 font-semibold shadow-lg hover:bg-red-50 transition-colors"
              >
                {t.apply}
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-colors"
              >
                {t.signin}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <LocalServicesSection />
      <LeaderSection />
      <StatisticsSection />
      <EventsDocumentsSection />
      <NewsSection />
      <OnlineServicesSection />
      <CityHighlightsSection />
      </main>
  );
}
