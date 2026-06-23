import { NextResponse } from "next/server";
import {
  PRAYER_CITY,
  PRAYER_COUNTRY,
  type CalendarDay,
  type PrayerTimesPayload,
} from "@/lib/prayerTimes";

const ALADHAN_METHOD = 3; // Muslim World League

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = Number(searchParams.get("month") ?? new Date().getMonth() + 1);
  const year = Number(searchParams.get("year") ?? new Date().getFullYear());

  try {
    const [timingsRes, calendarRes] = await Promise.all([
      fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(PRAYER_CITY)}&country=${encodeURIComponent(PRAYER_COUNTRY)}&method=${ALADHAN_METHOD}`,
        { next: { revalidate: 3600 } }
      ),
      fetch(
        `https://api.aladhan.com/v1/calendarByCity?city=${encodeURIComponent(PRAYER_CITY)}&country=${encodeURIComponent(PRAYER_COUNTRY)}&month=${month}&year=${year}&method=${ALADHAN_METHOD}`,
        { next: { revalidate: 86400 } }
      ),
    ]);

    if (!timingsRes.ok || !calendarRes.ok) {
      return NextResponse.json(
        { error: "Failed to load prayer data" },
        { status: 502 }
      );
    }

    const timingsJson = await timingsRes.json();
    const calendarJson = await calendarRes.json();
    const timingsData = timingsJson?.data;

    const payload: PrayerTimesPayload = {
      timings: {
        Fajr: timingsData?.timings?.Fajr ?? "",
        Sunrise: timingsData?.timings?.Sunrise ?? "",
        Dhuhr: timingsData?.timings?.Dhuhr ?? "",
        Asr: timingsData?.timings?.Asr ?? "",
        Maghrib: timingsData?.timings?.Maghrib ?? "",
        Isha: timingsData?.timings?.Isha ?? "",
      },
      gregorian: {
        day: timingsData?.date?.gregorian?.day ?? "",
        month: timingsData?.date?.gregorian?.month?.en ?? "",
        monthNumber: Number(timingsData?.date?.gregorian?.month?.number ?? month),
        year: timingsData?.date?.gregorian?.year ?? String(year),
        weekday: timingsData?.date?.gregorian?.weekday?.en ?? "",
      },
      hijri: {
        day: timingsData?.date?.hijri?.day ?? "",
        month: timingsData?.date?.hijri?.month?.en ?? "",
        monthNumber: Number(timingsData?.date?.hijri?.month?.number ?? 1),
        year: timingsData?.date?.hijri?.year ?? "",
        weekday: timingsData?.date?.hijri?.weekday?.en ?? "",
      },
    };

    const today = new Date();
    const calendarDays: CalendarDay[] = (calendarJson?.data ?? []).map(
      (entry: {
        date: {
          gregorian: { day: string };
          hijri: { day: string; month: { en: string } };
        };
      }) => {
        const gregorianDay = Number(entry.date.gregorian.day);
        return {
          gregorianDay,
          hijriDay: Number(entry.date.hijri.day),
          hijriMonth: entry.date.hijri.month.en,
          isToday:
            gregorianDay === today.getDate() &&
            month === today.getMonth() + 1 &&
            year === today.getFullYear(),
        };
      }
    );

    const firstWeekday = new Date(year, month - 1, 1).getDay();

    return NextResponse.json({
      ...payload,
      calendar: {
        month,
        year,
        firstWeekday,
        days: calendarDays,
      },
      location: { city: PRAYER_CITY, country: PRAYER_COUNTRY },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load prayer data" },
      { status: 500 }
    );
  }
}
