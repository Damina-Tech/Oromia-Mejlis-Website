export const PRAYER_CITY = "Addis Ababa";
export const PRAYER_COUNTRY = "Ethiopia";
export const PRAYER_TIMEZONE = "Africa/Addis_Ababa";

export const PRAYER_KEYS = [
  "Fajr",
  "Sunrise",
  "Dhuhr",
  "Asr",
  "Maghrib",
  "Isha",
] as const;

export type PrayerName = (typeof PRAYER_KEYS)[number];

export type PrayerTimings = Record<PrayerName, string>;

export type DateParts = {
  day: string;
  month: string;
  monthNumber: number;
  year: string;
  weekday?: string;
};

export type PrayerTimesPayload = {
  timings: PrayerTimings;
  gregorian: DateParts;
  hijri: DateParts;
};

export type CalendarDay = {
  gregorianDay: number;
  hijriDay: number;
  hijriMonth: string;
  isToday: boolean;
};

export function formatPrayerTime(time: string): string {
  const cleaned = time.split(" ")[0]?.trim() ?? time;
  const [hours, minutes] = cleaned.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time;

  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

function parseTimeToMinutes(time: string): number {
  const cleaned = time.split(" ")[0]?.trim() ?? time;
  const [hours, minutes] = cleaned.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getNextPrayer(
  timings: PrayerTimings,
  now = new Date()
): { name: PrayerName; time: string } | null {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const ordered: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  for (const name of ordered) {
    const minutes = parseTimeToMinutes(timings[name]);
    if (minutes > currentMinutes) {
      return { name, time: timings[name] };
    }
  }

  return { name: "Fajr", time: timings.Fajr };
}

export function getCurrentPrayer(
  timings: PrayerTimings,
  now = new Date()
): PrayerName | null {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const sequence: PrayerName[] = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Maghrib",
    "Isha",
  ];

  let active: PrayerName | null = null;
  for (const name of sequence) {
    if (parseTimeToMinutes(timings[name]) <= currentMinutes) {
      active = name === "Sunrise" ? null : name;
    }
  }
  return active;
}
