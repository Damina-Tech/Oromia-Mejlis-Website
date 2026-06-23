"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  normalizeLocale,
} from "@/lib/i18n";
import {
  formatPrayerTime,
  getCurrentPrayer,
  getNextPrayer,
  PRAYER_KEYS,
  type PrayerName,
  type PrayerTimings,
} from "@/lib/prayerTimes";

type CalendarPayload = {
  month: number;
  year: number;
  firstWeekday: number;
  days: {
    gregorianDay: number;
    hijriDay: number;
    hijriMonth: string;
    isToday: boolean;
  }[];
};

type ApiResponse = {
  timings: PrayerTimings;
  gregorian: { day: string; month: string; year: string; weekday?: string };
  hijri: { day: string; month: string; year: string; weekday?: string };
  calendar: CalendarPayload;
  location: { city: string; country: string };
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PRAYER_ICONS: Record<PrayerName, string> = {
  Fajr: "🌅",
  Sunrise: "☀️",
  Dhuhr: "🌤️",
  Asr: "🌇",
  Maghrib: "🌆",
  Isha: "🌙",
};

function PrayerRow({
  name,
  time,
  label,
  isActive,
  isNext,
  nextLabel,
}: {
  name: PrayerName;
  time: string;
  label: string;
  isActive: boolean;
  isNext: boolean;
  nextLabel: string;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
        isNext
          ? "bg-teal-600 text-white shadow-md ring-2 ring-teal-400/50"
          : isActive
            ? "bg-teal-50 text-teal-900 ring-1 ring-teal-200"
            : "bg-white/80 text-gray-800 ring-1 ring-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl" aria-hidden>
          {PRAYER_ICONS[name]}
        </span>
        <div>
          <p className="font-semibold">{label}</p>
          {isNext ? (
            <p className="text-xs font-medium text-teal-100">{nextLabel}</p>
          ) : null}
        </div>
      </div>
      <p className="text-lg font-bold tabular-nums">{formatPrayerTime(time)}</p>
    </div>
  );
}

export default function PrayerCalendarSection() {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [now, setNow] = useState(() => new Date());

  const dict = useMemo(() => {
    const labels: Record<
      string,
      {
        sectionTitle: string;
        sectionSubtitle: string;
        prayerTitle: string;
        calendarTitle: string;
        nextPrayer: string;
        loading: string;
        error: string;
        hijri: string;
        gregorian: string;
        today: string;
        prayers: Record<PrayerName, string>;
        weekdays: string[];
      }
    > = {
      en: {
        sectionTitle: "Prayer Times & Calendar",
        sectionSubtitle:
          "Daily salah times and Hijri calendar for the Muslim community in Addis Ababa.",
        prayerTitle: "Today's Prayer Times",
        calendarTitle: "Islamic Calendar",
        nextPrayer: "Next prayer",
        loading: "Loading prayer times...",
        error: "Unable to load prayer times. Please try again later.",
        hijri: "Hijri",
        gregorian: "Gregorian",
        today: "Today",
        prayers: {
          Fajr: "Fajr",
          Sunrise: "Sunrise",
          Dhuhr: "Dhuhr",
          Asr: "Asr",
          Maghrib: "Maghrib",
          Isha: "Isha",
        },
        weekdays: WEEKDAYS,
      },
      om: {
        sectionTitle: "Yeroo Salaataa fi Kaaleendara",
        sectionSubtitle:
          "Yeroo salaataa guyyaa guyyaa fi kaaleendara Hijrii hawaasa Muslimootaa Finfinnee.",
        prayerTitle: "Yeroo Salaataa Har'aa",
        calendarTitle: "Kaaleendara Islaamaa",
        nextPrayer: "Salaata itti aanu",
        loading: "Yeroo salaataa fe'amaa jira...",
        error: "Yeroo salaataa fe'uu hin dandeenye.",
        hijri: "Hijrii",
        gregorian: "Giriigooriyaan",
        today: "Har'a",
        prayers: {
          Fajr: "Fajr",
          Sunrise: "Baatii",
          Dhuhr: "Dhuhr",
          Asr: "Asr",
          Maghrib: "Magrib",
          Isha: "Ishaa",
        },
        weekdays: ["Dil", "Wix", "Qib", "Roob", "Kam", "Jim", "San"],
      },
      am: {
        sectionTitle: "የጸሎት ሰዓቶች እና የቀን መቁጠሪያ",
        sectionSubtitle:
          "ለአዲስ አበባ ሙስሊም ማህበረሰብ ዕለታዊ የጸሎት ሰዓቶች እና የሂጅሪ ቀን መቁጠሪያ።",
        prayerTitle: "የዛሬ የጸሎት ሰዓቶች",
        calendarTitle: "የእስልምና ቀን መቁጠሪያ",
        nextPrayer: "ቀጣይ ጸሎት",
        loading: "የጸሎት ሰዓቶች በመጫን ላይ...",
        error: "የጸሎት ሰዓቶችን ማስገባት አልተቻለም።",
        hijri: "ሂጅሪ",
        gregorian: "ግሪጎሪያን",
        today: "ዛሬ",
        prayers: {
          Fajr: "ፈጅር",
          Sunrise: "ፀሐይ መውጣት",
          Dhuhr: "ዙህር",
          Asr: "አስር",
          Maghrib: "ማግሪብ",
          Isha: "ኢሻ",
        },
        weekdays: ["እሑድ", "ሰኞ", "ማክሰ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"],
      },
      ar: {
        sectionTitle: "أوقات الصلاة والتقويم",
        sectionSubtitle:
          "أوقات الصلاة اليومية والتقويم الهجري للمجتمع المسلم في أديس أبابا.",
        prayerTitle: "أوقات الصلاة اليوم",
        calendarTitle: "التقويم الإسلامي",
        nextPrayer: "الصلاة القادمة",
        loading: "جارٍ تحميل أوقات الصلاة...",
        error: "تعذر تحميل أوقات الصلاة.",
        hijri: "هجري",
        gregorian: "ميلادي",
        today: "اليوم",
        prayers: {
          Fajr: "الفجر",
          Sunrise: "الشروق",
          Dhuhr: "الظهر",
          Asr: "العصر",
          Maghrib: "المغرب",
          Isha: "العشاء",
        },
        weekdays: ["أحد", "إثن", "ثلا", "أرب", "خم", "جم", "سب"],
      },
    };
    return labels[locale] ?? labels.en;
  }, [locale]);

  const t = dict;

  const loadData = useCallback(async (date: Date) => {
    try {
      setLoading(true);
      setError(null);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const res = await fetch(`/api/prayer-times?month=${month}&year=${year}`);
      if (!res.ok) throw new Error("fetch failed");
      const json = (await res.json()) as ApiResponse;
      setData(json);
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }, [t.error]);

  useEffect(() => {
    const cookieValue =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
        ?.split("=")[1] ?? "";
    setLocale(normalizeLocale(decodeURIComponent(cookieValue || DEFAULT_LOCALE)));
  }, []);

  useEffect(() => {
    loadData(viewDate);
  }, [loadData, viewDate]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const nextPrayer = data ? getNextPrayer(data.timings, now) : null;
  const currentPrayer = data ? getCurrentPrayer(data.timings, now) : null;

  const monthLabel = viewDate.toLocaleString(
    locale === "ar" ? "ar-EG" : "en-US",
    { month: "long", year: "numeric" }
  );

  const shiftMonth = (delta: number) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const calendarCells = useMemo(() => {
    if (!data?.calendar) return [];
    const blanks = Array.from({ length: data.calendar.firstWeekday }, () => null);
    const days = data.calendar.days.map((day) => day);
    return [...blanks, ...days];
  }, [data]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/90 via-white to-white py-14 md:py-16">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-teal-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl"
        aria-hidden
      />

      <div className="container relative mx-auto px-4">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
            Oromia Majlis
          </p>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t.sectionTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">{t.sectionSubtitle}</p>
        </div>

        {loading && !data ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-teal-100 bg-white/80 p-10 shadow-sm">
            <p className="text-gray-600">{t.loading}</p>
          </div>
        ) : error && !data ? (
          <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center text-red-700">
            {error}
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Prayer times */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-3xl border border-teal-100/80 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 p-6 text-white shadow-xl md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                      {data.location.city}, {data.location.country}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">{t.prayerTitle}</h3>
                    <p className="mt-1 text-sm text-teal-100/90">
                      {data.gregorian.weekday} · {data.gregorian.day}{" "}
                      {data.gregorian.month} {data.gregorian.year}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-teal-100">
                      {t.hijri}
                    </p>
                    <p className="text-lg font-bold">
                      {data.hijri.day} {data.hijri.month}
                    </p>
                    <p className="text-xs text-teal-100">{data.hijri.year} AH</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {PRAYER_KEYS.map((name) => (
                    <PrayerRow
                      key={name}
                      name={name}
                      time={data.timings[name]}
                      label={t.prayers[name]}
                      isActive={currentPrayer === name}
                      isNext={nextPrayer?.name === name}
                      nextLabel={t.nextPrayer}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="lg:col-span-3">
              <div className="h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-lg ring-1 ring-gray-100/80 md:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t.calendarTitle}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {t.gregorian}: {monthLabel}
                    </p>
                    <p className="text-sm font-medium text-teal-800">
                      {t.hijri}: {data.hijri.day} {data.hijri.month} {data.hijri.year} AH
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => shiftMonth(-1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-teal-300 hover:bg-teal-50"
                      aria-label="Previous month"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewDate(new Date())}
                      className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
                    >
                      {t.today}
                    </button>
                    <button
                      type="button"
                      onClick={() => shiftMonth(1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-teal-300 hover:bg-teal-50"
                      aria-label="Next month"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t.weekdays.map((day) => (
                    <div key={day} className="py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarCells.map((day, index) =>
                    day === null ? (
                      <div key={`blank-${index}`} className="aspect-square" />
                    ) : (
                      <div
                        key={`${day.gregorianDay}-${day.hijriDay}`}
                        className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-center transition ${
                          day.isToday
                            ? "border-teal-500 bg-teal-600 text-white shadow-md"
                            : "border-gray-100 bg-gray-50/80 text-gray-800 hover:border-teal-200 hover:bg-teal-50/50"
                        }`}
                      >
                        <span className="text-sm font-bold">{day.gregorianDay}</span>
                        <span
                          className={`text-[10px] font-medium ${
                            day.isToday ? "text-teal-100" : "text-teal-700"
                          }`}
                        >
                          {day.hijriDay}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
